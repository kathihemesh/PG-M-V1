import { supabase } from "./supabaseClient"

/**
 * Check if the user is authenticated
 * Returns the session if authenticated, null otherwise
 */
export async function getSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) {
      console.error("Error getting session:", error)
      return null
    }
    return session
  } catch (error) {
    console.error("Error in getSession:", error)
    return null
  }
}

/**
 * Get the current user
 * Returns the user if authenticated, null otherwise
 */
export async function getUser() {
  const session = await getSession()
  return session?.user ?? null
}

/**
 * Check if a session is valid
 */
export async function isAuthenticated() {
  const session = await getSession()
  return !!session
}

/**
 * Refresh the session if needed
 */
export async function refreshSession() {
  try {
    const { data: { session }, error } = await supabase.auth.refreshSession()
    if (error) {
      console.error("Error refreshing session:", error)
      return null
    }
    return session
  } catch (error) {
    console.error("Error in refreshSession:", error)
    return null
  }
}
