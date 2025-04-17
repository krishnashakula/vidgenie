import React, { createContext, useState, useContext, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { storageService } from '@/services/storageService';
import { authService } from '@/services/authService';

// Define types
export type CreationStep = 'topic' | 'script' | 'audio' | 'visuals' | 'assembly' | 'rendering';

export interface Project {
  id: string;
  topic: string;
  description: string;
  script: Script | null;
  audio: Audio | null;
  visuals: Visual[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Script {
  id: string;
  fullText: string;
  sentences: string[];
}

export interface Audio {
  id: string;
  src: string;
  duration: number;
}

export interface Visual {
  id: string;
  url: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

interface VideoCreationContextType {
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  currentStep: CreationStep | null;
  setCurrentStep: React.Dispatch<React.SetStateAction<CreationStep | null>>;
  progress: Record<CreationStep, boolean>;
  updateProgress: (step: CreationStep, completed: boolean) => void;
  resetProgress: () => void;
  openaiApiKey: string;
  setOpenaiApiKey: React.Dispatch<React.SetStateAction<string>>;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  resetProject: () => void;
}

// Create context with a default value
const VideoCreationContext = createContext<VideoCreationContextType>({
  project: {
    id: '',
    topic: '',
    description: '',
    script: null,
    audio: null,
    visuals: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  setProject: () => {},
  projects: [],
  setProjects: () => {},
  currentStep: null,
  setCurrentStep: () => {},
  progress: {
    topic: false,
    script: false,
    audio: false,
    visuals: false,
    assembly: false,
    rendering: false
  },
  updateProgress: () => {},
  resetProgress: () => {},
  openaiApiKey: '',
  setOpenaiApiKey: () => {},
  user: null,
  login: () => {},
  logout: () => {},
  resetProject: () => {},
});

// Hook for using the video creation context
export const useVideoCreation = () => useContext(VideoCreationContext);

// Provider component
export const VideoCreationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use local storage to persist state (if available)
  const initialProject = storageService.getItem('currentProject') || {
    id: uuidv4(),
    topic: '',
    description: '',
    script: null,
    audio: null,
    visuals: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  // Initialize state
  const [project, setProject] = useState<Project>(initialProject);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentStep, setCurrentStep] = useState<CreationStep | null>(null); // Set to null initially
  const [openaiApiKey, setOpenaiApiKey] = useState<string>(storageService.getItem('openaiApiKey') || '');
  const [user, setUser] = useState<User | null>(storageService.getItem('user') || null);
  
  // Initialize progress state
  const [progress, setProgress] = useState<Record<CreationStep, boolean>>({
    topic: false,
    script: false,
    audio: false,
    visuals: false,
    assembly: false,
    rendering: false
  });

  // Function to update the progress for a specific step
  const updateProgress = useCallback((step: CreationStep, completed: boolean) => {
    setProgress(prevProgress => ({
      ...prevProgress,
      [step]: completed,
    }));
  }, []);

  // Function to reset the progress
  const resetProgress = useCallback(() => {
    setProgress({
      topic: false,
      script: false,
      audio: false,
      visuals: false,
      assembly: false,
      rendering: false
    });
  }, []);
  
  // Function to handle user login
  const login = useCallback((user: User) => {
    setUser(user);
    storageService.setItem('user', user);
  }, []);

  // Function to handle user logout
  const logout = useCallback(() => {
    setUser(null);
    storageService.removeItem('user');
    authService.logout(); // Clear session from backend
  }, []);
  
  const resetProject = useCallback(() => {
    const newProject: Project = {
      id: uuidv4(),
      topic: '',
      description: '',
      script: null,
      audio: null,
      visuals: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setProject(newProject);
    storageService.setItem('currentProject', newProject);
    resetProgress();
    setCurrentStep(null);
  }, [resetProgress]);

  return (
    <VideoCreationContext.Provider
      value={{
        project,
        setProject,
        projects,
        setProjects,
        currentStep,
        setCurrentStep,
        progress,
        updateProgress,
        resetProgress,
        openaiApiKey,
        setOpenaiApiKey,
        user,
        login,
        logout,
        resetProject,
      }}
    >
      {children}
    </VideoCreationContext.Provider>
  );
};
