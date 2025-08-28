import { createClient } from "@/lib/supabase/server"

export type UserRole = "user" | "staff" | "admin" | "super_admin"

export interface Permission {
  id: number
  name: string
  description: string
}

export interface UserProfile {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  is_active: boolean
  created_at: string
  updated_at: string
}

// Check if user has a specific role or higher
export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
  const roleHierarchy: Record<UserRole, number> = {
    user: 1,
    staff: 2,
    admin: 3,
    super_admin: 4,
  }

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}

// Check if user has a specific permission
export async function hasPermission(userId: string, permissionName: string): Promise<boolean> {
  const supabase = createClient()

  const { data: userProfile } = await supabase.from("user_profiles").select("role").eq("id", userId).single()

  if (!userProfile) return false

  const { data: rolePermissions } = await supabase
    .from("role_permissions")
    .select("permission:permissions(name)")
    .eq("role", userProfile.role)

  if (!rolePermissions) return false

  return rolePermissions.some((rp: any) => rp.permission?.name === permissionName)
}

// Get user's current role
export async function getCurrentUserRole(): Promise<UserRole | null> {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: userProfile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()

  return userProfile?.role || null
}

// Get user's permissions
export async function getUserPermissions(userId: string): Promise<Permission[]> {
  const supabase = createClient()

  const { data: userProfile } = await supabase.from("user_profiles").select("role").eq("id", userId).single()

  if (!userProfile) return []

  const { data: rolePermissions } = await supabase
    .from("role_permissions")
    .select("permission:permissions(*)")
    .eq("role", userProfile.role)

  if (!rolePermissions) return []

  return rolePermissions.map((rp: any) => rp.permission).filter(Boolean)
}

// Check if current user can access admin routes
export async function canAccessAdmin(): Promise<boolean> {
  const role = await getCurrentUserRole()
  return role ? hasRole(role, "admin") : false
}

// Check if current user can access staff routes
export async function canAccessStaff(): Promise<boolean> {
  const role = await getCurrentUserRole()
  return role ? hasRole(role, "staff") : false
}
