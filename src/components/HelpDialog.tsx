import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, Mail, BookOpen, Video, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HelpDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="fixed bottom-6 right-6 rounded-full shadow-elegant z-40">
          <MessageSquare className="w-4 h-4 mr-2" />
          Help
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">How Can We Help?</DialogTitle>
          <p className="text-muted-foreground">Choose the best way to get support</p>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Card className="p-6 hover:shadow-medium transition-all cursor-pointer group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold mb-2 flex items-center justify-between">
                  Live Chat
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </h3>
                <p className="text-sm text-muted-foreground">Get instant help from our support team</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-medium transition-all cursor-pointer group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold mb-2">Email Support</h3>
                <a href="mailto:support@invisionnetwork.com" className="text-sm text-primary hover:underline">
                  support@invisionnetwork.com
                </a>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-medium transition-all cursor-pointer group">
            <Link to="/resources" onClick={() => setOpen(false)}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-2 flex items-center justify-between">
                    Help Center
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </h3>
                  <p className="text-sm text-muted-foreground">Browse guides and FAQs</p>
                </div>
              </div>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-medium transition-all cursor-pointer group opacity-60">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold mb-2">Video Tutorials</h3>
                <p className="text-sm text-muted-foreground">(Coming Soon)</p>
                <p className="text-xs text-muted-foreground mt-1">Watch how-to videos</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-6 pt-6 border-t">
          <h4 className="font-bold mb-3">Quick Links</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Link to="/training" onClick={() => setOpen(false)} className="text-primary hover:underline">
              Getting Started
            </Link>
            <Link to="/resources#faq" onClick={() => setOpen(false)} className="text-primary hover:underline">
              FAQ
            </Link>
            <Link to="/training" onClick={() => setOpen(false)} className="text-primary hover:underline">
              Featured Listings
            </Link>
            <Link to="/scam-shield" onClick={() => setOpen(false)} className="text-primary hover:underline">
              Subscriptions
            </Link>
          </div>
        </div>

        <div className="mt-4 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Average response time:</strong> Under 2 hours during business hours
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
