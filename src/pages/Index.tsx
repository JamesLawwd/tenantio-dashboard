
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { StatsCards } from "@/components/dashboard/stats-cards"

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome to your tenant management dashboard
              </p>
            </div>
            <SidebarTrigger />
          </div>
          <div className="space-y-8 animate-fade-up">
            <StatsCards />
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              <p className="text-muted-foreground">No recent activity to show.</p>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Index
