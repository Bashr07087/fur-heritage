"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { type UserRole, hasRole } from "@/lib/utils/permissions"
import { useRouter } from "next/navigation"

interface RoleGuardProps {
  children: React.ReactNode
  requiredRole: UserRole
  fallback?: React.ReactNode
  redirectTo?: string
}

export default function RoleGuard({ children, requiredRole, fallback, redirectTo = "/unauthorized" }: RoleGuardProps) {
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function checkUserRole() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      const { data: userProfile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()

      if (userProfile) {
        setUserRole(userProfile.role)
      }

      setLoading(false)
    }

    checkUserRole()
  }, [supabase, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  if (!userRole || !hasRole(userRole, requiredRole)) {
    if (fallback) {
      return <>{fallback}</>
    }

    router.push(redirectTo)
    return null
  }

  return <>{children}</>
}
