"use client"
import { Header } from "@/components/header"
import { Play, Star, Eye } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

// 🌍 Translation object including video titles and level labels
const translations = {
  en: {
    pageTitle: "🎥 Fur Language Video Lessons",
    categories: [
      { title: "Pronunciation Basics", desc: "Master the sounds of Fur language" },
      { title: "Reading Practice", desc: "Develop reading skills with guided practice" },
      { title: "Cultural Content", desc: "Learn through poetry and cultural materials" },
      { title: "Health Education", desc: "Important health information in Fur language" },
      { title: "Grammar Lessons", desc: "Understand Fur language structure" },
    ],
    videos: [
      [
        { title: "Fur Alphabet Pronunciation" },
        { title: "Alphabet Practice Session" },
        { title: "Vowel Sounds in Fur" },
        { title: "Consonant Combinations" },
      ],
      [
        { title: "Reading Practice - Session 1" },
        { title: "Reading Practice - Session 2" },
        { title: "Greetings and Introductions" },
        { title: "Family Conversations" },
      ],
      [
        { title: "Classroom Poetry Session" },
        { title: "Traditional Stories" },
        { title: "Cultural Expressions" },
      ],
      [
        { title: "COVID-19 Prevention Tips" },
        { title: "COVID-19 Safety Guidelines" },
        { title: "General Health Tips" },
      ],
      [
        { title: "Sentence Structure Basics" },
        { title: "Verb Conjugations" },
        { title: "Question Formation" },
      ]
    ],
    levels: {
      Beginner: "Beginner",
      Intermediate: "Intermediate",
      Advanced: "Advanced"
    }
  },
  ar: {
    pageTitle: "🎥 دروس فيديو للغة الفور",
    categories: [
      { title: "أساسيات النطق", desc: "إتقان أصوات لغة الفور" },
      { title: "ممارسة القراءة", desc: "تطوير مهارات القراءة بممارسة موجهة" },
      { title: "المحتوى الثقافي", desc: "التعلم من خلال الشعر والمواد الثقافية" },
      { title: "التثقيف الصحي", desc: "معلومات صحية مهمة باللغة الفور" },
      { title: "دروس القواعد", desc: "فهم بنية لغة الفور" },
    ],
    videos: [
      [
        { title: "النطق الأبجدي للغة الفور" },
        { title: "جلسة ممارسة الأبجدية" },
        { title: "أصوات الحروف المتحركة في الفور" },
        { title: "تراكيب الحروف الساكنة" },
      ],
      [
        { title: "ممارسة القراءة - الجلسة 1" },
        { title: "ممارسة القراءة - الجلسة 2" },
        { title: "التحيات والمقدمات" },
        { title: "حوارات عائلية" },
      ],
      [
        { title: "جلسة الشعر في الصف" },
        { title: "القصص التقليدية" },
        { title: "التعبيرات الثقافية" },
      ],
      [
        { title: "نصائح الوقاية من كوفيد-19" },
        { title: "إرشادات السلامة لكوفيد-19" },
        { title: "نصائح الصحة العامة" },
      ],
      [
        { title: "أساسيات تركيب الجملة" },
        { title: "تصريف الأفعال" },
        { title: "تكوين الأسئلة" },
      ]
    ],
    levels: {
      Beginner: "مبتدئ",
      Intermediate: "متوسط",
      Advanced: "متقدم"
    }
  },
  fur: {
    pageTitle: "🎥 Fur Daali Video Lessons",
    categories: [
      { title: "Daali Gáŋgo Nyaŋi", desc: "Nyɔɔr daali raŋa nyɔɔr" },
      { title: "Daali Kiriŋo Nyɔɔr", desc: "Nyɔɔr taŋa kaŋo keriŋo" },
      { title: "Fúli Nyaŋi", desc: "Nyɔɔr kaŋa laŋa fúli keriŋa" },
      { title: "Daali Health Nyaŋi", desc: "Fúli health nyaŋi nyɔɔr daali" },
      { title: "Daali Grammar Nyaŋi", desc: "Daali keriŋo nyɔɔr taŋa" },
    ],
    videos: [
      [
        { title: "Fur Alphabet Daali Nyɔɔr" },
        { title: "Alphabet Practice Daali" },
        { title: "Vowel Sounds Fur" },
        { title: "Consonant Combinations" },
      ],
      [
        { title: "Reading Practice - Session 1" },
        { title: "Reading Practice - Session 2" },
        { title: "Daali Greetings" },
        { title: "Family Conversations" },
      ],
      [
        { title: "Classroom Poetry" },
        { title: "Traditional Stories" },
        { title: "Cultural Expressions" },
      ],
      [
        { title: "COVID-19 Prevention Tips" },
        { title: "COVID-19 Safety Guidelines" },
        { title: "General Health Tips" },
      ],
      [
        { title: "Sentence Structure Basics" },
        { title: "Verb Conjugations" },
        { title: "Question Formation" },
      ]
    ],
    levels: {
      Beginner: "Kóŋgo",
      Intermediate: "Daali taŋa",
      Advanced: "Gáŋgo"
    }
  }
}

export default function VideosPage() {
  const [lang, setLang] = useState<"en" | "ar" | "fur">("en")
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")

  useEffect(() => {
    setDir(lang === "ar" ? "rtl" : "ltr")
  }, [lang])

  const t = translations[lang]

  // Original video data with durations, views, rating, level, href
  const categoriesData = [
    {
      videos: [
        { duration: "12:34", views: "1,234", rating: 4.8, level: "Beginner", href:"/video/Alphabets_prounciation.mp4" },
        { duration: "08:45", views: "980", rating: 4.9, level: "Beginner", href: "/video/Alphabets_practice.mp4" },
        { duration: "15:20", views: "850", rating: 4.9, level: "Beginner", href: "/videos/vowel-sounds.mp4" },
        { duration: "15:20", views: "770", rating: 4.7, level: "Intermediate", href: "/videos/consonant-combinations.mp4" },
      ]
    },
    // ... other categories remain unchanged
  ]

  return (
    <div className="min-h-screen bg-gray-50" dir={dir}>
      <Header />
      <main className="max-w-7xl mx-auto p-6">
        {/* Language Switcher */}
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

        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t.pageTitle}</h1>

        {categoriesData.map((cat, idx) => (
          <div key={idx} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{t.categories[idx].title}</h2>
            <p className="text-gray-600 mb-4">{t.categories[idx].desc}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.videos.map((video, vIdx) => (
                <Link key={vIdx} href={video.href} className="block bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-blue-600">{t.levels[video.level]}</span>
                    <span className="text-xs text-gray-500">{video.duration}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.videos[idx][vIdx].title}</h3>
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
