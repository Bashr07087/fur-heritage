"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

// Upload media file
export async function uploadMedia(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("Not authenticated")
  }

  // Check if user has permission to upload media
  const { data: userProfile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()
  if (!userProfile || !["staff", "admin", "super_admin"].includes(userProfile.role)) {
    throw new Error("Insufficient permissions")
  }

  const file = formData.get("file") as File
  const altText = formData.get("altText") as string

  if (!file) {
    throw new Error("No file provided")
  }

  // Generate unique filename
  const fileExt = file.name.split(".").pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = `media/${fileName}`

  try {
    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage.from("media").upload(filePath, file)

    if (uploadError) {
      throw new Error(uploadError.message)
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("media").getPublicUrl(filePath)

    // Save media record to database
    const { data: mediaRecord, error: dbError } = await supabase
      .from("media_files")
      .insert({
        filename: fileName,
        original_name: file.name,
        file_path: filePath,
        file_size: file.size,
        mime_type: file.type,
        alt_text: altText || "",
        uploaded_by: user.id,
      })
      .select()
      .single()

    if (dbError) {
      // Clean up uploaded file if database insert fails
      await supabase.storage.from("media").remove([filePath])
      throw new Error(dbError.message)
    }

    revalidatePath("/admin/media")
    return { ...mediaRecord, public_url: publicUrl }
  } catch (error) {
    console.error("Media upload error:", error)
    throw new Error("Failed to upload media")
  }
}

// Get all media files
export async function getMediaFiles(limit?: number, offset?: number) {
  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  let query = supabase
    .from("media_files")
    .select(
      `
      *,
      uploader:user_profiles(full_name, email)
    `,
    )
    .order("created_at", { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }
  if (offset) {
    query = query.range(offset, (offset || 0) + (limit || 10) - 1)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(error.message)
  }

  // Add public URLs
  const mediaWithUrls = data.map((media) => ({
    ...media,
    public_url: supabase.storage.from("media").getPublicUrl(media.file_path).data.publicUrl,
  }))

  return mediaWithUrls
}

// Delete media file
export async function deleteMedia(mediaId: string) {
  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("Not authenticated")
  }

  // Get media file info
  const { data: mediaFile, error: fetchError } = await supabase
    .from("media_files")
    .select("file_path, uploaded_by")
    .eq("id", mediaId)
    .single()

  if (fetchError) {
    throw new Error(fetchError.message)
  }

  // Check permissions (owner or admin)
  const { data: userProfile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()
  if (mediaFile.uploaded_by !== user.id && !["admin", "super_admin"].includes(userProfile?.role || "")) {
    throw new Error("Insufficient permissions")
  }

  // Delete from storage
  const { error: storageError } = await supabase.storage.from("media").remove([mediaFile.file_path])

  if (storageError) {
    throw new Error(storageError.message)
  }

  // Delete from database
  const { error: dbError } = await supabase.from("media_files").delete().eq("id", mediaId)

  if (dbError) {
    throw new Error(dbError.message)
  }

  revalidatePath("/admin/media")
}
