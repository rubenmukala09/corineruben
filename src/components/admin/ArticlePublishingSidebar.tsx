import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar as CalendarIcon, Upload, X, ChevronDown, ChevronUp, Lock, Globe, Eye, Search, Edit } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
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

interface ArticlePublishingSidebarProps {
  article: ArticleData;
  onChange: (article: ArticleData) => void;
  onSave: () => void;
}

const AVAILABLE_CATEGORIES = [
  { id: "ai-scams", label: "AI Scams", count: 24 },
  { id: "business-ai", label: "Business AI", count: 18 },
  { id: "family-safety", label: "Family Safety", count: 32 },
  { id: "news", label: "News", count: 15 },
];

const AVAILABLE_AUTHORS = [
  { id: "1", name: "John Smith", avatar: "/placeholder.svg", role: "Editor" },
  { id: "2", name: "Sarah Johnson", avatar: "/placeholder.svg", role: "Author" },
  { id: "3", name: "Mike Davis", avatar: "/placeholder.svg", role: "Admin" },
];

export function ArticlePublishingSidebar({
  article,
  onChange,
  onSave,
}: ArticlePublishingSidebarProps) {
  const [sectionsOpen, setSectionsOpen] = useState({
    status: true,
    author: true,
    image: true,
    categories: true,
    tags: true,
    excerpt: true,
    seo: false,
  });

  const [tagInput, setTagInput] = useState("");
  const [existingTags] = useState([
    "AI", "Machine Learning", "Security", "Privacy", "Technology",
    "Business", "Family", "Safety", "Scams", "Protection"
  ]);

  const toggleSection = (section: keyof typeof sectionsOpen) => {
    setSectionsOpen(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleChange = (field: keyof ArticleData, value: any) => {
    onChange({ ...article, [field]: value });
  };

  const handleAddTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !article.tags.includes(trimmedTag)) {
      handleChange("tags", [...article.tags, trimmedTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    handleChange(
      "tags",
      article.tags.filter((t) => t !== tag)
    );
  };

  const handleCategoryToggle = (categoryId: string) => {
    const currentCategories = article.categories || [];
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter(c => c !== categoryId)
      : [...currentCategories, categoryId];
    handleChange("categories", newCategories);
  };

  // Calculate keyword density
  const keywordDensity = useMemo(() => {
    if (!article.focusKeyword || !article.content) return 0;
    
    const keyword = article.focusKeyword.toLowerCase();
    const content = article.content.toLowerCase();
    const words = content.split(/\s+/).length;
    
    if (words === 0) return 0;
    
    const matches = (content.match(new RegExp(keyword, "g")) || []).length;
    return (matches / words) * 100;
  }, [article.focusKeyword, article.content]);

  const getKeywordDensityColor = (density: number) => {
    if (density >= 1 && density <= 2) return "text-green-600";
    if ((density >= 0.5 && density < 1) || (density > 2 && density <= 3)) return "text-yellow-600";
    return "text-red-600";
  };

  const getKeywordDensityStatus = (density: number) => {
    if (density >= 1 && density <= 2) return "Good";
    if ((density >= 0.5 && density < 1) || (density > 2 && density <= 3)) return "Okay";
    return "Improve";
  };

  const getSeoTitleColor = (length: number) => {
    if (length >= 50 && length <= 60) return "text-green-600";
    if ((length >= 45 && length < 50) || (length > 60 && length <= 70)) return "text-yellow-600";
    return "text-red-600";
  };

  const getSeoTitleStatus = (length: number) => {
    if (length >= 50 && length <= 60) return "Good";
    if ((length >= 45 && length < 50) || (length > 60 && length <= 70)) return "Okay";
    if (length < 45) return "Too short";
    return "Too long";
  };

  return (
    <div className="sticky top-4 space-y-4 bg-[#F9FAFB] border-l border-[#E5E7EB] p-6 h-[calc(100vh-2rem)] overflow-y-auto">
      {/* Status & Visibility */}
      <Card>
        <CardHeader 
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => toggleSection("status")}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Status & Visibility</CardTitle>
            {sectionsOpen.status ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </CardHeader>
        {sectionsOpen.status && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={article.status}
                onValueChange={(value: any) => handleChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                      Draft
                    </div>
                  </SelectItem>
                  <SelectItem value="scheduled">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                      Scheduled
                    </div>
                  </SelectItem>
                  <SelectItem value="published">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400"></span>
                      Published
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {article.status === "scheduled" && (
              <div className="space-y-2">
                <Label>Schedule For</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !article.scheduledDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {article.scheduledDate
                        ? format(new Date(article.scheduledDate), "PPP 'at' h:mm a")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        article.scheduledDate ? new Date(article.scheduledDate) : undefined
                      }
                      onSelect={(date) =>
                        handleChange("scheduledDate", date?.toISOString())
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-xs text-muted-foreground">Timezone: EST (auto-detect)</p>
              </div>
            )}

            {article.status === "published" && article.scheduledDate && (
              <div className="text-sm text-muted-foreground">
                Published on {format(new Date(article.scheduledDate), "MMM d, yyyy 'at' h:mm a")}
              </div>
            )}

            <div className="space-y-3">
              <Label>Visibility</Label>
              <RadioGroup 
                value={article.visibility || "public"} 
                onValueChange={(value: any) => handleChange("visibility", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public" className="flex items-center gap-2 font-normal cursor-pointer">
                    <Globe className="h-4 w-4" />
                    Public (everyone can see)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="password" id="password" />
                  <Label htmlFor="password" className="flex items-center gap-2 font-normal cursor-pointer">
                    <Lock className="h-4 w-4" />
                    Password Protected
                  </Label>
                </div>
                {article.visibility === "password" && (
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={article.password || ""}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className="ml-6 mt-2"
                  />
                )}
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private" className="flex items-center gap-2 font-normal cursor-pointer">
                    <Eye className="h-4 w-4" />
                    Private (only admins)
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Author */}
      <Card>
        <CardHeader 
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => toggleSection("author")}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Author</CardTitle>
            {sectionsOpen.author ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </CardHeader>
        {sectionsOpen.author && (
          <CardContent>
            <Select
              value={article.author}
              onValueChange={(value) => handleChange("author", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_AUTHORS.map((author) => (
                  <SelectItem key={author.id} value={author.name}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={author.avatar} />
                        <AvatarFallback>{author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm">{author.name}</span>
                        <span className="text-xs text-muted-foreground">{author.role}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        )}
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader 
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => toggleSection("categories")}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Categories</CardTitle>
            {sectionsOpen.categories ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </CardHeader>
        {sectionsOpen.categories && (
          <CardContent className="space-y-3">
            {AVAILABLE_CATEGORIES.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={(article.categories || []).includes(category.id)}
                  onCheckedChange={() => handleCategoryToggle(category.id)}
                />
                <Label
                  htmlFor={category.id}
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  {category.label} ({category.count} articles)
                </Label>
              </div>
            ))}
            <Button variant="link" className="p-0 h-auto text-xs">
              + Add New Category
            </Button>
          </CardContent>
        )}
      </Card>

      {/* Featured Image */}
      <Card>
        <CardHeader 
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => toggleSection("image")}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Featured Image</CardTitle>
            {sectionsOpen.image ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </CardHeader>
        {sectionsOpen.image && (
          <CardContent className="space-y-3">
            {article.featuredImage ? (
              <div className="space-y-2">
                <div className="relative">
                  <img
                    src={article.featuredImage}
                    alt="Featured"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => handleChange("featuredImage", undefined)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Change
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleChange("featuredImage", undefined)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium">Set Featured Image</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Click to browse or drag & drop
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Recommended: 1200×630px (JPG, PNG, WebP)
                </p>
              </div>
            )}
          </CardContent>
        )}
      </Card>

      {/* Excerpt */}
      <Card>
        <CardHeader 
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => toggleSection("excerpt")}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Excerpt</CardTitle>
            {sectionsOpen.excerpt ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </CardHeader>
        {sectionsOpen.excerpt && (
          <CardContent>
            <Textarea
              value={article.excerpt || ""}
              onChange={(e) => handleChange("excerpt", e.target.value)}
              placeholder="Brief summary..."
              className="resize-none"
              rows={3}
              maxLength={160}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-muted-foreground">
                Used for article cards, SEO, social sharing
              </p>
              <p className="text-xs text-muted-foreground">
                {(article.excerpt || "").length}/160
              </p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader 
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => toggleSection("tags")}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Tags</CardTitle>
            {sectionsOpen.tags ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </CardHeader>
        {sectionsOpen.tags && (
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2 min-h-[32px]">
              {article.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="gap-1 cursor-pointer hover:bg-destructive/10"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-destructive transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="relative">
              <Input
                placeholder="Add tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag(tagInput);
                  }
                }}
              />
              {tagInput && (
                <div className="absolute z-10 w-full mt-1 bg-popover border rounded-md shadow-md">
                  {existingTags
                    .filter(tag => 
                      tag.toLowerCase().includes(tagInput.toLowerCase()) && 
                      !article.tags.includes(tag)
                    )
                    .slice(0, 5)
                    .map(tag => (
                      <button
                        key={tag}
                        onClick={() => handleAddTag(tag)}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Press Enter to add tag, or select from suggestions
            </p>
          </CardContent>
        )}
      </Card>

      {/* SEO */}
      <Card>
        <CardHeader 
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => toggleSection("seo")}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search Engine Optimization
            </CardTitle>
            {sectionsOpen.seo ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </CardHeader>
        {sectionsOpen.seo && (
          <CardContent className="space-y-5">
            {/* Focus Keyword */}
            <div className="space-y-2">
              <Label htmlFor="focus-keyword">Focus Keyword</Label>
              <Input
                id="focus-keyword"
                value={article.focusKeyword || ""}
                onChange={(e) => handleChange("focusKeyword", e.target.value)}
                placeholder="AI scam protection"
              />
              <p className="text-xs text-muted-foreground">Main keyword for this article</p>
              
              {article.focusKeyword && article.content && (
                <div className={cn("text-xs font-medium", getKeywordDensityColor(keywordDensity))}>
                  Keyword density: {keywordDensity.toFixed(2)}% - {getKeywordDensityStatus(keywordDensity)}
                </div>
              )}
            </div>

            {/* SEO Title */}
            <div className="space-y-2">
              <Label htmlFor="seo-title">SEO Title</Label>
              <Input
                id="seo-title"
                value={article.seoTitle || article.title || ""}
                onChange={(e) => handleChange("seoTitle", e.target.value)}
                placeholder="Custom title for search engines"
                maxLength={70}
              />
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">
                  {(article.seoTitle || article.title || "").length < 45 && "Too short"}
                  {(article.seoTitle || article.title || "").length >= 45 && (article.seoTitle || article.title || "").length <= 50 && "Good length"}
                  {(article.seoTitle || article.title || "").length > 50 && (article.seoTitle || article.title || "").length <= 60 && "Optimal"}
                  {(article.seoTitle || article.title || "").length > 60 && "Consider shortening"}
                </p>
                <p className={cn("text-xs font-medium", getSeoTitleColor((article.seoTitle || article.title || "").length))}>
                  {(article.seoTitle || article.title || "").length}/60
                </p>
              </div>
            </div>

            {/* Meta Description */}
            <div className="space-y-2">
              <Label htmlFor="seo-description">Meta Description</Label>
              <Textarea
                id="seo-description"
                value={article.seoDescription || ""}
                onChange={(e) => handleChange("seoDescription", e.target.value)}
                placeholder="Describe your article..."
                className="resize-none"
                rows={3}
                maxLength={160}
              />
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">
                  Used in search results
                </p>
                <p className="text-xs font-medium">
                  {(article.seoDescription || "").length}/160
                </p>
              </div>
            </div>

            {/* URL Slug */}
            <div className="space-y-2">
              <Label>URL Slug</Label>
              <div className="flex gap-2">
                <Input
                  value={article.slug}
                  readOnly
                  className="bg-muted"
                />
                <Button variant="outline" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground break-all">
                invisionnetwork.org/blog/{article.slug || "your-article-slug"}
              </p>
            </div>

            {/* Google Preview */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-muted-foreground">GOOGLE PREVIEW</Label>
              <div className="border rounded-lg p-4 bg-white space-y-1">
                <div className="text-xs text-green-700">
                  invisionnetwork.org › blog › {article.slug || "article"}
                </div>
                <div className="text-lg text-blue-600 hover:underline cursor-pointer line-clamp-1">
                  {article.seoTitle || article.title || "Your Article Title"}
                </div>
                <div className="text-sm text-gray-600 line-clamp-2">
                  {article.seoDescription || article.excerpt || "Your article description will appear here. Write a compelling meta description to improve click-through rates from search results."}
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
