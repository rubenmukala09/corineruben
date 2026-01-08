import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, CheckCircle2 } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: string;
  status: string;
}

interface NeonTasksCardProps {
  tasks: Task[];
}

const priorityConfig = {
  high: {
    dot: "bg-red-500",
    glow: "shadow-red-500/50",
    pulse: true,
  },
  medium: {
    dot: "bg-amber-500",
    glow: "shadow-amber-500/50",
    pulse: false,
  },
  low: {
    dot: "bg-green-500",
    glow: "shadow-green-500/50",
    pulse: false,
  },
};

const statusConfig = {
  completed: "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30",
  pending: "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30",
  "in-progress": "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30",
};

export function NeonTasksCard({ tasks }: NeonTasksCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <Card className="bg-[#1F2937] border-gray-800/50 p-6 shadow-lg shadow-cyan-500/5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            My Tasks
          </h2>
          <Button
            size="sm"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 shadow-lg shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Task
          </Button>
        </div>
        
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-gray-600" />
              </div>
              <p className="text-gray-400">No tasks yet</p>
              <p className="text-gray-500 text-sm">Create your first task to get started</p>
            </div>
          ) : (
            tasks.map((task, index) => {
              const priority = priorityConfig[task.priority as keyof typeof priorityConfig] || priorityConfig.low;
              const status = statusConfig[task.status as keyof typeof statusConfig] || statusConfig.pending;
              
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                  className="flex items-center justify-between p-4 bg-[#111827] rounded-lg border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className={`w-2.5 h-2.5 rounded-full ${priority.dot} shadow-lg ${priority.glow}`} />
                      {priority.pulse && (
                        <div className={`absolute inset-0 w-2.5 h-2.5 rounded-full ${priority.dot} animate-ping`} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-white group-hover:text-cyan-400 transition-colors">{task.title}</p>
                      {task.description && (
                        <p className="text-sm text-gray-500 line-clamp-1">{task.description}</p>
                      )}
                    </div>
                  </div>
                  <Badge className={`border ${status}`}>
                    {task.status}
                  </Badge>
                </motion.div>
              );
            })
          )}
        </div>
      </Card>
    </motion.div>
  );
}
