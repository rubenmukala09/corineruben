import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen, ShoppingCart, Percent, Search, CheckCircle,
  MessageSquarePlus, Star, Library, Sparkles, Lock, CreditCard
} from "lucide-react";
import { BOOK_CATALOG, BOOK_AUTHOR, type BookItem } from "@/config/bookCatalog";
import { RequestBookDialog } from "./RequestBookDialog";

interface InternalLibraryProps {
  ownedBookIds: string[];
  onBuy: (book: BookItem) => void;
  onRead: (bookId: string) => void;
  email: string;
  customerName: string;
}

const CATEGORY_MAP: Record<string, string> = {
  all: "All Titles",
  ai: "AI Safety",
  scam: "Scam Prevention",
  family: "Family",
  seniors: "Seniors",
  privacy: "Privacy",
  social: "Social",
  finance: "Finance",
  business: "Business",
  tech: "Technology",
};

const HOW_IT_WORKS = [
  { icon: ShoppingCart, title: "Choose a Title", desc: "Browse our catalog of 30+ expert guides" },
  { icon: CreditCard, title: "Secure Checkout", desc: "Pay safely with 5% reader discount applied" },
  { icon: Lock, title: "Get Access ID", desc: "Receive your unique reading credentials via email" },
  { icon: BookOpen, title: "Read Online", desc: "Open any purchased book instantly in your browser" },
];

export function InternalLibrary({ ownedBookIds, onBuy, onRead, email, customerName }: InternalLibraryProps) {
  const [search, setSearch] = useState("");
  const [requestOpen, setRequestOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const ownedSet = useMemo(() => new Set(ownedBookIds), [ownedBookIds]);

  const filtered = useMemo(() => {
    let books = BOOK_CATALOG;

    // Category filter
    if (activeCategory !== "all") {
      books = books.filter((b) => b.category === activeCategory);
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      books = books.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q) ||
          b.tag.toLowerCase().includes(q)
      );
    }

    // Sort: owned first, then alphabetical
    return [...books].sort((a, b) => {
      const aOwned = ownedSet.has(a.id) ? 0 : 1;
      const bOwned = ownedSet.has(b.id) ? 0 : 1;
      if (aOwned !== bOwned) return aOwned - bOwned;
      return a.name.localeCompare(b.name);
    });
  }, [search, activeCategory, ownedSet]);

  const totalSavings = useMemo(() => {
    const ownedBooks = BOOK_CATALOG.filter((b) => ownedSet.has(b.id));
    return ownedBooks.reduce((sum, b) => sum + b.price * 0.05, 0).toFixed(2);
  }, [ownedSet]);

  const categories = useMemo(() => {
    const cats = new Set(BOOK_CATALOG.map((b) => b.category));
    return ["all", ...Array.from(cats).sort()];
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Library className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Reader Library</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            {BOOK_CATALOG.length} titles available with your exclusive
            <span className="font-semibold text-primary"> 5% reader discount</span>
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="sm" onClick={() => setRequestOpen(true)} className="shrink-0">
            <MessageSquarePlus className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Suggest</span>
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-border/40 bg-card p-3 text-center">
          <div className="text-2xl font-black text-foreground">{BOOK_CATALOG.length}</div>
          <div className="text-[11px] text-muted-foreground font-medium">Total Titles</div>
        </div>
        <div className="rounded-xl border border-border/40 bg-card p-3 text-center">
          <div className="text-2xl font-black text-primary">{ownedBookIds.length}</div>
          <div className="text-[11px] text-muted-foreground font-medium">Books Owned</div>
        </div>
        <div className="rounded-xl border border-border/40 bg-card p-3 text-center">
          <div className="text-2xl font-black text-accent-foreground">${totalSavings}</div>
          <div className="text-[11px] text-muted-foreground font-medium">Total Savings</div>
        </div>
      </div>

      {/* How It Works */}
      <div className="rounded-xl border border-border/40 bg-card/50 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-bold text-foreground">How It Works</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {HOW_IT_WORKS.map((step, i) => (
            <div key={step.title} className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <step.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-xs font-semibold text-foreground">{i + 1}. {step.title}</div>
                <div className="text-[10px] text-muted-foreground leading-tight">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="w-full justify-start flex-wrap h-auto gap-1.5 bg-muted/50 p-1.5">
          {categories.map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {CATEGORY_MAP[cat] || cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Book Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filtered.map((book) => {
          const owned = ownedSet.has(book.id);
          const discountedPrice = (book.price * 0.95).toFixed(2);

          return (
            <Card
              key={book.id}
              className="overflow-hidden group relative border-border/40 hover:border-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Cover */}
              <div className="aspect-[3/4] overflow-hidden relative">
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  draggable={false}
                  loading="lazy"
                  width={240}
                  height={320}
                />

                {/* Owned overlay */}
                {owned && (
                  <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                    <Badge className="bg-primary text-primary-foreground shadow-lg">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Owned
                    </Badge>
                  </div>
                )}

                {/* Discount badge */}
                {!owned && (
                  <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground text-[10px] shadow-sm">
                    <Percent className="h-2.5 w-2.5 mr-0.5" />
                    5% OFF
                  </Badge>
                )}

                {/* Tag badge */}
                <Badge
                  variant="secondary"
                  className="absolute top-2 left-2 text-[9px] bg-background/80 backdrop-blur-sm border-0"
                >
                  {book.tag}
                </Badge>

                {/* Quick-read overlay for owned books */}
                {owned && (
                  <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground text-xs shadow-lg"
                      onClick={() => onRead(book.id)}
                    >
                      <BookOpen className="h-3 w-3 mr-1" />
                      Read Now
                    </Button>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-2.5">
                <h3 className="font-semibold text-xs line-clamp-2 text-foreground">{book.name}</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{book.description}</p>

                {/* Author */}
                <p className="text-[9px] text-muted-foreground/70 mt-1 truncate">
                  {book.author}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-0.5 mt-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-2.5 w-2.5 ${
                        s <= 4 ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                  <span className="text-[9px] text-muted-foreground ml-1">4.0</span>
                </div>

                {owned ? (
                  <Button
                    size="sm"
                    variant="default"
                    className="w-full mt-2 text-xs h-8"
                    onClick={() => onRead(book.id)}
                  >
                    <BookOpen className="h-3 w-3 mr-1" />
                    Read
                  </Button>
                ) : (
                  <>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-[10px] line-through text-muted-foreground">${book.price}</span>
                      <span className="text-sm font-bold text-primary">${discountedPrice}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full mt-1.5 text-xs h-8 hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => onBuy(book)}
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Buy — ${discountedPrice}
                    </Button>
                  </>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">No books found</h3>
          <p className="text-sm text-muted-foreground">Try a different search term or category.</p>
        </div>
      )}

      <RequestBookDialog
        open={requestOpen}
        onOpenChange={setRequestOpen}
        email={email}
        customerName={customerName}
      />
    </div>
  );
}
