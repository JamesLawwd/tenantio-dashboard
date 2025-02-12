
import { AddTenantDialog } from "@/components/dashboard/add-tenant-dialog"
import { Button } from "@/components/ui/button"
import { tenants } from "@/data/mock-data"
import { useToast } from "@/hooks/use-toast"
import { Check, X, Trash2, CalendarDays, Home } from "lucide-react"
import { format } from "date-fns"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"

const Tenants = () => {
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
              <h1 className="text-3xl font-bold tracking-tight">Tenants</h1>
              <p className="text-muted-foreground">
                Manage your property tenants
              </p>
            </div>
            <div className="flex items-center gap-4">
              <AddTenantDialog />
              <SidebarTrigger />
            </div>
          </div>

          <div className="rounded-lg border bg-card">
            <div className="p-6">
              <div className="divide-y">
                {tenants.map((tenant) => (
                  <div
                    key={tenant.id}
                    className="flex items-center justify-between py-4"
                  >
                    <div className="flex items-center gap-3">
                      {tenant.hasPaidRent ? (
                        <Check className="h-5 w-5 text-[#8B5CF6]" />
                      ) : (
                        <X className="h-5 w-5 text-[#ea384c]" />
                      )}
                      <div className="space-y-1">
                        <p className="font-medium">{tenant.name}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Home className="h-4 w-4" />
                            <span>Unit {tenant.unit}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4" />
                            <span>Moved in {format(new Date(tenant.moveInDate), 'PPP')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-medium">
                        KES {tenant.rentAmount.toLocaleString()}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveTenant(tenant.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Tenants
