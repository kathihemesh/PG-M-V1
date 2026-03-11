"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { StatsCard } from "@/components/dashboard/stats-card"
import { RentCollectionChart } from "@/components/dashboard/rent-collection-chart"
import { PaymentStatusChart } from "@/components/dashboard/payment-status-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, IndianRupee, Clock, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

const recentActivity = [
  {
    tenant: "Rahul Sharma",
    action: "Rent paid",
    amount: "₹12,500",
    time: "2 hours ago",
    status: "success",
  },
  {
    tenant: "Priya Patel",
    action: "Rent paid",
    amount: "₹15,000",
    time: "5 hours ago",
    status: "success",
  },
  {
    tenant: "Amit Kumar",
    action: "Reminder sent",
    amount: "₹12,500",
    time: "1 day ago",
    status: "pending",
  },
  {
    tenant: "Sneha Gupta",
    action: "Late payment",
    amount: "₹10,000",
    time: "3 days ago",
    status: "late",
  },
]

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard">
      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Tenants"
          value={24}
          description="across 12 rooms"
          icon={Users}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Paid This Month"
          value="₹2,25,000"
          description="from 18 tenants"
          icon={IndianRupee}
          trend={{ value: 12, isPositive: true }}
          iconClassName="bg-success/10"
        />
        <StatsCard
          title="Pending Payments"
          value={4}
          description="₹50,000 pending"
          icon={Clock}
          iconClassName="bg-warning/10"
        />
        <StatsCard
          title="Late Payments"
          value={2}
          description="follow up required"
          icon={AlertTriangle}
          iconClassName="bg-destructive/10"
        />
      </div>

      {/* Charts */}
      <div className="mt-6 grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="min-w-0">
          <RentCollectionChart />
        </div>
        <div className="min-w-0">
          <PaymentStatusChart />
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="mt-6 min-w-0 overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 px-4 py-4 transition-colors hover:bg-muted/50 sm:items-center sm:gap-4 sm:px-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                  {activity.tenant
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div className="min-w-0">
                      <p className="truncate font-medium">{activity.tenant}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs",
                            activity.status === "success" &&
                              "border-success/30 bg-success/10 text-success",
                            activity.status === "pending" &&
                              "border-warning/30 bg-warning/10 text-warning",
                            activity.status === "late" &&
                              "border-destructive/30 bg-destructive/10 text-destructive"
                          )}
                        >
                          {activity.action}
                        </Badge>
                        <span className="text-xs text-muted-foreground sm:text-sm">
                          {activity.time}
                        </span>
                      </div>
                    </div>
                    <p className="mt-1 text-base font-semibold sm:mt-0 sm:text-right">
                      {activity.amount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
