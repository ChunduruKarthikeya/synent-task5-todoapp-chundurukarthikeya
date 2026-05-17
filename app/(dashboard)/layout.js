import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar.jsx";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";

export default function DashboardLayout({ children }) {
  return (
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
  );
}
