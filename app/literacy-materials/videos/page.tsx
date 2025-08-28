import { Header } from "@/components/header"
import { ChevronRight, Play, Clock, Users, Star } from "lucide-react"

export default function VideoLessonsPage() {
  const videoCategories = [
    {
      title: "Pronunciation Basics",
      count: 10,
      description: "Master the sounds of Fur language",
      videos: [
        {
          title: "Fur Alphabet Pronunciation",
          duration: "12:34",
          level: "Beginner",
          rating: 4.8,
          url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Alphabets_prounciation-Xqzw0VGwNQN9XTxkDMU8IznMYt7jSp.mp4",
        },
        {
          title: "Alphabet Practice Session",
          duration: "15:20",
          level: "Beginner",
          rating: 4.9,
          url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Alphabets_practice-0WWFFPfNNUJXkxlfZBPqLVinhejzkY.mp4",
        },
        { title: "Vowel Sounds in Fur", duration: "8:45", level: "Beginner", rating: 4.9 },
        { title: "Consonant Combinations", duration: "15:20", level: "Intermediate", rating: 4.7 },
      ],
    },
    {
      title: "Reading Practice",
      count: 8,
      description: "Develop reading skills with guided practice",
      videos: [
        {
          title: "Reading Practice - Session 1",
          duration: "18:30",
          level: "Beginner",
          rating: 4.8,
          url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/reading1-52zZWrlPtdy9JgHqj2tsMoYzDnWk2j.mp4",
        },
        {
          title: "Reading Practice - Session 2",
          duration: "22:15",
          level: "Intermediate",
          rating: 4.7,
          url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/reading2-5ARKxw8ppRmBqveBfeA40aCJYj9bRS.mp4",
        },
        { title: "Greetings and Introductions", duration: "10:15", level: "Beginner", rating: 4.9 },
        { title: "Family Conversations", duration: "14:30", level: "Beginner", rating: 4.8 },
      ],
    },
    {
      title: "Cultural Content",
      count: 5,
      description: "Learn through poetry and cultural materials",
      videos: [
        {
          title: "Classroom Poetry Session",
          duration: "16:45",
          level: "Intermediate",
          rating: 4.9,
          url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Class_poem-Wkot2VVtg7CFaBeRZoSBI8cOxilNfS.mp4",
        },
        { title: "Traditional Stories", duration: "25:30", level: "Intermediate", rating: 4.6 },
        { title: "Cultural Expressions", duration: "19:20", level: "Advanced", rating: 4.7 },
      ],
    },
    {
      title: "Health Education",
      count: 4,
      description: "Important health information in Fur language",
      videos: [
        {
          title: "COVID-19 Prevention Tips",
          duration: "12:30",
          level: "Beginner",
          rating: 4.8,
          url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/covid_tips-JL3YyXMlzqnH146nwNN05mPDcHZVTW.mp4",
        },
        {
          title: "COVID-19 Safety Guidelines",
          duration: "14:20",
          level: "Beginner",
          rating: 4.7,
          url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/covid_tips2-8f21KOrj1Z64ye5ond6fDe3nNSUY6i.mp4",
        },
        { title: "General Health Tips", duration: "18:45", level: "Beginner", rating: 4.6 },
      ],
    },
    {
      title: "Grammar Lessons",
      count: 4,
      description: "Understand Fur language structure",
      videos: [
        { title: "Sentence Structure Basics", duration: "16:20", level: "Intermediate", rating: 4.7 },
        { title: "Verb Conjugations", duration: "22:10", level: "Advanced", rating: 4.5 },
        { title: "Question Formation", duration: "13:55", level: "Intermediate", rating: 4.8 },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-8">
          <span>Literacy Materials</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-teal-700 font-medium">Video Lessons</span>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Video Lessons</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn Fur language through interactive video content featuring native speakers and structured lessons.
          </p>
        </div>

        {/* Featured Video */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-8">
          <div className="aspect-video bg-gray-900 relative">
            <video className="w-full h-full object-cover" controls poster="/fur-language-classroom-scene.png">
              <source
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Alphabets_prounciation-Xqzw0VGwNQN9XTxkDMU8IznMYt7jSp.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <div className="absolute bottom-4 left-4 text-white">
              <span className="bg-black bg-opacity-50 px-2 py-1 rounded text-sm">Featured Lesson</span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fur Alphabet Pronunciation Guide</h3>
            <p className="text-gray-600 mb-4">
              Learn the correct pronunciation of Fur alphabet letters with native speaker guidance. Essential foundation
              for reading and speaking.
            </p>
            <div className="flex items-center text-sm text-gray-500 space-x-4">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                12:34
              </span>
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                1,234 views
              </span>
              <span className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                4.8
              </span>
            </div>
          </div>
        </div>

        {/* Video Categories */}
        {videoCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                <p className="text-gray-600">{category.description}</p>
              </div>
              <span className="text-sm text-gray-500">{category.count} videos</span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.videos.map((video, videoIndex) => (
                <div key={videoIndex} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-200 relative">
                    {video.url ? (
                      <video
                        className="w-full h-full object-cover"
                        controls
                        poster={`/placeholder.svg?height=200&width=300&query=${video.title}`}
                      >
                        <source src={video.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all">
                            <Play className="w-5 h-5 text-teal-700 ml-0.5" />
                          </button>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{video.title}</h4>
                    <div className="flex items-center justify-between text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          video.level === "Beginner"
                            ? "bg-green-100 text-green-700"
                            : video.level === "Intermediate"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {video.level}
                      </span>
                      <div className="flex items-center text-gray-500">
                        <Star className="w-3 h-3 mr-1 text-yellow-500" />
                        {video.rating}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Learning Path */}
        <div className="bg-teal-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Learning Path</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-teal-700 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">
                1
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Start with Pronunciation Basics</h4>
                <p className="text-sm text-gray-600">Master the sounds before moving to words</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-teal-700 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">
                2
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Learn Basic Conversations</h4>
                <p className="text-sm text-gray-600">Practice everyday dialogue and common phrases</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-teal-700 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">
                3
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Study Grammar Structure</h4>
                <p className="text-sm text-gray-600">Understand how sentences are formed</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
