import { Header } from "@/components/header"
import { Users, Globe, FileText, Download, ChevronDown } from "lucide-react"

export default function LinguisticPage() {
  const grammarTopics = [
    {
      title: "Phonology",
      description: "Sound system and pronunciation patterns",
      content: [
        "28 consonants and 8 vowels",
        "Emphasis on pharyngeal and uvular sounds",
        "Vowel harmony in certain contexts",
        "Stress patterns typically on penultimate syllable",
      ],
    },
    {
      title: "Morphology",
      description: "Word formation and structure",
      content: [
        "Root-and-pattern system similar to Semitic languages",
        "Extensive use of prefixes and suffixes",
        "Plural formation through internal vowel changes",
        "Diminutive and augmentative forms",
      ],
    },
    {
      title: "Syntax",
      description: "Sentence structure and word order",
      content: [
        "Verb-Subject-Object (VSO) basic word order",
        "Flexible word order for emphasis",
        "Definite article system",
        "Complex system of verbal conjugation",
      ],
    },
    {
      title: "Semantics",
      description: "Meaning and vocabulary patterns",
      content: [
        "Rich vocabulary for pastoral and agricultural life",
        "Extensive kinship terminology",
        "Color terms following universal patterns",
        "Metaphorical expressions rooted in nature",
      ],
    },
  ]

  const languageFeatures = [
    {
      feature: "Language Family",
      description: "Nilo-Saharan, Eastern Sudanic branch",
    },
    {
      feature: "Speakers",
      description: "Approximately 1.3 million native speakers",
    },
    {
      feature: "Geographic Distribution",
      description: "Primarily in Darfur region of Sudan, with communities in Chad",
    },
    {
      feature: "Writing System",
      description: "Arabic script adaptation with additional diacritics",
    },
    {
      feature: "Official Status",
      description: "Regional language in Sudan, used in education and media",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Linguistic Resources</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive linguistic analysis, grammar guides, and academic resources for understanding the structure
            and features of the Fur language.
          </p>
        </div>

        {/* Language Overview */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Language Overview</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
              <ul className="space-y-3">
                {languageFeatures.map((item, index) => (
                  <li key={index} className="flex">
                    <span className="font-medium text-gray-900 w-32 flex-shrink-0">{item.feature}:</span>
                    <span className="text-gray-600">{item.description}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Classification</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Phylum:</span> Nilo-Saharan
                  </div>
                  <div className="ml-4">
                    <span className="font-medium">Family:</span> Eastern Sudanic
                  </div>
                  <div className="ml-8">
                    <span className="font-medium">Branch:</span> Fur
                  </div>
                  <div className="ml-12">
                    <span className="font-medium">Language:</span> Fur (Fòòr tì)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grammar Topics */}
        <div className="space-y-6 mb-8">
          {grammarTopics.map((topic, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{topic.title}</h3>
                    <p className="text-gray-600 mt-1">{topic.description}</p>
                  </div>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-2">
                  {topic.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Academic Resources */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Academic Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Research Papers</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-teal-700 pl-4">
                  <h4 className="font-medium text-gray-900">Phonological Analysis of Fur Language</h4>
                  <p className="text-sm text-gray-600">Dr. Ahmed Hassan, 2023</p>
                  <button className="text-teal-700 text-sm hover:underline">Download PDF</button>
                </div>
                <div className="border-l-4 border-teal-700 pl-4">
                  <h4 className="font-medium text-gray-900">Verbal System in Fur: A Morphological Study</h4>
                  <p className="text-sm text-gray-600">Prof. Sarah Ibrahim, 2022</p>
                  <button className="text-teal-700 text-sm hover:underline">Download PDF</button>
                </div>
                <div className="border-l-4 border-teal-700 pl-4">
                  <h4 className="font-medium text-gray-900">Sociolinguistic Survey of Fur Communities</h4>
                  <p className="text-sm text-gray-600">Dr. Mohamed Ali, 2021</p>
                  <button className="text-teal-700 text-sm hover:underline">Download PDF</button>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Grammar Guides</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Complete Grammar Reference</h4>
                    <p className="text-sm text-gray-600">Comprehensive 200-page guide</p>
                  </div>
                  <button className="flex items-center text-teal-700 hover:text-teal-800">
                    <Download className="w-4 h-4 mr-1" />
                    PDF
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Quick Reference Card</h4>
                    <p className="text-sm text-gray-600">Essential grammar rules</p>
                  </div>
                  <button className="flex items-center text-teal-700 hover:text-teal-800">
                    <Download className="w-4 h-4 mr-1" />
                    PDF
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Verb Conjugation Tables</h4>
                    <p className="text-sm text-gray-600">Complete verb forms</p>
                  </div>
                  <button className="flex items-center text-teal-700 hover:text-teal-800">
                    <Download className="w-4 h-4 mr-1" />
                    PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Language Comparison */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Comparative Linguistics</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Feature</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Fur</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Arabic</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">English</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Word Order</td>
                  <td className="py-3 px-4">VSO</td>
                  <td className="py-3 px-4">VSO</td>
                  <td className="py-3 px-4">SVO</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Definite Article</td>
                  <td className="py-3 px-4">Suffix -i</td>
                  <td className="py-3 px-4">Prefix al-</td>
                  <td className="py-3 px-4">the</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Plural Formation</td>
                  <td className="py-3 px-4">Suffix + vowel change</td>
                  <td className="py-3 px-4">Root pattern change</td>
                  <td className="py-3 px-4">Suffix -s/-es</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Gender System</td>
                  <td className="py-3 px-4">Masculine/Feminine</td>
                  <td className="py-3 px-4">Masculine/Feminine</td>
                  <td className="py-3 px-4">None</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Research Opportunities */}
        <div className="bg-teal-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Research Opportunities</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Users className="w-12 h-12 text-teal-700 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Community Studies</h3>
              <p className="text-gray-600 text-sm">
                Sociolinguistic research on language use and preservation in Fur communities
              </p>
            </div>
            <div className="text-center">
              <Globe className="w-12 h-12 text-teal-700 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Dialectology</h3>
              <p className="text-gray-600 text-sm">
                Mapping regional variations and dialectal differences across Fur-speaking areas
              </p>
            </div>
            <div className="text-center">
              <FileText className="w-12 h-12 text-teal-700 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
              <p className="text-gray-600 text-sm">
                Ongoing efforts to document oral traditions, stories, and cultural expressions
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
