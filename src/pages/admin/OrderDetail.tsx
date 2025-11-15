import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Printer, Mail, Package, X, MapPin, CreditCard, Clock, CheckCircle, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Mock order data
const mockOrder = {
  id: "1",
  orderNumber: "ORD-2024-0001",
  date: "2025-01-15T14:30:00",
  paymentStatus: "paid",
  fulfillmentStatus: "unfulfilled",
  customer: {
    name: "John Smith",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
  },
  shippingAddress: {
    street: "123 Main Street",
    city: "Dayton",
    state: "OH",
    zip: "45402",
    country: "United States",
  },
  billingAddress: {
    sameAsShipping: true,
  },
  items: [
    {
      id: "1",
      name: "USB Data Blocker 2-Pack",
      variant: null,
      quantity: 2,
      price: 12.99,
      image: "/placeholder.svg",
      type: "physical",
      fulfilled: false,
    },
    {
      id: "2",
      name: "Scam-Proof Playbook",
      variant: null,
      quantity: 1,
      price: 29.0,
      image: "/placeholder.svg",
      type: "digital",
      downloads: 2,
    },
  ],
  payment: {
    method: "Visa ****4242",
    transactionId: "ch_3abc123def456",
    gateway: "Stripe",
    amount: 149.0,
  },
  summary: {
    subtotal: 119.97,
    shipping: 8.99,
    tax: 10.24,
    discount: 10.0,
    discountCode: "SAVE10",
    total: 129.2,
  },
  timeline: [
    { type: "created", description: "Order placed", timestamp: "2025-01-15T14:30:00", user: "Customer" },
    { type: "paid", description: "Payment received", timestamp: "2025-01-15T14:31:00", user: "System" },
  ],
  notes: [
    { id: "1", text: "Customer requested gift wrapping", timestamp: "2025-01-15T14:35:00", user: "Admin" },
  ],
};

const OrderDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [refundType, setRefundType] = useState("full");
  const [refundAmount, setRefundAmount] = useState("");
  const [note, setNote] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4">
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/admin/ecommerce/orders")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">{mockOrder.orderNumber}</h1>
                <p className="text-sm text-muted-foreground">
                  {new Date(mockOrder.date).toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant={mockOrder.paymentStatus === "paid" ? "success" : "outline"}>
                  {mockOrder.paymentStatus}
                </Badge>
                <Badge variant={mockOrder.fulfillmentStatus === "fulfilled" ? "success" : "outline"}>
                  {mockOrder.fulfillmentStatus}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Printer className="mr-2 h-4 w-4" />
                Print Packing Slip
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="mr-2 h-4 w-4" />
                Print Invoice
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Email Customer
              </Button>
              <Button variant="outline" size="sm" onClick={() => setRefundModalOpen(true)}>
                Refund Order
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Order Items</h2>
              <div className="space-y-4">
                {mockOrder.items.map((item) => (
                  <div key={item.id} className="flex gap-4 rounded-lg border p-4">
                    <img src={item.image} alt={item.name} className="h-20 w-20 rounded object-cover" />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      {item.variant && <p className="text-sm text-muted-foreground">{item.variant}</p>}
                      <div className="mt-2 flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                        <span className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</span>
                        <span className="font-medium">${(item.quantity * item.price).toFixed(2)}</span>
                      </div>
                      
                      {item.type === "physical" && (
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <Checkbox id={`fulfilled-${item.id}`} checked={item.fulfilled} />
                            <Label htmlFor={`fulfilled-${item.id}`} className="text-sm">
                              Mark as fulfilled
                            </Label>
                          </div>
                          {!item.fulfilled && (
                            <div className="flex gap-2">
                              <Input placeholder="Tracking number" className="text-sm" />
                              <Select>
                                <SelectTrigger className="w-32">
                                  <SelectValue placeholder="Carrier" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="usps">USPS</SelectItem>
                                  <SelectItem value="ups">UPS</SelectItem>
                                  <SelectItem value="fedex">FedEx</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button size="sm">Add Tracking</Button>
                            </div>
                          )}
                        </div>
                      )}

                      {item.type === "digital" && (
                        <div className="mt-3">
                          <Button variant="outline" size="sm">
                            Resend Download Link
                          </Button>
                          <p className="mt-1 text-xs text-muted-foreground">Downloaded {item.downloads} times</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Order Timeline */}
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Order Timeline</h2>
              <div className="space-y-4">
                {mockOrder.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                        {event.type === "created" && <Package className="h-4 w-4 text-primary-foreground" />}
                        {event.type === "paid" && <CheckCircle className="h-4 w-4 text-primary-foreground" />}
                        {event.type === "shipped" && <Truck className="h-4 w-4 text-primary-foreground" />}
                      </div>
                      {index < mockOrder.timeline.length - 1 && <div className="h-full w-0.5 bg-border" />}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-medium">{event.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.timestamp).toLocaleString()} • {event.user}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Internal Notes */}
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Internal Notes</h2>
              <div className="space-y-4">
                {mockOrder.notes.map((note) => (
                  <div key={note.id} className="rounded-lg border p-3">
                    <p className="text-sm">{note.text}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(note.timestamp).toLocaleString()} • {note.user}
                    </p>
                  </div>
                ))}
                <Textarea
                  placeholder="Add note about this order..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <Button size="sm">Add Note</Button>
              </div>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Customer Information */}
            <Card className="p-4">
              <h3 className="mb-3 font-semibold">Customer Information</h3>
              <div className="space-y-2">
                <p className="font-medium">{mockOrder.customer.name}</p>
                <a href={`mailto:${mockOrder.customer.email}`} className="block text-sm text-primary hover:underline">
                  {mockOrder.customer.email}
                </a>
                <a href={`tel:${mockOrder.customer.phone}`} className="block text-sm text-primary hover:underline">
                  {mockOrder.customer.phone}
                </a>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  View Customer Profile
                </Button>
              </div>
            </Card>

            {/* Shipping Address */}
            <Card className="p-4">
              <div className="mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <h3 className="font-semibold">Shipping Address</h3>
              </div>
              <div className="space-y-1 text-sm">
                <p>{mockOrder.shippingAddress.street}</p>
                <p>
                  {mockOrder.shippingAddress.city}, {mockOrder.shippingAddress.state}{" "}
                  {mockOrder.shippingAddress.zip}
                </p>
                <p>{mockOrder.shippingAddress.country}</p>
              </div>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View on Map
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
              </div>
            </Card>

            {/* Billing Address */}
            <Card className="p-4">
              <h3 className="mb-3 font-semibold">Billing Address</h3>
              {mockOrder.billingAddress.sameAsShipping ? (
                <p className="text-sm text-muted-foreground">Same as shipping address</p>
              ) : (
                <div className="space-y-1 text-sm">{/* Billing address details */}</div>
              )}
            </Card>

            {/* Payment Information */}
            <Card className="p-4">
              <div className="mb-3 flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <h3 className="font-semibold">Payment Information</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Method:</span>
                  <span className="font-medium">{mockOrder.payment.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction ID:</span>
                  <span className="text-xs">{mockOrder.payment.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gateway:</span>
                  <span>{mockOrder.payment.gateway}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant="success">Paid ✓</Badge>
                </div>
              </div>
            </Card>

            {/* Order Summary */}
            <Card className="p-4">
              <h3 className="mb-3 font-semibold">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>${mockOrder.summary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span>${mockOrder.summary.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax:</span>
                  <span>${mockOrder.summary.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-success">
                  <span>Discount ({mockOrder.summary.discountCode}):</span>
                  <span>-${mockOrder.summary.discount.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${mockOrder.summary.total.toFixed(2)}</span>
                </div>
              </div>
            </Card>

            {/* Fulfillment */}
            {mockOrder.fulfillmentStatus === "unfulfilled" && (
              <Card className="p-4">
                <h3 className="mb-3 font-semibold">Fulfillment</h3>
                <Button className="w-full">Mark All as Fulfilled</Button>
                <div className="mt-3 flex items-center gap-2">
                  <Checkbox id="notify-customer" defaultChecked />
                  <Label htmlFor="notify-customer" className="text-sm">
                    Notify customer
                  </Label>
                </div>
              </Card>
            )}

            {/* Refund */}
            {mockOrder.paymentStatus === "paid" && (
              <Card className="p-4">
                <h3 className="mb-3 font-semibold">Refund</h3>
                <Button variant="outline" className="w-full" onClick={() => setRefundModalOpen(true)}>
                  Issue Refund
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Refund Modal */}
      <Dialog open={refundModalOpen} onOpenChange={setRefundModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Issue Refund for {mockOrder.orderNumber}</DialogTitle>
            <DialogDescription>Process a refund for this order</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Refund Amount</Label>
              <RadioGroup value={refundType} onValueChange={setRefundType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full" id="full" />
                  <Label htmlFor="full">Full Refund (${mockOrder.summary.total.toFixed(2)})</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="partial" id="partial" />
                  <Label htmlFor="partial">Partial Refund</Label>
                </div>
              </RadioGroup>
              {refundType === "partial" && (
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                />
              )}
            </div>

            <div className="space-y-2">
              <Label>Reason</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer-request">Customer request</SelectItem>
                  <SelectItem value="damaged">Item damaged</SelectItem>
                  <SelectItem value="not-received">Item not received</SelectItem>
                  <SelectItem value="wrong-item">Wrong item sent</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="restock" defaultChecked />
                <Label htmlFor="restock">Restock items</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="notify" defaultChecked />
                <Label htmlFor="notify">Notify customer</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRefundModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setRefundModalOpen(false)}>Issue Refund</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderDetail;
