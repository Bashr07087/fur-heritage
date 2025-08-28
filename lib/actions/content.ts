"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// Create new content
export async function createContent(prevState: any, formData: FormData) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: "Not authenticated" }
  }

  // Check if user has permission to create content
  const { data: userProfile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()
  if (!userProfile || !["staff", "admin", "super_admin"].includes(userProfile.role)) {
    return { error: "Insufficient permissions" }
  }

  const title = formData.get("title")
  const contentType = formData.get("contentType")
  const category = formData.get("category")
  const contentBody = formData.get("contentBody")
  const excerpt = formData.get("excerpt")
  const tags = formData.get("tags")
  const status = formData.get("status") || "draft"

  if (!title || !contentType || !contentBody) {
    return { error: "Title, content type, and content body are required" }
  }

  // Generate slug from title
  const slug = title
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  try {
    const { data, error } = await supabase
      .from("content")
      .insert({
        title: title.toString(),
        slug,
        content_type: contentType.toString(),
        category: category?.toString() || null,
        content_body: contentBody.toString(),
        excerpt: excerpt?.toString() || null,
        author_id: user.id,
        status: status.toString(),
        tags: tags
          ? tags
              .toString()
              .split(",")
              .map((tag) => tag.trim())
          : [],
        published_at: status === "published" ? new Date().toISOString() : null,
      })
      .select()
      .single()

    if (error) {
      return { error: error.message }
    }

    // Log the action
    await supabase.from("audit_logs").insert({
      user_id: user.id,
      action: "create_content",
      table_name: "content",
      record_id: data.id,
      new_values: data,
    })

    revalidatePath("/admin/content")
    return { success: "Content created successfully", contentId: data.id }
  } catch (error) {
    console.error("Content creation error:", error)
    return { error: "Failed to create content" }
  }
}

// Update existing content
export async function updateContent(contentId: string, prevState: any, formData: FormData) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: "Not authenticated" }
  }

  // Check if user owns the content or is admin
  const { data: content } = await supabase.from("content").select("author_id").eq("id", contentId).single()
  const { data: userProfile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()

  if (!content || (content.author_id !== user.id && !["admin", "super_admin"].includes(userProfile?.role || ""))) {
    return { error: "Insufficient permissions" }
  }

  const title = formData.get("title")
  const contentType = formData.get("contentType")
  const category = formData.get("category")
  const contentBody = formData.get("contentBody")
  const excerpt = formData.get("excerpt")
  const tags = formData.get("tags")
  const status = formData.get("status")

  if (!title || !contentType || !contentBody) {
    return { error: "Title, content type, and content body are required" }
  }

  // Generate slug from title
  const slug = title
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  try {
    const updateData: any = {
      title: title.toString(),
      slug,
      content_type: contentType.toString(),
      category: category?.toString() || null,
      content_body: contentBody.toString(),
      excerpt: excerpt?.toString() || null,
      status: status?.toString() || "draft",
      tags: tags
        ? tags
            .toString()
            .split(",")
            .map((tag) => tag.trim())
        : [],
    }

    // Set published_at if status is being changed to published
    if (status === "published") {
      updateData.published_at = new Date().toISOString()
    }

    const { data, error } = await supabase.from("content").update(updateData).eq("id", contentId).select().single()

    if (error) {
      return { error: error.message }
    }

    // Log the action
    await supabase.from("audit_logs").insert({
      user_id: user.id,
      action: "update_content",
      table_name: "content",
      record_id: contentId,
      new_values: data,
    })

    revalidatePath("/admin/content")
    revalidatePath(`/content/${slug}`)
    return { success: "Content updated successfully" }
  } catch (error) {
    console.error("Content update error:", error)
    return { error: "Failed to update content" }
  }
}

// Delete content
export async function deleteContent(contentId: string) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("Not authenticated")
  }

  // Check if user owns the content or is admin
  const { data: content } = await supabase.from("content").select("author_id, title").eq("id", contentId).single()
  const { data: userProfile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()

  if (!content || (content.author_id !== user.id && !["admin", "super_admin"].includes(userProfile?.role || ""))) {
    throw new Error("Insufficient permissions")
  }

  const { error } = await supabase.from("content").delete().eq("id", contentId)

  if (error) {
    throw new Error(error.message)
  }

  // Log the action
  await supabase.from("audit_logs").insert({
    user_id: user.id,
    action: "delete_content",
    table_name: "content",
    record_id: contentId,
    old_values: content,
  })

  revalidatePath("/admin/content")
}

// Get all content with filters
export async function getContent(filters?: {
  status?: string
  contentType?: string
  category?: string
  authorId?: string
  search?: string
  limit?: number
  offset?: number
}) {
  const supabase = createClient()

  let query = supabase
    .from("content")
    .select(
      `
      *,
      author:user_profiles(full_name, email)
    `,
    )
    .order("created_at", { ascending: false })

  // Apply filters
  if (filters?.status) {
    query = query.eq("status", filters.status)
  }
  if (filters?.contentType) {
    query = query.eq("content_type", filters.contentType)
  }
  if (filters?.category) {
    query = query.eq("category", filters.category)
  }
  if (filters?.authorId) {
    query = query.eq("author_id", filters.authorId)
  }
  if (filters?.search) {
    query = query.or(`title.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%`)
  }

  // Apply pagination
  if (filters?.limit) {
    query = query.limit(filters.limit)
  }
  if (filters?.offset) {
    query = query.range(filters.offset, (filters.offset || 0) + (filters.limit || 10) - 1)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(error.message)
  }

  return data || []
}

// Get single content by slug
export async function getContentBySlug(slug: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("content")
    .select(
      `
      *,
      author:user_profiles(full_name, email, avatar_url),
      category_info:categories(name, description)
    `,
    )
    .eq("slug", slug)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  // Increment view count
  await supabase
    .from("content")
    .update({ view_count: (data.view_count || 0) + 1 })
    .eq("id", data.id)

  return data
}

// Publish/unpublish content
export async function toggleContentStatus(contentId: string, newStatus: string) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("Not authenticated")
  }

  // Check permissions
  const { data: content } = await supabase.from("content").select("author_id").eq("id", contentId).single()
  const { data: userProfile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()

  if (!content || (content.author_id !== user.id && !["admin", "super_admin"].includes(userProfile?.role || ""))) {
    throw new Error("Insufficient permissions")
  }

  const updateData: any = { status: newStatus }
  if (newStatus === "published") {
    updateData.published_at = new Date().toISOString()
  }

  const { error } = await supabase.from("content").update(updateData).eq("id", contentId)

  if (error) {
    throw new Error(error.message)
  }

  // Log the action
  await supabase.from("audit_logs").insert({
    user_id: user.id,
    action: "toggle_content_status",
    table_name: "content",
    record_id: contentId,
    new_values: { status: newStatus },
  })

  revalidatePath("/admin/content")
}
