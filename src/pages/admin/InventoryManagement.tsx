import { useState } from "react";
import {
  AlertTriangle,
  Package,
  TrendingDown,
  TrendingUp,
  Plus,
  Minus,
  Download,
  Upload,
  Search,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

const InventoryManagement = () => {
  const { toast } = useToast();
  const [adjustModalOpen, setAdjustModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [adjustmentType, setAdjustmentType] = useState("add");
  const [adjustmentQuantity, setAdjustmentQuantity] = useState("");
  const [adjustmentReason, setAdjustmentReason] = useState("");
  const [adjustmentNotes, setAdjustmentNotes] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch products with inventory data
  const {
    data: inventory = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("name");

      if (error) throw error;

      return data.map((product) => ({
        id: product.id,
        name: product.name,
        sku: product.sku,
        image: product.image_url || "/placeholder.svg",
        currentStock: product.stock_quantity || 0,
        reserved: 0,
        threshold: product.low_stock_threshold || 10,
        lastUpdated: product.updated_at,
      }));
    },
  });

  const getStockStatus = (available: number, threshold: number) => {
    if (available === 0)
      return { label: "Out of Stock", color: "destructive", icon: "✗" };
    if (available <= threshold)
      return { label: "Low Stock", color: "outline", icon: "⚠" };
    return { label: "In Stock", color: "success", icon: "✓" };
  };

  const openAdjustModal = (product: any) => {
    setSelectedProduct(product);
    setAdjustModalOpen(true);
    setAdjustmentQuantity("");
    setAdjustmentReason("");
    setAdjustmentNotes("");
  };

  const quickAdjust = async (product: any, amount: number) => {
    const newQuantity = product.currentStock + amount;

    const { error } = await supabase
      .from("products")
      .update({ stock_quantity: newQuantity })
      .eq("id", product.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to adjust stock",
        variant: "destructive",
      });
      return;
    }

    await supabase.from("inventory_movements").insert({
      product_id: product.id,
      quantity: Math.abs(amount),
      previous_quantity: product.currentStock,
      new_quantity: newQuantity,
      movement_type: amount > 0 ? "adjustment_add" : "adjustment_remove",
      notes: "Quick adjustment",
    });

    toast({
      title: "Stock Updated",
      description: `${product.name} stock adjusted by ${amount}`,
    });

    refetch();
  };

  const lowStockProducts = inventory.filter(
    (item) =>
      item.currentStock - item.reserved <= item.threshold &&
      item.currentStock - item.reserved > 0,
  );
  const outOfStockProducts = inventory.filter(
    (item) => item.currentStock - item.reserved === 0,
  );

  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#F9FAFB]">
            Inventory Management
          </h1>
          <p className="text-[#9CA3AF]">
            Track and manage product stock levels
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-gray-700 hover:bg-gray-800"
          >
            <Upload className="mr-2 h-4 w-4" />
            Import CSV
          </Button>
          <Button
            variant="outline"
            className="border-gray-700 hover:bg-gray-800"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <Alert className="mb-6 border-yellow-500/50 bg-yellow-500/10">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <div>
                <strong className="text-yellow-400">⚠️ Low Stock Alert</strong>
                <p className="mt-1 text-sm text-slate-300">
                  {lowStockProducts.length} products need restocking:
                </p>
                <ul className="mt-2 list-disc pl-5 text-sm text-slate-400">
                  {lowStockProducts.slice(0, 3).map((product) => (
                    <li key={product.id}>
                      {product.name} ({product.currentStock - product.reserved}{" "}
                      remaining)
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-700"
                >
                  Order Supplies
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Stats */}
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Card className="p-4 bg-slate-800/50 border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Total Products</p>
              <p className="text-2xl font-bold text-white">
                {inventory.length}
              </p>
            </div>
            <Package className="h-8 w-8 text-cyan-400" />
          </div>
        </Card>
        <Card className="p-4 bg-slate-800/50 border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">In Stock</p>
              <p className="text-2xl font-bold text-green-400">
                {
                  inventory.filter(
                    (i) => i.currentStock - i.reserved > i.threshold,
                  ).length
                }
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-400" />
          </div>
        </Card>
        <Card className="p-4 bg-slate-800/50 border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-400">
                {lowStockProducts.length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-400" />
          </div>
        </Card>
        <Card className="p-4 bg-slate-800/50 border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Out of Stock</p>
              <p className="text-2xl font-bold text-red-400">
                {outOfStockProducts.length}
              </p>
            </div>
            <TrendingDown className="h-8 w-8 text-red-400" />
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search products by name or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-800/50 border-slate-700 text-white"
          />
        </div>
        <Select>
          <SelectTrigger className="w-[180px] bg-slate-800/50 border-slate-700 text-white">
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
      <Card className="bg-slate-800/50 border-slate-700">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700 hover:bg-slate-800/50">
              <TableHead className="text-slate-300">Product</TableHead>
              <TableHead className="text-slate-300">SKU</TableHead>
              <TableHead className="text-slate-300">Current Stock</TableHead>
              <TableHead className="text-slate-300">Reserved</TableHead>
              <TableHead className="text-slate-300">Available</TableHead>
              <TableHead className="text-slate-300">Threshold</TableHead>
              <TableHead className="text-slate-300">Status</TableHead>
              <TableHead className="text-slate-300">Last Updated</TableHead>
              <TableHead className="text-slate-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.map((item) => {
              const available = item.currentStock - item.reserved;
              const status = getStockStatus(available, item.threshold);
              return (
                <TableRow
                  key={item.id}
                  className="border-slate-700 hover:bg-slate-800/50"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-10 w-10 rounded object-cover"
                      />
                      <span className="font-medium text-white">
                        {item.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-slate-400">
                    {item.sku}
                  </TableCell>
                  <TableCell className="font-semibold text-white">
                    {item.currentStock}
                  </TableCell>
                  <TableCell className="text-slate-400">
                    {item.reserved}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`font-semibold ${available <= 0 ? "text-red-400" : "text-white"}`}
                    >
                      {available}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-400">
                    {item.threshold}
                  </TableCell>
                  <TableCell>
                    <Badge variant={status.color as any}>
                      {status.icon} {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-slate-400">
                    {new Date(item.lastUpdated).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => quickAdjust(item, 1)}
                        title="Add 1"
                        className="border-slate-700"
                      >
                        +1
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => quickAdjust(item, 5)}
                        title="Add 5"
                        className="border-slate-700"
                      >
                        +5
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openAdjustModal(item)}
                        className="border-slate-700"
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

      {/* Adjust Stock Modal */}
      <Dialog open={adjustModalOpen} onOpenChange={setAdjustModalOpen}>
        <DialogContent className="bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">
              Adjust Stock: {selectedProduct?.name}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Update inventory levels and track changes
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-3 gap-4 rounded-lg border border-slate-700 p-3">
              <div>
                <p className="text-sm text-slate-400">Current Stock</p>
                <p className="text-lg font-bold text-white">
                  {selectedProduct?.currentStock}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Reserved</p>
                <p className="text-lg font-bold text-white">
                  {selectedProduct?.reserved}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Available</p>
                <p className="text-lg font-bold text-white">
                  {selectedProduct
                    ? selectedProduct.currentStock - selectedProduct.reserved
                    : 0}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Adjustment</Label>
              <RadioGroup
                value={adjustmentType}
                onValueChange={setAdjustmentType}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="add" id="add" />
                  <Label
                    htmlFor="add"
                    className="flex items-center gap-2 text-slate-300"
                  >
                    <Plus className="h-4 w-4 text-green-400" />
                    Add Stock
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="remove" id="remove" />
                  <Label
                    htmlFor="remove"
                    className="flex items-center gap-2 text-slate-300"
                  >
                    <Minus className="h-4 w-4 text-red-400" />
                    Remove Stock
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-slate-300">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                placeholder="Enter quantity"
                value={adjustmentQuantity}
                onChange={(e) => setAdjustmentQuantity(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason" className="text-slate-300">
                Reason
              </Label>
              <Select
                value={adjustmentReason}
                onValueChange={setAdjustmentReason}
              >
                <SelectTrigger
                  id="reason"
                  className="bg-slate-800 border-slate-700 text-white"
                >
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="received-shipment">
                    Received shipment
                  </SelectItem>
                  <SelectItem value="damaged">Damaged/Lost</SelectItem>
                  <SelectItem value="correction">
                    Inventory count correction
                  </SelectItem>
                  <SelectItem value="return">Return/Refund</SelectItem>
                  <SelectItem value="theft">Theft/Shrinkage</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-slate-300">
                Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                placeholder="Add any additional details..."
                value={adjustmentNotes}
                onChange={(e) => setAdjustmentNotes(e.target.value)}
                rows={3}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            {adjustmentQuantity && (
              <div className="rounded-lg border border-slate-700 bg-slate-800 p-3">
                <p className="text-sm font-medium text-slate-300">
                  New Stock Level:
                </p>
                <p className="text-2xl font-bold text-white">
                  {selectedProduct &&
                    (adjustmentType === "add"
                      ? selectedProduct.currentStock +
                        parseInt(adjustmentQuantity)
                      : selectedProduct.currentStock -
                        parseInt(adjustmentQuantity))}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAdjustModalOpen(false)}
              className="border-slate-700"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setAdjustModalOpen(false)}
              className="bg-cyan-600 hover:bg-cyan-700"
            >
              Update Stock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryManagement;
