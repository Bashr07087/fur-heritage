import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { getDashboardStats } from "@/lib/actions/admin"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, FileText, Eye, Calendar, UserCheck, Settings } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboard() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Check admin permissions
  const { data: userProfile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()

  if (!userProfile || !["admin", "super_admin"].includes(userProfile.role)) {
    redirect("/unauthorized")
  }

  const stats = await getDashboardStats()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your Fur Language and Culture website</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/admin/users">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Manage</p>
                  <p className="text-lg font-semibold">Users</p>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/admin/content">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Manage</p>
                  <p className="text-lg font-semibold">Content</p>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/admin/events">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Manage</p>
                  <p className="text-lg font-semibold">Events</p>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/predefined-accounts">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Settings className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">View</p>
                  <p className="text-lg font-semibold">Accounts</p>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users.total}</div>
            <p className="text-xs text-muted-foreground">{stats.users.newThisMonth} new this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Content</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.content.published}</div>
            <p className="text-xs text-muted-foreground">{stats.content.draft} drafts pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.events.active}</div>
            <p className="text-xs text-muted-foreground">{stats.events.total} total events</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Event Registrations</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.registrations.confirmed}</div>
            <p className="text-xs text-muted-foreground">{stats.registrations.totalAttendees} total attendees</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Roles Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>User Roles</CardTitle>
            <CardDescription>Distribution of user roles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Students</span>
                <Badge variant="secondary">{stats.users.byRole.student}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Staff</span>
                <Badge variant="secondary">{stats.users.byRole.staff}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Admins</span>
                <Badge variant="secondary">{stats.users.byRole.admin}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Super Admins</span>
                <Badge variant="secondary">{stats.users.byRole.super_admin}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Types */}
        <Card>
          <CardHeader>
            <CardTitle>Content Types</CardTitle>
            <CardDescription>Distribution of content by type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Literacy Materials</span>
                <Badge variant="secondary">{stats.content.byType.literacy_material}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Poems</span>
                <Badge variant="secondary">{stats.content.byType.poem}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Stories</span>
                <Badge variant="secondary">{stats.content.byType.story}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Videos</span>
                <Badge variant="secondary">{stats.content.byType.video}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Audio</span>
                <Badge variant="secondary">{stats.content.byType.audio}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Categories</CardTitle>
            <CardDescription>Distribution of events by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Cultural Events</span>
                <Badge variant="secondary">{stats.events.byCategory.cultural_events}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Language Classes</span>
                <Badge variant="secondary">{stats.events.byCategory.language_classes}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Community Meetings</span>
                <Badge variant="secondary">{stats.events.byCategory.community_meetings}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Health Programs</span>
                <Badge variant="secondary">{stats.events.byCategory.health_programs}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Youth Activities</span>
                <Badge variant="secondary">{stats.events.byCategory.youth_activities}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest admin actions and system events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{activity.action.replace(/_/g, " ").toUpperCase()}</p>
                  <p className="text-sm text-gray-600">
                    by {activity.user?.full_name || activity.user?.email || "Unknown"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{new Date(activity.created_at).toLocaleDateString()}</p>
                  <p className="text-xs text-gray-400">{new Date(activity.created_at).toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button asChild variant="outline" className="h-auto p-4 bg-transparent">
              <Link href="/admin/content/create" className="flex flex-col items-center space-y-2">
                <FileText className="h-5 w-5" />
                <span>Create Content</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-4 bg-transparent">
              <Link href="/admin/events/create" className="flex flex-col items-center space-y-2">
                <Calendar className="h-5 w-5" />
                <span>Create Event</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-4 bg-transparent">
              <Link href="/admin/users" className="flex flex-col items-center space-y-2">
                <Users className="h-5 w-5" />
                <span>Manage Users</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-4 bg-transparent">
              <Link href="/calendar" className="flex flex-col items-center space-y-2">
                <Eye className="h-5 w-5" />
                <span>View Calendar</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
