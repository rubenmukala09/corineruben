 import { cn } from "@/lib/utils";
 import { TrendingUp, Users, Shield, Award } from "lucide-react";
 
 interface StatItem {
   icon: React.ReactNode;
   value: string;
   label: string;
   trend?: string;
 }
 
 interface PremiumStatsWidgetProps {
   className?: string;
 }
 
 /**
  * Premium floating glassmorphism stats widget
  */
 export const PremiumStatsWidget = ({ className }: PremiumStatsWidgetProps) => {
   const stats: StatItem[] = [
     { 
       icon: <Users className="w-5 h-5" />, 
       value: "500+", 
       label: "Businesses Served",
       trend: "+12% this quarter"
     },
     { 
       icon: <Shield className="w-5 h-5" />, 
       value: "99.9%", 
       label: "Uptime Guarantee",
       trend: "Industry leading"
     },
     { 
       icon: <Award className="w-5 h-5" />, 
       value: "4.9★", 
       label: "Client Rating",
       trend: "Based on 200+ reviews"
     },
     { 
       icon: <TrendingUp className="w-5 h-5" />, 
       value: "40%", 
       label: "Avg. Cost Savings",
       trend: "For AI automation"
     },
   ];
 
   return (
     <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4", className)}>
       {stats.map((stat, index) => (
         <div 
           key={index}
           className="relative group"
         >
           {/* Glassmorphism card */}
           <div 
             className="relative p-5 rounded-2xl border border-white/20 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg"
             style={{
               background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(250,249,247,0.95) 100%)',
               boxShadow: '0 4px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.5)',
             }}
           >
             {/* Icon with gradient background */}
             <div 
               className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
               style={{
                 background: 'linear-gradient(135deg, hsl(var(--coral-100)) 0%, hsl(var(--lavender-100)) 100%)',
                 border: '1px solid hsl(var(--coral-200))',
               }}
             >
               <div className="text-coral-600">{stat.icon}</div>
             </div>
             
             {/* Value with gradient text */}
             <div 
               className="text-2xl font-bold mb-1"
               style={{
                 background: 'linear-gradient(135deg, hsl(var(--navy-600)) 0%, hsl(var(--lavender-600)) 100%)',
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent',
               }}
             >
               {stat.value}
             </div>
             
             {/* Label */}
             <div className="text-sm font-medium text-muted-foreground mb-1">
               {stat.label}
             </div>
             
             {/* Trend indicator */}
             {stat.trend && (
               <div className="text-xs text-coral-600/80 font-medium">
                 {stat.trend}
               </div>
             )}
             
             {/* Decorative corner accent */}
             <div 
               className="absolute top-0 right-0 w-16 h-16 opacity-10"
               style={{
                 background: 'radial-gradient(circle at top right, hsl(var(--coral-400)), transparent 70%)',
               }}
             />
           </div>
         </div>
       ))}
     </div>
   );
 };
 
 export default PremiumStatsWidget;