"use client"

import React, { useState } from "react"

const translations: any = {
  en: {
    pageTitle: "Complete Grammar Overview",
    searchPlaceholder: "Search topics, categories, or videos...",
    noResults: "No results found for",
    backHome: "Back to Home",
    categories: [
      { name: "Language Lessons-1", count: 45, color: "bg-blue-100 text-blue-700", href: "#semantics" },
      { name: "Grammar_2", count: 28, color: "bg-green-100 text-green-700", href: "#phonology" },
      { name: "Grammar_3", count: 22, color: "bg-purple-100 text-purple-700", href: "#morphology" },
      { name: "Grammar_4", count: 18, color: "bg-red-100 text-red-700", href: "#syntax" },
      { name: "Grammar_5", count: 35, color: "bg-yellow-100 text-yellow-700", href: "#pragmatics" },
      { name: "Documentaries", count: 12, color: "bg-blue-50 text-blue-600", href: "#orthography" },
    ],
    sections: [
      {
        id: "semantics",
        title: "Semantics",
        description: "Explore the meanings of words and sentences in Fur language.",
        videos: [
          { title: "Introduction to Semantics", url: "video/Alphabets_prounciation.mp4" },
          { title: "Word Meanings and Context", url: "video/Alphabets_prounciation.mp4" },
        ],
      },
      {
        id: "phonology",
        title: "Phonology",
        description: "Study the sound system of the Fur language.",
        videos: [
          { title: "Consonants and Vowels", url: "video/Class_poem.mp4" },
          { title: "Tone and Stress Patterns", url: "video/Class_poem.mp4" },
        ],
      },
      {
        id: "morphology",
        title: "Morphology",
        description: "Learn how words are formed and structured in Fur.",
        videos: [
          { title: "Introduction to Morphology", url: "video/reading1.mp4" },
          { title: "Word Formation Rules", url: "video/covid_tips2.mp4" },
        ],
      },
      {
        id: "syntax",
        title: "Syntax",
        description: "Understand sentence structure and grammar rules.",
        videos: [
          { title: "Basic Sentence Structures", url: "video/reading1.mp4" },
          { title: "Complex Sentences", url: "video/reading2.mp4" },
        ],
      },
      {
        id: "pragmatics",
        title: "Pragmatics",
        description: "See how context influences meaning in Fur communication.",
        videos: [
          { title: "Politeness and Context", url: "video/reading1.mp4" },
          { title: "Pragmatic Markers", url: "https://www.youtube.com/embed/yza890" },
        ],
      },
      {
        id: "orthography",
        title: "Orthography",
        description: "Learn how the Fur language is written.",
        videos: [
          { title: "Writing System Overview", url: "https://www.youtube.com/embed/bcd123" },
          { title: "Spelling Rules", url: "https://www.youtube.com/embed/efg456" },
        ],
      },
    ],
  },

  ar: {
    pageTitle: "نظرة شاملة على القواعد",
    searchPlaceholder: "ابحث عن المواضيع أو التصنيفات أو مقاطع الفيديو...",
    noResults: "لم يتم العثور على نتائج لـ",
    backHome: "العودة إلى الصفحة الرئيسية",
    categories: [
      { name: "دروس اللغة-1", count: 45, color: "bg-blue-100 text-blue-700", href: "#semantics" },
      { name: "القواعد_2", count: 28, color: "bg-green-100 text-green-700", href: "#phonology" },
      { name: "القواعد_3", count: 22, color: "bg-purple-100 text-purple-700", href: "#morphology" },
      { name: "القواعد_4", count: 18, color: "bg-red-100 text-red-700", href: "#syntax" },
      { name: "القواعد_5", count: 35, color: "bg-yellow-100 text-yellow-700", href: "#pragmatics" },
      { name: "وثائقيات", count: 12, color: "bg-blue-50 text-blue-600", href: "#orthography" },
    ],
    sections: [
      {
        id: "semantics",
        title: "علم الدلالة",
        description: "اكتشف معاني الكلمات والجمل في لغة الفور.",
        videos: [
          { title: "مقدمة في علم الدلالة", url: "video/Alphabets_prounciation.mp4" },
          { title: "معاني الكلمات والسياق", url: "video/Alphabets_prounciation.mp4" },
        ],
      },
      {
        id: "phonology",
        title: "علم الأصوات",
        description: "ادرس النظام الصوتي للغة الفور.",
        videos: [
          { title: "الحروف الساكنة والمتحركة", url: "video/Class_poem.mp4" },
          { title: "نمط النبر والتنغيم", url: "video/Class_poem.mp4" },
        ],
      },
      {
        id: "morphology",
        title: "علم الصرف",
        description: "تعلم كيف تتكون الكلمات في الفور.",
        videos: [
          { title: "مقدمة في علم الصرف", url: "video/reading1.mp4" },
          { title: "قواعد تكوين الكلمات", url: "video/covid_tips2.mp4" },
        ],
      },
      {
        id: "syntax",
        title: "علم النحو",
        description: "افهم تركيب الجملة وقواعد القواعد.",
        videos: [
          { title: "تراكيب الجمل الأساسية", url: "video/reading1.mp4" },
          { title: "الجمل المعقدة", url: "video/reading2.mp4" },
        ],
      },
      {
        id: "pragmatics",
        title: "البراغماتية",
        description: "شاهد كيف يؤثر السياق في المعنى بلغة الفور.",
        videos: [
          { title: "المجاملة والسياق", url: "video/reading1.mp4" },
          { title: "العلامات التداولية", url: "https://www.youtube.com/embed/yza890" },
        ],
      },
      {
        id: "orthography",
        title: "الإملاء",
        description: "تعلم كيف تُكتب لغة الفور.",
        videos: [
          { title: "نظرة عامة على نظام الكتابة", url: "https://www.youtube.com/embed/bcd123" },
          { title: "قواعد الإملاء", url: "https://www.youtube.com/embed/efg456" },
        ],
      },
    ],
  },

  fur: {
    pageTitle: "Kúndú dáálí gíŋaŋá",
    searchPlaceholder: "Róŋo dáálí, fóro, bá video...",
    noResults: "Máshí káŋi níŋaŋá",
    backHome: "Díriŋa ŋa kákó",
    categories: [
      { name: "Kúndú Dáálí-1", count: 45, color: "bg-blue-100 text-blue-700", href: "#semantics" },
      { name: "Gíŋaŋá-2", count: 28, color: "bg-green-100 text-green-700", href: "#phonology" },
      { name: "Gíŋaŋá-3", count: 22, color: "bg-purple-100 text-purple-700", href: "#morphology" },
      { name: "Gíŋaŋá-4", count: 18, color: "bg-red-100 text-red-700", href: "#syntax" },
      { name: "Gíŋaŋá-5", count: 35, color: "bg-yellow-100 text-yellow-700", href: "#pragmatics" },
      { name: "Fúlí Lóŋó", count: 12, color: "bg-blue-50 text-blue-600", href: "#orthography" },
    ],
    sections: [
      {
        id: "semantics",
        title: "Dáálí Gíŋaŋá",
        description: "Nóŋo dáálí fóro kúraŋa ní Fur dáálí.",
        videos: [
          { title: "Fárá dáálí gíŋaŋá", url: "video/Alphabets_prounciation.mp4" },
          { title: "Dáálí kúraŋa fóro", url: "video/Alphabets_prounciation.mp4" },
        ],
      },
      {
        id: "phonology",
        title: "Dáálí Nyɔŋɔ",
        description: "Nóŋo nyɔŋɔ dáálí ní Fur.",
        videos: [
          { title: "Kiriŋo ní kúndú", url: "video/Class_poem.mp4" },
          { title: "Tóno ní stress", url: "video/Class_poem.mp4" },
        ],
      },
      {
        id: "morphology",
        title: "Dáálí fóro",
        description: "Fúlí dáálí ká kúraŋa ní Fur.",
        videos: [
          { title: "Fárá dáálí fóro", url: "video/reading1.mp4" },
          { title: "Kúndú fóro dáálí", url: "video/covid_tips2.mp4" },
        ],
      },
      {
        id: "syntax",
        title: "Dáálí kíriŋo",
        description: "Kíriŋo fóro dáálí ní Fur.",
        videos: [
          { title: "Kíriŋo dáálí fára", url: "video/reading1.mp4" },
          { title: "Kíriŋo dáálí máŋaŋá", url: "video/reading2.mp4" },
        ],
      },
      {
        id: "pragmatics",
        title: "Dáálí lóŋoŋa",
        description: "Síaŋa kúndú káŋi ní Fur dáálí.",
        videos: [
          { title: "Fúlí kúndú ní lóŋoŋa", url: "video/reading1.mp4" },
          { title: "Lóŋoŋa marker", url: "https://www.youtube.com/embed/yza890" },
        ],
      },
      {
        id: "orthography",
        title: "Dáálí ŋa kíriŋo",
        description: "Fúlí Fur dáálí ká káŋa.",
        videos: [
          { title: "Ŋa kíriŋo fóro", url: "https://www.youtube.com/embed/bcd123" },
          { title: "Kíriŋo fóro dáálí", url: "https://www.youtube.com/embed/efg456" },
        ],
      },
    ],
  },
}

