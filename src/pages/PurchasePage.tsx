import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  BookOpen,
  ArrowLeft,
  ShoppingCart,
  Users,
  CheckCircle,
  Package,
  Minus,
  Plus,
  Shield,
} from "lucide-react";
import { getBookBySlug } from "@/data/libraryBooks";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

type PurchaseType = "single" | "bulk";

export default function PurchasePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();

  const [purchaseType, setPurchaseType] = useState<PurchaseType>("single");
  const [quantity, setQuantity] = useState(5);
  const [recipientEmails, setRecipientEmails] = useState<string[]>(Array(5).fill(""));

  const book = getBookBySlug(slug || "");

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <SEO title="Book Not Found" description="The requested book was not found." noindex />
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-2">Book Not Found</h1>
            <p className="text-muted-foreground mb-6">We could not find the book you are looking for.</p>
            <Button asChild><Link to="/library">Browse Library</Link></Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const unitPrice = purchaseType === "bulk" && quantity >= 5
    ? (book.bulk_price ?? book.price * 0.75)
    : book.price;
  const totalPrice = unitPrice * (purchaseType === "single" ? 1 : quantity);
  const savings =
    purchaseType === "bulk"
      ? (book.price - unitPrice) * quantity
      : 0;

  const handleQuantityChange = (delta: number) => {
    const newQty = Math.max(5, Math.min(100, quantity + delta));
    setQuantity(newQty);
    setRecipientEmails((prev) => {
      const updated = [...prev];
      while (updated.length < newQty) updated.push("");
      return updated.slice(0, newQty);
    });
  };

  const handleCheckout = () => {
    if (purchaseType === "single") {
      addItem({
        id: book.slug,
        productId: book.slug,
        name: book.title,
        price: book.price,
        image: book.cover_image,
        isDigital: true,
        stripe_price_id: book.stripe_price_id,
      });
      toast({ title: "Added to cart", description: `${book.title} — single copy added.` });
    } else {
      addItem({
        id: `${book.slug}-bulk-${quantity}`,
        productId: `${book.slug}-bulk`,
        name: `${book.title} × ${quantity} copies`,
        price: totalPrice,
        image: book.cover_image,
        isDigital: true,
        stripe_price_id: book.stripe_price_id,
      });
      toast({ title: "Bulk order added", description: `${quantity} copies of ${book.title} added to cart.` });
    }
    navigate("/resources");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={`Purchase ${book.title} | InVision Network`}
        description={`Buy ${book.title} — single copy or bulk order for groups. ${book.subtitle}`}
        canonical={`https://www.invisionnetwork.org/purchase/${book.slug}`}
        noindex={false}
      />
      <Navigation />

      <main id="main-content" tabIndex={-1} className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <span>/</span>
              <Link to="/library" className="hover:text-foreground">Library</Link>
              <span>/</span>
              <Link to={`/resources/${book.slug}`} className="hover:text-foreground truncate max-w-[160px]">
                {book.title}
              </Link>
              <span>/</span>
              <span className="text-foreground">Purchase</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10 max-w-5xl">
          <Button variant="ghost" size="sm" className="gap-2 mb-6" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <h1 className="text-2xl md:text-3xl font-bold mb-2">Complete Your Purchase</h1>
          <p className="text-muted-foreground mb-8">{book.title} — {book.subtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Purchase form */}
            <div className="md:col-span-3 space-y-6">
              {/* Purchase type */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Select Purchase Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={purchaseType}
                    onValueChange={(v) => setPurchaseType(v as PurchaseType)}
                    className="space-y-3"
                  >
                    <div
                      className={`flex items-start gap-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                        purchaseType === "single" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                      }`}
                      onClick={() => setPurchaseType("single")}
                    >
                      <RadioGroupItem value="single" id="single" className="mt-0.5" />
                      <Label htmlFor="single" className="cursor-pointer flex-1">
                        <span className="font-medium">Single Copy</span>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          For personal use — instant access to all chapters.
                        </p>
                        <span className="text-lg font-bold text-primary mt-1 block">
                          ${book.price.toFixed(2)}
                        </span>
                      </Label>
                    </div>

                    <div
                      className={`flex items-start gap-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                        purchaseType === "bulk" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                      }`}
                      onClick={() => setPurchaseType("bulk")}
                    >
                      <RadioGroupItem value="bulk" id="bulk" className="mt-0.5" />
                      <Label htmlFor="bulk" className="cursor-pointer flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Bulk Order</span>
                          <Badge className="text-xs bg-green-500/10 text-green-700 border-green-200">
                            Save {Math.round(((book.price - (book.bulk_price ?? book.price * 0.75)) / book.price) * 100)}% per copy
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          5+ copies for groups, organizations, or gifting.
                        </p>
                        <span className="text-lg font-bold text-primary mt-1 block">
                          ${(book.bulk_price ?? book.price * 0.75).toFixed(2)} <span className="text-sm font-normal text-muted-foreground">/ copy</span>
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Bulk quantity and recipients */}
              {purchaseType === "bulk" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Bulk Order Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div>
                      <Label className="mb-2 block">Number of Copies</Label>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(-1)}
                          disabled={quantity <= 5}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(1)}
                          disabled={quantity >= 100}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-muted-foreground">copies (min. 5)</span>
                      </div>
                    </div>

                    <div>
                      <Label className="mb-2 block">
                        Recipient Emails <span className="text-muted-foreground font-normal">(optional — we'll send access codes)</span>
                      </Label>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {recipientEmails.map((email, idx) => (
                          <Input
                            key={idx}
                            type="email"
                            placeholder={`Recipient ${idx + 1} email`}
                            value={email}
                            onChange={(e) => {
                              const updated = [...recipientEmails];
                              updated[idx] = e.target.value;
                              setRecipientEmails(updated);
                            }}
                            className="text-sm"
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Leave blank to receive all access codes at your own email after purchase.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Security note */}
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                <Shield className="h-4 w-4 mt-0.5 shrink-0" />
                <p>
                  Payments are processed securely by Stripe. InVision Network never stores card numbers.
                  All purchases include a 30-day satisfaction guarantee.
                </p>
              </div>
            </div>

            {/* Order summary */}
            <div className="md:col-span-2">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-base">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-16 rounded bg-primary/10 flex items-center justify-center shrink-0">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm leading-tight">{book.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{book.total_pages} pages</p>
                      {purchaseType === "bulk" && (
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {quantity} copies
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {purchaseType === "single"
                          ? "Price"
                          : `${quantity} × $${unitPrice.toFixed(2)}`}
                      </span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    {savings > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Bulk savings</span>
                        <span>−${savings.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-base">
                    <span>Total</span>
                    <span className="text-primary">${totalPrice.toFixed(2)}</span>
                  </div>

                  <Button className="w-full gap-2 h-11 text-base" onClick={handleCheckout}>
                    <ShoppingCart className="h-4 w-4" />
                    {purchaseType === "single" ? "Buy Now" : `Order ${quantity} Copies`}
                  </Button>

                  <div className="space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                      Instant digital access after payment
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                      30-day satisfaction guarantee
                    </div>
                    {purchaseType === "bulk" && (
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-primary" />
                        Access codes delivered by email
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Questions about bulk orders?{" "}
            <Link to="/contact" className="text-primary underline underline-offset-2">
              Contact us
            </Link>{" "}
            or call{" "}
            <a href="tel:+14074465749" className="text-primary underline underline-offset-2">
              (407) 446-5749
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
