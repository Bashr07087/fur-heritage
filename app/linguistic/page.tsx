import { Header } from "@/components/header"
import { Download, ChevronDown } from "lucide-react"

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

  const pdfResources = [
    { title: "Phonological Analysis of Fur Language", file: "/docs/1-phonological.pdf", author: "Dr. Ahmed Hassan, 2023" },
    { title: "Árden na Rim Waar Ku̶ŋo Sabba A̲w", file: "/docs/2 Árden na Rim Waar Ku̶ŋo Sabba A̲w.pdf", author: "Prof. Sarah Ibrahim, 2022" },
    { title: "Sociolinguistic Survey of Fur Communities/2 Árdeŋ na Rim SOOR", file: "/docs/2 Árdeŋ na Rim SOOR.pdf", author: "Dr. Mohamed Ali, 2021" },
    { title: "Fur Dictionary", file: "/docs/4-dictionary.pdf", author: "Team Project, 2022" },
    { title: "Árden na Rim Waar Ku̶ŋo Sabba Tog Soor", file: "/docs/3 Árden na Rim Waar Ku̶ŋo Sabba Tog Soor.pdf", author: "Compiled Work" },
    { title: "Songs for the Classroom", file: "/docs/6- Songs for the Classroom(2017 Soor .pdf", author: "Compiled Work" },
    { title: "ABC Storybook", file: "/docs/4- M ABC Storybook.pdf", author: "Compiled Work" },
    { title: "Pɨé_na_Bǎja", file: "/docs8_Pɨé_na_Bǎja.pdf", author: "Dr. A. Osman, 2020" },
    { title: "Árden na Rim Waar Ku̶ŋo Sabbaa̱w", file: "/docs/Árden na Rim Waar Ku̶ŋo Sabbaa̱w .pdf", author: "Prof. Laila Hassan, 2019" },
    { title: "Árden na Rim Waar Ku̶ŋo Sabbaa̱w soor", file: "/docs/Árden na Rim Waar Ku̶ŋo Sabbaa̱w soor.pdf", author: "Research Team, 2021" },
    { title: "Nîlla'ŋ dombore 10.10.2020", file: "/docs/B5 Nîlla'ŋ dombore 10.10.2020(1).pdf", author: "NGO Report, 2020" },
    { title: "Pooꞌíŋ Beléꞌŋ Seebáaŋaꞌŋ Domboreꞌŋ Aldíŋá", file: "/docs/Pooꞌíŋ Beléꞌŋ Seebáaŋaꞌŋ Domboreꞌŋ Aldíŋá - Copy.pdf", author: "Prof. Ahmed Musa, 2018" },
    { title: "Pooꞌíŋ Beléꞌŋ Seebáaŋaꞌŋ Domboreꞌŋ Aldíŋá Soor", file: "/docs/Pooꞌíŋ Beléꞌŋ Seebáaŋaꞌŋ Domboreꞌŋ Aldíŋá Soor.pdf", author: "Heritage Project, 2022" },
    { title: "Pooꞌíŋ Beléꞌŋ Seebáaŋaꞌŋ Domboreꞌŋ Aldíŋá", file: "/docs/Pooꞌíŋ Beléꞌŋ Seebáaŋaꞌŋ Domboreꞌŋ Aldíŋá.pdf", author: "Dr. Rahma Ali, 2017" },
    { title: "Syntax and Structure", file: "/docs/Ibrahim.pdf", author: "Prof.Ibrahim, 2016" },
    { title: "Morphological Complexity", file: "/docs/16-morphology.pdf", author: "Dr. Khalid Osman, 2015" },
    { title: "Language and Identity", file: "/docs/17-identity.pdf", author: "Dr. Mariam Adam, 2020" },
    { title: "Field Research Report", file: "/docs/18-field-report.pdf", author: "Research Institute, 2021" },
    { title: "Historical Development of Fur", file: "/docs/19-history.pdf", author: "Prof. Ali Abdalla, 2019" },
    { title: "Fur Proverbs and Meanings", file: "/docs/20-proverbs.pdf", author: "Cultural Project, 2022" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 relative">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/memphis-mini.png')]"></div>

      <Header />

      <main className="relative container mx-auto px-6 py-12 z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white drop-shadow-md mb-4">Linguistic Resources</h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Comprehensive linguistic analysis, grammar guides, and academic resources for understanding the structure
            and features of the Fur language.
          </p>
        </div>

        {/* Language Overview */}
        <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-lg border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Language Overview</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
              <ul className="space-y-3">
                {grammarTopics.map((item, index) => (
                  <li key={index} className="flex">
                    <span className="font-medium text-gray-900 w-32 flex-shrink-0">{item.title}:</span>
                    <span className="text-gray-600">{item.description}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Classification</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Phylum:</span> Nilo-Saharan</div>
                  <div className="ml-4"><span className="font-medium">Family:</span> Eastern Sudanic</div>
                  <div className="ml-8"><span className="font-medium">Branch:</span> Fur</div>
                  <div className="ml-12"><span className="font-medium">Language:</span> Fur (Fòòr tì)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Resources */}
        <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-lg border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Academic Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pdfResources.map((pdf, idx) => (
              <div key={idx} className="border-l-4 border-teal-700 pl-4">
                <h4 className="font-medium text-gray-900">{pdf.title}</h4>
                <p className="text-sm text-gray-600">{pdf.author}</p>
                <div className="flex space-x-3 mt-1">
                  <a
                    href={pdf.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 text-sm hover:underline"
                  >
                    View PDF
                  </a>
                  <a
                    href={pdf.file}
                    download
                    className="text-teal-700 text-sm hover:underline"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
