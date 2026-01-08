import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { FileText, Save, Eye, ChevronLeft, ChevronRight } from "lucide-react";

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

  const currentIndex = PAGES.findIndex(p => p.id === selectedPage.id);

  const handleBack = () => {
    if (currentIndex > 0) {
      setSelectedPage(PAGES[currentIndex - 1]);
    }
  };

  const handleForward = () => {
    if (currentIndex < PAGES.length - 1) {
      setSelectedPage(PAGES[currentIndex + 1]);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleBack}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleForward}
              disabled={currentIndex === PAGES.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <h1 className="text-3xl font-bold">Pages Management</h1>
            <p className="text-muted-foreground">Edit website pages content and SEO settings</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Pages</CardTitle>
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

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Edit {selectedPage.name} Page</CardTitle>
            <CardDescription>Update content and SEO settings for {selectedPage.path}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="seo" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
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
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="heroCtaText">Call-to-Action Button Text</Label>
                  <Input
                    id="heroCtaText"
                    placeholder="e.g., Get Started, Learn More"
                    value={formData.heroCtaText}
                    onChange={(e) => setFormData({ ...formData, heroCtaText: e.target.value })}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
