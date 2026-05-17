"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";

const changelogEntries = [
  {
    date: "May 17, 2026",
    version: "v1.3.0",
    title: "Task Priorities & Smart Notifications",
    changes: [
      {
        type: "Feature",
        description: "Task Priorities: Introduced Low, Medium, and High task priorities with distinct emerald-green, amber-orange, and rose-red filled flag icons and visual tags."
      },
      {
        type: "Feature",
        description: "Due Date Notifications: Show interactive bell notifications on all tasks with set deadlines to quickly draw focus."
      },
      {
        type: "Feature",
        description: "Overdue Highlighting: Automatically highlight overdue tasks with a sleek left rose-red accent border, soft rose background, and custom relative remaining time labels (e.g., 'Overdue by 2 days')."
      },
      {
        type: "Fix",
        description: "Hydration Mismatches: Resolved standard React hydration console mismatch warnings in stars rendering and skeleton overlays to ensure stable, warning-free loading."
      }
    ]
  },
  {
    date: "May 16, 2026",
    version: "v1.2.0",
    title: "Focus Timers & Stats Dashboard",
    changes: [
      {
        type: "Feature",
        description: "Pomodoro Focus Timer: Added a custom productivity timer page allowing users to configure custom focus blocks, short breaks, and long breaks."
      },
      {
        type: "Feature",
        description: "Interactive Analytics: Created a productivity stats dashboard with responsive completion charts and task volume trends using Recharts."
      },
      {
        type: "UX Upgrade",
        description: "Glassmorphism Sidebar: Integrated a premium, responsive sidebar layout using Base UI button elements and standard collapsing drawer mechanics."
      }
    ]
  },
  {
    date: "May 10, 2026",
    version: "v1.0.0",
    title: "Core Framework & Launch",
    changes: [
      {
        type: "Feature",
        description: "Drag-and-Drop Reordering: Smooth, responsive task sorting built on @dnd-kit/core and @dnd-kit/sortable."
      },
      {
        type: "Privacy",
        description: "Offline-First Local Storage: 100% of data is stored securely in your browser's localStorage. Zero databases, zero account creation, maximum confidentiality."
      },
      {
        type: "Feature",
        description: "Universal Filters: Seamlessly filter active, completed, or search tasks dynamically in real time."
      }
    ]
  }
];

// Simple inline Wrapper component
const Wrapper = ({ children, className = "" }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

// Simple inline AnimationContainer component
const AnimationContainer = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

const ChangelogPage = () => {
  return (
    <section className="bg-background min-h-screen relative overflow-hidden">
      <Wrapper>
        <AnimationContainer delay={0.1}>
          <div className="max-w-4xl mx-auto pt-20 pb-16 px-6">
            <div className="mb-12 text-center">
              <Badge variant="outline" className="mb-4 border-slate-200 font-serif">Changelog</Badge>
              <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4 text-slate-900 tracking-tight">Latest Updates</h1>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto font-serif">
                Follow our journey of building Taskify — the ultimate local-first, smart task and productivity manager.
              </p>
            </div>

            <div className="space-y-12 relative">
              {/* Vertical Line */}
              <div className="absolute left-0 sm:left-1/2 top-4 bottom-4 w-[2px] bg-slate-200 -translate-x-1/2 hidden sm:block"></div>

              {changelogEntries.map((entry, entryIdx) => (
                <div key={entryIdx} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-0 sm:left-1/2 top-4 size-3 rounded-full bg-slate-900 -translate-x-1/2 ring-4 ring-white z-10 hidden sm:block"></div>

                  <div className={entryIdx % 2 === 0 ? "sm:pr-[50%] sm:text-right" : "sm:pl-[50%]"}>
                    <div className={entryIdx % 2 === 0 ? "sm:mr-10" : "sm:ml-10"}>
                      <div className={`flex items-center gap-2 mb-2 ${entryIdx % 2 === 0 ? "sm:justify-end" : "sm:justify-start"} justify-start`}>
                        <span className="text-sm font-mono text-slate-400">{entry.date}</span>
                        <Badge variant="secondary" className="text-[10px] uppercase bg-slate-100 text-slate-600 border-none font-serif">{entry.version}</Badge>
                      </div>
                      <h2 className="text-2xl font-serif font-medium mb-4 text-slate-900">{entry.title}</h2>

                      <div className="space-y-4">
                        {entry.changes.map((change, changeIdx) => (
                          <Card key={changeIdx} className="border-none shadow-lg bg-white/70 backdrop-blur-xl rounded-[2rem] overflow-hidden">
                            <CardContent className="p-5 text-left">
                              <div className="flex items-start gap-3">
                                <Badge className="shrink-0 text-[10px] mt-0.5" variant={
                                  change.type === 'Feature' ? 'default' :
                                  change.type === 'Fix' ? 'destructive' : 'outline'
                                }>
                                  {change.type}
                                </Badge>
                                <p className="text-sm leading-relaxed text-slate-600 font-serif">
                                  {change.description}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimationContainer>

        <AnimationContainer delay={0.2}>
          <div className="max-w-4xl mx-auto pb-16 px-6">
            {/* Meet the Developer */}
            <section id="meet-the-developer-section" className="space-y-10 scroll-mt-24">
              <h2 id="meet-the-developer" className="text-2xl font-serif font-medium tracking-tight text-slate-900">Meet the Developer</h2>
              <div className="p-8 rounded-[2rem] bg-white/70 backdrop-blur-xl border border-slate-100 hover:border-slate-300 shadow-lg transition-all duration-300">
                <span className="text-slate-500 font-serif block text-sm leading-relaxed">
                  All rights reserved — created by{" "}
                  <Link
                    href="https://www.linkedin.com/in/chunduru-karthikeya-36144b302/"
                    className="text-slate-900 font-semibold hover:underline decoration-slate-900/30 underline-offset-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chunduru Karthikeya
                  </Link>
                </span>
              </div>
            </section>
          </div>
        </AnimationContainer>
      </Wrapper>
    </section>
  );
};

export default ChangelogPage;
