import { communityState } from '@/atoms/CommunitiesAtom'
import About from '@/components/Community/About'
import PageLayout from '@/components/Layout/PageLayout'
import NewPostsForm from '@/components/Posts/NewPostsForm'
import { auth } from '@/firebase/clientApp'
import useCommunityData from '@/hooks/useCommunityData'
import { Box, Text } from '@chakra-ui/react'
import { log } from 'console'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilValue } from 'recoil'

const SubmitPostPage = () => {
  const [user] = useAuthState(auth)
  // const communityStateValue = useRecoilValue(communityState)
  const {communityStateValue} = useCommunityData()
  
  return (
    <PageLayout>
      <>
        <Box p='14px 0px' borderBottom='1px solid' borderColor='white'>
          <Text>Create Post</Text>
        </Box>
        {user && <NewPostsForm user={user} />}
      </>
      <>
        {communityStateValue.currentCommunity && <About communityData={communityStateValue.currentCommunity} />}
      </>
    </PageLayout>
  )
}

export default SubmitPostPage