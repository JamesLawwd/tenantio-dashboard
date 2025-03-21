
import { Home, Users, MessageSquare, BarChart3, Settings, Menu } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const menuItems = [
  { title: "Overview", icon: Home, url: "/" },
  { title: "Tenants", icon: Users, url: "/tenants" },
  { title: "Messages", icon: MessageSquare, url: "/messages" },
  { title: "Reports", icon: BarChart3, url: "/reports" },
  { title: "Settings", icon: Settings, url: "/settings" },
]

export function AppSidebar() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { collapsed, setCollapsed } = useSidebar();
  
  return (
    <Sidebar
      defaultCollapsed={isMobile}
      className={isMobile ? "w-[70px]" : ""}
    >
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-between px-4 py-2">
            <SidebarGroupLabel className={isMobile ? "sr-only" : ""}>
              Management
            </SidebarGroupLabel>
            {isMobile && (
              <button 
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setCollapsed(!collapsed)}
              >
                <Menu size={20} />
              </button>
            )}
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    data-state={location.pathname === item.url ? "active" : "inactive"}
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span className={isMobile && collapsed ? "sr-only" : ""}>
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
