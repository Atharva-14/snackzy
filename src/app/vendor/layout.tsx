// import Sidebar from "@/components/sidebar";
"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = usePathname();

  const pageTitles: Record<string, string> = {
    "/vendor/dashboard": "Dashboard",
    "/vendor/products": "Products",
    "/vendor/orders": "Orders",
    "/vendor/earnings": "Earnings",
    "/vendor/returns_complaints": "Returns & Complaints",
    "/vendor/settings": "Settings",
  };

  const pageTitle = pageTitles[location] || "Dashboard";

  return (
    <html lang="en">
      <body>
        <SidebarProvider defaultOpen={false}>
          <AppSidebar />
          <SidebarInset>
            <header className="sticky top-0 z-10 bg-white shadow flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <h1 className="text-lg font-semibold">{pageTitle}</h1>
              </div>
            </header>
            <div className="p-4">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
