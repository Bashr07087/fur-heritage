"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Play, Star, Filter, Search, Eye } from "lucide-react"
import Link from "next/link"

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const videoCategories = [
    { name: "Language Lessons", count: 45, color: "bg-blue-100 text-blue-700", href: "/language-resources" },
    { name: "Cultural Events", count: 28, color: "bg-green-100 text-green-700", href: "/cultural-events" },
    { name: "Traditional Music", count: 22, color: "bg-purple-100 text-purple-700", href: "/cultural-events" },
    { name: "Folk Dances", count: 18, color: "bg-red-100 text-red-700", href: "/cultural-events" },
    { name: "Storytelling", count: 35, color: "bg-yellow-100 text-yellow-700", href: "/educational-updates" },
    { name: "Documentaries", count: 12, color: "bg-blue-50 text-blue-600", href: "/educational-updates" },
  ]

  const featuredVideos = [
    {
      title: "Complete Fur Alphabets",
      description: "Introduction to Fur language basics, alphabet, and pronunciation with native speakers",
      duration: "25:30",
      views: "12,450",
      rating: 4.9,
      category: "Language Lessons",
      level: "Beginner",
      instructor: "Omer soba",
      uploadDate: "2 weeks ago",
      thumbnail: "/images/omer_soba.jpg",
      videoUrl: "video/Alphabets_prounciation.mp4",
    },
    {
      title: "Complete Fur Alphabets",
      description: "Fur language alphabets Pronounciation practice by learners",
      duration: "2:45",
      views: "8,920",
      rating: 4.8,
      category: "Eductional",
      level: "All Levels",
      instructor: "Instructor's Team",
      uploadDate: "1 month ago",
      thumbnail: "/images/omer_soba.jpg",
      videoUrl: "video/Alphabets_practice.mp4",
    },
    {
      title: "Class song",
      description: "Traditional songs performed by community elders with lyrics and translations for Class",
      duration: "3:15",
      views: "15,680",
      rating: 4.7,
      category: "Traditional Music",
      level: "All Levels",
      instructor: "Instructors group",
      uploadDate: "3 weeks ago",
      thumbnail: "/images/class_song.png",
      videoUrl: "video/Class_poem.mp4",
    },
    {
      title: "Month of the Year",
      description: "Animated stories Month of the year in Fur language for children  and elder with colorful illustrations",
      duration: "12:20",
      views: "22,340",
      rating: 4.9,
      category: "Storytelling",
      level: "All Levels",
      instructor: "elder and Children's Education Team",
      uploadDate: "1 week ago",
      thumbnail: "/images/Months.png",
      videoUrl: "video/month_of_the_year.mp4",
    },
    {
      title: "covid prevention Tip_01",
      description: "covid prevention tips explained in fur Language",
      duration: "3:50",
      views: "9,750",
      rating: 4.6,
      category: "Tips",
      level: "All levels",
      instructor: "Omer Soba",
      uploadDate: "2 months ago",
      thumbnail: "/images/omer_soba.jpg",
      videoUrl: "video/covid_tips.mp4",
    },
    {
      title: "Covid prevention tip_02",
      description: "covid prevention tips explained in fur Language for both elders and children",
      duration: "3:30",
      views: "11,200",
      rating: 4.8,
      category: "Folk Dances",
      level: "All Levels",
      instructor: "Omer Soba",
      uploadDate: "6 weeks ago",
      thumbnail: "/images/omer_soba.jpg",
      videoUrl: "video/covid_tips2.mp4",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Video Library</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our collection of Fur language lessons, cultural documentaries, traditional music,
            folk dances, and storytelling content created by community experts.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search videos by title, instructor, or topic..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filter & Sort
            </button>
          </div>
        </div>

        {/* Video Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {videoCategories.map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className={`p-4 rounded-lg text-center hover:shadow-md transition-shadow block ${category.color}`}
            >
              <div className="font-medium text-sm">{category.name}</div>
              <div className="text-xs opacity-75 mt-1">{category.count} videos</div>
            </Link>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVideos.map((video, index) => (
            <div
              key={index}
              onClick={() => setSelectedVideo(video.videoUrl)}
              className="cursor-pointer bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-video bg-gray-200 relative">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-50">
                  <button className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                    <Play className="w-5 h-5 text-blue-700 ml-0.5" />
                  </button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
                <div className="absolute top-2 left-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      video.level === "Beginner"
                        ? "bg-green-600 text-white"
                        : video.level === "Intermediate"
                        ? "bg-yellow-600 text-white"
                        : video.level === "Children"
                        ? "bg-pink-600 text-white"
                        : "bg-gray-600 text-white"
                    }`}
                  >
                    {video.level}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span>{video.instructor}</span>
                  <span>{video.uploadDate}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center text-gray-500">
                      <Eye className="w-3 h-3 mr-1" />
                      {video.views}
                    </span>
                    <span className="flex items-center text-gray-500">
                      <Star className="w-3 h-3 mr-1 text-yellow-500" />
                      {video.rating}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      video.category === "Language Lessons"
                        ? "bg-blue-100 text-blue-700"
                        : video.category === "Cultural Events"
                        ? "bg-green-100 text-green-700"
                        : video.category === "Traditional Music"
                        ? "bg-purple-100 text-purple-700"
                        : video.category === "Folk Dances"
                        ? "bg-red-100 text-red-700"
                        : video.category === "Storytelling"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {video.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-black rounded-xl overflow-hidden w-[80%] h-[70%] relative">
              <iframe
                className="w-full h-full"
                src={`${selectedVideo}?autoplay=1`}
                title="Video player"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-lg"
              >
                ✕ Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
