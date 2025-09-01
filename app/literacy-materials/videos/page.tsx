"use client"
import { Header } from "@/components/header"
import { Play, Star, Eye } from "lucide-react"
import Link from "next/link"

export default function VideosPage() {
  const categories = [
    {
      title: "Pronunciation Basics",
      desc: "Master the sounds of Fur language",
      videos: [
        { title: "Fur Alphabet Pronunciation", duration: "12:34", views: "1,234", rating: 4.8, level: "Beginner", href:"/video/Alphabets_prounciation.mp4" },
        { title: "Alphabet Practice Session", duration: "08:45", views: "980", rating: 4.9, level: "Beginner", href: "/video/Alphabets_practice.mp4" },
        { title: "Vowel Sounds in Fur", duration: "15:20", views: "850", rating: 4.9, level: "Beginner", href: "/videos/vowel-sounds.mp4" },
        { title: "Consonant Combinations", duration: "15:20", views: "770", rating: 4.7, level: "Intermediate", href: "/videos/consonant-combinations.mp4" },
      ],
    },
    {
      title: "Reading Practice",
      desc: "Develop reading skills with guided practice",
      videos: [
        { title: "Reading Practice - Session 1", duration: "10:15", views: "1,100", rating: 4.8, level: "Beginner", href: "/video/reading1.mp4" },
        { title: "Reading Practice - Session 2", duration: "14:30", views: "930", rating: 4.7, level: "Intermediate", href: "/video/reading1.mp4" },
        { title: "Greetings and Introductions", duration: "12:20", views: "1,300", rating: 4.9, level: "Beginner", href: "/videos/greetings.mp4" },
        { title: "Family Conversations", duration: "11:45", views: "1,050", rating: 4.8, level: "Beginner", href: "/videos/family-conversations.mp4" },
      ],
    },
    {
      title: "Cultural Content",
      desc: "Learn through poetry and cultural materials",
      videos: [
        { title: "Classroom Poetry Session", duration: "25:30", views: "540", rating: 4.9, level: "Intermediate", href: "/videos/poetry-session.mp4" },
        { title: "Traditional Stories", duration: "19:20", views: "670", rating: 4.6, level: "Intermediate", href: "/videos/traditional-stories.mp4" },
        { title: "Cultural Expressions", duration: "22:15", views: "420", rating: 4.7, level: "Advanced", href: "/videos/cultural-expressions.mp4" },
      ],
    },
    {
      title: "Health Education",
      desc: "Important health information in Fur language",
      videos: [
        { title: "COVID-19 Prevention Tips", duration: "18:45", views: "850", rating: 4.8, level: "Beginner", href: "/video/covid_tips.mp4" },
        { title: "COVID-19 Safety Guidelines", duration: "20:10", views: "720", rating: 4.7, level: "Beginner", href: "/video/covid_tips2.mp4" },
        { title: "General Health Tips", duration: "14:55", views: "600", rating: 4.6, level: "Beginner", href: "/videos/health-tips.mp4" },
      ],
    },
    {
      title: "Grammar Lessons",
      desc: "Understand Fur language structure",
      videos: [
        { title: "Sentence Structure Basics", duration: "16:20", views: "740", rating: 4.7, level: "Intermediate", href: "/videos/sentence-structure.mp4" },
        { title: "Verb Conjugations", duration: "22:10", views: "530", rating: 4.5, level: "Advanced", href: "/videos/verb-conjugations.mp4" },
        { title: "Question Formation", duration: "13:55", views: "860", rating: 4.8, level: "Intermediate", href: "/videos/question-formation.mp4" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">🎥 Fur Language Video Lessons</h1>
        {categories.map((cat, idx) => (
          <div key={idx} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{cat.title}</h2>
            <p className="text-gray-600 mb-4">{cat.desc}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.videos.map((video, vIdx) => (
                <Link key={vIdx} href={video.href} className="block bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-blue-600">{video.level}</span>
                    <span className="text-xs text-gray-500">{video.duration}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{video.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span className="flex items-center"><Eye className="w-4 h-4 mr-1" /> {video.views}</span>
                    <span className="flex items-center"><Star className="w-4 h-4 mr-1 text-yellow-500" /> {video.rating}</span>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Play className="w-6 h-6 text-blue-500" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
