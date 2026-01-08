import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const threatData = [
  { name: "Mon", blocked: 120, detected: 140 },
  { name: "Tue", blocked: 180, detected: 200 },
  { name: "Wed", blocked: 150, detected: 170 },
  { name: "Thu", blocked: 200, detected: 220 },
  { name: "Fri", blocked: 170, detected: 190 },
  { name: "Sat", blocked: 90, detected: 100 },
  { name: "Sun", blocked: 80, detected: 95 },
];

const categoryData = [
  { name: "Phishing", value: 450 },
  { name: "Malware", value: 300 },
  { name: "Ransomware", value: 150 },
  { name: "Scam", value: 200 },
  { name: "Spam", value: 380 },
];

export default function CyberAnalytics() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#F9FAFB]">Analytics Overview</h1>
        <p className="text-[#9CA3AF]">Security metrics and threat intelligence</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Threats Blocked", value: "1,234", change: "+12%", up: true },
          { label: "Protection Rate", value: "99.2%", change: "+0.5%", up: true },
          { label: "Active Devices", value: "5", change: "+1", up: true },
          { label: "Response Time", value: "32ms", change: "-8ms", up: true },
        ].map((stat) => (
          <Card key={stat.label} className="bg-[#111827] border-gray-800">
            <CardContent className="p-6">
              <p className="text-[#9CA3AF] text-sm">{stat.label}</p>
              <div className="flex items-end justify-between mt-2">
                <p className="text-3xl font-bold text-[#F9FAFB]">{stat.value}</p>
                <div className={`flex items-center gap-1 ${stat.up ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.up ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span className="text-sm">{stat.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-[#F9FAFB]">Weekly Threat Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={threatData}>
                <defs>
                  <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDetected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#F9FAFB' }}
                />
                <Area type="monotone" dataKey="detected" stroke="#F97316" strokeWidth={2} fill="url(#colorDetected)" />
                <Area type="monotone" dataKey="blocked" stroke="#3B82F6" strokeWidth={2} fill="url(#colorBlocked)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-[#F9FAFB]">Threats by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#F9FAFB' }}
                />
                <Bar dataKey="value" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
