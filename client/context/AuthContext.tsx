"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import axios, { AxiosError } from "axios"

interface User {
  id: string
  username: string
  avatar: string
  email: string
  full_name: string
  phone: string
  wallet_balance: number
  kyc_verified: boolean
  last_login: Date
  total_spent?: number
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    axios.defaults.withCredentials = true
  }, [])

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    
    const getAuthUser = async () => {
      try {
        const response = await axios.get<User>(
          `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/user/get-auth-user`, 
          { 
            withCredentials: true,
            signal: controller.signal
          }
        )
        if (isMounted) {
          setUser(response.data)
          setIsAuthenticated(true) 
          setError(null)
        }
      } catch (err) {
        const error = err as AxiosError<{ error?: string }>
        if (isMounted && !axios.isCancel(error)) {
          setUser(null)
          setIsAuthenticated(false)
          setError(error?.response?.data?.error || error?.response?.data?.message || "Failed to fetch user data")
          console.error("Error fetching auth user:", error)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }
    
    getAuthUser()
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
  try {
    setIsLoading(true)
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/auth/signin`, 
      { email, password },
      { withCredentials: true }
    )
    setUser(response.data)
    setIsAuthenticated(true)
    setError(null)
    return true
  } catch (err) {
    const error = err as AxiosError<{ message?: string; error?: string }>
    const errorMessage = error.response?.data?.message || error.response?.data?.error || "Login failed"
    setError(errorMessage)
    console.error("Login error:", errorMessage)
    setUser(null)
    setIsAuthenticated(false)
    return false
  } finally {
    setIsLoading(false)
  }
}
  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true)
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/auth/logout`, 
        {}, 
        { withCredentials: true }
      )
      setUser(null)
      setIsAuthenticated(false)
      setError(null)
    } catch {
      setError("Logout failed")
    } finally {
      setIsLoading(false)
    }
  }

  const contextValue: AuthContextType = {
    user,
    isAuthenticated, 
    isLoading,
    error,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}