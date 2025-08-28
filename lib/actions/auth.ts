"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

// Sign in action
export async function signIn(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const supabase = createClient()

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.toString(),
      password: password.toString(),
    })

    if (error) {
      return { error: error.message }
    }

    // Update last login timestamp
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) {
      await supabase.from("user_profiles").update({ last_login: new Date().toISOString() }).eq("id", user.id)
    }

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Login error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

// Sign up action
export async function signUp(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")
  const fullName = formData.get("fullName")

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const supabase = createClient()

  try {
    let role = "student" // default role
    const emailStr = email.toString().toLowerCase()

    if (emailStr === "omersoba@gmail.com") {
      role = "super_admin"
    } else if (emailStr.includes("admin")) {
      role = "admin"
    } else if (emailStr.includes("staff")) {
      role = "staff"
    }

    const { error } = await supabase.auth.signUp({
      email: email.toString(),
      password: password.toString(),
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback`,
        data: {
          full_name: fullName?.toString() || "",
          role: role,
        },
      },
    })

    if (error) {
      return { error: error.message }
    }

    return { success: "Check your email to confirm your account." }
  } catch (error) {
    console.error("Sign up error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

// Sign out action
export async function signOut() {
  const supabase = createClient()

  await supabase.auth.signOut()
  revalidatePath("/")
  redirect("/auth/login")
}

// Update user profile action
export async function updateProfile(prevState: any, formData: FormData) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: "Not authenticated" }
  }

  const fullName = formData.get("fullName")
  const bio = formData.get("bio")

  try {
    const { error } = await supabase
      .from("user_profiles")
      .update({
        full_name: fullName?.toString() || "",
        bio: bio?.toString() || "",
      })
      .eq("id", user.id)

    if (error) {
      return { error: error.message }
    }

    revalidatePath("/profile")
    return { success: "Profile updated successfully" }
  } catch (error) {
    console.error("Profile update error:", error)
    return { error: "Failed to update profile" }
  }
}

// Change user role (admin only)
export async function changeUserRole(userId: string, newRole: string) {
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

  // Update user role
  const { error } = await supabase.from("user_profiles").update({ role: newRole }).eq("id", userId)

  if (error) {
    throw new Error(error.message)
  }

  // Log the action
  await supabase.from("audit_logs").insert({
    user_id: user.id,
    action: "change_user_role",
    table_name: "user_profiles",
    record_id: userId,
    new_values: { role: newRole },
  })

  revalidatePath("/admin/users")
}
