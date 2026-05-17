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

import { ThemeProvider } from "@/components/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar.jsx";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
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
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col p-4 md:p-8">
                  {children}
                </div>
                <Footer />
              </SidebarInset>
            </SidebarProvider>
            <Toaster position="top-center" expand={false} richColors />
          </TooltipProvider>
        </AppProvider>
      </body>
    </html>
  );
}
