"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => { success: boolean; error?: string }
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Predefined credentials
const VALID_EMAIL = "admin@gmail.com"
const VALID_PASSWORD = "admin@123"
const AUTH_STORAGE_KEY = "pg-manager-auth"

// Public routes that don't require authentication
const PUBLIC_ROUTES = ["/login"]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const authData = localStorage.getItem(AUTH_STORAGE_KEY)
        if (authData === "true") {
          setIsAuthenticated(true)
        }
      } catch {
        // localStorage not available
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  // Redirect based on auth status
  useEffect(() => {
    if (isLoading) return

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname)

    if (!isAuthenticated && !isPublicRoute) {
      // Redirect to login if not authenticated and trying to access protected route
      router.push("/login")
    } else if (isAuthenticated && pathname === "/login") {
      // Redirect to dashboard if already authenticated and on login page
      router.push("/")
    }
  }, [isAuthenticated, isLoading, pathname, router])

  const login = useCallback((email: string, password: string) => {
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      setIsAuthenticated(true)
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, "true")
      } catch {
        // localStorage not available
      }
      router.push("/")
      return { success: true }
    }
    return { success: false, error: "Invalid email or password. Please try again." }
  }, [router])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    } catch {
      // localStorage not available
    }
    router.push("/login")
  }, [router])

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
