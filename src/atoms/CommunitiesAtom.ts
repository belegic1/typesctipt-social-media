import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Community {
  id: string;
  creatorID: string;
  privacyType: PrivacyType;
  numberOfMembers: number;
  createdAt?: Timestamp;
  imageURL?: string;
}

export type PrivacyType = 'public' | 'restricted' | "private";
export interface CommunitySnippet{
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;

}
interface CommunityState{
  mySnippets: CommunitySnippet[];
  currentCommunity?: Community
}

const defaultCommunityState: CommunityState = {
  mySnippets: [],
}

export const communityState = atom<CommunityState>({
  key: 'communitiesState',
  default: defaultCommunityState,
})