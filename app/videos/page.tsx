"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Play, Filter, Search } from "lucide-react"

// 🌍 Texts in three languages
const translations = {
  en: {
    pageTitle: "Video Library",
    pageDescription:
      "Explore our collection of Fur language lessons, cultural documentaries, traditional music, folk dances, and storytelling content created by community experts.",
    searchPlaceholder: "Search videos by title, instructor, or topic...",
    filter: "Filter & Sort",
    close: "✕ Close",
    categoryTitle: "All Videos",
  },
  ar: {
    pageTitle: "مكتبة الفيديو",
    pageDescription:
      "استكشف مجموعتنا من دروس لغة الفور، الوثائقيات الثقافية، الموسيقى التقليدية، الرقصات الشعبية، ومحتوى القصص الذي أنشأه خبراء المجتمع.",
    searchPlaceholder: "ابحث عن الفيديو حسب العنوان أو المدرس أو الموضوع...",
    filter: "تصفية وفرز",
    close: "✕ إغلاق",
    categoryTitle: "جميع الفيديوهات",
  },
  fur: {
    pageTitle: "Fur Kɔllɔ Videwo",
    pageDescription:
      "Kaŋa fur daali goroŋ, kɔltura dokumentari, muzika kɔlɔ, dansa daŋa, se kɔlɔŋa kɔmoŋda wuroŋa goroŋ.",
    searchPlaceholder: "Kɔse videwo seŋa, malimoŋa wala goroŋa...",
    filter: "Shiri & Sorta",
    close: "✕ Gudi",
    categoryTitle: "Kɔllɔ Videwo",
  },
}

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [lang, setLang] = useState<"en" | "ar" | "fur">("en")
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const t = translations[lang]

  useEffect(() => {
    setDir(lang === "ar" ? "rtl" : "ltr")
  }, [lang])

  // 🌟 Video categories
  const videoCategories = [
    { id: "language", name: { en: "Language Lessons", ar: "دروس اللغة", fur: "Daali Ɛlɛŋ" }, count: 45, color: "bg-blue-100 text-blue-700" },
    { id: "cultural", name: { en: "Cultural Events", ar: "الفعاليات الثقافية", fur: "Kɔltura Kɔmɔŋ" }, count: 28, color: "bg-green-100 text-green-700" },
    { id: "music", name: { en: "Traditional Music", ar: "الموسيقى التقليدية", fur: "Muzika Kɔlɔ" }, count: 22, color: "bg-purple-100 text-purple-700" },
    { id: "dance", name: { en: "Folk Dances", ar: "الرقصات الشعبية", fur: "Dansa Wuroŋ" }, count: 18, color: "bg-red-100 text-red-700" },
    { id: "story", name: { en: "Storytelling", ar: "رواية القصص", fur: "Sega Goroŋ" }, count: 35, color: "bg-yellow-100 text-yellow-700" },
    { id: "docs", name: { en: "Documentaries", ar: "الوثائقيات", fur: "Dokumentari" }, count: 12, color: "bg-blue-50 text-blue-600" },
  ]

  // 🌟 Videos by category
  const videosByCategory: Record<string, any[]> = {
    language: [
      { title: { en: "Complete Fur Alphabets", ar: "الحروف الكاملة بلغة الفور", fur: "Fur Alphabeta Goroŋ" }, description: { en: "Introduction to Fur language basics", ar: "مقدمة في أساسيات لغة الفور", fur: "Fur daali kɔmɔŋ, alphabeta" }, duration: "25:30", views: "12,450", thumbnail: "/images/omer_soba.jpg", videoUrl: "video/alphabets.mp4" },
      { title: { en: "Fur Vocabulary Basics", ar: "أساسيات مفردات الفور", fur: "Fur Vokabula Goroŋ" }, description: { en: "Learn daily-use Fur words", ar: "تعلم كلمات الفور اليومية", fur: "Kɔse daali Fur goroŋ" }, duration: "15:10", views: "8,230", thumbnail: "/images/fur_vocab.jpg", videoUrl: "video/fur_vocab.mp4" },
      { title: { en: "Fur Grammar Essentials", ar: "أساسيات قواعد الفور", fur: "Fur Grammar Goroŋ" }, description: { en: "Learn the basic grammar rules of Fur", ar: "تعلم قواعد اللغة الأساسية للفور", fur: "Fur kɔmɔŋ grammar seŋa" }, duration: "20:05", views: "7,500", thumbnail: "/images/fur_grammar.jpg", videoUrl: "video/fur_grammar.mp4" },
      { title: { en: "Fur Conversation Practice", ar: "تمارين المحادثة بالفور", fur: "Fur Conversation Seŋa" }, description: { en: "Practice simple conversations in Fur", ar: "تمارين المحادثات البسيطة بالفور", fur: "Kɔse conversation kɔmoŋda Fur" }, duration: "18:45", views: "6,800", thumbnail: "/images/fur_conversation.jpg", videoUrl: "video/fur_conversation.mp4" },
      { title: { en: "Fur Reading Comprehension", ar: "فهم القراءة بالفور", fur: "Fur Reading Goroŋ" }, description: { en: "Learn to read and understand Fur texts", ar: "تعلم قراءة وفهم نصوص الفور", fur: "Kɔse read Fur texts seŋa" }, duration: "22:15", views: "5,900", thumbnail: "/images/fur_reading.jpg", videoUrl: "video/fur_reading.mp4" },
    ],
    cultural: [
      { title: { en: "Darfur Harvest Festival", ar: "مهرجان الحصاد في دارفور", fur: "Darfur Ɛnyɔŋ Festival" }, description: { en: "Annual harvest celebration", ar: "احتفال الحصاد السنوي", fur: "Ɛnyɔŋ festival kɔlɔ" }, duration: "12:40", views: "8,560", thumbnail: "/images/harvest.jpg", videoUrl: "video/harvest_festival.mp4" },
      { title: { en: "Traditional Costume Exhibition", ar: "معرض الأزياء التقليدية", fur: "Kɔltura Dress Exhibition" }, description: { en: "Showcasing traditional Fur clothing", ar: "عرض الملابس التقليدية للفور", fur: "Kɔltura kɔlɔ dress seŋa" }, duration: "10:25", views: "6,450", thumbnail: "/images/costume.jpg", videoUrl: "video/costume.mp4" },
      { title: { en: "Fur Wedding Traditions", ar: "تقاليد الزواج للفور", fur: "Fur Wedding Traditions" }, description: { en: "Learn about traditional wedding customs", ar: "تعرف على تقاليد الزواج التقليدية", fur: "Kɔse wedding customs Fur" }, duration: "14:30", views: "7,200", thumbnail: "/images/wedding.jpg", videoUrl: "video/wedding.mp4" },
      { title: { en: "Fur Community Gatherings", ar: "تجمعات المجتمع الفور", fur: "Fur Community Gatherings" }, description: { en: "Insights into Fur community celebrations", ar: "نظرة على احتفالات المجتمع الفور", fur: "Kɔse community gathering Fur" }, duration: "11:55", views: "5,600", thumbnail: "/images/community.jpg", videoUrl: "video/community.mp4" },
      { title: { en: "Fur Traditional Crafts", ar: "الحرف التقليدية للفور", fur: "Fur Crafts" }, description: { en: "Learn about Fur handicrafts and art", ar: "تعرف على الحرف اليدوية للفور والفن", fur: "Kɔse handicrafts Fur" }, duration: "13:40", views: "6,000", thumbnail: "/images/crafts.jpg", videoUrl: "video/crafts.mp4" },
    ],
    music: [
      { title: { en: "Class Song", ar: "أغنية الصف", fur: "Klasu Sɔŋ" }, description: { en: "Traditional songs performed by elders", ar: "أغانٍ تقليدية يؤديها الشيوخ", fur: "Muzika kɔlɔ goroŋda wuroŋa baabaŋ" }, duration: "3:15", views: "15,680", thumbnail: "/images/class_song.png", videoUrl: "video/class_song.mp4" },
      { title: { en: "Fur Celebration Songs", ar: "أغاني الاحتفالات الفور", fur: "Fur Celebration Sɔŋ" }, description: { en: "Songs performed at traditional ceremonies", ar: "أغانٍ تؤدى في الاحتفالات التقليدية", fur: "Muzika kɔlɔ seŋa kɔmoŋda" }, duration: "4:20", views: "9,200", thumbnail: "/images/celebration_song.jpg", videoUrl: "video/celebration_song.mp4" },
      { title: { en: "Darfur Folk Melodies", ar: "ألحان دارفور الشعبية", fur: "Darfur Folk Melodies" }, description: { en: "Folk music melodies from Darfur region", ar: "ألحان موسيقية شعبية من دارفور", fur: "Fur kɔltura melodies" }, duration: "5:00", views: "7,900", thumbnail: "/images/folk_melody.jpg", videoUrl: "video/folk_melody.mp4" },
      { title: { en: "Drumming Basics", ar: "أساسيات الطبول", fur: "Drumming Basics" }, description: { en: "Learn traditional drumming techniques", ar: "تعلم تقنيات الطبول التقليدية", fur: "Kɔse drumming Fur" }, duration: "4:50", views: "6,700", thumbnail: "/images/drumming.jpg", videoUrl: "video/drumming.mp4" },
      { title: { en: "Fur Song Compilation", ar: "تجميع أغاني الفور", fur: "Fur Song Compilation" }, description: { en: "Collection of popular Fur songs", ar: "مجموعة من الأغاني الشهيرة للفور", fur: "Compilation Fur songs" }, duration: "6:15", views: "8,100", thumbnail: "/images/song_compilation.jpg", videoUrl: "video/song_compilation.mp4" },
    ],
    dance: [
      { title: { en: "Fur Folk Dance", ar: "رقصة الفور الشعبية", fur: "Fur Dansa" }, description: { en: "Energetic dance performed in weddings", ar: "رقصة حماسية تؤدى في الأعراس", fur: "Dansa kɔmoŋda baŋa" }, duration: "6:45", views: "6,900", thumbnail: "/images/folk_dance.jpg", videoUrl: "video/folk_dance.mp4" },
      { title: { en: "Village Celebration Dance", ar: "رقصة الاحتفال القروية", fur: "Village Celebration Dance" }, description: { en: "Traditional dance in village celebrations", ar: "رقص تقليدي في الاحتفالات القروية", fur: "Dansa wuroŋ celebration" }, duration: "5:30", views: "5,800", thumbnail: "/images/village_dance.jpg", videoUrl: "video/village_dance.mp4" },
      { title: { en: "Wedding Dance Performance", ar: "عرض رقصة الزفاف", fur: "Wedding Dance Fur" }, description: { en: "Dance performed during weddings", ar: "رقصة تؤدى أثناء الأعراس", fur: "Dansa kɔmoŋda wedding" }, duration: "7:10", views: "6,300", thumbnail: "/images/wedding_dance.jpg", videoUrl: "video/wedding_dance.mp4" },
      { title: { en: "Traditional Dance Steps", ar: "خطوات الرقص التقليدي", fur: "Traditional Dance Steps" }, description: { en: "Step-by-step guide for traditional dance", ar: "دليل خطوة بخطوة للرقص التقليدي", fur: "Dansa step guide" }, duration: "5:50", views: "5,400", thumbnail: "/images/dance_steps.jpg", videoUrl: "video/dance_steps.mp4" },
      { title: { en: "Festival Dance", ar: "رقصة المهرجان", fur: "Festival Dance Fur" }, description: { en: "Dance performed during festivals", ar: "رقصة تؤدى أثناء المهرجانات", fur: "Dansa festival" }, duration: "6:20", views: "5,900", thumbnail: "/images/festival_dance.jpg", videoUrl: "video/festival_dance.mp4" },
    ],
    story: [
      { title: { en: "Fur Folk Tales", ar: "حكايات الفور الشعبية", fur: "Fur Tales" }, description: { en: "Popular stories passed through generations", ar: "قصص شعبية متوارثة", fur: "Goroŋ tales Fur" }, duration: "12:15", views: "7,800", thumbnail: "/images/folk_tales.jpg", videoUrl: "video/folk_tales.mp4" },
      { title: { en: "Moral Stories", ar: "قصص أخلاقية", fur: "Moral Stories Fur" }, description: { en: "Stories with lessons for children", ar: "قصص تحمل دروس للأطفال", fur: "Stories kɔse lesson" }, duration: "10:40", views: "6,500", thumbnail: "/images/moral_stories.jpg", videoUrl: "video/moral_stories.mp4" },
      { title: { en: "Animal Fables", ar: "حكايات الحيوانات", fur: "Animal Fables Fur" }, description: { en: "Fables featuring animals and lessons", ar: "حكايات تتضمن الحيوانات ودروسها", fur: "Animal tales Fur" }, duration: "11:20", views: "5,900", thumbnail: "/images/animal_fables.jpg", videoUrl: "video/animal_fables.mp4" },
      { title: { en: "Legendary Stories", ar: "قصص أسطورية", fur: "Legendary Stories Fur" }, description: { en: "Stories of Fur legends and heroes", ar: "قصص أسطورية عن الفور والأبطال", fur: "Legend tales Fur" }, duration: "13:05", views: "6,100", thumbnail: "/images/legend_stories.jpg", videoUrl: "video/legend_stories.mp4" },
      { title: { en: "Community Tales", ar: "حكايات المجتمع", fur: "Community Tales Fur" }, description: { en: "Stories told by Fur communities", ar: "قصص ترويها مجتمعات الفور", fur: "Goroŋ community tales" }, duration: "12:45", views: "5,700", thumbnail: "/images/community_tales.jpg", videoUrl: "video/community_tales.mp4" },
    ],
    docs: [
      { title: { en: "Darfur Documentary", ar: "وثائقي دارفور", fur: "Darfur Dokumentari" }, description: { en: "Insight into Darfur history", ar: "نظرة على تاريخ دارفور", fur: "Darfur history Fur" }, duration: "30:10", views: "6,500", thumbnail: "/images/darfur_doc.jpg", videoUrl: "video/darfur_doc.mp4" },
      { title: { en: "Cultural Heritage", ar: "التراث الثقافي", fur: "Cultural Heritage Fur" }, description: { en: "Documenting Fur heritage and traditions", ar: "توثيق التراث والتقاليد الفور", fur: "Fur heritage documentation" }, duration: "28:25", views: "5,900", thumbnail: "/images/heritage_doc.jpg", videoUrl: "video/heritage_doc.mp4" },
      { title: { en: "Community Projects", ar: "مشاريع المجتمع", fur: "Community Projects Fur" }, description: { en: "Documenting local community initiatives", ar: "توثيق المبادرات المجتمعية المحلية", fur: "Community projects Fur" }, duration: "25:50", views: "5,400", thumbnail: "/images/community_doc.jpg", videoUrl: "video/community_doc.mp4" },
      { title: { en: "Traditional Arts", ar: "الفنون التقليدية", fur: "Traditional Arts Fur" }, description: { en: "Documentary on Fur traditional arts", ar: "وثائقي عن الفنون التقليدية للفور", fur: "Fur traditional arts" }, duration: "27:15", views: "5,600", thumbnail: "/images/traditional_arts.jpg", videoUrl: "video/traditional_arts.mp4" },
      { title: { en: "Historical Events", ar: "الأحداث التاريخية", fur: "Historical Events Fur" }, description: { en: "Documenting key historical events in Fur region", ar: "توثيق الأحداث التاريخية الرئيسية في منطقة الفور", fur: "Fur historical events" }, duration: "29:05", views: "5,700", thumbnail: "/images/historical_events.jpg", videoUrl: "video/historical_events.mp4" },
    ],
  }
  // 🌟 Utility function to highlight matches
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text
    const regex = new RegExp(`(${query})`, "gi")
    const parts = text.split(regex)
    return parts.map((part, i) =>
      regex.test(part) ? <mark key={i} className="bg-yellow-200">{part}</mark> : part
    )
  }

  // 🌟 Determine selected category based on search term
  useEffect(() => {
    if (!searchTerm) return
    const matchedCategory = videoCategories.find(category =>
      category.name[lang].toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSelectedCategory(matchedCategory ? matchedCategory.id : null)
  }, [searchTerm, lang])

  // 🌟 Filter videos based on search and category
  const filteredVideos = selectedCategory
    ? videosByCategory[selectedCategory]?.filter(video =>
        video.title[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description[lang].toLowerCase().includes(searchTerm.toLowerCase())
      )
    : Object.values(videosByCategory)
        .flat()
        .filter(video =>
          video.title[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
          video.description[lang].toLowerCase().includes(searchTerm.toLowerCase())
        )

  return (
    <div className="min-h-screen bg-gray-50" dir={dir}>
      <Header />

      <main className="container mx-auto px-6 py-12">
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
          {videoCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-lg text-center hover:shadow-md transition-shadow block ${category.color}`}
            >
              <div className="font-medium text-sm">{category.name[lang]}</div>
              <div className="text-xs opacity-75 mt-1">{category.count} videos</div>
            </button>
          ))}
        </div>

        {/* Videos */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {selectedCategory
              ? videoCategories.find(c => c.id === selectedCategory)?.name[lang]
              : t.categoryTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video, index) => (
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
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {highlightMatch(video.title[lang], searchTerm)}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {highlightMatch(video.description[lang], searchTerm)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="mt-4 px-4 py-2 bg-gray-200 rounded-lg"
            >
              Show All Categories
            </button>
          )}
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
