
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

// Audio settings for ElevenLabs API
export interface AudioSettings {
  voice: string;
  model: string;
  stability: number;
  clarity: number;
  speed: number;
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
  elevenLabsApiKey: string;
  setElevenLabsApiKey: React.Dispatch<React.SetStateAction<string>>;
  audioSettings: AudioSettings;
  setAudioSettings: React.Dispatch<React.SetStateAction<AudioSettings>>;
  user: User | null;
  login: (email: string, password: string) => Promise<any>;
  register: (name: string, email: string, password: string) => Promise<any>;
  logout: () => void;
  resetProject: () => void;
  loadProject: (projectId: string) => void;
  createNewProject: () => void;
}

// Default audio settings
const defaultAudioSettings: AudioSettings = {
  voice: "21m00Tcm4TlvDq8ikWAM", // Default voice ID
  model: "eleven_multilingual_v2", // Default model
  stability: 0.5,
  clarity: 0.75,
  speed: 1.0
};

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
  elevenLabsApiKey: '',
  setElevenLabsApiKey: () => {},
  audioSettings: defaultAudioSettings,
  setAudioSettings: () => {},
  user: null,
  login: async () => null,
  register: async () => null,
  logout: () => {},
  resetProject: () => {},
  loadProject: () => {},
  createNewProject: () => {},
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
  const [projects, setProjects] = useState<Project[]>(storageService.getItem('projects') || []);
  const [currentStep, setCurrentStep] = useState<CreationStep | null>(null); // Set to null initially
  const [openaiApiKey, setOpenaiApiKey] = useState<string>(storageService.getItem('openaiApiKey') || '');
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState<string>(storageService.getItem('elevenLabsApiKey') || '');
  const [audioSettings, setAudioSettings] = useState<AudioSettings>(storageService.getItem('audioSettings') || defaultAudioSettings);
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
  const login = useCallback(async (email: string, password: string) => {
    try {
      const user = await authService.login(email, password);
      setUser(user as User);
      storageService.setItem('user', user);
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, []);

  // Function to handle user registration
  const register = useCallback(async (name: string, email: string, password: string) => {
    try {
      const user = await authService.register(name, email, password);
      setUser(user as User);
      storageService.setItem('user', user);
      return user;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }, []);

  // Function to handle user logout
  const logout = useCallback(() => {
    setUser(null);
    storageService.removeItem('user');
    authService.logout(); // Clear session from backend
  }, []);
  
  // Function to reset project
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

  // Function to load a project
  const loadProject = useCallback((projectId: string) => {
    const projectToLoad = projects.find(p => p.id === projectId);
    
    if (projectToLoad) {
      setProject(projectToLoad);
      storageService.setItem('currentProject', projectToLoad);
      
      // Update progress based on project state
      const newProgress = {
        topic: !!projectToLoad.topic,
        script: !!projectToLoad.script,
        audio: !!projectToLoad.audio,
        visuals: projectToLoad.visuals.length > 0,
        assembly: false, // Assembly is a process step
        rendering: false // Rendering is a process step
      };
      
      setProgress(newProgress);
    }
  }, [projects]);

  // Function to create a new project
  const createNewProject = useCallback(() => {
    resetProject();
  }, [resetProject]);

  // Save projects to local storage whenever they change
  React.useEffect(() => {
    storageService.setItem('projects', projects);
  }, [projects]);

  // Save audio settings to local storage whenever they change
  React.useEffect(() => {
    storageService.setItem('audioSettings', audioSettings);
  }, [audioSettings]);

  // Save API keys whenever they change
  React.useEffect(() => {
    storageService.setItem('openaiApiKey', openaiApiKey);
  }, [openaiApiKey]);

  React.useEffect(() => {
    storageService.setItem('elevenLabsApiKey', elevenLabsApiKey);
  }, [elevenLabsApiKey]);

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
        elevenLabsApiKey,
        setElevenLabsApiKey,
        audioSettings,
        setAudioSettings,
        user,
        login,
        register,
        logout,
        resetProject,
        loadProject,
        createNewProject,
      }}
    >
      {children}
    </VideoCreationContext.Provider>
  );
};
