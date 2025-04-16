
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
  // Growth hacking additions
  referralCode?: string;
  referredBy?: string;
  specialOffers?: {
    id: string;
    name: string;
    discount: number;
    expiresAt: string;
    claimed: boolean;
  }[];
  videoMetrics?: Record<string, {
    views: number;
    shares: number;
    lastViewed: string;
  }>;
  engagement?: {
    lastLogin: string;
    loginCount: number;
    featuresUsed: string[];
    videosCreated: number;
    videosShared: number;
  };
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
  },

  // Growth hacking operations
  getReferralCode(): string {
    const data = this.getData();
    if (!data.referralCode) {
      // Generate a random referral code
      const code = 'REF' + Math.random().toString(36).substring(2, 8).toUpperCase();
      data.referralCode = code;
      this.saveData(data);
    }
    return data.referralCode;
  },

  trackReferral(referrerCode: string) {
    const data = this.getData();
    data.referredBy = referrerCode;
    this.saveData(data);
  },

  getSpecialOffers(): StorageData['specialOffers'] {
    return this.getData().specialOffers || [];
  },

  addSpecialOffer(offer: Omit<NonNullable<StorageData['specialOffers']>[0], 'id' | 'claimed'>) {
    const data = this.getData();
    if (!data.specialOffers) data.specialOffers = [];
    
    data.specialOffers.push({
      id: crypto.randomUUID(),
      ...offer,
      claimed: false
    });
    
    this.saveData(data);
  },

  claimSpecialOffer(offerId: string) {
    const data = this.getData();
    if (!data.specialOffers) return;
    
    const offerIndex = data.specialOffers.findIndex(offer => offer.id === offerId);
    if (offerIndex >= 0) {
      data.specialOffers[offerIndex].claimed = true;
      this.saveData(data);
    }
  },

  trackVideoMetrics(videoId: string, metrics: { views?: number, shares?: number }) {
    const data = this.getData();
    if (!data.videoMetrics) data.videoMetrics = {};
    
    if (!data.videoMetrics[videoId]) {
      data.videoMetrics[videoId] = {
        views: 0,
        shares: 0,
        lastViewed: new Date().toISOString()
      };
    }
    
    const videoMetrics = data.videoMetrics[videoId];
    
    if (metrics.views) videoMetrics.views += metrics.views;
    if (metrics.shares) videoMetrics.shares += metrics.shares;
    
    videoMetrics.lastViewed = new Date().toISOString();
    this.saveData(data);
  },

  updateEngagement() {
    const data = this.getData();
    if (!data.engagement) {
      data.engagement = {
        lastLogin: new Date().toISOString(),
        loginCount: 1,
        featuresUsed: [],
        videosCreated: 0,
        videosShared: 0
      };
    } else {
      data.engagement.lastLogin = new Date().toISOString();
      data.engagement.loginCount += 1;
    }
    
    this.saveData(data);
  },

  trackFeatureUsage(feature: string) {
    const data = this.getData();
    if (!data.engagement) this.updateEngagement();
    
    if (!data.engagement!.featuresUsed.includes(feature)) {
      data.engagement!.featuresUsed.push(feature);
      this.saveData(data);
    }
  },

  incrementVideosCreated() {
    const data = this.getData();
    if (!data.engagement) this.updateEngagement();
    
    data.engagement!.videosCreated += 1;
    this.saveData(data);
  },

  incrementVideosShared() {
    const data = this.getData();
    if (!data.engagement) this.updateEngagement();
    
    data.engagement!.videosShared += 1;
    this.saveData(data);
  }
};
