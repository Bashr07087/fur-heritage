"use client"

import type React from "react"

import { Header } from "@/components/header"
import {
  CalendarIcon,
  MapPin,
  Clock,
  Users,
  Filter,
  Plus,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
} from "lucide-react"
import { useState } from "react"
import { registerForEvent, addToCalendar, shareEvent } from "@/lib/actions/events"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState("December 2024")
  const [filterCategory, setFilterCategory] = useState<string | null>(null)
  const [registrationDialog, setRegistrationDialog] = useState<string | null>(null)
  const [isRegistering, setIsRegistering] = useState(false)
  const { toast } = useToast()

  const eventCategories = [
    { name: "Cultural Events", color: "bg-purple-500", textColor: "text-purple-700" },
    { name: "Language Classes", color: "bg-blue-500", textColor: "text-blue-700" },
    { name: "Community Meetings", color: "bg-green-500", textColor: "text-green-700" },
    { name: "Health Programs", color: "bg-red-500", textColor: "text-red-700" },
    { name: "Youth Activities", color: "bg-yellow-500", textColor: "text-yellow-700" },
    { name: "Religious Observances", color: "bg-teal-500", textColor: "text-teal-700" },
  ]

  const upcomingEvents = [
    {
      id: "event-1",
      title: "Fur Language Beginner Class",
      date: "December 15, 2024",
      time: "6:00 PM - 8:00 PM",
      location: "Community Center, Nyala",
      category: "Language Classes",
      description: "Weekly beginner-level Fur language class for new learners. All materials provided.",
      organizer: "Fur Language Institute",
      attendees: 25,
      maxAttendees: 30,
      isRecurring: true,
    },
    {
      id: "event-2",
      title: "Traditional Storytelling Evening",
      date: "December 18, 2024",
      time: "7:00 PM - 9:00 PM",
      location: "Cultural Heritage Center",
      category: "Cultural Events",
      description: "Elder storytellers share traditional Fur folk tales and legends with the community.",
      organizer: "Cultural Preservation Society",
      attendees: 45,
      maxAttendees: 60,
      isRecurring: false,
    },
    {
      id: "event-3",
      title: "Community Health Workshop",
      date: "December 20, 2024",
      time: "10:00 AM - 12:00 PM",
      location: "Health Center, Jebel Marra",
      category: "Health Programs",
      description: "Health education workshop focusing on maternal and child health in Fur language.",
      organizer: "Community Health Team",
      attendees: 18,
      maxAttendees: 25,
      isRecurring: false,
    },
    {
      id: "event-4",
      title: "Youth Cultural Exchange",
      date: "December 22, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Youth Center, Darfur",
      category: "Youth Activities",
      description: "Young people share cultural experiences and learn traditional arts and crafts.",
      organizer: "Fur Youth Association",
      attendees: 32,
      maxAttendees: 40,
      isRecurring: false,
    },
    {
      id: "event-5",
      title: "Monthly Community Meeting",
      date: "December 25, 2024",
      time: "4:00 PM - 6:00 PM",
      location: "Community Hall, Central Darfur",
      category: "Community Meetings",
      description: "Monthly gathering to discuss community issues and plan upcoming activities.",
      organizer: "Community Council",
      attendees: 67,
      maxAttendees: 80,
      isRecurring: true,
    },
    {
      id: "event-6",
      title: "New Year Cultural Festival",
      date: "January 1, 2025",
      time: "12:00 PM - 8:00 PM",
      location: "Festival Grounds, Nyala",
      category: "Cultural Events",
      description: "Annual celebration featuring traditional music, dance, food, and cultural exhibitions.",
      organizer: "Festival Committee",
      attendees: 156,
      maxAttendees: 500,
      isRecurring: true,
    },
  ]

  const importantDates = [
    {
      title: "Fur Language Day",
      date: "February 21",
      description: "Annual celebration of Fur language and cultural heritage",
      type: "Cultural Holiday",
    },
    {
      title: "Harvest Festival",
      date: "October 15-17",
      description: "Traditional three-day celebration of the harvest season",
      type: "Cultural Holiday",
    },
    {
      title: "Community Founding Day",
      date: "March 12",
      description: "Commemoration of the establishment of the Fur cultural center",
      type: "Community Holiday",
    },
    {
      title: "Elders Appreciation Day",
      date: "May 8",
      description: "Special day to honor community elders and their wisdom",
      type: "Cultural Holiday",
    },
  ]

  const filteredEvents = filterCategory
    ? upcomingEvents.filter((event) => event.category === filterCategory)
    : upcomingEvents

  const handlePreviousMonth = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    const [month, year] = currentMonth.split(" ")
    const currentIndex = months.indexOf(month)
    const newIndex = currentIndex === 0 ? 11 : currentIndex - 1
    const newYear = currentIndex === 0 ? Number.parseInt(year) - 1 : Number.parseInt(year)
    setCurrentMonth(`${months[newIndex]} ${newYear}`)
  }

  const handleNextMonth = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    const [month, year] = currentMonth.split(" ")
    const currentIndex = months.indexOf(month)
    const newIndex = currentIndex === 11 ? 0 : currentIndex + 1
    const newYear = currentIndex === 11 ? Number.parseInt(year) + 1 : Number.parseInt(year)
    setCurrentMonth(`${months[newIndex]} ${newYear}`)
  }

  const handleEventRegistration = async (
    event: React.FormEvent<HTMLFormElement>,
    eventId: string,
    eventTitle: string,
  ) => {
    event.preventDefault()
    setIsRegistering(true)

    const formData = new FormData(event.currentTarget)
    const registration = {
      eventId,
      eventTitle,
      userName: formData.get("userName") as string,
      userEmail: formData.get("userEmail") as string,
      userPhone: formData.get("userPhone") as string,
      attendeeCount: Number.parseInt(formData.get("attendeeCount") as string) || 1,
      specialRequests: formData.get("specialRequests") as string,
    }

    const result = await registerForEvent(registration)

    if (result.success) {
      toast({
        title: "Registration Successful!",
        description: `You have been registered for "${eventTitle}". Check your email for confirmation.`,
      })
      setRegistrationDialog(null)
    } else {
      toast({
        title: "Registration Failed",
        description: result.error || "Please try again later.",
        variant: "destructive",
      })
    }

    setIsRegistering(false)
  }

  const handleAddToCalendar = async (event: any) => {
    const icsContent = await addToCalendar(event.id, event.title, event.date, event.time, event.location)
    const blob = new Blob([icsContent], { type: "text/calendar" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${event.title.replace(/\s+/g, "_")}.ics`
    link.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Calendar Event Added",
      description: "Event has been downloaded to your calendar.",
    })
  }

  const handleShareEvent = async (event: any) => {
    const shareData = await shareEvent(event.id, event.title)

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        navigator.clipboard.writeText(shareData.url)
        toast({
          title: "Event Link Copied",
          description: "Event link has been copied to your clipboard.",
        })
      }
    } else {
      navigator.clipboard.writeText(shareData.url)
      toast({
        title: "Event Link Copied",
        description: "Event link has been copied to your clipboard.",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Calendar</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed about upcoming cultural events, language classes, community meetings, and important dates in
            the Fur community.
          </p>
        </div>

        {/* Calendar Navigation */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button onClick={handlePreviousMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold text-gray-900">{currentMonth}</h2>
              <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter Events
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Filter Events by Category</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2">
                    <button
                      onClick={() => setFilterCategory(null)}
                      className={`w-full text-left px-3 py-2 rounded-lg ${!filterCategory ? "bg-teal-100 text-teal-700" : "hover:bg-gray-100"}`}
                    >
                      All Events
                    </button>
                    {eventCategories.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => setFilterCategory(category.name)}
                        className={`w-full text-left px-3 py-2 rounded-lg flex items-center ${filterCategory === category.name ? "bg-teal-100 text-teal-700" : "hover:bg-gray-100"}`}
                      >
                        <div className={`w-3 h-3 rounded-full mr-3 ${category.color}`}></div>
                        {category.name}
                      </button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
              <button className="flex items-center px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </button>
            </div>
          </div>

          {/* Event Categories Legend */}
          <div className="flex flex-wrap gap-4">
            {eventCategories.map((category, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${category.color}`}></div>
                <span className="text-sm text-gray-600">{category.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Upcoming Events {filterCategory && `- ${filterCategory}`}
          </h2>
          <div className="space-y-6">
            {filteredEvents.map((event, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div
                          className={`w-3 h-3 rounded-full mr-3 ${
                            event.category === "Cultural Events"
                              ? "bg-purple-500"
                              : event.category === "Language Classes"
                                ? "bg-blue-500"
                                : event.category === "Community Meetings"
                                  ? "bg-green-500"
                                  : event.category === "Health Programs"
                                    ? "bg-red-500"
                                    : event.category === "Youth Activities"
                                      ? "bg-yellow-500"
                                      : "bg-teal-500"
                          }`}
                        ></div>
                        <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                        {event.isRecurring && (
                          <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            Recurring
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                    </div>
                    <Dialog
                      open={registrationDialog === event.id}
                      onOpenChange={(open) => setRegistrationDialog(open ? event.id : null)}
                    >
                      <DialogTrigger asChild>
                        <button className="text-teal-700 hover:text-teal-800 font-medium transition-colors">
                          Register →
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Register for Event</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={(e) => handleEventRegistration(e, event.id, event.title)} className="space-y-4">
                          <div>
                            <Label htmlFor="userName">Full Name</Label>
                            <Input id="userName" name="userName" required />
                          </div>
                          <div>
                            <Label htmlFor="userEmail">Email Address</Label>
                            <Input id="userEmail" name="userEmail" type="email" required />
                          </div>
                          <div>
                            <Label htmlFor="userPhone">Phone Number (Optional)</Label>
                            <Input id="userPhone" name="userPhone" type="tel" />
                          </div>
                          <div>
                            <Label htmlFor="attendeeCount">Number of Attendees</Label>
                            <Input
                              id="attendeeCount"
                              name="attendeeCount"
                              type="number"
                              min="1"
                              defaultValue="1"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                            <Textarea id="specialRequests" name="specialRequests" rows={3} />
                          </div>
                          <Button type="submit" className="w-full" disabled={isRegistering}>
                            {isRegistering ? "Registering..." : "Register for Event"}
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm">
                        {event.attendees}/{event.maxAttendees} attending
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm text-gray-500">Organized by {event.organizer}</div>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleAddToCalendar(event)}
                        className="text-gray-600 hover:text-gray-800 text-sm transition-colors flex items-center"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Add to Calendar
                      </button>
                      <button
                        onClick={() => handleShareEvent(event)}
                        className="text-gray-600 hover:text-gray-800 text-sm transition-colors flex items-center"
                      >
                        <Share2 className="w-4 h-4 mr-1" />
                        Share Event
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Dates */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Important Cultural Dates</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {importantDates.map((date, index) => (
              <div key={index} className="border-l-4 border-teal-700 pl-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{date.title}</h3>
                  <span className="text-sm text-teal-700 font-medium">{date.date}</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{date.description}</p>
                <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full">{date.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Event Statistics */}
        <div className="bg-teal-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Event Participation</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-teal-700">45+</div>
              <div className="text-gray-600">Monthly Events</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-700">1,200+</div>
              <div className="text-gray-600">Regular Participants</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-700">85%</div>
              <div className="text-gray-600">Average Attendance</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-700">12</div>
              <div className="text-gray-600">Event Categories</div>
            </div>
          </div>
        </div>

        {/* Event Guidelines */}
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Guidelines & Information</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">How to Register</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Click "Register" on any event listing
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Provide contact information and attendance details
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Receive confirmation and event reminders
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Add events to your personal calendar
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Event Policies</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  All events are free and open to community members
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Registration required for workshops and classes
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Cultural events welcome all ages and families
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Respect cultural protocols and community guidelines
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
