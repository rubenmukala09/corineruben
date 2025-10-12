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
      enrollments: {
        Row: {
          completed_at: string | null
          contact_id: string
          course_id: string
          enrolled_at: string
          id: string
          status: string
        }
        Insert: {
          completed_at?: string | null
          contact_id: string
          course_id: string
          enrolled_at?: string
          id?: string
          status?: string
        }
        Update: {
          completed_at?: string | null
          contact_id?: string
          course_id?: string
          enrolled_at?: string
          id?: string
          status?: string
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
          cover_letter: string
          created_at: string
          email: string
          id: string
          name: string
          phone: string
          position: string
          resume_url: string | null
          status: string
          updated_at: string
        }
        Insert: {
          cover_letter: string
          created_at?: string
          email: string
          id?: string
          name: string
          phone: string
          position: string
          resume_url?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          cover_letter?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string
          position?: string
          resume_url?: string | null
          status?: string
          updated_at?: string
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
      profiles: {
        Row: {
          created_at: string | null
          id: string
          updated_at: string | null
          username: string
        }
        Insert: {
          created_at?: string | null
          id: string
          updated_at?: string | null
          username: string
        }
        Update: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
          username?: string
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
      [_ in never]: never
    }
    Functions: {
      generate_request_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_worker_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user" | "staff" | "worker"
      appointment_status:
        | "pending"
        | "confirmed"
        | "in_progress"
        | "completed"
        | "cancelled"
      booking_status: "pending" | "confirmed" | "completed" | "cancelled"
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
      payment_status: "pending" | "completed" | "failed" | "refunded"
      request_status: "new" | "assigned" | "completed" | "cancelled"
      service_category:
        | "training"
        | "consultation"
        | "support"
        | "maintenance"
        | "other"
      service_type: "consultation" | "workshop" | "training" | "support"
      ticket_priority: "low" | "medium" | "high" | "urgent"
      ticket_status: "open" | "in_progress" | "resolved" | "closed"
      time_off_status: "pending" | "approved" | "denied"
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
      app_role: ["admin", "user", "staff", "worker"],
      appointment_status: [
        "pending",
        "confirmed",
        "in_progress",
        "completed",
        "cancelled",
      ],
      booking_status: ["pending", "confirmed", "completed", "cancelled"],
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
      payment_status: ["pending", "completed", "failed", "refunded"],
      request_status: ["new", "assigned", "completed", "cancelled"],
      service_category: [
        "training",
        "consultation",
        "support",
        "maintenance",
        "other",
      ],
      service_type: ["consultation", "workshop", "training", "support"],
      ticket_priority: ["low", "medium", "high", "urgent"],
      ticket_status: ["open", "in_progress", "resolved", "closed"],
      time_off_status: ["pending", "approved", "denied"],
      worker_status: ["available", "busy", "off_duty", "on_break"],
    },
  },
} as const
