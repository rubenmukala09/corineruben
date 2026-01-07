import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Testimonial {
  id: string;
  name: string;
  story: string;
  location: string | null;
  rating: number | null;
  photo_url: string | null;
}

export const useTestimonials = (limit: number = 10) => {
  return useQuery({
    queryKey: ["testimonials", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("id, name, story, location, rating, photo_url")
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as Testimonial[];
    },
  });
};