// 🔎 Highlight helper
const highlightText = (text: string, query: string) => {
  if (!query) return text
  const regex = new RegExp(`(${query})`, "gi")
  return text.split(regex).map((part, i) =>
    regex.test(part) ? <mark key={i} className="bg-yellow-200 font-bold">{part}</mark> : part
  )
}

export default function GrammarPage() {
  const [search, setSearch] = useState("")
  const [lang, setLang] = useState<"en" | "ar" | "fur">("en")

  const t = translations[lang]

  const filteredCategories = t.categories.filter((cat: any) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  )

  const filteredSections = t.sections
    .map((section: any) => ({
      ...section,
      videos: section.videos.filter((video: any) =>
        video.title.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((section: any) =>
      section.title.toLowerCase().includes(search.toLowerCase()) ||
      section.description.toLowerCase().includes(search.toLowerCase()) ||
      section.videos.length > 0
    )

  const nothingFound = filteredCategories.length === 0 && filteredSections.length === 0

  return (
    <div className={`p-4 md:p-8 space-y-10 scroll-smooth ${lang === "ar" ? "text-right" : "text-left"}`}>
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">{t.pageTitle}</h1>

      {/* 🌍 Language Switcher */}
      <div className="flex justify-center gap-3 mb-6">
        <button onClick={() => setLang("en")} className={`px-3 py-1 rounded ${lang === "en" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>English</button>
        <button onClick={() => setLang("ar")} className={`px-3 py-1 rounded ${lang === "ar" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>العربية</button>
        <button onClick={() => setLang("fur")} className={`px-3 py-1 rounded ${lang === "fur" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>Fur</button>
      </div>

      {/* 🔍 Search Box */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-2/3 lg:w-1/2 px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* 🚫 No Results */}
      {nothingFound && (
        <p className="text-center text-gray-600 text-lg font-medium">
          {t.noResults} "<span className="font-semibold">{search}</span>"
        </p>
      )}

      {/* 🎥 Video Categories */}
      {filteredCategories.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {filteredCategories.map((cat: any, idx: number) => (
            <a
              key={idx}
              href={cat.href}
              className={`flex flex-col items-center justify-center p-3 md:p-4 rounded-lg shadow hover:shadow-lg transition ${cat.color}`}
            >
              <span className="text-sm md:text-lg font-semibold text-center">
                {highlightText(cat.name, search)}
              </span>
              <span className="text-xs md:text-sm">{cat.count} videos</span>
            </a>
          ))}
        </div>
      )}

      {/* 📚 Grammar Sections */}
      {filteredSections.map((section: any, index: number) => (
        <div key={index} id={section.id} className="border rounded-lg shadow p-4 md:p-6 space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold">{highlightText(section.title, search)}</h2>
          <p className="text-gray-700 text-sm md:text-base">{highlightText(section.description, search)}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {section.videos.map((video: any, idx: number) => (
              <div key={idx} className="w-full">
                <p className="text-sm font-medium mb-2">{highlightText(video.title, search)}</p>
                <iframe
                  width="100%"
                  height="220"
                  src={video.url}
                  title={`${video.title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* 🏠 Back to Home */}
      <div className="flex justify-center mt-10">
        <a
          href="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          {t.backHome}
        </a>
      </div>
    </div>
  )
}
