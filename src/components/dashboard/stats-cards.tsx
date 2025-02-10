
import { Users, Home, DollarSign, Droplets } from "lucide-react"
import { DataCard } from "@/components/ui/data-card"
import { calculateStats } from "@/data/mock-data"

export function StatsCards() {
  const stats = calculateStats()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <DataCard
        title="Total Tenants"
        value={stats.totalTenants.toString()}
        icon={<Users className="h-4 w-4" />}
        description="Active tenants this month"
      />
      <DataCard
        title="Vacant Units"
        value={stats.vacantUnits.toString()}
        icon={<Home className="h-4 w-4" />}
        description="Available for rent"
      />
      <DataCard
        title="Revenue"
        value={`KES ${stats.totalRevenue.toLocaleString()}`}
        icon={<DollarSign className="h-4 w-4" />}
        description="Collected this month"
      />
      <DataCard
        title="Water Usage"
        value={stats.waterUsage}
        icon={<Droplets className="h-4 w-4" />}
        description="Total consumption"
      />
    </div>
  )
}
