import { useState } from "react";
import {  Home, ThumbsUp , Video ,Search, Settings, ChevronDown, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./components/ui/sidebar";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Your Videos", url: "/yourVideo", icon: Video },
  { title: "Liked Videos", url: "/calendar", icon: ThumbsUp  },
  { title: "Search", url: "/search", icon: Search },
];

const settingsSubItems = [
  { title: "Theme", url: "/settings/theme" },
  { title: "Change Password", url: "/settings/change-password" },
  { title: "MyTube Premium", url: "/settings/premium" },
  { title: "Account", url: "/settings/account" },
];

export default function AppSidebar() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const location = useLocation();

  // Helper to highlight active route
  const isActive = (url) => location.pathname === url;

  return (
    <Sidebar className="pt-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500 dark:text-gray-400">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200
                        ${isActive(item.url)
                          ? "bg-blue-500 text-white dark:bg-blue-600"
                          : "hover:bg-gray-200 dark:hover:bg-gray-800"
                        }`}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Settings with collapsible submenu */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setSettingsOpen(!settingsOpen)}
                  className="flex justify-between items-center w-full px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </div>
                  {settingsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </SidebarMenuButton>

                {/* Submenu */}
                {settingsOpen && (
                  <div className="ml-6 mt-1 space-y-1">
                    {settingsSubItems.map((subItem) => (
                      <SidebarMenuItem key={subItem.title}>
                        <SidebarMenuButton asChild>
                          <Link
                            to={subItem.url}
                            className={`block px-3 py-2 rounded-md text-sm transition-colors duration-200
                              ${isActive(subItem.url)
                                ? "bg-blue-500 text-white dark:bg-blue-600"
                                : "hover:bg-gray-200 dark:hover:bg-gray-800"
                              }`}
                          >
                            {subItem.title}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </div>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
