import { Timestamp } from "firebase/firestore";

export interface Community {
  id: string;
  creatorID: string;
  privacyType: PrivacyType;
  numberOfMembers: number;
  createdAt?: Timestamp;
  imageUrl?: string;
}

export type PrivacyType = 'public' | 'restricted' | "private"