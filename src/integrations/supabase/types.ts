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
      content_access: {
        Row: {
          content_type: string
          created_at: string | null
          id: string
          requires_subscription: boolean | null
        }
        Insert: {
          content_type: string
          created_at?: string | null
          id?: string
          requires_subscription?: boolean | null
        }
        Update: {
          content_type?: string
          created_at?: string | null
          id?: string
          requires_subscription?: boolean | null
        }
        Relationships: []
      }
      educational_content: {
        Row: {
          content: string
          content_type: string
          country: string
          created_at: string
          curriculum: string
          difficulty_level: string | null
          grade: string
          id: string
          is_premium: boolean | null
          subject: string
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          content_type: string
          country: string
          created_at?: string
          curriculum: string
          difficulty_level?: string | null
          grade: string
          id?: string
          is_premium?: boolean | null
          subject: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          content_type?: string
          country?: string
          created_at?: string
          curriculum?: string
          difficulty_level?: string | null
          grade?: string
          id?: string
          is_premium?: boolean | null
          subject?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      parent_student_relationships: {
        Row: {
          created_at: string | null
          id: string
          parent_id: string | null
          relationship_type: string | null
          student_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          parent_id?: string | null
          relationship_type?: string | null
          student_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          parent_id?: string | null
          relationship_type?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "parent_student_relationships_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parent_student_relationships_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          country: string
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          role: Database["public"]["Enums"]["user_role"]
          subscription_end: string | null
          subscription_status: string | null
          updated_at: string | null
          username: string
        }
        Insert: {
          country: string
          created_at?: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          role: Database["public"]["Enums"]["user_role"]
          subscription_end?: string | null
          subscription_status?: string | null
          updated_at?: string | null
          username: string
        }
        Update: {
          country?: string
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          role?: Database["public"]["Enums"]["user_role"]
          subscription_end?: string | null
          subscription_status?: string | null
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          correct_answer: string
          country: string
          created_at: string
          curriculum: string
          difficulty_level: string | null
          explanation: string | null
          grade: string
          id: string
          is_premium: boolean | null
          options: Json
          question_text: string
          question_type: string
          subject: string
          updated_at: string
        }
        Insert: {
          correct_answer: string
          country: string
          created_at?: string
          curriculum: string
          difficulty_level?: string | null
          explanation?: string | null
          grade: string
          id?: string
          is_premium?: boolean | null
          options: Json
          question_text: string
          question_type: string
          subject: string
          updated_at?: string
        }
        Update: {
          correct_answer?: string
          country?: string
          created_at?: string
          curriculum?: string
          difficulty_level?: string | null
          explanation?: string | null
          grade?: string
          id?: string
          is_premium?: boolean | null
          options?: Json
          question_text?: string
          question_type?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      student_progress: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          progress_type: string
          score: number | null
          student_id: string | null
          subject: string
          topic: string
          total_questions: number | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          progress_type: string
          score?: number | null
          student_id?: string | null
          subject: string
          topic: string
          total_questions?: number | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          progress_type?: string
          score?: number | null
          student_id?: string | null
          subject?: string
          topic?: string
          total_questions?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "student_progress_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          created_at: string | null
          grade: Database["public"]["Enums"]["grade_level"]
          id: string
          school_name: string | null
          subjects: string[] | null
        }
        Insert: {
          created_at?: string | null
          grade: Database["public"]["Enums"]["grade_level"]
          id: string
          school_name?: string | null
          subjects?: string[] | null
        }
        Update: {
          created_at?: string | null
          grade?: Database["public"]["Enums"]["grade_level"]
          id?: string
          school_name?: string | null
          subjects?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "students_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      test_results: {
        Row: {
          answers: Json
          completed_at: string
          curriculum: string
          grade: string
          id: string
          score: number
          subject: string
          test_type: string
          time_taken: number | null
          total_questions: number
          user_id: string
        }
        Insert: {
          answers: Json
          completed_at?: string
          curriculum: string
          grade: string
          id?: string
          score: number
          subject: string
          test_type: string
          time_taken?: number | null
          total_questions: number
          user_id: string
        }
        Update: {
          answers?: Json
          completed_at?: string
          curriculum?: string
          grade?: string
          id?: string
          score?: number
          subject?: string
          test_type?: string
          time_taken?: number | null
          total_questions?: number
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      grade_level:
        | "K"
        | "1"
        | "2"
        | "3"
        | "4"
        | "5"
        | "6"
        | "7"
        | "8"
        | "9"
        | "10"
        | "11"
        | "12"
      user_role: "parent" | "student" | "admin"
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
    Enums: {
      grade_level: [
        "K",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ],
      user_role: ["parent", "student", "admin"],
    },
  },
} as const
