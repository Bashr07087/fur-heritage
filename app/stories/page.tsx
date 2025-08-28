import { Header } from "@/components/header"
import { BookOpen, Clock, Users, Star, Volume2 } from "lucide-react"

export default function StoriesPage() {
  const storyCategories = [
    { name: "Folk Tales", count: 28, icon: "🏛️" },
    { name: "Legends", count: 15, icon: "⚔️" },
    { name: "Moral Stories", count: 22, icon: "💡" },
    { name: "Animal Tales", count: 18, icon: "🦁" },
    { name: "Historical", count: 12, icon: "📜" },
    { name: "Children's", count: 35, icon: "👶" },
  ]

  const featuredStories = [
    {
      title: "حكاية الأسد والغزال",
      titleEnglish: "The Lion and the Gazelle",
      category: "Animal Tales",
      readingTime: "8 min",
      difficulty: "Beginner",
      rating: 4.8,
      summary:
        "A wise gazelle outsmarts a proud lion through cleverness and humility, teaching the importance of wisdom over strength.",
      moralLesson: "Intelligence and humility triumph over pride and brute force",
      culturalContext:
        "This story reflects the Fur people's respect for wisdom and the belief that even the smallest can overcome the mightiest through cleverness.",
    },
    {
      title: "أسطورة جبل مرة",
      titleEnglish: "The Legend of Jebel Marra",
      category: "Legends",
      readingTime: "15 min",
      difficulty: "Intermediate",
      rating: 4.9,
      summary:
        "The origin story of the sacred Jebel Marra mountain and how it became the spiritual center of the Fur people.",
      moralLesson: "Respect for nature and ancestral wisdom",
      culturalContext:
        "Jebel Marra is considered sacred by the Fur people, and this legend explains its spiritual significance in their culture.",
    },
    {
      title: "الراعي الصغير والذئب",
      titleEnglish: "The Little Shepherd and the Wolf",
      category: "Moral Stories",
      readingTime: "6 min",
      difficulty: "Beginner",
      rating: 4.7,
      summary:
        "A young shepherd learns the importance of honesty when his lies about wolves put his flock in real danger.",
      moralLesson: "Honesty and trustworthiness are essential virtues",
      culturalContext:
        "Reflects the pastoral lifestyle of the Fur people and the importance of trust within the community.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Folk Tales & Stories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the rich storytelling tradition of the Fur people through ancient folk tales, legends, and moral
            stories that have been passed down through generations.
          </p>
        </div>

        {/* Story Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {storyCategories.map((category, index) => (
            <button
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow text-center"
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="font-medium text-gray-900 text-sm">{category.name}</div>
              <div className="text-xs text-gray-500">{category.count} stories</div>
            </button>
          ))}
        </div>

        {/* Featured Stories */}
        <div className="space-y-8">
          {featuredStories.map((story, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{story.title}</h2>
                    <p className="text-lg text-gray-600 mb-4">{story.titleEnglish}</p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {story.category}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {story.readingTime}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          story.difficulty === "Beginner"
                            ? "bg-green-100 text-green-700"
                            : story.difficulty === "Intermediate"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {story.difficulty}
                      </span>
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        {story.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-teal-700">
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="md:col-span-2">
                    <h3 className="font-semibold text-gray-900 mb-3">Story Summary</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">{story.summary}</p>

                    <h3 className="font-semibold text-gray-900 mb-3">Cultural Context</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{story.culturalContext}</p>
                  </div>

                  <div>
                    <div className="bg-teal-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Moral Lesson</h4>
                      <p className="text-teal-700 text-sm font-medium">{story.moralLesson}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t">
                  <div className="flex items-center space-x-4">
                    <button className="text-teal-700 hover:text-teal-800 font-medium">Read Full Story →</button>
                    <button className="text-gray-600 hover:text-gray-800 text-sm">Listen to Audio</button>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    Read by 1,234 people
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Storytelling Tradition */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">The Art of Fur Storytelling</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Oral Tradition</h3>
              <p className="text-gray-700 mb-4">
                Stories in Fur culture are traditionally told around evening fires, during community gatherings, and as
                bedtime tales for children. The storyteller, known as "hakawati," holds a respected position in the
                community.
              </p>

              <h3 className="font-semibold text-gray-900 mb-3">Educational Purpose</h3>
              <p className="text-gray-700">
                Beyond entertainment, these stories serve as vehicles for teaching moral values, cultural norms, and
                practical wisdom. They help preserve historical events and cultural practices for future generations.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Common Themes</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Wisdom triumphing over strength
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Respect for elders and ancestors
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Harmony between humans and nature
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Community cooperation and solidarity
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Justice and moral righteousness
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
