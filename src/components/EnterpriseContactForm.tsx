import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Building2, Globe, Users, FileText } from "lucide-react";

interface EnterpriseContactFormProps {
  serviceType: string;
  onClose?: () => void;
}

export const EnterpriseContactForm = ({ serviceType, onClose }: EnterpriseContactFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    country: "",
    companySize: "",
    industry: "",
    timeline: "",
    budget: "",
    requirements: "",
    currentSystems: "",
    challenges: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send to backend
    console.log("Enterprise inquiry:", { serviceType, ...formData });
    
    toast({
      title: "Request Submitted!",
      description: "Our enterprise team will contact you within 24 hours.",
    });
    
    if (onClose) onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Enterprise {serviceType}</h3>
        <p className="text-muted-foreground">
          Tell us about your organization and requirements. Our team will design a custom solution.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <Building2 className="w-5 h-5" />
            <h4>Company Information</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                required
                value={formData.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                placeholder="Your Company Inc."
              />
            </div>
            
            <div>
              <Label htmlFor="contactName">Your Name *</Label>
              <Input
                id="contactName"
                required
                value={formData.contactName}
                onChange={(e) => handleChange("contactName", e.target.value)}
                placeholder="John Smith"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Business Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="john@company.com"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>
        </div>

        {/* Organization Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <Globe className="w-5 h-5" />
            <h4>Organization Details</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="country">Country/Region *</Label>
              <Input
                id="country"
                required
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
                placeholder="United States"
              />
            </div>
            
            <div>
              <Label htmlFor="companySize">Company Size *</Label>
              <Select onValueChange={(value) => handleChange("companySize", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50-200">50-200 employees</SelectItem>
                  <SelectItem value="200-500">200-500 employees</SelectItem>
                  <SelectItem value="500-1000">500-1,000 employees</SelectItem>
                  <SelectItem value="1000+">1,000+ employees</SelectItem>
                  <SelectItem value="enterprise">Enterprise (5,000+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="industry">Industry *</Label>
              <Input
                id="industry"
                required
                value={formData.industry}
                onChange={(e) => handleChange("industry", e.target.value)}
                placeholder="e.g., Healthcare, Finance, Manufacturing"
              />
            </div>
            
            <div>
              <Label htmlFor="timeline">Implementation Timeline *</Label>
              <Select onValueChange={(value) => handleChange("timeline", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate (1-2 months)</SelectItem>
                  <SelectItem value="quarter">This Quarter (3 months)</SelectItem>
                  <SelectItem value="6months">6 months</SelectItem>
                  <SelectItem value="year">This year</SelectItem>
                  <SelectItem value="exploring">Just exploring</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Project Requirements */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <FileText className="w-5 h-5" />
            <h4>Project Requirements</h4>
          </div>
          
          <div>
            <Label htmlFor="budget">Estimated Budget Range</Label>
            <Select onValueChange={(value) => handleChange("budget", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                <SelectItem value="250k+">$250,000+</SelectItem>
                <SelectItem value="flexible">Flexible based on scope</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="requirements">Detailed Requirements *</Label>
            <Textarea
              id="requirements"
              required
              rows={4}
              value={formData.requirements}
              onChange={(e) => handleChange("requirements", e.target.value)}
              placeholder="Please describe what you need in detail: features, integrations, scale, specific challenges..."
            />
          </div>
          
          <div>
            <Label htmlFor="currentSystems">Current Systems & Tools</Label>
            <Textarea
              id="currentSystems"
              rows={3}
              value={formData.currentSystems}
              onChange={(e) => handleChange("currentSystems", e.target.value)}
              placeholder="What systems/tools are you currently using? (CRM, databases, communication tools, etc.)"
            />
          </div>
          
          <div>
            <Label htmlFor="challenges">Key Challenges to Solve</Label>
            <Textarea
              id="challenges"
              rows={3}
              value={formData.challenges}
              onChange={(e) => handleChange("challenges", e.target.value)}
              placeholder="What are the main pain points or challenges you're trying to address?"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" size="lg" className="flex-1">
            Submit Enterprise Request
          </Button>
          {onClose && (
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};
