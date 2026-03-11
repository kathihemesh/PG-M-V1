"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { User, Session } from "@supabase/supabase-js"

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  session: Session | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()

  // Check authentication status on mount and listen for auth changes
  useEffect(() => {
    const supabase = createClient()
    
    const checkAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession()
        if (currentSession) {
          setSession(currentSession)
          setUser(currentSession.user)
          setIsAuthenticated(true)
        }
      } catch {
        // Error getting session
      }
      setIsLoading(false)
    }
    
    checkAuth()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession)
        setUser(newSession?.user ?? null)
        setIsAuthenticated(!!newSession)
        
        if (event === "SIGNED_OUT") {
          router.push("/login")
          router.refresh()
        }
        
        if (event === "SIGNED_IN") {
          router.refresh()
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  const login = useCallback(async (email: string, password: string) => {
    const supabase = createClient()
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { success: false, error: "Invalid email or password." }
      }

      if (data.session) {
        setSession(data.session)
        setUser(data.user)
        setIsAuthenticated(true)
        router.push("/")
        router.refresh()
        return { success: true }
      }

      return { success: false, error: "Login failed. Please try again." }
    } catch {
      return { success: false, error: "An unexpected error occurred. Please try again." }
    }
  }, [router])

  const logout = useCallback(async () => {
    const supabase = createClient()
    
    try {
      await supabase.auth.signOut()
      setSession(null)
      setUser(null)
      setIsAuthenticated(false)
      router.push("/login")
      router.refresh()
    } catch {
      // Error signing out
    }
  }, [router])

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, session, login, logout }}>
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
