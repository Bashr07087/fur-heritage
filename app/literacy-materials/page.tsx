import { Header } from "@/components/header"
import { BookOpen, Video, FileText, Users, Download, Play, Music } from "lucide-react"
import Link from "next/link"

export default function LiteracyMaterialsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Literacy Materials</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive learning resources to help you master reading and writing in Fur language. Start with basic
            materials and progress through advanced lessons.
          </p>
        </div>

        {/* Main Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link href="/literacy-materials/basic" className="group">
            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-all group-hover:border-teal-300">
              <BookOpen className="w-12 h-12 text-teal-700 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Basic Literacy</h3>
              <p className="text-gray-600 text-sm mb-4">
                Start here with alphabet, basic words, and fundamental reading skills.
              </p>
              <div className="text-teal-700 text-sm font-medium">25 Lessons Available →</div>
            </div>
          </Link>

          <Link href="/literacy-materials/videos" className="group">
            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-all group-hover:border-teal-300">
              <Video className="w-12 h-12 text-teal-700 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Video Lessons</h3>
              <p className="text-gray-600 text-sm mb-4">
                Interactive video content with native speakers and pronunciation guides.
              </p>
              <div className="text-teal-700 text-sm font-medium">18 Videos Available →</div>
            </div>
          </Link>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <FileText className="w-12 h-12 text-teal-700 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Worksheets</h3>
            <p className="text-gray-600 text-sm mb-4">
              Printable practice sheets for writing and reading comprehension.
            </p>
            <div className="text-teal-700 text-sm font-medium">12 Worksheets Available</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <Users className="w-12 h-12 text-teal-700 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Group Activities</h3>
            <p className="text-gray-600 text-sm mb-4">
              Collaborative learning exercises for classrooms and study groups.
            </p>
            <div className="text-teal-700 text-sm font-medium">8 Activities Available</div>
          </div>
        </div>

        {/* Cultural Materials */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="flex items-center mb-6">
            <Music className="w-8 h-8 text-teal-700 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Cultural Materials & Songs</h2>
          </div>

          <div className="bg-teal-50 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Miríŋgila'ŋ Dombore</h3>
                <h4 className="text-lg text-teal-700 mb-3">Songs of the Classroom</h4>
                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  <p>
                    <span className="font-medium">Language:</span> Fur
                  </p>
                  <p>
                    <span className="font-medium">Type:</span> Song book
                  </p>
                  <p>
                    <span className="font-medium">Edition:</span> Second Edition
                  </p>
                  <p>
                    <span className="font-medium">Published:</span> May 2017, Juba, South Sudan
                  </p>
                </div>
                <p className="text-gray-700 mb-4">
                  A comprehensive collection of traditional and educational songs in the Fur language, designed for
                  classroom use and cultural preservation. Perfect for learning pronunciation, rhythm, and cultural
                  context through music.
                </p>
              </div>
              <div className="ml-6 flex flex-col space-y-2">
                <button className="flex items-center bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-800 transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </button>
                <button className="flex items-center border border-teal-700 text-teal-700 px-4 py-2 rounded-lg hover:bg-teal-50 transition-colors">
                  <Play className="w-4 h-4 mr-2" />
                  Audio Samples
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Lessons */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Lessons</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-teal-700 font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900">Fur Alphabet</h4>
              </div>
              <p className="text-gray-600 text-sm mb-3">Learn the 28 letters of the Fur alphabet with pronunciation.</p>
              <button className="text-teal-700 text-sm font-medium hover:underline">Start Lesson →</button>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-teal-700 font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900">Basic Greetings</h4>
              </div>
              <p className="text-gray-600 text-sm mb-3">Common greetings and polite expressions in Fur language.</p>
              <button className="text-teal-700 text-sm font-medium hover:underline">Start Lesson →</button>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-teal-700 font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900">Family Words</h4>
              </div>
              <p className="text-gray-600 text-sm mb-3">Essential vocabulary for family members and relationships.</p>
              <button className="text-teal-700 text-sm font-medium hover:underline">Start Lesson →</button>
            </div>
          </div>
        </div>

        {/* Quick Access Downloads */}
        <div className="bg-teal-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Downloads</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between bg-white p-4 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Fur Alphabet Chart</h4>
                <p className="text-sm text-gray-600">Printable reference chart</p>
              </div>
              <button className="flex items-center text-teal-700 hover:text-teal-800">
                <Download className="w-4 h-4 mr-1" />
                PDF
              </button>
            </div>

            <div className="flex items-center justify-between bg-white p-4 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Basic Vocabulary List</h4>
                <p className="text-sm text-gray-600">100 essential words</p>
              </div>
              <button className="flex items-center text-teal-700 hover:text-teal-800">
                <Download className="w-4 h-4 mr-1" />
                PDF
              </button>
            </div>

            <div className="flex items-center justify-between bg-white p-4 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Writing Practice Sheets</h4>
                <p className="text-sm text-gray-600">Letter formation practice</p>
              </div>
              <button className="flex items-center text-teal-700 hover:text-teal-800">
                <Download className="w-4 h-4 mr-1" />
                PDF
              </button>
            </div>

            <div className="flex items-center justify-between bg-white p-4 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Pronunciation Guide</h4>
                <p className="text-sm text-gray-600">Audio pronunciation reference</p>
              </div>
              <button className="flex items-center text-teal-700 hover:text-teal-800">
                <Play className="w-4 h-4 mr-1" />
                Audio
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
