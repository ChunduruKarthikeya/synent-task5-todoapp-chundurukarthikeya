"use client";

import { useTasks } from "@/hooks/use-tasks";
import { StatsDashboard } from "@/components/stats-dashboard";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
  const { tasks, isLoaded } = useTasks();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-slate-100" />
          <div className="h-4 w-32 rounded bg-slate-50" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        <div className="space-y-6">
          <div className="text-center space-y-2 py-4">
            <h2 className="text-3xl font-serif tracking-tight text-slate-900">Your Progress</h2>
            <p className="text-slate-400 font-serif">Deep insights into your productivity</p>
          </div>
          <StatsDashboard tasks={tasks} />
        </div>
      </motion.div>
    </div>
  );
}
