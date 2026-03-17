import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useGDAdminProjects,
  useGDCategories,
  useGDTags,
  useGDProjectMutations,
  type GDProject,
} from "@/hooks/useGraphicDesignCMS";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  Star,
  Image as ImageIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const emptyProject: Partial<GDProject> & { title: string; slug: string } = {
  title: "",
  slug: "",
  short_description: "",
  full_description: "",
  category_id: null,
  client_name: "",
  project_year: new Date().getFullYear(),
  tools_used: "",
  is_featured: false,
  gallery: [],
  live_link: "",
  seo_title: "",
  seo_meta_description: "",
  status: "draft",
  thumbnail_url: "",
  hero_image_url: "",
};

const GraphicDesignAdmin = () => {
  const { data: projects, isLoading } = useGDAdminProjects();
  const { data: categories } = useGDCategories();
  const { data: allTags } = useGDTags();
  const { upsert, remove } = useGDProjectMutations();

  const [editing, setEditing] = useState<
    (Partial<GDProject> & { title: string; slug: string }) | null
  >(null);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  const openNew = () => {
    setEditing({ ...emptyProject });
    setSelectedTagIds([]);
  };

  const openEdit = (project: GDProject) => {
    setEditing({ ...project });
    setSelectedTagIds((project.tags || []).map((t) => t.id));
  };

  const handleSave = () => {
    if (!editing) return;
    upsert.mutate(
      { project: editing, tagIds: selectedTagIds },
      { onSuccess: () => setEditing(null) }
    );
  };

  const autoSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const toggleTag = (tagId: string) =>
    setSelectedTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Graphic Design Portfolio
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage projects, categories, and tags
          </p>
        </div>
        <Button onClick={openNew}>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Projects Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Project
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Category
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Year
                </th>
                <th className="px-4 py-3 text-right font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    Loading...
                  </td>
                </tr>
              ) : !projects?.length ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    No projects yet. Create your first one.
                  </td>
                </tr>
              ) : (
                projects.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.thumbnail_url ? (
                          <img
                            src={p.thumbnail_url}
                            alt={p.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                            <ImageIcon className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-foreground flex items-center gap-1.5">
                            {p.title}
                            {p.is_featured && (
                              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            /{p.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {p.category?.name || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={p.status === "published" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {p.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {p.project_year}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(p)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            if (confirm("Delete this project?"))
                              remove.mutate(p.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                        {p.status === "published" && (
                          <a
                            href={`/portfolio/${p.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Create Dialog */}
      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editing?.id ? "Edit Project" : "New Project"}
            </DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title *</Label>
                  <Input
                    value={editing.title}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        title: e.target.value,
                        slug: editing.id ? editing.slug : autoSlug(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Slug *</Label>
                  <Input
                    value={editing.slug}
                    onChange={(e) =>
                      setEditing({ ...editing, slug: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={editing.category_id || ""}
                    onValueChange={(v) =>
                      setEditing({ ...editing, category_id: v || null })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={editing.status}
                    onValueChange={(v) => setEditing({ ...editing, status: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Short Description</Label>
                <Input
                  value={editing.short_description || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, short_description: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Full Description</Label>
                <Textarea
                  rows={4}
                  value={editing.full_description || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, full_description: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Thumbnail URL</Label>
                  <Input
                    value={editing.thumbnail_url || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, thumbnail_url: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hero Image URL</Label>
                  <Input
                    value={editing.hero_image_url || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, hero_image_url: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Client Name</Label>
                  <Input
                    value={editing.client_name || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, client_name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Year</Label>
                  <Input
                    type="number"
                    value={editing.project_year}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        project_year: parseInt(e.target.value) || new Date().getFullYear(),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tools Used</Label>
                  <Input
                    value={editing.tools_used || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, tools_used: e.target.value })
                    }
                    placeholder="Figma, Photoshop..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Live Link</Label>
                <Input
                  value={editing.live_link || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, live_link: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 p-3 rounded-lg border border-border bg-muted/30 max-h-40 overflow-y-auto">
                  {allTags?.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                        selectedTagIds.includes(tag.id)
                          ? "bg-primary text-white"
                          : "bg-card text-foreground border border-border hover:bg-muted"
                      }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  checked={editing.is_featured || false}
                  onCheckedChange={(v) =>
                    setEditing({ ...editing, is_featured: v })
                  }
                />
                <Label>Featured Project</Label>
              </div>

              {/* SEO */}
              <div className="space-y-3 pt-2 border-t border-border">
                <p className="text-sm font-semibold text-foreground">SEO</p>
                <div className="space-y-2">
                  <Label>SEO Title</Label>
                  <Input
                    value={editing.seo_title || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, seo_title: e.target.value })
                    }
                    maxLength={60}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Meta Description</Label>
                  <Textarea
                    rows={2}
                    value={editing.seo_meta_description || ""}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        seo_meta_description: e.target.value,
                      })
                    }
                    maxLength={160}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" onClick={() => setEditing(null)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={!editing.title || !editing.slug || upsert.isPending}
                >
                  {upsert.isPending ? "Saving..." : "Save Project"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GraphicDesignAdmin;
