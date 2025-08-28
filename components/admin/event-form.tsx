"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { createEvent } from "@/lib/actions/events"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating Event...
        </>
      ) : (
        "Create Event"
      )}
    </Button>
  )
}

interface EventFormProps {
  event?: any
  isEditing?: boolean
}

export default function EventForm({ event, isEditing = false }: EventFormProps) {
  const router = useRouter()
  const [state, formAction] = useActionState(createEvent, null)

  useEffect(() => {
    if (state?.success) {
      router.push("/admin/events")
    }
  }, [state, router])

  const eventCategories = [
    "Cultural Events",
    "Language Classes",
    "Community Meetings",
    "Health Programs",
    "Youth Activities",
    "Religious Observances",
  ]

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Event" : "Create New Event"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          {state?.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {state.error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Event Title *</Label>
            <Input id="title" name="title" required defaultValue={event?.title} placeholder="Enter event title" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={event?.description}
              placeholder="Describe the event..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="event_date">Event Date *</Label>
              <Input id="event_date" name="event_date" type="date" required defaultValue={event?.event_date} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select name="category" defaultValue={event?.category}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {eventCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_time">Start Time *</Label>
              <Input id="start_time" name="start_time" type="time" required defaultValue={event?.start_time} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_time">End Time *</Label>
              <Input id="end_time" name="end_time" type="time" required defaultValue={event?.end_time} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input id="location" name="location" required defaultValue={event?.location} placeholder="Event location" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="organizer">Organizer *</Label>
              <Input
                id="organizer"
                name="organizer"
                required
                defaultValue={event?.organizer}
                placeholder="Event organizer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max_attendees">Max Attendees</Label>
              <Input
                id="max_attendees"
                name="max_attendees"
                type="number"
                min="1"
                defaultValue={event?.max_attendees || 50}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="is_recurring" name="is_recurring" defaultChecked={event?.is_recurring} />
            <Label htmlFor="is_recurring">This is a recurring event</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recurring_pattern">Recurring Pattern (if applicable)</Label>
            <Select name="recurring_pattern" defaultValue={event?.recurring_pattern}>
              <SelectTrigger>
                <SelectValue placeholder="Select pattern" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  )
}
