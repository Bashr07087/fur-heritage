import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, Mail, Calendar, Shield } from "lucide-react"
import Link from "next/link"

export default async function ProfilePage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", user.id).single()

  if (!profile) {
    redirect("/auth/login")
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "super_admin":
        return "destructive"
      case "admin":
        return "default"
      case "staff":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-2">Manage your account information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Account Information
          </CardTitle>
          <CardDescription>Your personal details and account status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center">
            <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center">
              <span className="text-teal-600 font-semibold text-2xl">
                {profile.full_name?.charAt(0) || profile.email.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-gray-500" />
              <div>
                <p className="font-medium">{profile.full_name || "No name set"}</p>
                <p className="text-sm text-gray-500">Full Name</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-gray-500" />
              <div>
                <p className="font-medium">{profile.email}</p>
                <p className="text-sm text-gray-500">Email Address</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Shield className="h-4 w-4 text-gray-500" />
              <div>
                <Badge variant={getRoleBadgeVariant(profile.role)}>
                  {profile.role.replace("_", " ").toUpperCase()}
                </Badge>
                <p className="text-sm text-gray-500 mt-1">Account Role</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <p className="font-medium">{new Date(profile.created_at).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500">Member Since</p>
              </div>
            </div>

            {profile.last_login && (
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="font-medium">{new Date(profile.last_login).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-500">Last Login</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button asChild>
              <Link href="/profile/edit">Edit Profile</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/settings">Settings</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
