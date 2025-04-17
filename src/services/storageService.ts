
// Simple storage service for persisting data in localStorage

/**
 * Storage service for persisting data in localStorage
 * Falls back to in-memory storage if localStorage is not available
 */
export const storageService = {
  // In-memory fallback storage
  memoryStorage: new Map<string, any>(),
  
  /**
   * Check if localStorage is available
   * @returns true if localStorage is available
   */
  isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  },

  /**
   * Set an item in storage
   * @param key The key to store the value under
   * @param value The value to store
   */
  setItem(key: string, value: any): void {
    try {
      if (this.isLocalStorageAvailable()) {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        this.memoryStorage.set(key, value);
      }
    } catch (e) {
      console.error('Error storing data:', e);
      // Fallback to memory storage
      this.memoryStorage.set(key, value);
    }
  },

  /**
   * Get an item from storage
   * @param key The key to retrieve
   * @returns The value or null if not found
   */
  getItem(key: string): any {
    try {
      if (this.isLocalStorageAvailable()) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } else {
        return this.memoryStorage.get(key) || null;
      }
    } catch (e) {
      console.error('Error retrieving data:', e);
      // Try fallback to memory storage
      return this.memoryStorage.get(key) || null;
    }
  },

  /**
   * Remove an item from storage
   * @param key The key to remove
   */
  removeItem(key: string): void {
    try {
      if (this.isLocalStorageAvailable()) {
        localStorage.removeItem(key);
      }
      // Always remove from memory storage too
      this.memoryStorage.delete(key);
    } catch (e) {
      console.error('Error removing data:', e);
    }
  },

  /**
   * Clear all items from storage
   */
  clear(): void {
    try {
      if (this.isLocalStorageAvailable()) {
        localStorage.clear();
      }
      this.memoryStorage.clear();
    } catch (e) {
      console.error('Error clearing data:', e);
    }
  },

  /**
   * Get the user's referral code
   * @returns The referral code or a generated one if not found
   */
  getReferralCode(): string {
    const code = this.getItem('referralCode');
    if (code) return code;
    
    // Generate a random referral code if none exists
    const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    this.setItem('referralCode', randomCode);
    return randomCode;
  }
};
