import { Post } from '@/atoms/postsAtom'
import About from '@/components/Community/About'
import PageLayout from '@/components/Layout/PageLayout'
import Comments from '@/components/Posts/Comments/Comments'
import PostItem from '@/components/Posts/PostItem'
import { auth, firestore } from '@/firebase/clientApp'
import useCommunityData from '@/hooks/useCommunityData'
import usePosts from '@/hooks/usePosts'
import { User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

const PostPage = () => {
  const router = useRouter()
  const { pid } = router.query;
  const [user] = useAuthState(auth)
  const { postStateValue, setPostStateValue, onDeletePost, onVote } = usePosts()
  const {communityStateValue} = useCommunityData()
  const fetchPost = async (postId: string) => {
    try {
      const postDocRef = doc(firestore, "posts", postId)
      const postDoc = await getDoc(postDocRef)
      setPostStateValue(prev => ({
        ...prev,
        selectedPost: { id: postDoc.id, ...postDoc.data() } as Post
      }))
    } catch (error) {
      console.log("error")
    }
  }
  useEffect(() => {
    if (pid && !postStateValue.selectedPost) {
      fetchPost(pid as string)
    }
  }, [router.query, postStateValue.selectedPost])
  return (
    <PageLayout>
      <>
      { postStateValue.selectedPost && <PostItem post={postStateValue.selectedPost} onVote={onVote} onDeletePost={onDeletePost} userVoteValue={postStateValue.postVotes.find(item => item.postId === postStateValue.selectedPost?.id)?.voteValue}
          userIsCreator={user?.uid === postStateValue.selectedPost?.creatorId}
        />}
        <Comments user={user as User} selectedPost={postStateValue.selectedPost} communityId={communityStateValue.currentCommunity?.id as string} />
      </>
      <>
       {communityStateValue.currentCommunity && <About communityData={communityStateValue.currentCommunity} />}
      </>
    </PageLayout>
  )
}

export default PostPage