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
import { Trash2, GripVertical, Calendar as CalendarIcon } from "lucide-react";
import { format, isBefore, startOfToday } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function SortableTaskItem({ task, toggleTask, deleteTask, updateTaskDueDate }) {
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

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div ref={setNodeRef} style={style} className={cn("relative group", isDragging && "opacity-50")}>
      <Card
        className={cn(
          "transition-all duration-300 border-none shadow-sm hover:shadow-md overflow-hidden",
          task.completed ? "bg-muted/50 opacity-75" : "bg-card"
        )}
      >
        <CardContent className="p-4 flex items-center gap-3">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-muted-foreground/30 hover:text-muted-foreground transition-colors"
          >
            <GripVertical className="h-5 w-5" />
          </button>

          <Checkbox
            checked={task.completed}
            onCheckedChange={() => toggleTask(task.id)}
            className="h-5 w-5 rounded-full border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />

          <div className="flex-1 min-w-0">
            <span
              className={cn(
                "block truncate text-foreground transition-all font-serif",
                task.completed && "line-through text-muted-foreground opacity-50"
              )}
            >
              {task.title}
            </span>
            {task.dueDate && (
              <div className="flex items-center mt-1">
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px] h-4 px-1.5 font-serif uppercase tracking-wider border-none",
                    isOverdue ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="h-2.5 w-2.5 mr-1" />
                  {format(new Date(task.dueDate), "MMM d")}
                </Badge>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
