"use client";

import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@/components/ui/text-reveal-card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function NotFound() {
  const router = useRouter();

  // Support "H" key press to navigate home as the card's reveal text suggests!
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Avoid triggering when user is typing in inputs (not applicable on 404 but safe practice)
      if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") {
        return;
      }
      if (e.key === "h" || e.key === "H") {
        router.push("/tasks");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center bg-neutral-50 min-h-screen w-full px-4 gap-6">
      <TextRevealCard
        text="404 - Page Not Found"
        revealText="Press H to go  Home !"
        lightMode={true}
      >
        <TextRevealCardTitle className="text-neutral-800 font-bold text-2xl">
          Welcome to Taskify
        </TextRevealCardTitle>
        <TextRevealCardDescription className="text-neutral-500 font-medium">
          The page you are looking for doesn't exist. Hover over the card to reveal the hidden
          text.
        </TextRevealCardDescription>
      </TextRevealCard>

      <Link
        href="/tasks"
        className={cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          "gap-2 border-neutral-300 text-neutral-700 hover:text-neutral-900 shadow-sm transition-all"
        )}
      >
        <ArrowLeft className="h-4 w-4" />
        Go back to Tasks
      </Link>
    </div>
  );
}
