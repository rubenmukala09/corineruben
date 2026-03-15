import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { KeyRound, Plus, RefreshCw, Search, Loader2, Mail, BookOpen, Trash2 } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function BookAccessManager() {
  const [genEmail, setGenEmail] = useState("");
  const [genName, setGenName] = useState("");
  const [genBookIds, setGenBookIds] = useState("");
  const [generating, setGenerating] = useState(false);

  const [resetEmail, setResetEmail] = useState("");
  const [resetting, setResetting] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();

  const { data: purchases, isLoading } = useQuery({
    queryKey: ["book-purchases"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("book_purchases")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return data;
    },
  });

  const filteredPurchases = purchases?.filter(
    (p) =>
      p.customer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.access_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGenerate = async () => {
    if (!genEmail.trim() || !genName.trim()) {
      toast.error("Email and name are required.");
      return;
    }
    setGenerating(true);
    try {
      const bookIds = genBookIds.trim()
        ? genBookIds.split(",").map((b) => b.trim())
        : ["all"];

      const { data, error } = await supabase.functions.invoke("generate-book-access", {
        body: {
          customerEmail: genEmail.trim(),
          customerName: genName.trim(),
          bookIds,
          amountPaid: 0,
        },
      });

      if (error) throw new Error(error.message);
      toast.success(`Access ID generated: ${data.accessId}`);
      setGenEmail("");
      setGenName("");
      setGenBookIds("");
      queryClient.invalidateQueries({ queryKey: ["book-purchases"] });
    } catch (err: any) {
      toast.error(err.message || "Failed to generate Access ID");
    } finally {
      setGenerating(false);
    }
  };

  const handleReset = async () => {
    if (!resetEmail.trim()) {
      toast.error("Email is required.");
      return;
    }
    setResetting(true);
    try {
      const { data, error } = await supabase.functions.invoke("reset-book-access", {
        body: { email: resetEmail.trim() },
      });
      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);
      toast.success(data.message || "Access ID reset successfully.");
      setResetEmail("");
      queryClient.invalidateQueries({ queryKey: ["book-purchases"] });
    } catch (err: any) {
      toast.error(err.message || "Failed to reset Access ID");
    } finally {
      setResetting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to revoke this book access?")) return;
    const { error } = await supabase.from("book_purchases").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete: " + error.message);
    } else {
      toast.success("Access revoked.");
      queryClient.invalidateQueries({ queryKey: ["book-purchases"] });
    }
  };

  return (
    <div className="space-y-6">
      {/* Generate New Access */}
      <Card className="bg-[#111827] border-[#1F2937]">
        <CardHeader>
          <CardTitle className="text-[#F9FAFB] flex items-center gap-2">
            <Plus className="h-5 w-5 text-emerald-400" />
            Generate New Access ID
          </CardTitle>
          <CardDescription className="text-[#9CA3AF]">
            Create a new book access entry and email the Access ID to the user.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input
              placeholder="Customer email"
              value={genEmail}
              onChange={(e) => setGenEmail(e.target.value)}
              className="bg-[#1F2937] border-[#374151] text-[#F9FAFB]"
            />
            <Input
              placeholder="Customer name"
              value={genName}
              onChange={(e) => setGenName(e.target.value)}
              className="bg-[#1F2937] border-[#374151] text-[#F9FAFB]"
            />
            <Input
              placeholder="Book IDs (comma-sep, or leave blank for ALL books)"
              value={genBookIds}
              onChange={(e) => setGenBookIds(e.target.value)}
              className="bg-[#1F2937] border-[#374151] text-[#F9FAFB]"
            />
          </div>
          <Button onClick={handleGenerate} disabled={generating} className="bg-emerald-600 hover:bg-emerald-700">
            {generating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <KeyRound className="h-4 w-4 mr-2" />}
            Generate & Send
          </Button>
        </CardContent>
      </Card>

      {/* Reset Access ID */}
      <Card className="bg-[#111827] border-[#1F2937]">
        <CardHeader>
          <CardTitle className="text-[#F9FAFB] flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-amber-400" />
            Reset Access ID
          </CardTitle>
          <CardDescription className="text-[#9CA3AF]">
            Regenerate a new Access ID for an existing customer and email it to them.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Input
            placeholder="Customer email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            className="bg-[#1F2937] border-[#374151] text-[#F9FAFB] max-w-md"
          />
          <Button onClick={handleReset} disabled={resetting} variant="outline" className="border-amber-500 text-amber-400 hover:bg-amber-500/10">
            {resetting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
            Reset ID
          </Button>
        </CardContent>
      </Card>

      {/* All Access Records */}
      <Card className="bg-[#111827] border-[#1F2937]">
        <CardHeader>
          <CardTitle className="text-[#F9FAFB] flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-400" />
            Book Access Records
          </CardTitle>
          <CardDescription className="text-[#9CA3AF]">
            All issued Access IDs and their associated emails.
          </CardDescription>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
            <Input
              placeholder="Search by email, name, or Access ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-[#1F2937] border-[#374151] text-[#F9FAFB]"
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-[#9CA3AF]" />
            </div>
          ) : !filteredPurchases?.length ? (
            <p className="text-[#6B7280] text-center py-8">No records found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1F2937] text-[#9CA3AF]">
                    <th className="text-left py-2 px-3">Email</th>
                    <th className="text-left py-2 px-3">Name</th>
                    <th className="text-left py-2 px-3">Access ID</th>
                    <th className="text-left py-2 px-3">Books</th>
                    <th className="text-left py-2 px-3">Created</th>
                    <th className="text-left py-2 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPurchases.map((p) => (
                    <tr key={p.id} className="border-b border-[#1F2937]/50 hover:bg-[#1F2937]/30">
                      <td className="py-2 px-3 text-[#D1D5DB]">{p.customer_email}</td>
                      <td className="py-2 px-3 text-[#D1D5DB]">{p.customer_name}</td>
                      <td className="py-2 px-3">
                        <Badge variant="outline" className="font-mono tracking-widest text-emerald-400 border-emerald-500/30">
                          {p.access_id}
                        </Badge>
                      </td>
                      <td className="py-2 px-3 text-[#9CA3AF]">
                        {Array.isArray(p.book_ids) ? p.book_ids.join(", ") : p.book_ids}
                      </td>
                      <td className="py-2 px-3 text-[#6B7280]">
                        {new Date(p.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-3">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-7 w-7 p-0"
                          onClick={() => handleDelete(p.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
