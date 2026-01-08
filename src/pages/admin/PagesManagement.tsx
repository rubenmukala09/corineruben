import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { FileText, Save, Eye } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";

const PAGES = [
  { id: "home", name: "Home", path: "/" },
  { id: "about", name: "About", path: "/about" },
  { id: "services", name: "Services", path: "/services" },
  { id: "training", name: "Training", path: "/training" },
  { id: "business", name: "Business", path: "/business" },
  { id: "resources", name: "Resources", path: "/resources" },
  { id: "contact", name: "Contact", path: "/contact" },
];

export default function PagesManagement() {
  const [selectedPage, setSelectedPage] = useState(PAGES[0]);
  const [formData, setFormData] = useState({
    metaTitle: "",
    metaDescription: "",
    heroHeadline: "",
    heroSubheadline: "",
    heroCtaText: "",
  });

  const handleSave = () => {
    toast.success("Page content updated successfully");
  };

  const handlePreview = () => {
    window.open(selectedPage.path, "_blank");
  };

  return (
    <AdminLayout
      title="Pages Management"
      subtitle="Edit website pages content and SEO settings"
      headerActions={
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave} className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      }
    >
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
                onClick={() => setSelectedPage(page)}
              >
                <FileText className="h-4 w-4 mr-2" />
                {page.name}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100">Edit {selectedPage.name} Page</CardTitle>
            <CardDescription>Update content and SEO settings for {selectedPage.path}</CardDescription>
          </CardHeader>
          <CardContent>
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
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                    maxLength={60}
                    className="bg-[#1F2937] border-gray-700"
                  />
                  <p className="text-xs text-muted-foreground">{formData.metaTitle.length}/60 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    placeholder="Enter page description (max 160 characters)"
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    maxLength={160}
                    rows={3}
                    className="bg-[#1F2937] border-gray-700"
                  />
                  <p className="text-xs text-muted-foreground">{formData.metaDescription.length}/160 characters</p>
                </div>
              </TabsContent>

              <TabsContent value="hero" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="heroHeadline">Hero Headline</Label>
                  <Input
                    id="heroHeadline"
                    placeholder="Enter main headline"
                    value={formData.heroHeadline}
                    onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
                    className="bg-[#1F2937] border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="heroSubheadline">Hero Subheadline</Label>
                  <Textarea
                    id="heroSubheadline"
                    placeholder="Enter supporting text"
                    value={formData.heroSubheadline}
                    onChange={(e) => setFormData({ ...formData, heroSubheadline: e.target.value })}
                    rows={3}
                    className="bg-[#1F2937] border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="heroCtaText">Call-to-Action Button Text</Label>
                  <Input
                    id="heroCtaText"
                    placeholder="e.g., Get Started, Learn More"
                    value={formData.heroCtaText}
                    onChange={(e) => setFormData({ ...formData, heroCtaText: e.target.value })}
                    className="bg-[#1F2937] border-gray-700"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
