import { Alert, AlertIcon, Flex, Text, useStatStyles,  } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsLink45Deg, BsMic } from 'react-icons/bs'
import { IoDocumentText, IoImageOutline } from 'react-icons/io5'
import {BiPoll} from "react-icons/bi"
import TabItem from './TabItem'
import { IconType } from 'react-icons/lib'
import TextInputs from './PostForm/TextInputs'
import ImageUpload from './PostForm/ImageUpload'
import { Post } from '@/atoms/postsAtom'
import { User } from 'firebase/auth'
import { useRouter } from 'next/router'
import { addDoc, collection, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import { firestore, storage } from '@/firebase/clientApp'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import useSelectFile from '@/hooks/useSelectFile'
const formTabs:TabItemProps[] = [
  {
    title: "Post",
    icon: IoDocumentText
  },
  {
    title: "Images & Video",
    icon: IoImageOutline
  },
  {
    title: "Link",
    icon: BsLink45Deg
  },
  {
    title: "Poll",
    icon: BiPoll
  },
  {
    title: "Talk",
    icon: BsMic
  },
]


export type TabItemProps = {
  title: string;
  icon: IconType;
}

type NewPostFormProps = {
  user:User
}



const NewPostsForm:React.FC<NewPostFormProps> = ({ user }) => {
  const router = useRouter()
  const {communityId} = router.query
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title)
  const [textInput, setTextInput] = useState({
    title: "",
    body: ""
  })
  const { selectedFile, onSelectFile, setSelectedFile} = useSelectFile()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  
  const handleCreatePost = async () => {
    const newPost: Post = {
      communityId: communityId as string,
      creatorId: user?.uid,
      creatorDisplayName: user.email!.split('@')[0],
      title: textInput.title,
      body: textInput.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp
    }

    setLoading(true)
    try {
      
      const postDocRef = await addDoc(collection(firestore, 'posts'), newPost)
      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, 'data_url');
        const downloadUrl = await getDownloadURL(imageRef)
         await updateDoc(postDocRef, {
           imageURL: downloadUrl,
         });
      }
     router.back()
    } catch (error: any) {
      console.log('handle create post error', error)
      setError(true)
    }
    setLoading(false)
  };
  const onTextChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTextInput({
      ...textInput,
      [e.target.name]: e.target.value
    })
  };
  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width={'100%'}>
        {formTabs.map((item, index) => (
          <TabItem
            item={item}
            key={index}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex p={4}>
       {selectedTab === "Post" && <TextInputs
          textInputs={textInput}
          onChange={onTextChange}
          handleCreatePost={handleCreatePost}
          loading={loading}
        />}
        {
          selectedTab === "Images & Video" && (
            <ImageUpload
              selectedFile={selectedFile}
              onSelectImage={onSelectFile}
              setSelectedTab={setSelectedTab}
              setSelectedFile={setSelectedFile}
            />
          )
        }
      </Flex>
      {error && <Alert status='error'>
        <AlertIcon />
        <Text mr={2}>Error creating post!</Text>
      </Alert>}
    </Flex>
  );
}

export default NewPostsForm