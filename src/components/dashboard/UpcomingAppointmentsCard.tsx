import { Calendar, Clock, Video, MapPin, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Appointment {
  id: string;
  title: string;
  scheduled_start: string;
  is_virtual?: boolean;
  location?: string;
  status?: string;
}

interface UpcomingAppointmentsCardProps {
  appointments: Appointment[];
  onBookAppointment: () => void;
}

export function UpcomingAppointmentsCard({ appointments, onBookAppointment }: UpcomingAppointmentsCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Upcoming Sessions
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onBookAppointment}>
            <Plus className="w-4 h-4 mr-1" />
            Book
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {appointments.length === 0 ? (
          <div className="text-center py-8 space-y-4 animate-fade-in">
            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
              <Calendar className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-muted-foreground">No upcoming sessions</p>
              <p className="text-sm text-muted-foreground/70">Schedule a 1-on-1 training session</p>
            </div>
            <Button variant="default" size="sm" onClick={onBookAppointment}>
              <Plus className="w-4 h-4 mr-2" />
              Book Your First Session
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {appointments.slice(0, 3).map((apt, index) => (
              <div
                key={apt.id}
                className="p-4 rounded-xl border bg-card hover:shadow-md transition-all cursor-pointer group animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-semibold group-hover:text-primary transition-colors">
                      {apt.title}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {format(new Date(apt.scheduled_start), "MMM d, h:mm a")}
                      </span>
                      {apt.is_virtual ? (
                        <span className="flex items-center gap-1 text-blue-500">
                          <Video className="w-3 h-3" />
                          Virtual
                        </span>
                      ) : apt.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {apt.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <Badge variant="outline" className="shrink-0 bg-green-500/10 text-green-600 border-green-500/30">
                    Confirmed
                  </Badge>
                </div>
              </div>
            ))}
            {appointments.length > 3 && (
              <Button variant="ghost" className="w-full text-sm">
                View all {appointments.length} appointments
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
