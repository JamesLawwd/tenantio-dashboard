
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentPayments } from "@/components/dashboard/recent-payments"
import { AddTenantDialog } from "@/components/dashboard/add-tenant-dialog"
import { Button } from "@/components/ui/button"
import { tenants } from "@/data/mock-data"
import { useToast } from "@/hooks/use-toast"
import { Trash2 } from "lucide-react"

const Index = () => {
  const { toast } = useToast()

  const handleRemoveTenant = (id: string) => {
    const index = tenants.findIndex((t) => t.id === id)
    if (index !== -1) {
      tenants.splice(index, 1)
      toast({
        title: "Success",
        description: "Tenant removed successfully",
      })
    }
  }

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
            <div className="flex items-center gap-4">
              <AddTenantDialog />
              <SidebarTrigger />
            </div>
          </div>
          <div className="space-y-8 animate-fade-up">
            <StatsCards />
            <RecentPayments />
            
            <div className="rounded-lg border bg-card">
              <div className="p-6">
                <h2 className="text-lg font-semibold">Current Tenants</h2>
                <div className="mt-4 divide-y">
                  {tenants.map((tenant) => (
                    <div
                      key={tenant.id}
                      className="flex items-center justify-between py-4"
                    >
                      <div>
                        <p className="font-medium">{tenant.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Unit {tenant.unit} • KES {tenant.rentAmount.toLocaleString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveTenant(tenant.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Index
