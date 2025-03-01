'use client';

import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { LayoutDashboard, Package, House, Settings, FileText } from "lucide-react";

// Menu items
const items = [
  {
    title: "Home",
    url: "/",
    Icon: House,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    Icon: LayoutDashboard,
  },
  {
    title: "Inventory",
    url: "/inventory",
    Icon: Package,
  },
  {
    title: "Reports",
    url: "/reports",
    Icon: FileText,
  },
  {
    title: "Settings",
    url: "/settings",
    Icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-gray-300 border border-gray-400 rounded-md"></div>
          <h1 className="font-bold text-3xl p-4">POS</h1>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="pt-10 space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`flex items-center gap-2 p-1 rounded-md hover:bg-gray-100 ${
                        pathname === item.url ? "bg-gray-200" : ""
                      }`}
                    >
                      <item.Icon className="w-8 h-8" />
                      <span className="text-base font-medium">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
