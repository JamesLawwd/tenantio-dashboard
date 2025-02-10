
import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"

interface Tenant {
  id: number
  name: string
  unit: string
  selected: boolean
}

const initialTenants: Tenant[] = [
  { id: 1, name: "John Kamau", unit: "A1", selected: false },
  { id: 2, name: "Mary Wanjiku", unit: "B2", selected: false },
  { id: 3, name: "Peter Omondi", unit: "C3", selected: false },
  { id: 4, name: "Sarah Adhiambo", unit: "D4", selected: false },
  { id: 5, name: "James Kiprotich", unit: "E5", selected: false },
  { id: 6, name: "Lucy Muthoni", unit: "F6", selected: false },
  { id: 7, name: "David Njoroge", unit: "G7", selected: false },
  { id: 8, name: "Grace Akinyi", unit: "H8", selected: false },
  { id: 9, name: "Michael Kipchoge", unit: "I9", selected: false },
  { id: 10, name: "Anne Wairimu", unit: "J10", selected: false },
]

const Messages = () => {
  const [tenants, setTenants] = useState<Tenant[]>(initialTenants)
  const [message, setMessage] = useState("")
  const [selectAll, setSelectAll] = useState(false)
  const { toast } = useToast()

  const handleSelectAll = () => {
    setSelectAll(!selectAll)
    setTenants(tenants.map(tenant => ({ ...tenant, selected: !selectAll })))
  }

  const handleTenantSelection = (id: number) => {
    setTenants(tenants.map(tenant =>
      tenant.id === id ? { ...tenant, selected: !tenant.selected } : tenant
    ))
    setSelectAll(tenants.every(tenant => tenant.selected))
  }

  const handleSendMessage = () => {
    const selectedTenants = tenants.filter(tenant => tenant.selected)
    if (selectedTenants.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one tenant",
        variant: "destructive",
      })
      return
    }
    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Success",
      description: `Message sent to ${selectedTenants.length} tenant(s)`,
    })
    setMessage("")
    setSelectAll(false)
    setTenants(tenants.map(tenant => ({ ...tenant, selected: false })))
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
              <p className="text-muted-foreground">
                Send messages to your tenants
              </p>
            </div>
            <SidebarTrigger />
          </div>
          <div className="space-y-8 animate-fade-up">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="selectAll" 
                    checked={selectAll}
                    onCheckedChange={handleSelectAll}
                  />
                  <label htmlFor="selectAll" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Select All Tenants
                  </label>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {tenants.map(tenant => (
                    <div key={tenant.id} className="flex items-center space-x-2 border p-4 rounded-lg">
                      <Checkbox 
                        id={`tenant-${tenant.id}`}
                        checked={tenant.selected}
                        onCheckedChange={() => handleTenantSelection(tenant.id)}
                      />
                      <label htmlFor={`tenant-${tenant.id}`} className="text-sm font-medium leading-none">
                        {tenant.name} - Unit {tenant.unit}
                      </label>
                    </div>
                  ))}
                </div>
                <Textarea
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[120px]"
                />
                <Button onClick={handleSendMessage}>
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Messages
