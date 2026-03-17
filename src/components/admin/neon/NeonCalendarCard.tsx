import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays } from "lucide-react";

interface NeonCalendarCardProps {
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

export function NeonCalendarCard({ date, onSelect }: NeonCalendarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <Card className="bg-[#1F2937] border-gray-800/50 p-6 shadow-lg">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
          <CalendarDays className="w-5 h-5 text-purple-400" />
          Calendar
        </h2>
        <div className="[&_.rdp]:bg-[#111827] [&_.rdp]:rounded-lg [&_.rdp]:border [&_.rdp]:border-gray-800/50 [&_.rdp]:p-3 [&_.rdp-day]:text-gray-300 [&_.rdp-day:hover]:bg-purple-500/20 [&_.rdp-day_button:hover]:bg-purple-500/20 [&_.rdp-day_button]:text-gray-300 [&_.rdp-day_button.rdp-day_selected]:bg-gradient-to-r [&_.rdp-day_button.rdp-day_selected]:from-purple-500 [&_.rdp-day_button.rdp-day_selected]:to-pink-600 [&_.rdp-day_button.rdp-day_selected]:text-white [&_.rdp-caption]:text-white [&_.rdp-head_cell]:text-gray-500 [&_.rdp-nav_button]:text-gray-400 [&_.rdp-nav_button:hover]:bg-purple-500/20 [&_.rdp-button:focus-visible]:ring-purple-500">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onSelect}
            className="rounded-md"
          />
        </div>
      </Card>
    </motion.div>
  );
}
