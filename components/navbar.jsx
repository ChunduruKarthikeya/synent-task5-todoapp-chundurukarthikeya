"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useApp } from "@/hooks/use-app";
import { LayoutList, Timer, BarChart3 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Navbar() {
  const { 
    activeTab, 
    setActiveTab, 
  } = useApp();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/" className="text-xl font-serif tracking-tight text-slate-900 hover:opacity-70 transition-opacity">
            Taskify
          </Link>
        </div>

        {/* Navigation Tabs - Desktop */}
        <div className="hidden md:flex flex-1 justify-center max-w-md">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 w-full rounded-full bg-slate-100 p-1">
              <TabsTrigger value="tasks" className="rounded-full font-serif flex items-center gap-2 text-xs">
                <LayoutList className="h-3.5 w-3.5" />
                Tasks
              </TabsTrigger>
              <TabsTrigger value="pomodoro" className="rounded-full font-serif flex items-center gap-2 text-xs">
                <Timer className="h-3.5 w-3.5" />
                Focus
              </TabsTrigger>
              <TabsTrigger value="stats" className="rounded-full font-serif flex items-center gap-2 text-xs">
                <BarChart3 className="h-3.5 w-3.5" />
                Stats
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Placeholder to maintain spacing if needed */}
        <div className="w-20 md:hidden"></div>
      </div>
      
      {/* Mobile Navigation Tabs */}
      <div className="md:hidden border-t bg-white">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex w-full bg-transparent p-0 h-10">
            <TabsTrigger value="tasks" className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-slate-900 data-[state=active]:bg-transparent font-serif text-[10px] uppercase tracking-wider">
              Tasks
            </TabsTrigger>
            <TabsTrigger value="pomodoro" className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-slate-900 data-[state=active]:bg-transparent font-serif text-[10px] uppercase tracking-wider">
              Focus
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-slate-900 data-[state=active]:bg-transparent font-serif text-[10px] uppercase tracking-wider">
              Stats
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </nav>
  );
}
