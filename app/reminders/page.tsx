"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, Clock, CheckCircle2, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface Tenant {
  id: string
  name: string
  phone: string
  roomNumber: string
  status: "pending" | "late"
  amount: number
  dueDate: string
}

const pendingTenants: Tenant[] = [
  {
    id: "1",
    name: "Amit Kumar",
    phone: "+91 98765 43212",
    roomNumber: "103",
    status: "pending",
    amount: 12500,
    dueDate: "5th",
  },
  {
    id: "2",
    name: "Sneha Gupta",
    phone: "+91 98765 43213",
    roomNumber: "104",
    status: "late",
    amount: 10000,
    dueDate: "1st",
  },
  {
    id: "3",
    name: "Neha Reddy",
    phone: "+91 98765 43215",
    roomNumber: "106",
    status: "pending",
    amount: 13500,
    dueDate: "5th",
  },
  {
    id: "4",
    name: "Ravi Kumar",
    phone: "+91 98765 43218",
    roomNumber: "110",
    status: "pending",
    amount: 20000,
    dueDate: "10th",
  },
  {
    id: "5",
    name: "Deepak Singh",
    phone: "+91 98765 43219",
    roomNumber: "110",
    status: "late",
    amount: 20000,
    dueDate: "1st",
  },
]

const messageTemplates = {
  friendly: `Hi {name}, this is a friendly reminder that your rent of ₹{amount} for Room {room} is due on the {dueDate}. Please make the payment at your earliest convenience. Thank you!`,
  urgent: `Dear {name}, your rent payment of ₹{amount} for Room {room} is now overdue. Please clear the dues immediately to avoid any inconvenience. Contact us if you have any issues.`,
  custom: "",
}

export default function RemindersPage() {
  const [selectedTenants, setSelectedTenants] = useState<string[]>([])
  const [messageType, setMessageType] = useState<"friendly" | "urgent" | "custom">("friendly")
  const [customMessage, setCustomMessage] = useState("")
  const [sentReminders, setSentReminders] = useState<string[]>([])

  const toggleTenant = (id: string) => {
    setSelectedTenants((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    )
  }

  const selectAll = () => {
    if (selectedTenants.length === pendingTenants.length) {
      setSelectedTenants([])
    } else {
      setSelectedTenants(pendingTenants.map((t) => t.id))
    }
  }

  const sendReminders = () => {
    if (selectedTenants.length === 0) return
    
    // Simulate sending reminders
    setSentReminders((prev) => [...prev, ...selectedTenants])
    setSelectedTenants([])
  }

  const getMessage = (tenant: Tenant) => {
    const template = messageType === "custom" ? customMessage : messageTemplates[messageType]
    return template
      .replace("{name}", tenant.name.split(" ")[0])
      .replace("{amount}", tenant.amount.toLocaleString())
      .replace("{room}", tenant.roomNumber)
      .replace("{dueDate}", tenant.dueDate)
  }

  const pendingCount = pendingTenants.filter((t) => t.status === "pending").length
  const lateCount = pendingTenants.filter((t) => t.status === "late").length

  return (
    <DashboardLayout title="Reminders">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Tenant Selection */}
        <div className="lg:col-span-2">
          {/* Summary */}
          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Total Tenants</p>
                  <p className="text-2xl font-bold">{pendingTenants.length}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-warning/10">
                  <Clock className="h-5 w-5 text-warning" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">{pendingCount}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-destructive/10">
                  <Clock className="h-5 w-5 text-destructive" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Late</p>
                  <p className="text-2xl font-bold">{lateCount}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="text-lg">Select Tenants</CardTitle>
                  <CardDescription className="mt-1">
                    Choose tenants to send rent reminders via WhatsApp
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={selectAll} className="w-full sm:w-auto">
                  {selectedTenants.length === pendingTenants.length
                    ? "Deselect All"
                    : "Select All"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 sm:p-6 sm:pt-0">
              <div className="divide-y">
                {pendingTenants.map((tenant) => {
                  const isSelected = selectedTenants.includes(tenant.id)
                  const wasSent = sentReminders.includes(tenant.id)
                  
                  return (
                    <div
                      key={tenant.id}
                      className={cn(
                        "flex items-start gap-3 px-4 py-4 transition-colors sm:items-center sm:gap-4 sm:px-0",
                        isSelected && "bg-muted/50 sm:rounded-lg sm:-mx-2 sm:px-2"
                      )}
                    >
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleTenant(tenant.id)}
                        disabled={wasSent}
                        className="mt-1 sm:mt-0"
                      />
                      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-muted sm:flex">
                            <span className="text-sm font-semibold">
                              {tenant.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold">{tenant.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Room {tenant.roomNumber} <span className="hidden sm:inline">• {tenant.phone}</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-3 sm:gap-4">
                          <div className="sm:text-right">
                            <p className="font-semibold">
                              ₹{tenant.amount.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Due: {tenant.dueDate}
                            </p>
                          </div>
                          {wasSent ? (
                            <Badge
                              variant="outline"
                              className="border-success/30 bg-success/10 text-success"
                            >
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Sent
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className={cn(
                                tenant.status === "late"
                                  ? "border-destructive/30 bg-destructive/10 text-destructive"
                                  : "border-warning/30 bg-warning/10 text-warning"
                              )}
                            >
                              {tenant.status === "late" ? "Late" : "Pending"}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Composer */}
        <div>
          <Card className="lg:sticky lg:top-24">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageCircle className="h-5 w-5 text-success" />
                WhatsApp Message
              </CardTitle>
              <CardDescription>
                Compose your reminder message
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Message Template</Label>
                <Select
                  value={messageType}
                  onValueChange={(value: "friendly" | "urgent" | "custom") =>
                    setMessageType(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="friendly">Friendly Reminder</SelectItem>
                    <SelectItem value="urgent">Urgent Notice</SelectItem>
                    <SelectItem value="custom">Custom Message</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Message Preview</Label>
                {messageType === "custom" ? (
                  <Textarea
                    placeholder="Type your custom message here. Use {name}, {amount}, {room}, and {dueDate} as placeholders."
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="min-h-[150px] resize-none"
                  />
                ) : (
                  <div className="rounded-lg border bg-muted/30 p-4 text-sm leading-relaxed">
                    {pendingTenants[0] && getMessage(pendingTenants[0])}
                  </div>
                )}
              </div>

              <div className="space-y-2 rounded-lg bg-muted/50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Available Placeholders
                </p>
                <div className="flex flex-wrap gap-2">
                  {["{name}", "{amount}", "{room}", "{dueDate}"].map((tag) => (
                    <code
                      key={tag}
                      className="rounded-md bg-background px-2 py-1 text-xs font-medium"
                    >
                      {tag}
                    </code>
                  ))}
                </div>
              </div>

              <Button
                className="w-full"
                disabled={selectedTenants.length === 0}
                onClick={sendReminders}
              >
                <Send className="mr-2 h-4 w-4" />
                Send to {selectedTenants.length} Tenant
                {selectedTenants.length !== 1 ? "s" : ""}
              </Button>

              {selectedTenants.length === 0 && (
                <p className="text-center text-xs text-muted-foreground">
                  Select tenants to send reminders
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
