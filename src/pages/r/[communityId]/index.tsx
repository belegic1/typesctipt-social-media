import { Community, communityState } from '@/atoms/CommunitiesAtom';
import { firestore } from '@/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import safeJsonStringify from "safe-json-stringify"
import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import NotFound from '@/components/Community/NotFound';
import Header from '@/components/Community/Header';
import PageLayout from '@/components/Layout/PageLayout';
import CreatePostLink from '@/components/Community/CreatePostLink';
import Posts from '@/components/Posts/Posts';
import { useSetRecoilState } from 'recoil';
import About from '@/components/Community/About';


type CommunityPageProps = {
  communityData?: Community
}

const CommunityPage: React.FC<CommunityPageProps> = ({communityData}) => {
 
  const setCommunityStateValue = useSetRecoilState(communityState)
  if (!communityData) {
    return <NotFound />
  }

  useEffect(() => {
    setCommunityStateValue(prev => ({...prev, currentCommunity: communityData}))
  }, [])
  return (
    <>
      <Header communityData={communityData} />
      <PageLayout>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <About communityData={communityData} />
        </>
      </PageLayout>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const communityDocRef = doc(firestore, "communities", context.query.communityId as string)
    const communityDoc = await getDoc(communityDocRef)
   
   return {
        props: {
          communityData: communityDoc.exists()? JSON.parse(
            safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
          ) : ""
        },
      };
   

}
export default CommunityPage