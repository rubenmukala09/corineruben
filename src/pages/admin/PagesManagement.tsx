import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { FileText, Save, Eye, RefreshCw } from "lucide-react";

const PAGES = [
  { id: "home", name: "Home", path: "/" },
  { id: "about", name: "About", path: "/about" },
  { id: "services", name: "Services", path: "/services" },
  { id: "training", name: "Training", path: "/training" },
  { id: "business", name: "Business", path: "/business" },
  { id: "resources", name: "Resources", path: "/resources" },
  { id: "contact", name: "Contact", path: "/contact" },
];

interface PageFormData {
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroCtaText: string;
}

const EMPTY: PageFormData = {
  metaTitle: "",
  metaDescription: "",
  heroHeadline: "",
  heroSubheadline: "",
  heroCtaText: "",
};

// Maps form field → DB (section, field)
const FIELD_MAP: Record<
  keyof PageFormData,
  { section: string; field: string }
> = {
  metaTitle: { section: "seo", field: "meta_title" },
  metaDescription: { section: "seo", field: "meta_description" },
  heroHeadline: { section: "hero", field: "headline" },
  heroSubheadline: { section: "hero", field: "subheadline" },
  heroCtaText: { section: "hero", field: "cta_text" },
};

export default function PagesManagement() {
  const queryClient = useQueryClient();
  const [selectedPage, setSelectedPage] = useState(PAGES[0]);
  const [formData, setFormData] = useState<PageFormData>(EMPTY);

  // Load all page_content rows for the selected page
  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["page-content", selectedPage.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_content")
        .select("section, field, value")
        .eq("page_id", selectedPage.id);
      if (error) throw error;
      return data as { section: string; field: string; value: string | null }[];
    },
  });

  // Populate form when rows load
  useEffect(() => {
    const next: PageFormData = { ...EMPTY };
    rows.forEach((row) => {
      (Object.keys(FIELD_MAP) as (keyof PageFormData)[]).forEach((k) => {
        const m = FIELD_MAP[k];
        if (m.section === row.section && m.field === row.field && row.value !== null) {
          next[k] = row.value;
        }
      });
    });
    setFormData(next);
  }, [rows]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const upsertRows = (Object.keys(FIELD_MAP) as (keyof PageFormData)[]).map(
        (k) => ({
          page_id: selectedPage.id,
          section: FIELD_MAP[k].section,
          field: FIELD_MAP[k].field,
          value: formData[k],
          is_published: true,
          updated_at: new Date().toISOString(),
        })
      );

      const { error } = await supabase
        .from("page_content")
        .upsert(upsertRows, { onConflict: "page_id,section,field" });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["page-content", selectedPage.id],
      });
      toast.success("Page content updated successfully");
    },
    onError: (e: any) => toast.error(e.message ?? "Failed to save"),
  });

  const handlePageChange = (page: (typeof PAGES)[0]) => {
    setSelectedPage(page);
    setFormData(EMPTY);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#F9FAFB]">
            Pages Management
          </h1>
          <p className="text-[#9CA3AF]">
            Edit website pages content and SEO settings
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => window.open(selectedPage.path, "_blank")}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button
            onClick={() => saveMutation.mutate()}
            disabled={saveMutation.isPending}
            className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white"
          >
            {saveMutation.isPending ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1 bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100">Pages</CardTitle>
            <CardDescription>Select a page to edit</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {PAGES.map((page) => (
              <Button
                key={page.id}
                variant={selectedPage.id === page.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handlePageChange(page)}
              >
                <FileText className="h-4 w-4 mr-2" />
                {page.name}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100">
              Edit {selectedPage.name} Page
            </CardTitle>
            <CardDescription>
              Update content and SEO settings for{" "}
              <code className="text-[#06B6D4]">{selectedPage.path}</code>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center gap-2 py-8 text-[#9CA3AF]">
                <RefreshCw className="h-4 w-4 animate-spin" />
                Loading…
              </div>
            ) : (
              <Tabs defaultValue="seo" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-[#1F2937]">
                  <TabsTrigger value="seo">SEO Settings</TabsTrigger>
                  <TabsTrigger value="hero">Hero Section</TabsTrigger>
                </TabsList>

                <TabsContent value="seo" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <Input
                      id="metaTitle"
                      placeholder="Enter page title (max 60 characters)"
                      value={formData.metaTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, metaTitle: e.target.value })
                      }
                      maxLength={60}
                      className="bg-[#1F2937] border-gray-700"
                    />
                    <p className="text-xs text-muted-foreground">
                      {formData.metaTitle.length}/60 characters
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea
                      id="metaDescription"
                      placeholder="Enter page description (max 160 characters)"
                      value={formData.metaDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          metaDescription: e.target.value,
                        })
                      }
                      maxLength={160}
                      rows={3}
                      className="bg-[#1F2937] border-gray-700"
                    />
                    <p className="text-xs text-muted-foreground">
                      {formData.metaDescription.length}/160 characters
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="hero" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="heroHeadline">Hero Headline</Label>
                    <Input
                      id="heroHeadline"
                      placeholder="Enter main headline"
                      value={formData.heroHeadline}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          heroHeadline: e.target.value,
                        })
                      }
                      className="bg-[#1F2937] border-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="heroSubheadline">Hero Subheadline</Label>
                    <Textarea
                      id="heroSubheadline"
                      placeholder="Enter supporting text"
                      value={formData.heroSubheadline}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          heroSubheadline: e.target.value,
                        })
                      }
                      rows={3}
                      className="bg-[#1F2937] border-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="heroCtaText">
                      Call-to-Action Button Text
                    </Label>
                    <Input
                      id="heroCtaText"
                      placeholder="e.g., Get Started, Learn More"
                      value={formData.heroCtaText}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          heroCtaText: e.target.value,
                        })
                      }
                      className="bg-[#1F2937] border-gray-700"
                    />
                  </div>

                  <p className="text-xs text-[#6B7280] bg-[#1F2937] rounded p-3">
                    💡 Hero content changes are stored in the database and can
                    be read by page components via the{" "}
                    <code>page_content</code> table. Connect your page
                    components to read from{" "}
                    <code>page_id = "{selectedPage.id}"</code> to render these
                    values dynamically.
                  </p>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
