"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, TrendingUp, Calendar } from "lucide-react";

export function StatsDashboard({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const active = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    {
      title: "Total Tasks",
      value: total,
      icon: TrendingUp,
      description: "All-time tracking",
    },
    {
      title: "Active",
      value: active,
      icon: Circle,
      description: "Remaining to do",
    },
    {
      title: "Completed",
      value: completed,
      icon: CheckCircle2,
      description: "Tasks finished",
    },
    {
      title: "Success Rate",
      value: `${completionRate}%`,
      icon: Calendar,
      description: "Work efficiency",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-none shadow-sm bg-card/50 backdrop-blur-sm overflow-hidden relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary/20" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-serif font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono tracking-tight">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1 font-serif">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
