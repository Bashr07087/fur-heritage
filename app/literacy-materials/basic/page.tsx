import { Header } from "@/components/header"
import { ChevronRight, Volume2, Download, CheckCircle } from "lucide-react"

export default function BasicLiteracyPage() {
  const alphabetLetters = [
    { letter: "ا", name: "Alif", sound: "/a/" },
    { letter: "ب", name: "Ba", sound: "/b/" },
    { letter: "ت", name: "Ta", sound: "/t/" },
    { letter: "ث", name: "Tha", sound: "/θ/" },
    { letter: "ج", name: "Jim", sound: "/dʒ/" },
    { letter: "ح", name: "Ha", sound: "/ħ/" },
    { letter: "خ", name: "Kha", sound: "/x/" },
    { letter: "د", name: "Dal", sound: "/d/" },
    { letter: "ذ", name: "Dhal", sound: "/ð/" },
    { letter: "ر", name: "Ra", sound: "/r/" },
    { letter: "ز", name: "Zay", sound: "/z/" },
    { letter: "س", name: "Sin", sound: "/s/" },
    { letter: "ش", name: "Shin", sound: "/ʃ/" },
    { letter: "ص", name: "Sad", sound: "/sˤ/" },
    { letter: "ض", name: "Dad", sound: "/dˤ/" },
    { letter: "ط", name: "Ta", sound: "/tˤ/" },
    { letter: "ظ", name: "Za", sound: "/ðˤ/" },
    { letter: "ع", name: "Ain", sound: "/ʕ/" },
    { letter: "غ", name: "Ghain", sound: "/ɣ/" },
    { letter: "ف", name: "Fa", sound: "/f/" },
    { letter: "ق", name: "Qaf", sound: "/q/" },
    { letter: "ك", name: "Kaf", sound: "/k/" },
    { letter: "ل", name: "Lam", sound: "/l/" },
    { letter: "م", name: "Mim", sound: "/m/" },
    { letter: "ن", name: "Nun", sound: "/n/" },
    { letter: "ه", name: "Ha", sound: "/h/" },
    { letter: "و", name: "Waw", sound: "/w/" },
    { letter: "ي", name: "Ya", sound: "/j/" },
  ]

  const basicWords = [
    { fur: "سلام", english: "Peace/Hello", pronunciation: "salaam" },
    { fur: "شكرا", english: "Thank you", pronunciation: "shukran" },
    { fur: "نعم", english: "Yes", pronunciation: "naam" },
    { fur: "لا", english: "No", pronunciation: "laa" },
    { fur: "ماء", english: "Water", pronunciation: "maa" },
    { fur: "خبز", english: "Bread", pronunciation: "khubz" },
    { fur: "بيت", english: "House", pronunciation: "bayt" },
    { fur: "أم", english: "Mother", pronunciation: "umm" },
    { fur: "أب", english: "Father", pronunciation: "ab" },
    { fur: "ولد", english: "Boy/Child", pronunciation: "walad" },
    { fur: "بنت", english: "Girl", pronunciation: "bint" },
    { fur: "كتاب", english: "Book", pronunciation: "kitaab" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-8">
          <span>Literacy Materials</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-teal-700 font-medium">Basic Literacy</span>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Basic Literacy Materials</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start your journey with the Fur language alphabet, basic vocabulary, and fundamental reading skills.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Your Progress</h2>
            <span className="text-sm text-gray-600">3 of 25 lessons completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-teal-700 h-2 rounded-full" style={{ width: "12%" }}></div>
          </div>
        </div>

        {/* Fur Alphabet Section */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Fur Alphabet</h2>
            <button className="flex items-center text-teal-700 hover:text-teal-800">
              <Download className="w-4 h-4 mr-2" />
              Download Chart
            </button>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-7 lg:grid-cols-14 gap-4 mb-6">
            {alphabetLetters.map((item, index) => (
              <div key={index} className="text-center p-3 border rounded-lg hover:bg-teal-50 cursor-pointer group">
                <div className="text-2xl font-bold text-gray-900 mb-1">{item.letter}</div>
                <div className="text-xs text-gray-600 mb-1">{item.name}</div>
                <div className="text-xs text-teal-700">{item.sound}</div>
                <button className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Volume2 className="w-3 h-3 text-teal-700" />
                </button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-teal-700 text-white px-6 py-2 rounded-lg hover:bg-teal-800 transition-colors">
              Practice Alphabet
            </button>
          </div>
        </div>

        {/* Basic Vocabulary */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Essential Vocabulary</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {basicWords.map((word, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-gray-900">{word.fur}</span>
                  <button className="text-teal-700 hover:text-teal-800">
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-lg text-gray-700 mb-1">{word.english}</div>
                <div className="text-sm text-gray-500 italic">/{word.pronunciation}/</div>
              </div>
            ))}
          </div>
        </div>

        {/* Lesson Modules */}
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Modules</h2>

          <div className="space-y-4">
            <div className="flex items-center p-4 border rounded-lg bg-green-50 border-green-200">
              <CheckCircle className="w-6 h-6 text-green-600 mr-4" />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Module 1: Alphabet Recognition</h4>
                <p className="text-sm text-gray-600">Learn to identify and pronounce all Fur letters</p>
              </div>
              <span className="text-sm text-green-600 font-medium">Completed</span>
            </div>

            <div className="flex items-center p-4 border rounded-lg bg-green-50 border-green-200">
              <CheckCircle className="w-6 h-6 text-green-600 mr-4" />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Module 2: Basic Sounds</h4>
                <p className="text-sm text-gray-600">Practice letter sounds and combinations</p>
              </div>
              <span className="text-sm text-green-600 font-medium">Completed</span>
            </div>

            <div className="flex items-center p-4 border rounded-lg bg-blue-50 border-blue-200">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Module 3: First Words</h4>
                <p className="text-sm text-gray-600">Learn your first 20 Fur words</p>
              </div>
              <button className="text-blue-600 font-medium hover:underline">Continue →</button>
            </div>

            <div className="flex items-center p-4 border rounded-lg">
              <div className="w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">
                4
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Module 4: Simple Sentences</h4>
                <p className="text-sm text-gray-600">Construct basic sentences in Fur</p>
              </div>
              <span className="text-sm text-gray-400">Locked</span>
            </div>

            <div className="flex items-center p-4 border rounded-lg">
              <div className="w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">
                5
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Module 5: Reading Practice</h4>
                <p className="text-sm text-gray-600">Read simple texts and stories</p>
              </div>
              <span className="text-sm text-gray-400">Locked</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
