"use client"
import { Header } from "@/components/header"
import { ChevronRight, Volume2, Download } from "lucide-react"
import { jsPDF } from "jspdf"
import { useState, useEffect } from "react"

// Full combined dictionary (Real Fur vocabulary + Arabic basics)
const fullDictionary = [
  { fur: "فور", english: "Fur language", arabic: "لغة الفور", pronunciation: "is the most spoken language by majority fur tribe in darfur." },
  { fur: "Taar", english: "leg", arabic: "ساق" },
  { fur: "Úrí", english: "star", arabic: "نجم" },
  { fur: "Raal", english: "back", arabic: "ظهر" },
  { fur: "Ta̱bʉ", english: "head", arabic: "رأس" },
  { fur: "Dɨ́ló", english: "ear", arabic: "أذن" },
  { fur: "Órré", english: "community", arabic: "مجتمع" },
  { fur: "Daara", english: "society", arabic: "مجتمع" },
  { fur: "Poora", english: "Fur people", arabic: "شعب الفور" },
  { fur: "kwǎ", english: "people", arabic: "ناس" },
  { fur: "dóŋá", english: "hand", arabic: "يد" },
  { fur: "dogólá", english: "children", arabic: "أطفال" },
  { fur: "soom", english: "school", arabic: "مدرسة" },
  { fur: "táárí", english: "job", arabic: "وظيفة" },
  { fur: "gʉʉd", english: "education", arabic: "تعليم" },
  { fur: "sog", english: "day", arabic: "يوم" },
  { fur: "Tin", english: "time", arabic: "وقت" },
  { fur: "dom", english: "good", arabic: "جيد" },
  { fur: "kʉtʉ́mó", english: "to build", arabic: "يبني" },
  { fur: "sʉʉrʉ", english: "land", arabic: "أرض" },
  { fur: "simó", english: "delicious", arabic: "لذيذ" },
  { fur: "kʉrʉ", english: "knee", arabic: "ركبة" },
  { fur: "ógó", english: "chest", arabic: "صدر" },
  { fur: "da̱sʉ́", english: "penis", arabic: "ذكر" },
  { fur: "kataba", english: "shoulders", arabic: "كتفان" },
  { fur: "dɨ́ǒ", english: "belly", arabic: "بطن" },
  { fur: "dibé", english: "buttocks", arabic: "مؤخرة" },
  { fur: "nyɨlǎw", english: "hair", arabic: "شعر" },
  { fur: "kórgí", english: "testicles", arabic: "خصيتين" },
  { fur: "A̱rɨ́", english: "face", arabic: "وجه" },
  { fur: "Dórmí", english: "nose", arabic: "أنف" },
  { fur: "tangil", english: "cheek", arabic: "خد" },
  { fur: "ʉ́tó", english: "mouth", arabic: "فم" },
  { fur: "bondé", english: "lip", arabic: "شفة" },
  { fur: "áásó", english: "chin", arabic: "ذقن" },
  { fur: "kúúi", english: "eyes", arabic: "عيون" },
  { fur: "kíí", english: "elbow", arabic: "مرفق" },
  { fur: "taawá", english: "palm of hand", arabic: "راحة اليد" },
  { fur: "tóríŋá", english: "fingers", arabic: "أصابع اليد" },
  { fur: "dɨwil", english: "thigh", arabic: "فخذ" },
  { fur: "durú", english: "arm", arabic: "ذراع" },
  { fur: "ɨ́rɨma", english: "eyelashes", arabic: "رموش" },
  { fur: "Tún", english: "occipital bone", arabic: "عظم القفا" },
  { fur: "kíbaŋ kwá", english: "buttocks", arabic: "مؤخرة" },
  { fur: "pʉ́ró", english: "beard", arabic: "لحية" },
  { fur: "nyemaŋ", english: "waist", arabic: "خصر" },
  { fur: "áláŋ âm", english: "to eat", arabic: "يأكل" },
  { fur: "joo", english: "go", arabic: "اذهب" },
  { fur: "áláŋ joo", english: "to go", arabic: "الذهاب" },
  { fur: "jêl", english: "come", arabic: "تعال" },
  { fur: "áláŋ jêl", english: "to come", arabic: "المجيء" },
  { fur: "anni", english: "I am going", arabic: "أنا ذاهب" },
  { fur: "banni", english: "you are going", arabic: "أنت ذاهب" },
  { fur: "kanni", english: "we are going", arabic: "نحن ذاهبون" },
  { fur: "janni", english: "she/he is going", arabic: "هو/هي ذاهب" },
  { fur: "am̂", english: "eating", arabic: "يأكل" },
  { fur: "kâm", english: "we are eating", arabic: "نحن نأكل" },
  { fur: "bâm", english: "you are eating", arabic: "أنت تأكل" },
  { fur: "áláŋ ɨ́rŋɨ", english: "to walk", arabic: "يمشي" },
  { fur: "jɨ́rŋɨ", english: "walk", arabic: "مشي" },
  { fur: "jam̂", english: "eat", arabic: "يأكل" },
  { fur: "haha", english: "laugh", arabic: "يضحك" },
  { fur: "ʉmeláŋ sog", english: "Wednesday", arabic: "الأربعاء" },
  { fur: "saadáŋ sog", english: "Thursday", arabic: "الخميس" },
  { fur: "Toldomáŋ sog", english: "Friday", arabic: "الجمعة" },
  { fur: "mooŋáŋ sog", english: "Saturday", arabic: "السبت" },
  { fur: "Jamaŋáŋ sog", english: "Sunday", arabic: "الأحد" },
  { fur: "Da̱mɨŋáŋ sog", english: "Monday", arabic: "الاثنين" },
  { fur: "pojoráŋ sog", english: "Tuesday", arabic: "الثلاثاء" },
  { fur: "Kóllíŋ'íŋ soga", english: "days of the week", arabic: "أيام الأسبوع" },
  { fur: "Díg", english: "one", arabic: "واحد" },
  { fur: "Ǎ̱w", english: "two", arabic: "اثنان" },
  { fur: "Ɨ́ss", english: "three", arabic: "ثلاثة" },
  { fur: "Óŋal", english: "four", arabic: "أربعة" },
  { fur: "Óss", english: "five", arabic: "خمسة" },
  { fur: "Ósaŋdíg", english: "six", arabic: "ستة" },
  { fur: "Ósaŋǎ̱w", english: "seven", arabic: "سبعة" },
  { fur: "Osaŋɨ́ss", english: "eight", arabic: "ثمانية" },
  { fur: "Osaŋóŋal", english: "nine", arabic: "تسعة" },
  { fur: "Wa̱yé", english: "ten", arabic: "عشرة" },
  { fur: "Wa̱yé na díg", english: "eleven", arabic: "أحد عشر" },
  { fur: "Wa̱yé na ǎ̱w", english: "twelve", arabic: "اثنا عشر" },
  { fur: "Wa̱yé na Ɨ́ss", english: "thirteen", arabic: "ثلاثة عشر" },
  { fur: "Wa̱yé na Óŋal", english: "fourteen", arabic: "أربعة عشر" },
  { fur: "Wa̱yé na Óss", english: "fifteen", arabic: "خمسة عشر" },
  { fur: "Wa̱yé na Ósaŋdíg", english: "sixteen", arabic: "ستة عشر" },
  { fur: "Wa̱yé na Ósaŋǎ̱w", english: "seventeen", arabic: "سبعة عشر" },
  { fur: "Wa̱yé na Osaŋɨ́ss", english: "eighteen", arabic: "ثمانية عشر" },
  { fur: "Wa̱yé na Osaŋóŋal", english: "nineteen", arabic: "تسعة عشر" },
  { fur: "Wa̱yé na Wa̱yé", english: "twenty", arabic: "عشرون" },
  { fur: "Aldí", english: "story", arabic: "قصة" },
  { fur: "Mamá", english: "uncle", arabic: "عم" },
  { fur: "Door", english: "flower", arabic: "زهرة" },
  { fur: "Báa", english: "father", arabic: "أب" },
  { fur: "Ása", english: "dog", arabic: "كلب" },
  { fur: "káala’ŋ kwë", english: "cousin", arabic: "ابن عم / ابنة عم" },
  { fur: "áláŋ agɨl", english: "to see", arabic: "يرى" },
  { fur: "káala", english: "aunt", arabic: "عمة" },
  { fur: "dɨɨŋ", english: "our", arabic: "لنا" },
  { fur: "dúíŋ", english: "mine", arabic: "لي" },
  { fur: "judá", english: "bush", arabic: "غابة" },
  { fur: "kwë", english: "child", arabic: "طفل" },
  { fur: "Atine", english: "grandchild", arabic: "حفيد" },
  { fur: "wʉ́o", english: "grandfather", arabic: "جد" },
  { fur: "Na", english: "and", arabic: "و" },
  { fur: "Biís", english: "cat", arabic: "قطة" },
  { fur: "Kaa gís eŋa", english: "what happened to you", arabic: "ماذا حدث لك؟" },
  { fur: "Dóga", english: "hen / chicken", arabic: "دجاجة / دجاج" },
  { fur: "Kaalu", english: "coward", arabic: "جبان" },
  { fur: "zoŋga", english: "rooster", arabic: "ديك" },
  { fur: "Abo", english: "grandmother", arabic: "جدة" },
  { fur: "arɨ dígi", english: "something", arabic: "شيء ما" },
  { fur: "kaa-ii", english: "what is it", arabic: "ما هذا؟" },
  { fur: "moge", english: "joker", arabic: "مزاح" },
  { fur: "ay-lóŋ", english: "how is it", arabic: "كيف هو؟" },
  { fur: "kaáŋ", english: "for what", arabic: "لأي سبب" },
  { fur: "tokké", english: "hot", arabic: "حار" },
  { fur: "Nyamíre", english: "mother-in-law", arabic: "حماة" },
  { fur: "Dítan", english: "sibling", arabic: "أخ/أخت" },
  { fur: "Dadá", english: "sister", arabic: "أخت" },
  { fur: "lúlla", english: "cold", arabic: "بارد" },
  { fur: "Jáárá", english: "lion", arabic: "أسد" },
  { fur: "jabúŋ", english: "take", arabic: "خذ" },
  { fur: "áláŋ jabúŋ", english: "to take", arabic: "يأخذ" },
  { fur: "Nyamʉ́ro", english: "spider", arabic: "عنكبوت" },
  { fur: "abá", english: "if", arabic: "إذا" },
  { fur: "dɨó", english: "inside", arabic: "داخل" },
  { fur: "darma", english: "skin", arabic: "جلد" },
  { fur: "koro", english: "bones", arabic: "عظام" },
  { fur: "Yáa", english: "woman", arabic: "امرأة" },
  { fur: "Duó", english: "man", arabic: "رجل" },
  { fur: "Julu", english: "buy", arabic: "يشتري" },
  { fur: "Jʉllʉ", english: "steal", arabic: "يسرق" },
  { fur: "Jʉl", english: "hide", arabic: "يخفي" },
  { fur: "sóŋgoŋa", english: "money", arabic: "مال" },
  { fur: "Toŋ", english: "house", arabic: "منزل" },
  { fur: "utú", english: "fire", arabic: "نار" },
  { fur: "kullé", english: "light", arabic: "خفيف" },
  { fur: "Dɨ́rró", english: "heavy", arabic: "ثقيل" },
  { fur: "Dɨkkô", english: "black", arabic: "أسود" },
  { fur: "Pukkâ", english: "red", arabic: "أحمر" },
  { fur: "Kɨrrô", english: "green", arabic: "أخضر" },
  { fur: "pattâ", english: "white", arabic: "أبيض" },
  { fur: "Bára", english: "brother", arabic: "أخ" },
  { fur: "nɨw", english: "sister", arabic: "أخت" },
  { fur: "Íya", english: "mother", arabic: "أم" },
  { fur: "kwědee", english: "son", arabic: "ابن" },
  { fur: "kwěnɨw", english: "daughter", arabic: "ابنة" },
  { fur: "juu / jangar", english: "marriage", arabic: "زواج" },
  { fur: "rim", english: "write", arabic: "يكتب" },
  { fur: "keljâm", english: "listen", arabic: "يسمع" },
  { fur: "jôŋ", english: "sit", arabic: "اجلس" },
  { fur: "ja̱rrɨ", english: "run", arabic: "يركض" },
  { fur: "jaba", english: "drink", arabic: "يشرب" },
  { fur: "kilmá'ŋsɨmmɨŋ", english: "happiness", arabic: "سعادة" },
  { fur: "mʉʉn", english: "sad", arabic: "حزين" },
  { fur: "kóór", english: "problem", arabic: "مشكلة" },
  { fur: "Kʉopʉo", english: "God (Allah)", arabic: "الله" },
  { fur: "dombore", english: "book", arabic: "كتاب" },
  { fur: "ka̱lɨ", english: "fear", arabic: "خوف" },
  { fur: "kilmá", english: "heart", arabic: "قلب" }
]

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
    viewPDF: "📑 View Generated PDF",
    fur: "Fur",
    english: "English",
    arabic: "Arabic",
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
    viewPDF: "📑 عرض PDF المُنشأ",
    fur: "الفور",
    english: "الإنجليزية",
    arabic: "العربية",
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
    viewPDF: "📑 View Generated PDF",
    fur: "Fur",
    english: "English",
    arabic: "Arabic",
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

  // Updated Alphabet with the two new letters
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
    { letter: "Z z", name: "za", sound: "/z/" },
    // Newly added letters
    { letter: "Ɨ ɨ", name: "ɨ", sound: "/ɨ/" },
    { letter: "ʉ ʉ", name: "ʉ", sound: "/ʉ/" }
  ]

  const tones = [
    { letter: "á", name: "High Tone", sound: "˥" },
    { letter: "à", name: "Low Tone", sound: "˩" },
    { letter: "â", name: "Falling Tone", sound: "˥˩" },
    { letter: "ǎ", name: "Rising Tone", sound: "˩˥" },
    { letter: "a", name: "Mid / Default", sound: "˧ / unmarked" },
  ]

  const buildPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(20)
    doc.text("📖 Basic Literacy Materials - Fur Language", 20, 20)
    
    doc.setFontSize(16)
    doc.text("Fur Alphabet", 20, 40)
    doc.setFontSize(11)
    alphabetLetters.forEach((item, i) => {
      doc.text(`${item.letter} — ${item.name} (${item.sound})`, 20, 55 + i * 7)
    })

    doc.addPage()
    doc.setFontSize(16)
    doc.text("Essential Vocabulary (Fur + English + Arabic)", 20, 20)
    doc.setFontSize(10)

    fullDictionary.forEach((w, i) => {
      const line = `${w.fur}  |  ${w.english}  |  ${w.arabic || "-"}`
      doc.text(line, 20, 40 + i * 7)
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
    doc.save("fur-basic-literacy.pdf")
  }

  return (
    <div className="min-h-screen bg-gray-50" dir={dir}>
      <Header />

      <main className="container mx-auto px-6 py-12">
        {/* Language Switcher */}
        <div className="flex justify-end mb-6">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as "en" | "ar" | "fur")}
            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
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
        <div className="bg-white rounded-2xl shadow-sm border p-8 mb-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{t.furAlphabet}</h2>
            <div className="flex gap-4">
              <button 
                onClick={generatePDFPreview}
                className="flex items-center gap-2 text-teal-700 hover:text-teal-800 transition-colors"
              >
                <Download className="w-5 h-5" /> {t.previewPDF}
              </button>
              <button 
                onClick={downloadPDF}
                className="flex items-center gap-2 bg-teal-700 text-white px-5 py-2 rounded-xl hover:bg-teal-800 transition-colors"
              >
                <Download className="w-5 h-5" /> {t.downloadPDF}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
            {alphabetLetters.map((item, index) => (
              <div 
                key={index} 
                className="text-center p-4 border rounded-xl hover:bg-teal-50 hover:border-teal-200 transition-all group"
              >
                <div className="text-3xl font-bold text-gray-900 mb-2">{item.letter}</div>
                <div className="text-xs text-gray-500 mb-1">{item.name}</div>
                <div className="text-xs text-teal-600 font-mono">{item.sound}</div>
                <button className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Volume2 className="w-4 h-4 text-teal-700 mx-auto" />
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => setShowPractice(!showPractice)}
              className="bg-teal-700 text-white px-8 py-3 rounded-xl hover:bg-teal-800 transition-colors font-medium"
            >
              {showPractice ? t.closePractice : t.practiceAlphabet}
            </button>
          </div>

          {showPractice && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">{t.practiceHere}</h3>
              <textarea
                rows={10}
                placeholder={t.practicePlaceholder}
                className="w-full p-5 border rounded-2xl bg-yellow-50 focus:ring-2 focus:ring-teal-700 focus:outline-none font-mono text-lg"
              />
            </div>
          )}
        </div>

        {/* Essential Vocabulary - Shows 3 Languages */}
        <div className="bg-white rounded-2xl shadow-sm border p-8 mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{t.essentialVocabulary}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fullDictionary.map((word, index) => (
              <div key={index} className="border rounded-2xl p-6 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-4xl font-bold text-gray-900 break-all">{word.fur}</span>
                  <button className="text-teal-700 hover:text-teal-800 p-1">
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold text-teal-700">{t.english}:</span>{" "}
                    <span className="text-gray-700">{word.english}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-teal-700">{t.arabic}:</span>{" "}
                    <span className="text-gray-700">{word.arabic}</span>
                  </div>
                  {word.pronunciation && (
                    <div className="italic text-gray-500">/{word.pronunciation}/</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tone Chart */}
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{t.toneChart}</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 rounded-xl">
              <thead className="bg-teal-700 text-white">
                <tr>
                  <th className="py-4 px-6 text-left font-medium">{t.letter}</th>
                  <th className="py-4 px-6 text-left font-medium">{t.toneName}</th>
                  <th className="py-4 px-6 text-left font-medium">{t.ipaSound}</th>
                </tr>
              </thead>
              <tbody>
                {tones.map((tone, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="py-5 px-6 text-3xl font-bold">{tone.letter}</td>
                    <td className="py-5 px-6 text-gray-700">{tone.name}</td>
                    <td className="py-5 px-6 font-mono text-teal-700">{tone.sound}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PDF Preview */}
        {pdfUrl && (
          <div className="mt-12 bg-white rounded-2xl shadow-sm border p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.viewPDF}</h2>
            <iframe 
              src={pdfUrl} 
              width="100%" 
              height="700px" 
              className="border rounded-2xl"
            />
          </div>
        )}
      </main>
    </div>
  )
}