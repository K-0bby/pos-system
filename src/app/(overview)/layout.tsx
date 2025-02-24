import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Theme } from "@radix-ui/themes";
import Header from "@/components/header";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Theme>
      <SidebarProvider>
        <AppSidebar />
          <SidebarTrigger />
        <main className="max-w-8xl w-full p-1">
          <Header />
          <div className="border-b border-gray-100 my-1" />
          {children}
        </main>
      </SidebarProvider>
    </Theme>
  );
}
