import { Header } from "@/components/header"
import { Volume2, Heart, Share, Filter } from "lucide-react"

export default function PoemsPage() {
  const poemCategories = [
    { name: "Traditional", count: 45, color: "bg-blue-100 text-blue-700" },
    { name: "Love Songs", count: 32, color: "bg-red-100 text-red-700" },
    { name: "Praise", count: 28, color: "bg-green-100 text-green-700" },
    { name: "Lullabies", count: 18, color: "bg-purple-100 text-purple-700" },
    { name: "Work Songs", count: 22, color: "bg-yellow-100 text-yellow-700" },
    { name: "Ceremonial", count: 15, color: "bg-teal-100 text-teal-700" },
  ]

  const featuredPoems = [
    {
      title: "أغنية الصباح",
      titleEnglish: "Morning Song",
      category: "Traditional",
      author: "Traditional Folk",
      furText: ["الشمس تشرق في السماء", "والطيور تغني بفرح", "يا أرض الفور الجميلة", "صباح الخير يا وطني"],
      englishTranslation: [
        "The sun rises in the sky",
        "And birds sing with joy",
        "O beautiful land of Fur",
        "Good morning, my homeland",
      ],
      theme: "Nature and homeland",
      likes: 156,
    },
    {
      title: "حكاية الجدة",
      titleEnglish: "Grandmother's Tale",
      category: "Lullabies",
      author: "Fatima Al-Fur",
      furText: ["نام يا حبيبي نام", "والقمر يحرس أحلامك", "جدتك تحكي لك الحكايات", "عن أبطال الفور العظام"],
      englishTranslation: [
        "Sleep my dear, sleep",
        "The moon guards your dreams",
        "Your grandmother tells you stories",
        "Of the great Fur heroes",
      ],
      theme: "Family and tradition",
      likes: 203,
    },
    {
      title: "أغنية الحصاد",
      titleEnglish: "Harvest Song",
      category: "Work Songs",
      author: "Traditional Folk",
      furText: ["نحصد القمح بأيدينا", "والأرض تعطي خيرها", "نشكر الله على النعمة", "ونفرح بثمار عملنا"],
      englishTranslation: [
        "We harvest wheat with our hands",
        "The earth gives its bounty",
        "We thank God for the blessing",
        "And rejoice in the fruits of our labor",
      ],
      theme: "Work and gratitude",
      likes: 89,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Fur Poetry Collection</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the rich poetic tradition of the Fur people through traditional songs, verses, and contemporary
            works that celebrate culture, nature, and community.
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {poemCategories.map((category, index) => (
            <button
              key={index}
              className={`p-4 rounded-lg text-center hover:shadow-md transition-shadow ${category.color}`}
            >
              <div className="font-semibold">{category.name}</div>
              <div className="text-sm opacity-75">{category.count} poems</div>
            </button>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search poems by title, theme, or author..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
        </div>

        {/* Featured Poems */}
        <div className="space-y-8">
          {featuredPoems.map((poem, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{poem.title}</h2>
                    <p className="text-lg text-gray-600 mb-2">{poem.titleEnglish}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>By {poem.author}</span>
                      <span>•</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          poem.category === "Traditional"
                            ? "bg-blue-100 text-blue-700"
                            : poem.category === "Lullabies"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {poem.category}
                      </span>
                      <span>•</span>
                      <span>{poem.theme}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-teal-700">
                      <Volume2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Share className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="w-3 h-3 bg-teal-700 rounded-full mr-2"></span>
                      Original Fur Text
                    </h3>
                    <div className="space-y-2 text-lg leading-relaxed">
                      {poem.furText.map((line, lineIndex) => (
                        <p key={lineIndex} className="text-gray-800 font-medium text-right" dir="rtl">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
                      English Translation
                    </h3>
                    <div className="space-y-2 text-lg leading-relaxed">
                      {poem.englishTranslation.map((line, lineIndex) => (
                        <p key={lineIndex} className="text-gray-600 italic">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Heart className="w-4 h-4 mr-1" />
                    {poem.likes} likes
                  </div>
                  <button className="text-teal-700 hover:text-teal-800 font-medium">Read More Poems Like This →</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cultural Context */}
        <div className="bg-teal-50 rounded-lg p-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About Fur Poetry</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Oral Tradition</h3>
              <p className="text-gray-700 mb-4">
                Fur poetry has been passed down through generations as part of a rich oral tradition. These poems were
                traditionally sung during ceremonies, work, and daily life, serving both as entertainment and as a way
                to preserve cultural values and history.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Themes and Styles</h3>
              <p className="text-gray-700 mb-4">
                Common themes include love for the homeland, family bonds, nature's beauty, and spiritual devotion. The
                poetry often uses metaphors drawn from pastoral life, reflecting the Fur people's deep connection to
                their land and livestock.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
