import { useParams, Link } from "react-router-dom";
import { useCourseById, useUserEnrollments, useEnrollInCourse, useUpdateProgress, useCourseModules } from "@/hooks/useCourses";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft,
  BookOpen,
  Clock,
  Users,
  DollarSign,
  Calendar,
  CheckCircle,
  Play,
  Lock,
  GraduationCap
} from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: course, isLoading: courseLoading } = useCourseById(id || "");
  const { data: modules = [], isLoading: modulesLoading } = useCourseModules(id || "");
  const { data: enrollments } = useUserEnrollments();
  const enrollMutation = useEnrollInCourse();
  const updateProgressMutation = useUpdateProgress();

  const enrollment = enrollments?.find(e => e.course_id === id);
  const isEnrolled = !!enrollment;
  const progress = enrollment?.progress_percentage || 0;

  // Calculate total course duration from modules
  const totalDuration = modules.reduce((acc, m) => acc + (m.duration_minutes || 0), 0);
  const totalModules = modules.length;

  // Calculate which modules are completed based on progress
  const getModuleCompletion = (moduleIndex: number) => {
    if (totalModules === 0) return false;
    const progressPerModule = 100 / totalModules;
    return progress >= (moduleIndex + 1) * progressPerModule;
  };

  if (courseLoading || modulesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-violet-500/5 to-purple-500/10 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-violet-500/20 animate-pulse" />
          <p className="text-muted-foreground">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-violet-500/5 to-purple-500/10 p-6">
        <div className="container max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-bold mb-2">Course Not Found</h2>
              <p className="text-muted-foreground mb-4">
                This course doesn't exist or has been removed.
              </p>
              <Button asChild>
                <Link to="/portal/my-courses">Browse Courses</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    if (id) {
      enrollMutation.mutate({ courseId: id });
    }
  };

  const handleContinue = () => {
    if (enrollment) {
      // Simulate progress update
      const nextProgress = Math.min(progress + 20, 100);
      updateProgressMutation.mutate({ 
        enrollmentId: enrollment.id, 
        progress: nextProgress 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-violet-500/5 to-purple-500/10 p-6">
      <div className="container max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/portal/my-courses">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p className="text-muted-foreground">{course.description}</p>
          </div>
          {isEnrolled && (
            <Badge className="bg-green-500/20 text-green-600">Enrolled</Badge>
          )}
        </div>

        {/* Progress Card (for enrolled users) */}
        {isEnrolled && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-purple-500/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-violet-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Your Progress</h3>
                      <p className="text-sm text-muted-foreground">
                        {progress >= 100 ? "Course Completed! 🎉" : "Keep learning to complete"}
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-violet-600">{progress}%</span>
                </div>
                <Progress value={progress} className="h-3" />
                {progress < 100 && (
                  <Button 
                    className="w-full mt-4" 
                    onClick={handleContinue}
                    disabled={updateProgressMutation.isPending}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {progress === 0 ? "Start Learning" : "Continue Learning"}
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {/* Course Info */}
          <div className="md:col-span-2 space-y-6">
            {/* Modules */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Course Modules
                  </CardTitle>
                  <CardDescription>
                    {modules.length} modules • {totalDuration > 0 ? `${Math.round(totalDuration / 60)}h ${totalDuration % 60}m` : `${course.duration_weeks} weeks`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {modules.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>Course content coming soon</p>
                    </div>
                  ) : (
                    modules.map((module, index) => {
                      const isCompleted = getModuleCompletion(index);
                      const durationDisplay = module.duration_minutes 
                        ? `${module.duration_minutes} min` 
                        : `${module.lessons?.length || 0} lessons`;
                      
                      return (
                        <div 
                          key={module.id}
                          className={`flex items-center gap-3 p-3 rounded-lg border ${
                            isCompleted 
                              ? "bg-green-500/5 border-green-500/20" 
                              : isEnrolled 
                                ? "bg-card border-border hover:bg-muted/50 cursor-pointer" 
                                : "bg-muted/30 border-border"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isCompleted 
                              ? "bg-green-500 text-white" 
                              : isEnrolled 
                                ? "bg-primary/20 text-primary" 
                                : "bg-muted text-muted-foreground"
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : isEnrolled ? (
                              <span className="text-sm font-medium">{index + 1}</span>
                            ) : (
                              <Lock className="w-4 h-4" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{module.title}</p>
                            <p className="text-xs text-muted-foreground">{durationDisplay}</p>
                          </div>
                          {isCompleted && (
                            <Badge variant="secondary" className="bg-green-500/20 text-green-600">
                              Completed
                            </Badge>
                          )}
                        </div>
                      );
                    })
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Course Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {course.price && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="font-semibold">${course.price}</p>
                      </div>
                    </div>
                  )}
                  
                  {course.duration_weeks && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-semibold">{course.duration_weeks} weeks</p>
                      </div>
                    </div>
                  )}

                  {course.max_students && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                        <Users className="w-5 h-5 text-violet-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Class Size</p>
                        <p className="font-semibold">Max {course.max_students} students</p>
                      </div>
                    </div>
                  )}

                  {course.start_date && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Start Date</p>
                        <p className="font-semibold">
                          {format(new Date(course.start_date), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Enroll Button */}
            {!isEnrolled && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleEnroll}
                  disabled={enrollMutation.isPending}
                >
                  {enrollMutation.isPending ? "Enrolling..." : "Enroll Now"}
                </Button>
                {course.price && course.price > 0 && (
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    One-time payment • Lifetime access
                  </p>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
