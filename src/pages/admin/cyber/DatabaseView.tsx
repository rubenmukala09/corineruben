import { Database, RefreshCw, Download, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface DatabaseStat {
  id: number;
  name: string;
  records: string;
  lastUpdate: string;
  size: string;
  status: string;
}

export default function DatabaseView() {
  const [databases, setDatabases] = useState<DatabaseStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({ records: 0, storage: "Calculating..." });

  useEffect(() => {
    loadDatabaseStats();
  }, []);

  const loadDatabaseStats = async () => {
    try {
      // Get actual counts from key tables
      const [profiles, threats, activity, subscriptions, newsletters] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("threat_events").select("*", { count: "exact", head: true }),
        supabase.from("activity_log").select("*", { count: "exact", head: true }),
        supabase.from("subscriptions").select("*", { count: "exact", head: true }),
        supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }),
      ]);

      const dbStats: DatabaseStat[] = [
        { 
          id: 1, 
          name: "Threat Events", 
          records: (threats.count || 0).toLocaleString(), 
          lastUpdate: "Live", 
          size: "—", 
          status: "Synced" 
        },
        { 
          id: 2, 
          name: "User Profiles", 
          records: (profiles.count || 0).toLocaleString(), 
          lastUpdate: "Live", 
          size: "—", 
          status: "Synced" 
        },
        { 
          id: 3, 
          name: "Activity Logs", 
          records: (activity.count || 0).toLocaleString(), 
          lastUpdate: "Live", 
          size: "—", 
          status: "Synced" 
        },
        { 
          id: 4, 
          name: "Subscriptions", 
          records: (subscriptions.count || 0).toLocaleString(), 
          lastUpdate: "Live", 
          size: "—", 
          status: "Synced" 
        },
        { 
          id: 5, 
          name: "Newsletter Subscribers", 
          records: (newsletters.count || 0).toLocaleString(), 
          lastUpdate: "Live", 
          size: "—", 
          status: "Synced" 
        },
      ];

      const totalRecords = (threats.count || 0) + (profiles.count || 0) + 
        (activity.count || 0) + (subscriptions.count || 0) + (newsletters.count || 0);

      setDatabases(dbStats);
      setTotals({ records: totalRecords, storage: "Cloud-managed" });
    } catch (err) {
      console.error("Error loading database stats:", err);
      setDatabases([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#F9FAFB]">Database</h1>
          <p className="text-[#9CA3AF]">Security databases and threat intelligence</p>
        </div>
        <Button className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white">
          <RefreshCw className="h-4 w-4 mr-2" />
          Sync All
        </Button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-[#111827] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <HardDrive className="h-5 w-5 text-[#06B6D4]" />
              <span className="text-[#9CA3AF]">Total Storage</span>
            </div>
            <p className="text-3xl font-bold text-[#F9FAFB]">{totals.storage}</p>
            <p className="text-xs text-[#9CA3AF] mt-1">Managed by Lovable Cloud</p>
          </CardContent>
        </Card>
        <Card className="bg-[#111827] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Database className="h-5 w-5 text-[#10B981]" />
              <span className="text-[#9CA3AF]">Total Records</span>
            </div>
            <p className="text-3xl font-bold text-[#F9FAFB]">
              {loading ? "..." : totals.records.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-[#111827] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <RefreshCw className="h-5 w-5 text-[#F59E0B]" />
              <span className="text-[#9CA3AF]">Last Full Sync</span>
            </div>
            <p className="text-3xl font-bold text-[#F9FAFB]">Live</p>
            <p className="text-xs text-[#9CA3AF] mt-1">Real-time sync</p>
          </CardContent>
        </Card>
      </div>

      {/* Database List */}
      <Card className="bg-[#111827] border-gray-800">
        <CardHeader>
          <CardTitle className="text-[#F9FAFB]">Database Collections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {databases.map((db) => (
              <div key={db.id} className="flex items-center justify-between p-4 rounded-lg bg-[#1F2937] border border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-[#3B82F6]/20 to-[#06B6D4]/20">
                    <Database className="h-5 w-5 text-[#06B6D4]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#F9FAFB]">{db.name}</p>
                    <p className="text-sm text-[#9CA3AF]">{db.records} records • {db.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-[#9CA3AF]">Last updated</p>
                    <p className="text-sm text-[#F9FAFB]">{db.lastUpdate}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    db.status === 'Syncing' ? 'text-yellow-400 bg-yellow-500/10' : 'text-green-400 bg-green-500/10'
                  }`}>
                    {db.status}
                  </span>
                  <Button variant="ghost" size="icon" className="text-[#9CA3AF] hover:text-[#F9FAFB]">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
