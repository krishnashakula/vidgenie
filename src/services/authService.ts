
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { User, Session } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  username: string;
  full_name?: string;
  avatar_url?: string;
  credits: number;
  referral_code: string;
  referred_by?: string;
  created_at: string;
}

/**
 * Auth service for handling user authentication with Supabase
 */
export const authService = {
  /**
   * Log in a user
   * @param email The user's email
   * @param password The user's password
   * @returns A promise that resolves to the user object
   */
  async login(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Fetch the user profile data
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      return { 
        ...data.user,
        profile
      };
    } catch (error: any) {
      console.error('Login error:', error.message);
      toast({
        title: "Login failed",
        description: error.message || "Failed to login. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  },
  
  /**
   * Register a new user
   * @param email The user's email
   * @param password The user's password
   * @param options Additional options like full name and referral code
   * @returns A promise that resolves to the user object
   */
  async register(email: string, password: string, options?: { full_name?: string, referral_code?: string }) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: options?.full_name || '',
          }
        }
      });

      if (error) {
        throw error;
      }

      // Process referral if provided
      if (options?.referral_code && data.user) {
        await supabase.rpc('process_referral', {
          referral_code: options.referral_code,
          referred_user_id: data.user.id
        });
      }

      // Fetch the user profile data
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user?.id)
        .single();

      return { 
        ...data.user,
        profile
      };
    } catch (error: any) {
      console.error('Registration error:', error.message);
      toast({
        title: "Registration failed",
        description: error.message || "Failed to register. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  },
  
  /**
   * Log out the current user
   */
  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error('Logout error:', error.message);
      toast({
        title: "Logout failed",
        description: error.message || "Failed to logout. Please try again.",
        variant: "destructive",
      });
    }
  },
  
  /**
   * Get the current user session
   * @returns Promise with the current session
   */
  async getSession(): Promise<Session | null> {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        throw error;
      }
      return data.session;
    } catch (error) {
      console.error('Get session error:', error);
      return null;
    }
  },
  
  /**
   * Get the current user with profile data
   * @returns Promise with the current user or null if not logged in
   */
  async getCurrentUser() {
    try {
      const { data, error } = await supabase.auth.getUser();
      
      if (error || !data.user) {
        return null;
      }
      
      // Fetch the user profile data
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
      
      if (profileError) {
        console.error('Error fetching profile:', profileError);
      }
      
      return { 
        ...data.user,
        profile: profile as UserProfile
      };
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  /**
   * Update a user's profile
   * @param profileData The profile data to update
   * @returns A promise that resolves to the updated profile
   */
  async updateProfile(profileData: Partial<UserProfile>) {
    try {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', auth.user.id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error: any) {
      console.error('Update profile error:', error.message);
      toast({
        title: "Profile update failed",
        description: error.message || "Failed to update profile. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  },

  /**
   * Get a user's referral code
   * @returns A promise that resolves to the referral code
   */
  async getReferralCode(): Promise<string | null> {
    try {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('referral_code')
        .eq('id', auth.user.id)
        .single();

      if (error) {
        throw error;
      }

      return data.referral_code;
    } catch (error) {
      console.error('Get referral code error:', error);
      return null;
    }
  },
}
