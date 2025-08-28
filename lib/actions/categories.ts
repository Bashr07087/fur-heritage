"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

// Create new category
export async function createCategory(prevState: any, formData: FormData) {
  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: "Not authenticated" }
  }

  // Check if user has admin permissions
  const { data: userProfile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()
  if (!userProfile || !["admin", "super_admin"].includes(userProfile.role)) {
    return { error: "Insufficient permissions" }
  }

  const name = formData.get("name")
  const description = formData.get("description")
  const parentId = formData.get("parentId")

  if (!name) {
    return { error: "Category name is required" }
  }

  // Generate slug from name
  const slug = name
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  try {
    const { data, error } = await supabase
      .from("categories")
      .insert({
        name: name.toString(),
        slug,
        description: description?.toString() || null,
        parent_id: parentId?.toString() || null,
      })
      .select()
      .single()

    if (error) {
      return { error: error.message }
    }

    revalidatePath("/admin/categories")
    return { success: "Category created successfully" }
  } catch (error) {
    console.error("Category creation error:", error)
    return { error: "Failed to create category" }
  }
}

// Get all categories
export async function getCategories() {
  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

// Update category
export async function updateCategory(categoryId: string, prevState: any, formData: FormData) {
  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: "Not authenticated" }
  }

  // Check if user has admin permissions
  const { data: userProfile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()
  if (!userProfile || !["admin", "super_admin"].includes(userProfile.role)) {
    return { error: "Insufficient permissions" }
  }

  const name = formData.get("name")
  const description = formData.get("description")
  const sortOrder = formData.get("sortOrder")

  if (!name) {
    return { error: "Category name is required" }
  }

  // Generate slug from name
  const slug = name
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  try {
    const { error } = await supabase
      .from("categories")
      .update({
        name: name.toString(),
        slug,
        description: description?.toString() || null,
        sort_order: sortOrder ? Number.parseInt(sortOrder.toString()) : 0,
      })
      .eq("id", categoryId)

    if (error) {
      return { error: error.message }
    }

    revalidatePath("/admin/categories")
    return { success: "Category updated successfully" }
  } catch (error) {
    console.error("Category update error:", error)
    return { error: "Failed to update category" }
  }
}

// Delete category
export async function deleteCategory(categoryId: string) {
  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("Not authenticated")
  }

  // Check if user has admin permissions
  const { data: userProfile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()
  if (!userProfile || !["admin", "super_admin"].includes(userProfile.role)) {
    throw new Error("Insufficient permissions")
  }

  const { error } = await supabase.from("categories").delete().eq("id", categoryId)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/admin/categories")
}
