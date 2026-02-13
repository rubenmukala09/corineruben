import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  category: string;
  tags: string[] | null;
  status: string;
  views: number | null;
  author_id: string | null;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
}

export interface ArticleFilters {
  category?: string;
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export function useArticles(filters: ArticleFilters = {}) {
  const {
    category,
    status = "published",
    search,
    limit = 20,
    offset = 0,
  } = filters;

  return useQuery({
    queryKey: ["articles", { category, status, search, limit, offset }],
    queryFn: async () => {
      let query = supabase
        .from("articles")
        .select("*")
        .eq("status", status)
        .order("published_at", { ascending: false, nullsFirst: false })
        .range(offset, offset + limit - 1);

      if (category) {
        query = query.eq("category", category);
      }

      if (search) {
        query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching articles:", error);
        throw error;
      }

      return data as Article[];
    },
  });
}

export function useArticleBySlug(slug: string) {
  return useQuery({
    queryKey: ["article", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (error) {
        console.error("Error fetching article:", error);
        throw error;
      }

      // Increment view count
      if (data) {
        supabase
          .from("articles")
          .update({ views: (data.views || 0) + 1 })
          .eq("id", data.id)
          .then(() => {});
      }

      return data as Article;
    },
    enabled: !!slug,
  });
}

export function useArticleCategories() {
  return useQuery({
    queryKey: ["article-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("category")
        .eq("status", "published");

      if (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }

      // Get unique categories
      const categories = [...new Set(data?.map((a) => a.category))].filter(
        Boolean,
      );
      return categories;
    },
  });
}

export function useFeaturedArticles(limit = 3) {
  return useQuery({
    queryKey: ["featured-articles", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("status", "published")
        .order("views", { ascending: false, nullsFirst: false })
        .limit(limit);

      if (error) {
        console.error("Error fetching featured articles:", error);
        throw error;
      }

      return data as Article[];
    },
  });
}
