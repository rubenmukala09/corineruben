import { Link, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePortfolioProject } from "@/hooks/usePortfolioCMS";
import { CASE_STUDY_SECTIONS } from "@/config/portfolioDesignSystem";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Star,
  User,
  Layers,
  Eye,
  Target,
  Palette,
  Monitor,
  Play,
  TrendingUp,
} from "lucide-react";

const SECTION_ICONS: Record<string, any> = {
  context: Target,
  role_scope: User,
  visual_strategy: Eye,
  design_system: Palette,
  key_screens: Monitor,
  motion_interaction: Play,
  outcome: TrendingUp,
};

const PortfolioDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading } = usePortfolioProject(slug || "");

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-28 pb-20 container mx-auto px-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-48 bg-muted rounded" />
            <div className="h-96 bg-muted rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-28 pb-20 container mx-auto px-6 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Project not found
          </h1>
          <Button asChild variant="outline">
            <Link to="/portfolio">Back to Portfolio</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const sections = project.case_study_sections || [];
  const sectionMap = Object.fromEntries(sections.map((s) => [s.section_type, s]));

  return (
    <div className="min-h-screen">
      <SEO
        title={`${project.title} | Portfolio`}
        description={project.short_description || `${project.title} design case study`}
      />
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Back */}
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>

          {/* Hero Image */}
          {project.hero_image_url && (
            <div className="rounded-2xl overflow-hidden mb-10 aspect-[16/9] bg-muted">
              <img
                src={project.hero_image_url}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                {project.category && (
                  <Badge variant="secondary">{project.category.name}</Badge>
                )}
                {project.featured && (
                  <Badge className="bg-amber-500 text-white">
                    <Star className="w-3 h-3 mr-1 fill-current" /> Featured
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground">
                {project.title}
              </h1>
              {project.short_description && (
                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                  {project.short_description}
                </p>
              )}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      to={`/portfolio?tag=${tag.slug}`}
                      className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition border border-primary/15"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                  Project Details
                </h3>
                {project.client_name && (
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Client</p>
                      <p className="text-sm font-medium text-foreground">{project.client_name}</p>
                    </div>
                  </div>
                )}
                {project.project_date && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p className="text-sm font-medium text-foreground">
                        {new Date(project.project_date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                        })}
                      </p>
                    </div>
                  </div>
                )}
                {project.category && (
                  <div className="flex items-center gap-3">
                    <Layers className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Discipline</p>
                      <p className="text-sm font-medium text-foreground">{project.category.name}</p>
                    </div>
                  </div>
                )}
              </div>
              <Button asChild variant="outline" className="w-full rounded-full">
                <Link to="/contact">Start a Similar Project</Link>
              </Button>
            </div>
          </div>

          {/* ═══ Case Study Sections ═══ */}
          {sections.length > 0 && (
            <div className="space-y-16 max-w-4xl">
              {CASE_STUDY_SECTIONS.map((sectionDef) => {
                const section = sectionMap[sectionDef.type];
                if (!section || (!section.content && (!section.media_urls || section.media_urls.length === 0))) return null;

                const Icon = SECTION_ICONS[sectionDef.type] || Layers;

                return (
                  <div key={sectionDef.type} className="scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                          {sectionDef.label}
                        </p>
                        <h2 className="text-xl font-black text-foreground">
                          {section.title || sectionDef.label}
                        </h2>
                      </div>
                    </div>

                    {section.content && (
                      <div className="prose prose-sm max-w-none text-foreground pl-[52px]">
                        {section.content.split("\n").map((p, i) => (
                          <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
                        ))}
                      </div>
                    )}

                    {section.media_urls && section.media_urls.length > 0 && (
                      <div className={`mt-6 pl-[52px] grid gap-4 ${
                        section.media_urls.length === 1
                          ? "grid-cols-1"
                          : "grid-cols-1 sm:grid-cols-2"
                      }`}>
                        {section.media_urls.map((url, i) => (
                          <div key={i} className="rounded-xl overflow-hidden bg-muted aspect-video">
                            <img src={url} alt={`${sectionDef.label} ${i + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ═══ Gallery ═══ */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-black text-foreground mb-6">Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.gallery.map((img) => (
                  <div key={img.id} className="rounded-xl overflow-hidden bg-muted aspect-[4/3]">
                    <img src={img.image_url} alt={img.caption || project.title} className="w-full h-full object-cover" />
                    {img.caption && (
                      <p className="p-2 text-xs text-muted-foreground">{img.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-20 text-center bg-card border border-border/60 rounded-2xl p-8 sm:p-12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-black text-foreground mb-3">
              Want Something Similar?
            </h2>
            <p className="text-muted-foreground mb-6">
              We bring the same level of craft and attention to every project.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full font-bold px-8">
                <Link to="/contact">
                  Start a Project <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full font-bold px-8">
                <Link to="/portfolio">
                  View More Work
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PortfolioDetail;
