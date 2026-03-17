import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Types
export interface GDCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
}

export interface GDTag {
  id: string;
  name: string;
  slug: string;
  category_id: string | null;
}

export interface GDProject {
  id: string;
  title: string;
  slug: string;
  thumbnail_url: string | null;
  hero_image_url: string | null;
  short_description: string | null;
  full_description: string | null;
  category_id: string | null;
  client_name: string | null;
  project_year: number;
  tools_used: string | null;
  is_featured: boolean;
  gallery: string[];
  live_link: string | null;
  seo_title: string | null;
  seo_meta_description: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  // Joined
  category?: GDCategory;
  tags?: GDTag[];
}

export type ProjectInsert = Omit<GDProject, "id" | "created_at" | "updated_at" | "category" | "tags">;

// ─── Categories ───
export const useGDCategories = () =>
  useQuery({
    queryKey: ["gd-categories"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("graphic_design_categories")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data as GDCategory[];
    },
  });

// ─── Tags ───
export const useGDTags = (categoryId?: string) =>
  useQuery({
    queryKey: ["gd-tags", categoryId],
    queryFn: async () => {
      let q = (supabase as any)
        .from("graphic_design_tags")
        .select("*")
        .order("name");
      if (categoryId) q = q.eq("category_id", categoryId);
      const { data, error } = await q;
      if (error) throw error;
      return data as GDTag[];
    },
  });

// ─── Projects (public, published) ───
export const useGDProjects = (filters?: {
  categorySlug?: string;
  tagSlug?: string;
  featured?: boolean;
  year?: number;
}) =>
  useQuery({
    queryKey: ["gd-projects", filters],
    queryFn: async () => {
      let q = (supabase as any)
        .from("graphic_design_projects")
        .select("*, graphic_design_categories(*)")
        .eq("status", "published")
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false });

      if (filters?.featured) q = q.eq("is_featured", true);
      if (filters?.year) q = q.eq("project_year", filters.year);

      const { data, error } = await q;
      if (error) throw error;

      let projects = data as any[];

      // Category filter
      if (filters?.categorySlug) {
        projects = projects.filter(
          (p: any) => p.graphic_design_categories?.slug === filters.categorySlug
        );
      }

      // Fetch tags for projects
      const projectIds = projects.map((p: any) => p.id);
      if (projectIds.length > 0) {
        const { data: ptData } = await (supabase as any)
          .from("graphic_design_project_tags")
          .select("project_id, graphic_design_tags(*)")
          .in("project_id", projectIds);

        const tagMap: Record<string, GDTag[]> = {};
        (ptData || []).forEach((pt: any) => {
          if (!tagMap[pt.project_id]) tagMap[pt.project_id] = [];
          tagMap[pt.project_id].push(pt.graphic_design_tags);
        });

        projects = projects.map((p: any) => ({
          ...p,
          category: p.graphic_design_categories,
          tags: tagMap[p.id] || [],
        }));

        // Tag filter
        if (filters?.tagSlug) {
          projects = projects.filter((p: any) =>
            p.tags.some((t: GDTag) => t.slug === filters.tagSlug)
          );
        }
      }

      return projects as GDProject[];
    },
  });

// ─── Single project ───
export const useGDProject = (slug: string) =>
  useQuery({
    queryKey: ["gd-project", slug],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("graphic_design_projects")
        .select("*, graphic_design_categories(*)")
        .eq("slug", slug)
        .single();
      if (error) throw error;

      // Tags
      const { data: ptData } = await (supabase as any)
        .from("graphic_design_project_tags")
        .select("graphic_design_tags(*)")
        .eq("project_id", data.id);

      return {
        ...data,
        category: data.graphic_design_categories,
        tags: (ptData || []).map((pt: any) => pt.graphic_design_tags),
      } as GDProject;
    },
    enabled: !!slug,
  });

// ─── Admin: all projects ───
export const useGDAdminProjects = () =>
  useQuery({
    queryKey: ["gd-admin-projects"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("graphic_design_projects")
        .select("*, graphic_design_categories(name, slug)")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data || []).map((p: any) => ({
        ...p,
        category: p.graphic_design_categories,
      })) as GDProject[];
    },
  });

// ─── Mutations ───
export const useGDProjectMutations = () => {
  const qc = useQueryClient();
  const { toast } = useToast();

  const upsert = useMutation({
    mutationFn: async ({
      project,
      tagIds,
    }: {
      project: Partial<GDProject> & { title: string; slug: string };
      tagIds: string[];
    }) => {
      const { category, tags, ...payload } = project as any;

      let id = project.id;
      if (id) {
        const { error } = await (supabase as any)
          .from("graphic_design_projects")
          .update(payload)
          .eq("id", id);
        if (error) throw error;
      } else {
        const { data, error } = await (supabase as any)
          .from("graphic_design_projects")
          .insert(payload)
          .select("id")
          .single();
        if (error) throw error;
        id = data.id;
      }

      // Sync tags
      await (supabase as any)
        .from("graphic_design_project_tags")
        .delete()
        .eq("project_id", id);

      if (tagIds.length > 0) {
        await (supabase as any)
          .from("graphic_design_project_tags")
          .insert(tagIds.map((tid) => ({ project_id: id, tag_id: tid })));
      }

      return id;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["gd-admin-projects"] });
      qc.invalidateQueries({ queryKey: ["gd-projects"] });
      toast({ title: "Project saved" });
    },
    onError: (err: any) => {
      toast({ title: "Error saving project", description: err.message, variant: "destructive" });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any)
        .from("graphic_design_projects")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["gd-admin-projects"] });
      qc.invalidateQueries({ queryKey: ["gd-projects"] });
      toast({ title: "Project deleted" });
    },
  });

  return { upsert, remove };
};
