"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Play, Star, Filter, Search, Eye } from "lucide-react"
import Link from "next/link"

// 🌍 Texts in three languages
const translations = {
  en: {
    pageTitle: "Video Library",
    pageDescription:
      "Explore our collection of Fur language lessons, cultural documentaries, traditional music, folk dances, and storytelling content created by community experts.",
    searchPlaceholder: "Search videos by title, instructor, or topic...",
    filter: "Filter & Sort",
    close: "✕ Close",
  },
  ar: {
    pageTitle: "مكتبة الفيديو",
    pageDescription:
      "استكشف مجموعتنا من دروس لغة الفور، الوثائقيات الثقافية، الموسيقى التقليدية، الرقصات الشعبية، ومحتوى القصص الذي أنشأه خبراء المجتمع.",
    searchPlaceholder: "ابحث عن الفيديو حسب العنوان أو المدرس أو الموضوع...",
    filter: "تصفية وفرز",
    close: "✕ إغلاق",
  },
  fur: {
    pageTitle: "Fur Kɔllɔ Videwo",
    pageDescription:
      "Kaŋa fur daali goroŋ, kɔltura dokumentari, muzika kɔlɔ, dansa daŋa, se kɔlɔŋa kɔmoŋda wuroŋa goroŋ.",
    searchPlaceholder: "Kɔse videwo seŋa, malimoŋa wala goroŋa...",
    filter: "Shiri & Sorta",
    close: "✕ Gudi",
  },
}

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [lang, setLang] = useState<"en" | "ar" | "fur">("en")
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")

  const t = translations[lang]

  // 🔄 Update text direction on language change
  useEffect(() => {
    setDir(lang === "ar" ? "rtl" : "ltr")
  }, [lang])

  const videoCategories = [
    { name: { en: "Language Lessons", ar: "دروس اللغة", fur: "Daali Ɛlɛŋ" }, count: 45, color: "bg-blue-100 text-blue-700", href: "/language-resources" },
    { name: { en: "Cultural Events", ar: "الفعاليات الثقافية", fur: "Kɔltura Kɔmɔŋ" }, count: 28, color: "bg-green-100 text-green-700", href: "/cultural-events" },
    { name: { en: "Traditional Music", ar: "الموسيقى التقليدية", fur: "Muzika Kɔlɔ" }, count: 22, color: "bg-purple-100 text-purple-700", href: "/cultural-events" },
    { name: { en: "Folk Dances", ar: "الرقصات الشعبية", fur: "Dansa Wuroŋ" }, count: 18, color: "bg-red-100 text-red-700", href: "/cultural-events" },
    { name: { en: "Storytelling", ar: "رواية القصص", fur: "Sega Goroŋ" }, count: 35, color: "bg-yellow-100 text-yellow-700", href: "/educational-updates" },
    { name: { en: "Documentaries", ar: "الوثائقيات", fur: "Dokumentari" }, count: 12, color: "bg-blue-50 text-blue-600", href: "/educational-updates" },
  ]

  const featuredVideos = [
    {
      title: { en: "Complete Fur Alphabets", ar: "الحروف الكاملة بلغة الفور", fur: "Fur Alphabeta Goroŋ" },
      description: {
        en: "Introduction to Fur language basics, alphabet, and pronunciation with native speakers",
        ar: "مقدمة في أساسيات لغة الفور، الأبجدية، والنطق مع المتحدثين الأصليين",
        fur: "Fur daali kɔmɔŋ, alphabeta, naŋ prononsieŋa seŋa natiwiŋa",
      },
      duration: "25:30",
      views: "12,450",
      rating: 4.9,
      category: "Language Lessons",
      level: "Beginner",
      instructor: "Omer Soba",
      uploadDate: "2 weeks ago",
      thumbnail: "/images/omer_soba.jpg",
      videoUrl: "video/Alphabets_prounciation.mp4",
    },
    {
      title: { en: "Class Song", ar: "أغنية الصف", fur: "Klasu Sɔŋ" },
      description: {
        en: "Traditional songs performed by community elders with lyrics and translations",
        ar: "أغانٍ تقليدية يؤديها شيوخ المجتمع مع كلمات وترجمات",
        fur: "Muzika kɔlɔ goroŋda wuroŋa baabaŋ seŋa naŋa seŋa translateŋa",
      },
      duration: "3:15",
      views: "15,680",
      rating: 4.7,
      category: "Traditional Music",
      level: "All Levels",
      instructor: "Instructors Group",
      uploadDate: "3 weeks ago",
      thumbnail: "/images/class_song.png",
      videoUrl: "video/Class_poem.mp4",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50" dir={dir}>
      <Header />

      <main className="container mx-auto px-6 py-12">
        {/* 🌍 Language Switcher */}
        <div className="flex justify-end mb-6">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as "en" | "ar" | "fur")}
            className="border rounded px-3 py-2 shadow"
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
            <option value="fur">Fur</option>
          </select>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.pageTitle}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.pageDescription}</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              {t.filter}
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
              <div className="font-medium text-sm">{category.name[lang]}</div>
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
                  alt={video.title[lang]}
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
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title[lang]}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description[lang]}</p>
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
                {t.close}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
