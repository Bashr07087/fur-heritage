"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

// Update user progress for content
export async function updateProgress(contentId: string, progressPercentage: number, timeSpent?: number) {
  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("Not authenticated")
  }

  const updateData: any = {
    user_id: user.id,
    content_id: contentId,
    progress_percentage: Math.max(0, Math.min(100, progressPercentage)),
    time_spent: timeSpent || 0,
  }

  // Mark as completed if 100%
  if (progressPercentage >= 100) {
    updateData.completed_at = new Date().toISOString()
  }

  try {
    const { error } = await supabase.from("user_progress").upsert(updateData, {
      onConflict: "user_id,content_id",
    })

    if (error) {
      throw new Error(error.message)
    }

    revalidatePath("/progress")
    return { success: true }
  } catch (error) {
    console.error("Progress update error:", error)
    throw new Error("Failed to update progress")
  }
}

// Get user progress for all content
export async function getUserProgress(userId?: string) {
  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("Not authenticated")
  }

  const targetUserId = userId || user.id

  // If requesting another user's progress, check admin permissions
  if (targetUserId !== user.id) {
    const { data: userProfile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()
    if (!userProfile || !["admin", "super_admin"].includes(userProfile.role)) {
      throw new Error("Insufficient permissions")
    }
  }

  const { data, error } = await supabase
    .from("user_progress")
    .select(
      `
      *,
      content:content(title, slug, content_type, category)
    `,
    )
    .eq("user_id", targetUserId)
    .order("updated_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

// Get progress statistics
export async function getProgressStats(userId?: string) {
  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("Not authenticated")
  }

  const targetUserId = userId || user.id

  // If requesting another user's stats, check admin permissions
  if (targetUserId !== user.id) {
    const { data: userProfile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()
    if (!userProfile || !["admin", "super_admin"].includes(userProfile.role)) {
      throw new Error("Insufficient permissions")
    }
  }

  const { data, error } = await supabase
    .from("user_progress")
    .select("progress_percentage, completed_at, time_spent")
    .eq("user_id", targetUserId)

  if (error) {
    throw new Error(error.message)
  }

  const stats = {
    totalContent: data.length,
    completedContent: data.filter((p) => p.completed_at).length,
    averageProgress: data.length > 0 ? data.reduce((sum, p) => sum + p.progress_percentage, 0) / data.length : 0,
    totalTimeSpent: data.reduce((sum, p) => sum + (p.time_spent || 0), 0),
  }

  return stats
}
