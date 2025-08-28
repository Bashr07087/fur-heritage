import { Header } from "@/components/header"
import { Heart, Download, Search, Filter, Users, Shield } from "lucide-react"

export default function HealthCardsPage() {
  const healthCategories = [
    { name: "Maternal Health", count: 15, icon: "👶", color: "bg-pink-100 text-pink-700" },
    { name: "Child Care", count: 22, icon: "🧒", color: "bg-blue-100 text-blue-700" },
    { name: "Nutrition", count: 18, icon: "🥗", color: "bg-green-100 text-green-700" },
    { name: "Disease Prevention", count: 25, icon: "🛡️", color: "bg-red-100 text-red-700" },
    { name: "Mental Health", count: 12, icon: "🧠", color: "bg-purple-100 text-purple-700" },
    { name: "First Aid", count: 20, icon: "🏥", color: "bg-orange-100 text-orange-700" },
  ]

  const healthCards = [
    {
      title: "الرضاعة الطبيعية",
      titleEnglish: "Breastfeeding",
      category: "Maternal Health",
      description: "Essential information about breastfeeding benefits and proper techniques",
      keyPoints: [
        "Breastfeed within the first hour after birth",
        "Exclusive breastfeeding for the first 6 months",
        "Continue breastfeeding up to 2 years or beyond",
        "Proper positioning and attachment techniques",
      ],
      furTranslation: [
        "أرضعي طفلك في الساعة الأولى بعد الولادة",
        "الرضاعة الطبيعية فقط لأول ستة أشهر",
        "استمري في الرضاعة حتى سنتين أو أكثر",
        "تعلمي الوضعية الصحيحة للرضاعة",
      ],
      targetAudience: "New mothers and pregnant women",
      downloads: 1250,
    },
    {
      title: "التطعيمات الأساسية",
      titleEnglish: "Essential Vaccinations",
      category: "Child Care",
      description: "Complete vaccination schedule and importance for child health",
      keyPoints: [
        "Follow the national vaccination schedule",
        "Keep vaccination records safe",
        "Vaccinations prevent serious diseases",
        "Consult healthcare providers for missed vaccines",
      ],
      furTranslation: [
        "اتبعي جدول التطعيمات الوطني",
        "احتفظي بسجل التطعيمات بأمان",
        "التطعيمات تمنع الأمراض الخطيرة",
        "استشيري الطبيب عند فوات أي تطعيم",
      ],
      targetAudience: "Parents and caregivers",
      downloads: 980,
    },
    {
      title: "التغذية المتوازنة",
      titleEnglish: "Balanced Nutrition",
      category: "Nutrition",
      description: "Guidelines for healthy eating and proper nutrition for all ages",
      keyPoints: [
        "Eat variety of foods from all food groups",
        "Include fruits and vegetables daily",
        "Drink plenty of clean water",
        "Limit sugar and processed foods",
      ],
      furTranslation: [
        "تناولوا أطعمة متنوعة من جميع المجموعات",
        "أدخلوا الفواكه والخضروات يومياً",
        "اشربوا الكثير من الماء النظيف",
        "قللوا من السكر والأطعمة المصنعة",
      ],
      targetAudience: "All community members",
      downloads: 1450,
    },
    {
      title: "الوقاية من الملاريا",
      titleEnglish: "Malaria Prevention",
      category: "Disease Prevention",
      description: "Comprehensive guide to preventing malaria transmission",
      keyPoints: [
        "Use insecticide-treated bed nets",
        "Eliminate standing water around homes",
        "Seek immediate treatment for fever",
        "Take preventive medication when recommended",
      ],
      furTranslation: [
        "استخدموا الناموسيات المعالجة بالمبيدات",
        "أزيلوا المياه الراكدة حول المنازل",
        "اطلبوا العلاج فوراً عند الحمى",
        "تناولوا الأدوية الوقائية عند النصح بها",
      ],
      targetAudience: "All community members",
      downloads: 2100,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Health Education Cards</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Essential health information and educational materials in Fur language to promote community wellness and
            health awareness.
          </p>
        </div>

        {/* Health Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {healthCategories.map((category, index) => (
            <button
              key={index}
              className={`p-4 rounded-lg text-center hover:shadow-md transition-shadow ${category.color}`}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="font-medium text-sm">{category.name}</div>
              <div className="text-xs opacity-75">{category.count} cards</div>
            </button>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search health topics..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filter by Category
            </button>
          </div>
        </div>

        {/* Health Cards */}
        <div className="space-y-8">
          {healthCards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <h2 className="text-2xl font-bold text-gray-900 mr-4">{card.title}</h2>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          card.category === "Maternal Health"
                            ? "bg-pink-100 text-pink-700"
                            : card.category === "Child Care"
                              ? "bg-blue-100 text-blue-700"
                              : card.category === "Nutrition"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                      >
                        {card.category}
                      </span>
                    </div>
                    <p className="text-lg text-gray-600 mb-2">{card.titleEnglish}</p>
                    <p className="text-gray-700 mb-4">{card.description}</p>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {card.targetAudience}
                      </span>
                      <span className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        {card.downloads} downloads
                      </span>
                    </div>
                  </div>
                  <button className="flex items-center px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-teal-700" />
                      Key Health Points
                    </h3>
                    <ul className="space-y-3">
                      {card.keyPoints.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start">
                          <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Heart className="w-5 h-5 mr-2 text-red-500" />
                      Fur Translation
                    </h3>
                    <ul className="space-y-3">
                      {card.furTranslation.map((translation, translationIndex) => (
                        <li key={translationIndex} className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700 font-medium" dir="rtl">
                            {translation}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-between">
                    <button className="text-teal-700 hover:text-teal-800 font-medium">View Full Health Card →</button>
                    <div className="flex items-center space-x-4">
                      <button className="text-gray-600 hover:text-gray-800 text-sm">Print Version</button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm">Share with Community</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Health Education Impact */}
        <div className="bg-teal-50 rounded-lg p-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Health Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-700 mb-2">15,000+</div>
              <div className="text-gray-600">Cards Downloaded</div>
              <p className="text-sm text-gray-500 mt-2">Health materials distributed to communities</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-700 mb-2">250+</div>
              <div className="text-gray-600">Health Workers Trained</div>
              <p className="text-sm text-gray-500 mt-2">Community health educators using materials</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-700 mb-2">85%</div>
              <div className="text-gray-600">Improved Awareness</div>
              <p className="text-sm text-gray-500 mt-2">Increase in health knowledge reported</p>
            </div>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use Health Cards</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">For Community Health Workers</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Use cards during community health education sessions
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Distribute printed copies to families
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Adapt content for local context and needs
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">For Families</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Keep cards as reference materials at home
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Share information with neighbors and relatives
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Follow up with healthcare providers when needed
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
