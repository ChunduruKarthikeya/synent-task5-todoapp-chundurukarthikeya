"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Pause, RotateCcw, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function PomodoroTimer() {
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("work"); // work, break
  const timerRef = useRef(null);

  // Load user settings
  useEffect(() => {
    const savedWork = localStorage.getItem("pomodoro-work");
    const savedBreak = localStorage.getItem("pomodoro-break");
    if (savedWork) {
      const w = parseInt(savedWork);
      setWorkDuration(w);
      if (mode === "work") setTimeLeft(w * 60);
    }
    if (savedBreak) {
      const b = parseInt(savedBreak);
      setBreakDuration(b);
      if (mode === "break") setTimeLeft(b * 60);
    }
  }, []);

  const totalTime = (mode === "work" ? workDuration : breakDuration) * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      const nextMode = mode === "work" ? "break" : "work";
      const nextDuration = nextMode === "work" ? workDuration : breakDuration;
      setMode(nextMode);
      setTimeLeft(nextDuration * 60);
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft, mode, workDuration, breakDuration]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft((mode === "work" ? workDuration : breakDuration) * 60);
  };

  const updateDuration = (type, val) => {
    const num = Math.max(1, parseInt(val) || 1);
    if (type === "work") {
      setWorkDuration(num);
      localStorage.setItem("pomodoro-work", num);
      if (mode === "work" && !isActive) setTimeLeft(num * 60);
    } else {
      setBreakDuration(num);
      localStorage.setItem("pomodoro-break", num);
      if (mode === "break" && !isActive) setTimeLeft(num * 60);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8 relative">
      <div className="absolute top-4 right-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings2 className="h-5 w-5 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4 border-none shadow-2xl" align="end">
            <div className="space-y-4">
              <h4 className="font-serif font-medium leading-none">Timer Settings</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-serif">Work (min)</label>
                  <Input 
                    type="number" 
                    value={workDuration} 
                    onChange={(e) => updateDuration("work", e.target.value)}
                    className="h-8 font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-serif">Break (min)</label>
                  <Input 
                    type="number" 
                    value={breakDuration} 
                    onChange={(e) => updateDuration("break", e.target.value)}
                    className="h-8 font-mono"
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-2xl font-serif capitalize tracking-tight">
          {mode === "work" ? "Focus Time" : "Short Break"}
        </h3>
        <p className="text-muted-foreground text-sm font-serif">
          {isActive ? "Timer is running..." : "Ready to focus?"}
        </p>
      </div>

      <div className="relative flex items-center justify-center w-64 h-64">
        <svg className="absolute w-full h-full transform -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-muted/20"
          />
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={754}
            strokeDashoffset={754 - (754 * progress) / 100}
            strokeLinecap="round"
            className="text-slate-900 transition-all duration-1000"
          />
        </svg>
        <div className="text-6xl font-bold font-mono tracking-tighter">
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={resetTimer}
          className="h-12 w-12 rounded-full border-2"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
        <Button
          size="lg"
          onClick={toggleTimer}
          className="h-12 px-8 rounded-full text-lg font-serif bg-slate-900 text-white hover:bg-slate-800"
        >
          {isActive ? (
            <>
              <Pause className="mr-2 h-5 w-5 fill-current" /> Pause
            </>
          ) : (
            <>
              <Play className="mr-2 h-5 w-5 fill-current" /> Start
            </>
          )}
        </Button>
      </div>

      <div className="flex gap-2 bg-muted p-1 rounded-full">
        <Button
          variant={mode === "work" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => { setMode("work"); setTimeLeft(workDuration * 60); setIsActive(false); }}
          className="rounded-full px-6 font-serif"
        >
          Work
        </Button>
        <Button
          variant={mode === "break" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => { setMode("break"); setTimeLeft(breakDuration * 60); setIsActive(false); }}
          className="rounded-full px-6 font-serif"
        >
          Break
        </Button>
      </div>
    </div>
  );
}
