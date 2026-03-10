"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { Plus, Search, Users, DoorOpen, Pencil } from "lucide-react"
import { cn } from "@/lib/utils"

interface Room {
  id: string
  number: string
  status: "occupied" | "vacant" | "maintenance"
  tenantCount: number
  capacity: number
  rentAmount: number
  tenants: string[]
}

const initialRooms: Room[] = [
  {
    id: "1",
    number: "101",
    status: "occupied",
    tenantCount: 2,
    capacity: 2,
    rentAmount: 12500,
    tenants: ["Rahul Sharma", "Arun Verma"],
  },
  {
    id: "2",
    number: "102",
    status: "occupied",
    tenantCount: 1,
    capacity: 1,
    rentAmount: 15000,
    tenants: ["Priya Patel"],
  },
  {
    id: "3",
    number: "103",
    status: "occupied",
    tenantCount: 2,
    capacity: 3,
    rentAmount: 12500,
    tenants: ["Amit Kumar", "Sanjay Joshi"],
  },
  {
    id: "4",
    number: "104",
    status: "occupied",
    tenantCount: 1,
    capacity: 1,
    rentAmount: 10000,
    tenants: ["Sneha Gupta"],
  },
  {
    id: "5",
    number: "105",
    status: "occupied",
    tenantCount: 2,
    capacity: 2,
    rentAmount: 14000,
    tenants: ["Vikram Singh", "Mohit Sharma"],
  },
  {
    id: "6",
    number: "106",
    status: "vacant",
    tenantCount: 0,
    capacity: 2,
    rentAmount: 13500,
    tenants: [],
  },
  {
    id: "7",
    number: "107",
    status: "occupied",
    tenantCount: 1,
    capacity: 2,
    rentAmount: 11000,
    tenants: ["Karan Mehta"],
  },
  {
    id: "8",
    number: "108",
    status: "maintenance",
    tenantCount: 0,
    capacity: 2,
    rentAmount: 16000,
    tenants: [],
  },
  {
    id: "9",
    number: "109",
    status: "vacant",
    tenantCount: 0,
    capacity: 3,
    rentAmount: 18000,
    tenants: [],
  },
  {
    id: "10",
    number: "110",
    status: "occupied",
    tenantCount: 3,
    capacity: 3,
    rentAmount: 20000,
    tenants: ["Ravi Kumar", "Deepak Singh", "Ajay Patel"],
  },
  {
    id: "11",
    number: "111",
    status: "occupied",
    tenantCount: 2,
    capacity: 2,
    rentAmount: 14500,
    tenants: ["Neha Reddy", "Pooja Sharma"],
  },
  {
    id: "12",
    number: "112",
    status: "occupied",
    tenantCount: 1,
    capacity: 2,
    rentAmount: 13000,
    tenants: ["Anita Desai"],
  },
]

export default function RoomsPage() {
  const [rooms] = useState<Room[]>(initialRooms)
  const [search, setSearch] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredRooms = rooms.filter((room) =>
    room.number.includes(search)
  )

  const occupiedCount = rooms.filter((r) => r.status === "occupied").length
  const vacantCount = rooms.filter((r) => r.status === "vacant").length
  const maintenanceCount = rooms.filter((r) => r.status === "maintenance").length

  const getStatusBadge = (status: Room["status"]) => {
    const styles = {
      occupied: "border-success/30 bg-success/10 text-success",
      vacant: "border-primary/30 bg-primary/10 text-primary",
      maintenance: "border-warning/30 bg-warning/10 text-warning",
    }
    const labels = {
      occupied: "Occupied",
      vacant: "Vacant",
      maintenance: "Maintenance",
    }
    return (
      <Badge variant="outline" className={cn("font-medium", styles[status])}>
        {labels[status]}
      </Badge>
    )
  }

  return (
    <DashboardLayout title="Rooms">
      {/* Summary Cards */}
      <div className="mb-6 grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card className="transition-shadow hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-4 sm:p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-success/10 sm:h-12 sm:w-12">
              <DoorOpen className="h-5 w-5 text-success sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-muted-foreground">Occupied</p>
              <p className="text-2xl font-bold">{occupiedCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="transition-shadow hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-4 sm:p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 sm:h-12 sm:w-12">
              <DoorOpen className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-muted-foreground">Vacant</p>
              <p className="text-2xl font-bold">{vacantCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="transition-shadow hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-4 sm:p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-warning/10 sm:h-12 sm:w-12">
              <DoorOpen className="h-5 w-5 text-warning sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-muted-foreground">Maintenance</p>
              <p className="text-2xl font-bold">{maintenanceCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header Actions */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search rooms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-muted/50 pl-9 focus:bg-background"
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add Room
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Room</DialogTitle>
              <DialogDescription>
                Enter the details of the new room.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="roomNumber">Room Number</Label>
                <Input id="roomNumber" placeholder="e.g., 113" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input id="capacity" type="number" placeholder="2" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="rentAmount">Rent Amount</Label>
                  <Input id="rentAmount" type="number" placeholder="15000" />
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Add Room</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Rooms Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="overflow-hidden transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-lg font-semibold">Room {room.number}</CardTitle>
              {getStatusBadge(room.status)}
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    Occupancy
                  </span>
                  <span className="font-semibold">
                    {room.tenantCount}/{room.capacity}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Rent</span>
                  <span className="font-semibold">
                    ₹{room.rentAmount.toLocaleString()}
                  </span>
                </div>
                {room.tenants.length > 0 && (
                  <div className="mt-2 border-t pt-3">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Tenants
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {room.tenants.map((tenant, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium"
                        >
                          {tenant}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  <Pencil className="mr-2 h-3 w-3" />
                  Edit Room
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {filteredRooms.length === 0 && (
        <Card className="p-8">
          <p className="text-center text-muted-foreground">No rooms found.</p>
        </Card>
      )}
    </DashboardLayout>
  )
}
