
import { format } from "date-fns"
import { recentPayments } from "@/data/mock-data"

export function RecentPayments() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Rent Payments</h2>
      <div className="space-y-4">
        {recentPayments.length === 0 ? (
          <p className="text-muted-foreground">No recent payments to show.</p>
        ) : (
          <div className="space-y-4">
            {recentPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="space-y-1">
                  <p className="font-medium">{payment.tenantName}</p>
                  <p className="text-sm text-muted-foreground">
                    Unit {payment.unit} • {format(new Date(payment.date), "PPP")}
                  </p>
                </div>
                <div className="font-medium">
                  KES {payment.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
