import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Calendar, 
  DollarSign, 
  Briefcase, 
  MessageSquare,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";

interface FormSubmissionStats {
  formType: string;
  count: number;
  lastSubmission: string | null;
  icon: React.ReactNode;
  color: string;
}

interface RecentSubmission {
  id: string;
  type: string;
  email?: string;
  name?: string;
  created_at: string;
  status?: string;
}

export const FormSubmissionMonitor = () => {
  const [stats, setStats] = useState<FormSubmissionStats[]>([]);
  const [recentSubmissions, setRecentSubmissions] = useState<RecentSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hourlyTrend, setHourlyTrend] = useState<'up' | 'down' | 'stable'>('stable');

  useEffect(() => {
    fetchSubmissionData();
    
    // Refresh every 60 seconds
    const interval = setInterval(fetchSubmissionData, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchSubmissionData = async () => {
    try {
      const now = new Date();
      const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const lastHour = new Date(now.getTime() - 60 * 60 * 1000);
      const previousHour = new Date(now.getTime() - 2 * 60 * 60 * 1000);

      // Fetch counts for each form type (last 24h)
      const [
        bookingResult,
        donationResult,
        jobAppResult,
        inquiryResult,
        testimonialResult
      ] = await Promise.all([
        supabase
          .from('booking_requests')
          .select('id, created_at, email, full_name, status', { count: 'exact' })
          .gte('created_at', last24h.toISOString())
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('donations')
          .select('id, created_at, email, donor_name', { count: 'exact' })
          .gte('created_at', last24h.toISOString())
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('job_applications')
          .select('id, created_at, email, full_name, status', { count: 'exact' })
          .gte('created_at', last24h.toISOString())
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('website_inquiries')
          .select('id, created_at, email, name, status', { count: 'exact' })
          .gte('created_at', last24h.toISOString())
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('testimonials')
          .select('id, created_at, email, name, status', { count: 'exact' })
          .gte('created_at', last24h.toISOString())
          .order('created_at', { ascending: false })
          .limit(5)
      ]);

      // Build stats
      const formStats: FormSubmissionStats[] = [
        {
          formType: 'Booking Requests',
          count: bookingResult.count || 0,
          lastSubmission: bookingResult.data?.[0]?.created_at || null,
          icon: <Calendar className="h-4 w-4" />,
          color: 'text-blue-500'
        },
        {
          formType: 'Donations',
          count: donationResult.count || 0,
          lastSubmission: donationResult.data?.[0]?.created_at || null,
          icon: <DollarSign className="h-4 w-4" />,
          color: 'text-green-500'
        },
        {
          formType: 'Job Applications',
          count: jobAppResult.count || 0,
          lastSubmission: jobAppResult.data?.[0]?.created_at || null,
          icon: <Briefcase className="h-4 w-4" />,
          color: 'text-purple-500'
        },
        {
          formType: 'Website Inquiries',
          count: inquiryResult.count || 0,
          lastSubmission: inquiryResult.data?.[0]?.created_at || null,
          icon: <MessageSquare className="h-4 w-4" />,
          color: 'text-orange-500'
        },
        {
          formType: 'Testimonials',
          count: testimonialResult.count || 0,
          lastSubmission: testimonialResult.data?.[0]?.created_at || null,
          icon: <FileText className="h-4 w-4" />,
          color: 'text-pink-500'
        }
      ];

      setStats(formStats);

      // Build recent submissions list
      const allSubmissions: RecentSubmission[] = [
        ...(bookingResult.data || []).map(b => ({
          id: b.id,
          type: 'Booking',
          email: b.email,
          name: b.full_name,
          created_at: b.created_at,
          status: b.status
        })),
        ...(donationResult.data || []).map(d => ({
          id: d.id,
          type: 'Donation',
          email: d.email,
          name: d.donor_name,
          created_at: d.created_at
        })),
        ...(jobAppResult.data || []).map(j => ({
          id: j.id,
          type: 'Application',
          email: j.email,
          name: j.full_name,
          created_at: j.created_at,
          status: j.status
        })),
        ...(inquiryResult.data || []).map(i => ({
          id: i.id,
          type: 'Inquiry',
          email: i.email,
          name: i.name,
          created_at: i.created_at,
          status: i.status
        })),
        ...(testimonialResult.data || []).map(t => ({
          id: t.id,
          type: 'Testimonial',
          email: t.email,
          name: t.name,
          created_at: t.created_at,
          status: t.status
        }))
      ];

      // Sort by created_at descending
      allSubmissions.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setRecentSubmissions(allSubmissions.slice(0, 10));

      // Calculate hourly trend
      const currentHourCount = allSubmissions.filter(
        s => new Date(s.created_at) >= lastHour
      ).length;

      const previousHourCount = allSubmissions.filter(
        s => new Date(s.created_at) >= previousHour && new Date(s.created_at) < lastHour
      ).length;

      if (currentHourCount > previousHourCount * 1.5) {
        setHourlyTrend('up');
      } else if (currentHourCount < previousHourCount * 0.5) {
        setHourlyTrend('down');
      } else {
        setHourlyTrend('stable');
      }

      // Alert if high volume detected
      const totalLastHour = currentHourCount;
      if (totalLastHour > 20) {
        toast.warning(`High form submission volume: ${totalLastHour} in the last hour`);
      }

    } catch (error) {
      console.error('Error fetching submission data:', error);
      toast.error('Failed to load form submission data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchSubmissionData();
  };

  const getTrendIcon = () => {
    switch (hourlyTrend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    
    const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "secondary",
      approved: "default",
      rejected: "destructive",
      completed: "default",
      new: "outline"
    };

    return (
      <Badge variant={statusColors[status] || "outline"} className="text-xs">
        {status}
      </Badge>
    );
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      Booking: 'bg-blue-500',
      Donation: 'bg-green-500',
      Application: 'bg-purple-500',
      Inquiry: 'bg-orange-500',
      Testimonial: 'bg-pink-500'
    };
    return colors[type] || 'bg-muted';
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <RefreshCw className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-2">Loading form submission data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalSubmissions = stats.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Form Submission Monitor
          </h2>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            {getTrendIcon()}
            <span>Hourly trend</span>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.formType}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.formType}</CardTitle>
              <span className={stat.color}>{stat.icon}</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.count}</div>
              <p className="text-xs text-muted-foreground">
                {stat.lastSubmission 
                  ? `Last: ${new Date(stat.lastSubmission).toLocaleTimeString()}`
                  : 'No submissions'
                }
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              Total Submissions (24h)
              {totalSubmissions > 50 && (
                <Badge variant="secondary">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  High Volume
                </Badge>
              )}
            </CardTitle>
            <span className="text-3xl font-bold">{totalSubmissions}</span>
          </div>
        </CardHeader>
      </Card>

      {/* Recent Submissions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentSubmissions.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No form submissions in the last 24 hours
              </p>
            ) : (
              recentSubmissions.map((submission) => (
                <div
                  key={`${submission.type}-${submission.id}`}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${getTypeColor(submission.type)}`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {submission.type}
                        </Badge>
                        <span className="font-medium text-sm">
                          {submission.name || 'Anonymous'}
                        </span>
                        {getStatusBadge(submission.status)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {submission.email || 'No email'}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(submission.created_at).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
