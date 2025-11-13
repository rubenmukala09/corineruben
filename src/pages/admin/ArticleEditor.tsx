import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminTopBar } from "@/components/AdminTopBar";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ArticlePublishingSidebar } from "@/components/admin/ArticlePublishingSidebar";
import {
  Save,
  Eye,
  Check,
  Lock,
  Unlock,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ArticleData {
  title: string;
  slug: string;
  content: string;
  category: string;
  status: "draft" | "scheduled" | "published";
  featuredImage?: string;
  excerpt?: string;
  author: string;
  tags: string[];
  scheduledDate?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

export default function ArticleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const [article, setArticle] = useState<ArticleData>({
    title: "",
    slug: "",
    content: "",
    category: "AI Scams",
    status: "draft",
    author: "Current User",
    tags: [],
  });

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugLocked, setSlugLocked] = useState(false);
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);

  // Generate slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugLocked && title) {
      setSlug(generateSlug(title));
    }
  }, [title, slugLocked]);

  // Calculate word count, character count, and reading time
  useEffect(() => {
    const text = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
    const words = text.trim().split(/\s+/).filter(Boolean);
    const chars = text.length;
    const reading = Math.ceil(words.length / 200); // Average reading speed: 200 words/min

    setWordCount(words.length);
    setCharCount(chars);
    setReadingTime(reading);
  }, [content]);

  // Auto-save every 30 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (title || content) {
        handleSave(true);
      }
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [title, content]);

  // Save to localStorage for offline support
  useEffect(() => {
    const draft = {
      title,
      slug,
      content,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("article-draft", JSON.stringify(draft));
  }, [title, slug, content]);

  // Restore from localStorage on load
  useEffect(() => {
    const savedDraft = localStorage.getItem("article-draft");
    if (savedDraft && !id) {
      try {
        const draft = JSON.parse(savedDraft);
        setTitle(draft.title || "");
        setSlug(draft.slug || "");
        setContent(draft.content || "");
        toast({
          title: "Draft Restored",
          description: "Your previous work has been restored",
        });
      } catch (error) {
        console.error("Failed to restore draft:", error);
      }
    }
  }, [id]);

  const handleSave = async (silent = false) => {
    try {
      setSaving(true);

      // Simulate API call - replace with actual save logic
      await new Promise((resolve) => setTimeout(resolve, 500));

      setLastSaved(new Date());

      if (!silent) {
        toast({
          title: "Draft Saved",
          description: "Your article has been saved successfully",
        });
      }
    } catch (error) {
      console.error("Save error:", error);
      toast({
        title: "Save Failed",
        description: "Failed to save article. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!title || !content) {
      toast({
        title: "Cannot Publish",
        description: "Title and content are required",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);
      // Implement publish logic here
      await handleSave(true);

      toast({
        title: "Article Published!",
        description: "Your article is now live",
      });

      navigate("/admin/content/articles");
    } catch (error) {
      console.error("Publish error:", error);
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    // Open preview in new tab
    window.open(`/articles/preview?title=${encodeURIComponent(title)}`, "_blank");
  };

  const getTimeSinceLastSave = () => {
    if (!lastSaved) return null;
    const seconds = Math.floor((Date.now() - lastSaved.getTime()) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} />
      <AdminTopBar
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <main
        className={`flex-1 transition-all duration-300 pt-16 ${
          sidebarOpen ? "md:ml-[260px]" : "md:ml-[70px]"
        }`}
      >
        {/* Top Action Bar */}
        <div className="sticky top-16 z-10 bg-background border-b px-8 py-4">
          <div className="flex items-center justify-between">
            <BreadcrumbNav />

            <div className="flex items-center gap-4">
              {/* Auto-save Indicator */}
              <AnimatePresence mode="wait">
                {saving ? (
                  <motion.div
                    key="saving"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Clock className="h-4 w-4 animate-spin" />
                    Saving...
                  </motion.div>
                ) : lastSaved ? (
                  <motion.div
                    key="saved"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="h-4 w-4 text-green-500" />
                    Last saved: {getTimeSinceLastSave()}
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <Button variant="outline" onClick={() => handleSave(false)} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>

              <Button variant="outline" onClick={handlePreview}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>

              <Button onClick={handlePublish} disabled={saving}>
                Publish
              </Button>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="flex gap-8 p-8">
          {/* Left Column - Editor */}
          <div className="flex-1 max-w-[70%] space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter article title..."
                className="text-4xl font-bold border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                maxLength={100}
                autoFocus
              />
              {title.length >= 80 && (
                <p className="text-sm text-muted-foreground text-right">
                  {title.length}/100 characters
                </p>
              )}
            </div>

            {/* Slug Input */}
            <div className="space-y-2">
              <Label htmlFor="slug" className="text-sm text-muted-foreground">
                URL Slug
              </Label>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2 px-3 py-2 border rounded-lg bg-muted/50">
                  <span className="text-sm text-muted-foreground">
                    invisionnetwork.org/blog/
                  </span>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => {
                      setSlug(generateSlug(e.target.value));
                      setSlugLocked(true);
                    }}
                    className="border-0 bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
                    placeholder="article-slug"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSlugLocked(!slugLocked)}
                  title={slugLocked ? "Unlock to auto-generate" : "Lock to prevent auto-generation"}
                >
                  {slugLocked ? (
                    <Lock className="h-4 w-4" />
                  ) : (
                    <Unlock className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {slug && (
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-3 w-3 text-green-500" />
                  <span className="text-muted-foreground">Available</span>
                </div>
              )}
            </div>

            {/* Rich Text Editor */}
            <div className="space-y-2">
              <RichTextEditor
                content={content}
                onChange={setContent}
                placeholder="Start writing your article..."
              />

              {/* Editor Stats */}
              <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
                <div className="flex items-center gap-4">
                  <span>{wordCount} words</span>
                  <span>{charCount} characters</span>
                  <span>{readingTime} min read</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Publishing Sidebar */}
          <div className="w-[30%]">
            <ArticlePublishingSidebar
              article={article}
              onChange={setArticle}
              onSave={handleSave}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
