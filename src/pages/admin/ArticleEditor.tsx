import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminTopBar } from "@/components/AdminTopBar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ArticlePublishingSidebar } from "@/components/admin/ArticlePublishingSidebar";
import { PublishConfirmationModal } from "@/components/admin/PublishConfirmationModal";
import { PublishSuccessModal } from "@/components/admin/PublishSuccessModal";
import {
  Save,
  Eye,
  Check,
  Lock,
  Unlock,
  Clock,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ArticleData {
  title: string;
  slug: string;
  content: string;
  categories: string[];
  status: "draft" | "scheduled" | "published";
  visibility: "public" | "password" | "private";
  password?: string;
  featuredImage?: string;
  excerpt?: string;
  author: string;
  tags: string[];
  scheduledDate?: string;
  focusKeyword?: string;
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
    categories: [],
    status: "draft",
    visibility: "public",
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
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [articleId, setArticleId] = useState<string | null>(id || null);

  // Validation for required fields
  const requiredFieldsComplete = () => {
    return !!(
      article.title &&
      article.content &&
      article.categories.length > 0 &&
      article.author
    );
  };

  const getPublishingChecklist = () => {
    const checks = [
      { id: "title", label: "Title entered", completed: !!article.title },
      { id: "content", label: "Content added (min 300 words)", completed: wordCount >= 300 },
      { id: "image", label: "Featured image set", completed: !!article.featuredImage },
      { id: "category", label: "Category selected", completed: article.categories.length > 0 },
      { id: "excerpt", label: "Excerpt added", completed: !!article.excerpt },
      { id: "seo", label: "SEO title and description", completed: !!(article.seoTitle && article.seoDescription) },
    ];
    return checks;
  };

  const getSEOScore = () => {
    const checks = [
      { completed: !!article.title, weight: 15 },
      { completed: wordCount >= 300, weight: 20 },
      { completed: !!article.focusKeyword, weight: 15 },
      { completed: !!article.seoTitle && article.seoTitle.length >= 50 && article.seoTitle.length <= 60, weight: 10 },
      { completed: !!article.seoDescription && article.seoDescription.length >= 120 && article.seoDescription.length <= 160, weight: 15 },
      { completed: !!article.featuredImage, weight: 15 },
      { completed: article.focusKeyword && content ? (content.toLowerCase().split(article.focusKeyword.toLowerCase()).length - 1) / content.split(/\s+/).length * 100 >= 0.5 && (content.toLowerCase().split(article.focusKeyword.toLowerCase()).length - 1) / content.split(/\s+/).length * 100 <= 2.5 : false, weight: 10 },
    ];
    const totalWeight = checks.reduce((sum, check) => sum + check.weight, 0);
    const earnedWeight = checks.filter(check => check.completed).reduce((sum, check) => sum + check.weight, 0);
    return Math.round((earnedWeight / totalWeight) * 100);
  };

  const getMissingFields = () => {
    const missing: string[] = [];
    if (!article.title) missing.push("Title");
    if (!article.content) missing.push("Content");
    if (article.categories.length === 0) missing.push("Category");
    if (!article.author) missing.push("Author");
    return missing;
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + S: Save draft
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        handleSave(false);
      }
      // Cmd/Ctrl + P: Preview
      if ((e.metaKey || e.ctrlKey) && e.key === "p") {
        e.preventDefault();
        handlePreview();
      }
      // Cmd/Ctrl + Shift + P: Publish
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "P") {
        e.preventDefault();
        if (requiredFieldsComplete()) {
          handlePublish();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [article, wordCount]);

  // Exit warning for unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Track changes
  useEffect(() => {
    if (title || content) {
      setHasUnsavedChanges(true);
    }
  }, [title, content, article]);
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
      setHasUnsavedChanges(false);

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
    if (!requiredFieldsComplete()) {
      toast({
        title: "Cannot Publish",
        description: `Please complete these required fields: ${getMissingFields().join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    setShowPublishModal(true);
  };

  const confirmPublish = async (options?: { sendNewsletter?: boolean; shareOnSocial?: boolean }) => {
    try {
      setPublishing(true);
      setShowPublishModal(false);

      // Simulate upload images and save
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update article status
      const updatedArticle = {
        ...article,
        status: "published" as const,
        scheduledDate: new Date().toISOString(),
      };
      setArticle(updatedArticle);

      // Generate article ID if new
      if (!articleId) {
        const newId = Math.random().toString(36).substring(7);
        setArticleId(newId);
        // Update URL
        navigate(`/admin/content/articles/${newId}`, { replace: true });
      }

      setHasUnsavedChanges(false);
      setPublishing(false);
      setShowSuccessModal(true);

      // Log the newsletter and social options (in real app, would trigger actions)
      if (options?.sendNewsletter) {
        console.log("Sending to newsletter subscribers...");
      }
      if (options?.shareOnSocial) {
        console.log("Sharing on social media...");
      }

      toast({
        title: articleId ? "Article Updated!" : "Article Published!",
        description:
          article.status === "scheduled"
            ? "Your article has been scheduled"
            : "Your article is now live",
      });
    } catch (error) {
      console.error("Publish error:", error);
      toast({
        title: "Publish Failed",
        description: "Failed to publish article. Please try again.",
        variant: "destructive",
      });
      setPublishing(false);
    }
  };

  const handlePreview = async () => {
    // Auto-save before preview
    await handleSave(true);

    // Store article data in localStorage for preview
    const previewData = {
      ...article,
      title: article.title,
      content: article.content,
      readingTime: Math.ceil(wordCount / 200), // Average reading speed
    };

    localStorage.setItem("article-preview", JSON.stringify(previewData));

    // Open preview in new tab
    window.open("/admin/articles/preview", "_blank");
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

              <Button variant="outline" onClick={handlePreview} disabled={!article.title || !article.content}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Button
                        onClick={handlePublish}
                        disabled={!requiredFieldsComplete() || saving || publishing}
                        className="relative min-w-[120px]"
                      >
                        {publishing ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Publishing...
                          </>
                        ) : articleId && article.status === "published" ? (
                          "Update"
                        ) : (
                          "Publish"
                        )}
                      </Button>
                    </div>
                  </TooltipTrigger>
                  {!requiredFieldsComplete() && (
                    <TooltipContent side="bottom" className="max-w-xs">
                      <div className="space-y-1">
                        <p className="font-semibold flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          Complete required fields:
                        </p>
                        <ul className="text-sm list-disc list-inside">
                          {getMissingFields().map((field) => (
                            <li key={field}>{field}</li>
                          ))}
                        </ul>
                      </div>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Keyboard Shortcuts Hint */}
          {articleId && article.status === "published" && (
            <div className="text-xs text-muted-foreground">
              Last updated: {getTimeSinceLastSave() || "Just now"}
            </div>
          )}
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
              onSave={() => handleSave(false)}
              publishingChecklist={getPublishingChecklist()}
            />
          </div>
        </div>
      </main>

      {/* Publish Confirmation Modal */}
      <PublishConfirmationModal
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        onConfirm={confirmPublish}
        article={article}
        seoScore={getSEOScore()}
      />

      {/* Success Modal */}
      <PublishSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        articleUrl={`https://invisionnetwork.org/articles/${articleId}`}
        articleTitle={article.title}
        onViewArticle={() => {
          window.open(`/articles/${articleId}`, "_blank");
        }}
        onEditArticle={() => {
          setShowSuccessModal(false);
        }}
        onCreateAnother={() => {
          navigate("/admin/content/articles/new");
          setShowSuccessModal(false);
        }}
      />
    </div>
  );
}
