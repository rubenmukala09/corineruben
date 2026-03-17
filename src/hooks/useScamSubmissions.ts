import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ScamSubmission {
  id: string;
  submission_type: string;
  content: string;
  submitter_email: string | null;
  status: string;
  risk_level: string | null;
  ai_confidence: number | null;
  threats_detected: string[] | null;
  recommendations: string[] | null;
  analysis_summary: string | null;
  created_at: string;
  analyzed_at: string | null;
}

export function useScamSubmissions() {
  return useQuery({
    queryKey: ["scam-submissions"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from("scam_submissions")
        .select("*")
        .eq("submitter_email", user.email)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching scam submissions:", error);
        throw error;
      }

      return data as ScamSubmission[];
    },
  });
}

export function useScamSubmissionById(id: string) {
  return useQuery({
    queryKey: ["scam-submission", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("scam_submissions")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching scam submission:", error);
        throw error;
      }

      return data as ScamSubmission;
    },
    enabled: !!id,
  });
}
