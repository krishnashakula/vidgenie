
/**
 * Service to handle local storage operations with type safety
 */

// Define the structure of what we store in local storage
export interface StorageData {
  user?: {
    id: string;
    name: string;
    email: string;
  };
  apiKeys?: {
    openai: string;
    elevenLabs: string;
  };
  projects?: Record<string, any>; // Store projects by ID
  currentProjectId?: string;
}

const STORAGE_KEY = 'video_creator_data';

export const storageService = {
  // Get all data
  getData(): StorageData {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return {};
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse storage data', e);
      return {};
    }
  },

  // Save all data
  saveData(data: StorageData): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  // User related operations
  getUser() {
    return this.getData().user;
  },

  saveUser(user: StorageData['user']) {
    const data = this.getData();
    data.user = user;
    this.saveData(data);
  },

  // API key operations
  getApiKeys() {
    return this.getData().apiKeys || { openai: '', elevenLabs: '' };
  },

  saveApiKeys(keys: StorageData['apiKeys']) {
    const data = this.getData();
    data.apiKeys = keys;
    this.saveData(data);
  },

  // Project operations
  getProjects() {
    return this.getData().projects || {};
  },

  getProject(id: string) {
    const projects = this.getProjects();
    return projects[id];
  },

  saveProject(id: string, projectData: any) {
    const data = this.getData();
    if (!data.projects) data.projects = {};
    data.projects[id] = projectData;
    this.saveData(data);
  },

  setCurrentProject(id: string) {
    const data = this.getData();
    data.currentProjectId = id;
    this.saveData(data);
  },

  getCurrentProjectId() {
    return this.getData().currentProjectId;
  },

  // Clear all data
  clearAll() {
    localStorage.removeItem(STORAGE_KEY);
  }
};

