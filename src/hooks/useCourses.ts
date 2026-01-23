import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Course {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  duration_weeks: number | null;
  max_students: number | null;
  start_date: string | null;
  end_date: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CourseModule {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  order_index: number;
  duration_minutes: number | null;
  created_at: string;
  updated_at: string;
  lessons?: CourseLesson[];
}

export interface CourseLesson {
  id: string;
  module_id: string;
  title: string;
  content: string | null;
  video_url: string | null;
  order_index: number;
  duration_minutes: number | null;
  is_free_preview: boolean;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string | null;
  course_id: string;
  contact_id: string;
  status: string;
  progress_percentage: number | null;
  enrolled_at: string;
  completed_at: string | null;
  last_accessed_at: string | null;
  course?: Course;
}

export function useCourses(activeOnly = true) {
  return useQuery({
    queryKey: ["courses", { activeOnly }],
    queryFn: async () => {
      let query = supabase
        .from("courses")
        .select("*")
        .order("created_at", { ascending: false });

      if (activeOnly) {
        query = query.eq("active", true);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching courses:", error);
        throw error;
      }

      return data as Course[];
    },
  });
}

export function useCourseById(courseId: string) {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("id", courseId)
        .single();

      if (error) {
        console.error("Error fetching course:", error);
        throw error;
      }

      return data as Course;
    },
    enabled: !!courseId,
  });
}

export function useCourseModules(courseId: string) {
  return useQuery({
    queryKey: ["course-modules", courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course_modules")
        .select(`
          *,
          lessons:course_lessons(*)
        `)
        .eq("course_id", courseId)
        .order("order_index", { ascending: true });

      if (error) {
        console.error("Error fetching course modules:", error);
        throw error;
      }

      // Sort lessons within each module
      return (data as (CourseModule & { lessons: CourseLesson[] })[]).map(module => ({
        ...module,
        lessons: module.lessons?.sort((a, b) => a.order_index - b.order_index) || []
      }));
    },
    enabled: !!courseId,
  });
}

export function useUserEnrollments() {
  return useQuery({
    queryKey: ["user-enrollments"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from("enrollments")
        .select(`
          *,
          course:courses(*)
        `)
        .eq("user_id", user.id)
        .order("enrolled_at", { ascending: false });

      if (error) {
        console.error("Error fetching enrollments:", error);
        throw error;
      }

      return data as (Enrollment & { course: Course })[];
    },
  });
}

export function useEnrollInCourse() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ courseId, contactId }: { courseId: string; contactId?: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Must be logged in to enroll");

      // Check if already enrolled
      const { data: existing } = await supabase
        .from("enrollments")
        .select("id")
        .eq("user_id", user.id)
        .eq("course_id", courseId)
        .single();

      if (existing) {
        throw new Error("Already enrolled in this course");
      }

      // Create enrollment - contactId is required by the schema
      // If not provided, we'll use a placeholder or create a contact
      const { data, error } = await supabase
        .from("enrollments")
        .insert({
          user_id: user.id,
          course_id: courseId,
          contact_id: contactId || user.id, // Use user id as contact if not provided
          status: "active",
          progress_percentage: 0,
        })
        .select()
        .single();

      if (error) {
        console.error("Error enrolling:", error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-enrollments"] });
      toast({
        title: "🎉 Enrolled Successfully!",
        description: "You're now enrolled in this course. Start learning!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Enrollment Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ enrollmentId, progress }: { enrollmentId: string; progress: number }) => {
      const { data, error } = await supabase
        .from("enrollments")
        .update({
          progress_percentage: progress,
          last_accessed_at: new Date().toISOString(),
          completed_at: progress >= 100 ? new Date().toISOString() : null,
          status: progress >= 100 ? "completed" : "active",
        })
        .eq("id", enrollmentId)
        .select()
        .single();

      if (error) {
        console.error("Error updating progress:", error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-enrollments"] });
    },
  });
}
