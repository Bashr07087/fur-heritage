"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// Get all users (admin only)
export async function getAllUsers() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("Not authenticated")
  }

  // Check if current user is admin
  const { data: currentUserProfile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()

  if (!currentUserProfile || !["admin", "super_admin"].includes(currentUserProfile.role)) {
    throw new Error("Insufficient permissions")
  }

  const { data: users, error } = await supabase
    .from("user_profiles")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return users || []
}

// Get user by ID
export async function getUserById(userId: string) {
  const supabase = createClient()

  const { data: user, error } = await supabase.from("user_profiles").select("*").eq("id", userId).single()

  if (error) {
    throw new Error(error.message)
  }

  return user
}

// Update user status (admin only)
export async function updateUserStatus(userId: string, isActive: boolean) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("Not authenticated")
  }

  // Check if current user is admin
  const { data: currentUserProfile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()

  if (!currentUserProfile || !["admin", "super_admin"].includes(currentUserProfile.role)) {
    throw new Error("Insufficient permissions")
  }

  const { error } = await supabase.from("user_profiles").update({ is_active: isActive }).eq("id", userId)

  if (error) {
    throw new Error(error.message)
  }

  // Log the action
  await supabase.from("audit_logs").insert({
    user_id: user.id,
    action: "update_user_status",
    table_name: "user_profiles",
    record_id: userId,
    new_values: { is_active: isActive },
  })

  revalidatePath("/admin/users")
}

// Delete user (super admin only)
export async function deleteUser(userId: string) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("Not authenticated")
  }

  // Check if current user is super admin
  const { data: currentUserProfile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()

  if (!currentUserProfile || currentUserProfile.role !== "super_admin") {
    throw new Error("Insufficient permissions")
  }

  // Delete from user_profiles table
  const { error } = await supabase.from("user_profiles").delete().eq("id", userId)

  if (error) {
    throw new Error(error.message)
  }

  // Log the action
  await supabase.from("audit_logs").insert({
    user_id: user.id,
    action: "delete_user",
    table_name: "user_profiles",
    record_id: userId,
  })

  revalidatePath("/admin/users")
}
