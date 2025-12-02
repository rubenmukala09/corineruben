import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import { FreeResourcesSection } from "@/components/FreeResourcesSection";
import { ExternalSecurityArticles } from "@/components/ExternalSecurityArticles";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, Shield, ShoppingCart, Star, TrendingUp, Tag } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import heroResourcesMarketplace from "@/assets/hero-resources-marketplace.jpg";
import heroResourcesNew from "@/assets/hero-resources-new.jpg";
import heroResources from "@/assets/hero-resources.jpg";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";

function Resources() {
  const { addItem } = useCart();
  const { toast } = useToast();

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

  const handleAddToCart = (product: any) => {
    const price = product.sale_price || product.base_price;
    const image = product.images?.[0] || product.featured_image_url;
    
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: price,
      image: image
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" }
        ]}
      />
      <Navigation />
      
      <Hero
        backgroundImages={resourcesHeroImages}
        headline="Your Digital Safety Arsenal"
        subheadline="Premium guides, tools, and products to protect what matters most"
        showScrollIndicator={true}
      />

      <TrustBar />

      {/* Quick Navigation Pills */}
      <section className="py-6 md:py-8 bg-secondary/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('guides')}
                className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm md:text-base"
              >
                Digital Guides
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('products')}
                className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm md:text-base"
              >
                Physical Products
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('free-resources')}
                className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm md:text-base"
              >
                <Tag className="w-4 h-4 mr-2" />
                Free Resources
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Digital Guides Section */}
      <section id="guides" className="py-8 md:py-12 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-6">
              <Badge className="mb-2 text-sm md:text-base px-3 md:px-4 py-1.5" variant="secondary">
                <Download className="w-3 h-3 mr-2" />
                Instant Digital Download
              </Badge>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Digital Security Guides
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Expert knowledge delivered instantly
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {isLoading ? (
              // Loading skeletons
              [...Array(8)].map((_, i) => (
                <Card key={i} className="p-3">
                  <Skeleton className="w-full aspect-[16/10] rounded-lg mb-2" />
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-12 w-full mb-2" />
                  <Skeleton className="h-8 w-full" />
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
              digitalProducts.map((product, index) => {
                const image = product.images?.[0] || product.featured_image_url;
                const price = product.sale_price || product.base_price;
                const hasDiscount = product.sale_price && product.sale_price < product.base_price;

                return (
                  <ScrollReveal key={product.id} delay={index * 50}>
                    <Card className="group p-3 hover:shadow-xl transition-all duration-300 hover:scale-102 border border-border/50 hover:border-primary/50 relative overflow-hidden">
                      {product.is_featured && (
                        <Badge className="absolute top-2 right-2 text-[10px] z-10">
                          Featured
                        </Badge>
                      )}

                      {/* Product Image */}
                      {image ? (
                        <div className="mb-2 rounded-md overflow-hidden aspect-[16/10] bg-gradient-to-br from-secondary to-muted">
                          <img 
                            src={image} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="mb-2 rounded-md aspect-[16/10] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                          <Download className="w-8 h-8 text-primary" />
                        </div>
                      )}

                      {/* Veterans Badge */}
                      <Badge variant="outline" className="mb-2 text-[10px] py-0.5 px-2">
                        <Shield className="w-2.5 h-2.5 mr-1" />
                        Veterans 10% Off
                      </Badge>

                      <h3 className="text-base md:text-lg font-bold mb-1.5 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3 leading-snug line-clamp-2">
                        {product.description}
                      </p>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1.5 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-2.5 h-2.5 ${i < Math.floor(product.rating_average || 0) ? 'fill-amber-400 text-amber-400' : 'text-muted'}`} />
                          ))}
                        </div>
                        <span className="text-[10px] text-muted-foreground">
                          {product.rating_average?.toFixed(1) || '0.0'}
                        </span>
                      </div>

                      <div className="flex items-end justify-between gap-2 pt-2 border-t border-border">
                        <div>
                          <div className="text-xl font-bold text-primary">
                            ${(hasDiscount ? price : product.base_price).toFixed(2)}
                          </div>
                          {hasDiscount && (
                            <div className="text-[10px] text-muted-foreground line-through">
                              ${product.base_price.toFixed(2)}
                            </div>
                          )}
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          className="text-xs"
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    </Card>
                  </ScrollReveal>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Physical Products Section */}
      <section id="products" className="py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-6">
              <Badge className="mb-2 text-sm md:text-base px-3 md:px-4 py-1.5" variant="secondary">
                <Shield className="w-3 h-3 mr-2" />
                Ships Within 2-3 Business Days
              </Badge>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Physical Security Products
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Curated hardware for your safety
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {isLoading ? (
              // Loading skeletons
              [...Array(8)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="w-full aspect-square" />
                  <div className="p-3">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-8 w-full" />
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
              physicalProducts.map((product, index) => {
                const image = product.images?.[0] || product.featured_image_url;
                const price = product.sale_price || product.base_price;
                const hasDiscount = product.sale_price && product.sale_price < product.base_price;

                return (
                  <ScrollReveal key={product.id} delay={index * 50}>
                    <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-102 border border-border/50 hover:border-primary/50 overflow-hidden">
                      {/* Product Image */}
                      <div className="aspect-square bg-gradient-to-br from-secondary to-muted flex items-center justify-center relative overflow-hidden">
                        {image ? (
                          <img 
                            src={image} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <Shield className="w-16 h-16 text-muted-foreground/30 group-hover:scale-110 transition-transform duration-300" />
                        )}
                        {product.stock_quantity !== null && product.stock_quantity < 10 && (
                          <Badge variant="destructive" className="absolute top-2 right-2 text-[10px]">
                            {product.stock_quantity} left
                          </Badge>
                        )}
                        {hasDiscount && (
                          <Badge className="absolute top-2 left-2 bg-success text-[10px]">
                            SALE
                          </Badge>
                        )}
                      </div>
                      
                      <div className="p-3">
                        {/* Veterans Badge */}
                        <Badge variant="outline" className="mb-2 text-[10px] py-0.5 px-2">
                          <Shield className="w-2.5 h-2.5 mr-1" />
                          Veterans 10% Off
                        </Badge>

                        <h3 className="text-base font-bold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-1.5 mb-3">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-2.5 h-2.5 ${i < Math.floor(product.rating_average || 0) ? 'fill-amber-400 text-amber-400' : 'text-muted'}`} />
                            ))}
                          </div>
                          <span className="text-[10px] text-muted-foreground">
                            {product.rating_average?.toFixed(1) || '0.0'}
                          </span>
                        </div>

                        <div className="flex items-end justify-between gap-2 pt-2 border-t border-border">
                          <div>
                            <div className="text-xl font-bold text-primary">
                              ${(hasDiscount ? price : product.base_price).toFixed(2)}
                            </div>
                            {hasDiscount && (
                              <div className="text-[10px] text-muted-foreground line-through">
                                ${product.base_price.toFixed(2)}
                              </div>
                            )}
                          </div>
                          <Button 
                            size="sm"
                            onClick={() => handleAddToCart(product)}
                            className="text-xs"
                          >
                            <ShoppingCart className="w-3 h-3 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </ScrollReveal>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Latest Security Articles Section */}
      <section className="py-8 md:py-12 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-6">
              <Badge className="mb-2 text-sm md:text-base px-3 md:px-4 py-1.5" variant="secondary">
                <TrendingUp className="w-3 h-3 mr-2" />
                Latest Security Articles
              </Badge>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                Stay Informed on Current Threats
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Curated security news and alerts from trusted sources
              </p>
            </div>
          </ScrollReveal>

          <ExternalSecurityArticles />
        </div>
      </section>

      {/* Free Resources Section */}
      <FreeResourcesSection />

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