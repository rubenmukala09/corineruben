import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DashboardMetrics {
  threatsBlocked: number;
  daysProtected: number;
  protectionScore: number;
  totalEnrollments: number;
  completedCourses: number;
  overallProgress: number;
}

export interface ThreatEvent {
  id: string;
  threat_type: string;
  description: string | null;
  severity: string;
  status: string;
  source: string | null;
  created_at: string;
}

export function useDashboardMetrics() {
  return useQuery({
    queryKey: ["dashboard-metrics"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;

      // Fetch threat events for this user
      const { data: threats, error: threatError } = await supabase
        .from("threat_events")
        .select("*")
        .eq("profile_id", user.id);

      if (threatError) console.error("Error fetching threats:", threatError);

      // Fetch enrollments for this user
      const { data: enrollments, error: enrollError } = await supabase
        .from("enrollments")
        .select("*")
        .eq("user_id", user.id);

      if (enrollError)
        console.error("Error fetching enrollments:", enrollError);

      // Fetch user profile to calculate days protected
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("created_at")
        .eq("id", user.id)
        .single();

      if (profileError) console.error("Error fetching profile:", profileError);

      // Calculate metrics
      const blockedThreats =
        threats?.filter(
          (t) => t.status === "blocked" || t.status === "resolved",
        ) || [];
      const completedEnrollments =
        enrollments?.filter((e) => e.status === "completed") || [];

      // Days since account creation
      const createdAt = profile?.created_at
        ? new Date(profile.created_at)
        : new Date();
      const daysProtected = Math.floor(
        (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24),
      );

      // Calculate protection score based on various factors
      const baseScore = 70;
      const threatBonus = Math.min(blockedThreats.length * 2, 15); // Up to 15 points for blocking threats
      const trainingBonus = Math.min(completedEnrollments.length * 5, 15); // Up to 15 points for training
      const protectionScore = Math.min(
        baseScore + threatBonus + trainingBonus,
        100,
      );

      // Calculate overall training progress
      const totalProgress =
        enrollments?.reduce(
          (acc, e) => acc + (e.progress_percentage || 0),
          0,
        ) || 0;
      const overallProgress = enrollments?.length
        ? Math.round(totalProgress / enrollments.length)
        : 0;

      return {
        threatsBlocked: blockedThreats.length,
        daysProtected: Math.max(daysProtected, 1),
        protectionScore,
        totalEnrollments: enrollments?.length || 0,
        completedCourses: completedEnrollments.length,
        overallProgress,
      } as DashboardMetrics;
    },
  });
}

export function useThreatEvents(limit = 10) {
  return useQuery({
    queryKey: ["threat-events", limit],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from("threat_events")
        .select("*")
        .eq("profile_id", user.id)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) {
        console.error("Error fetching threat events:", error);
        return [];
      }

      return data as ThreatEvent[];
    },
  });
}

export function useTrainingProgress() {
  return useQuery({
    queryKey: ["training-progress"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from("enrollments")
        .select(
          `
          *,
          course:courses(*)
        `,
        )
        .eq("user_id", user.id)
        .order("enrolled_at", { ascending: false });

      if (error) {
        console.error("Error fetching training progress:", error);
        return [];
      }

      return data;
    },
  });
}
