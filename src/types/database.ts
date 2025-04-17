
export interface VideoProject {
  id: string;
  user_id: string;
  topic: string;
  description?: string;
  thumbnail_url?: string;
  status: 'draft' | 'processing' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
  scripts?: Script[];
  audio?: Audio[];
  visuals?: Visual[];
  completed_videos?: CompletedVideo[];
}

export interface Script {
  id: string;
  project_id: string;
  title: string;
  introduction: string;
  body: string;
  conclusion: string;
  full_text: string;
  created_at: string;
  updated_at: string;
}

export interface Audio {
  id: string;
  project_id: string;
  src: string;
  duration: number;
  voice: string;
  model: string;
  created_at: string;
}

export interface Visual {
  id: string;
  project_id: string;
  type: 'image' | 'video';
  src: string;
  start_time: number;
  duration: number;
  description?: string;
  created_at: string;
}

export interface CompletedVideo {
  id: string;
  project_id: string;
  url: string;
  duration: number;
  view_count: number;
  share_count: number;
  created_at: string;
}

export interface UserProfile {
  id: string;
  username: string;
  full_name?: string;
  avatar_url?: string;
  credits: number;
  referral_code: string;
  referred_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Referral {
  id: string;
  referrer_id: string;
  referred_id: string;
  bonus_credits: number;
  created_at: string;
}

export interface TrendingVideo {
  id: string;
  video_id: string;
  rank: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
  video?: {
    id: string;
    url: string;
    duration: number;
    view_count: number;
    share_count: number;
    project?: {
      id: string;
      topic: string;
      description?: string;
      thumbnail_url?: string;
      user_id: string;
    };
  };
}
