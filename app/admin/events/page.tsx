import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Calendar, MapPin, Users, Clock } from "lucide-react"
import Link from "next/link"

export default async function EventsManagement() {
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

  // Get events with registration counts
  const { data: events } = await supabase
    .from("events")
    .select(`
      *,
      creator:user_profiles!events_created_by_fkey(full_name, email),
      registrations:event_registrations(id)
    `)
    .order("event_date", { ascending: true })

  const eventCategories = [
    { name: "Cultural Events", color: "bg-purple-500" },
    { name: "Language Classes", color: "bg-blue-500" },
    { name: "Community Meetings", color: "bg-green-500" },
    { name: "Health Programs", color: "bg-red-500" },
    { name: "Youth Activities", color: "bg-yellow-500" },
    { name: "Religious Observances", color: "bg-teal-500" },
  ]

  const getCategoryColor = (category: string) => {
    const categoryData = eventCategories.find((c) => c.name === category)
    return categoryData?.color || "bg-gray-500"
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "cancelled":
        return "destructive"
      case "completed":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
          <p className="text-gray-600 mt-2">Create and manage community events</p>
        </div>
        <Button asChild>
          <Link href="/admin/events/create">
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search events..." className="pl-10" />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {eventCategories.map((category) => (
                  <SelectItem key={category.name} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      <div className="grid gap-4">
        {events?.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${getCategoryColor(event.category)}`}></div>
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <Badge variant={getStatusBadgeVariant(event.status)}>{event.status.toUpperCase()}</Badge>
                    {event.is_recurring && <Badge variant="outline">Recurring</Badge>}
                  </div>
                  {event.description && <p className="text-gray-600 mb-3 line-clamp-2">{event.description}</p>}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">{new Date(event.event_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">
                        {event.start_time} - {event.end_time}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm">
                        {event.registrations?.length || 0}/{event.max_attendees} registered
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Organized by {event.organizer}</span>
                    <span>•</span>
                    <span>Created by {event.creator?.full_name || event.creator?.email || "Unknown"}</span>
                    <span>•</span>
                    <span>{new Date(event.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/events/${event.id}`}>View</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/events/${event.id}/edit`}>Edit</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/events/${event.id}/registrations`}>
                      Registrations ({event.registrations?.length || 0})
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(!events || events.length === 0) && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-500 text-lg">No events found</p>
            <Button className="mt-4" asChild>
              <Link href="/admin/events/create">
                <Plus className="h-4 w-4 mr-2" />
                Create First Event
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
