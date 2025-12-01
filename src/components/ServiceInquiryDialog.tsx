import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, Shield } from 'lucide-react';
import { VeteranIdUpload } from '@/components/VeteranIdUpload';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ServiceInquiryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceType: 'ai-automation' | 'website-design' | 'ai-consultation' | 'ai-insurance';
  serviceName: string;
  servicePrice?: number;
}

export function ServiceInquiryDialog({ open, onOpenChange, serviceType, serviceName, servicePrice }: ServiceInquiryDialogProps) {
  const [loading, setLoading] = useState(false);
  const [isVeteran, setIsVeteran] = useState(false);
  const [veteranIdFile, setVeteranIdFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    budget: '',
    timeline: '',
    requirements: '',
    veteranType: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('service_inquiries')
        .insert({
          service_type: serviceType,
          service_name: serviceName,
          service_price: servicePrice,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone || null,
          company_name: formData.companyName || null,
          budget: formData.budget || null,
          timeline: formData.timeline || null,
          requirements: formData.requirements || null,
          is_veteran: isVeteran,
          veteran_type: isVeteran ? formData.veteranType : null,
          status: 'new'
        });

      if (error) throw error;

      toast.success('Inquiry submitted! We\'ll contact you within 24 hours.');
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        budget: '',
        timeline: '',
        requirements: '',
        veteranType: ''
      });
      setIsVeteran(false);
      setVeteranIdFile(null);
      onOpenChange(false);
    } catch (error) {
      console.error('Inquiry error:', error);
      toast.error('Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const discountedPrice = servicePrice && isVeteran ? servicePrice * 0.9 : servicePrice;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Request {serviceName}</DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll reach out within 24 hours
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Price Display */}
          {servicePrice && (
            <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Starting Price:</span>
                <div className="text-right">
                  {isVeteran && (
                    <div className="text-sm text-muted-foreground line-through">
                      ${servicePrice.toLocaleString()}
                    </div>
                  )}
                  <div className="text-2xl font-bold text-primary">
                    ${discountedPrice?.toLocaleString()}
                  </div>
                  {isVeteran && (
                    <div className="text-xs text-success">10% Veteran Discount Applied!</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={e => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  value={formData.companyName}
                  onChange={e => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Project Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget">Budget Range</Label>
                <Input
                  id="budget"
                  placeholder="e.g., $10k-$20k"
                  value={formData.budget}
                  onChange={e => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="timeline">Timeline</Label>
                <Input
                  id="timeline"
                  placeholder="e.g., 2-3 months"
                  value={formData.timeline}
                  onChange={e => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="requirements">What do you need?</Label>
              <Textarea
                id="requirements"
                placeholder="Describe your project requirements..."
                value={formData.requirements}
                onChange={e => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
                rows={4}
              />
            </div>
          </div>

          {/* Veteran Discount */}
          <div className="space-y-4 border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <Label htmlFor="veteran" className="text-base font-semibold cursor-pointer">
                  I'm a Veteran or First Responder (10% OFF)
                </Label>
              </div>
              <Switch
                id="veteran"
                checked={isVeteran}
                onCheckedChange={setIsVeteran}
              />
            </div>

            {isVeteran && (
              <div className="space-y-4 pl-7">
                <div>
                  <Label htmlFor="veteranType">Service/Department</Label>
                  <Input
                    id="veteranType"
                    placeholder="e.g., Army, Fire Dept"
                    value={formData.veteranType}
                    onChange={e => setFormData(prev => ({ ...prev, veteranType: e.target.value }))}
                  />
                </div>
                <VeteranIdUpload
                  isVeteran={isVeteran}
                  onFileUpload={setVeteranIdFile}
                  uploadedFile={veteranIdFile}
                />
                <Alert className="bg-primary/5">
                  <AlertDescription className="text-xs">
                    This is an inquiry form. Payment will be processed separately after we discuss your project requirements.
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full h-12" size="lg">
            {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Submitting...</> : 'Submit Inquiry'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}