
export interface Script {
  title: string;
  introduction: string;
  body: string;
  conclusion: string;
  fullText: string;
}

export interface AudioSettings {
  voice: string;
  model: string;
  speed: number;
  stability: number;
  clarity: number;
}

export interface Visual {
  id: string;
  type: 'image' | 'video';
  src: string;
  startTime: number;
  duration: number;
  description: string;
}

export interface VideoProject {
  id: string;
  topic: string;
  description?: string;
  script?: Script;
  audio?: {
    src: string;
    duration: number;
  };
  visuals: Visual[];
  createdAt: Date;
  updatedAt: Date;
}

export type CreationStep = 
  | 'topic'
  | 'script' 
  | 'audio' 
  | 'visuals'
  | 'assembly'
  | 'rendering';

export interface ElevenLabsVoice {
  voice_id: string;
  name: string;
  category?: string;
}
