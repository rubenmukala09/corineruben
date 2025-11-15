import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Printer, Eye, MoreVertical, Download, TrendingUp, DollarSign, ShoppingCart, AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Mock data
const mockOrders = [
  {
    id: "1",
    orderNumber: "ORD-2024-0001",
    customer: { name: "John Smith", avatar: null, email: "john@example.com" },
    items: 3,
    total: 149.0,
    paymentStatus: "paid",
    fulfillmentStatus: "unfulfilled",
    date: "2025-01-15T14:30:00",
    itemImages: ["/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: "2",
    orderNumber: "ORD-2024-0002",
    customer: { name: "Sarah Johnson", avatar: null, email: "sarah@example.com" },
    items: 2,
    total: 79.98,
    paymentStatus: "paid",
    fulfillmentStatus: "fulfilled",
    date: "2025-01-15T12:15:00",
    itemImages: ["/placeholder.svg"],
  },
  {
    id: "3",
    orderNumber: "ORD-2024-0003",
    customer: { name: "Mike Davis", avatar: null, email: "mike@example.com" },
    items: 1,
    total: 29.0,
    paymentStatus: "pending",
    fulfillmentStatus: "unfulfilled",
    date: "2025-01-15T10:45:00",
    itemImages: ["/placeholder.svg"],
  },
];

const OrdersList = () => {
  const navigate = useNavigate();
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getPaymentStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; icon: string; label: string }> = {
      paid: { variant: "success", icon: "✓", label: "Paid" },
      pending: { variant: "outline", icon: "⏱", label: "Pending" },
      refunded: { variant: "secondary", icon: "↩", label: "Refunded" },
      failed: { variant: "destructive", icon: "✗", label: "Failed" },
    };
    const config = variants[status] || variants.pending;
    return (
      <Badge variant={config.variant}>
        {config.icon} {config.label}
      </Badge>
    );
  };

  const getFulfillmentStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; icon: string; label: string }> = {
      fulfilled: { variant: "success", icon: "✓", label: "Fulfilled" },
      unfulfilled: { variant: "outline", icon: "⚠", label: "Unfulfilled" },
      partial: { variant: "default", icon: "◐", label: "Partially Fulfilled" },
      cancelled: { variant: "secondary", icon: "✗", label: "Cancelled" },
    };
    const config = variants[status] || variants.unfulfilled;
    return (
      <Badge variant={config.variant}>
        {config.icon} {config.label}
      </Badge>
    );
  };

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "unfulfilled") return matchesSearch && order.fulfillmentStatus === "unfulfilled";
    if (activeTab === "fulfilled") return matchesSearch && order.fulfillmentStatus === "fulfilled";
    if (activeTab === "pending") return matchesSearch && order.paymentStatus === "pending";
    
    return matchesSearch;
  });

  const unfulfilledCount = mockOrders.filter((o) => o.fulfillmentStatus === "unfulfilled").length;
  const todaysOrders = mockOrders.length;
  const todaysRevenue = mockOrders.reduce((sum, o) => sum + o.total, 0);
  const avgOrderValue = todaysRevenue / todaysOrders;

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4">
          <div className="mt-4 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Orders</h1>
              <p className="text-muted-foreground">Manage and fulfill customer orders</p>
            </div>
            <Button variant="outline">
              <Package className="mr-2 h-4 w-4" />
              Create Manual Order
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Low Stock Alert */}
        <Alert className="mb-6 border-yellow-500">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <AlertDescription className="flex items-center justify-between">
            <div>
              <strong>⚠️ Low Stock Alert</strong>
              <p className="mt-1 text-sm">3 products need restocking</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Order Supplies
              </Button>
              <Button variant="ghost" size="sm">
                Dismiss
              </Button>
            </div>
          </AlertDescription>
        </Alert>

        {/* Quick Stats */}
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Orders</p>
                <p className="text-2xl font-bold">{todaysOrders}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-primary" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Revenue</p>
                <p className="text-2xl font-bold">${todaysRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Order Value</p>
                <p className="text-2xl font-bold">${avgOrderValue.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-accent" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">To Fulfill</p>
                <p className="text-2xl font-bold text-yellow-500">{unfulfilledCount}</p>
              </div>
              <Package className="h-8 w-8 text-yellow-500" />
            </div>
          </Card>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search orders by #, customer, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Payment Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="highest">Highest Amount</SelectItem>
              <SelectItem value="lowest">Lowest Amount</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Bulk Actions */}
        {selectedOrders.length > 0 && (
          <div className="mb-4 flex items-center gap-4 rounded-lg border bg-muted p-4">
            <span className="font-medium">{selectedOrders.length} orders selected</span>
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print Packing Slips
            </Button>
            <Button variant="outline" size="sm">
              Mark as Fulfilled
            </Button>
            <Button variant="outline" size="sm">
              Export Selected
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setSelectedOrders([])}>
              Clear Selection
            </Button>
          </div>
        )}

        {/* Orders Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="unfulfilled">
              Unfulfilled
              {unfulfilledCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unfulfilledCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="fulfilled">Fulfilled</TabsTrigger>
            <TabsTrigger value="pending">Pending Payment</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedOrders.length === filteredOrders.length}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedOrders(filteredOrders.map((o) => o.id));
                          } else {
                            setSelectedOrders([]);
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead>Order #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Fulfillment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow
                      key={order.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => navigate(`/admin/ecommerce/orders/${order.id}`)}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedOrders.includes(order.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedOrders([...selectedOrders, order.id]);
                            } else {
                              setSelectedOrders(selectedOrders.filter((id) => id !== order.id));
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <span className="font-bold">{order.orderNumber}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={order.customer.avatar || undefined} />
                            <AvatarFallback>
                              {order.customer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{order.customer.name}</div>
                            <div className="text-xs text-muted-foreground">{order.customer.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{order.items} items</span>
                          <div className="flex -space-x-2">
                            {order.itemImages.slice(0, 3).map((img, i) => (
                              <img
                                key={i}
                                src={img}
                                alt=""
                                className="h-6 w-6 rounded-full border-2 border-background"
                              />
                            ))}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-lg font-bold">${order.total.toFixed(2)}</span>
                      </TableCell>
                      <TableCell>{getPaymentStatusBadge(order.paymentStatus)}</TableCell>
                      <TableCell>{getFulfillmentStatusBadge(order.fulfillmentStatus)}</TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">
                            {new Date(order.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(order.date).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate(`/admin/ecommerce/orders/${order.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Printer className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                              <DropdownMenuItem>Mark as Fulfilled</DropdownMenuItem>
                              <DropdownMenuItem>Email Customer</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Cancel Order</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            {filteredOrders.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <Package className="h-16 w-16 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No Orders Found</h3>
                <p className="text-muted-foreground">Orders from customers will appear here</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OrdersList;
