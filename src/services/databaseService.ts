
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { 
  VideoProject, 
  Script, 
  Audio,
  Visual,
  CompletedVideo
} from "@/types/database";

/**
 * Service to handle database operations for the video creation platform
 */
export const databaseService = {
  /**
   * Create a new video project
   * @param project The project data to create
   * @returns A promise that resolves to the created project
   */
  async createProject(project: Partial<VideoProject>): Promise<VideoProject> {
    try {
      const { data, error } = await supabase
        .from('video_projects')
        .insert(project)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Create project error:', error.message);
      toast({
        title: "Failed to create project",
        description: error.message || "An error occurred while creating your project",
        variant: "destructive",
      });
      throw error;
    }
  },

  /**
   * Get a video project by ID
   * @param id The project ID
   * @returns A promise that resolves to the project
   */
  async getProject(id: string): Promise<VideoProject> {
    try {
      const { data, error } = await supabase
        .from('video_projects')
        .select(`
          *,
          scripts(*),
          audio(*),
          visuals(*),
          completed_videos(*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Get project error:', error.message);
      toast({
        title: "Failed to load project",
        description: error.message || "An error occurred while loading the project",
        variant: "destructive",
      });
      throw error;
    }
  },

  /**
   * Get all projects for the current user
   * @returns A promise that resolves to an array of projects
   */
  async getUserProjects(): Promise<VideoProject[]> {
    try {
      const { data, error } = await supabase
        .from('video_projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Get user projects error:', error.message);
      toast({
        title: "Failed to load projects",
        description: error.message || "An error occurred while loading your projects",
        variant: "destructive",
      });
      throw error;
    }
  },

  /**
   * Update a video project
   * @param id The project ID
   * @param updates The updates to apply
   * @returns A promise that resolves to the updated project
   */
  async updateProject(id: string, updates: Partial<VideoProject>): Promise<VideoProject> {
    try {
      const { data, error } = await supabase
        .from('video_projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Update project error:', error.message);
      toast({
        title: "Failed to update project",
        description: error.message || "An error occurred while updating the project",
        variant: "destructive",
      });
      throw error;
    }
  },

  /**
   * Delete a video project
   * @param id The project ID
   * @returns A promise that resolves when the project is deleted
   */
  async deleteProject(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('video_projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error: any) {
      console.error('Delete project error:', error.message);
      toast({
        title: "Failed to delete project",
        description: error.message || "An error occurred while deleting the project",
        variant: "destructive",
      });
      throw error;
    }
  },

  /**
   * Create or update a script for a project
   * @param script The script data
   * @returns A promise that resolves to the created/updated script
   */
  async saveScript(script: Partial<Script>): Promise<Script> {
    try {
      if (script.id) {
        // Update existing script
        const { data, error } = await supabase
          .from('scripts')
          .update(script)
          .eq('id', script.id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        // Create new script
        const { data, error } = await supabase
          .from('scripts')
          .insert(script)
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    } catch (error: any) {
      console.error('Save script error:', error.message);
      toast({
        title: "Failed to save script",
        description: error.message || "An error occurred while saving the script",
        variant: "destructive",
      });
      throw error;
    }
  },

  /**
   * Save audio for a project
   * @param audio The audio data
   * @returns A promise that resolves to the saved audio
   */
  async saveAudio(audio: Partial<Audio>): Promise<Audio> {
    try {
      const { data, error } = await supabase
        .from('audio')
        .insert(audio)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Save audio error:', error.message);
      toast({
        title: "Failed to save audio",
        description: error.message || "An error occurred while saving the audio",
        variant: "destructive",
      });
      throw error;
    }
  },

  /**
   * Save visuals for a project
   * @param visuals The visuals data array
   * @returns A promise that resolves to the saved visuals
   */
  async saveVisuals(visuals: Partial<Visual>[]): Promise<Visual[]> {
    try {
      const { data, error } = await supabase
        .from('visuals')
        .insert(visuals)
        .select();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Save visuals error:', error.message);
      toast({
        title: "Failed to save visuals",
        description: error.message || "An error occurred while saving the visuals",
        variant: "destructive",
      });
      throw error;
    }
  },

  /**
   * Create a completed video entry
   * @param video The completed video data
   * @returns A promise that resolves to the created video entry
   */
  async saveCompletedVideo(video: Partial<CompletedVideo>): Promise<CompletedVideo> {
    try {
      const { data, error } = await supabase
        .from('completed_videos')
        .insert(video)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Save completed video error:', error.message);
      toast({
        title: "Failed to save video",
        description: error.message || "An error occurred while saving the video",
        variant: "destructive",
      });
      throw error;
    }
  },

  /**
   * Track a video view
   * @param videoId The video ID
   */
  async trackVideoView(videoId: string): Promise<void> {
    try {
      await supabase.rpc('increment_view_count', { video_id: videoId });
    } catch (error) {
      console.error('Track video view error:', error);
    }
  },

  /**
   * Track a video share
   * @param videoId The video ID
   */
  async trackVideoShare(videoId: string): Promise<void> {
    try {
      await supabase.rpc('increment_share_count', { video_id: videoId });
    } catch (error) {
      console.error('Track video share error:', error);
    }
  },

  /**
   * Get trending videos
   * @param limit Number of videos to retrieve
   * @returns A promise that resolves to an array of trending videos
   */
  async getTrendingVideos(limit: number = 10): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('trending_videos')
        .select(`
          *,
          video:video_id(
            id,
            url,
            duration,
            view_count,
            share_count,
            project:project_id(
              id,
              topic,
              description,
              thumbnail_url,
              user_id
            )
          )
        `)
        .order('rank')
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Get trending videos error:', error.message);
      toast({
        title: "Failed to load trending videos",
        description: error.message || "An error occurred while loading trending videos",
        variant: "destructive",
      });
      throw error;
    }
  },

  /**
   * Upload a file to Supabase storage
   * @param file The file to upload
   * @param path The storage path
   * @returns A promise that resolves to the uploaded file URL
   */
  async uploadFile(file: File, path: string): Promise<string> {
    try {
      const { data, error } = await supabase.storage
        .from('video_assets')
        .upload(path, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('video_assets')
        .getPublicUrl(data.path);

      return urlData.publicUrl;
    } catch (error: any) {
      console.error('File upload error:', error.message);
      toast({
        title: "Failed to upload file",
        description: error.message || "An error occurred while uploading the file",
        variant: "destructive",
      });
      throw error;
    }
  }
};
