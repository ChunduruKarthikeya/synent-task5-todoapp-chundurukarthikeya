import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { AppProvider } from "@/hooks/use-app";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata = {
  title: "Taskify | Smart Task Management",
  description: "Elevate your productivity with our sleek and simple task manager.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground flex flex-col`}>
        <AppProvider>
          <TooltipProvider>
            {children}
            <Toaster position="top-center" expand={false} richColors />
          </TooltipProvider>
        </AppProvider>
      </body>
    </html>
  );
}
