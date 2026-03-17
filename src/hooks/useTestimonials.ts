import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Testimonial {
  id: string;
  name: string;
  story: string;
  location: string | null;
  rating: number | null;
  primary_media_url: string | null;
}

export const useTestimonials = (limit: number = 10) => {
  return useQuery({
    queryKey: ["testimonials", limit],
    queryFn: async () => {
      // Use the public view that excludes email addresses for security
      const { data, error } = await supabase
        .from("testimonials_public" as any)
        .select("id, name, story, location, rating, primary_media_url")
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as Testimonial[];
    },
  });
};
