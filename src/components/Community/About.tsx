import { Community, communityState } from '@/atoms/CommunitiesAtom'
import { Box, Flex, Text , Icon, Stack, Divider, Button, Img, Spinner} from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { RiCakeLine } from "react-icons/ri"
import moment from "moment"
import Link from 'next/link'
import { auth ,firestore,storage} from '@/firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import useSelectFile from '@/hooks/useSelectFile'
import { FaReddit } from 'react-icons/fa'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'
import { useSetRecoilState } from 'recoil'

type AboutProps = {
  communityData: Community
}
const About: React.FC<AboutProps> = ({ communityData }) => {
  const [user] = useAuthState(auth)
  const selectedFileRef = useRef<HTMLInputElement>(null)
  const { selectedFile, onSelectFile } = useSelectFile()
  const setCommunityStateValue = useSetRecoilState(communityState)
  const [uplaodingImage, setUplaodingImage] = useState(false)
  const onUpdateImage = async () => {
    if (!selectedFile) return;
    setUplaodingImage(true)
   try {
     const imageRef = ref(storage, `communities/${communityData.id}/image`)
     await uploadString(imageRef, selectedFile, 'data_url')
     const downloadUrl = await getDownloadURL(imageRef)
     await updateDoc(doc(firestore, "communities", communityData.id), {
       imageURL: downloadUrl
     })

     setCommunityStateValue((prev) => ({
       ...prev, currentCommunity: {
         ...prev.currentCommunity,
          imageURL: downloadUrl
       } as Community
     }))
   } catch (error) {
    console.log("error", error)
    }
    setUplaodingImage(false)
  }
  return (
    <Box position="sticky" top={'14px'}>
      <Flex
        justify={'space-between'}
        align="center"
        bg="blue.400"
        color="white"
        p={3}
        borderRadius="4px 4px 0px 0px"
      >
        <Text fontSize={'10pt'} fontWeight={700}>
          About community
        </Text>
        <Icon as={HiOutlineDotsHorizontal} />
      </Flex>
      <Flex
        direction={'column'}
        padding={3}
        bg="white"
        borderRadius="0px 0px 4px 4px"
      >
        <Stack>
          <Flex width="100%" p={2} fontSize="10pt">
            <Flex direction="column" flexGrow={1} fontWeight={700}>
              <Text>{communityData.numberOfMembers.toLocaleString()}</Text>
              <Text>Members</Text>
            </Flex>
            <Flex direction="column" flexGrow={1}>
              <Text>1</Text>
              <Text>Online</Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex
            align="center"
            width="100%"
            p={1}
            fontWeight={500}
            fontSize="10pt"
          >
            <Icon as={RiCakeLine} fontSize={18} mr={2} />
            <Text>
              created{' '}
              {moment(
                new Date(communityData!.createdAt!.seconds * 1000)
              ).format('DD. MMMM, YYYY')}{' '}
            </Text>
          </Flex>
          <Link href={`/r/${communityData?.id}/submit`}>
            <Button mt={3} height={'30px'}>
              Create Post
            </Button>
          </Link>
          {user?.uid === communityData?.creatorId && (
            <>
              <Divider />
              <Stack fontSize={'10pt'} spacing={1}>
                <Text fontWeight={600}>Admin</Text>
                <Flex align={'center'} justify="space-between">
                  <Text
                    color="blue.500"
                    cursor="pointer"
                    _hover={{ textDecoration: 'underline' }}
                    onClick={() => selectedFileRef?.current?.click()}
                  >
                    Change Image
                  </Text>
                  {communityData.imageURL || selectedFile ? (
                    <Img
                      borderRadius={'full'}
                      boxSize="40px"
                      alt="community image"
                      src={selectedFile || communityData.imageURL}
                    />
                  ) : (
                    <Icon
                      as={FaReddit}
                      fontSize={40}
                      color="brand.100"
                      mr={2}
                    />
                  )}
                </Flex>
                {selectedFile &&
                  (uplaodingImage ? <Spinner /> : <Text cursor={'pointer'} onClick={onUpdateImage}>Save Changes</Text>)}
                <input
                  type='file'
                  accept='image/x=png, image/gif, image/jpeg'
                  hidden
                  ref={selectedFileRef}
                  onChange={onSelectFile}
                />
              </Stack>
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  );
}

export default About