
// Simple auth service for handling user authentication
// This is a placeholder implementation that can be replaced with a real authentication service

/**
 * Auth service for handling user authentication
 */
export const authService = {
  /**
   * Log in a user
   * @param email The user's email
   * @param password The user's password
   * @returns A promise that resolves to the user object
   */
  async login(email: string, password: string) {
    // This is a placeholder implementation
    // In a real app, you would validate credentials with a backend
    console.log('Logging in with:', email);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demo purposes, always succeed with a mock user
        resolve({
          id: '123',
          name: email.split('@')[0], // Use part of email as name
          email,
          avatarUrl: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(email.split('@')[0])
        });
      }, 500);
    });
  },
  
  /**
   * Register a new user
   * @param name The user's name
   * @param email The user's email
   * @param password The user's password
   * @returns A promise that resolves to the user object
   */
  async register(name: string, email: string, password: string) {
    // This is a placeholder implementation
    // In a real app, you would register the user with a backend
    console.log('Registering:', name, email);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demo purposes, always succeed with a mock user
        resolve({
          id: '123',
          name,
          email,
          avatarUrl: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name)
        });
      }, 500);
    });
  },
  
  /**
   * Log out the current user
   */
  logout() {
    console.log('Logging out user');
    // In a real app, you would clear session cookies, tokens, etc.
  },
  
  /**
   * Get the current user
   * @returns The current user or null if not logged in
   */
  getCurrentUser() {
    // In a real app, you would check for a valid session
    return null;
  }
};
