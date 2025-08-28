import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import EventForm from "@/components/admin/event-form"

export default async function CreateEvent() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Check staff/admin permissions
  const { data: userProfile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()

  if (!userProfile || !["staff", "admin", "super_admin"].includes(userProfile.role)) {
    redirect("/unauthorized")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
        <p className="text-gray-600 mt-2">Add a new community event to the calendar</p>
      </div>

      <EventForm />
    </div>
  )
}
