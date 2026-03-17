import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Copy, Users, DollarSign, Share2, Gift } from "lucide-react";

export default function ReferralDashboard() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: referralCode } = useQuery({
    queryKey: ["my-referral-code", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("referral_codes")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: referrals } = useQuery({
    queryKey: ["my-referrals", referralCode?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("referral_tracking")
        .select("*")
        .eq("referral_code_id", referralCode!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!referralCode,
  });

  const createCode = useMutation({
    mutationFn: async () => {
      const code = `INV-${user!.id.substring(0, 4).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      const { error } = await supabase.from("referral_codes").insert({ user_id: user!.id, code });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Referral code created!");
      queryClient.invalidateQueries({ queryKey: ["my-referral-code"] });
    },
    onError: () => toast.error("Failed to create referral code"),
  });

  const copyCode = () => {
    if (referralCode) {
      navigator.clipboard.writeText(`${window.location.origin}?ref=${referralCode.code}`);
      toast.success("Referral link copied!");
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Referral Program</h1>
        <p className="text-muted-foreground">Earn rewards by referring friends and colleagues</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{referralCode?.total_referrals || 0}</p>
              <p className="text-sm text-muted-foreground">Total Referrals</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <Gift className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{referralCode?.successful_referrals || 0}</p>
              <p className="text-sm text-muted-foreground">Successful</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">${referralCode?.total_earnings || "0.00"}</p>
              <p className="text-sm text-muted-foreground">Total Earnings</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" /> Your Referral Link
          </CardTitle>
        </CardHeader>
        <CardContent>
          {referralCode ? (
            <div className="flex gap-2">
              <Input readOnly value={`${window.location.origin}?ref=${referralCode.code}`} className="font-mono" />
              <Button onClick={copyCode}><Copy className="h-4 w-4 mr-2" /> Copy</Button>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-4">Generate your unique referral code to start earning rewards.</p>
              <Button onClick={() => createCode.mutate()} disabled={createCode.isPending}>
                {createCode.isPending ? "Creating..." : "Generate Referral Code"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {referrals && referrals.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Referral History</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {referrals.map((r: any) => (
                <div key={r.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{r.referred_email}</p>
                    <p className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-medium ${r.status === "converted" ? "text-green-600" : "text-muted-foreground"}`}>
                      {r.status}
                    </span>
                    {r.reward_amount > 0 && <p className="text-xs text-green-600">+${r.reward_amount}</p>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
