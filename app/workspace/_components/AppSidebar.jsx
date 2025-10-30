"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Book,
  Compass,
  LayoutDashboard,
  PencilRulerIcon,
  UserCircle2Icon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import AddNewCourseDialog from "./AddNewCourseDialog";

const SideBarOptions = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/workspace" },
  { title: "My Learning", icon: Book, path: "/workspace/my-learning" },
  { title: "Explore Courses", icon: Compass, path: "/workspace/explore" },
  { title: "Personalized-Chatbot", icon: PencilRulerIcon, path: "/workspace/ai-tools" },
  { title: "Profile", icon: UserCircle2Icon, path: "/workspace/profile" },
];

function AppSidebar() {
  const path = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Image src="/logo.svg" alt="Logo" width={130} height={120} />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <AddNewCourseDialog>
            <Button className="w-full mt-2 cursor-pointer">Create New Course</Button>
          </AddNewCourseDialog>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SideBarOptions.map((item, index) => {
                const isActive =
                  path === item.path ||
                  (item.path !== "/workspace" && path.startsWith(item.path));
                return (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton asChild className="p-5">
                      <Link
                        href={item.path}
                        className={`text-[17px] flex items-center gap-2 rounded-md transition-all w-full ${
                          isActive
                            ? "text-primary bg-blue-200"
                            : "text-gray-700 hover:bg-blue-100"
                        }`}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}

export default AppSidebar;
