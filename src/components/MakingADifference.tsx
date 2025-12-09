import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Heart, Gift, Users, DollarSign, Building2 } from "lucide-react";
import { DonationModal } from "./DonationModal";

const MakingADifference = () => {
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [donationType, setDonationType] = useState<'sponsor' | 'monthly' | 'corporate' | 'general'>('general');

  const openDonationModal = (type: 'sponsor' | 'monthly' | 'corporate' | 'general') => {
    setDonationType(type);
    setDonationModalOpen(true);
  };

  return (
    <>
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4">Making a Difference Together</h2>
          <p className="text-xl text-muted-foreground">
            Your enrollment powers safety education and community support programs nationwide.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Veterans & First Responders */}
          <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="secondary" className="text-lg px-3 py-1">10% OFF</Badge>
              </div>
              <CardTitle className="text-2xl">Thank you for your service</CardTitle>
              <CardDescription className="text-base">
                🎖️ Veterans & First Responders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Active duty, veterans, reservists, and first responders receive special recognition with our standing discount program.
              </p>
              <p className="text-sm text-muted-foreground">
                Verify status at checkout
              </p>
              <Button className="w-full" size="lg" asChild>
                <Link to="/contact">Claim Discount</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Support Children with Cancer */}
          <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-2 border-primary/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-full" />
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-accent/10">
                  <Heart className="h-6 w-6 text-accent fill-accent" />
                </div>
              </div>
              <CardTitle className="text-2xl">Support Children with Cancer</CardTitle>
              <CardDescription className="text-base">
                Make a meaningful impact
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Sponsor training seats for caregivers and provide specialized scam‑prevention resources during hospital stays.
              </p>
              <div className="flex flex-col gap-2">
                <Button 
                  onClick={() => openDonationModal('general')}
                  className="w-full"
                >
                  Donate
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/contact">Partner with Us</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Donate & Sponsor */}
          <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/10 to-transparent rounded-bl-full" />
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-secondary/10">
                  <Gift className="h-6 w-6 text-secondary-foreground" />
                </div>
              </div>
              <CardTitle className="text-2xl">Donate & Sponsor</CardTitle>
              <CardDescription className="text-base">
                100% supports community programs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                100% of donations fund scholarships, caregiver training programs, and community safety workshops.
              </p>
              <Button 
                onClick={() => openDonationModal('general')}
                className="w-full" 
                size="lg"
              >
                Donate Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <DonationModal
        open={donationModalOpen}
        onOpenChange={setDonationModalOpen}
        type={donationType}
      />
    </section>
    </>
  );
};

export default MakingADifference;
