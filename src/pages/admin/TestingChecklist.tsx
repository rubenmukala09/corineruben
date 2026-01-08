import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Download, CheckCircle2 } from "lucide-react";

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

interface ChecklistSection {
  title: string;
  items: ChecklistItem[];
}

export default function TestingChecklist() {
  const [functionalityChecklist, setFunctionalityChecklist] = useState<ChecklistSection[]>([
    {
      title: "Homepage",
      items: [
        { id: "home-links", label: "All links work (no 404s)", checked: false },
        { id: "home-images", label: "Images load correctly", checked: false },
        { id: "home-buttons", label: "Buttons go to right pages", checked: false },
        { id: "home-animations", label: "Animations play smoothly", checked: false },
        { id: "home-stats", label: "Statistics count up", checked: false },
        { id: "home-testimonials", label: "Testimonials cycle", checked: false },
        { id: "home-forms", label: "Forms submit successfully", checked: false },
        { id: "home-mobile-nav", label: "Mobile navigation works", checked: false },
      ]
    },
    {
      title: "Contact Page",
      items: [
        { id: "contact-submit", label: "Form submits", checked: false },
        { id: "contact-validation", label: "Validation works (email, phone format)", checked: false },
        { id: "contact-errors", label: "Error messages show correctly", checked: false },
        { id: "contact-success", label: "Success message displays", checked: false },
        { id: "contact-confirmation", label: "Email confirmation sent", checked: false },
        { id: "contact-admin-notify", label: "Admin receives notification", checked: false },
      ]
    },
    {
      title: "Login/Signup",
      items: [
        { id: "login-correct", label: "Login with correct credentials works", checked: false },
        { id: "login-wrong", label: "Login with wrong credentials fails", checked: false },
        { id: "forgot-password", label: "'Forgot password' sends email", checked: false },
        { id: "password-reset", label: "Password reset link works", checked: false },
        { id: "signup-submit", label: "Signup form submits", checked: false },
        { id: "signup-validation", label: "Validation works", checked: false },
      ]
    },
    {
      title: "Admin Dashboard",
      items: [
        { id: "dashboard-loads", label: "Dashboard loads", checked: false },
        { id: "dashboard-stats", label: "Stats display correctly", checked: false },
        { id: "dashboard-charts", label: "Charts render", checked: false },
        { id: "dashboard-nav", label: "Navigation works", checked: false },
        { id: "dashboard-crud", label: "CRUD operations work", checked: false },
        { id: "dashboard-permissions", label: "Permissions enforced", checked: false },
      ]
    }
  ]);

  const [responsiveChecklist, setResponsiveChecklist] = useState<ChecklistItem[]>([
    { id: "mobile-375", label: "Mobile (375px) - iPhone SE", checked: false },
    { id: "mobile-390", label: "Mobile (390px) - iPhone 14", checked: false },
    { id: "tablet-768", label: "Tablet (768px) - iPad", checked: false },
    { id: "desktop-1280", label: "Desktop (1280px) - Laptop", checked: false },
    { id: "large-1920", label: "Large (1920px) - Desktop", checked: false },
    { id: "no-scroll", label: "No horizontal scrolling", checked: false },
    { id: "images-scale", label: "Images scale appropriately", checked: false },
    { id: "text-readable", label: "Text is readable", checked: false },
    { id: "buttons-tappable", label: "Buttons are tappable (min 44px)", checked: false },
  ]);

  const [seoChecklist, setSeoChecklist] = useState<ChecklistItem[]>([
    { id: "unique-titles", label: "Every page has unique title tag", checked: false },
    { id: "meta-descriptions", label: "Every page has meta description", checked: false },
    { id: "alt-text", label: "All images have alt text", checked: false },
    { id: "heading-order", label: "Headings in proper order", checked: false },
    { id: "seo-urls", label: "URLs are SEO-friendly", checked: false },
    { id: "sitemap", label: "XML sitemap exists", checked: false },
    { id: "robots-txt", label: "Robots.txt exists", checked: false },
    { id: "ssl", label: "SSL certificate valid (HTTPS)", checked: false },
    { id: "no-broken-links", label: "No broken links", checked: false },
  ]);

  const [performanceChecklist, setPerformanceChecklist] = useState<ChecklistItem[]>([
    { id: "pagespeed-90", label: "PageSpeed Insights: 90+ (mobile & desktop)", checked: false },
    { id: "lighthouse-90", label: "Lighthouse score: 90+", checked: false },
    { id: "fcp", label: "First Contentful Paint: <1.8s", checked: false },
    { id: "lcp", label: "Largest Contentful Paint: <2.5s", checked: false },
    { id: "tti", label: "Time to Interactive: <3.8s", checked: false },
    { id: "page-load", label: "Page load: <3 seconds", checked: false },
    { id: "images-optimized", label: "Images optimized (WebP)", checked: false },
    { id: "lazy-load", label: "Images lazy load", checked: false },
  ]);

  const toggleItem = (
    section: ChecklistSection[],
    setSectionFn: React.Dispatch<React.SetStateAction<ChecklistSection[]>>,
    sectionIndex: number,
    itemId: string
  ) => {
    const newSections = [...section];
    const itemIndex = newSections[sectionIndex].items.findIndex(i => i.id === itemId);
    newSections[sectionIndex].items[itemIndex].checked = !newSections[sectionIndex].items[itemIndex].checked;
    setSectionFn(newSections);
  };

  const toggleSimpleItem = (
    items: ChecklistItem[],
    setItemsFn: React.Dispatch<React.SetStateAction<ChecklistItem[]>>,
    itemId: string
  ) => {
    const newItems = items.map(item =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    setItemsFn(newItems);
  };

  const calculateProgress = (sections: ChecklistSection[]) => {
    const allItems = sections.flatMap(s => s.items);
    const checked = allItems.filter(i => i.checked).length;
    return (checked / allItems.length) * 100;
  };

  const calculateSimpleProgress = (items: ChecklistItem[]) => {
    const checked = items.filter(i => i.checked).length;
    return (checked / items.length) * 100;
  };

  const exportChecklist = () => {
    const data = {
      functionality: functionalityChecklist,
      responsive: responsiveChecklist,
      seo: seoChecklist,
      performance: performanceChecklist,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `testing-checklist-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const functionalityProgress = calculateProgress(functionalityChecklist);
  const responsiveProgress = calculateSimpleProgress(responsiveChecklist);
  const seoProgress = calculateSimpleProgress(seoChecklist);
  const performanceProgress = calculateSimpleProgress(performanceChecklist);
  const overallProgress = (functionalityProgress + responsiveProgress + seoProgress + performanceProgress) / 4;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#F9FAFB]">Pre-Launch Testing Checklist</h1>
          <p className="text-[#9CA3AF]">Track your launch readiness</p>
        </div>
        <Button onClick={exportChecklist} className="gap-2 bg-cyan-600 hover:bg-cyan-700">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Overall Progress */}
      <Card className="p-6 bg-[#111827] border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-[#F9FAFB]">Overall Progress</h3>
            <p className="text-sm text-[#9CA3AF]">Complete all items to launch</p>
          </div>
          <div className="text-3xl font-bold text-cyan-400">{Math.round(overallProgress)}%</div>
        </div>
        <Progress value={overallProgress} className="h-3" />
        {overallProgress === 100 && (
          <div className="mt-4 flex items-center gap-2 text-green-400">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold">Ready to launch! 🚀</span>
          </div>
        )}
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="functionality" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl bg-[#111827]">
          <TabsTrigger value="functionality">Functionality</TabsTrigger>
          <TabsTrigger value="responsive">Responsive</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="functionality" className="space-y-4">
          <Card className="p-6 bg-[#111827] border-gray-800">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2 text-[#F9FAFB]">Functionality Testing</h3>
              <Progress value={functionalityProgress} className="h-2" />
              <p className="text-sm text-[#9CA3AF] mt-2">{Math.round(functionalityProgress)}% complete</p>
            </div>
            
            {functionalityChecklist.map((section, sectionIndex) => (
              <div key={section.title} className="mb-6">
                <h4 className="font-semibold mb-3 text-cyan-400">{section.title}</h4>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <Checkbox
                        id={item.id}
                        checked={item.checked}
                        onCheckedChange={() => toggleItem(functionalityChecklist, setFunctionalityChecklist, sectionIndex, item.id)}
                      />
                      <label htmlFor={item.id} className="text-sm cursor-pointer text-[#9CA3AF]">
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Card>
        </TabsContent>

        <TabsContent value="responsive" className="space-y-4">
          <Card className="p-6 bg-[#111827] border-gray-800">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2 text-[#F9FAFB]">Responsive Testing</h3>
              <Progress value={responsiveProgress} className="h-2" />
              <p className="text-sm text-[#9CA3AF] mt-2">{Math.round(responsiveProgress)}% complete</p>
            </div>
            
            <div className="space-y-3">
              {responsiveChecklist.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <Checkbox
                    id={item.id}
                    checked={item.checked}
                    onCheckedChange={() => toggleSimpleItem(responsiveChecklist, setResponsiveChecklist, item.id)}
                  />
                  <label htmlFor={item.id} className="text-sm cursor-pointer text-[#9CA3AF]">
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <Card className="p-6 bg-[#111827] border-gray-800">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2 text-[#F9FAFB]">SEO Testing</h3>
              <Progress value={seoProgress} className="h-2" />
              <p className="text-sm text-[#9CA3AF] mt-2">{Math.round(seoProgress)}% complete</p>
            </div>
            
            <div className="space-y-3">
              {seoChecklist.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <Checkbox
                    id={item.id}
                    checked={item.checked}
                    onCheckedChange={() => toggleSimpleItem(seoChecklist, setSeoChecklist, item.id)}
                  />
                  <label htmlFor={item.id} className="text-sm cursor-pointer text-[#9CA3AF]">
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card className="p-6 bg-[#111827] border-gray-800">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2 text-[#F9FAFB]">Performance Testing</h3>
              <Progress value={performanceProgress} className="h-2" />
              <p className="text-sm text-[#9CA3AF] mt-2">{Math.round(performanceProgress)}% complete</p>
            </div>
            
            <div className="space-y-3">
              {performanceChecklist.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <Checkbox
                    id={item.id}
                    checked={item.checked}
                    onCheckedChange={() => toggleSimpleItem(performanceChecklist, setPerformanceChecklist, item.id)}
                  />
                  <label htmlFor={item.id} className="text-sm cursor-pointer text-[#9CA3AF]">
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
