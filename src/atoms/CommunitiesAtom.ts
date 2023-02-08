import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Community {
  id: string;
  creatorID: string;
  privacyType: PrivacyType;
  numberOfMembers: number;
  createdAt?: Timestamp;
  imageUrl?: string;
}

export type PrivacyType = 'public' | 'restricted' | "private";
export interface CommunitySnippet{
  communityId: string;
  isModerator?: boolean;
  imageUrl?: string;

}
interface CommunityState{
  mySnippets: CommunitySnippet[];
  //visitedCommunities
}

const defaultCommunityState: CommunityState = {
  mySnippets: [],
}

export const communityState = atom<CommunityState>({
  key: 'communitiesState',
  default: defaultCommunityState,
})