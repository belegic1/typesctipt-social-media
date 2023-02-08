import { authModalState } from '@/atoms/authModal'
import { communityState } from '@/atoms/CommunitiesAtom'
import { Post, postState, PostVote } from '@/atoms/postsAtom'
import { auth, firestore, storage } from '@/firebase/clientApp'
import { collection, deleteDoc, doc, getDocs, query, where, writeBatch } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { CgLayoutGrid } from 'react-icons/cg'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'


const usePosts = () => {
  const [user] = useAuthState(auth)
  const [postStateValue, setPostStateValue] = useRecoilState(postState)
  const {currentCommunity} = useRecoilValue(communityState)
  const onVote = async (post: Post, vote: number, communityId: string) => {
const setAuthModalState = useSetRecoilState(authModalState)
    if (!user?.uid) {
      setAuthModalState({ open: true, view: 'login' });
      return;
    }

    try {
     
      const { voteStatus } = post;
      const existingVote = postStateValue.postVotes.find(vote => vote.postId === post.id);

      const batch = writeBatch(firestore);
      const updatedPost = { ...post }
      let updatedPosts = [...postStateValue.posts];
      let updatedPostVotes = [...postStateValue.postVotes];
      let voteChange = vote;
      if (!existingVote) {
        const postVoteRef = doc(collection(firestore, "users", `${user?.uid}/postVotes`))
        const newVote: PostVote = {
          id: postVoteRef.id,
          postId: post.id,
          communityId,
          voteValue: vote
        }
        batch.set(postVoteRef, newVote);

        updatedPost.voteStatus = voteStatus + vote;
        updatedPostVotes = [...updatedPostVotes, newVote]
      } else {
        const postVoteRef = doc(firestore, 'users', `${user?.uid}/postVotes/${existingVote.id}`)
        if (existingVote.voteValue === vote) {
          updatedPost.voteStatus = voteStatus - vote;
          updatedPostVotes = updatedPostVotes.filter(vote => vote.id !== existingVote.id)
          batch.delete(postVoteRef)
          voteChange *= -1;
        } else {
          updatedPost.voteStatus = voteStatus + 2 * vote;
          const voteIdx = postStateValue.postVotes.findIndex(vote => vote.id === existingVote.id)
          updatedPostVotes[voteIdx] = {
            ...existingVote,
            voteValue: vote
          }
          batch.update(postVoteRef, { voteValue: vote })
       }
      }
      
      const postRef = doc(firestore, 'posts', post.id!);
      batch.update(postRef, { voteStatus: voteStatus + voteChange })
      await batch.commit()
      const postIdx = postStateValue.posts.findIndex(item => item.id === post.id)
      updatedPosts[postIdx] = updatedPost;
      setPostStateValue(prev => ({...prev, posts: updatedPosts, postVotes: updatedPostVotes}))
   } catch (error:any) {
    console.log(error)
   }
   };
  const onSelectPost = () => { };
  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      
      if (post.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef)
      }
      const postDocRef = doc(firestore, 'posts', post?.id)
      await deleteDoc(postDocRef)

      setPostStateValue(prev => ({...prev, posts: prev.posts.filter(item => item.id !== post.id)}));
    return true;
    } catch (error) {
      return false;
    }
  }

  const getCommunityPostVotes = async (communityId: string) => {
    const postVotesQuery = query(collection(firestore, 'users', `${user?.uid}/postVotes`), where('communityId', '==', communityId))

    const postVoteDocs = await getDocs(postVotesQuery);

    const postVotes = postVoteDocs.docs.map(doc => ({
      id: doc.id, ...doc.data(),
    }));
    setPostStateValue(prev => ({
      ...prev,
      postVotes: postVotes as PostVote[]
    }));
  }

  useEffect(() => {
    console.log(currentCommunity)
    if (!currentCommunity || !user) {
      return;
    }
      getCommunityPostVotes(currentCommunity.id);
    
  }, [user,currentCommunity,])

  useEffect(() => {
    if (!user) {
      console.log("remove votes")
      setPostStateValue(prev => ({...prev, postVotes: []}))
    }
  }, [user])
  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  }
}

export default usePosts