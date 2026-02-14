import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  usePortfolioProjects,
  usePortfolioCategories,
  usePortfolioTags,
} from "@/hooks/usePortfolioCMS";
import {
  ArrowRight,
  Star,
  Filter,
  Palette,
  X,
  Sparkles,
  Eye,
} from "lucide-react";
import { TREND_AGES } from "@/config/portfolioDesignSystem";

const Portfolio = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "";
  const activeTag = searchParams.get("tag") || "";
  const [showFilters, setShowFilters] = useState(false);

  const { data: primaryCategories } = usePortfolioCategories("primary");
  const { data: allTags } = usePortfolioTags();
  const { data: projects, isLoading } = usePortfolioProjects({
    categorySlug: activeCategory || undefined,
    tagSlug: activeTag || undefined,
  });

  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key === "category") params.delete("tag");
    setSearchParams(params);
  };

  const clearFilters = () => setSearchParams({});

  // Group tags by type for secondary filters
  const tagGroups = useMemo(() => {
    if (!allTags) return {};
    const groups: Record<string, typeof allTags> = {};
    allTags.forEach((t) => {
      if (!groups[t.tag_type]) groups[t.tag_type] = [];
      groups[t.tag_type].push(t);
    });
    return groups;
  }, [allTags]);

  const hasFilters = !!activeCategory || !!activeTag;

  return (
    <div className="min-h-screen">
      <SEO
        title="Design Portfolio | InVision Network"
        description="Explore our design portfolio: brand systems, digital design, typography, illustration, motion design, and UI assets."
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.15em] mb-6">
            <Palette className="w-3.5 h-3.5" />
            Our Work
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-4">
            Design{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Portfolio
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From brand identity to motion graphics, explore our work across
            every design discipline.
          </p>

          {/* Quick stats */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 mt-8">
            <div className="text-center">
              <p className="text-2xl font-black text-primary">{projects?.length || 0}</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Projects</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-2xl font-black text-primary">{primaryCategories?.length || 0}</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Disciplines</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-2xl font-black text-primary">{projects?.filter(p => p.featured).length || 0}</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Featured</p>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Category Navigation */}
      <section className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 lg:px-12 py-3">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <Button
              variant={!activeCategory ? "default" : "outline"}
              size="sm"
              onClick={() => clearFilters()}
              className="flex-shrink-0 rounded-full"
            >
              All
            </Button>
            {primaryCategories?.map((cat) => (
              <Button
                key={cat.slug}
                variant={activeCategory === cat.slug ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("category", activeCategory === cat.slug ? "" : cat.slug)}
                className="flex-shrink-0 rounded-full"
              >
                {cat.name}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex-shrink-0 ml-auto"
            >
              <Filter className="w-4 h-4 mr-1" />
              Filters
            </Button>
          </div>

          {/* Secondary Tag Filters */}
          {showFilters && (
            <div className="pt-3 pb-1 space-y-2">
              {Object.entries(tagGroups).map(([type, tags]) => (
                <div key={type} className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold w-16 flex-shrink-0 capitalize">
                    {type}
                  </span>
                  {tags.map((tag) => (
                    <button
                      key={tag.slug}
                      onClick={() => setFilter("tag", activeTag === tag.slug ? "" : tag.slug)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        activeTag === tag.slug
                          ? "bg-accent text-white"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}

          {hasFilters && (
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-muted-foreground">Active:</span>
              {activeCategory && (
                <Badge variant="secondary" className="text-xs">
                  {primaryCategories?.find((c) => c.slug === activeCategory)?.name}
                  <button onClick={() => setFilter("category", "")} className="ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {activeTag && (
                <Badge variant="secondary" className="text-xs">
                  {allTags?.find((t) => t.slug === activeTag)?.name}
                  <button onClick={() => setFilter("tag", "")} className="ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              <button onClick={clearFilters} className="text-xs text-destructive hover:underline ml-2">
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <main className="py-12">
        <div className="container mx-auto px-6 lg:px-12">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl bg-muted animate-pulse h-72" />
              ))}
            </div>
          ) : !projects?.length ? (
            <div className="text-center py-20">
              <Palette className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-lg font-medium text-muted-foreground">
                No projects found
              </p>
              {hasFilters && (
                <Button variant="outline" className="mt-4" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  to={`/portfolio/${project.slug}`}
                  className="group block rounded-2xl border border-border/60 bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] bg-muted overflow-hidden relative">
                    {project.thumbnail_url ? (
                      <img
                        src={project.thumbnail_url}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                        <Palette className="w-10 h-10 text-muted-foreground/30" />
                      </div>
                    )}
                    {project.featured && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-500/90 text-white text-[10px] font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" /> Featured
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="px-4 py-2 bg-background/90 rounded-full text-sm font-bold text-foreground flex items-center gap-2">
                        <Eye className="w-4 h-4" /> View Case Study
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      {project.category && (
                        <Badge variant="secondary" className="text-[10px]">
                          {project.category.name}
                        </Badge>
                      )}
                      {project.project_date && (
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(project.project_date).getFullYear()}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    {project.short_description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.short_description}
                      </p>
                    )}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag.id}
                            className="px-2 py-0.5 rounded-full bg-primary/8 text-primary text-[10px] font-medium"
                          >
                            {tag.name}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="text-[10px] text-muted-foreground">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* CTA */}
      <section className="py-16 bg-muted/30 border-t border-border/50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-3">
            Ready to Start Your Project?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            We bring the same level of craft and attention to every client engagement.
          </p>
          <Button asChild size="lg" className="rounded-full font-bold px-8">
            <Link to="/contact">
              Get in Touch <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
