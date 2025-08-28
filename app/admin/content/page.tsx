import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { getContent } from "@/lib/actions/content"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Eye } from "lucide-react"
import Link from "next/link"

export default async function ContentManagement() {
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

  const content = await getContent({ limit: 50 })

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "published":
        return "default"
      case "draft":
        return "secondary"
      case "archived":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getContentTypeColor = (type: string) => {
    switch (type) {
      case "literacy_material":
        return "bg-blue-100 text-blue-800"
      case "poem":
        return "bg-purple-100 text-purple-800"
      case "story":
        return "bg-green-100 text-green-800"
      case "video":
        return "bg-red-100 text-red-800"
      case "audio":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600 mt-2">Create and manage educational content</p>
        </div>
        <Button asChild>
          <Link href="/admin/content/create">
            <Plus className="h-4 w-4 mr-2" />
            Create Content
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
                <Input placeholder="Search content..." className="pl-10" />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="literacy_material">Literacy Material</SelectItem>
                <SelectItem value="poem">Poem</SelectItem>
                <SelectItem value="story">Story</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Content List */}
      <div className="grid gap-4">
        {content.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <Badge variant={getStatusBadgeVariant(item.status)}>{item.status.toUpperCase()}</Badge>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getContentTypeColor(item.content_type)}`}
                    >
                      {item.content_type.replace("_", " ").toUpperCase()}
                    </span>
                  </div>
                  {item.excerpt && <p className="text-gray-600 mb-3 line-clamp-2">{item.excerpt}</p>}
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>By {item.author?.full_name || item.author?.email || "Unknown"}</span>
                    <span>•</span>
                    <span>{new Date(item.created_at).toLocaleDateString()}</span>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{item.view_count || 0} views</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/content/${item.slug}`}>View</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/content/${item.id}/edit`}>Edit</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {content.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-500 text-lg">No content found</p>
            <Button className="mt-4" asChild>
              <Link href="/admin/content/create">
                <Plus className="h-4 w-4 mr-2" />
                Create First Content
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
