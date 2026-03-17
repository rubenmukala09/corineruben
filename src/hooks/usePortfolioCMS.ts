import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// ═══ Types ═══
export interface PortfolioCategory {
  id: string;
  name: string;
  slug: string;
  visibility: "primary" | "secondary" | "hidden";
  display_order: number;
  description: string | null;
}

export interface PortfolioStyleEntry {
  id: string;
  canonical_term: string;
  aliases: string[];
  client_facing_label: string | null;
  trend_age: "timeless" | "trend-aware" | "trend-led" | "experimental";
  category: string;
  description: string | null;
}

export interface PortfolioTag {
  id: string;
  name: string;
  slug: string;
  tag_type: string;
  style_dictionary_id: string | null;
  display_order: number;
}

export interface CaseStudySection {
  id: string;
  project_id: string;
  section_type: string;
  title: string | null;
  content: string | null;
  media_urls: string[];
  display_order: number;
}

export interface GalleryImage {
  id: string;
  project_id: string;
  image_url: string;
  caption: string | null;
  display_order: number;
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  category_id: string | null;
  hero_image_url: string | null;
  thumbnail_url: string | null;
  short_description: string | null;
  client_name: string | null;
  project_date: string | null;
  featured: boolean;
  status: string;
  display_order: number;
  created_at: string;
  updated_at: string;
  // Joined
  category?: PortfolioCategory;
  tags?: PortfolioTag[];
  case_study_sections?: CaseStudySection[];
  gallery?: GalleryImage[];
}

// ═══ Categories ═══
export const usePortfolioCategories = (visibility?: string) =>
  useQuery({
    queryKey: ["portfolio-categories", visibility],
    queryFn: async () => {
      let q = (supabase as any)
        .from("portfolio_categories")
        .select("*")
        .order("display_order");
      if (visibility) q = q.eq("visibility", visibility);
      const { data, error } = await q;
      if (error) throw error;
      return data as PortfolioCategory[];
    },
  });

// ═══ Tags ═══
export const usePortfolioTags = (tagType?: string) =>
  useQuery({
    queryKey: ["portfolio-tags", tagType],
    queryFn: async () => {
      let q = (supabase as any)
        .from("portfolio_tags")
        .select("*")
        .order("display_order");
      if (tagType) q = q.eq("tag_type", tagType);
      const { data, error } = await q;
      if (error) throw error;
      return data as PortfolioTag[];
    },
  });

// ═══ Style Dictionary ═══
export const useStyleDictionary = () =>
  useQuery({
    queryKey: ["portfolio-style-dictionary"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("portfolio_style_dictionary")
        .select("*")
        .order("canonical_term");
      if (error) throw error;
      return data as PortfolioStyleEntry[];
    },
  });

// ═══ Published Projects ═══
export const usePortfolioProjects = (filters?: {
  categorySlug?: string;
  tagSlug?: string;
  featured?: boolean;
}) =>
  useQuery({
    queryKey: ["portfolio-projects", filters],
    queryFn: async () => {
      let q = (supabase as any)
        .from("portfolio_projects")
        .select("*, portfolio_categories(*)")
        .eq("status", "published")
        .order("featured", { ascending: false })
        .order("display_order")
        .order("created_at", { ascending: false });

      if (filters?.featured) q = q.eq("featured", true);

      const { data, error } = await q;
      if (error) throw error;

      let projects = data as any[];

      if (filters?.categorySlug) {
        projects = projects.filter(
          (p: any) => p.portfolio_categories?.slug === filters.categorySlug
        );
      }

      // Fetch tags
      const ids = projects.map((p: any) => p.id);
      if (ids.length > 0) {
        const { data: ptData } = await (supabase as any)
          .from("portfolio_project_tags")
          .select("project_id, portfolio_tags(*)")
          .in("project_id", ids);

        const tagMap: Record<string, PortfolioTag[]> = {};
        (ptData || []).forEach((pt: any) => {
          if (!tagMap[pt.project_id]) tagMap[pt.project_id] = [];
          tagMap[pt.project_id].push(pt.portfolio_tags);
        });

        projects = projects.map((p: any) => ({
          ...p,
          category: p.portfolio_categories,
          tags: tagMap[p.id] || [],
        }));

        if (filters?.tagSlug) {
          projects = projects.filter((p: any) =>
            p.tags.some((t: PortfolioTag) => t.slug === filters.tagSlug)
          );
        }
      }

      return projects as PortfolioProject[];
    },
  });

