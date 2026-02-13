import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingRequestsTable } from "@/components/admin/BookingRequestsTable";
import { PurchaseRequestsTable } from "@/components/admin/PurchaseRequestsTable";
import { InquiriesTable } from "@/components/admin/InquiriesTable";
import { JobApplicationsTable } from "@/components/admin/JobApplicationsTable";
import { TestimonialsTable } from "@/components/admin/TestimonialsTable";
import {
  BookOpen,
  ShoppingCart,
  MessageSquare,
  Briefcase,
  Star,
} from "lucide-react";

const tabItems = [
  { value: "bookings", label: "Bookings", icon: BookOpen },
  { value: "purchases", label: "Purchases", icon: ShoppingCart },
  { value: "inquiries", label: "Inquiries", icon: MessageSquare },
  { value: "applications", label: "Applications", icon: Briefcase },
  { value: "testimonials", label: "Testimonials", icon: Star },
];

export function NeonManagementTabs() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <Card className="bg-[#1F2937] border-gray-800/50 p-6 shadow-lg shadow-purple-500/5">
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="w-full bg-[#111827] border border-gray-800/50 p-1 rounded-lg grid grid-cols-5 gap-1 mb-6">
            {tabItems.map((item) => {
              const Icon = item.icon;
              return (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  className="flex items-center gap-2 text-gray-400 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-pink-500/20 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-purple-500/30 rounded-md transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <div className="[&_table]:bg-[#111827] [&_th]:text-gray-400 [&_th]:border-gray-800 [&_td]:border-gray-800 [&_tr:hover]:bg-gray-800/50 [&_.border]:border-gray-800">
            <TabsContent value="bookings">
              <BookingRequestsTable />
            </TabsContent>
            <TabsContent value="purchases">
              <PurchaseRequestsTable />
            </TabsContent>
            <TabsContent value="inquiries">
              <InquiriesTable />
            </TabsContent>
            <TabsContent value="applications">
              <JobApplicationsTable />
            </TabsContent>
            <TabsContent value="testimonials">
              <TestimonialsTable />
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </motion.div>
  );
}
