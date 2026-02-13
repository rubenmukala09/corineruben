import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useUserEnrollments } from "@/hooks/useCourses";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { CourseCatalog } from "@/components/courses/CourseCatalog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  GraduationCap,
  BookOpen,
  Trophy,
  ArrowRight,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

function MyCourses() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: enrollments, isLoading } = useUserEnrollments();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "👋 Signed Out Successfully",
        description: "You've been securely logged out.",
      });
      navigate("/auth");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unable to sign out";
      toast({
        title: "❌ Sign Out Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  // Calculate stats
  const totalEnrollments = enrollments?.length || 0;
  const completedCourses =
    enrollments?.filter((e) => e.progress_percentage >= 100).length || 0;
  const inProgressCourses =
    enrollments?.filter(
      (e) => e.progress_percentage > 0 && e.progress_percentage < 100,
    ).length || 0;
  const averageProgress =
    totalEnrollments > 0
      ? Math.round(
          enrollments!.reduce(
            (acc, e) => acc + (e.progress_percentage || 0),
            0,
          ) / totalEnrollments,
        )
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <DashboardHeader
        title="My Courses"
        subtitle="Track your learning progress"
        onSignOut={handleSignOut}
      />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Enrolled</p>
                  <p className="text-3xl font-bold">{totalEnrollments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-3xl font-bold">{completedCourses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-3xl font-bold">{inProgressCourses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Progress</p>
                  <p className="text-3xl font-bold">{averageProgress}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* My Active Courses */}
        {isLoading ? (
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 border rounded-lg"
                >
                  <Skeleton className="w-16 h-16 rounded" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : enrollments && enrollments.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Continue Learning
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {enrollments
                .filter((e) => e.progress_percentage < 100)
                .slice(0, 3)
                .map((enrollment) => (
                  <motion.div
                    key={enrollment.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                    onClick={() =>
                      navigate(`/portal/courses/${enrollment.course_id}`)
                    }
                  >
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">
                        {enrollment.course?.title || "Course"}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress
                          value={enrollment.progress_percentage || 0}
                          className="h-2 flex-1"
                        />
                        <span className="text-sm text-muted-foreground shrink-0">
                          {enrollment.progress_percentage || 0}%
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.div>
                ))}
            </CardContent>
          </Card>
        ) : null}

        {/* Course Catalog */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Available Courses</h2>
          <CourseCatalog />
        </div>
      </main>
    </div>
  );
}

export default MyCourses;
