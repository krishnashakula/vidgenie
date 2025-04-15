
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Script, VideoProject, CreationStep, AudioSettings, Visual } from '@/types/video';
import { storageService } from '@/services/storageService';

interface User {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
}

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
  // New user related functions
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  // Project management functions
  projects: VideoProject[];
  loadProject: (projectId: string) => void;
  saveCurrentProject: () => void;
  createNewProject: () => void;
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
  // State for the current project
  const [project, setProject] = useState<VideoProject>({...DEFAULT_PROJECT});
  const [currentStep, setCurrentStep] = useState<CreationStep>("topic");
  
  // API keys state
  const [openaiApiKey, setOpenaiApiKey] = useState<string>("");
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState<string>("");
  
  // Audio settings
  const [audioSettings, setAudioSettings] = useState<AudioSettings>(DEFAULT_AUDIO_SETTINGS);
  
  // Progress tracking
  const [progress, setProgress] = useState<Record<CreationStep, boolean>>({
    topic: false,
    script: false,
    audio: false,
    visuals: false,
    assembly: false,
    rendering: false
  });

  // User state
  const [user, setUser] = useState<User | null>(null);
  
  // Projects list
  const [projects, setProjects] = useState<VideoProject[]>([]);

  // Load saved data when component mounts
  useEffect(() => {
    // Load saved API keys
    const savedKeys = storageService.getApiKeys();
    if (savedKeys.openai) setOpenaiApiKey(savedKeys.openai);
    if (savedKeys.elevenLabs) setElevenLabsApiKey(savedKeys.elevenLabs);

    // Load user data
    const savedUser = storageService.getUser();
    if (savedUser) {
      setUser({
        ...savedUser,
        isLoggedIn: true
      });
    }

    // Load projects and current project
    const savedProjects = storageService.getProjects();
    if (savedProjects) {
      const projectList = Object.values(savedProjects) as VideoProject[];
      setProjects(projectList);

      // Load current project if available
      const currentProjectId = storageService.getCurrentProjectId();
      if (currentProjectId && savedProjects[currentProjectId]) {
        const currentProject = savedProjects[currentProjectId];
        setProject(currentProject);
        
        // Set progress based on project state
        const newProgress = {
          topic: !!currentProject.topic,
          script: !!currentProject.script,
          audio: !!currentProject.audio,
          visuals: currentProject.visuals.length > 0,
          assembly: false,
          rendering: false
        };
        setProgress(newProgress);
        
        // Set current step - find the first incomplete step
        const steps: CreationStep[] = ["topic", "script", "audio", "visuals", "assembly", "rendering"];
        const firstIncompleteStep = steps.find(step => !newProgress[step]) || "topic";
        setCurrentStep(firstIncompleteStep);
      }
    }
  }, []);

  // Save API keys when they change
  useEffect(() => {
    storageService.saveApiKeys({
      openai: openaiApiKey,
      elevenLabs: elevenLabsApiKey
    });
  }, [openaiApiKey, elevenLabsApiKey]);

  // Save current project when it changes
  useEffect(() => {
    if (project.id) {
      storageService.saveProject(project.id, project);
      storageService.setCurrentProject(project.id);
    }
  }, [project]);

  const updateProgress = (step: CreationStep, completed: boolean) => {
    setProgress(prev => ({
      ...prev,
      [step]: completed
    }));
  };

  const resetProject = () => {
    const newProject = {...DEFAULT_PROJECT, id: crypto.randomUUID()};
    setProject(newProject);
    setCurrentStep("topic");
    setProgress({
      topic: false,
      script: false,
      audio: false,
      visuals: false,
      assembly: false,
      rendering: false
    });
    storageService.saveProject(newProject.id, newProject);
    storageService.setCurrentProject(newProject.id);
  };

  // User authentication functions (simplified for local storage)
  const login = async (email: string, password: string) => {
    // In a real app, you'd validate with a server
    // For now, we'll simulate by checking localStorage
    const data = storageService.getData();
    const savedUser = data.user;
    
    if (!savedUser || savedUser.email !== email) {
      throw new Error("Invalid credentials");
    }
    
    // In a real app, you'd verify the password here
    
    setUser({
      ...savedUser,
      isLoggedIn: true
    });
  };

  const register = async (name: string, email: string, password: string) => {
    // In a real app, you'd send this to a server
    // For now, we'll just store in localStorage
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email
    };
    
    // In a real app, you'd hash the password
    
    storageService.saveUser(newUser);
    setUser({
      ...newUser,
      isLoggedIn: true
    });
  };

  const logout = () => {
    setUser(null);
  };

  // Project management functions
  const loadProject = (projectId: string) => {
    const projectData = storageService.getProject(projectId);
    if (projectData) {
      setProject(projectData);
      storageService.setCurrentProject(projectId);
      
      // Update progress based on the loaded project
      setProgress({
        topic: !!projectData.topic,
        script: !!projectData.script,
        audio: !!projectData.audio,
        visuals: projectData.visuals.length > 0,
        assembly: false,
        rendering: false
      });
    }
  };

  const saveCurrentProject = () => {
    if (project.id) {
      storageService.saveProject(project.id, {
        ...project,
        updatedAt: new Date()
      });
    }
  };

  const createNewProject = () => {
    resetProject();
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
        resetProject,
        user,
        login,
        register,
        logout,
        projects,
        loadProject,
        saveCurrentProject,
        createNewProject
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
