"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("violet_dream_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("https://av2back-production.up.railway.app/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        // Assuming the API returns user data or token
        // Adjust based on actual API response
        const userData = {
          id: data.id || data.userId,
          name: data.name,
          email: data.email,
          createdAt: data.createdAt,
        }
        setUser(userData)
        localStorage.setItem("violet_dream_user", JSON.stringify(userData))
        // If there's a token, store it too
        if (data.token) {
          localStorage.setItem("violet_dream_token", data.token)
        }
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const register = async (nome: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("https://av2back-production.up.railway.app/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, password }),
      })
      console.log("Register response:", response)

      if (response.ok) {
        const data = await response.json()
        // Assuming the API returns user data or token
        // Adjust based on actual API response
        const userData = {
          id: data.id || data.userId,
          name: data.name,
          email: data.email,
          createdAt: data.createdAt,
        }
        setUser(userData)
        localStorage.setItem("violet_dream_user", JSON.stringify(userData))
        // If there's a token, store it too
        if (data.token) {
          localStorage.setItem("violet_dream_token", data.token)
        }
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error("Register error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("violet_dream_user")
    localStorage.removeItem("violet_dream_token")
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
