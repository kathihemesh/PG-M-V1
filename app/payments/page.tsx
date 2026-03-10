"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Check, IndianRupee, Clock, AlertTriangle, Home, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface Payment {
  id: string
  tenantName: string
  roomNumber: string
  amount: number
  status: "paid" | "pending" | "late"
  dueDate: string
  paidDate?: string
}

const initialPayments: Payment[] = [
  {
    id: "1",
    tenantName: "Rahul Sharma",
    roomNumber: "101",
    amount: 12500,
    status: "paid",
    dueDate: "2024-03-05",
    paidDate: "2024-03-03",
  },
  {
    id: "2",
    tenantName: "Priya Patel",
    roomNumber: "102",
    amount: 15000,
    status: "paid",
    dueDate: "2024-03-01",
    paidDate: "2024-03-01",
  },
  {
    id: "3",
    tenantName: "Amit Kumar",
    roomNumber: "103",
    amount: 12500,
    status: "pending",
    dueDate: "2024-03-05",
  },
  {
    id: "4",
    tenantName: "Sneha Gupta",
    roomNumber: "104",
    amount: 10000,
    status: "late",
    dueDate: "2024-03-01",
  },
  {
    id: "5",
    tenantName: "Vikram Singh",
    roomNumber: "105",
    amount: 14000,
    status: "paid",
    dueDate: "2024-03-10",
    paidDate: "2024-03-08",
  },
  {
    id: "6",
    tenantName: "Neha Reddy",
    roomNumber: "106",
    amount: 13500,
    status: "pending",
    dueDate: "2024-03-05",
  },
  {
    id: "7",
    tenantName: "Karan Mehta",
    roomNumber: "107",
    amount: 11000,
    status: "paid",
    dueDate: "2024-03-01",
    paidDate: "2024-02-28",
  },
  {
    id: "8",
    tenantName: "Anita Desai",
    roomNumber: "108",
    amount: 16000,
    status: "paid",
    dueDate: "2024-03-05",
    paidDate: "2024-03-05",
  },
  {
    id: "9",
    tenantName: "Ravi Kumar",
    roomNumber: "110",
    amount: 20000,
    status: "pending",
    dueDate: "2024-03-10",
  },
  {
    id: "10",
    tenantName: "Deepak Singh",
    roomNumber: "110",
    amount: 20000,
    status: "late",
    dueDate: "2024-03-01",
  },
]

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(initialPayments)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.tenantName.toLowerCase().includes(search.toLowerCase()) ||
      payment.roomNumber.includes(search)
    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleMarkPaid = (id: string) => {
    setPayments((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: "paid" as const,
              paidDate: new Date().toISOString().split("T")[0],
            }
          : p
      )
    )
  }

  const totalCollected = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0)
  const totalPending = payments
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0)
  const totalLate = payments
    .filter((p) => p.status === "late")
    .reduce((sum, p) => sum + p.amount, 0)

  const getStatusBadge = (status: Payment["status"]) => {
    const styles = {
      paid: "border-success/30 bg-success/10 text-success",
      pending: "border-warning/30 bg-warning/10 text-warning",
      late: "border-destructive/30 bg-destructive/10 text-destructive",
    }
    return (
      <Badge variant="outline" className={cn("font-medium", styles[status])}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <DashboardLayout title="Payments">
      {/* Summary Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card className="transition-shadow hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-success/10">
              <IndianRupee className="h-6 w-6 text-success" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-muted-foreground">Collected</p>
              <p className="truncate text-xl font-bold sm:text-2xl">
                ₹{totalCollected.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="transition-shadow hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-warning/10">
              <Clock className="h-6 w-6 text-warning" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-muted-foreground">Pending</p>
              <p className="truncate text-xl font-bold sm:text-2xl">
                ₹{totalPending.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="transition-shadow hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-muted-foreground">Late</p>
              <p className="truncate text-xl font-bold sm:text-2xl">
                ₹{totalLate.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search payments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-muted/50 pl-9 focus:bg-background"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="late">Late</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Mobile Cards View */}
      <div className="grid gap-4 md:hidden">
        {filteredPayments.map((payment) => (
          <Card key={payment.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-semibold">{payment.tenantName}</h3>
                    {getStatusBadge(payment.status)}
                  </div>
                  <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 shrink-0" />
                      <span>Room {payment.roomNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 shrink-0" />
                      <span>
                        Due:{" "}
                        {new Date(payment.dueDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t pt-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Amount</p>
                      <p className="text-lg font-bold">₹{payment.amount.toLocaleString()}</p>
                    </div>
                    {payment.status !== "paid" ? (
                      <Button
                        size="sm"
                        onClick={() => handleMarkPaid(payment.id)}
                      >
                        <Check className="mr-1.5 h-4 w-4" />
                        Mark Paid
                      </Button>
                    ) : (
                      <span className="text-sm font-medium text-success">Paid</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredPayments.length === 0 && (
          <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
            No payments found.
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <Card className="hidden md:block">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold">Tenant</TableHead>
                <TableHead className="font-semibold">Room</TableHead>
                <TableHead className="font-semibold">Amount</TableHead>
                <TableHead className="font-semibold">Due Date</TableHead>
                <TableHead className="font-semibold">Paid Date</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="w-[120px] font-semibold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">
                    {payment.tenantName}
                  </TableCell>
                  <TableCell>{payment.roomNumber}</TableCell>
                  <TableCell className="font-medium">₹{payment.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    {new Date(payment.dueDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    {payment.paidDate
                      ? new Date(payment.paidDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "-"}
                  </TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>
                    {payment.status !== "paid" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMarkPaid(payment.id)}
                        className="h-8"
                      >
                        <Check className="mr-1.5 h-3 w-3" />
                        Mark Paid
                      </Button>
                    ) : (
                      <span className="text-sm font-medium text-success">Paid</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredPayments.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No payments found.
            </div>
          )}
        </div>
      </Card>
    </DashboardLayout>
  )
}
