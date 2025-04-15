
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Script, VideoProject, CreationStep, AudioSettings, Visual } from '@/types/video';

interface VideoCreationContextType {
  project: VideoProject;
  setProject: React.Dispatch<React.SetStateAction<VideoProject>>;
  currentStep: CreationStep;
  setCurrentStep: (step: CreationStep) => void;
  openaiApiKey: string;
  setOpenaiApiKey: (key: string) => void;
  elevenLabsApiKey: string;
  setElevenLabsApiKey: (key: string) => void;
  audioSettings: AudioSettings;
  setAudioSettings: React.Dispatch<React.SetStateAction<AudioSettings>>;
  progress: Record<CreationStep, boolean>;
  updateProgress: (step: CreationStep, completed: boolean) => void;
  resetProject: () => void;
}

const DEFAULT_AUDIO_SETTINGS: AudioSettings = {
  voice: "EXAVITQu4vr4xnSDxMaL", // Default voice (Sarah)
  model: "eleven_multilingual_v2",
  speed: 1.0,
  stability: 0.5,
  clarity: 0.75
};

const DEFAULT_PROJECT: VideoProject = {
  id: crypto.randomUUID(),
  topic: "",
  visuals: [],
  createdAt: new Date(),
  updatedAt: new Date()
};

const VideoCreationContext = createContext<VideoCreationContextType | undefined>(undefined);

export const VideoCreationProvider = ({ children }: { children: ReactNode }) => {
  const [project, setProject] = useState<VideoProject>({...DEFAULT_PROJECT});
  const [currentStep, setCurrentStep] = useState<CreationStep>("topic");
  const [openaiApiKey, setOpenaiApiKey] = useState<string>("");
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState<string>("");
  const [audioSettings, setAudioSettings] = useState<AudioSettings>(DEFAULT_AUDIO_SETTINGS);
  const [progress, setProgress] = useState<Record<CreationStep, boolean>>({
    topic: false,
    script: false,
    audio: false,
    visuals: false,
    assembly: false,
    rendering: false
  });

  const updateProgress = (step: CreationStep, completed: boolean) => {
    setProgress(prev => ({
      ...prev,
      [step]: completed
    }));
  };

  const resetProject = () => {
    setProject({...DEFAULT_PROJECT, id: crypto.randomUUID()});
    setCurrentStep("topic");
    setProgress({
      topic: false,
      script: false,
      audio: false,
      visuals: false,
      assembly: false,
      rendering: false
    });
  };

  return (
    <VideoCreationContext.Provider
      value={{
        project,
        setProject,
        currentStep,
        setCurrentStep,
        openaiApiKey,
        setOpenaiApiKey,
        elevenLabsApiKey,
        setElevenLabsApiKey,
        audioSettings,
        setAudioSettings,
        progress,
        updateProgress,
        resetProject
      }}
    >
      {children}
    </VideoCreationContext.Provider>
  );
};

export const useVideoCreation = () => {
  const context = useContext(VideoCreationContext);
  if (context === undefined) {
    throw new Error('useVideoCreation must be used within a VideoCreationProvider');
  }
  return context;
};
