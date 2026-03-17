import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  usePortfolioAdminProjects,
  usePortfolioCategories,
  usePortfolioTags,
  useStyleDictionary,
  usePortfolioProjectMutations,
  type PortfolioProject,
  type CaseStudySection,
} from "@/hooks/usePortfolioCMS";
import { CASE_STUDY_SECTIONS, TREND_AGES } from "@/config/portfolioDesignSystem";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  Star,
  Book,
  Palette,
  Tag,
  Search,
} from "lucide-react";

export default function PortfolioAdmin() {
  const { data: projects, isLoading } = usePortfolioAdminProjects();
  const { data: categories } = usePortfolioCategories();
  const { data: allTags } = usePortfolioTags();
  const { data: styleDictionary } = useStyleDictionary();
  const { upsert, remove } = usePortfolioProjectMutations();

  const [editingProject, setEditingProject] = useState<Partial<PortfolioProject> | null>(null);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [caseSections, setCaseSections] = useState<Partial<CaseStudySection>[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"projects" | "dictionary">("projects");

  const openNew = () => {
    setEditingProject({
      title: "",
      slug: "",
      status: "draft",
      featured: false,
      display_order: 0,
    });
    setSelectedTagIds([]);
    setCaseSections(
      CASE_STUDY_SECTIONS.map((s) => ({
        section_type: s.type,
        title: s.label,
        content: "",
        media_urls: [],
        display_order: s.order,
      }))
    );
  };

  const openEdit = (p: PortfolioProject) => {
    setEditingProject(p);
    setSelectedTagIds(p.tags?.map((t) => t.id) || []);
    setCaseSections(
      CASE_STUDY_SECTIONS.map((s) => {
        const existing = p.case_study_sections?.find((cs) => cs.section_type === s.type);
        return existing || {
          section_type: s.type,
          title: s.label,
          content: "",
          media_urls: [],
          display_order: s.order,
        };
      })
    );
  };

  const handleSave = () => {
    if (!editingProject?.title || !editingProject?.slug) return;
    upsert.mutate(
      {
        project: editingProject as any,
        tagIds: selectedTagIds,
        caseSections,
      },
      { onSuccess: () => setEditingProject(null) }
    );
  };

  const toggleTag = (id: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const filteredProjects = projects?.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Portfolio CMS</h1>
          <p className="text-sm text-muted-foreground">
            Manage projects, case studies, and style dictionary
          </p>
        </div>
        <Button onClick={openNew} className="rounded-full">
          <Plus className="w-4 h-4 mr-2" /> New Project
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === "projects" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("projects")}
        >
          <Palette className="w-4 h-4 mr-1" /> Projects
        </Button>
        <Button
          variant={activeTab === "dictionary" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("dictionary")}
        >
          <Book className="w-4 h-4 mr-1" /> Style Dictionary
        </Button>
      </div>

      {activeTab === "projects" && (
        <>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-muted animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredProjects?.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-4 bg-card border border-border/60 rounded-xl hover:shadow-sm transition"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {p.thumbnail_url && (
                      <img
                        src={p.thumbnail_url}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-foreground truncate">{p.title}</h3>
                        {p.featured && <Star className="w-3.5 h-3.5 text-amber-500 fill-current flex-shrink-0" />}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge
                          variant={p.status === "published" ? "default" : "secondary"}
                          className="text-[10px]"
                        >
                          {p.status}
                        </Badge>
                        {p.category && <span>{p.category.name}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {p.status === "published" && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`/portfolio/${p.slug}`} target="_blank" rel="noopener noreferrer">
                          <Eye className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => openEdit(p)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (confirm("Delete this project?")) remove.mutate(p.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
              {filteredProjects?.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No projects found</p>
              )}
            </div>
          )}
        </>
      )}

      {activeTab === "dictionary" && styleDictionary && (
        <div className="space-y-3">
          {styleDictionary.map((entry) => (
            <div
              key={entry.id}
              className="p-4 bg-card border border-border/60 rounded-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-foreground">{entry.canonical_term}</h3>
                <Badge className={TREND_AGES[entry.trend_age]?.color || ""}>
                  {TREND_AGES[entry.trend_age]?.label || entry.trend_age}
                </Badge>
              </div>
              {entry.client_facing_label && (
                <p className="text-sm text-muted-foreground mb-1">
                  Client-facing: "{entry.client_facing_label}"
                </p>
              )}
              {entry.aliases.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Aliases:</span>
                  {entry.aliases.map((a, i) => (
                    <span key={i} className="text-xs text-destructive/70 line-through">{a}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ═══ Edit Modal ═══ */}
      <Dialog open={!!editingProject} onOpenChange={() => setEditingProject(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProject?.id ? "Edit Project" : "New Project"}
            </DialogTitle>
          </DialogHeader>

          {editingProject && (
            <div className="space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">Title</label>
                  <Input
                    value={editingProject.title || ""}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">Slug</label>
                  <Input
                    value={editingProject.slug || ""}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, slug: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-foreground uppercase tracking-wider">Short Description</label>
                <Textarea
                  value={editingProject.short_description || ""}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, short_description: e.target.value })
                  }
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">Category</label>
                  <Select
                    value={editingProject.category_id || ""}
                    onValueChange={(v) =>
                      setEditingProject({ ...editingProject, category_id: v })
                    }
                  >
                    <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent>
                      {categories?.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">Status</label>
                  <Select
                    value={editingProject.status || "draft"}
                    onValueChange={(v) =>
                      setEditingProject({ ...editingProject, status: v })
                    }
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">Client</label>
                  <Input
                    value={editingProject.client_name || ""}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, client_name: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">Hero Image URL</label>
                  <Input
                    value={editingProject.hero_image_url || ""}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, hero_image_url: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">Thumbnail URL</label>
                  <Input
                    value={editingProject.thumbnail_url || ""}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, thumbnail_url: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1">
                  <Tag className="w-3 h-3" /> Tags
                </label>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {allTags?.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id)}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold transition ${
                        selectedTagIds.includes(tag.id)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Case Study Sections */}
              <div>
                <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1 mb-3">
                  <Book className="w-3 h-3" /> Case Study Sections
                </label>
                <div className="space-y-3">
                  {caseSections.map((section, idx) => {
                    const def = CASE_STUDY_SECTIONS.find((s) => s.type === section.section_type);
                    return (
                      <div key={section.section_type} className="p-3 bg-muted/50 rounded-xl border border-border/50">
                        <p className="text-xs font-bold text-primary mb-1">
                          {def?.label || section.section_type}
                        </p>
                        <p className="text-[10px] text-muted-foreground mb-2">
                          {def?.description}
                        </p>
                        <Textarea
                          placeholder={`Write about ${def?.label?.toLowerCase()}...`}
                          value={section.content || ""}
                          onChange={(e) => {
                            const updated = [...caseSections];
                            updated[idx] = { ...updated[idx], content: e.target.value };
                            setCaseSections(updated);
                          }}
                          rows={3}
                          className="text-sm"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button onClick={handleSave} disabled={upsert.isPending} className="flex-1">
                  {upsert.isPending ? "Saving..." : "Save Project"}
                </Button>
                <Button variant="outline" onClick={() => setEditingProject(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
