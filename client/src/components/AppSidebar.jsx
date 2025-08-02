import {
  Home,
  ThumbsUp,
  Video,
  History,
  ListVideo,
  Settings,
  Users,
} from "lucide-react";

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
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Subscriptions",
    url: "#",
    icon: Users, 
  },
  {
    title: "Subscripted",
    url: "#",
    icon: Video, 
  },
  {
    title: "Liked Videos",
    url: "#",
    icon: ThumbsUp,
  },
  {
    title: "Your Videos",
    url: "#",
    icon: Video,
  },
  {
    title: "History",
    url: "#",
    icon: History,
  },
  {
    title: "Playlist",
    url: "#",
    icon: ListVideo, 
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(({ title, url, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton asChild>
                    <a href={url} className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span>{title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
