import { useState } from "react";
import { AlertTriangle, Package, TrendingDown, TrendingUp, Plus, Minus, Download, Upload, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock inventory data
const mockInventory = [
  {
    id: "1",
    name: "USB Data Blocker 2-Pack",
    sku: "USB-BLOCK-02",
    image: "/placeholder.svg",
    currentStock: 5,
    reserved: 2,
    threshold: 10,
    lastUpdated: "2025-01-15T10:00:00",
  },
  {
    id: "2",
    name: "Webcam Privacy Covers 3-pack",
    sku: "CAM-COVER-03",
    image: "/placeholder.svg",
    currentStock: 8,
    reserved: 1,
    threshold: 10,
    lastUpdated: "2025-01-14T15:30:00",
  },
  {
    id: "3",
    name: "RFID-Blocking Card Sleeves 5-pack",
    sku: "RFID-SLEEVE-05",
    image: "/placeholder.svg",
    currentStock: 3,
    reserved: 0,
    threshold: 10,
    lastUpdated: "2025-01-13T09:15:00",
  },
  {
    id: "4",
    name: "Password Notebook Hardcover",
    sku: "PASS-BOOK-HC",
    image: "/placeholder.svg",
    currentStock: 45,
    reserved: 5,
    threshold: 10,
    lastUpdated: "2025-01-15T14:20:00",
  },
];

const InventoryManagement = () => {
  const [adjustModalOpen, setAdjustModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [adjustmentType, setAdjustmentType] = useState("add");
  const [adjustmentQuantity, setAdjustmentQuantity] = useState("");
  const [adjustmentReason, setAdjustmentReason] = useState("");
  const [adjustmentNotes, setAdjustmentNotes] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const getStockStatus = (available: number, threshold: number) => {
    if (available === 0) return { label: "Out of Stock", color: "destructive", icon: "✗" };
    if (available <= threshold) return { label: "Low Stock", color: "outline", icon: "⚠" };
    return { label: "In Stock", color: "success", icon: "✓" };
  };

  const openAdjustModal = (product: any) => {
    setSelectedProduct(product);
    setAdjustModalOpen(true);
    setAdjustmentQuantity("");
    setAdjustmentReason("");
    setAdjustmentNotes("");
  };

  const quickAdjust = (product: any, amount: number) => {
    console.log(`Quick adjust ${product.name} by ${amount}`);
    // In real app, this would update the database
  };

  const lowStockProducts = mockInventory.filter(
    (item) => item.currentStock - item.reserved <= item.threshold && item.currentStock - item.reserved > 0
  );
  const outOfStockProducts = mockInventory.filter((item) => item.currentStock - item.reserved === 0);

  const filteredInventory = mockInventory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4">
          <div className="mt-4 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Inventory Management</h1>
              <p className="text-muted-foreground">Track and manage product stock levels</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Import CSV
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Low Stock Alert */}
        {lowStockProducts.length > 0 && (
          <Alert className="mb-6 border-yellow-500">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <div>
                  <strong>⚠️ Low Stock Alert</strong>
                  <p className="mt-1 text-sm">{lowStockProducts.length} products need restocking:</p>
                  <ul className="mt-2 list-disc pl-5 text-sm">
                    {lowStockProducts.map((product) => (
                      <li key={product.id}>
                        {product.name} ({product.currentStock - product.reserved} remaining)
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Order Supplies
                  </Button>
                  <Button variant="ghost" size="sm">
                    Dismiss
                  </Button>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Stats */}
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold">{mockInventory.length}</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Stock</p>
                <p className="text-2xl font-bold text-success">
                  {mockInventory.filter((i) => i.currentStock - i.reserved > i.threshold).length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-500">{lowStockProducts.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
                <p className="text-2xl font-bold text-destructive">{outOfStockProducts.length}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-destructive" />
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products by name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Stock Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="low">Low Stock</SelectItem>
              <SelectItem value="out">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Inventory Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Reserved</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Threshold</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => {
                const available = item.currentStock - item.reserved;
                const status = getStockStatus(available, item.threshold);
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="h-10 w-10 rounded object-cover" />
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                    <TableCell className="font-semibold">{item.currentStock}</TableCell>
                    <TableCell className="text-muted-foreground">{item.reserved}</TableCell>
                    <TableCell>
                      <span className={`font-semibold ${available <= 0 ? "text-destructive" : ""}`}>
                        {available}
                      </span>
                    </TableCell>
                    <TableCell>{item.threshold}</TableCell>
                    <TableCell>
                      <Badge variant={status.color as any}>
                        {status.icon} {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(item.lastUpdated).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => quickAdjust(item, 1)}
                          title="Add 1"
                        >
                          +1
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => quickAdjust(item, 5)}
                          title="Add 5"
                        >
                          +5
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openAdjustModal(item)}
                        >
                          Adjust
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Adjust Stock Modal */}
      <Dialog open={adjustModalOpen} onOpenChange={setAdjustModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Stock: {selectedProduct?.name}</DialogTitle>
            <DialogDescription>Update inventory levels and track changes</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-3 gap-4 rounded-lg border p-3">
              <div>
                <p className="text-sm text-muted-foreground">Current Stock</p>
                <p className="text-lg font-bold">{selectedProduct?.currentStock}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reserved</p>
                <p className="text-lg font-bold">{selectedProduct?.reserved}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-lg font-bold">
                  {selectedProduct ? selectedProduct.currentStock - selectedProduct.reserved : 0}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Adjustment</Label>
              <RadioGroup value={adjustmentType} onValueChange={setAdjustmentType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="add" id="add" />
                  <Label htmlFor="add" className="flex items-center gap-2">
                    <Plus className="h-4 w-4 text-success" />
                    Add Stock
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="remove" id="remove" />
                  <Label htmlFor="remove" className="flex items-center gap-2">
                    <Minus className="h-4 w-4 text-destructive" />
                    Remove Stock
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                placeholder="Enter quantity"
                value={adjustmentQuantity}
                onChange={(e) => setAdjustmentQuantity(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason</Label>
              <Select value={adjustmentReason} onValueChange={setAdjustmentReason}>
                <SelectTrigger id="reason">
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="received-shipment">Received shipment</SelectItem>
                  <SelectItem value="damaged">Damaged/Lost</SelectItem>
                  <SelectItem value="correction">Inventory count correction</SelectItem>
                  <SelectItem value="return">Return/Refund</SelectItem>
                  <SelectItem value="theft">Theft/Shrinkage</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional details..."
                value={adjustmentNotes}
                onChange={(e) => setAdjustmentNotes(e.target.value)}
                rows={3}
              />
            </div>

            {adjustmentQuantity && (
              <div className="rounded-lg border bg-muted p-3">
                <p className="text-sm font-medium">New Stock Level:</p>
                <p className="text-2xl font-bold">
                  {selectedProduct &&
                    (adjustmentType === "add"
                      ? selectedProduct.currentStock + parseInt(adjustmentQuantity)
                      : selectedProduct.currentStock - parseInt(adjustmentQuantity))}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAdjustModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setAdjustModalOpen(false)}>Update Stock</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryManagement;
