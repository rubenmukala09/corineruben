import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  BookOpen, 
  Clock, 
  Users, 
  CheckCircle, 
  Play, 
  ArrowRight,
  GraduationCap,
  Trophy,
  Calendar
} from "lucide-react";
import { motion } from "framer-motion";
import { useCourses, useUserEnrollments, useEnrollInCourse, type Course } from "@/hooks/useCourses";
import { useAuth } from "@/contexts/AuthContext";

interface CourseCardProps {
  course: Course;
  enrollment?: any;
  onEnroll: (courseId: string) => void;
  isEnrolling: boolean;
}

function CourseCard({ course, enrollment, onEnroll, isEnrolling }: CourseCardProps) {
  const navigate = useNavigate();
  const isEnrolled = !!enrollment;
  const progress = enrollment?.progress_percentage || 0;
  const isCompleted = progress >= 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
        <div className="h-3 bg-gradient-to-r from-primary to-primary/60" />
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-xl">{course.title}</CardTitle>
            {isCompleted && (
              <Badge className="bg-green-500/20 text-green-600 shrink-0">
                <Trophy className="w-3 h-3 mr-1" />
                Completed
              </Badge>
            )}
            {isEnrolled && !isCompleted && (
              <Badge variant="secondary" className="shrink-0">
                <Play className="w-3 h-3 mr-1" />
                In Progress
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <p className="text-muted-foreground mb-4 flex-1">
            {course.description || "Learn essential skills to protect yourself and your family."}
          </p>

          {/* Course Meta */}
          <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
            {course.duration_weeks && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {course.duration_weeks} weeks
              </span>
            )}
            {course.max_students && (
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {course.max_students} seats
              </span>
            )}
            {course.start_date && (
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Starts {new Date(course.start_date).toLocaleDateString()}
              </span>
            )}
          </div>

          {/* Progress Bar for enrolled courses */}
          {isEnrolled && (
            <div className="mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold">
              {course.price ? `$${course.price}` : "Free"}
            </span>
          </div>

          {/* Actions */}
          {isEnrolled ? (
            <Button 
              className="w-full" 
              onClick={() => navigate(`/portal/courses/${course.id}`)}
            >
              {isCompleted ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Review Course
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Continue Learning
                </>
              )}
            </Button>
          ) : (
            <Button 
              className="w-full" 
              onClick={() => onEnroll(course.id)}
              disabled={isEnrolling}
            >
              {isEnrolling ? (
                "Enrolling..."
              ) : course.price ? (
                <>
                  Enroll Now - ${course.price}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Start Free Course
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function CourseCatalogSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="h-full">
          <div className="h-3 bg-muted" />
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <Skeleton className="h-8 w-24 mb-4" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function CourseCatalog() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: courses, isLoading: coursesLoading } = useCourses();
  const { data: enrollments, isLoading: enrollmentsLoading } = useUserEnrollments();
  const enrollMutation = useEnrollInCourse();

  const handleEnroll = (courseId: string) => {
    if (!user) {
      navigate("/auth?redirect=/portal/my-courses");
      return;
    }
    enrollMutation.mutate({ courseId });
  };

  const isLoading = coursesLoading || enrollmentsLoading;

  if (isLoading) {
    return <CourseCatalogSkeleton />;
  }

  if (!courses || courses.length === 0) {
    return (
      <Card className="p-8 text-center">
        <GraduationCap className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-xl font-semibold mb-2">No Courses Available</h3>
        <p className="text-muted-foreground">
          New courses are being prepared. Check back soon!
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      {enrollments && enrollments.length > 0 && (
        <Card className="p-4 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span>
                <strong>{enrollments.length}</strong> Enrolled
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>
                <strong>{enrollments.filter(e => e.progress_percentage >= 100).length}</strong> Completed
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5 text-blue-500" />
              <span>
                <strong>{enrollments.filter(e => e.progress_percentage > 0 && e.progress_percentage < 100).length}</strong> In Progress
              </span>
            </div>
          </div>
        </Card>
      )}

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const enrollment = enrollments?.find(e => e.course_id === course.id);
          return (
            <CourseCard
              key={course.id}
              course={course}
              enrollment={enrollment}
              onEnroll={handleEnroll}
              isEnrolling={enrollMutation.isPending}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CourseCatalog;
