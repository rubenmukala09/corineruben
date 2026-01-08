import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, MapPin, Clock } from "lucide-react";

interface Event {
  id: string;
  title: string;
  start_time: string;
  location?: string;
  event_type?: string;
}

interface NeonEventsCardProps {
  events: Event[];
}

const eventTypeConfig: Record<string, string> = {
  meeting: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30",
  training: "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30",
  deadline: "bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-400 border-red-500/30",
  review: "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30",
};

export function NeonEventsCard({ events }: NeonEventsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <Card className="bg-[#1F2937] border-gray-800/50 p-6 shadow-lg shadow-purple-500/5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-400" />
            Upcoming Events
          </h2>
          <Button
            size="sm"
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/20"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Event
          </Button>
        </div>
        
        <div className="space-y-3">
          {events.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                <Calendar className="w-8 h-8 text-gray-600" />
              </div>
              <p className="text-gray-400">No upcoming events</p>
              <p className="text-gray-500 text-sm">Schedule your first event</p>
            </div>
          ) : (
            events.map((event, index) => {
              const { date, time } = formatDate(event.start_time);
              const typeStyle = eventTypeConfig[event.event_type?.toLowerCase() || ''] || eventTypeConfig.meeting;
              
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                  className="flex items-start gap-4 p-4 bg-[#111827] rounded-lg border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300 group"
                >
                  {/* Date indicator */}
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex flex-col items-center justify-center border border-purple-500/20">
                    <span className="text-xs text-purple-400 uppercase">{date.split(' ')[0]}</span>
                    <span className="text-lg font-bold text-white">{date.split(' ')[1]}</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white group-hover:text-purple-400 transition-colors truncate">
                      {event.title}
                    </p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-3 h-3" />
                        {time}
                      </span>
                      {event.location && (
                        <span className="flex items-center gap-1 text-sm text-gray-500 truncate">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {event.event_type && (
                    <Badge className={`border flex-shrink-0 ${typeStyle}`}>
                      {event.event_type}
                    </Badge>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      </Card>
    </motion.div>
  );
}
