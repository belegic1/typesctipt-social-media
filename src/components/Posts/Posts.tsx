import { Community } from '@/atoms/CommunitiesAtom'
import { Post } from '@/atoms/postsAtom';
import { auth, firestore } from '@/firebase/clientApp';
import usePosts from '@/hooks/usePosts';
import { Stack } from '@chakra-ui/react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import PostItem from './PostItem';
import PostLoader from './PostLoader';

type PostProps = {
  communityData: Community;
}
const Posts: React.FC<PostProps> = ({ communityData }) => {
  const [loading, setLoading] = useState(false)
  const { postStateValue, setPostStateValue, onDeletePost, onVote, onSelectPost } = usePosts()
  const [user] = useAuthState(auth)

  const getPosts = async () => {
    setLoading(true)
    try {
      const postsQuery = query(collection(firestore, 'posts'), where('communityId', '==', communityData.id), orderBy("createdAt", "desc"))

      const postDocs = await getDocs(postsQuery)

      const posts = postDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setPostStateValue(prev => ({
        ...prev,
        posts: posts as Post[]
      }))
    } catch (error:any) {
      console.log("getPosts error", error)
    }
    setLoading(false)
  }
  useEffect(() => {
    getPosts()
  }, [])
  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {postStateValue?.posts.map((item) => (
            <PostItem
              key={item.id}
              post={item}
              userIsCreator={user?.uid === item.creatorId}
              userVoteValue={undefined}
              onVote={onVote}
              onSelectPost={onSelectPost}
              onDeletePost={onDeletePost}
            />
          ))}
        </Stack>
      )}
    </>
  );
}

export default Posts