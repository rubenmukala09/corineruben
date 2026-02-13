import {
  GraduationCap,
  Trophy,
  Star,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Enrollment {
  id: string;
  course_id: string;
  progress_percentage: number | null;
  status: string;
  course_title: string | null;
}

interface TrainingProgressCardProps {
  userId?: string;
}

export function TrainingProgressCard({ userId }: TrainingProgressCardProps) {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        // First get enrollments
        const { data: enrollmentData, error: enrollmentError } = await supabase
          .from("enrollments")
          .select("id, course_id, progress_percentage, status")
          .eq("user_id", userId)
          .order("last_accessed_at", { ascending: false })
          .limit(4);

        if (enrollmentError) {
          console.error("Error fetching enrollments:", enrollmentError);
          setEnrollments([]);
          setLoading(false);
          return;
        }

        if (!enrollmentData || enrollmentData.length === 0) {
          setEnrollments([]);
          setLoading(false);
          return;
        }

        // Get course titles for each enrollment
        const courseIds = enrollmentData.map((e) => e.course_id);
        const { data: coursesData, error: coursesError } = await supabase
          .from("courses")
          .select("id, title")
          .in("id", courseIds);

        if (coursesError) {
          console.error("Error fetching courses:", coursesError);
        }

        // Map enrollments with course titles
        const mappedEnrollments: Enrollment[] = enrollmentData.map(
          (enrollment) => {
            const course = coursesData?.find(
              (c) => c.id === enrollment.course_id,
            );
            return {
              id: enrollment.id,
              course_id: enrollment.course_id,
              progress_percentage: enrollment.progress_percentage,
              status: enrollment.status,
              course_title: course?.title || null,
            };
          },
        );

        setEnrollments(mappedEnrollments);
      } catch (err) {
        console.error("Failed to fetch enrollments:", err);
        setEnrollments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [userId]);

  const completedModules = enrollments.filter(
    (e) => e.progress_percentage === 100,
  ).length;
  const overallProgress =
    enrollments.length > 0
      ? Math.round(
          enrollments.reduce(
            (acc, e) => acc + (e.progress_percentage || 0),
            0,
          ) / enrollments.length,
        )
      : 0;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            Training Progress
          </CardTitle>
          {enrollments.length > 0 && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <Trophy className="w-3 h-3 mr-1" />
              {completedModules} / {enrollments.length}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-muted animate-pulse h-16" />
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 animate-pulse"
              >
                <div className="w-8 h-8 rounded-full bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-1 bg-muted rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : enrollments.length === 0 ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <p className="font-medium text-sm mb-1">No Courses Yet</p>
            <p className="text-xs text-muted-foreground mb-4">
              Start your cybersecurity training journey
            </p>
            <Button
              variant="default"
              size="sm"
              onClick={() => navigate("/portal/my-courses")}
            >
              <Star className="w-4 h-4 mr-2" />
              Browse Courses
            </Button>
          </div>
        ) : (
          <>
            {/* Overall Progress */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Overall Mastery</span>
                <span className="text-primary font-bold">
                  {overallProgress}%
                </span>
              </div>
              <Progress value={overallProgress} className="h-3" />
            </div>

            {/* Module List */}
            <div className="space-y-2">
              {enrollments.map((enrollment, index) => (
                <motion.div
                  key={enrollment.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
                  onClick={() => navigate("/portal/my-courses")}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      enrollment.progress_percentage === 100
                        ? "bg-green-500/20 text-green-600"
                        : (enrollment.progress_percentage || 0) > 0
                          ? "bg-blue-500/20 text-blue-600"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {enrollment.progress_percentage === 100
                      ? "✓"
                      : `${enrollment.progress_percentage || 0}%`}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">
                      {enrollment.course_title || "Course"}
                    </p>
                    <Progress
                      value={enrollment.progress_percentage || 0}
                      className="h-1 mt-1"
                    />
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.div>
              ))}
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/portal/my-courses")}
            >
              <Star className="w-4 h-4 mr-2" />
              Continue Learning
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
