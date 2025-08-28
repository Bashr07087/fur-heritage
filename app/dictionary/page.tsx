import { Header } from "@/components/header"
import { Search, Volume2, Filter, Star } from "lucide-react"

export default function DictionaryPage() {
  const dictionaryEntries = [
    {
      fur: "سلام",
      english: "Peace, Hello, Greeting",
      pronunciation: "salaam",
      partOfSpeech: "noun/interjection",
      definition: "A common greeting used throughout the day, literally meaning 'peace'",
      examples: ["سلام عليكم - Peace be upon you", "سلام يا أخي - Hello, my brother"],
      related: ["تحية", "أهلا"],
    },
    {
      fur: "ماء",
      english: "Water",
      pronunciation: "maa",
      partOfSpeech: "noun",
      definition: "The clear liquid essential for life",
      examples: ["الماء بارد - The water is cold", "أريد ماء - I want water"],
      related: ["نهر", "بحر"],
    },
    {
      fur: "بيت",
      english: "House, Home",
      pronunciation: "bayt",
      partOfSpeech: "noun",
      definition: "A dwelling place where people live",
      examples: ["بيتي كبير - My house is big", "في البيت - At home"],
      related: ["منزل", "دار"],
    },
    {
      fur: "كتاب",
      english: "Book",
      pronunciation: "kitaab",
      partOfSpeech: "noun",
      definition: "A written or printed work consisting of pages",
      examples: ["كتاب جميل - A beautiful book", "أقرأ الكتاب - I read the book"],
      related: ["قراءة", "مكتبة"],
    },
    {
      fur: "أكل",
      english: "Food, To eat",
      pronunciation: "akl",
      partOfSpeech: "noun/verb",
      definition: "Nourishment; the action of consuming food",
      examples: ["الأكل لذيذ - The food is delicious", "أريد أن آكل - I want to eat"],
      related: ["طعام", "شرب"],
    },
    {
      fur: "شمس",
      english: "Sun",
      pronunciation: "shams",
      partOfSpeech: "noun",
      definition: "The star that provides light and heat to Earth",
      examples: ["الشمس مشرقة - The sun is shining", "تحت الشمس - Under the sun"],
      related: ["نور", "نهار"],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Fur-English Dictionary</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive dictionary with over 5,000 Fur words, definitions, pronunciations, and usage examples.
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search in Fur or English..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center justify-center space-x-4 text-sm">
              <button className="flex items-center text-teal-700 hover:text-teal-800">
                <Filter className="w-4 h-4 mr-1" />
                Advanced Search
              </button>
              <span className="text-gray-300">|</span>
              <button className="text-gray-600 hover:text-gray-800">Browse by Category</button>
              <span className="text-gray-300">|</span>
              <button className="text-gray-600 hover:text-gray-800">Random Word</button>
            </div>
          </div>
        </div>

        {/* Quick Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {["Family", "Food", "Nature", "Body", "Colors", "Numbers"].map((category) => (
            <button
              key={category}
              className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow text-center"
            >
              <div className="font-medium text-gray-900">{category}</div>
              <div className="text-sm text-gray-500 mt-1">120+ words</div>
            </button>
          ))}
        </div>

        {/* Dictionary Entries */}
        <div className="space-y-6">
          {dictionaryEntries.map((entry, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-3xl font-bold text-gray-900 mr-4">{entry.fur}</h3>
                    <button className="text-teal-700 hover:text-teal-800">
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="text-lg text-gray-700 font-medium">{entry.english}</span>
                    <span className="text-sm text-gray-500 italic">/{entry.pronunciation}/</span>
                    <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full">
                      {entry.partOfSpeech}
                    </span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-yellow-500">
                  <Star className="w-5 h-5" />
                </button>
              </div>

              <p className="text-gray-600 mb-4">{entry.definition}</p>

              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Examples:</h4>
                <ul className="space-y-1">
                  {entry.examples.map((example, exampleIndex) => (
                    <li key={exampleIndex} className="text-gray-600 text-sm flex items-center">
                      <span className="w-2 h-2 bg-teal-700 rounded-full mr-3"></span>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Related Words:</h4>
                <div className="flex flex-wrap gap-2">
                  {entry.related.map((word, wordIndex) => (
                    <button
                      key={wordIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dictionary Stats */}
        <div className="bg-teal-50 rounded-lg p-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Dictionary Statistics</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-teal-700">5,247</div>
              <div className="text-gray-600">Total Words</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-700">1,832</div>
              <div className="text-gray-600">With Audio</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-700">3,456</div>
              <div className="text-gray-600">With Examples</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-700">24</div>
              <div className="text-gray-600">Categories</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
