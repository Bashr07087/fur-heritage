"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export interface EventRegistration {
  eventId: string
  eventTitle: string
  userName: string
  userEmail: string
  userPhone?: string
  attendeeCount: number
  specialRequests?: string
}

export async function registerForEvent(registration: EventRegistration) {
  try {
    const supabase = createClient()

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return { success: false, error: "Authentication required" }
    }

    // Insert event registration
    const { data, error } = await supabase
      .from("event_registrations")
      .insert({
        event_id: registration.eventId,
        user_id: user.id,
        user_name: registration.userName,
        user_email: registration.userEmail,
        user_phone: registration.userPhone,
        attendee_count: registration.attendeeCount,
        special_requests: registration.specialRequests,
        registration_date: new Date().toISOString(),
        status: "confirmed",
      })
      .select()
      .single()

    if (error) {
      console.error("Event registration error:", error)
      return { success: false, error: "Failed to register for event" }
    }

    // Log the registration activity
    await supabase.from("audit_logs").insert({
      user_id: user.id,
      action: "event_registration",
      resource_type: "event",
      resource_id: registration.eventId,
      details: { event_title: registration.eventTitle, attendee_count: registration.attendeeCount },
    })

    revalidatePath("/calendar")
    return { success: true, data }
  } catch (error) {
    console.error("Event registration error:", error)
    return { success: false, error: "Failed to register for event" }
  }
}

export async function addToCalendar(
  eventId: string,
  eventTitle: string,
  eventDate: string,
  eventTime: string,
  location: string,
) {
  // Generate calendar file content
  const startDate = new Date(`${eventDate} ${eventTime.split(" - ")[0]}`)
  const endDate = new Date(`${eventDate} ${eventTime.split(" - ")[1]}`)

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Fur Language Culture//Event Calendar//EN
BEGIN:VEVENT
UID:${eventId}@furlanguage.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART:${startDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTEND:${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
SUMMARY:${eventTitle}
LOCATION:${location}
DESCRIPTION:Fur Language and Culture Community Event
END:VEVENT
END:VCALENDAR`

  return icsContent
}

export async function shareEvent(eventId: string, eventTitle: string) {
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/calendar?event=${eventId}`
  const shareText = `Join me at "${eventTitle}" - Fur Language and Culture Community Event`

  return {
    url: shareUrl,
    text: shareText,
    title: eventTitle,
  }
}

export async function createEvent(prevState: any, formData: FormData) {
  try {
    const supabase = createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return { success: false, error: "Authentication required" }
    }

    // Check permissions
    const { data: userProfile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()
    if (!userProfile || !["staff", "admin", "super_admin"].includes(userProfile.role)) {
      return { success: false, error: "Insufficient permissions" }
    }

    const eventData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      event_date: formData.get("event_date") as string,
      start_time: formData.get("start_time") as string,
      end_time: formData.get("end_time") as string,
      location: formData.get("location") as string,
      category: formData.get("category") as string,
      organizer: formData.get("organizer") as string,
      max_attendees: Number.parseInt(formData.get("max_attendees") as string) || 50,
      is_recurring: formData.get("is_recurring") === "on",
      recurring_pattern: formData.get("recurring_pattern") as string,
      created_by: user.id,
    }

    const { data, error } = await supabase.from("events").insert(eventData).select().single()

    if (error) {
      console.error("Event creation error:", error)
      return { success: false, error: "Failed to create event" }
    }

    // Log the action
    await supabase.from("audit_logs").insert({
      user_id: user.id,
      action: "create_event",
      resource_type: "event",
      resource_id: data.id,
      details: { title: eventData.title, category: eventData.category },
    })

    revalidatePath("/admin/events")
    revalidatePath("/calendar")
    return { success: true, data }
  } catch (error) {
    console.error("Event creation error:", error)
    return { success: false, error: "Failed to create event" }
  }
}
