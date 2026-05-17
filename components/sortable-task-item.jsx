"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Trash2, GripVertical, Calendar as CalendarIcon, Flag, Bell, BellRing } from "lucide-react";
import { format, isBefore, startOfToday, differenceInCalendarDays } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function SortableTaskItem({ task, toggleTask, deleteTask, updateTaskDueDate, updateTaskPriority }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 0,
  };

  const today = startOfToday();
  const isOverdue = task.dueDate && new Date(task.dueDate) < today && !task.completed;

  const priority = task.priority || "medium";

  const priorityConfig = {
    low: {
      color: "text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border-emerald-200",
      iconColor: "text-emerald-500",
      label: "Low Priority",
    },
    medium: {
      color: "text-amber-600 bg-amber-50 hover:bg-amber-100 border-amber-200",
      iconColor: "text-amber-500",
      label: "Medium Priority",
    },
    high: {
      color: "text-rose-600 bg-rose-50 hover:bg-rose-100 border-rose-200",
      iconColor: "text-rose-500",
      label: "High Priority",
    },
  };

  const getRemainingTimeText = (dueDate) => {
    if (!dueDate) return "";
    const date = new Date(dueDate);
    const diffDays = differenceInCalendarDays(date, today);

    if (diffDays < 0) {
      const absDays = Math.abs(diffDays);
      return `Overdue by ${absDays} day${absDays > 1 ? "s" : ""}`;
    } else if (diffDays === 0) {
      return "Due today";
    } else if (diffDays === 1) {
      return "Due tomorrow";
    } else {
      return `Due in ${diffDays} days`;
    }
  };

  return (
    <div ref={setNodeRef} style={style} className={cn("relative group", isDragging && "opacity-50")}>
      <Card
        className={cn(
          "transition-all duration-300 border overflow-hidden",
          task.completed
            ? "bg-muted/50 border-transparent opacity-75"
            : isOverdue
            ? "bg-rose-50/10 border-l-4 border-l-rose-500 border-y-rose-200 border-r-rose-200 shadow-sm shadow-rose-50"
            : "bg-card border-slate-100 hover:shadow-md"
        )}
      >
        <CardContent className="p-4 flex items-center gap-3">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-muted-foreground/30 hover:text-muted-foreground transition-colors shrink-0"
          >
            <GripVertical className="h-5 w-5" />
          </button>

          <Checkbox
            checked={task.completed}
            onCheckedChange={() => toggleTask(task.id)}
            className="h-5 w-5 rounded-full border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary shrink-0"
          />

          {/* Priority selector popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "h-7 w-7 rounded-full border shadow-sm transition-all shrink-0",
                  priorityConfig[priority].color
                )}
                title={priorityConfig[priority].label}
              >
                <Flag className="h-3.5 w-3.5 fill-current" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-1.5 border border-slate-100 shadow-xl rounded-xl bg-white" align="start">
              <div className="flex flex-col gap-1">
                {Object.keys(priorityConfig).map((p) => {
                  const active = priority === p;
                  return (
                    <button
                      key={p}
                      onClick={() => {
                        updateTaskPriority(task.id, p);
                        toast.success(`Priority updated to ${p}`);
                      }}
                      className={cn(
                        "w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-serif font-medium flex items-center gap-2 transition-all",
                        active
                          ? "bg-slate-100 text-slate-900 font-semibold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                      )}
                    >
                      <Flag className={cn("h-3 w-3 fill-current", priorityConfig[p].iconColor)} />
                      <span className="capitalize">{p}</span>
                    </button>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>

          <div className="flex-1 min-w-0">
            <span
              className={cn(
                "block truncate text-foreground transition-all font-serif text-base",
                task.completed && "line-through text-muted-foreground opacity-50"
              )}
            >
              {task.title}
            </span>
            {task.dueDate && (
              <div className="flex items-center mt-1.5">
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px] h-5 px-2 font-serif uppercase tracking-wider gap-1.5 border border-slate-200 shadow-sm",
                    isOverdue
                      ? "bg-rose-50 text-rose-600 border-rose-200"
                      : "bg-slate-50 text-slate-600"
                  )}
                >
                  {isOverdue ? (
                    <BellRing className="h-3 w-3 text-rose-500 animate-pulse" />
                  ) : (
                    <Bell className="h-3 w-3 text-slate-400" />
                  )}
                  <span>
                    {format(new Date(task.dueDate), "MMM d")} • {getRemainingTimeText(task.dueDate)}
                  </span>
                </Badge>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:bg-muted"
                >
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-none shadow-xl" align="end">
                <CalendarComponent
                  mode="single"
                  selected={task.dueDate ? new Date(task.dueDate) : undefined}
                  onSelect={(date) => {
                    if (date && isBefore(date, startOfToday())) {
                      toast.error("Invalid Date", {
                        description: "Cannot assign a date before today.",
                      });
                      return;
                    }
                    updateTaskDueDate(task.id, date);
                    toast.success("Due Date Updated");
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteTask(task.id)}
              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
