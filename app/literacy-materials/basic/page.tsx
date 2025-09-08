"use client"
import { Header } from "@/components/header"
import { ChevronRight, Volume2, Download } from "lucide-react"
import { jsPDF } from "jspdf"
import { useState, useEffect } from "react"

// 🌍 Translation object
const translations = {
  en: {
    breadcrumb1: "Literacy Materials",
    breadcrumb2: "Basic Literacy",
    pageTitle: "Basic Literacy Materials",
    pageDescription: "Start your journey with the Fur language alphabet, basic vocabulary, and fundamental reading skills.",
    furAlphabet: "Fur Alphabet",
    previewPDF: "Preview PDF",
    downloadPDF: "Download PDF",
    practiceAlphabet: "Practice Alphabet",
    closePractice: "Close Practice",
    practiceHere: "✍️ Practice Here",
    practicePlaceholder: "Write your alphabet practice here...",
    essentialVocabulary: "Essential Vocabulary",
    toneChart: "Tone Chart",
    letter: "Letter",
    toneName: "Tone Name",
    ipaSound: "IPA Sound",
    viewPDF: "📑 View Generated PDF"
  },
  ar: {
    breadcrumb1: "مواد محو الأمية",
    breadcrumb2: "محو الأمية الأساسية",
    pageTitle: "مواد محو الأمية الأساسية",
    pageDescription: "ابدأ رحلتك مع أبجدية لغة الفور، والمفردات الأساسية، ومهارات القراءة الأساسية.",
    furAlphabet: "أبجدية الفور",
    previewPDF: "عرض PDF",
    downloadPDF: "تحميل PDF",
    practiceAlphabet: "ممارسة الأبجدية",
    closePractice: "إغلاق الممارسة",
    practiceHere: "✍️ مارس هنا",
    practicePlaceholder: "اكتب تمرين الأبجدية هنا...",
    essentialVocabulary: "المفردات الأساسية",
    toneChart: "جدول النغمات",
    letter: "الحرف",
    toneName: "اسم النغمة",
    ipaSound: "الصوت الدولي",
    viewPDF: "📑 عرض PDF المُنشأ"
  },
  fur: {
    breadcrumb1: "Daali Goroŋ",
    breadcrumb2: "Daali Kɔllɔ",
    pageTitle: "Daali Kɔllɔ Goroŋ",
    pageDescription: "Kaŋa fur daali goroŋ, kɔltura baasic vocabulary, se fundamental reading skills.",
    furAlphabet: "Fur Alphabeta",
    previewPDF: "Preview PDF",
    downloadPDF: "Download PDF",
    practiceAlphabet: "Practice Alphabeta",
    closePractice: "Close Practice",
    practiceHere: "✍️ Practice Heere",
    practicePlaceholder: "Write your alphabet practice here...",
    essentialVocabulary: "Basic Words",
    toneChart: "Tone Chart",
    letter: "Letter",
    toneName: "Tone Name",
    ipaSound: "IPA Sound",
    viewPDF: "📑 View Generated PDF"
  }
}

