import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Grid3x3, List, Search, Download, Package, AlertTriangle, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

// Mock data - replace with actual API calls
const mockProducts = [
  {
    id: "1",
    name: "USB Data Blocker 2-Pack",
    category: "physical",
    price: 12.99,
    stock: 45,
    status: "active",
    sales: 127,
    image: "/placeholder.svg",
    dateAdded: "2025-01-15",
  },
  {
    id: "2",
    name: "Scam-Proof Playbook",
    category: "digital",
    price: 29.0,
    stock: null,
    status: "active",
    sales: 89,
    image: "/placeholder.svg",
    dateAdded: "2025-01-10",
  },
  {
    id: "3",
    name: "Webcam Privacy Covers 3-pack",
    category: "physical",
    price: 8.99,
    stock: 8,
    status: "active",
    sales: 203,
    image: "/placeholder.svg",
    dateAdded: "2025-01-08",
  },
  {
    id: "4",
    name: "Caregivers' Security Guide",
    category: "digital",
    price: 24.0,
    stock: null,
    status: "active",
    sales: 56,
    image: "/placeholder.svg",
    dateAdded: "2025-01-05",
  },
];

const ProductsList = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStockStatus = (stock: number | null) => {
    if (stock === null) return { label: "Digital", color: "bg-blue-500" };
    if (stock === 0) return { label: "Out of Stock", color: "bg-destructive" };
    if (stock <= 10) return { label: "Low Stock", color: "bg-yellow-500" };
    return { label: "In Stock", color: "bg-success" };
  };

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || product.status === statusFilter;
    
    let matchesStock = true;
    if (stockFilter === "in-stock") matchesStock = product.stock !== null && product.stock > 10;
    if (stockFilter === "low") matchesStock = product.stock !== null && product.stock > 0 && product.stock <= 10;
    if (stockFilter === "out") matchesStock = product.stock === 0;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesStock;
  });

  const totalProducts = mockProducts.length;
  const activeProducts = mockProducts.filter((p) => p.status === "active").length;
  const lowStockProducts = mockProducts.filter((p) => p.stock !== null && p.stock <= 10 && p.stock > 0).length;
  const totalValue = mockProducts.reduce((sum, p) => sum + (p.stock || 0) * p.price, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4">
          <div className="mt-4 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Products</h1>
              <p className="text-muted-foreground">Manage your product catalog</p>
            </div>
            <Button onClick={() => navigate("/admin/ecommerce/products/new")} size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Add New Product
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold">{totalProducts}</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-success">{activeProducts}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-500">{lowStockProducts}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">${totalValue.toFixed(2)}</p>
              </div>
              <Download className="h-8 w-8 text-accent" />
            </div>
          </Card>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="digital">Digital</SelectItem>
              <SelectItem value="physical">Physical</SelectItem>
            </SelectContent>
          </Select>

          <Select value={stockFilter} onValueChange={setStockFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Stock Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stock</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="low">Low Stock</SelectItem>
              <SelectItem value="out">Out of Stock</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Products Display */}
        {viewMode === "grid" ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => {
              const stockStatus = getStockStatus(product.stock);
              return (
                <Card
                  key={product.id}
                  className="cursor-pointer overflow-hidden transition-all hover:shadow-lg"
                  onClick={() => navigate(`/admin/ecommerce/products/${product.id}`)}
                >
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <h3 className="font-semibold">{product.name}</h3>
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedProducts([...selectedProducts, product.id]);
                          } else {
                            setSelectedProducts(selectedProducts.filter((id) => id !== product.id));
                          }
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <div className="mb-3 flex items-center gap-2">
                      <Badge variant={product.category === "digital" ? "default" : "secondary"}>
                        {product.category === "digital" ? "Digital" : "Physical"}
                      </Badge>
                      <Badge variant={product.status === "active" ? "success" : "outline"}>
                        {product.status}
                      </Badge>
                    </div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                      <div className="flex items-center gap-1">
                        <div className={`h-2 w-2 rounded-full ${stockStatus.color}`} />
                        <span className="text-sm text-muted-foreground">
                          {product.stock !== null ? `${product.stock} units` : stockStatus.label}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {product.sales} sales
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock);
                  return (
                    <TableRow
                      key={product.id}
                      className="cursor-pointer"
                      onClick={() => navigate(`/admin/ecommerce/products/${product.id}`)}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedProducts([...selectedProducts, product.id]);
                            } else {
                              setSelectedProducts(selectedProducts.filter((id) => id !== product.id));
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-10 w-10 rounded object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>
                        <Badge variant={product.category === "digital" ? "default" : "secondary"}>
                          {product.category === "digital" ? "Digital" : "Physical"}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">${product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${stockStatus.color}`} />
                          <span>{product.stock !== null ? product.stock : "N/A"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.status === "active" ? "success" : "outline"}>
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{product.sales}</TableCell>
                      <TableCell>{product.dateAdded}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        )}

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <Package className="h-16 w-16 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No Products Found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or add a new product</p>
            <Button className="mt-4" onClick={() => navigate("/admin/ecommerce/products/new")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
