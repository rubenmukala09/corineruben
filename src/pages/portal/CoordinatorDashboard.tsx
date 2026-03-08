import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  FileText,
  GraduationCap,
  Star,
  BookOpen,
  LogOut,
  CheckCircle,
  XCircle,
  Eye,
  PenLine,
  MessageSquare,
} from "lucide-react";

interface Article {
  id: string;
  title: string;
  status: string;
  category: string;
  created_at: string | null;
  views: number | null;
}

interface Testimonial {
  id: string;
  name: string;
  content: string;
  status: string;
  created_at: string;
}

function CoordinatorDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [stats, setStats] = useState({
    publishedArticles: 0,
    activeCourses: 0,
    pendingTestimonials: 0,
    kbArticles: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [
      { data: articlesData },
      { data: testimonialsData },
      { count: publishedCount },
      { count: coursesCount },
      { count: pendingTestCount },
      { count: kbCount },
    ] = await Promise.all([
      supabase.from("articles").select("id, title, status, category, created_at, views").order("created_at", { ascending: false }).limit(8),
      supabase.from("testimonials").select("id, name, content, status, created_at").eq("status", "pending").order("created_at", { ascending: false }).limit(6),
      supabase.from("articles").select("*", { count: "exact", head: true }).eq("status", "published"),
      supabase.from("courses").select("*", { count: "exact", head: true }).eq("active", true),
      supabase.from("testimonials").select("*", { count: "exact", head: true }).eq("status", "pending"),
      supabase.from("knowledge_base_articles" as any).select("*", { count: "exact", head: true }),
    ]);

    if (articlesData) setArticles(articlesData);
    if (testimonialsData) setTestimonials(testimonialsData);
    setStats({
      publishedArticles: publishedCount || 0,
      activeCourses: coursesCount || 0,
      pendingTestimonials: pendingTestCount || 0,
      kbArticles: kbCount || 0,
    });
  };

  const handleTestimonialAction = async (id: string, action: "approved" | "rejected") => {
    const { error } = await supabase
      .from("testimonials")
      .update({ status: action })
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: action === "approved" ? "✅ Testimonial Approved" : "❌ Testimonial Rejected" });
      loadData();
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const articleStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "draft": return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default: return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-gray-100">
      <header className="border-b border-gray-800/60 bg-[#111827]/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/5">
                <Link to="/portal"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-white">Training Coordinator</h1>
                <p className="text-sm text-gray-500">Content • Courses • Testimonials</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-gray-400 hover:text-white hover:bg-white/5">
              <LogOut className="w-4 h-4 mr-2" />Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Published Articles", value: stats.publishedArticles, icon: FileText, color: "text-blue-400", bg: "bg-blue-500/10" },
            { label: "Active Courses", value: stats.activeCourses, icon: GraduationCap, color: "text-teal-400", bg: "bg-teal-500/10" },
            { label: "Pending Reviews", value: stats.pendingTestimonials, icon: Star, color: "text-amber-400", bg: "bg-amber-500/10" },
            { label: "KB Articles", value: stats.kbArticles, icon: BookOpen, color: "text-purple-400", bg: "bg-purple-500/10" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.label} className="bg-[#1F2937] border-gray-800/50 p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 ${s.bg} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <span className="text-2xl font-bold text-white">{s.value}</span>
                </div>
                <p className="text-xs text-gray-500">{s.label}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Articles */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-[#1F2937] border-gray-800/50 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  Recent Articles
                </h2>
                <div className="flex gap-2">
                  <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white h-8">
                    <Link to="/admin/content/articles/new"><PenLine className="w-3 h-3 mr-1" />New</Link>
                  </Button>
                  <Button asChild variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Link to="/admin/content/articles">View All</Link>
                  </Button>
                </div>
              </div>
              <div className="space-y-3">
                {articles.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No articles yet</p>
                ) : (
                  articles.map((a) => (
                    <div key={a.id} className="flex items-center justify-between p-3 bg-[#111827] rounded-lg border border-gray-800/40">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-white text-sm truncate">{a.title}</p>
                          <Badge className={`text-[10px] ${articleStatusColor(a.status)}`}>{a.status}</Badge>
                        </div>
                        <p className="text-xs text-gray-500">{a.category} • {a.views || 0} views</p>
                      </div>
                      <Button asChild size="sm" variant="ghost" className="h-7 w-7 p-0 text-gray-400 hover:text-white">
                        <Link to={`/admin/content/articles/${a.id}`}><PenLine className="w-3.5 h-3.5" /></Link>
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Testimonial Queue */}
            <Card className="bg-[#1F2937] border-gray-800/50 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400" />
                  Testimonial Approval Queue
                </h2>
                <Button asChild variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Link to="/admin/content/testimonials">View All</Link>
                </Button>
              </div>
              <div className="space-y-3">
                {testimonials.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No pending testimonials</p>
                ) : (
                  testimonials.map((t) => (
                    <div key={t.id} className="p-3 bg-[#111827] rounded-lg border border-gray-800/40">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-white text-sm">{t.name}</p>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-emerald-400 hover:bg-emerald-500/10"
                            onClick={() => handleTestimonialAction(t.id, "approved")}>
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-red-400 hover:bg-red-500/10"
                            onClick={() => handleTestimonialAction(t.id, "rejected")}>
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2">{t.content}</p>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-[#1F2937] border-gray-800/50 p-5">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-teal-400" />
                Quick Access
              </h2>
              <div className="space-y-2">
                {[
                  { label: "Articles", path: "/admin/content/articles", icon: FileText },
                  { label: "Testimonials", path: "/admin/content/testimonials", icon: Star },
                  { label: "Knowledge Base", path: "/admin/content/knowledge-base", icon: BookOpen },
                  { label: "Internal Messages", path: "/portal/messages", icon: MessageSquare },
                  { label: "Individual Clients", path: "/admin/clients/individuals", icon: Eye },
                ].map((link) => {
                  const Icon = link.icon;
                  return (
                    <Button key={link.path} asChild variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/5">
                      <Link to={link.path}><Icon className="w-4 h-4 mr-2" />{link.label}</Link>
                    </Button>
                  );
                })}
              </div>
            </Card>

            <Card className="bg-[#1F2937] border-gray-800/50 p-5">
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-teal-400" />
                Content Tips
              </h2>
              <div className="space-y-3 text-xs text-gray-400">
                <div className="p-3 bg-[#111827] rounded-lg border border-gray-800/40">
                  <p className="font-medium text-gray-300 mb-1">📝 Article Best Practices</p>
                  <p>Use clear headlines, add featured images, and include relevant tags for SEO.</p>
                </div>
                <div className="p-3 bg-[#111827] rounded-lg border border-gray-800/40">
                  <p className="font-medium text-gray-300 mb-1">⭐ Review Guidelines</p>
                  <p>Verify testimonials for authenticity before approving. Flag suspicious content.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CoordinatorDashboard;
