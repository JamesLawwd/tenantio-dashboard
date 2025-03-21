
import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { 
  BarChart3, 
  Calendar, 
  Download, 
  FileSpreadsheet, 
  Filter, 
  Printer, 
  RefreshCw,
  Check,
  X
} from "lucide-react"
import { RevenueChart } from "@/components/reports/revenue-chart"
import { TenantOccupancyChart } from "@/components/reports/tenant-occupancy-chart"
import { RentPaymentStatus } from "@/components/reports/rent-payment-status"
import { MonthlyExpensesChart } from "@/components/reports/monthly-expenses-chart"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const Reports = () => {
  const { toast } = useToast()
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  })
  
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)
  const [propertyFilter, setPropertyFilter] = useState("all")
  const [tenantStatusFilter, setTenantStatusFilter] = useState("all")
  const [minAmount, setMinAmount] = useState("")
  const [maxAmount, setMaxAmount] = useState("")

  const handleDownloadReport = () => {
    toast({
      title: "Report Download Started",
      description: "Your report is being prepared for download.",
    })
  }

  const handleRefresh = () => {
    toast({
      title: "Refreshing Data",
      description: "Report data is being updated.",
    })
  }

  const handlePrint = () => {
    toast({
      title: "Preparing Print",
      description: "Preparing document for printing.",
    })
    window.print()
  }

  const handleApplyFilters = () => {
    toast({
      title: "Filters Applied",
      description: "The report has been filtered based on your criteria.",
    })
    setIsFilterDialogOpen(false)
  }
  
  const handleResetFilters = () => {
    setPropertyFilter("all")
    setTenantStatusFilter("all")
    setMinAmount("")
    setMaxAmount("")
    toast({
      title: "Filters Reset",
      description: "All filters have been reset to default values.",
    })
  }

  const formatDateRange = () => {
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`
    }
    if (dateRange.from) {
      return `From ${format(dateRange.from, "MMM d, yyyy")}`
    }
    return "Date Range"
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
                <p className="text-muted-foreground">
                  Analyze your property management data with customizable reports
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={handleRefresh}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownloadReport}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <SidebarTrigger />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Tabs defaultValue="financial" className="w-full">
                <div className="flex justify-between items-center mb-6">
                  <TabsList>
                    <TabsTrigger value="financial" className="gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Financial
                    </TabsTrigger>
                    <TabsTrigger value="occupancy" className="gap-2">
                      <FileSpreadsheet className="h-4 w-4" />
                      Occupancy
                    </TabsTrigger>
                  </TabsList>

                  <div className="flex items-center gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>{formatDateRange()}</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="end">
                        <CalendarComponent
                          mode="range"
                          selected={dateRange}
                          onSelect={setDateRange}
                          numberOfMonths={2}
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsFilterDialogOpen(true)}
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      <span>Filters</span>
                    </Button>
                    <select
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="quarter">This Quarter</option>
                      <option value="year">This Year</option>
                    </select>
                  </div>
                </div>

                <TabsContent value="financial" className="animate-fade-up space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-medium">Revenue Overview</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <RevenueChart />
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-medium">Rent Payment Status</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <RentPaymentStatus />
                      </CardContent>
                    </Card>
                    <Card className="md:col-span-2">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-medium">Monthly Expenses</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <MonthlyExpensesChart />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="occupancy" className="animate-fade-up space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="md:col-span-2">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-medium">Tenant Occupancy</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <TenantOccupancyChart />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>

      {/* Filters Dialog */}
      <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filter Reports</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="property" className="text-right text-sm">
                Property
              </label>
              <Select
                value={propertyFilter}
                onValueChange={setPropertyFilter}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="All Properties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="sunflower">Sunflower Apartments</SelectItem>
                  <SelectItem value="palms">The Palms Estate</SelectItem>
                  <SelectItem value="greenview">Greenview Heights</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="tenant-status" className="text-right text-sm">
                Tenant Status
              </label>
              <Select
                value={tenantStatusFilter}
                onValueChange={setTenantStatusFilter}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="late">Late Payment</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="min-amount" className="text-right text-sm">
                Min Amount
              </label>
              <Input
                id="min-amount"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                className="col-span-3"
                placeholder="0"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="max-amount" className="text-right text-sm">
                Max Amount
              </label>
              <Input
                id="max-amount"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                className="col-span-3"
                placeholder="100000"
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={handleResetFilters} type="button">
              <X className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button onClick={handleApplyFilters} type="submit">
              <Check className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}

export default Reports
