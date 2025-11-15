import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Edit2, Percent, DollarSign, Tag, Truck } from "lucide-react";

interface DiscountCode {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  description: string | null;
  is_active: boolean;
  valid_from: string;
  valid_until: string | null;
  max_uses: number | null;
  current_uses: number;
  service_type: string | null;
  created_at: string;
}

export default function DiscountCodes() {
  const [codes, setCodes] = useState<DiscountCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingCode, setEditingCode] = useState<DiscountCode | null>(null);
  
  const [newCode, setNewCode] = useState({
    code: "",
    type: "percentage",
    value: "",
    appliesTo: "entire",
    minRequirement: "none",
    minAmount: "",
    usageLimit: "unlimited",
    totalUses: "",
    perCustomer: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchDiscountCodes();
  }, []);

  const fetchDiscountCodes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('discount_codes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCodes(data || []);
    } catch (error) {
      console.error('Error fetching discount codes:', error);
      toast.error('Failed to load discount codes');
    } finally {
      setLoading(false);
    }
  };

  const generateCode = () => {
    const randomCode =
      "CODE" +
      Math.random().toString(36).substring(2, 8).toUpperCase();
    setNewCode({ ...newCode, code: randomCode });
  };

  const handleCreateCode = async () => {
    try {
      if (!newCode.code || !newCode.value) {
        toast.error("Please fill in all required fields");
        return;
      }

      const { error } = await supabase.from('discount_codes').insert({
        code: newCode.code,
        type: newCode.type as 'percentage' | 'fixed',
        value: parseFloat(newCode.value),
        is_active: true,
        valid_from: newCode.startDate || new Date().toISOString(),
        valid_until: newCode.endDate || null,
        max_uses: newCode.usageLimit === 'limited' ? parseInt(newCode.totalUses) : null,
        current_uses: 0,
        service_type: newCode.appliesTo === 'entire' ? null : newCode.appliesTo,
      });

      if (error) throw error;

      toast.success("Discount code created successfully!");
      setIsCreating(false);
      setNewCode({
        code: "",
        type: "percentage",
        value: "",
        appliesTo: "entire",
        minRequirement: "none",
        minAmount: "",
        usageLimit: "unlimited",
        totalUses: "",
        perCustomer: "",
        startDate: "",
        endDate: "",
      });
      fetchDiscountCodes();
    } catch (error) {
      console.error('Error creating discount code:', error);
      toast.error('Failed to create discount code');
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "percentage":
        return <Percent className="h-4 w-4" />;
      case "fixed":
        return <DollarSign className="h-4 w-4" />;
      case "shipping":
        return <Truck className="h-4 w-4" />;
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Discount Codes</h3>
          <p className="text-sm text-muted-foreground">
            Create and manage promotional discount codes
          </p>
        </div>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Discount Code
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Discount Code</DialogTitle>
              <DialogDescription>
                Set up a new promotional discount code
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="code">Discount Code</Label>
                <div className="flex gap-2">
                  <Input
                    id="code"
                    value={newCode.code}
                    onChange={(e) =>
                      setNewCode({ ...newCode, code: e.target.value.toUpperCase() })
                    }
                    placeholder="SUMMER25"
                    className="uppercase"
                  />
                  <Button variant="outline" onClick={generateCode}>
                    Generate
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Discount Type</Label>
                <RadioGroup
                  value={newCode.type}
                  onValueChange={(value) => setNewCode({ ...newCode, type: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="percentage" id="percentage" />
                    <Label htmlFor="percentage">Percentage Off</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fixed" id="fixed" />
                    <Label htmlFor="fixed">Fixed Amount Off</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="shipping" id="shipping" />
                    <Label htmlFor="shipping">Free Shipping</Label>
                  </div>
                </RadioGroup>
              </div>

              {newCode.type !== "shipping" && (
                <div className="space-y-2">
                  <Label htmlFor="value">
                    {newCode.type === "percentage" ? "Percentage" : "Amount"}
                  </Label>
                  <Input
                    id="value"
                    type="number"
                    value={newCode.value}
                    onChange={(e) => setNewCode({ ...newCode, value: e.target.value })}
                    placeholder={newCode.type === "percentage" ? "10" : "10.00"}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>Minimum Requirements</Label>
                <RadioGroup
                  value={newCode.minRequirement}
                  onValueChange={(value) =>
                    setNewCode({ ...newCode, minRequirement: value })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="none" />
                    <Label htmlFor="none">No minimum</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="amount" id="amount" />
                    <Label htmlFor="amount">Minimum purchase amount</Label>
                  </div>
                </RadioGroup>
                {newCode.minRequirement === "amount" && (
                  <Input
                    type="number"
                    value={newCode.minAmount}
                    onChange={(e) =>
                      setNewCode({ ...newCode, minAmount: e.target.value })
                    }
                    placeholder="50.00"
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label>Usage Limits</Label>
                <RadioGroup
                  value={newCode.usageLimit}
                  onValueChange={(value) =>
                    setNewCode({ ...newCode, usageLimit: value })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unlimited" id="unlimited" />
                    <Label htmlFor="unlimited">Unlimited uses</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="limited" id="limited" />
                    <Label htmlFor="limited">Limit total uses</Label>
                  </div>
                </RadioGroup>
                {newCode.usageLimit === "limited" && (
                  <Input
                    type="number"
                    value={newCode.totalUses}
                    onChange={(e) =>
                      setNewCode({ ...newCode, totalUses: e.target.value })
                    }
                    placeholder="100"
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date (optional)</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newCode.startDate}
                    onChange={(e) =>
                      setNewCode({ ...newCode, startDate: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date (optional)</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newCode.endDate}
                    onChange={(e) =>
                      setNewCode({ ...newCode, endDate: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCode}>Create Discount Code</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Uses</TableHead>
              <TableHead>Valid Dates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {codes.map((code) => (
              <TableRow key={code.id}>
                <TableCell className="font-mono font-bold">{code.code}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(code.type)}
                    <span className="capitalize">{code.type}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {code.type === "percentage" ? `${code.value}%` : `$${code.value}`}
                </TableCell>
                <TableCell>{code.current_uses}{code.max_uses ? ` / ${code.max_uses}` : " / ∞"}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{new Date(code.valid_from).toLocaleDateString()}</div>
                    <div className="text-muted-foreground">{code.valid_until ? new Date(code.valid_until).toLocaleDateString() : 'No end date'}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={code.is_active ? "default" : "secondary"}>
                    {code.is_active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
