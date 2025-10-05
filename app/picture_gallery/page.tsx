"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Filter, Search } from "lucide-react"

// 🌍 Texts in three languages
const translations = {
  en: {
    pageTitle: "Picture Gallery",
    pageDescription:
      "Browse our collection of Fur culture photos, traditional events, community gatherings, and educational visuals.",
    searchPlaceholder: "Search pictures by title or category...",
    filter: "Filter & Sort",
    close: "✕ Close",
    categoryTitle: "All Pictures",
  },
  ar: {
    pageTitle: "معرض الصور",
    pageDescription:
      "تصفح مجموعتنا من صور الثقافة الفور، الفعاليات التقليدية، تجمعات المجتمع، والمواد التعليمية.",
    searchPlaceholder: "ابحث عن الصور حسب العنوان أو الفئة...",
    filter: "تصفية وفرز",
    close: "✕ إغلاق",
    categoryTitle: "جميع الصور",
  },
  fur: {
    pageTitle: "Fur Kɔllɔ Picture",
    pageDescription:
      "Kɔse Fur kɔltura photos, kɔltura kɔmɔŋ, wuroŋ gatherings, se kɔltura visual goroŋ.",
    searchPlaceholder: "Kɔse picture seŋa, goroŋ wala category...",
    filter: "Shiri & Sorta",
    close: "✕ Gudi",
    categoryTitle: "Kɔllɔ Pictures",
  },
}

export default function PicturesPage() {
  const [lang, setLang] = useState<"en" | "ar" | "fur">("en")
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const t = translations[lang]

  useEffect(() => {
    setDir(lang === "ar" ? "rtl" : "ltr")
  }, [lang])

  const pictureCategories = [
    { id: "culture", name: { en: "Cultural Events", ar: "الفعاليات الثقافية", fur: "Kɔltura Kɔmɔŋ" }, count: 30, color: "bg-blue-100 text-blue-700" },
    { id: "community", name: { en: "Community Gatherings", ar: "تجمعات المجتمع", fur: "Wuroŋ Gatherings" }, count: 25, color: "bg-green-100 text-green-700" },
    { id: "nature", name: { en: "Nature & Landscapes", ar: "الطبيعة والمناظر الطبيعية", fur: "Natura & Landscapes" }, count: 20, color: "bg-purple-100 text-purple-700" },
    { id: "education", name: { en: "Educational Visuals", ar: "الصور التعليمية", fur: "Educational Visuals" }, count: 15, color: "bg-yellow-100 text-yellow-700" },
    { id: "contributors", name: { en: "Contributors", ar: "المساهمون", fur: "Contributors" }, count: 10, color: "bg-pink-100 text-pink-700" },
  ]

  const picturesByCategory: Record<string, any[]> = {
    culture: [
      { title: { en: "Darfur Festival", ar: "مهرجان دارفور", fur: "Darfur Festival" }, url: "/images/Festival.jpg" },
      { title: { en: "Traditional Costume", ar: "الزي التقليدي", fur: "Traditional Dress" }, url: "/images/costume.jpg" },
    ],
    community: [
      { title: { en: "Village Gathering", ar: "تجمع القرية", fur: "Village Gathering" }, url: "https://www.pooringbelenabulling.org/index.php/en/gallery/ww1-in-abo%EA%9E%8C%C5%8B-soom-juba-2015" },
      { title: { en: "Community Meeting", ar: "اجتماع المجتمع", fur: "Community Meeting" }, url: "/images/meeting.jpg" },
    ],
    nature: [
      { title: { en: "Darfur Landscape", ar: "منظر طبيعي في دارفور", fur: "Darfur Landscape" }, url: "/images/landscape.jpg" },
      { title: { en: "River Scene", ar: "مشهد النهر", fur: "River Scene" }, url: "/images/river.jpg" },
    ],
    education: [
      { title: { en: "Fur Alphabet Poster", ar: "ملصق حروف الفور", fur: "Fur Alphabet Poster" }, url: "/images/Alphabets.jpg" },
      { title: { en: "Learning Chart", ar: "مخطط التعلم", fur: "Learning Chart" }, url: "/images/chart.jpg" },
    ],
    contributors: [
      { title: { en: "Fur Culture Photographer", ar: "مصور ثقافة الفور", fur: "Fur Culture Photographer" }, url: "/images/contributor1.jpg" },
      { title: { en: "Community Volunteer", ar: "متطوع المجتمع", fur: "Community Volunteer" }, url: "/images/contributor2.jpg" },
    ],
  }

  const filteredPictures = selectedCategory
    ? picturesByCategory[selectedCategory]?.filter(pic =>
        pic.title[lang].toLowerCase().includes(searchTerm.toLowerCase())
      )
    : Object.values(picturesByCategory)
        .flat()
        .filter(pic => pic.title[lang].toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="min-h-screen relative overflow-hidden" dir={dir}>
      {/* Animated Shiny Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 animate-gradient-x"></div>

      <Header />

      <main className="container mx-auto px-6 py-12 relative z-10">
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

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {pictureCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-lg text-center hover:shadow-md transition-shadow block ${category.color}`}
            >
              <div className="font-medium text-sm">{category.name[lang]}</div>
              <div className="text-xs opacity-75 mt-1">{category.count} pictures</div>
            </button>
          ))}
        </div>

        {/* Pictures */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPictures.map((pic, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(pic.url)}
              className="cursor-pointer bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <img src={pic.url} alt={pic.title[lang]} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{pic.title[lang]}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-black rounded-xl overflow-hidden w-[80%] h-[80%] relative">
              <img src={selectedImage} alt="Selected" className="w-full h-full object-contain" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-lg"
              >
                {t.close}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Tailwind animation class */}
      <style jsx>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </div>
  )
}
