"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { createContent } from "@/lib/actions/content"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating Content...
        </>
      ) : (
        "Create Content"
      )}
    </Button>
  )
}

interface ContentFormProps {
  content?: any
  isEditing?: boolean
}

export default function ContentForm({ content, isEditing = false }: ContentFormProps) {
  const router = useRouter()
  const [state, formAction] = useActionState(createContent, null)

  useEffect(() => {
    if (state?.success) {
      router.push("/admin/content")
    }
  }, [state, router])

  const contentTypes = [
    { value: "literacy_material", label: "Literacy Material" },
    { value: "poem", label: "Poem" },
    { value: "story", label: "Story" },
    { value: "video", label: "Video" },
    { value: "audio", label: "Audio" },
    { value: "lesson", label: "Lesson" },
    { value: "exercise", label: "Exercise" },
  ]

  const categories = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "cultural", label: "Cultural" },
    { value: "traditional", label: "Traditional" },
    { value: "modern", label: "Modern" },
  ]

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Content" : "Create New Content"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          {state?.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {state.error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" name="title" required defaultValue={content?.title} placeholder="Enter content title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contentType">Content Type *</Label>
              <Select name="contentType" defaultValue={content?.content_type}>
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" defaultValue={content?.category}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select name="status" defaultValue={content?.status || "draft"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              rows={3}
              defaultValue={content?.excerpt}
              placeholder="Brief description of the content..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contentBody">Content *</Label>
            <Textarea
              id="contentBody"
              name="contentBody"
              rows={12}
              required
              defaultValue={content?.content_body}
              placeholder="Enter the main content here..."
              className="font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              name="tags"
              defaultValue={content?.tags?.join(", ")}
              placeholder="Enter tags separated by commas"
            />
            <p className="text-sm text-gray-500">Separate multiple tags with commas</p>
          </div>

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  )
}
