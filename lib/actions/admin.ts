"use server"

import { createClient } from "@/lib/supabase/server"

// Get dashboard statistics
export async function getDashboardStats() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("Not authenticated")
  }

  // Check admin permissions
  const { data: userProfile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()
  if (!userProfile || !["admin", "super_admin"].includes(userProfile.role)) {
    throw new Error("Insufficient permissions")
  }

  // Get user statistics
  const { data: userStats } = await supabase
    .from("user_profiles")
    .select("role, created_at, is_active")
    .order("created_at", { ascending: false })

  // Get content statistics
  const { data: contentStats } = await supabase
    .from("content")
    .select("status, content_type, created_at, view_count")
    .order("created_at", { ascending: false })

  const { data: eventStats } = await supabase
    .from("events")
    .select("status, category, created_at")
    .order("created_at", { ascending: false })

  const { data: registrationStats } = await supabase
    .from("event_registrations")
    .select("status, created_at, attendee_count")
    .order("created_at", { ascending: false })

  // Get recent activity from audit logs
  const { data: recentActivity } = await supabase
    .from("audit_logs")
    .select(
      `
      *,
      user:user_profiles(full_name, email)
    `,
    )
    .order("created_at", { ascending: false })
    .limit(10)

  // Calculate statistics
  const stats = {
    users: {
      total: userStats?.length || 0,
      active: userStats?.filter((u) => u.is_active).length || 0,
      byRole: {
        student: userStats?.filter((u) => u.role === "student").length || 0,
        staff: userStats?.filter((u) => u.role === "staff").length || 0,
        admin: userStats?.filter((u) => u.role === "admin").length || 0,
        super_admin: userStats?.filter((u) => u.role === "super_admin").length || 0,
      },
      newThisMonth:
        userStats?.filter((u) => new Date(u.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length || 0,
    },
    content: {
      total: contentStats?.length || 0,
      published: contentStats?.filter((c) => c.status === "published").length || 0,
      draft: contentStats?.filter((c) => c.status === "draft").length || 0,
      archived: contentStats?.filter((c) => c.status === "archived").length || 0,
      byType: {
        literacy_material: contentStats?.filter((c) => c.content_type === "literacy_material").length || 0,
        poem: contentStats?.filter((c) => c.content_type === "poem").length || 0,
        story: contentStats?.filter((c) => c.content_type === "story").length || 0,
        video: contentStats?.filter((c) => c.content_type === "video").length || 0,
        audio: contentStats?.filter((c) => c.content_type === "audio").length || 0,
      },
      totalViews: contentStats?.reduce((sum, c) => sum + (c.view_count || 0), 0) || 0,
    },
    events: {
      total: eventStats?.length || 0,
      active: eventStats?.filter((e) => e.status === "active").length || 0,
      completed: eventStats?.filter((e) => e.status === "completed").length || 0,
      cancelled: eventStats?.filter((e) => e.status === "cancelled").length || 0,
      byCategory: {
        cultural_events: eventStats?.filter((e) => e.category === "Cultural Events").length || 0,
        language_classes: eventStats?.filter((e) => e.category === "Language Classes").length || 0,
        community_meetings: eventStats?.filter((e) => e.category === "Community Meetings").length || 0,
        health_programs: eventStats?.filter((e) => e.category === "Health Programs").length || 0,
        youth_activities: eventStats?.filter((e) => e.category === "Youth Activities").length || 0,
        religious_observances: eventStats?.filter((e) => e.category === "Religious Observances").length || 0,
      },
    },
    registrations: {
      total: registrationStats?.length || 0,
      confirmed: registrationStats?.filter((r) => r.status === "confirmed").length || 0,
      cancelled: registrationStats?.filter((r) => r.status === "cancelled").length || 0,
      waitlist: registrationStats?.filter((r) => r.status === "waitlist").length || 0,
      totalAttendees: registrationStats?.reduce((sum, r) => sum + (r.attendee_count || 0), 0) || 0,
    },
    recentActivity: recentActivity || [],
  }

  return stats
}

// Get system settings
export async function getSystemSettings() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("Not authenticated")
  }

  // Check admin permissions
  const { data: userProfile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()
  if (!userProfile || !["admin", "super_admin"].includes(userProfile.role)) {
    throw new Error("Insufficient permissions")
  }

  const { data, error } = await supabase.from("system_settings").select("*").order("key")

  if (error) {
    throw new Error(error.message)
  }

  return data
}

// Update system setting
export async function updateSystemSetting(key: string, value: any, description?: string) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("Not authenticated")
  }

  // Check admin permissions
  const { data: userProfile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()
  if (!userProfile || !["admin", "super_admin"].includes(userProfile.role)) {
    throw new Error("Insufficient permissions")
  }

  const { error } = await supabase
    .from("system_settings")
    .upsert({
      key,
      value: JSON.stringify(value),
      description,
      updated_by: user.id,
    })
    .eq("key", key)

  if (error) {
    throw new Error(error.message)
  }

  // Log the action
  await supabase.from("audit_logs").insert({
    user_id: user.id,
    action: "update_system_setting",
    table_name: "system_settings",
    record_id: key,
    new_values: { key, value, description },
  })
}

// Get audit logs with filters
export async function getAuditLogs(filters?: {
  userId?: string
  action?: string
  tableName?: string
  startDate?: string
  endDate?: string
  limit?: number
  offset?: number
}) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("Not authenticated")
  }

  // Check admin permissions
  const { data: userProfile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()
  if (!userProfile || !["admin", "super_admin"].includes(userProfile.role)) {
    throw new Error("Insufficient permissions")
  }

  let query = supabase
    .from("audit_logs")
    .select(
      `
      *,
      user:user_profiles(full_name, email)
    `,
    )
    .order("created_at", { ascending: false })

  // Apply filters
  if (filters?.userId) {
    query = query.eq("user_id", filters.userId)
  }
  if (filters?.action) {
    query = query.eq("action", filters.action)
  }
  if (filters?.tableName) {
    query = query.eq("table_name", filters.tableName)
  }
  if (filters?.startDate) {
    query = query.gte("created_at", filters.startDate)
  }
  if (filters?.endDate) {
    query = query.lte("created_at", filters.endDate)
  }

  // Apply pagination
  if (filters?.limit) {
    query = query.limit(filters.limit)
  }
  if (filters?.offset) {
    query = query.range(filters.offset, (filters.offset || 0) + (filters.limit || 50) - 1)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(error.message)
  }

  return data
}

// Export data for backup
export async function exportData(tables: string[]) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("Not authenticated")
  }

  // Check super admin permissions
  const { data: userProfile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()
  if (!userProfile || userProfile.role !== "super_admin") {
    throw new Error("Insufficient permissions")
  }

  const exportData: any = {}

  for (const table of tables) {
    try {
      const { data, error } = await supabase.from(table).select("*")
      if (error) {
        console.error(`Error exporting ${table}:`, error)
        continue
      }
      exportData[table] = data
    } catch (error) {
      console.error(`Error exporting ${table}:`, error)
    }
  }

  // Log the export action
  await supabase.from("audit_logs").insert({
    user_id: user.id,
    action: "export_data",
    table_name: "system",
    new_values: { tables },
  })

  return exportData
}
