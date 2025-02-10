
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentPayments } from "@/components/dashboard/recent-payments"

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
            <RecentPayments />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Index
