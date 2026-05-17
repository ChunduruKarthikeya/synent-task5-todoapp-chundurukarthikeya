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




export function AppSidebar({ ...props }) {
  const { activeTab, setActiveTab } = useApp();

  const navItems = [
    { id: "tasks", title: "Tasks", icon: LayoutList },
    { id: "pomodoro", title: "Focus", icon: Timer },
    { id: "stats", title: "Analytics", icon: BarChart3 },
  ];

  return (
    <Sidebar collapsible="icon" {...props} className="border-r border-slate-200">
      <SidebarHeader className="h-16 flex items-center px-4 border-b border-slate-200">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="hover:bg-transparent">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-slate-900 text-white">
                <Command className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-serif font-semibold text-lg tracking-tight">Taskify</span>
               
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent className="p-2">
        <SidebarMenu className="gap-1">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                isActive={activeTab === item.id}
                onClick={() => setActiveTab(item.id)}
                tooltip={item.title}
                className={activeTab === item.id ? "bg-slate-100 text-slate-900" : "text-slate-500"}
              >
                <item.icon className="size-4" />
                <span className="font-serif text-sm">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2 border-t border-slate-200" />
    </Sidebar>
  )
}
