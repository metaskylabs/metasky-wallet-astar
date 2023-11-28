export interface ReferralsReward {
  invite_link: string;
  social_invite: string;
}
export interface ReferralsData {
  name: string | null;
  contact: string;
  message?: string;
  date: string;
  reward_amount?: string;
  reward_currency?: string;
  inr_reward_amount?: string;
  status?: boolean;
}
export interface ReferralsList {
  total_reward_amount: string;
  total_user_joined: number;
  rewards: ReferralsData[];
}

export interface ReferralConfig {
  hasRewards: boolean;
  isActive: boolean;
}
