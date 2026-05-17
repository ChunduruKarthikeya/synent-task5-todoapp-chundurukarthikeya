"use client"

import * as React from "react"
import { useApp } from "@/hooks/use-app"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { 
  LayoutList, 
  Timer, 
  BarChart3, 
  Command,
  Settings2,
  HelpCircle,
  LogOut
} from "lucide-react"




import { usePathname } from "next/navigation"
import Link from "next/link"

export function AppSidebar({ ...props }) {
  const pathname = usePathname();

  const navItems = [
    { id: "tasks", title: "Tasks", icon: LayoutList, path: "/tasks" },
    { id: "pomodoro", title: "Focus", icon: Timer, path: "/focus" },
    { id: "stats", title: "Analytics", icon: BarChart3, path: "/analytics" },
  ];

  return (
    <Sidebar collapsible="icon" {...props} className="border-r border-slate-200/50 bg-white/70 backdrop-blur-xl [&>div[data-sidebar=sidebar]]:bg-transparent">
      <SidebarHeader className="h-16 flex items-center justify-center px-4 border-b border-slate-200/50 group-data-[collapsible=icon]:px-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="hover:bg-transparent justify-center group-data-[collapsible=icon]:hidden">
              <div className="flex flex-col gap-0.5 leading-none w-full text-center">
                <div>
                  <Link href="/">
                <span className="font-serif text-xl font-medium tracking-tight text-slate-900">Taskify</span>
                  </Link>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent className="p-2">
        <SidebarMenu className="gap-1">
          {navItems.map((item) => {
            const isActive = pathname ? pathname.startsWith(item.path) : false;
            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  render={<Link href={item.path} />}
                  tooltip={item.title}
                  className={isActive ? "bg-slate-900 text-white hover:bg-slate-800 hover:text-white shadow-sm" : "text-slate-500 hover:bg-slate-100/50 hover:text-slate-900"}
                >
                  <item.icon className="size-4" />
                  <span className="font-serif text-sm font-medium">{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2 border-t border-slate-200/50" />
    </Sidebar>
  )
}
