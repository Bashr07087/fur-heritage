"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Filter, Search, X } from "lucide-react"

// 🌍 Texts in three languages
const translations = {
  en: {
    pageTitle: "Audio Library",
    pageDescription:
      "Explore our collection of Fur language audio lessons, cultural songs, storytelling, and traditional music recorded by community experts.",
    searchPlaceholder: "Search audios by title, artist, or topic...",
    filter: "Filter & Sort",
    close: "✕ Close",
    categoryTitle: "All Audios",
  },
  ar: {
    pageTitle: "مكتبة الصوتيات",
    pageDescription:
      "استكشف مجموعتنا من دروس لغة الفور الصوتية، الأغاني الثقافية، القصص، والموسيقى التقليدية المسجلة من قبل خبراء المجتمع.",
    searchPlaceholder: "ابحث عن الصوتيات حسب العنوان أو الفنان أو الموضوع...",
    filter: "تصفية وفرز",
    close: "✕ إغلاق",
    categoryTitle: "جميع الصوتيات",
  },
  fur: {
    pageTitle: "Fur Kɔllɔ Audio",
    pageDescription:
      "Kaŋa fur daali audio goroŋ, muzika kɔlɔ, sega goroŋ, se kɔlɔŋa kɔmoŋda wuroŋa audio.",
    searchPlaceholder: "Kɔse audio seŋa, malimoŋa wala goroŋa...",
    filter: "Shiri & Sorta",
    close: "✕ Gudi",
    categoryTitle: "Kɔllɔ Audio",
  },
}

