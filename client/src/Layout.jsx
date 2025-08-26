import { SidebarProvider, SidebarTrigger, useSidebar } from "./components/components/ui/sidebar";
import AppSidebar from "./components/AppSidebar";
import { Outlet } from "react-router-dom";
import Menubar from "./components/navbar";

export default function Layout() {
  return (
    <>
     <Menubar/>
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
    </>
  );
}

function LayoutContent() {
  const { isSidebarOpen } = useSidebar(); 

  return (
    <div className="flex h-screen w-full">
      <AppSidebar />
      <main className="flex-1 relative">
        <SidebarTrigger className="relative top-4 left-0 z-50" />
        <div className={`pt-4 transition-all duration-300 ${isSidebarOpen ? "pl-4" : "pl-8"}`}>
          <Outlet context={{ isSidebarOpen }} />
        </div>
      </main>
    </div>
  );
}
