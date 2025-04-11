import {
  LayoutDashboard,
  ShoppingCart,
  Package2,
  Wallet,
  RotateCcw,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavUser } from "./nav-user";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/vendor/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    url: "/vendor/products",
    icon: Package2,
  },
  {
    title: "Orders",
    url: "/vendor/orders",
    icon: ShoppingCart,
  },
  {
    title: "Earnings",
    url: "/vendor/earnings",
    icon: Wallet,
  },
  {
    title: "Return & Complaints",
    url: "/vendor/return_complaints",
    icon: RotateCcw,
  },
  {
    title: "Settings",
    url: "/vendor/settings",
    icon: Settings,
  },
];

const data = {
  user: {
    name: "John Snow",
    email: "johnsnow@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
