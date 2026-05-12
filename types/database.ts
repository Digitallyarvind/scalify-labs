export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          category: string
          tags: string[] | null
          status: 'draft' | 'published' | 'scheduled'
          meta_title: string | null
          meta_description: string | null
          og_image: string | null
          author_name: string
          scheduled_at: string | null
          published_at: string | null
          created_at: string
          updated_at: string
          views: number
        }
        Insert: Omit<Database['public']['Tables']['posts']['Row'], 'id' | 'created_at' | 'updated_at' | 'views'>
        Update: Partial<Database['public']['Tables']['posts']['Insert']>
      }
      pages: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          type: 'home' | 'service' | 'landing' | 'info' | 'course'
          status: 'published' | 'draft'
          meta_title: string | null
          meta_description: string | null
          og_image: string | null
          sections: Record<string, unknown> | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['pages']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['pages']['Insert']>
      }
      leads: {
        Row: {
          id: string
          name: string
          phone: string
          email: string | null
          business: string | null
          city: string | null
          source: string
          service_interest: string | null
          message: string | null
          stage: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'
          score: number
          budget: string | null
          followup_date: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['leads']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['leads']['Insert']>
      }
      lead_activities: {
        Row: {
          id: string
          lead_id: string
          type: 'note' | 'call' | 'email' | 'meeting' | 'stage_change' | 'whatsapp'
          content: string
          created_by: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['lead_activities']['Row'], 'id' | 'created_at'>
        Update: never
      }
      s30_batches: {
        Row: {
          id: string
          name: string
          seats: number
          fee: number
          start_date: string
          end_date: string
          app_open: string
          app_close: string
          mode: 'offline' | 'online' | 'hybrid'
          description: string | null
          status: 'upcoming' | 'accepting' | 'closed' | 'completed'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['s30_batches']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['s30_batches']['Insert']>
      }
      s30_applicants: {
        Row: {
          id: string
          batch_id: string
          name: string
          phone: string
          email: string
          city: string | null
          age: number | null
          gender: string | null
          education: string | null
          occupation: string | null
          source: string | null
          why_join: string | null
          one_year_goal: string | null
          stage: 'applied' | 'counselling' | 'psychometric' | 'interview' | 'selected' | 'enrolled' | 'rejected'
          score_academic: number
          score_psychometric: number
          score_interview: number
          score_motivation: number
          score_total: number
          rapd_r: number
          rapd_a: number
          rapd_p: number
          rapd_d: number
          rapd_s: number
          fee_status: 'pending' | 'partial' | 'paid'
          offer_sent: boolean
          offer_declined: boolean
          ban_until: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['s30_applicants']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['s30_applicants']['Insert']>
      }
      media: {
        Row: {
          id: string
          name: string
          url: string
          size: number
          type: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['media']['Row'], 'id' | 'created_at'>
        Update: never
      }
    }
  }
}

// Convenience types
export type Post = Database['public']['Tables']['posts']['Row']
export type Page = Database['public']['Tables']['pages']['Row']
export type Lead = Database['public']['Tables']['leads']['Row']
export type LeadActivity = Database['public']['Tables']['lead_activities']['Row']
export type Batch = Database['public']['Tables']['s30_batches']['Row']
export type Applicant = Database['public']['Tables']['s30_applicants']['Row']
