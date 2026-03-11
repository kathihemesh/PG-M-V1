"use client"

import { useState } from "react"
import Link from "next/link"
import { Building2, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/auth-provider"
import { AuthThemeToggle } from "@/components/auth-theme-toggle"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [validationError, setValidationError] = useState<{ email?: string; password?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login, isLoading } = useAuth()

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {}
    
    if (!email.trim()) {
      errors.email = "Email is required"
    }
    
    if (!password.trim()) {
      errors.password = "Password is required"
    }
    
    setValidationError(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)

    const result = await login(email, password)
    
    if (!result.success) {
      setError(result.error || "Invalid email or password. Please try again.")
      setIsSubmitting(false)
    }
    // If success, the auth provider will redirect to dashboard
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex h-[100dvh] flex-col overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between px-4 py-3 sm:px-6 sm:py-4 md:px-8">
        <Link 
          href="/login" 
          className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Building2 className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="hidden text-sm font-semibold text-foreground sm:inline">PG Rent Manager</span>
        </Link>
        <AuthThemeToggle />
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center overflow-y-auto px-4 py-2 sm:px-6 sm:py-4">
        <Card className="w-full max-w-[420px] border-border/50 shadow-lg">
          <CardHeader className="space-y-1 px-4 pb-2 pt-4 text-center sm:px-6 sm:pb-3 sm:pt-5">
            <div className="mx-auto mb-1 flex h-9 w-9 items-center justify-center rounded-xl bg-primary sm:mb-2 sm:h-11 sm:w-11">
              <Building2 className="h-4 w-4 text-primary-foreground sm:h-5 sm:w-5" />
            </div>
            <CardTitle className="text-lg font-bold tracking-tight sm:text-xl">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-balance text-xs text-muted-foreground sm:text-sm">
              Sign in to manage your PG tenants, rooms, and rent payments.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3 px-4 pb-4 sm:space-y-4 sm:px-6 sm:pb-5">
            {/* Error Alert */}
            {error && (
              <div className="flex items-center gap-3 rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive animate-in fade-in-0 slide-in-from-top-1 duration-200">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p className="font-medium">{error}</p>
              </div>
            )}

            {/* Form */}
            <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  className={`h-10 sm:h-11 ${validationError.email ? "border-destructive" : ""}`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError(null)
                    setValidationError((prev) => ({ ...prev, email: undefined }))
                  }}
                  aria-describedby={validationError.email ? "email-error" : undefined}
                />
                {validationError.email && (
                  <p id="email-error" className="text-sm text-destructive">
                    {validationError.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className={`h-10 pr-10 sm:h-11 ${validationError.password ? "border-destructive" : ""}`}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setError(null)
                      setValidationError((prev) => ({ ...prev, password: undefined }))
                    }}
                    aria-describedby={validationError.password ? "password-error" : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {validationError.password && (
                  <p id="password-error" className="text-sm text-destructive">
                    {validationError.password}
                  </p>
                )}
                <div className="flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              {/* Sign In Button */}
              <Button 
                type="submit" 
                className="h-10 w-full font-medium transition-all duration-200 hover:shadow-md active:scale-[0.98] sm:h-11"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Footer Text */}
            <p className="text-center text-sm text-muted-foreground">
              {"Need help? "}
              <button
                type="button"
                className="font-medium text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
              >
                Contact support
              </button>
            </p>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-muted-foreground">
        <p>PG Rent Manager v1.0.0</p>
      </footer>
    </div>
  )
}