export default function AudiosPage() {
  const [lang, setLang] = useState<"en" | "ar" | "fur">("en")
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAudio, setSelectedAudio] = useState<{ url: string; thumbnail: string } | null>(null)

  const t = translations[lang]

  useEffect(() => {
    setDir(lang === "ar" ? "rtl" : "ltr")
  }, [lang])

  const audioCategories = [
    { id: "language", name: { en: "Language Lessons", ar: "دروس اللغة", fur: "Daali Ɛlɛŋ" }, count: 30, color: "bg-blue-100 text-blue-700" },
    { id: "songs", name: { en: "Songs", ar: "أغاني", fur: "Muzika Kɔlɔ" }, count: 25, color: "bg-purple-100 text-purple-700" },
    { id: "stories", name: { en: "Storytelling", ar: "رواية القصص", fur: "Sega Goroŋ" }, count: 20, color: "bg-yellow-100 text-yellow-700" },
    { id: "culture", name: { en: "Cultural Recordings", ar: "التسجيلات الثقافية", fur: "Kɔltura Kɔmɔŋ" }, count: 15, color: "bg-green-100 text-green-700" },
  ]

  const audiosByCategory: Record<string, any[]> = {
    language: [
      { title: { en: "Fur Alphabet Audio", ar: "حروف الفور صوتيًا", fur: "Fur Alphabeta Audio" }, description: { en: "Learn Fur alphabets by listening", ar: "تعلم الحروف الفورية بالاستماع", fur: "Kɔse Fur alphabeta audio" }, duration: "25:30", audioUrl: "audio/fur_alphabet.mp3", thumbnail: "/images/fur_alphabet.jpg" },
      { title: { en: "Fur Vocabulary Audio", ar: "مفردات الفور صوتيًا", fur: "Fur Vokabula Audio" }, description: { en: "Daily-use Fur words", ar: "كلمات الفور اليومية", fur: "Kɔse daali Fur goroŋ" }, duration: "15:10", audioUrl: "audio/fur_vocab.mp3", thumbnail: "/images/fur_vocab.jpg" },
    ],
    songs: [
      { title: { en: "Darfur Folk Song", ar: "أغنية دارفور الشعبية", fur: "Darfur Folk Sɔŋ" }, description: { en: "Traditional song from Darfur", ar: "أغنية تقليدية من دارفور", fur: "Muzika kɔlɔ Darfur" }, duration: "4:20", audioUrl: "audio/darfur_song.mp3", thumbnail: "/images/darfur_song.jpg" },
      { title: { en: "Fur Celebration Song", ar: "أغنية احتفال الفور", fur: "Fur Celebration Sɔŋ" }, description: { en: "Songs for ceremonies", ar: "أغانٍ للاحتفالات", fur: "Muzika kɔlɔ kɔmoŋda" }, duration: "5:00", audioUrl: "audio/fur_celebration.mp3", thumbnail: "/images/fur_celebration.jpg" },
    ],
    stories: [
      { title: { en: "Fur Folk Tales Audio", ar: "حكايات الفور صوتيًا", fur: "Fur Tales Audio" }, description: { en: "Stories passed through generations", ar: "قصص متوارثة", fur: "Goroŋ tales Fur" }, duration: "12:15", audioUrl: "audio/folk_tales.mp3", thumbnail: "/images/folk_tales.jpg" },
      { title: { en: "Moral Stories Audio", ar: "قصص أخلاقية صوتيًا", fur: "Moral Stories Audio" }, description: { en: "Stories with lessons", ar: "قصص تحمل دروسًا", fur: "Stories kɔse lesson" }, duration: "10:40", audioUrl: "audio/moral_stories.mp3", thumbnail: "/images/moral_stories.jpg" },
    ],
    culture: [
      { title: { en: "Cultural Heritage Audio", ar: "التراث الثقافي صوتيًا", fur: "Cultural Heritage Audio" }, description: { en: "Audio documenting Fur culture", ar: "توثيق صوتي للثقافة الفور", fur: "Kɔse Fur heritage audio" }, duration: "28:25", audioUrl: "audio/cultural_heritage.mp3", thumbnail: "/images/cultural_heritage.jpg" },
    ],
  }

  // 🌟 Search + category filter
  useEffect(() => {
    if (!searchTerm) return
    const matchedCategory = audioCategories.find(category =>
      category.name[lang].toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSelectedCategory(matchedCategory ? matchedCategory.id : null)
  }, [searchTerm, lang])

  const filteredAudios = selectedCategory
    ? audiosByCategory[selectedCategory]?.filter(audio =>
        audio.title[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
        audio.description[lang].toLowerCase().includes(searchTerm.toLowerCase())
      )
    : Object.values(audiosByCategory)
        .flat()
        .filter(audio =>
          audio.title[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
          audio.description[lang].toLowerCase().includes(searchTerm.toLowerCase())
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

        {/* Search */}
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

        {/* Audio Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {audioCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-lg text-center hover:shadow-md transition-shadow block ${category.color}`}
            >
              <div className="font-medium text-sm">{category.name[lang]}</div>
              <div className="text-xs opacity-75 mt-1">{category.count} audios</div>
            </button>
          ))}
        </div>

        {/* Audio List */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {selectedCategory
              ? audioCategories.find(c => c.id === selectedCategory)?.name[lang]
              : t.categoryTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAudios.map((audio, index) => (
              <div
                key={index}
                onClick={() => setSelectedAudio({ url: audio.audioUrl, thumbnail: audio.thumbnail })}
                className="cursor-pointer bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-video bg-gray-200 relative">
                  <img src={audio.thumbnail} alt={audio.title[lang]} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{audio.title[lang]}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{audio.description[lang]}</p>
                  <div className="text-xs text-gray-500">Duration: {audio.duration}</div>
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

        {/* Audio Modal */}
        {selectedAudio && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl overflow-hidden w-[80%] md:w-[50%] p-6 relative flex flex-col items-center gap-4">
              <img src={selectedAudio.thumbnail} alt="Audio Cover" className="w-full h-64 object-cover rounded-lg" />
              <audio controls autoPlay className="w-full">
                <source src={selectedAudio.url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <button
                onClick={() => setSelectedAudio(null)}
                className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
