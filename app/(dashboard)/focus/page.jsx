"use client";

import { Card } from "@/components/ui/card";
import { PomodoroTimer } from "@/components/pomodoro";
import { motion } from "framer-motion";

export default function FocusPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        <div className="flex justify-center py-8">
          <Card className="border-none shadow-2xl bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden max-w-lg w-full">
            <PomodoroTimer />
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
