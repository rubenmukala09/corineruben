import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Loader2, Users, MapPin, Building2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { VeteranIdUpload } from "./VeteranIdUpload";
import { Switch } from "./ui/switch";

interface CustomTrainingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CustomTrainingDialog = ({ open, onOpenChange }: CustomTrainingDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [participants, setParticipants] = useState(4);
  const [distance, setDistance] = useState(0);
  const [organizationType, setOrganizationType] = useState<'family' | 'church' | 'school' | 'business' | 'other'>('family');
  const [isVeteran, setIsVeteran] = useState(false);
  const [veteranFile, setVeteranFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organizationName: "",
    preferredDate: "",
    specialRequirements: "",
  });

  const basePrice = 399;
  
  const calculatePrice = () => {
    let price = basePrice;
    
    // Additional participant pricing (40% increase per person beyond 4)
    if (participants > 4) {
      const additionalParticipants = participants - 4;
      price += additionalParticipants * (basePrice * 0.40);
    }
    
    // Organization type multipliers
    const orgMultipliers = {
      family: 1.0,
      church: 1.25,
      school: 1.35,
      business: 1.50,
      other: 1.20
    };
    price *= orgMultipliers[organizationType];
    
    // Distance-based travel fees
    if (distance > 20 && distance <= 50) {
      price += 50;
    } else if (distance > 50 && distance <= 100) {
      price += 75;
    } else if (distance > 100) {
      price += 100;
    }
    
    // Veteran discount (10%)
    if (isVeteran) {
      price *= 0.90;
    }
    
    return Math.round(price);
  };

  const finalPrice = calculatePrice();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let veteranDocUrl = null;
      
      // Upload veteran ID if provided
      if (isVeteran && veteranFile) {
        const fileExt = veteranFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('veteran-docs')
          .upload(filePath, veteranFile);

        if (uploadError) {
          console.error("Upload error:", uploadError);
          toast.error("Failed to upload veteran ID. Please try again.");
          setIsSubmitting(false);
          return;
        }

        const { data: urlData } = supabase.storage
          .from('veteran-docs')
          .getPublicUrl(filePath);

        veteranDocUrl = urlData.publicUrl;
      }

      const { error } = await supabase
        .from("booking_requests")
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          service_type: "training",
          service_name: "Customizable Private Training",
          service_tier: organizationType,
          preferred_dates: formData.preferredDate,
          message: `Participants: ${participants}\nDistance: ${distance} miles\nOrganization: ${formData.organizationName || 'N/A'}\nSpecial Requirements: ${formData.specialRequirements || 'None'}`,
          base_price: basePrice,
          final_price: finalPrice,
          is_veteran: isVeteran,
          veteran_id_last4: veteranDocUrl ? veteranDocUrl.slice(-4) : null,
          status: "pending",
        });

      if (error) throw error;

      toast.success("Training request submitted! We'll contact you within 24 hours.");
      onOpenChange(false);
      
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        organizationName: "",
        preferredDate: "",
        specialRequirements: "",
      });
      setParticipants(4);
      setDistance(0);
      setOrganizationType('family');
      setIsVeteran(false);
      setVeteranFile(null);
    } catch (error) {
      console.error("Error submitting training request:", error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Customizable Private Training
          </DialogTitle>
          <DialogDescription>
            Configure your private training session based on your specific needs
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div>
                <Label htmlFor="preferredDate">Preferred Date</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Session Configuration */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Session Configuration</h3>
            
            {/* Organization Type */}
            <div>
              <Label htmlFor="orgType" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Organization Type *
              </Label>
              <Select value={organizationType} onValueChange={(value: any) => setOrganizationType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="family">Family (Base Rate)</SelectItem>
                  <SelectItem value="church">Church (+25%)</SelectItem>
                  <SelectItem value="school">School (+35%)</SelectItem>
                  <SelectItem value="business">Business (+50%)</SelectItem>
                  <SelectItem value="other">Other Organization (+20%)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {organizationType !== 'family' && (
              <div>
                <Label htmlFor="organizationName">Organization Name</Label>
                <Input
                  id="organizationName"
                  value={formData.organizationName}
                  onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                  placeholder="Organization name"
                />
              </div>
            )}

            {/* Number of Participants */}
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4" />
                Number of Participants: <Badge variant="secondary">{participants}</Badge>
                {participants > 4 && (
                  <span className="text-xs text-muted-foreground">
                    (+${Math.round((participants - 4) * basePrice * 0.40)} for {participants - 4} extra)
                  </span>
                )}
              </Label>
              <Slider
                value={[participants]}
                onValueChange={(value) => setParticipants(value[0])}
                min={1}
                max={20}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Base price includes up to 4 participants. +40% per additional person.
              </p>
            </div>

            {/* Distance */}
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4" />
                Distance from Kettering, OH: <Badge variant="secondary">{distance} miles</Badge>
                {distance > 20 && (
                  <span className="text-xs text-muted-foreground">
                    (+${distance > 100 ? 100 : distance > 50 ? 75 : 50} travel fee)
                  </span>
                )}
              </Label>
              <Slider
                value={[distance]}
                onValueChange={(value) => setDistance(value[0])}
                min={0}
                max={200}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Travel fees: 0-20 miles (Free), 21-50 miles (+$50), 51-100 miles (+$75), 100+ miles (+$100)
              </p>
            </div>

            {/* Special Requirements */}
            <div>
              <Label htmlFor="specialRequirements">Special Requirements or Topics</Label>
              <Textarea
                id="specialRequirements"
                value={formData.specialRequirements}
                onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                placeholder="Any specific topics, accessibility needs, or special requests?"
                rows={3}
              />
            </div>
          </div>

          {/* Veteran Discount */}
          <div className="space-y-4 border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="veteran-switch">Veteran or First Responder?</Label>
                <Badge variant="secondary">10% OFF</Badge>
              </div>
              <Switch
                id="veteran-switch"
                checked={isVeteran}
                onCheckedChange={setIsVeteran}
              />
            </div>

            {isVeteran && (
              <VeteranIdUpload
                isVeteran={isVeteran}
                onFileUpload={setVeteranFile}
                uploadedFile={veteranFile}
              />
            )}
          </div>

          {/* Price Breakdown */}
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <h3 className="font-semibold text-lg mb-3">Price Breakdown</h3>
            <div className="flex justify-between text-sm">
              <span>Base Price (1-4 participants):</span>
              <span>${basePrice}</span>
            </div>
            {participants > 4 && (
              <div className="flex justify-between text-sm">
                <span>Additional Participants ({participants - 4}):</span>
                <span>+${Math.round((participants - 4) * basePrice * 0.40)}</span>
              </div>
            )}
            {organizationType !== 'family' && (
              <div className="flex justify-between text-sm">
                <span>Organization Type Adjustment:</span>
                <span>×{organizationType === 'church' ? '1.25' : organizationType === 'school' ? '1.35' : organizationType === 'business' ? '1.50' : '1.20'}</span>
              </div>
            )}
            {distance > 20 && (
              <div className="flex justify-between text-sm">
                <span>Travel Fee ({distance} miles):</span>
                <span>+${distance > 100 ? 100 : distance > 50 ? 75 : 50}</span>
              </div>
            )}
            {isVeteran && (
              <div className="flex justify-between text-sm text-success">
                <span>Veteran Discount (10%):</span>
                <span>-${Math.round(calculatePrice() / 0.90 * 0.10)}</span>
              </div>
            )}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span className="text-primary">${finalPrice}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              `Request Customized Session - $${finalPrice}`
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            This is a booking request. No payment required now. We'll contact you to confirm details and schedule.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
