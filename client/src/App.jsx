import React from "react";
import { Sidebar } from "@components/ui/sidebar";
import { SidebarProvider } from "@components/ui/sidebar"; // ✅ import the provider

function App() {
  return (
    <SidebarProvider> {/* ✅ wrap with provider */}
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold">Main Content Area</h1>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
