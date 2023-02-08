import { Community, CommunitySnippet, communityState } from '@/atoms/CommunitiesAtom'
import { auth, firestore } from '@/firebase/clientApp'
import { collection, doc, getDocs, increment, writeBatch } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState } from 'recoil'
import { useSetAuthModalView } from './recoil'

const useCommunityData = () => {
  const [user] = useAuthState(auth)
  const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { setAuthModalIsOpen } = useSetAuthModalView();

  const getMySnippets = async () => {
    try {
      setLoading(true)
      const snippetDocs = await getDocs(collection(firestore, `users/${user?.uid}/communitySnippet`))
      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }))
      setCommunityStateValue(prev => ({...prev, mySnippets: snippets as CommunitySnippet[]}))
    } catch (error: any) {
      if(error instanceof Error)
        console.log(error.message);
      setError(error?.message)
    }
    setLoading(false)
  }
  const joinCommunity = async (data: Community) => {
    setLoading(true)
    try {
      const batch = writeBatch(firestore)
      const newSnippet: CommunitySnippet = {
        communityId: data.id,
        imageUrl: data.imageUrl || "",
      }
      batch.set(doc(firestore, `/users/${user?.uid}/communitySnippet`, data.id), newSnippet)
      batch.update(doc(firestore, "communities", data.id), {
        numberOfMembers: increment(1)
      })

      await batch.commit()
      setCommunityStateValue(prev => ({...prev, mySnippets: [...prev.mySnippets, newSnippet]}))
    } catch (error: any) {
      console.log(error)
      setError(error.message)
    }
    setLoading(false)
  }
  const leaveCommunity = async (id: string) => {
    setLoading(true)
    try {
      const batch = writeBatch(firestore);
      batch.delete(doc(firestore, `users/${user?.uid}/communitySnippets`, id))
      batch.update(doc(firestore, 'communities', id), {
        numberOfMemebers: increment(-1)
      })
      await batch.commit()
      setCommunityStateValue(prev => ({...prev, mySnippets: prev.mySnippets.filter(snippet => snippet.communityId !== id)}))
    } catch (error: any) {
      console.log(error);
      setError(error.message)
    }
    setLoading(false)
   }
  const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
      if (!user) {
        setAuthModalIsOpen(true);
        return;
      }
    if (isJoined) {
      leaveCommunity(communityData.id);
      return
    }
    joinCommunity(communityData);
  }
  useEffect(() => {
    if (!user) {
      return;
    }
    console.log('running');
    getMySnippets();
  }, [user])
  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  }
}

export default useCommunityData