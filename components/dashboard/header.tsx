"use client"

import { Search, Bell } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MobileMenuButton } from "./sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { useId } from "react"

interface HeaderProps {
  title: string
  onMenuClick: () => void
  isMobileMenuOpen: boolean
}

export function Header({ title, onMenuClick, isMobileMenuOpen }: HeaderProps) {
  const searchId = useId()
  const notificationCount = 3

  return (
    <header 
      role="banner"
      className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
    >
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <MobileMenuButton onClick={onMenuClick} isOpen={isMobileMenuOpen} />
          <h1 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl lg:text-2xl">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3" role="toolbar" aria-label="Header actions">
          {/* Search - Desktop only */}
          <div className="relative hidden md:block">
            <label htmlFor={searchId} className="sr-only">Search</label>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" aria-hidden="true" />
            <Input
              id={searchId}
              type="search"
              placeholder="Search tenants, rooms..."
              className="w-48 bg-muted/50 pl-9 focus:bg-background lg:w-64"
              aria-describedby={`${searchId}-hint`}
            />
            <span id={`${searchId}-hint`} className="sr-only">
              Search for tenants, rooms, or payments
            </span>
          </div>

          {/* Search - Mobile */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            aria-label="Open search"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                aria-label={`Notifications, ${notificationCount} unread`}
              >
                <Bell className="h-5 w-5" aria-hidden="true" />
                {notificationCount > 0 && (
                  <span 
                    className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-semibold text-destructive-foreground"
                    aria-hidden="true"
                  >
                    {notificationCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium">Payment Due Reminder</span>
                <span className="text-xs text-muted-foreground">Rahul Sharma - Room 101 - Due tomorrow</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium">Late Payment Alert</span>
                <span className="text-xs text-muted-foreground">Priya Patel - Room 203 - 5 days overdue</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium">New Tenant Added</span>
                <span className="text-xs text-muted-foreground">Amit Kumar assigned to Room 105</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-primary">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-9 w-9 rounded-full p-0"
                aria-label="User menu"
              >
                <Avatar className="h-9 w-9 ring-2 ring-border">
                  <AvatarImage src="/avatar.jpg" alt="" />
                  <AvatarFallback className="bg-primary text-sm font-medium text-primary-foreground">
                    AD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@pgmanager.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Help & Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
