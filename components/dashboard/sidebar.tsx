"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  DoorOpen,
  CreditCard,
  Bell,
  Settings,
  Building2,
  X,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useCallback, useId } from "react"

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, description: "Overview and statistics" },
  { href: "/tenants", label: "Tenants", icon: Users, description: "Manage tenant information" },
  { href: "/rooms", label: "Rooms", icon: DoorOpen, description: "Room inventory and status" },
  { href: "/payments", label: "Payments", icon: CreditCard, description: "Track rent payments" },
  { href: "/reminders", label: "Reminders", icon: Bell, description: "Payment reminders" },
  { href: "/settings", label: "Settings", icon: Settings, description: "App configuration" },
]

interface SidebarProps {
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
}

export function Sidebar({ mobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname()
  const navId = useId()

  // Close sidebar on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname, setMobileOpen])

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false)
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [mobileOpen, setMobileOpen])

  // Trap focus within sidebar when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        id="main-sidebar"
        role="navigation"
        aria-label="Main navigation"
        aria-hidden={!mobileOpen}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-border bg-card shadow-xl transition-transform duration-300 ease-in-out lg:z-40 lg:w-64 lg:translate-x-0 lg:shadow-none lg:aria-[hidden=true]:block",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <Link 
            href="/" 
            className="flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="PG Manager - Go to dashboard"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary" aria-hidden="true">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              PG Manager
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-labelledby={`${navId}-label`}>
          <h2 id={`${navId}-label`} className="sr-only">Main navigation</h2>
          <ul className="flex flex-col gap-1" role="list">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    aria-describedby={`${navId}-${item.label.toLowerCase()}-desc`}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                  <span id={`${navId}-${item.label.toLowerCase()}-desc`} className="sr-only">
                    {item.description}
                  </span>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4">
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs font-medium text-foreground">PG Rent Manager</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Version 1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  )
}

export function MobileMenuButton({
  onClick,
  isOpen,
}: {
  onClick: () => void
  isOpen: boolean
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="shrink-0 lg:hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls="main-sidebar"
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
    >
      <Menu className="h-5 w-5" aria-hidden="true" />
    </Button>
  )
}