export default function BasicLiteracyPage() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [showPractice, setShowPractice] = useState(false)
  const [lang, setLang] = useState<"en" | "ar" | "fur">("en")
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")

  const t = translations[lang]

  useEffect(() => {
    setDir(lang === "ar" ? "rtl" : "ltr")
  }, [lang])

  const alphabetLetters = [
    { letter: "A a", name: "a", sound: "/a/" },
    { letter: "Ạ ạ", name: "ạ", sound: "/ə/" },
    { letter: "B b", name: "ba", sound: "/b/" },
    { letter: "D d", name: "da", sound: "/d/" },
    { letter: "E e", name: "e", sound: "/ɛ/" },
    { letter: "F f", name: "fa", sound: "/f, ɸ/" },
    { letter: "G g", name: "ga", sound: "/g/" },
    { letter: "H h", name: "ha", sound: "/h/" },
    { letter: "I i", name: "i", sound: "/i/" },
    { letter: "Ị ị", name: "ị", sound: "/i, ɨ/" },
    { letter: "J j", name: "ja", sound: "/ʤ/" },
    { letter: "K k", name: "ka", sound: "/k/" },
    { letter: "L l", name: "la", sound: "/l/" },
    { letter: "M m", name: "ma", sound: "/m/" },
    { letter: "N n", name: "na", sound: "/n/" },
    { letter: "Ɲ ɲ", name: "ɲa", sound: "/ɲ/" },
    { letter: "Ny ny", name: "nya", sound: "/ɲ/" },
    { letter: "O o", name: "o", sound: "/o/" },
    { letter: "P p", name: "pa", sound: "/p/" },
    { letter: "R r", name: "ra", sound: "/r/" },
    { letter: "S s", name: "sa", sound: "/s/" },
    { letter: "T t", name: "ta", sound: "/t/" },
    { letter: "U u", name: "u", sound: "/u/" },
    { letter: "Ụ ụ", name: "ụ", sound: "/ʊ/" },
    { letter: "W w", name: "wa", sound: "/w/" },
    { letter: "Y y", name: "ya", sound: "/j/" },
    { letter: "Z z", name: "za", sound: "/z/" }
  ];

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

  const tones = [
    { letter: "á", name: "High Tone", sound: "˥" },
    { letter: "a", name: "Low Tone", sound: "˩" },
    { letter: "â", name: "Falling Tone", sound: "˥˩" },
    { letter: "ǎ", name: "Rising Tone", sound: "˩˥" },
    // ... add remaining tones here
  ]

  const buildPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(20)
    doc.text("📖 Basic Literacy Materials", 20, 20)
    doc.setFontSize(12)
    doc.text("Fur Alphabet • Vocabulary", 20, 30)
    doc.addPage()
    doc.setFontSize(16)
    doc.text("Fur Alphabet", 20, 20)
    doc.setFontSize(12)
    alphabetLetters.forEach((item, i) => {
      doc.text(`${item.letter} - ${item.name} (${item.sound})`, 20, 40 + i * 8)
    })
    doc.addPage()
    doc.setFontSize(16)
    doc.text("Essential Vocabulary", 20, 20)
    doc.setFontSize(12)
    basicWords.forEach((w, i) => {
      doc.text(`${w.fur}  =  ${w.english}  /${w.pronunciation}/`, 20, 40 + i * 8)
    })
    return doc
  }

  const generatePDFPreview = () => {
    const doc = buildPDF()
    const pdfBlob = doc.output("blob")
    setPdfUrl(URL.createObjectURL(pdfBlob))
  }

  const downloadPDF = () => {
    const doc = buildPDF()
    doc.save("basic-literacy.pdf")
  }

  return (
    <div className="min-h-screen bg-gray-50" dir={dir}>
      <Header />
      <main className="container mx-auto px-6 py-12">
        {/* 🌍 Language Switcher */}
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

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-8">
          <span>{t.breadcrumb1}</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-teal-700 font-medium">{t.breadcrumb2}</span>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.pageTitle}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.pageDescription}</p>
        </div>

        {/* Fur Alphabet Section */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{t.furAlphabet}</h2>
            <div className="flex space-x-4">
              <button onClick={generatePDFPreview} className="flex items-center text-teal-700 hover:text-teal-800">
                <Download className="w-4 h-4 mr-2" />{t.previewPDF}
              </button>
              <button onClick={downloadPDF} className="flex items-center text-teal-700 hover:text-teal-800">
                <Download className="w-4 h-4 mr-2" />{t.downloadPDF}
              </button>
            </div>
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
            <button
              onClick={() => setShowPractice(!showPractice)}
              className="bg-teal-700 text-white px-6 py-2 rounded-lg hover:bg-teal-800 transition-colors"
            >
              {showPractice ? t.closePractice : t.practiceAlphabet}
            </button>
          </div>

          {showPractice && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.practiceHere}</h3>
              <textarea
                rows={8}
                placeholder={t.practicePlaceholder}
                className="w-full p-4 border rounded-lg bg-yellow-50 focus:ring-2 focus:ring-teal-700 focus:outline-none font-mono"
              ></textarea>
            </div>
          )}
        </div>

        {/* Vocabulary Section */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.essentialVocabulary}</h2>
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

        {/* Tone Chart */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.toneChart}</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-teal-700 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">{t.letter}</th>
                  <th className="py-3 px-4 text-left">{t.toneName}</th>
                  <th className="py-3 px-4 text-left">{t.ipaSound}</th>
                </tr>
              </thead>
              <tbody>
                {tones.map((tone, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="py-3 px-4 font-bold text-lg">{tone.letter}</td>
                    <td className="py-3 px-4">{tone.name}</td>
                    <td className="py-3 px-4">{tone.sound}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PDF Viewer */}
        {pdfUrl && (
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.viewPDF}</h2>
            <iframe src={pdfUrl} width="100%" height="600px" className="border rounded-lg"></iframe>
          </div>
        )}
      </main>
    </div>
  )
}