// ═══ Single project with case study ═══
export const usePortfolioProject = (slug: string) =>
  useQuery({
    queryKey: ["portfolio-project", slug],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("portfolio_projects")
        .select("*, portfolio_categories(*)")
        .eq("slug", slug)
        .single();
      if (error) throw error;

      // Tags
      const { data: ptData } = await (supabase as any)
        .from("portfolio_project_tags")
        .select("portfolio_tags(*)")
        .eq("project_id", data.id);

      // Case study sections
      const { data: sections } = await (supabase as any)
        .from("portfolio_case_study_sections")
        .select("*")
        .eq("project_id", data.id)
        .order("display_order");

      // Gallery
      const { data: gallery } = await (supabase as any)
        .from("portfolio_gallery")
        .select("*")
        .eq("project_id", data.id)
        .order("display_order");

      return {
        ...data,
        category: data.portfolio_categories,
        tags: (ptData || []).map((pt: any) => pt.portfolio_tags),
        case_study_sections: sections || [],
        gallery: gallery || [],
      } as PortfolioProject;
    },
    enabled: !!slug,
  });

// ═══ Admin: all projects ═══
export const usePortfolioAdminProjects = () =>
  useQuery({
    queryKey: ["portfolio-admin-projects"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("portfolio_projects")
        .select("*, portfolio_categories(name, slug)")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data || []).map((p: any) => ({
        ...p,
        category: p.portfolio_categories,
      })) as PortfolioProject[];
    },
  });

// ═══ Mutations ═══
export const usePortfolioProjectMutations = () => {
  const qc = useQueryClient();
  const { toast } = useToast();

  const upsert = useMutation({
    mutationFn: async ({
      project,
      tagIds,
      caseSections,
    }: {
      project: Partial<PortfolioProject> & { title: string; slug: string };
      tagIds: string[];
      caseSections?: Partial<CaseStudySection>[];
    }) => {
      const { category, tags, case_study_sections, gallery, ...payload } = project as any;

      let id = project.id;
      if (id) {
        const { error } = await (supabase as any)
          .from("portfolio_projects")
          .update(payload)
          .eq("id", id);
        if (error) throw error;
      } else {
        const { data, error } = await (supabase as any)
          .from("portfolio_projects")
          .insert(payload)
          .select("id")
          .single();
        if (error) throw error;
        id = data.id;
      }

      // Sync tags
      await (supabase as any)
        .from("portfolio_project_tags")
        .delete()
        .eq("project_id", id);

      if (tagIds.length > 0) {
        await (supabase as any)
          .from("portfolio_project_tags")
          .insert(tagIds.map((tid) => ({ project_id: id, tag_id: tid })));
      }

      // Sync case study sections
      if (caseSections && caseSections.length > 0) {
        await (supabase as any)
          .from("portfolio_case_study_sections")
          .delete()
          .eq("project_id", id);

        await (supabase as any)
          .from("portfolio_case_study_sections")
          .insert(
            caseSections.map((s, i) => ({
              project_id: id,
              section_type: s.section_type,
              title: s.title,
              content: s.content,
              media_urls: s.media_urls || [],
              display_order: i,
            }))
          );
      }

      return id;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["portfolio-admin-projects"] });
      qc.invalidateQueries({ queryKey: ["portfolio-projects"] });
      toast({ title: "Project saved" });
    },
    onError: (err: any) => {
      toast({ title: "Error saving project", description: err.message, variant: "destructive" });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any)
        .from("portfolio_projects")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["portfolio-admin-projects"] });
      qc.invalidateQueries({ queryKey: ["portfolio-projects"] });
      toast({ title: "Project deleted" });
    },
  });

  return { upsert, remove };
};

// ═══ Style Dictionary Mutations ═══
export const useStyleDictionaryMutations = () => {
  const qc = useQueryClient();
  const { toast } = useToast();

  const upsert = useMutation({
    mutationFn: async (entry: Partial<PortfolioStyleEntry> & { canonical_term: string }) => {
      const { id, ...payload } = entry;
      if (id) {
        const { error } = await (supabase as any)
          .from("portfolio_style_dictionary")
          .update(payload)
          .eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await (supabase as any)
          .from("portfolio_style_dictionary")
          .insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["portfolio-style-dictionary"] });
      toast({ title: "Style entry saved" });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any)
        .from("portfolio_style_dictionary")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["portfolio-style-dictionary"] });
      toast({ title: "Style entry deleted" });
    },
  });

  return { upsert, remove };
};
