"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { DashboardUserButton } from "./admin-dashboard-user-button";
import {
  MdInventory,
  MdAdd,
  MdOutlineArticle,
  MdList,
  MdEvent,
} from "react-icons/md";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
const adminRoute = [
  {
    href: "/admin/products",
    label: "Products",
    icon: MdInventory,
    children: [
      {
        href: "/admin/products",
        label: "All Products",
        icon: MdList,
      },
      {
        href: "/admin/products/new",
        label: "Add Product",
        icon: MdAdd,
      },
    ],
  },
  {
    href: "/admin/blogs",
    label: "Blog",
    icon: MdOutlineArticle,
    children: [
      {
        href: "/admin/blogs",
        label: "All Posts",
        icon: MdList,
      },
      {
        href: "/admin/blogs/new",
        label: "Add Post",
        icon: MdAdd,
      },
    ],
  },
  {
    href: "/admin/events",
    label: "Events",
    icon: MdEvent,
    children: [
      {
        href: "/admin/events",
        label: "All Events",
        icon: MdList,
      },
      {
        href: "/admin/events/new",
        label: "Add Event",
        icon: MdAdd,
      },
    ],
  },
];

export const DashboardSidebar = () => {
  const pathName = usePathname();
  const [openCollapsible, setOpenCollabsible] = useState<{
    [key: string]: boolean;
  }>({});
  const toggleCollapsible = (key: string) => {
    setOpenCollabsible((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground mt-8">
        <Link href={"/admin"} className="flex items-center gap-4 px-2 pt-2">
          <Image src={"/logo.svg"} height={36} width={36} alt="EGA" />
          <p className="text-2xl font-semibold">EGA</p>
        </Link>
      </SidebarHeader>
      <div className="px-4 py-4">
        <Separator className="h-10" />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminRoute.map((item) => (
                <Collapsible
                  key={item.href}
                  open={!!openCollapsible[item.href]}
                  onOpenChange={() => toggleCollapsible(item.href)}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        asChild
                        className={cn(
                          "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                          (pathName === item.href ||
                            pathName.includes(item.href)) &&
                            "bg-linear-to-r/oklch border-[#5D6B68]/10"
                        )}
                        isActive={pathName.includes(item.href)}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <item.icon className="size-5" />
                            <span className="text-sm font-medium tracking-tight">
                              {item.label}
                            </span>
                          </div>
                          <ChevronRight
                            className={cn(
                              "transition-transform duration-200",
                              !!openCollapsible[item.href]
                                ? "rotate-90"
                                : "rotate-0"
                            )}
                          />
                        </div>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {item.children.map((sub) => (
                        <SidebarMenuSub key={sub.href}>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              isActive={pathName === sub.href}
                            >
                              <Link
                                href={sub.href}
                                className="flex items-center gap-2"
                              >
                                <sub.icon className="size-3" />
                                <span className="text-xs tracking-tight">
                                  {sub.label}
                                </span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      ))}
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-white">
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};
