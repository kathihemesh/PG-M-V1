"use client"

import { useState, useCallback, useEffect } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  // Persist collapsed state in localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed")
    if (saved !== null) {
      setCollapsed(saved === "true")
    }
  }, [])

  const handleCollapsedChange = useCallback((value: boolean) => {
    setCollapsed(value)
    localStorage.setItem("sidebar-collapsed", String(value))
  }, [])

  const handleMenuToggle = useCallback(() => {
    setMobileOpen((prev) => !prev)
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Skip to main content
      </a>
      
      <Sidebar 
        mobileOpen={mobileOpen} 
        setMobileOpen={setMobileOpen}
        collapsed={collapsed}
        setCollapsed={handleCollapsedChange}
      />
      
      <div className={`flex min-w-0 max-w-full flex-col transition-all duration-300 ${collapsed ? "lg:pl-[72px]" : "lg:pl-64"}`}>
        <Header
          title={title}
          onMenuClick={handleMenuToggle}
          isMobileMenuOpen={mobileOpen}
        />
        <main 
          id="main-content"
          role="main"
          className="min-w-0 flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8"
          tabIndex={-1}
        >
          <div className="mx-auto w-full max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
