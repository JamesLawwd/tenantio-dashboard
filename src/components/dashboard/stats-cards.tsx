
import { Users, Home, DollarSign, Droplets } from "lucide-react"
import { DataCard } from "@/components/ui/data-card"

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <DataCard
        title="Total Tenants"
        value="42"
        icon={<Users className="h-4 w-4" />}
        description="Active tenants this month"
      />
      <DataCard
        title="Vacant Units"
        value="3"
        icon={<Home className="h-4 w-4" />}
        description="Available for rent"
      />
      <DataCard
        title="Revenue"
        value="KES 420,000"
        icon={<DollarSign className="h-4 w-4" />}
        description="Collected this month"
      />
      <DataCard
        title="Water Usage"
        value="1,240L"
        icon={<Droplets className="h-4 w-4" />}
        description="Total consumption"
      />
    </div>
  )
}
