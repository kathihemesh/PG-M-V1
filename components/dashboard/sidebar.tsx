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
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useId, createContext, useContext } from "react"
import { useTheme } from "next-themes"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, description: "Overview and statistics" },
  { href: "/tenants", label: "Tenants", icon: Users, description: "Manage tenant information" },
  { href: "/rooms", label: "Rooms", icon: DoorOpen, description: "Room inventory and status" },
  { href: "/payments", label: "Payments", icon: CreditCard, description: "Track rent payments" },
  { href: "/reminders", label: "Reminders", icon: Bell, description: "Payment reminders" },
  { href: "/settings", label: "Settings", icon: Settings, description: "App configuration" },
]

// Create context for sidebar collapsed state
const SidebarContext = createContext<{
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}>({
  collapsed: false,
  setCollapsed: () => {},
})

export const useSidebar = () => useContext(SidebarContext)

interface SidebarProps {
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

function SidebarThemeToggle({ showLabel = true }: { showLabel?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size={showLabel ? "default" : "icon"}
        className={cn(
          "w-full justify-start gap-3",
          !showLabel && "h-10 w-10 justify-center p-0"
        )}
        disabled
      >
        <Sun className="h-5 w-5" aria-hidden="true" />
        {showLabel && <span>Toggle Theme</span>}
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size={showLabel ? "default" : "icon"}
      onClick={toggleTheme}
      aria-label={`Switch to ${resolvedTheme === "light" ? "dark" : "light"} mode`}
      className={cn(
        "w-full justify-start gap-3 text-muted-foreground hover:bg-muted hover:text-foreground",
        !showLabel && "h-10 w-10 justify-center p-0"
      )}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
      {showLabel && (
        <span>{resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}</span>
      )}
    </Button>
  )
}

export function Sidebar({ mobileOpen, setMobileOpen, collapsed, setCollapsed }: SidebarProps) {
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
    <TooltipProvider delayDuration={0}>
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
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-card shadow-xl transition-all duration-300 ease-in-out lg:z-40 lg:translate-x-0 lg:shadow-none lg:aria-[hidden=true]:block",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          collapsed ? "lg:w-[72px]" : "lg:w-64",
          "w-[280px]"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
          <Link 
            href="/" 
            className={cn(
              "flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              collapsed && "lg:justify-center"
            )}
            aria-label="PG Manager - Go to dashboard"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary" aria-hidden="true">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className={cn(
              "text-lg font-semibold tracking-tight text-foreground transition-opacity duration-200",
              collapsed && "lg:hidden"
            )}>
              PG Manager
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 lg:hidden"
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
              const linkContent = (
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  aria-describedby={collapsed ? undefined : `${navId}-${item.label.toLowerCase()}-desc`}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    collapsed && "lg:justify-center lg:px-2"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <span className={cn(collapsed && "lg:hidden")}>{item.label}</span>
                </Link>
              )
              
              return (
                <li key={item.href}>
                  {collapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild className="hidden lg:flex">
                        {linkContent}
                      </TooltipTrigger>
                      <TooltipContent side="right" className="hidden lg:block">
                        {item.label}
                      </TooltipContent>
                      <div className="lg:hidden">{linkContent}</div>
                    </Tooltip>
                  ) : (
                    linkContent
                  )}
                  {!collapsed && (
                    <span id={`${navId}-${item.label.toLowerCase()}-desc`} className="sr-only">
                      {item.description}
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer - pinned to bottom */}
        <div className="mt-auto shrink-0 border-t border-border">
          {/* Theme toggle for mobile - above version info */}
          <div className={cn(
            "border-b border-border p-3 lg:hidden",
          )}>
            <SidebarThemeToggle showLabel={true} />
          </div>
          
          {/* Collapse toggle for desktop */}
          <div className="hidden border-b border-border p-2 lg:block">
            {collapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCollapsed(false)}
                    aria-label="Expand sidebar"
                    className="h-10 w-full text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  Expand sidebar
                </TooltipContent>
              </Tooltip>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCollapsed(true)}
                aria-label="Collapse sidebar"
                className="w-full justify-start gap-3 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                <span>Collapse</span>
              </Button>
            )}
          </div>

          {/* Version info - always at bottom */}
          <div className={cn(
            "p-3",
            collapsed && "lg:p-2"
          )}>
            <div className={cn(
              "rounded-lg bg-muted/50 p-3",
              collapsed && "lg:p-2 lg:text-center"
            )}>
              <p className={cn(
                "text-xs font-medium text-foreground",
                collapsed && "lg:hidden"
              )}>
                PG Rent Manager
              </p>
              <p className={cn(
                "mt-0.5 text-xs text-muted-foreground",
                collapsed && "lg:mt-0"
              )}>
                {collapsed ? (
                  <span className="hidden lg:inline">v1.0</span>
                ) : null}
                <span className={cn(collapsed && "lg:hidden")}>Version 1.0.0</span>
              </p>
            </div>
          </div>
        </div>
      </aside>
    </TooltipProvider>
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

export function SidebarToggleButton({
  collapsed,
  onClick,
}: {
  collapsed: boolean
  onClick: () => void
}) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="hidden shrink-0 lg:flex focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            onClick={onClick}
            aria-expanded={!collapsed}
            aria-controls="main-sidebar"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            ) : (
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          {collapsed ? "Expand sidebar" : "Collapse sidebar"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
