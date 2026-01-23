export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      activity_log: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          entity_id: string | null
          entity_type: string | null
          id: string
          ip_address: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      admin_audit_logs: {
        Row: {
          action_type: string
          admin_user_id: string
          created_at: string
          details: Json | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          action_type: string
          admin_user_id: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          action_type?: string
          admin_user_id?: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      admin_events: {
        Row: {
          created_at: string | null
          description: string | null
          end_time: string | null
          event_type: string | null
          id: string
          location: string | null
          start_time: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_time?: string | null
          event_type?: string | null
          id?: string
          location?: string | null
          start_time: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_time?: string | null
          event_type?: string | null
          id?: string
          location?: string | null
          start_time?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      admin_tasks: {
        Row: {
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          priority: string | null
          status: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      affiliate_referrals: {
        Row: {
          affiliate_id: string
          commission_earned: number | null
          conversion_value: number | null
          created_at: string
          id: string
          metadata: Json | null
          order_id: string | null
          referral_code: string
          referral_source: string | null
          referred_user_id: string | null
        }
        Insert: {
          affiliate_id: string
          commission_earned?: number | null
          conversion_value?: number | null
          created_at?: string
          id?: string
          metadata?: Json | null
          order_id?: string | null
          referral_code: string
          referral_source?: string | null
          referred_user_id?: string | null
        }
        Update: {
          affiliate_id?: string
          commission_earned?: number | null
          conversion_value?: number | null
          created_at?: string
          id?: string
          metadata?: Json | null
          order_id?: string | null
          referral_code?: string
          referral_source?: string | null
          referred_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_referrals_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "affiliate_referrals_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "partner_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_insurance_purchases: {
        Row: {
          amount: number
          billing_cycle: string
          coverage_tier: string
          created_at: string
          email: string
          full_name: string
          id: string
          payment_status: string | null
          stripe_payment_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          billing_cycle: string
          coverage_tier: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          payment_status?: string | null
          stripe_payment_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          billing_cycle?: string
          coverage_tier?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          payment_status?: string | null
          stripe_payment_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      analyst_profiles: {
        Row: {
          created_at: string
          department: string | null
          education_level: string | null
          id: string
          linkedin_url: string | null
          specialization: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          education_level?: string | null
          id?: string
          linkedin_url?: string | null
          specialization?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          department?: string | null
          education_level?: string | null
          id?: string
          linkedin_url?: string | null
          specialization?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          created_at: string | null
          event_category: string | null
          event_data: Json | null
          event_name: string
          id: string
          ip_address: string | null
          page_title: string | null
          page_url: string | null
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_category?: string | null
          event_data?: Json | null
          event_name: string
          id?: string
          ip_address?: string | null
          page_title?: string | null
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_category?: string | null
          event_data?: Json | null
          event_name?: string
          id?: string
          ip_address?: string | null
          page_title?: string | null
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      appointments: {
        Row: {
          actual_end: string | null
          actual_start: string | null
          attachments: Json | null
          client_id: string | null
          client_signature: string | null
          completion_notes: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_virtual: boolean | null
          location: string | null
          scheduled_end: string
          scheduled_start: string
          service_id: string | null
          special_instructions: string | null
          status: Database["public"]["Enums"]["appointment_status"] | null
          title: string
          updated_at: string
          worker_id: string | null
          zoom_link: string | null
        }
        Insert: {
          actual_end?: string | null
          actual_start?: string | null
          attachments?: Json | null
          client_id?: string | null
          client_signature?: string | null
          completion_notes?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_virtual?: boolean | null
          location?: string | null
          scheduled_end: string
          scheduled_start: string
          service_id?: string | null
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["appointment_status"] | null
          title: string
          updated_at?: string
          worker_id?: string | null
          zoom_link?: string | null
        }
        Update: {
          actual_end?: string | null
          actual_start?: string | null
          attachments?: Json | null
          client_id?: string | null
          client_signature?: string | null
          completion_notes?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_virtual?: boolean | null
          location?: string | null
          scheduled_end?: string
          scheduled_start?: string
          service_id?: string | null
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["appointment_status"] | null
          title?: string
          updated_at?: string
          worker_id?: string | null
          zoom_link?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "service_catalog"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          author_id: string | null
          category: string
          content: string
          created_at: string | null
          excerpt: string | null
          featured_image_url: string | null
          id: string
          published_at: string | null
          scheduled_for: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string | null
          views: number | null
        }
        Insert: {
          author_id?: string | null
          category: string
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          published_at?: string | null
          scheduled_for?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          author_id?: string | null
          category?: string
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          published_at?: string | null
          scheduled_for?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "articles_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "articles_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles_limited"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "articles_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles_safe"
            referencedColumns: ["id"]
          },
        ]
      }
      auth_audit_logs: {
        Row: {
          created_at: string | null
          email: string | null
          event_type: string
          id: string
          ip_address: string | null
          metadata: Json | null
          reason: string | null
          success: boolean | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          event_type: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          reason?: string | null
          success?: boolean | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          event_type?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          reason?: string | null
          success?: boolean | null
          user_agent?: string | null
        }
        Relationships: []
      }
      booking_requests: {
        Row: {
          admin_notes: string | null
          assigned_to: string | null
          base_price: number | null
          created_at: string
          discount_amount: number | null
          email: string
          final_price: number | null
          full_name: string
          id: string
          is_veteran: boolean | null
          message: string | null
          metadata: Json | null
          phone: string | null
          preferred_dates: string | null
          request_number: string
          service_name: string
          service_tier: string | null
          service_type: string
          status: string
          updated_at: string
          user_id: string | null
          veteran_id_last4: string | null
          veteran_type: string | null
        }
        Insert: {
          admin_notes?: string | null
          assigned_to?: string | null
          base_price?: number | null
          created_at?: string
          discount_amount?: number | null
          email: string
          final_price?: number | null
          full_name: string
          id?: string
          is_veteran?: boolean | null
          message?: string | null
          metadata?: Json | null
          phone?: string | null
          preferred_dates?: string | null
          request_number?: string
          service_name: string
          service_tier?: string | null
          service_type: string
          status?: string
          updated_at?: string
          user_id?: string | null
          veteran_id_last4?: string | null
          veteran_type?: string | null
        }
        Update: {
          admin_notes?: string | null
          assigned_to?: string | null
          base_price?: number | null
          created_at?: string
          discount_amount?: number | null
          email?: string
          final_price?: number | null
          full_name?: string
          id?: string
          is_veteran?: boolean | null
          message?: string | null
          metadata?: Json | null
          phone?: string | null
          preferred_dates?: string | null
          request_number?: string
          service_name?: string
          service_tier?: string | null
          service_type?: string
          status?: string
          updated_at?: string
          user_id?: string | null
          veteran_id_last4?: string | null
          veteran_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_requests_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_requests_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles_limited"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_requests_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles_safe"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          contact_id: string
          created_at: string
          id: string
          notes: string | null
          scheduled_at: string
          service_id: string
          status: Database["public"]["Enums"]["booking_status"]
          updated_at: string
        }
        Insert: {
          contact_id: string
          created_at?: string
          id?: string
          notes?: string | null
          scheduled_at: string
          service_id: string
          status?: Database["public"]["Enums"]["booking_status"]
          updated_at?: string
        }
        Update: {
          contact_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          scheduled_at?: string
          service_id?: string
          status?: Database["public"]["Enums"]["booking_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      buyers: {
        Row: {
          amount: number
          id: string
          product_name: string
          purchase_date: string | null
          status: string
          user_id: string
        }
        Insert: {
          amount: number
          id?: string
          product_name: string
          purchase_date?: string | null
          status?: string
          user_id: string
        }
        Update: {
          amount?: number
          id?: string
          product_name?: string
          purchase_date?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      campaign_recipients: {
        Row: {
          campaign_id: string | null
          clicked_at: string | null
          created_at: string | null
          id: string
          opened_at: string | null
          recipient_email: string
          recipient_name: string | null
          sent_at: string | null
          status: string | null
        }
        Insert: {
          campaign_id?: string | null
          clicked_at?: string | null
          created_at?: string | null
          id?: string
          opened_at?: string | null
          recipient_email: string
          recipient_name?: string | null
          sent_at?: string | null
          status?: string | null
        }
        Update: {
          campaign_id?: string | null
          clicked_at?: string | null
          created_at?: string | null
          id?: string
          opened_at?: string | null
          recipient_email?: string
          recipient_name?: string | null
          sent_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_recipients_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      caregiver_profiles: {
        Row: {
          availability_afternoons: boolean | null
          availability_evenings: boolean | null
          availability_mornings: boolean | null
          availability_nights: boolean | null
          availability_weekends: boolean | null
          available_hours_per_week: number | null
          background_check_consent: boolean | null
          background_check_status: string | null
          certification_number: string | null
          certification_type: string | null
          created_at: string
          id: string
          reference1_email: string | null
          reference1_name: string | null
          reference1_phone: string | null
          reference2_email: string | null
          reference2_name: string | null
          reference2_phone: string | null
          updated_at: string
          user_id: string
          years_experience: number | null
        }
        Insert: {
          availability_afternoons?: boolean | null
          availability_evenings?: boolean | null
          availability_mornings?: boolean | null
          availability_nights?: boolean | null
          availability_weekends?: boolean | null
          available_hours_per_week?: number | null
          background_check_consent?: boolean | null
          background_check_status?: string | null
          certification_number?: string | null
          certification_type?: string | null
          created_at?: string
          id?: string
          reference1_email?: string | null
          reference1_name?: string | null
          reference1_phone?: string | null
          reference2_email?: string | null
          reference2_name?: string | null
          reference2_phone?: string | null
          updated_at?: string
          user_id: string
          years_experience?: number | null
        }
        Update: {
          availability_afternoons?: boolean | null
          availability_evenings?: boolean | null
          availability_mornings?: boolean | null
          availability_nights?: boolean | null
          availability_weekends?: boolean | null
          available_hours_per_week?: number | null
          background_check_consent?: boolean | null
          background_check_status?: string | null
          certification_number?: string | null
          certification_type?: string | null
          created_at?: string
          id?: string
          reference1_email?: string | null
          reference1_name?: string | null
          reference1_phone?: string | null
          reference2_email?: string | null
          reference2_name?: string | null
          reference2_phone?: string | null
          updated_at?: string
          user_id?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      client_communications: {
        Row: {
          attachments: Json | null
          body: string
          client_id: string | null
          created_at: string
          id: string
          is_from_client: boolean | null
          sender_id: string | null
          subject: string | null
        }
        Insert: {
          attachments?: Json | null
          body: string
          client_id?: string | null
          created_at?: string
          id?: string
          is_from_client?: boolean | null
          sender_id?: string | null
          subject?: string | null
        }
        Update: {
          attachments?: Json | null
          body?: string
          client_id?: string | null
          created_at?: string
          id?: string
          is_from_client?: boolean | null
          sender_id?: string | null
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_communications_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      client_messages: {
        Row: {
          client_id: string | null
          content: string
          created_at: string | null
          id: string
          is_from_client: boolean | null
          is_read: boolean | null
          is_starred: boolean | null
          message_type: string | null
          sender_id: string | null
          subject: string | null
        }
        Insert: {
          client_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          is_from_client?: boolean | null
          is_read?: boolean | null
          is_starred?: boolean | null
          message_type?: string | null
          sender_id?: string | null
          subject?: string | null
        }
        Update: {
          client_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          is_from_client?: boolean | null
          is_read?: boolean | null
          is_starred?: boolean | null
          message_type?: string | null
          sender_id?: string | null
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_messages_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      client_notes: {
        Row: {
          author_id: string | null
          client_id: string | null
          content: string | null
          created_at: string | null
          id: string
          importance: string | null
          is_pinned: boolean | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          client_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          importance?: string | null
          is_pinned?: boolean | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          client_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          importance?: string | null
          is_pinned?: boolean | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_notes_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      client_requests: {
        Row: {
          assigned_worker_id: string | null
          client_email: string
          client_id: string | null
          client_name: string
          client_phone: string | null
          created_at: string
          description: string | null
          id: string
          internal_notes: string | null
          preferred_date: string | null
          preferred_time: string | null
          priority: boolean | null
          request_number: string
          service_type: string
          status: Database["public"]["Enums"]["request_status"] | null
          updated_at: string
        }
        Insert: {
          assigned_worker_id?: string | null
          client_email: string
          client_id?: string | null
          client_name: string
          client_phone?: string | null
          created_at?: string
          description?: string | null
          id?: string
          internal_notes?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          priority?: boolean | null
          request_number: string
          service_type: string
          status?: Database["public"]["Enums"]["request_status"] | null
          updated_at?: string
        }
        Update: {
          assigned_worker_id?: string | null
          client_email?: string
          client_id?: string | null
          client_name?: string
          client_phone?: string | null
          created_at?: string
          description?: string | null
          id?: string
          internal_notes?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          priority?: boolean | null
          request_number?: string
          service_type?: string
          status?: Database["public"]["Enums"]["request_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_requests_assigned_worker_id_fkey"
            columns: ["assigned_worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_requests_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          address: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          notes: string | null
          phone: string | null
          tags: string[] | null
          total_spent: number | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          notes?: string | null
          phone?: string | null
          tags?: string[] | null
          total_spent?: number | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          notes?: string | null
          phone?: string | null
          tags?: string[] | null
          total_spent?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      commission_payouts: {
        Row: {
          amount: number
          commission_ids: string[]
          created_at: string
          id: string
          notes: string | null
          partner_id: string
          payment_details: Json | null
          payment_method: string
          payout_number: string
          processed_at: string | null
          processed_by: string | null
          status: Database["public"]["Enums"]["partner_payment_status"]
          updated_at: string
        }
        Insert: {
          amount: number
          commission_ids: string[]
          created_at?: string
          id?: string
          notes?: string | null
          partner_id: string
          payment_details?: Json | null
          payment_method: string
          payout_number: string
          processed_at?: string | null
          processed_by?: string | null
          status?: Database["public"]["Enums"]["partner_payment_status"]
          updated_at?: string
        }
        Update: {
          amount?: number
          commission_ids?: string[]
          created_at?: string
          id?: string
          notes?: string | null
          partner_id?: string
          payment_details?: Json | null
          payment_method?: string
          payout_number?: string
          processed_at?: string | null
          processed_by?: string | null
          status?: Database["public"]["Enums"]["partner_payment_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "commission_payouts_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          address: string | null
          created_at: string
          id: string
          industry: string | null
          name: string
          notes: string | null
          phone: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          id?: string
          industry?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          id?: string
          industry?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          company_id: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          notes: string | null
          phone: string | null
          position: string | null
          status: Database["public"]["Enums"]["contact_status"]
          updated_at: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          notes?: string | null
          phone?: string | null
          position?: string | null
          status?: Database["public"]["Enums"]["contact_status"]
          updated_at?: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          notes?: string | null
          phone?: string | null
          position?: string | null
          status?: Database["public"]["Enums"]["contact_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      conversion_events: {
        Row: {
          conversion_type: string
          conversion_value: number | null
          created_at: string | null
          id: string
          metadata: Json | null
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          conversion_type: string
          conversion_value?: number | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          conversion_type?: string
          conversion_value?: number | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      course_lessons: {
        Row: {
          content: string | null
          created_at: string | null
          duration_minutes: number | null
          id: string
          is_free_preview: boolean | null
          module_id: string
          order_index: number | null
          title: string
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          is_free_preview?: boolean | null
          module_id: string
          order_index?: number | null
          title: string
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          is_free_preview?: boolean | null
          module_id?: string
          order_index?: number | null
          title?: string
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      course_modules: {
        Row: {
          course_id: string
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          id: string
          order_index: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          course_id: string
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          order_index?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          order_index?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          duration_weeks: number | null
          end_date: string | null
          id: string
          max_students: number | null
          price: number | null
          start_date: string | null
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          duration_weeks?: number | null
          end_date?: string | null
          id?: string
          max_students?: number | null
          price?: number | null
          start_date?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          duration_weeks?: number | null
          end_date?: string | null
          id?: string
          max_students?: number | null
          price?: number | null
          start_date?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      dashboard_health: {
        Row: {
          created_at: string
          dashboard_name: string
          dashboard_url: string
          error_message: string | null
          id: string
          last_check: string | null
          response_time_ms: number | null
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          dashboard_name: string
          dashboard_url: string
          error_message?: string | null
          id?: string
          last_check?: string | null
          response_time_ms?: number | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          dashboard_name?: string
          dashboard_url?: string
          error_message?: string | null
          id?: string
          last_check?: string | null
          response_time_ms?: number | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      dashboard_health_checks: {
        Row: {
          check_type: string
          created_at: string
          dashboard_name: string
          error_message: string | null
          id: string
          last_check_at: string
          response_time_ms: number | null
          status: string
          tables_checked: string[] | null
        }
        Insert: {
          check_type?: string
          created_at?: string
          dashboard_name: string
          error_message?: string | null
          id?: string
          last_check_at?: string
          response_time_ms?: number | null
          status?: string
          tables_checked?: string[] | null
        }
        Update: {
          check_type?: string
          created_at?: string
          dashboard_name?: string
          error_message?: string | null
          id?: string
          last_check_at?: string
          response_time_ms?: number | null
          status?: string
          tables_checked?: string[] | null
        }
        Relationships: []
      }
      deals: {
        Row: {
          amount: number | null
          company_id: string | null
          contact_id: string
          created_at: string
          expected_close_date: string | null
          id: string
          notes: string | null
          probability: number | null
          stage: Database["public"]["Enums"]["deal_stage"]
          title: string
          updated_at: string
        }
        Insert: {
          amount?: number | null
          company_id?: string | null
          contact_id: string
          created_at?: string
          expected_close_date?: string | null
          id?: string
          notes?: string | null
          probability?: number | null
          stage?: Database["public"]["Enums"]["deal_stage"]
          title: string
          updated_at?: string
        }
        Update: {
          amount?: number | null
          company_id?: string | null
          contact_id?: string
          created_at?: string
          expected_close_date?: string | null
          id?: string
          notes?: string | null
          probability?: number | null
          stage?: Database["public"]["Enums"]["deal_stage"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "deals_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      developer_profiles: {
        Row: {
          created_at: string
          developer_role: string | null
          github_portfolio_url: string | null
          id: string
          tech_stack: string[] | null
          updated_at: string
          user_id: string
          years_experience: number | null
        }
        Insert: {
          created_at?: string
          developer_role?: string | null
          github_portfolio_url?: string | null
          id?: string
          tech_stack?: string[] | null
          updated_at?: string
          user_id: string
          years_experience?: number | null
        }
        Update: {
          created_at?: string
          developer_role?: string | null
          github_portfolio_url?: string | null
          id?: string
          tech_stack?: string[] | null
          updated_at?: string
          user_id?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      discount_codes: {
        Row: {
          code: string
          created_at: string
          current_uses: number
          id: string
          is_active: boolean
          max_uses: number | null
          min_purchase_amount: number | null
          type: string
          updated_at: string
          valid_from: string | null
          valid_until: string | null
          value: number
        }
        Insert: {
          code: string
          created_at?: string
          current_uses?: number
          id?: string
          is_active?: boolean
          max_uses?: number | null
          min_purchase_amount?: number | null
          type: string
          updated_at?: string
          valid_from?: string | null
          valid_until?: string | null
          value: number
        }
        Update: {
          code?: string
          created_at?: string
          current_uses?: number
          id?: string
          is_active?: boolean
          max_uses?: number | null
          min_purchase_amount?: number | null
          type?: string
          updated_at?: string
          valid_from?: string | null
          valid_until?: string | null
          value?: number
        }
        Relationships: []
      }
      donations: {
        Row: {
          amount: number
          created_at: string
          donation_type: string
          donor_name: string
          email: string
          id: string
          message: string | null
          payment_status: string
          stripe_payment_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          donation_type?: string
          donor_name: string
          email: string
          id?: string
          message?: string | null
          payment_status?: string
          stripe_payment_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          donation_type?: string
          donor_name?: string
          email?: string
          id?: string
          message?: string | null
          payment_status?: string
          stripe_payment_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      email_campaigns: {
        Row: {
          click_rate: number | null
          created_at: string | null
          id: string
          last_sent_at: string | null
          name: string
          open_rate: number | null
          schedule_config: Json | null
          schedule_type: string
          sent_count: number | null
          status: string | null
          subject: string
          target_audience: string
          template_id: string | null
          updated_at: string | null
        }
        Insert: {
          click_rate?: number | null
          created_at?: string | null
          id?: string
          last_sent_at?: string | null
          name: string
          open_rate?: number | null
          schedule_config?: Json | null
          schedule_type: string
          sent_count?: number | null
          status?: string | null
          subject: string
          target_audience: string
          template_id?: string | null
          updated_at?: string | null
        }
        Update: {
          click_rate?: number | null
          created_at?: string | null
          id?: string
          last_sent_at?: string | null
          name?: string
          open_rate?: number | null
          schedule_config?: Json | null
          schedule_type?: string
          sent_count?: number | null
          status?: string | null
          subject?: string
          target_audience?: string
          template_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_campaigns_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_delivery_logs: {
        Row: {
          bounced: boolean | null
          campaign_id: string | null
          clicked_at: string | null
          complained: boolean | null
          created_at: string | null
          delivered_at: string | null
          error_details: Json | null
          id: string
          opened_at: string | null
          provider_message_id: string | null
          recipient_email: string
          scheduled_email_id: string | null
          status: string
        }
        Insert: {
          bounced?: boolean | null
          campaign_id?: string | null
          clicked_at?: string | null
          complained?: boolean | null
          created_at?: string | null
          delivered_at?: string | null
          error_details?: Json | null
          id?: string
          opened_at?: string | null
          provider_message_id?: string | null
          recipient_email: string
          scheduled_email_id?: string | null
          status: string
        }
        Update: {
          bounced?: boolean | null
          campaign_id?: string | null
          clicked_at?: string | null
          complained?: boolean | null
          created_at?: string | null
          delivered_at?: string | null
          error_details?: Json | null
          id?: string
          opened_at?: string | null
          provider_message_id?: string | null
          recipient_email?: string
          scheduled_email_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_delivery_logs_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_delivery_logs_scheduled_email_id_fkey"
            columns: ["scheduled_email_id"]
            isOneToOne: false
            referencedRelation: "scheduled_emails"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          category: string | null
          created_at: string | null
          html_body: string
          id: string
          is_active: boolean | null
          name: string
          subject: string
          template_variables: Json | null
          text_body: string | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          html_body: string
          id?: string
          is_active?: boolean | null
          name: string
          subject: string
          template_variables?: Json | null
          text_body?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          html_body?: string
          id?: string
          is_active?: boolean | null
          name?: string
          subject?: string
          template_variables?: Json | null
          text_body?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          completed_at: string | null
          contact_id: string
          course_id: string
          enrolled_at: string
          id: string
          last_accessed_at: string | null
          progress_percentage: number | null
          status: string
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          contact_id: string
          course_id: string
          enrolled_at?: string
          id?: string
          last_accessed_at?: string | null
          progress_percentage?: number | null
          status?: string
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          contact_id?: string
          course_id?: string
          enrolled_at?: string
          id?: string
          last_accessed_at?: string | null
          progress_percentage?: number | null
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          contact_id: string | null
          created_at: string
          deal_id: string | null
          description: string | null
          event_type: Database["public"]["Enums"]["event_type"]
          id: string
          scheduled_at: string | null
          status: Database["public"]["Enums"]["event_status"]
          title: string
          updated_at: string
          visibility: string | null
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string
          deal_id?: string | null
          description?: string | null
          event_type: Database["public"]["Enums"]["event_type"]
          id?: string
          scheduled_at?: string | null
          status?: Database["public"]["Enums"]["event_status"]
          title: string
          updated_at?: string
          visibility?: string | null
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string
          deal_id?: string | null
          description?: string | null
          event_type?: Database["public"]["Enums"]["event_type"]
          id?: string
          scheduled_at?: string | null
          status?: Database["public"]["Enums"]["event_status"]
          title?: string
          updated_at?: string
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      external_security_links: {
        Row: {
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          display_order: number | null
          external_url: string
          id: string
          image_url: string | null
          is_active: boolean | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          display_order?: number | null
          external_url: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          display_order?: number | null
          external_url?: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      form_submission_metrics: {
        Row: {
          created_at: string
          failure_count: number | null
          form_type: string
          id: string
          last_submission_at: string | null
          submission_count: number | null
          success_count: number | null
          window_start: string
        }
        Insert: {
          created_at?: string
          failure_count?: number | null
          form_type: string
          id?: string
          last_submission_at?: string | null
          submission_count?: number | null
          success_count?: number | null
          window_start?: string
        }
        Update: {
          created_at?: string
          failure_count?: number | null
          form_type?: string
          id?: string
          last_submission_at?: string | null
          submission_count?: number | null
          success_count?: number | null
          window_start?: string
        }
        Relationships: []
      }
      funnel_steps: {
        Row: {
          completed: boolean | null
          created_at: string | null
          id: string
          session_id: string
          step_name: string
          step_order: number
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          session_id: string
          step_name: string
          step_order: number
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          session_id?: string
          step_name?: string
          step_order?: number
        }
        Relationships: []
      }
      healthcare_professional_profiles: {
        Row: {
          created_at: string
          dea_number: string | null
          hospital_affiliation: string | null
          id: string
          license_number: string | null
          license_type: string | null
          medical_specialty: string | null
          updated_at: string
          user_id: string
          years_in_practice: number | null
        }
        Insert: {
          created_at?: string
          dea_number?: string | null
          hospital_affiliation?: string | null
          id?: string
          license_number?: string | null
          license_type?: string | null
          medical_specialty?: string | null
          updated_at?: string
          user_id: string
          years_in_practice?: number | null
        }
        Update: {
          created_at?: string
          dea_number?: string | null
          hospital_affiliation?: string | null
          id?: string
          license_number?: string | null
          license_type?: string | null
          medical_specialty?: string | null
          updated_at?: string
          user_id?: string
          years_in_practice?: number | null
        }
        Relationships: []
      }
      internal_messages: {
        Row: {
          attachments: Json | null
          body: string
          created_at: string
          id: string
          is_pinned: boolean | null
          is_read: boolean | null
          is_urgent: boolean | null
          message_type: Database["public"]["Enums"]["message_type"] | null
          read_at: string | null
          recipient_id: string | null
          sender_id: string | null
          sender_role: string | null
          subject: string | null
        }
        Insert: {
          attachments?: Json | null
          body: string
          created_at?: string
          id?: string
          is_pinned?: boolean | null
          is_read?: boolean | null
          is_urgent?: boolean | null
          message_type?: Database["public"]["Enums"]["message_type"] | null
          read_at?: string | null
          recipient_id?: string | null
          sender_id?: string | null
          sender_role?: string | null
          subject?: string | null
        }
        Update: {
          attachments?: Json | null
          body?: string
          created_at?: string
          id?: string
          is_pinned?: boolean | null
          is_read?: boolean | null
          is_urgent?: boolean | null
          message_type?: Database["public"]["Enums"]["message_type"] | null
          read_at?: string | null
          recipient_id?: string | null
          sender_id?: string | null
          sender_role?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      inventory_movements: {
        Row: {
          created_at: string
          id: string
          movement_type: string
          new_quantity: number
          notes: string | null
          performed_by: string | null
          previous_quantity: number
          product_id: string
          quantity: number
          reference_id: string | null
          reference_type: string | null
          variant_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          movement_type: string
          new_quantity: number
          notes?: string | null
          performed_by?: string | null
          previous_quantity: number
          product_id: string
          quantity: number
          reference_id?: string | null
          reference_type?: string | null
          variant_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          movement_type?: string
          new_quantity?: number
          notes?: string | null
          performed_by?: string | null
          previous_quantity?: number
          product_id?: string
          quantity?: number
          reference_id?: string | null
          reference_type?: string | null
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_movements_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount: number
          company_id: string | null
          contact_id: string
          created_at: string
          due_date: string
          id: string
          invoice_number: string
          issued_date: string
          notes: string | null
          paid_date: string | null
          payment_status: Database["public"]["Enums"]["payment_status"]
          status: Database["public"]["Enums"]["invoice_status"]
          updated_at: string
        }
        Insert: {
          amount: number
          company_id?: string | null
          contact_id: string
          created_at?: string
          due_date: string
          id?: string
          invoice_number: string
          issued_date?: string
          notes?: string | null
          paid_date?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          status?: Database["public"]["Enums"]["invoice_status"]
          updated_at?: string
        }
        Update: {
          amount?: number
          company_id?: string | null
          contact_id?: string
          created_at?: string
          due_date?: string
          id?: string
          invoice_number?: string
          issued_date?: string
          notes?: string | null
          paid_date?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          status?: Database["public"]["Enums"]["invoice_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          availability: string | null
          cover_letter: string
          created_at: string
          email: string
          id: string
          is_veteran: boolean | null
          name: string
          phone: string
          position: string
          resume_url: string | null
          status: string
          updated_at: string
          veteran_document_url: string | null
        }
        Insert: {
          availability?: string | null
          cover_letter: string
          created_at?: string
          email: string
          id?: string
          is_veteran?: boolean | null
          name: string
          phone: string
          position: string
          resume_url?: string | null
          status?: string
          updated_at?: string
          veteran_document_url?: string | null
        }
        Update: {
          availability?: string | null
          cover_letter?: string
          created_at?: string
          email?: string
          id?: string
          is_veteran?: boolean | null
          name?: string
          phone?: string
          position?: string
          resume_url?: string | null
          status?: string
          updated_at?: string
          veteran_document_url?: string | null
        }
        Relationships: []
      }
      jobs: {
        Row: {
          assigned_worker_ids: string[] | null
          client_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          end_at: string
          id: string
          location: string | null
          priority: string
          start_at: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          assigned_worker_ids?: string[] | null
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_at: string
          id?: string
          location?: string | null
          priority?: string
          start_at: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          assigned_worker_ids?: string[] | null
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_at?: string
          id?: string
          location?: string | null
          priority?: string
          start_at?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "jobs_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          subscribed_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          subscribed_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          subscribed_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          read_at: string | null
          related_id: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          read_at?: string | null
          related_id?: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          read_at?: string | null
          related_id?: string | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string | null
        }
        Relationships: []
      }
      onboarding_responses: {
        Row: {
          acknowledged_verification: boolean | null
          admin_notes: string | null
          created_at: string
          current_tools: string | null
          email: string
          full_name: string
          id: string
          main_goal: string | null
          preferred_communication: string | null
          problem_to_solve: string | null
          security_compliance_needs: string | null
          status: string | null
          team_size: string | null
          timeline: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          acknowledged_verification?: boolean | null
          admin_notes?: string | null
          created_at?: string
          current_tools?: string | null
          email: string
          full_name: string
          id?: string
          main_goal?: string | null
          preferred_communication?: string | null
          problem_to_solve?: string | null
          security_compliance_needs?: string | null
          status?: string | null
          team_size?: string | null
          timeline?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          acknowledged_verification?: boolean | null
          admin_notes?: string | null
          created_at?: string
          current_tools?: string | null
          email?: string
          full_name?: string
          id?: string
          main_goal?: string | null
          preferred_communication?: string | null
          problem_to_solve?: string | null
          security_compliance_needs?: string | null
          status?: string | null
          team_size?: string | null
          timeline?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          discount_amount: number | null
          id: string
          metadata: Json | null
          order_id: string
          product_id: string
          product_name: string
          product_sku: string
          quantity: number
          subtotal: number
          tax_amount: number | null
          total: number
          unit_price: number
          variant_id: string | null
          variant_name: string | null
        }
        Insert: {
          created_at?: string
          discount_amount?: number | null
          id?: string
          metadata?: Json | null
          order_id: string
          product_id: string
          product_name: string
          product_sku: string
          quantity: number
          subtotal: number
          tax_amount?: number | null
          total: number
          unit_price: number
          variant_id?: string | null
          variant_name?: string | null
        }
        Update: {
          created_at?: string
          discount_amount?: number | null
          id?: string
          metadata?: Json | null
          order_id?: string
          product_id?: string
          product_name?: string
          product_sku?: string
          quantity?: number
          subtotal?: number
          tax_amount?: number | null
          total?: number
          unit_price?: number
          variant_id?: string | null
          variant_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "partner_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      page_views: {
        Row: {
          created_at: string | null
          duration_seconds: number | null
          id: string
          page_title: string | null
          page_url: string
          referrer: string | null
          scroll_depth: number | null
          session_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          page_title?: string | null
          page_url: string
          referrer?: string | null
          scroll_depth?: number | null
          session_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          page_title?: string | null
          page_url?: string
          referrer?: string | null
          scroll_depth?: number | null
          session_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      partner_commissions: {
        Row: {
          amount: number
          approved_at: string | null
          approved_by: string | null
          base_amount: number | null
          commission_type: string
          created_at: string
          description: string | null
          id: string
          metadata: Json | null
          order_id: string | null
          paid_at: string | null
          partner_id: string
          rate: number | null
          status: Database["public"]["Enums"]["commission_status"]
          updated_at: string
        }
        Insert: {
          amount: number
          approved_at?: string | null
          approved_by?: string | null
          base_amount?: number | null
          commission_type: string
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          order_id?: string | null
          paid_at?: string | null
          partner_id: string
          rate?: number | null
          status?: Database["public"]["Enums"]["commission_status"]
          updated_at?: string
        }
        Update: {
          amount?: number
          approved_at?: string | null
          approved_by?: string | null
          base_amount?: number | null
          commission_type?: string
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          order_id?: string | null
          paid_at?: string | null
          partner_id?: string
          rate?: number | null
          status?: Database["public"]["Enums"]["commission_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "partner_commissions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "partner_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_commissions_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_orders: {
        Row: {
          billing_address: Json | null
          cancelled_at: string | null
          commission_amount: number | null
          commission_rate: number | null
          created_at: string
          customer_email: string
          customer_id: string | null
          customer_name: string
          customer_phone: string | null
          delivered_at: string | null
          discount_amount: number | null
          id: string
          metadata: Json | null
          notes: string | null
          order_number: string
          partner_id: string
          payment_method: string | null
          payment_status: Database["public"]["Enums"]["partner_payment_status"]
          payment_transaction_id: string | null
          shipped_at: string | null
          shipping_address: Json
          shipping_amount: number | null
          status: Database["public"]["Enums"]["order_status"]
          subtotal: number
          tax_amount: number | null
          total_amount: number
          tracking_number: string | null
          updated_at: string
          veteran_discount_amount: number | null
          veteran_discount_applied: boolean | null
          veteran_id_url: string | null
        }
        Insert: {
          billing_address?: Json | null
          cancelled_at?: string | null
          commission_amount?: number | null
          commission_rate?: number | null
          created_at?: string
          customer_email: string
          customer_id?: string | null
          customer_name: string
          customer_phone?: string | null
          delivered_at?: string | null
          discount_amount?: number | null
          id?: string
          metadata?: Json | null
          notes?: string | null
          order_number: string
          partner_id: string
          payment_method?: string | null
          payment_status?: Database["public"]["Enums"]["partner_payment_status"]
          payment_transaction_id?: string | null
          shipped_at?: string | null
          shipping_address: Json
          shipping_amount?: number | null
          status?: Database["public"]["Enums"]["order_status"]
          subtotal: number
          tax_amount?: number | null
          total_amount: number
          tracking_number?: string | null
          updated_at?: string
          veteran_discount_amount?: number | null
          veteran_discount_applied?: boolean | null
          veteran_id_url?: string | null
        }
        Update: {
          billing_address?: Json | null
          cancelled_at?: string | null
          commission_amount?: number | null
          commission_rate?: number | null
          created_at?: string
          customer_email?: string
          customer_id?: string | null
          customer_name?: string
          customer_phone?: string | null
          delivered_at?: string | null
          discount_amount?: number | null
          id?: string
          metadata?: Json | null
          notes?: string | null
          order_number?: string
          partner_id?: string
          payment_method?: string | null
          payment_status?: Database["public"]["Enums"]["partner_payment_status"]
          payment_transaction_id?: string | null
          shipped_at?: string | null
          shipping_address?: Json
          shipping_amount?: number | null
          status?: Database["public"]["Enums"]["order_status"]
          subtotal?: number
          tax_amount?: number | null
          total_amount?: number
          tracking_number?: string | null
          updated_at?: string
          veteran_discount_amount?: number | null
          veteran_discount_applied?: boolean | null
          veteran_id_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partner_orders_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          business_address: string | null
          business_email: string
          business_name: string
          business_phone: string | null
          commission_rate: number | null
          created_at: string
          description: string | null
          id: string
          logo_url: string | null
          metadata: Json | null
          partner_type: Database["public"]["Enums"]["partner_type"]
          rating: number | null
          status: Database["public"]["Enums"]["partner_status"]
          tax_id: string | null
          total_commission: number | null
          total_products: number | null
          total_sales: number | null
          updated_at: string
          user_id: string
          website_url: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          business_address?: string | null
          business_email: string
          business_name: string
          business_phone?: string | null
          commission_rate?: number | null
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          metadata?: Json | null
          partner_type: Database["public"]["Enums"]["partner_type"]
          rating?: number | null
          status?: Database["public"]["Enums"]["partner_status"]
          tax_id?: string | null
          total_commission?: number | null
          total_products?: number | null
          total_sales?: number | null
          updated_at?: string
          user_id: string
          website_url?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          business_address?: string | null
          business_email?: string
          business_name?: string
          business_phone?: string | null
          commission_rate?: number | null
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          metadata?: Json | null
          partner_type?: Database["public"]["Enums"]["partner_type"]
          rating?: number | null
          status?: Database["public"]["Enums"]["partner_status"]
          tax_id?: string | null
          total_commission?: number | null
          total_products?: number | null
          total_sales?: number | null
          updated_at?: string
          user_id?: string
          website_url?: string | null
        }
        Relationships: []
      }
      password_reset_tokens: {
        Row: {
          created_at: string | null
          email: string
          expires_at: string
          id: string
          token: string
          used: boolean | null
        }
        Insert: {
          created_at?: string | null
          email: string
          expires_at: string
          id?: string
          token: string
          used?: boolean | null
        }
        Update: {
          created_at?: string | null
          email?: string
          expires_at?: string
          id?: string
          token?: string
          used?: boolean | null
        }
        Relationships: []
      }
      product_categories: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          parent_id: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          parent_id?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          parent_id?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variants: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          metadata: Json | null
          name: string
          price_adjustment: number | null
          product_id: string
          sku: string
          stock_quantity: number | null
          updated_at: string
          variant_type: string
          variant_value: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name: string
          price_adjustment?: number | null
          product_id: string
          sku: string
          stock_quantity?: number | null
          updated_at?: string
          variant_type: string
          variant_value: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name?: string
          price_adjustment?: number | null
          product_id?: string
          sku?: string
          stock_quantity?: number | null
          updated_at?: string
          variant_type?: string
          variant_value?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          base_price: number
          category_id: string | null
          cost_price: number | null
          cover_image_url: string | null
          created_at: string
          description: string | null
          dimensions: Json | null
          features: Json | null
          file_url: string | null
          id: string
          images: Json | null
          is_featured: boolean | null
          low_stock_threshold: number | null
          metadata: Json | null
          name: string
          partner_id: string
          product_type: string | null
          published_at: string | null
          rating_average: number | null
          rating_count: number | null
          sale_price: number | null
          sales_count: number | null
          short_description: string | null
          sku: string
          slug: string
          specifications: Json | null
          status: Database["public"]["Enums"]["product_status"]
          stock_quantity: number | null
          stripe_price_id: string | null
          tags: string[] | null
          updated_at: string
          views_count: number | null
          weight: number | null
        }
        Insert: {
          base_price: number
          category_id?: string | null
          cost_price?: number | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          dimensions?: Json | null
          features?: Json | null
          file_url?: string | null
          id?: string
          images?: Json | null
          is_featured?: boolean | null
          low_stock_threshold?: number | null
          metadata?: Json | null
          name: string
          partner_id: string
          product_type?: string | null
          published_at?: string | null
          rating_average?: number | null
          rating_count?: number | null
          sale_price?: number | null
          sales_count?: number | null
          short_description?: string | null
          sku: string
          slug: string
          specifications?: Json | null
          status?: Database["public"]["Enums"]["product_status"]
          stock_quantity?: number | null
          stripe_price_id?: string | null
          tags?: string[] | null
          updated_at?: string
          views_count?: number | null
          weight?: number | null
        }
        Update: {
          base_price?: number
          category_id?: string | null
          cost_price?: number | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          dimensions?: Json | null
          features?: Json | null
          file_url?: string | null
          id?: string
          images?: Json | null
          is_featured?: boolean | null
          low_stock_threshold?: number | null
          metadata?: Json | null
          name?: string
          partner_id?: string
          product_type?: string | null
          published_at?: string | null
          rating_average?: number | null
          rating_count?: number | null
          sale_price?: number | null
          sales_count?: number | null
          short_description?: string | null
          sku?: string
          slug?: string
          specifications?: Json | null
          status?: Database["public"]["Enums"]["product_status"]
          stock_quantity?: number | null
          stripe_price_id?: string | null
          tags?: string[] | null
          updated_at?: string
          views_count?: number | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_status: string | null
          address_city: string | null
          address_state: string | null
          address_street: string | null
          address_zip: string | null
          application_reference: string | null
          created_at: string | null
          date_of_birth: string | null
          department: string | null
          email: string | null
          failed_login_attempts: number | null
          first_name: string | null
          hire_date: string | null
          id: string
          last_login_at: string | null
          last_login_ip: string | null
          last_name: string | null
          locked_until: string | null
          phone: string | null
          position: string | null
          profile_photo_url: string | null
          updated_at: string | null
          username: string
        }
        Insert: {
          account_status?: string | null
          address_city?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip?: string | null
          application_reference?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          department?: string | null
          email?: string | null
          failed_login_attempts?: number | null
          first_name?: string | null
          hire_date?: string | null
          id: string
          last_login_at?: string | null
          last_login_ip?: string | null
          last_name?: string | null
          locked_until?: string | null
          phone?: string | null
          position?: string | null
          profile_photo_url?: string | null
          updated_at?: string | null
          username: string
        }
        Update: {
          account_status?: string | null
          address_city?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip?: string | null
          application_reference?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          department?: string | null
          email?: string | null
          failed_login_attempts?: number | null
          first_name?: string | null
          hire_date?: string | null
          id?: string
          last_login_at?: string | null
          last_login_ip?: string | null
          last_name?: string | null
          locked_until?: string | null
          phone?: string | null
          position?: string | null
          profile_photo_url?: string | null
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      purchase_requests: {
        Row: {
          admin_notes: string | null
          completed_at: string | null
          created_at: string
          customer_price: number
          discount_amount: number | null
          email: string
          final_price: number
          full_name: string
          id: string
          is_veteran: boolean | null
          item_name: string
          item_type: string
          message: string | null
          metadata: Json | null
          payment_method: string | null
          payment_status: string
          phone: string | null
          quantity: number | null
          request_number: string
          status: string
          stripe_payment_intent_id: string | null
          suggested_price: number | null
          updated_at: string
          user_id: string | null
          veteran_document_url: string | null
          veteran_id_last4: string | null
          veteran_type: string | null
        }
        Insert: {
          admin_notes?: string | null
          completed_at?: string | null
          created_at?: string
          customer_price: number
          discount_amount?: number | null
          email: string
          final_price: number
          full_name: string
          id?: string
          is_veteran?: boolean | null
          item_name: string
          item_type: string
          message?: string | null
          metadata?: Json | null
          payment_method?: string | null
          payment_status?: string
          phone?: string | null
          quantity?: number | null
          request_number?: string
          status?: string
          stripe_payment_intent_id?: string | null
          suggested_price?: number | null
          updated_at?: string
          user_id?: string | null
          veteran_document_url?: string | null
          veteran_id_last4?: string | null
          veteran_type?: string | null
        }
        Update: {
          admin_notes?: string | null
          completed_at?: string | null
          created_at?: string
          customer_price?: number
          discount_amount?: number | null
          email?: string
          final_price?: number
          full_name?: string
          id?: string
          is_veteran?: boolean | null
          item_name?: string
          item_type?: string
          message?: string | null
          metadata?: Json | null
          payment_method?: string | null
          payment_status?: string
          phone?: string | null
          quantity?: number | null
          request_number?: string
          status?: string
          stripe_payment_intent_id?: string | null
          suggested_price?: number | null
          updated_at?: string
          user_id?: string | null
          veteran_document_url?: string | null
          veteran_id_last4?: string | null
          veteran_type?: string | null
        }
        Relationships: []
      }
      reports_snapshots: {
        Row: {
          created_at: string
          date_range_end: string
          date_range_start: string
          id: string
          kpis: Json
          period: string
        }
        Insert: {
          created_at?: string
          date_range_end: string
          date_range_start: string
          id?: string
          kpis?: Json
          period: string
        }
        Update: {
          created_at?: string
          date_range_end?: string
          date_range_start?: string
          id?: string
          kpis?: Json
          period?: string
        }
        Relationships: []
      }
      scam_submissions: {
        Row: {
          admin_notes: string | null
          ai_confidence: number | null
          analysis_summary: string | null
          attachments: string[] | null
          created_at: string
          id: string
          recommendations: string[] | null
          reviewed_at: string | null
          reviewed_by: string | null
          risk_level: string | null
          sender_info: string | null
          status: string
          submission_number: string
          submission_type: string
          submitter_email: string
          submitter_name: string
          submitter_phone: string | null
          suspicious_content: string
          threats_detected: string[] | null
          updated_at: string
          urgency: string
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          ai_confidence?: number | null
          analysis_summary?: string | null
          attachments?: string[] | null
          created_at?: string
          id?: string
          recommendations?: string[] | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          risk_level?: string | null
          sender_info?: string | null
          status?: string
          submission_number: string
          submission_type: string
          submitter_email: string
          submitter_name: string
          submitter_phone?: string | null
          suspicious_content: string
          threats_detected?: string[] | null
          updated_at?: string
          urgency: string
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          ai_confidence?: number | null
          analysis_summary?: string | null
          attachments?: string[] | null
          created_at?: string
          id?: string
          recommendations?: string[] | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          risk_level?: string | null
          sender_info?: string | null
          status?: string
          submission_number?: string
          submission_type?: string
          submitter_email?: string
          submitter_name?: string
          submitter_phone?: string | null
          suspicious_content?: string
          threats_detected?: string[] | null
          updated_at?: string
          urgency?: string
          user_id?: string | null
        }
        Relationships: []
      }
      scheduled_emails: {
        Row: {
          campaign_id: string | null
          created_at: string | null
          error_message: string | null
          id: string
          max_retries: number | null
          recipient_email: string
          recipient_name: string | null
          retry_count: number | null
          scheduled_for: string
          sent_at: string | null
          status: string | null
          template_data: Json | null
          template_id: string | null
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          max_retries?: number | null
          recipient_email: string
          recipient_name?: string | null
          retry_count?: number | null
          scheduled_for: string
          sent_at?: string | null
          status?: string | null
          template_data?: Json | null
          template_id?: string | null
        }
        Update: {
          campaign_id?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          max_retries?: number | null
          recipient_email?: string
          recipient_name?: string | null
          retry_count?: number | null
          scheduled_for?: string
          sent_at?: string | null
          status?: string | null
          template_data?: Json | null
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_emails_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_emails_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      senior_client_profiles: {
        Row: {
          created_at: string
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          id: string
          medical_conditions: string | null
          preferred_language: string | null
          relationship: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          id?: string
          medical_conditions?: string | null
          preferred_language?: string | null
          relationship?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          id?: string
          medical_conditions?: string | null
          preferred_language?: string | null
          relationship?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      service_catalog: {
        Row: {
          active: boolean | null
          base_price: number | null
          category: Database["public"]["Enums"]["service_category"]
          created_at: string
          description: string | null
          estimated_duration_minutes: number | null
          id: string
          name: string
          required_skills: string[] | null
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          base_price?: number | null
          category: Database["public"]["Enums"]["service_category"]
          created_at?: string
          description?: string | null
          estimated_duration_minutes?: number | null
          id?: string
          name: string
          required_skills?: string[] | null
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          base_price?: number | null
          category?: Database["public"]["Enums"]["service_category"]
          created_at?: string
          description?: string | null
          estimated_duration_minutes?: number | null
          id?: string
          name?: string
          required_skills?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      service_inquiries: {
        Row: {
          admin_notes: string | null
          budget: string | null
          company_name: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          inquiry_number: string
          is_veteran: boolean | null
          phone: string | null
          requirements: string | null
          service_name: string
          service_price: number | null
          service_type: string
          status: string | null
          timeline: string | null
          updated_at: string | null
          veteran_id_last4: string | null
          veteran_type: string | null
        }
        Insert: {
          admin_notes?: string | null
          budget?: string | null
          company_name?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          inquiry_number?: string
          is_veteran?: boolean | null
          phone?: string | null
          requirements?: string | null
          service_name: string
          service_price?: number | null
          service_type: string
          status?: string | null
          timeline?: string | null
          updated_at?: string | null
          veteran_id_last4?: string | null
          veteran_type?: string | null
        }
        Update: {
          admin_notes?: string | null
          budget?: string | null
          company_name?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          inquiry_number?: string
          is_veteran?: boolean | null
          phone?: string | null
          requirements?: string | null
          service_name?: string
          service_price?: number | null
          service_type?: string
          status?: string | null
          timeline?: string | null
          updated_at?: string | null
          veteran_id_last4?: string | null
          veteran_type?: string | null
        }
        Relationships: []
      }
      service_intake_requests: {
        Row: {
          add_ons: string[] | null
          admin_notes: string | null
          agent_type: string | null
          agreed_ai_disclaimer: boolean | null
          agreed_onboarding: boolean | null
          agreed_privacy: boolean | null
          agreed_tos: boolean | null
          assigned_to: string | null
          branding_upload_url: string | null
          budget_confirmed: boolean | null
          company_name: string | null
          created_at: string
          current_tools: string[] | null
          description: string | null
          email: string
          full_name: string
          has_branding: boolean | null
          id: string
          location: string | null
          pages_needed: string[] | null
          phone: string | null
          plan_selected: string
          preferred_channels: string[] | null
          request_number: string
          service_type: string
          status: string
          timeline: string | null
          updated_at: string
          user_id: string | null
          website_type: string | null
        }
        Insert: {
          add_ons?: string[] | null
          admin_notes?: string | null
          agent_type?: string | null
          agreed_ai_disclaimer?: boolean | null
          agreed_onboarding?: boolean | null
          agreed_privacy?: boolean | null
          agreed_tos?: boolean | null
          assigned_to?: string | null
          branding_upload_url?: string | null
          budget_confirmed?: boolean | null
          company_name?: string | null
          created_at?: string
          current_tools?: string[] | null
          description?: string | null
          email: string
          full_name: string
          has_branding?: boolean | null
          id?: string
          location?: string | null
          pages_needed?: string[] | null
          phone?: string | null
          plan_selected: string
          preferred_channels?: string[] | null
          request_number?: string
          service_type: string
          status?: string
          timeline?: string | null
          updated_at?: string
          user_id?: string | null
          website_type?: string | null
        }
        Update: {
          add_ons?: string[] | null
          admin_notes?: string | null
          agent_type?: string | null
          agreed_ai_disclaimer?: boolean | null
          agreed_onboarding?: boolean | null
          agreed_privacy?: boolean | null
          agreed_tos?: boolean | null
          assigned_to?: string | null
          branding_upload_url?: string | null
          budget_confirmed?: boolean | null
          company_name?: string | null
          created_at?: string
          current_tools?: string[] | null
          description?: string | null
          email?: string
          full_name?: string
          has_branding?: boolean | null
          id?: string
          location?: string | null
          pages_needed?: string[] | null
          phone?: string | null
          plan_selected?: string
          preferred_channels?: string[] | null
          request_number?: string
          service_type?: string
          status?: string
          timeline?: string | null
          updated_at?: string
          user_id?: string | null
          website_type?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          duration_minutes: number | null
          id: string
          name: string
          price: number | null
          service_type: Database["public"]["Enums"]["service_type"]
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          name: string
          price?: number | null
          service_type: Database["public"]["Enums"]["service_type"]
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          name?: string
          price?: number | null
          service_type?: Database["public"]["Enums"]["service_type"]
          updated_at?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          email: string
          id: string
          name: string | null
          status: string
          subscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          name?: string | null
          status?: string
          subscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          name?: string | null
          status?: string
          subscribed_at?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          amount: number | null
          created_at: string | null
          end_date: string | null
          id: string
          plan_name: string
          start_date: string | null
          status: string
          user_id: string
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          plan_name: string
          start_date?: string | null
          status?: string
          user_id: string
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          plan_name?: string
          start_date?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      system_heartbeats: {
        Row: {
          created_at: string
          description: string | null
          error_log: string | null
          last_heartbeat: string | null
          service_name: string
          status: string
          threshold_minutes: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          error_log?: string | null
          last_heartbeat?: string | null
          service_name: string
          status?: string
          threshold_minutes?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          error_log?: string | null
          last_heartbeat?: string | null
          service_name?: string
          status?: string
          threshold_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          priority: string | null
          status: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      testimonial_media: {
        Row: {
          created_at: string | null
          duration_seconds: number | null
          file_size_bytes: number | null
          file_url: string
          height: number | null
          id: string
          media_type: string
          mime_type: string | null
          processing_status: string | null
          testimonial_id: string | null
          thumbnail_url: string | null
          updated_at: string | null
          width: number | null
        }
        Insert: {
          created_at?: string | null
          duration_seconds?: number | null
          file_size_bytes?: number | null
          file_url: string
          height?: number | null
          id?: string
          media_type: string
          mime_type?: string | null
          processing_status?: string | null
          testimonial_id?: string | null
          thumbnail_url?: string | null
          updated_at?: string | null
          width?: number | null
        }
        Update: {
          created_at?: string | null
          duration_seconds?: number | null
          file_size_bytes?: number | null
          file_url?: string
          height?: number | null
          id?: string
          media_type?: string
          mime_type?: string | null
          processing_status?: string | null
          testimonial_id?: string | null
          thumbnail_url?: string | null
          updated_at?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "testimonial_media_testimonial_id_fkey"
            columns: ["testimonial_id"]
            isOneToOne: false
            referencedRelation: "testimonials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "testimonial_media_testimonial_id_fkey"
            columns: ["testimonial_id"]
            isOneToOne: false
            referencedRelation: "testimonials_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "testimonial_media_testimonial_id_fkey"
            columns: ["testimonial_id"]
            isOneToOne: false
            referencedRelation: "testimonials_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string
          display_location: string | null
          display_order: number | null
          email: string
          featured: boolean | null
          has_image: boolean | null
          has_video: boolean | null
          id: string
          location: string
          name: string
          primary_media_url: string | null
          rating: number
          status: Database["public"]["Enums"]["testimonial_status"]
          story: string
          submitted_at: string
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          display_location?: string | null
          display_order?: number | null
          email: string
          featured?: boolean | null
          has_image?: boolean | null
          has_video?: boolean | null
          id?: string
          location: string
          name: string
          primary_media_url?: string | null
          rating: number
          status?: Database["public"]["Enums"]["testimonial_status"]
          story: string
          submitted_at?: string
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          display_location?: string | null
          display_order?: number | null
          email?: string
          featured?: boolean | null
          has_image?: boolean | null
          has_video?: boolean | null
          id?: string
          location?: string
          name?: string
          primary_media_url?: string | null
          rating?: number
          status?: Database["public"]["Enums"]["testimonial_status"]
          story?: string
          submitted_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      threat_events: {
        Row: {
          created_at: string
          description: string | null
          device_id: string | null
          id: string
          profile_id: string | null
          resolved_at: string | null
          resolved_by: string | null
          severity: string
          status: string
          target: string | null
          threat_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          device_id?: string | null
          id?: string
          profile_id?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity: string
          status?: string
          target?: string | null
          threat_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          device_id?: string | null
          id?: string
          profile_id?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
          status?: string
          target?: string | null
          threat_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "threat_events_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "user_devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "threat_events_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "threat_events_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_limited"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "threat_events_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_safe"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "threat_events_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "threat_events_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "profiles_limited"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "threat_events_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "profiles_safe"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          assigned_to: string | null
          contact_id: string
          created_at: string
          description: string | null
          id: string
          priority: Database["public"]["Enums"]["ticket_priority"]
          resolved_at: string | null
          status: Database["public"]["Enums"]["ticket_status"]
          subject: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          contact_id: string
          created_at?: string
          description?: string | null
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"]
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          subject: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          contact_id?: string
          created_at?: string
          description?: string | null
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"]
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          subject?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tickets_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      time_off_requests: {
        Row: {
          created_at: string
          end_date: string
          id: string
          notes: string | null
          reason: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          start_date: string
          status: Database["public"]["Enums"]["time_off_status"] | null
          worker_id: string | null
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          notes?: string | null
          reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          start_date: string
          status?: Database["public"]["Enums"]["time_off_status"] | null
          worker_id?: string | null
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          notes?: string | null
          reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["time_off_status"] | null
          worker_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "time_off_requests_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      traffic_sources: {
        Row: {
          campaign: string | null
          content: string | null
          created_at: string | null
          id: string
          medium: string | null
          session_id: string
          source: string | null
          term: string | null
        }
        Insert: {
          campaign?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          medium?: string | null
          session_id: string
          source?: string | null
          term?: string | null
        }
        Update: {
          campaign?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          medium?: string | null
          session_id?: string
          source?: string | null
          term?: string | null
        }
        Relationships: []
      }
      trainer_profiles: {
        Row: {
          available_training_dates: string | null
          certifications: string[] | null
          created_at: string
          id: string
          training_specialization: string | null
          updated_at: string
          user_id: string
          years_training_experience: number | null
        }
        Insert: {
          available_training_dates?: string | null
          certifications?: string[] | null
          created_at?: string
          id?: string
          training_specialization?: string | null
          updated_at?: string
          user_id: string
          years_training_experience?: number | null
        }
        Update: {
          available_training_dates?: string | null
          certifications?: string[] | null
          created_at?: string
          id?: string
          training_specialization?: string | null
          updated_at?: string
          user_id?: string
          years_training_experience?: number | null
        }
        Relationships: []
      }
      user_2fa_settings: {
        Row: {
          backup_codes: string[] | null
          created_at: string
          encrypted_totp_secret: string | null
          id: string
          is_enabled: boolean
          last_used_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          backup_codes?: string[] | null
          created_at?: string
          encrypted_totp_secret?: string | null
          id?: string
          is_enabled?: boolean
          last_used_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          backup_codes?: string[] | null
          created_at?: string
          encrypted_totp_secret?: string | null
          id?: string
          is_enabled?: boolean
          last_used_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_activity_logs: {
        Row: {
          activity_type: string
          created_at: string
          id: string
          ip_address: string | null
          metadata: Json | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          activity_type: string
          created_at?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          activity_type?: string
          created_at?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_devices: {
        Row: {
          created_at: string
          device_name: string
          device_type: string
          id: string
          ip_address: string | null
          last_scan: string | null
          os_version: string | null
          profile_id: string | null
          protection_level: number
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          device_name: string
          device_type: string
          id?: string
          ip_address?: string | null
          last_scan?: string | null
          os_version?: string | null
          profile_id?: string | null
          protection_level?: number
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          device_name?: string
          device_type?: string
          id?: string
          ip_address?: string | null
          last_scan?: string | null
          os_version?: string | null
          profile_id?: string | null
          protection_level?: number
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_devices_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_devices_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_limited"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_devices_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_safe"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          bounce: boolean | null
          browser: string | null
          city: string | null
          country: string | null
          device_type: string | null
          duration_seconds: number | null
          ended_at: string | null
          exit_page: string | null
          id: string
          ip_address: string | null
          landing_page: string | null
          os: string | null
          page_views_count: number | null
          referrer: string | null
          session_id: string
          started_at: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          bounce?: boolean | null
          browser?: string | null
          city?: string | null
          country?: string | null
          device_type?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          exit_page?: string | null
          id?: string
          ip_address?: string | null
          landing_page?: string | null
          os?: string | null
          page_views_count?: number | null
          referrer?: string | null
          session_id: string
          started_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          bounce?: boolean | null
          browser?: string | null
          city?: string | null
          country?: string | null
          device_type?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          exit_page?: string | null
          id?: string
          ip_address?: string | null
          landing_page?: string | null
          os?: string | null
          page_views_count?: number | null
          referrer?: string | null
          session_id?: string
          started_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      verification_codes: {
        Row: {
          attempts: number | null
          code: string
          created_at: string | null
          email: string
          expires_at: string
          id: string
          used: boolean | null
        }
        Insert: {
          attempts?: number | null
          code: string
          created_at?: string | null
          email: string
          expires_at: string
          id?: string
          used?: boolean | null
        }
        Update: {
          attempts?: number | null
          code?: string
          created_at?: string | null
          email?: string
          expires_at?: string
          id?: string
          used?: boolean | null
        }
        Relationships: []
      }
      website_inquiries: {
        Row: {
          created_at: string
          email: string
          id: string
          inquiry_type: string
          is_processed: boolean | null
          message: string | null
          metadata: Json | null
          name: string | null
          phone: string | null
          preferred_time: string | null
          processed_at: string | null
          status: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          inquiry_type: string
          is_processed?: boolean | null
          message?: string | null
          metadata?: Json | null
          name?: string | null
          phone?: string | null
          preferred_time?: string | null
          processed_at?: string | null
          status?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          inquiry_type?: string
          is_processed?: boolean | null
          message?: string | null
          metadata?: Json | null
          name?: string | null
          phone?: string | null
          preferred_time?: string | null
          processed_at?: string | null
          status?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      worker_availability: {
        Row: {
          created_at: string
          day_of_week: number
          end_time: string
          id: string
          is_recurring: boolean | null
          start_time: string
          worker_id: string | null
        }
        Insert: {
          created_at?: string
          day_of_week: number
          end_time: string
          id?: string
          is_recurring?: boolean | null
          start_time: string
          worker_id?: string | null
        }
        Update: {
          created_at?: string
          day_of_week?: number
          end_time?: string
          id?: string
          is_recurring?: boolean | null
          start_time?: string
          worker_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "worker_availability_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      worker_user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          role: Database["public"]["Enums"]["worker_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["worker_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["worker_role"]
          user_id?: string
        }
        Relationships: []
      }
      workers: {
        Row: {
          address: string | null
          certifications: string[] | null
          created_at: string
          current_status: Database["public"]["Enums"]["worker_status"] | null
          email: string
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          first_name: string
          hire_date: string | null
          hourly_rate: number | null
          id: string
          last_name: string
          notes: string | null
          phone: string | null
          position: string | null
          profile_photo_url: string | null
          skills: string[] | null
          updated_at: string
          worker_id: string | null
        }
        Insert: {
          address?: string | null
          certifications?: string[] | null
          created_at?: string
          current_status?: Database["public"]["Enums"]["worker_status"] | null
          email: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          first_name: string
          hire_date?: string | null
          hourly_rate?: number | null
          id: string
          last_name: string
          notes?: string | null
          phone?: string | null
          position?: string | null
          profile_photo_url?: string | null
          skills?: string[] | null
          updated_at?: string
          worker_id?: string | null
        }
        Update: {
          address?: string | null
          certifications?: string[] | null
          created_at?: string
          current_status?: Database["public"]["Enums"]["worker_status"] | null
          email?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          first_name?: string
          hire_date?: string | null
          hourly_rate?: number | null
          id?: string
          last_name?: string
          notes?: string | null
          phone?: string | null
          position?: string | null
          profile_photo_url?: string | null
          skills?: string[] | null
          updated_at?: string
          worker_id?: string | null
        }
        Relationships: []
      }
      zoom_class_enrollments: {
        Row: {
          class_id: string
          enrolled_at: string
          id: string
          user_id: string
        }
        Insert: {
          class_id: string
          enrolled_at?: string
          id?: string
          user_id: string
        }
        Update: {
          class_id?: string
          enrolled_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "zoom_class_enrollments_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "zoom_classes"
            referencedColumns: ["id"]
          },
        ]
      }
      zoom_classes: {
        Row: {
          created_at: string | null
          description: string | null
          duration_minutes: number
          id: string
          max_participants: number | null
          scheduled_date: string
          title: string
          zoom_link: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_minutes: number
          id?: string
          max_participants?: number | null
          scheduled_date: string
          title: string
          zoom_link: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_minutes?: number
          id?: string
          max_participants?: number | null
          scheduled_date?: string
          title?: string
          zoom_link?: string
        }
        Relationships: []
      }
    }
    Views: {
      donations_summary: {
        Row: {
          amount: number | null
          created_at: string | null
          donation_type: string | null
          donor_name: string | null
          email: string | null
          id: string | null
          message: string | null
          payment_status: string | null
          updated_at: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          donation_type?: string | null
          donor_name?: string | null
          email?: never
          id?: string | null
          message?: string | null
          payment_status?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          donation_type?: string | null
          donor_name?: string | null
          email?: never
          id?: string | null
          message?: string | null
          payment_status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      healthcare_profiles_safe: {
        Row: {
          created_at: string | null
          hospital_affiliation: string | null
          id: string | null
          license_type: string | null
          medical_specialty: string | null
          updated_at: string | null
          user_id: string | null
          years_in_practice: number | null
        }
        Insert: {
          created_at?: string | null
          hospital_affiliation?: string | null
          id?: string | null
          license_type?: string | null
          medical_specialty?: string | null
          updated_at?: string | null
          user_id?: string | null
          years_in_practice?: number | null
        }
        Update: {
          created_at?: string | null
          hospital_affiliation?: string | null
          id?: string | null
          license_type?: string | null
          medical_specialty?: string | null
          updated_at?: string | null
          user_id?: string | null
          years_in_practice?: number | null
        }
        Relationships: []
      }
      profiles_limited: {
        Row: {
          account_status: string | null
          created_at: string | null
          department: string | null
          email: string | null
          first_name: string | null
          id: string | null
          last_name: string | null
          position: string | null
          profile_photo_url: string | null
          username: string | null
        }
        Insert: {
          account_status?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          position?: string | null
          profile_photo_url?: string | null
          username?: string | null
        }
        Update: {
          account_status?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          position?: string | null
          profile_photo_url?: string | null
          username?: string | null
        }
        Relationships: []
      }
      profiles_safe: {
        Row: {
          account_status: string | null
          created_at: string | null
          department: string | null
          email: string | null
          first_name: string | null
          id: string | null
          last_name: string | null
          position: string | null
          profile_photo_url: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          account_status?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          position?: string | null
          profile_photo_url?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          account_status?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          position?: string | null
          profile_photo_url?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      rls_policy_status: {
        Row: {
          cmd: string | null
          permissive: string | null
          policyname: unknown
          qual: string | null
          roles: unknown[] | null
          schemaname: unknown
          tablename: unknown
          with_check: string | null
        }
        Relationships: []
      }
      senior_profiles_safe: {
        Row: {
          created_at: string | null
          id: string | null
          preferred_language: string | null
          relationship: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          preferred_language?: string | null
          relationship?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          preferred_language?: string | null
          relationship?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      testimonials_public: {
        Row: {
          created_at: string | null
          display_location: string | null
          display_order: number | null
          featured: boolean | null
          has_image: boolean | null
          has_video: boolean | null
          id: string | null
          location: string | null
          name: string | null
          primary_media_url: string | null
          rating: number | null
          status: Database["public"]["Enums"]["testimonial_status"] | null
          story: string | null
        }
        Insert: {
          created_at?: string | null
          display_location?: string | null
          display_order?: number | null
          featured?: boolean | null
          has_image?: boolean | null
          has_video?: boolean | null
          id?: string | null
          location?: string | null
          name?: string | null
          primary_media_url?: string | null
          rating?: number | null
          status?: Database["public"]["Enums"]["testimonial_status"] | null
          story?: string | null
        }
        Update: {
          created_at?: string | null
          display_location?: string | null
          display_order?: number | null
          featured?: boolean | null
          has_image?: boolean | null
          has_video?: boolean | null
          id?: string | null
          location?: string | null
          name?: string | null
          primary_media_url?: string | null
          rating?: number | null
          status?: Database["public"]["Enums"]["testimonial_status"] | null
          story?: string | null
        }
        Relationships: []
      }
      testimonials_staff: {
        Row: {
          approved_at: string | null
          created_at: string | null
          display_location: string | null
          display_order: number | null
          featured: boolean | null
          has_image: boolean | null
          has_video: boolean | null
          id: string | null
          location: string | null
          name: string | null
          primary_media_url: string | null
          rating: number | null
          status: Database["public"]["Enums"]["testimonial_status"] | null
          story: string | null
          submitted_at: string | null
          updated_at: string | null
        }
        Insert: {
          approved_at?: string | null
          created_at?: string | null
          display_location?: string | null
          display_order?: number | null
          featured?: boolean | null
          has_image?: boolean | null
          has_video?: boolean | null
          id?: string | null
          location?: string | null
          name?: string | null
          primary_media_url?: string | null
          rating?: number | null
          status?: Database["public"]["Enums"]["testimonial_status"] | null
          story?: string | null
          submitted_at?: string | null
          updated_at?: string | null
        }
        Update: {
          approved_at?: string | null
          created_at?: string | null
          display_location?: string | null
          display_order?: number | null
          featured?: boolean | null
          has_image?: boolean | null
          has_video?: boolean | null
          id?: string | null
          location?: string | null
          name?: string | null
          primary_media_url?: string | null
          rating?: number | null
          status?: Database["public"]["Enums"]["testimonial_status"] | null
          story?: string | null
          submitted_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_booking_requests: {
        Row: {
          base_price: number | null
          created_at: string | null
          discount_amount: number | null
          final_price: number | null
          id: string | null
          preferred_dates: string | null
          request_number: string | null
          service_name: string | null
          service_tier: string | null
          service_type: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          base_price?: number | null
          created_at?: string | null
          discount_amount?: number | null
          final_price?: number | null
          id?: string | null
          preferred_dates?: string | null
          request_number?: string | null
          service_name?: string | null
          service_tier?: string | null
          service_type?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          base_price?: number | null
          created_at?: string | null
          discount_amount?: number | null
          final_price?: number | null
          id?: string | null
          preferred_dates?: string | null
          request_number?: string | null
          service_name?: string | null
          service_tier?: string | null
          service_type?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      assign_role_by_email: {
        Args: {
          target_email: string
          target_role: Database["public"]["Enums"]["app_role"]
        }
        Returns: undefined
      }
      assign_user_role: {
        Args: {
          assigned_by_user_id?: string
          target_role: Database["public"]["Enums"]["app_role"]
          target_user_id: string
        }
        Returns: undefined
      }
      check_contact_bulk_access: {
        Args: never
        Returns: {
          access_count: number
          is_suspicious: boolean
          user_id: string
          window_minutes: number
        }[]
      }
      check_stale_heartbeats: {
        Args: never
        Returns: {
          last_heartbeat: string
          minutes_since_heartbeat: number
          new_status: string
          previous_status: string
          service_name: string
        }[]
      }
      generate_order_number: { Args: never; Returns: string }
      generate_payout_number: { Args: never; Returns: string }
      generate_request_number: { Args: never; Returns: string }
      generate_worker_id: { Args: never; Returns: string }
      get_healthcare_sensitive_data: {
        Args: { target_user_id: string }
        Returns: Json
      }
      get_profile_sensitive_data: {
        Args: { target_user_id: string }
        Returns: Json
      }
      get_senior_sensitive_data: {
        Args: { target_user_id: string }
        Returns: Json
      }
      get_worker_sensitive_data: {
        Args: { target_worker_id: string }
        Returns: Json
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      has_worker_role: {
        Args: { _role: string; _user_id: string }
        Returns: boolean
      }
      log_admin_action: {
        Args: {
          p_action_type: string
          p_details?: Json
          p_entity_id?: string
          p_entity_type: string
        }
        Returns: string
      }
      update_service_heartbeat: {
        Args: {
          p_error_log?: string
          p_service_name: string
          p_status?: string
        }
        Returns: undefined
      }
    }
    Enums: {
      app_role:
        | "admin"
        | "user"
        | "staff"
        | "worker"
        | "partner"
        | "secretary"
        | "training_coordinator"
        | "business_consultant"
        | "support_specialist"
      appointment_status:
        | "pending"
        | "confirmed"
        | "in_progress"
        | "completed"
        | "cancelled"
      booking_status: "pending" | "confirmed" | "completed" | "cancelled"
      commission_status: "pending" | "approved" | "paid" | "rejected"
      contact_status: "lead" | "prospect" | "customer" | "inactive"
      deal_stage:
        | "prospecting"
        | "qualification"
        | "proposal"
        | "negotiation"
        | "closed_won"
        | "closed_lost"
      event_status: "scheduled" | "completed" | "cancelled"
      event_type: "call" | "meeting" | "email" | "task" | "note"
      invoice_status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
      message_type: "direct" | "broadcast" | "announcement"
      notification_type:
        | "job_assignment"
        | "schedule_change"
        | "new_message"
        | "appointment_reminder"
        | "time_off_response"
        | "system"
      order_status:
        | "pending"
        | "confirmed"
        | "processing"
        | "shipped"
        | "delivered"
        | "cancelled"
        | "refunded"
      partner_payment_status: "pending" | "processing" | "completed" | "failed"
      partner_status: "pending" | "active" | "suspended" | "inactive"
      partner_type: "vendor" | "affiliate" | "distributor"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      product_status: "draft" | "active" | "inactive" | "out_of_stock"
      request_status: "new" | "assigned" | "completed" | "cancelled"
      service_category:
        | "training"
        | "consultation"
        | "support"
        | "maintenance"
        | "other"
      service_type: "consultation" | "workshop" | "training" | "support"
      testimonial_status: "pending" | "approved" | "rejected"
      ticket_priority: "low" | "medium" | "high" | "urgent"
      ticket_status: "open" | "in_progress" | "resolved" | "closed"
      time_off_status: "pending" | "approved" | "denied"
      worker_role:
        | "administrator"
        | "threat_analyst"
        | "trainer"
        | "ai_developer"
        | "web_designer"
        | "customer_support"
        | "sales_consultant"
      worker_status: "available" | "busy" | "off_duty" | "on_break"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "admin",
        "user",
        "staff",
        "worker",
        "partner",
        "secretary",
        "training_coordinator",
        "business_consultant",
        "support_specialist",
      ],
      appointment_status: [
        "pending",
        "confirmed",
        "in_progress",
        "completed",
        "cancelled",
      ],
      booking_status: ["pending", "confirmed", "completed", "cancelled"],
      commission_status: ["pending", "approved", "paid", "rejected"],
      contact_status: ["lead", "prospect", "customer", "inactive"],
      deal_stage: [
        "prospecting",
        "qualification",
        "proposal",
        "negotiation",
        "closed_won",
        "closed_lost",
      ],
      event_status: ["scheduled", "completed", "cancelled"],
      event_type: ["call", "meeting", "email", "task", "note"],
      invoice_status: ["draft", "sent", "paid", "overdue", "cancelled"],
      message_type: ["direct", "broadcast", "announcement"],
      notification_type: [
        "job_assignment",
        "schedule_change",
        "new_message",
        "appointment_reminder",
        "time_off_response",
        "system",
      ],
      order_status: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
        "refunded",
      ],
      partner_payment_status: ["pending", "processing", "completed", "failed"],
      partner_status: ["pending", "active", "suspended", "inactive"],
      partner_type: ["vendor", "affiliate", "distributor"],
      payment_status: ["pending", "completed", "failed", "refunded"],
      product_status: ["draft", "active", "inactive", "out_of_stock"],
      request_status: ["new", "assigned", "completed", "cancelled"],
      service_category: [
        "training",
        "consultation",
        "support",
        "maintenance",
        "other",
      ],
      service_type: ["consultation", "workshop", "training", "support"],
      testimonial_status: ["pending", "approved", "rejected"],
      ticket_priority: ["low", "medium", "high", "urgent"],
      ticket_status: ["open", "in_progress", "resolved", "closed"],
      time_off_status: ["pending", "approved", "denied"],
      worker_role: [
        "administrator",
        "threat_analyst",
        "trainer",
        "ai_developer",
        "web_designer",
        "customer_support",
        "sales_consultant",
      ],
      worker_status: ["available", "busy", "off_duty", "on_break"],
    },
  },
} as const
