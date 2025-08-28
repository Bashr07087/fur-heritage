import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PredefinedAccountsPage() {
  const accounts = [
    {
      email: "omersoba@gmail.com",
      password: "omersoba@123",
      role: "Super Admin",
      description: "Primary administrator with full system control and content management access",
      color: "bg-purple-600",
    },
    {
      email: "admin123@gmail.com",
      password: "Admin123!",
      role: "Admin",
      description: "Full administrative access to manage users, content, and site settings",
      color: "bg-red-500",
    },
    {
      email: "staff123@gmail.com",
      password: "Staff123!",
      role: "Staff",
      description: "Can create and edit educational content, manage literacy materials",
      color: "bg-blue-500",
    },
    {
      email: "students123@gmail.com",
      password: "Student123!",
      role: "Student",
      description: "Basic access to view content and learning materials",
      color: "bg-green-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-teal-800 mb-4">Predefined Account Credentials</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Use these predefined accounts to test different user roles and permissions in the Fur Language and Culture
            system.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3 mb-8">
          {accounts.map((account, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{account.role} Account</CardTitle>
                  <Badge className={`${account.color} text-white`}>{account.role}</Badge>
                </div>
                <CardDescription className="text-sm">{account.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div>
                    <span className="font-semibold text-gray-700">Email:</span>
                    <p className="font-mono text-sm bg-white p-2 rounded border">{account.email}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Password:</span>
                    <p className="font-mono text-sm bg-white p-2 rounded border">{account.password}</p>
                  </div>
                </div>
                <Link href="/auth/login">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">Login as {account.role}</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-800">⚠️ Important Setup Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
              <h4 className="font-semibold text-red-800 mb-2">Before You Can Login:</h4>
              <p className="text-red-700">
                These accounts don't exist in the authentication system yet. You must create them first through the
                signup process.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Step 1: Create the Accounts</h4>
              <p>
                Go to{" "}
                <Link href="/auth/sign-up" className="text-teal-600 underline font-semibold">
                  /auth/sign-up
                </Link>{" "}
                and create accounts using the exact email addresses and passwords shown above.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Step 2: Automatic Role Assignment</h4>
              <p>The system will automatically assign the correct role based on the email address during signup.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Step 3: Login and Test</h4>
              <p>
                After creating the accounts, you can login with the same credentials to test role-based permissions.
              </p>
            </div>

            <div className="mt-6 flex gap-4">
              <Link href="/auth/sign-up">
                <Button className="bg-green-600 hover:bg-green-700">Create Accounts First</Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline">Login (After Creating)</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
