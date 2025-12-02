import { ChildrenDonationModal } from "@/components/ChildrenDonationModal";
import { PartnershipModal } from "@/components/PartnershipModal";
import { Link } from "react-router-dom";
import { Heart, Shield } from "lucide-react";
import { useState } from "react";

const MakingADifference = () => {
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [partnershipModalOpen, setPartnershipModalOpen] = useState(false);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-background to-muted/30" role="region" aria-label="Community support">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center animate-fade-in text-foreground">
          Making a Difference Together
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
          Join us in supporting those who protect our nation and helping children battling cancer. Together, we can create lasting change.
        </p>

        {/* Main Contribution Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
          {/* Veterans & First Responders Card */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border-2 border-blue-200/50 dark:border-blue-800/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Thank You for Your Service</h3>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We honor the brave men and women who serve our country and communities. Veterans and first responders receive a special 10% discount on all our services and products.
            </p>
            <div className="flex flex-col gap-3">
              <Link to="/resources">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg">
                  Shop with Discount
                </button>
              </Link>
            </div>
          </div>

          {/* Support Children with Cancer Card */}
          <div className="bg-gradient-to-br from-pink-50 to-red-50 dark:from-pink-950/20 dark:to-red-950/20 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border-2 border-pink-200/50 dark:border-pink-800/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-pink-500/20 rounded-lg">
                <Heart className="w-8 h-8 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Support Children with Cancer</h3>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Every contribution helps provide hope, care, and support to children and families battling cancer. Your generosity makes a real difference in their journey.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setDonationModalOpen(true)}
                className="w-full bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
              >
                Donate Now
              </button>
              <button 
                onClick={() => setPartnershipModalOpen(true)}
                className="w-full bg-white dark:bg-gray-800 text-pink-600 dark:text-pink-400 border-2 border-pink-200 dark:border-pink-800 font-semibold py-3 px-6 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-950/30 transition-all"
              >
                Partner with Us
              </button>
              <Link to="/contact">
                <button className="w-full bg-white dark:bg-gray-800 text-muted-foreground border-2 border-border font-semibold py-3 px-6 rounded-lg hover:bg-muted transition-all">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ChildrenDonationModal 
        open={donationModalOpen} 
        onOpenChange={setDonationModalOpen}
      />
      <PartnershipModal 
        open={partnershipModalOpen} 
        onOpenChange={setPartnershipModalOpen}
      />
    </section>
  );
};

export default MakingADifference;
