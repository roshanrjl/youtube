import { SidebarProvider, SidebarTrigger } from "./components/components/ui/sidebar";
import AppSidebar from "./components/AppSidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full ">
        <AppSidebar />
        <main className="flex-1 relative">
          <SidebarTrigger className="absolute top-0 left-0 z-20" />
          <div className=" pt-4">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
