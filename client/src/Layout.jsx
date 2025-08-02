import { SidebarProvider, SidebarTrigger } from "./components/components/ui/sidebar"; 
import { Outlet } from "react-router-dom";
import AppSidebar from "./components/AppSidebar"; 

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
