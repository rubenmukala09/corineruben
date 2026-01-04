import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Download, Eye, Mail, Plus, DollarSign } from "lucide-react";

interface ClientBillingTabProps {
  clientId: number;
}

export function ClientBillingTab({ clientId }: ClientBillingTabProps) {
  const [statusFilter, setStatusFilter] = useState("all");

  // Placeholder - will be fetched from Stripe/database
  const invoices: Array<{ id: string; date: string; description: string; amount: number; status: string }> = [];

  const filteredInvoices = statusFilter === "all" 
    ? invoices 
    : invoices.filter(inv => inv.status === statusFilter);

  const getStatusBadge = (status: string) => {
    const variants = {
      paid: { variant: "success" as const, icon: "✓", text: "Paid" },
      pending: { variant: "default" as const, icon: "⏱", text: "Pending" },
      overdue: { variant: "destructive" as const, icon: "⚠", text: "Overdue" },
    };
    const config = variants[status as keyof typeof variants];
    return (
      <Badge variant={config.variant}>
        {config.icon} {config.text}
      </Badge>
    );
  };

  const totalPaid = invoices.filter(i => i.status === "paid").reduce((sum, i) => sum + i.amount, 0);
  const outstanding = invoices.filter(i => i.status !== "paid").reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalPaid.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${outstanding === 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${outstanding.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Feb 15</div>
            <p className="text-sm text-muted-foreground">$149</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Payment Method on File</CardTitle>
            <Button variant="outline" size="sm">Update Payment Method</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <CreditCard className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="font-semibold">•••• •••• •••• 4242</p>
              <p className="text-sm text-muted-foreground">Expires: 12/2026</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Billing Information</CardTitle>
            <Button variant="outline" size="sm">Edit Billing Info</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Billing Email</p>
            <p className="font-medium text-muted-foreground">Not configured</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Billing Address</p>
            <p className="font-medium text-muted-foreground">Not configured</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Invoices</CardTitle>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Invoices</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export to CSV
              </Button>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Generate New Invoice
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium font-mono">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.description}</TableCell>
                  <TableCell className="font-semibold">${invoice.amount}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {invoices.some(i => i.status === "pending" || i.status === "overdue") && (
            <div className="mt-4 flex justify-end">
              <Button variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Send Payment Reminder
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button variant="outline" size="lg">
          <DollarSign className="mr-2 h-4 w-4" />
          Record Manual Payment
        </Button>
      </div>
    </div>
  );
}
