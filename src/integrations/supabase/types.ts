export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      audio: {
        Row: {
          created_at: string | null
          duration: number
          id: string
          model: string
          project_id: string
          src: string
          voice: string
        }
        Insert: {
          created_at?: string | null
          duration: number
          id?: string
          model: string
          project_id: string
          src: string
          voice: string
        }
        Update: {
          created_at?: string | null
          duration?: number
          id?: string
          model?: string
          project_id?: string
          src?: string
          voice?: string
        }
        Relationships: [
          {
            foreignKeyName: "audio_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "video_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      completed_videos: {
        Row: {
          created_at: string | null
          duration: number
          id: string
          project_id: string
          share_count: number | null
          url: string
          view_count: number | null
        }
        Insert: {
          created_at?: string | null
          duration: number
          id?: string
          project_id: string
          share_count?: number | null
          url: string
          view_count?: number | null
        }
        Update: {
          created_at?: string | null
          duration?: number
          id?: string
          project_id?: string
          share_count?: number | null
          url?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "completed_videos_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "video_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          credits: number | null
          full_name: string | null
          id: string
          referral_code: string
          referred_by: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          credits?: number | null
          full_name?: string | null
          id: string
          referral_code: string
          referred_by?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          credits?: number | null
          full_name?: string | null
          id?: string
          referral_code?: string
          referred_by?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          bonus_credits: number | null
          created_at: string | null
          id: string
          referred_id: string
          referrer_id: string
        }
        Insert: {
          bonus_credits?: number | null
          created_at?: string | null
          id?: string
          referred_id: string
          referrer_id: string
        }
        Update: {
          bonus_credits?: number | null
          created_at?: string | null
          id?: string
          referred_id?: string
          referrer_id?: string
        }
        Relationships: []
      }
      scripts: {
        Row: {
          body: string
          conclusion: string
          created_at: string | null
          full_text: string | null
          id: string
          introduction: string
          project_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          body: string
          conclusion: string
          created_at?: string | null
          full_text?: string | null
          id?: string
          introduction: string
          project_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          body?: string
          conclusion?: string
          created_at?: string | null
          full_text?: string | null
          id?: string
          introduction?: string
          project_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scripts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "video_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      trending_videos: {
        Row: {
          created_at: string | null
          featured: boolean | null
          id: string
          rank: number
          updated_at: string | null
          video_id: string
        }
        Insert: {
          created_at?: string | null
          featured?: boolean | null
          id?: string
          rank: number
          updated_at?: string | null
          video_id: string
        }
        Update: {
          created_at?: string | null
          featured?: boolean | null
          id?: string
          rank?: number
          updated_at?: string | null
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trending_videos_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "completed_videos"
            referencedColumns: ["id"]
          },
        ]
      }
      video_projects: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          status: string | null
          thumbnail_url: string | null
          topic: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          thumbnail_url?: string | null
          topic: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          thumbnail_url?: string | null
          topic?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      visuals: {
        Row: {
          created_at: string | null
          description: string | null
          duration: number
          id: string
          project_id: string
          src: string
          start_time: number
          type: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration: number
          id?: string
          project_id: string
          src: string
          start_time: number
          type: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration?: number
          id?: string
          project_id?: string
          src?: string
          start_time?: number
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "visuals_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "video_projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_credits: {
        Args: { user_uuid: string }
        Returns: number
      }
      process_referral: {
        Args: { referral_code: string; referred_user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
