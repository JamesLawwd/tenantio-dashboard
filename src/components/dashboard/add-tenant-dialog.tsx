
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { tenants } from "@/data/mock-data"
import { useToast } from "@/hooks/use-toast"

export function AddTenantDialog() {
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [unit, setUnit] = useState("")
  const [rentAmount, setRentAmount] = useState("")
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newTenant = {
      id: (tenants.length + 1).toString(),
      name,
      unit,
      rentAmount: Number(rentAmount),
    }
    
    tenants.push(newTenant)
    toast({
      title: "Success",
      description: "Tenant added successfully",
    })
    setOpen(false)
    setName("")
    setUnit("")
    setRentAmount("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Tenant</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Tenant</DialogTitle>
            <DialogDescription>
              Fill in the tenant details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="unit">Unit Number</Label>
              <Input
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="A1"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rent">Rent Amount (KES)</Label>
              <Input
                id="rent"
                type="number"
                value={rentAmount}
                onChange={(e) => setRentAmount(e.target.value)}
                placeholder="45000"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Tenant</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
