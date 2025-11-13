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
import { Calendar as CalendarIcon, Upload, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
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

interface ArticlePublishingSidebarProps {
  article: ArticleData;
  onChange: (article: ArticleData) => void;
  onSave: () => void;
}

export function ArticlePublishingSidebar({
  article,
  onChange,
  onSave,
}: ArticlePublishingSidebarProps) {
  const handleChange = (field: keyof ArticleData, value: any) => {
    onChange({ ...article, [field]: value });
  };

  const handleAddTag = (tag: string) => {
    if (tag && !article.tags.includes(tag)) {
      handleChange("tags", [...article.tags, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    handleChange(
      "tags",
      article.tags.filter((t) => t !== tag)
    );
  };

  return (
    <div className="space-y-6">
      {/* Status & Visibility */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Publish</CardTitle>
        </CardHeader>
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
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="published">Published</SelectItem>
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
                      ? format(new Date(article.scheduledDate), "PPP")
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
            </div>
          )}

          <div className="space-y-2">
            <Label>Author</Label>
            <Input
              value={article.author}
              onChange={(e) => handleChange("author", e.target.value)}
              readOnly
              className="bg-muted"
            />
          </div>
        </CardContent>
      </Card>

      {/* Category */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Category</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={article.category}
            onValueChange={(value) => handleChange("category", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AI Scams">AI Scams</SelectItem>
              <SelectItem value="Business AI">Business AI</SelectItem>
              <SelectItem value="Family Safety">Family Safety</SelectItem>
              <SelectItem value="News">News</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Featured Image */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Featured Image</CardTitle>
        </CardHeader>
        <CardContent>
          {article.featuredImage ? (
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
          ) : (
            <Button variant="outline" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Excerpt */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Excerpt</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={article.excerpt || ""}
            onChange={(e) => handleChange("excerpt", e.target.value)}
            placeholder="Write a brief description..."
            className="resize-none"
            rows={3}
          />
          <p className="text-xs text-muted-foreground mt-2">
            Brief summary shown in article listings
          </p>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <Input
            placeholder="Add tag..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />
          <p className="text-xs text-muted-foreground">Press Enter to add tag</p>
        </CardContent>
      </Card>

      {/* SEO */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">SEO</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="seo-title">SEO Title</Label>
            <Input
              id="seo-title"
              value={article.seoTitle || ""}
              onChange={(e) => handleChange("seoTitle", e.target.value)}
              placeholder="Custom title for search engines"
              maxLength={60}
            />
            <p className="text-xs text-muted-foreground">
              {(article.seoTitle || "").length}/60 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seo-description">SEO Description</Label>
            <Textarea
              id="seo-description"
              value={article.seoDescription || ""}
              onChange={(e) => handleChange("seoDescription", e.target.value)}
              placeholder="Meta description for search engines"
              className="resize-none"
              rows={3}
              maxLength={160}
            />
            <p className="text-xs text-muted-foreground">
              {(article.seoDescription || "").length}/160 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seo-keywords">SEO Keywords</Label>
            <Input
              id="seo-keywords"
              value={article.seoKeywords?.join(", ") || ""}
              onChange={(e) =>
                handleChange(
                  "seoKeywords",
                  e.target.value.split(",").map((k) => k.trim())
                )
              }
              placeholder="keyword1, keyword2, keyword3"
            />
            <p className="text-xs text-muted-foreground">Separate with commas</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
