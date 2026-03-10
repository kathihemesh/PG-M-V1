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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Search, MoreHorizontal, Pencil, Check, Trash2, Phone, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface Tenant {
  id: string
  name: string
  roomNumber: string
  phone: string
  rentAmount: number
  dueDate: string
  status: "paid" | "pending" | "late"
}

const initialTenants: Tenant[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    roomNumber: "101",
    phone: "+91 98765 43210",
    rentAmount: 12500,
    dueDate: "5th",
    status: "paid",
  },
  {
    id: "2",
    name: "Priya Patel",
    roomNumber: "102",
    phone: "+91 98765 43211",
    rentAmount: 15000,
    dueDate: "1st",
    status: "paid",
  },
  {
    id: "3",
    name: "Amit Kumar",
    roomNumber: "103",
    phone: "+91 98765 43212",
    rentAmount: 12500,
    dueDate: "5th",
    status: "pending",
  },
  {
    id: "4",
    name: "Sneha Gupta",
    roomNumber: "104",
    phone: "+91 98765 43213",
    rentAmount: 10000,
    dueDate: "1st",
    status: "late",
  },
  {
    id: "5",
    name: "Vikram Singh",
    roomNumber: "105",
    phone: "+91 98765 43214",
    rentAmount: 14000,
    dueDate: "10th",
    status: "paid",
  },
  {
    id: "6",
    name: "Neha Reddy",
    roomNumber: "106",
    phone: "+91 98765 43215",
    rentAmount: 13500,
    dueDate: "5th",
    status: "pending",
  },
  {
    id: "7",
    name: "Karan Mehta",
    roomNumber: "107",
    phone: "+91 98765 43216",
    rentAmount: 11000,
    dueDate: "1st",
    status: "paid",
  },
  {
    id: "8",
    name: "Anita Desai",
    roomNumber: "108",
    phone: "+91 98765 43217",
    rentAmount: 16000,
    dueDate: "5th",
    status: "paid",
  },
]

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>(initialTenants)
  const [search, setSearch] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredTenants = tenants.filter(
    (tenant) =>
      tenant.name.toLowerCase().includes(search.toLowerCase()) ||
      tenant.roomNumber.includes(search) ||
      tenant.phone.includes(search)
  )

  const handleMarkPaid = (id: string) => {
    setTenants((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "paid" as const } : t))
    )
  }

  const handleDelete = (id: string) => {
    setTenants((prev) => prev.filter((t) => t.id !== id))
  }

  const getStatusBadge = (status: Tenant["status"]) => {
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
    <DashboardLayout title="Tenants">
      {/* Header Actions */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tenants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-muted/50 pl-9 focus:bg-background"
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add Tenant
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Tenant</DialogTitle>
              <DialogDescription>
                Enter the details of the new tenant.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter tenant name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="room">Room Number</Label>
                  <Input id="room" placeholder="e.g., 101" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+91 98765 43210" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="rent">Rent Amount</Label>
                  <Input id="rent" type="number" placeholder="12500" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="due">Due Date</Label>
                  <Input id="due" placeholder="5th" />
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Add Tenant</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Mobile Cards View */}
      <div className="grid gap-4 md:hidden">
        {filteredTenants.map((tenant) => (
          <Card key={tenant.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-semibold">{tenant.name}</h3>
                    {getStatusBadge(tenant.status)}
                  </div>
                  <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 shrink-0" />
                      <span>Room {tenant.roomNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 shrink-0" />
                      <span>{tenant.phone}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t pt-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Rent</p>
                      <p className="font-semibold">₹{tenant.rentAmount.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Due</p>
                      <p className="font-medium">{tenant.dueDate}</p>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    {tenant.status !== "paid" && (
                      <DropdownMenuItem onClick={() => handleMarkPaid(tenant.id)}>
                        <Check className="mr-2 h-4 w-4" />
                        Mark Paid
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => handleDelete(tenant.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredTenants.length === 0 && (
          <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
            No tenants found.
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <Card className="hidden md:block">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Room</TableHead>
                <TableHead className="font-semibold">Phone</TableHead>
                <TableHead className="font-semibold">Rent</TableHead>
                <TableHead className="font-semibold">Due Date</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell className="font-medium">{tenant.name}</TableCell>
                  <TableCell>{tenant.roomNumber}</TableCell>
                  <TableCell>{tenant.phone}</TableCell>
                  <TableCell>₹{tenant.rentAmount.toLocaleString()}</TableCell>
                  <TableCell>{tenant.dueDate}</TableCell>
                  <TableCell>{getStatusBadge(tenant.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        {tenant.status !== "paid" && (
                          <DropdownMenuItem onClick={() => handleMarkPaid(tenant.id)}>
                            <Check className="mr-2 h-4 w-4" />
                            Mark Paid
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(tenant.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredTenants.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No tenants found.
            </div>
          )}
        </div>
      </Card>
    </DashboardLayout>
  )
}
