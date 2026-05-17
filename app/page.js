"use client";

import { useState, useEffect } from "react";
import { useTasks } from "@/hooks/use-tasks";
import { useApp } from "@/hooks/use-app";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Plus, 
  LayoutList, 
  Calendar as CalendarIcon, 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect as useIsomorphicLayoutEffect } from "react";
import { DraggableTaskList } from "@/components/draggable-task-list";
import { PomodoroTimer } from "@/components/pomodoro";
import { StatsDashboard } from "@/components/stats-dashboard";
import { motion, AnimatePresence } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, isBefore, startOfToday } from "date-fns";
import { toast } from "sonner";

export default function Home() {
  const { activeTab, searchQuery } = useApp();
  const { 
    tasks, 
    filteredTasks, 
    isLoaded, 
    addTask, 
    toggleTask, 
    deleteTask, 
    updateTaskDueDate,
    clearCompleted,
    reorderTasks
  } = useTasks();

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDate, setNewTaskDate] = useState(null);
  const [filter, setFilter] = useState("all");

  const handleAddTask = (e) => {
    e.preventDefault();
    
    if (newTaskDate && isBefore(newTaskDate, startOfToday())) {
      toast.error("Invalid Due Date", {
        description: "The due date cannot be set before today.",
        action: {
          label: "Dismiss",
          onClick: () => {},
        },
      });
      return;
    }

    if (newTaskTitle.trim()) {
      addTask(newTaskTitle, newTaskDate);
      setNewTaskTitle("");
      setNewTaskDate(null);
      toast.success("Task Created", {
        description: `"${newTaskTitle}" has been added to your list.`,
      });
    }
  };

  // Filter tasks based on both search and completion status
  const currentTasks = tasks
    .filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    });

  const completedCount = tasks.filter((t) => t.completed).length;

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
    <main className="container mx-auto max-w-4xl px-4 py-8 space-y-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "tasks" && (
            <div className="space-y-8">
              {/* Task Input Area */}
              <Card className="border-none shadow-2xl bg-white/70 backdrop-blur-xl overflow-visible rounded-[2rem]">
                <CardContent className="pt-6">
                  <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative group">
                      <Input
                        placeholder="What needs to be done?"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        className="bg-transparent border-slate-200 focus-visible:ring-slate-900 h-12 text-lg rounded-full font-serif pl-6 shadow-sm"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="outline" 
                            className={cn(
                              "h-12 px-6 rounded-full font-serif border-slate-200 hover:bg-slate-50 transition-colors",
                              newTaskDate && "text-slate-900 border-slate-900 bg-slate-50"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newTaskDate ? format(newTaskDate, "MMM d") : "Due Date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 border-none shadow-2xl rounded-2xl" align="center">
                          <Calendar
                            mode="single"
                            selected={newTaskDate}
                            onSelect={setNewTaskDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <Button type="submit" size="icon" className="h-12 w-12 rounded-full shadow-lg bg-slate-900 hover:bg-slate-800">
                        <Plus className="h-6 w-6" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Task List Section */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4 px-2">
                  <div className="flex gap-1 bg-slate-100 p-1 rounded-full">
                    {["all", "active", "completed"].map((f) => (
                      <Button
                        key={f}
                        variant={filter === f ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setFilter(f)}
                        className={cn(
                          "capitalize text-xs font-serif px-6 h-8 rounded-full transition-all",
                          filter === f ? "shadow-md bg-white text-slate-900" : "text-slate-500"
                        )}
                      >
                        {f}
                      </Button>
                    ))}
                  </div>
                  {completedCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearCompleted}
                      className="text-xs text-slate-400 hover:text-red-500 font-serif h-8 rounded-full transition-colors"
                    >
                      Clear completed
                    </Button>
                  )}
                </div>

                <div className="min-h-[300px]">
                  {currentTasks.length === 0 ? (
                    <Card className="border-dashed border-2 border-slate-100 bg-transparent py-20 rounded-[2rem]">
                      <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
                        <div className="p-6 bg-slate-50 rounded-full">
                          <LayoutList className="h-12 w-12 text-slate-200" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-xl font-serif text-slate-400">No tasks to display</p>
                          <p className="text-sm text-slate-300 font-serif">
                            {searchQuery ? "Try a different search query" : "Your list is empty. Add a task to begin."}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <DraggableTaskList 
                      tasks={currentTasks} 
                      toggleTask={toggleTask}
                      deleteTask={deleteTask}
                      updateTaskDueDate={updateTaskDueDate}
                      reorderTasks={reorderTasks}
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "pomodoro" && (
            <div className="flex justify-center py-8">
              <Card className="border-none shadow-2xl bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden max-w-lg w-full">
                <PomodoroTimer />
              </Card>
            </div>
          )}

          {activeTab === "stats" && (
            <div className="space-y-6">
              <div className="text-center space-y-2 py-4">
                <h2 className="text-3xl font-serif tracking-tight text-slate-900">Your Progress</h2>
                <p className="text-slate-400 font-serif">Deep insights into your productivity</p>
              </div>
              <StatsDashboard tasks={tasks} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
