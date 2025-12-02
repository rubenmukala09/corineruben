import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, Shield, ShoppingCart, Star, TrendingUp, Loader2 } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import heroResourcesMarketplace from "@/assets/hero-resources-marketplace.jpg";
import heroResourcesNew from "@/assets/hero-resources-new.jpg";
import heroResources from "@/assets/hero-resources.jpg";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";

function Resources() {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Fetch products from database
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['marketplace-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'active')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  // Separate into digital and physical products based on tags
  const digitalProducts = products?.filter(p => 
    p.tags?.some((tag: string) => ['digital', 'guide', 'software', 'video', 'training', 'subscription'].includes(tag.toLowerCase()))
  ) || [];
  const physicalProducts = products?.filter(p => 
    p.tags?.some((tag: string) => ['physical', 'device', 'hardware', 'kit', 'equipment'].includes(tag.toLowerCase()))
  ) || [];

  const handleBuyNow = async (product: any) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to purchase products",
          variant: "destructive",
        });
        return;
      }

      setLoading(true);
      
      const { data, error } = await supabase.functions.invoke('create-product-payment', {
        body: { productId: product.id, quantity: 1 }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
        toast({
          title: "Redirecting to Checkout",
          description: "Opening secure payment page...",
        });
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: error.message || "Failed to create checkout session",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resourcesHeroImages = [
    { src: heroResourcesMarketplace, alt: "Safety resources and training marketplace" },
    { src: heroResourcesNew, alt: "Educational materials and guides" },
    { src: heroResources, alt: "Community accessing helpful resources" }
  ];

  return (
    <>
      <SEO 
        title="Resources & Marketplace - Digital Guides & Security Products"
        description="Browse our curated collection of scam prevention guides and physical security products. Everything you need to protect yourself and your loved ones."
      />
      <Navigation />
      
      <Hero
        backgroundImages={resourcesHeroImages}
        headline="Your Digital Safety Arsenal"
        subheadline="Premium guides, tools, and products to protect what matters most"
      />

      <TrustBar />

      {/* Quick Navigation Pills */}
      <section className="py-6 md:py-8 bg-secondary/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex flex-wrap gap-3 justify-center">
              {["Digital Guides", "Physical Products", "Bundles", "Free Resources"].map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  size="lg"
                  className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm md:text-base"
                >
                  {category}
                </Button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Digital Guides Section */}
      <section id="guides" className="py-10 md:py-14 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-8">
              <Badge className="mb-3 text-base md:text-lg px-4 md:px-6 py-2" variant="secondary">
                <Download className="w-4 h-4 mr-2" />
                Instant Digital Download
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Digital Security Guides
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Expert knowledge delivered instantly. Download and print, or read on any device.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {isLoading ? (
              // Loading skeletons
              [...Array(6)].map((_, i) => (
                <Card key={i} className="p-5">
                  <Skeleton className="w-16 h-16 rounded-2xl mb-4" />
                  <Skeleton className="h-8 w-3/4 mb-3" />
                  <Skeleton className="h-20 w-full mb-4" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-12 w-full" />
                </Card>
              ))
            ) : error ? (
              <div className="col-span-full text-center py-12">
                <p className="text-destructive">Error loading products. Please try again.</p>
              </div>
            ) : digitalProducts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No digital products available at this time.</p>
              </div>
            ) : (
              digitalProducts.map((product, index) => (
                <ScrollReveal key={product.id} delay={index * 100}>
                  <Card className="group p-5 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border-2 border-border/50 hover:border-primary/50 relative overflow-hidden bg-gradient-to-br from-background to-secondary/10">
                    {product.is_featured && (
                      <Badge className="absolute top-4 right-4 animate-pulse shadow-lg text-xs">
                        Featured
                      </Badge>
                    )}
                    <div className="mb-4">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Download className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                      {product.description}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 md:w-4 md:h-4 ${i < Math.floor(product.rating_average || 0) ? 'fill-amber-400 text-amber-400' : 'text-muted'}`} />
                        ))}
                      </div>
                      <span className="text-xs md:text-sm text-muted-foreground">
                        {product.rating_average?.toFixed(1) || '0.0'} ({product.rating_count || 0})
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-auto pt-4 border-t border-border">
                      <div>
                        {product.sale_price ? (
                          <>
                            <div className="text-2xl md:text-3xl font-bold text-primary">
                              ${product.sale_price.toFixed(2)}
                            </div>
                            <div className="text-sm text-muted-foreground line-through">
                              ${product.base_price.toFixed(2)}
                            </div>
                          </>
                        ) : (
                          <div className="text-2xl md:text-3xl font-bold text-primary">
                            ${product.base_price.toFixed(2)}
                          </div>
                        )}
                        <div className="text-xs md:text-sm text-muted-foreground">One-time payment</div>
                      </div>
                      <Button 
                        size="lg"
                        onClick={() => handleBuyNow(product)}
                        disabled={loading}
                        className="w-full sm:w-auto group-hover:scale-110 transition-transform duration-300 shadow-lg text-sm md:text-base"
                      >
                        {loading ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <ShoppingCart className="w-4 h-4 mr-2" />
                        )}
                        Buy Now
                      </Button>
                    </div>
                  </Card>
                </ScrollReveal>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Physical Products Section */}
      <section id="products" className="py-10 md:py-14 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-8">
              <Badge className="mb-3 text-base md:text-lg px-4 md:px-6 py-2" variant="secondary">
                <Shield className="w-4 h-4 mr-2" />
                Ships Within 2-3 Business Days
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Physical Security Products
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Carefully curated hardware to enhance your digital safety
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {isLoading ? (
              // Loading skeletons
              [...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="w-full aspect-video" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </Card>
              ))
            ) : error ? (
              <div className="col-span-full text-center py-12">
                <p className="text-destructive">Error loading products. Please try again.</p>
              </div>
            ) : physicalProducts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No physical products available at this time.</p>
              </div>
            ) : (
              physicalProducts.map((product, index) => (
                <ScrollReveal key={product.id} delay={index * 100}>
                  <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 border-border/50 hover:border-primary/50 overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-secondary to-muted flex items-center justify-center relative overflow-hidden">
                      <Shield className="w-20 h-20 md:w-24 md:h-24 text-muted-foreground/30 group-hover:scale-125 transition-transform duration-500" />
                      {product.stock_quantity !== null && product.stock_quantity < 10 && (
                        <Badge variant="destructive" className="absolute top-4 right-4 animate-pulse text-xs">
                          Only {product.stock_quantity} left!
                        </Badge>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 md:w-4 md:h-4 ${i < Math.floor(product.rating_average || 0) ? 'fill-amber-400 text-amber-400' : 'text-muted'}`} />
                          ))}
                        </div>
                        <span className="text-xs md:text-sm text-muted-foreground">
                          {product.rating_average?.toFixed(1) || '0.0'} ({product.rating_count || 0})
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border">
                        <div>
                          {product.sale_price ? (
                            <>
                              <div className="text-2xl md:text-3xl font-bold text-primary">
                                ${product.sale_price.toFixed(2)}
                              </div>
                              <div className="text-sm text-muted-foreground line-through">
                                ${product.base_price.toFixed(2)}
                              </div>
                            </>
                          ) : (
                            <div className="text-2xl md:text-3xl font-bold text-primary">
                              ${product.base_price.toFixed(2)}
                            </div>
                          )}
                        </div>
                        <Button 
                          onClick={() => handleBuyNow(product)}
                          disabled={loading}
                          className="w-full sm:w-auto group-hover:scale-110 transition-transform duration-300 text-sm md:text-base"
                        >
                          {loading ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <ShoppingCart className="w-4 h-4 mr-2" />
                          )}
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Success Stories Teaser */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="mb-4 text-base md:text-lg px-4 md:px-6 py-2 bg-success/20 text-success border-success/50">
                <TrendingUp className="w-4 h-4 mr-2" />
                Success Stories
              </Badge>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                Join 500+ Families Who Are Now Scam-Proof
              </h2>
              <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 px-4">
                "These guides saved my mother from losing $50,000 to a fake IRS scam. Worth every penny." - Susan M.
              </p>
              <Link to="/about#testimonials">
                <Button size="lg" variant="outline" className="text-sm md:text-base">
                  Read More Success Stories
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Resources;
