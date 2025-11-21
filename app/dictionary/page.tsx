// app/dictionary/page.tsx
"use client";

import React, { useMemo, useRef, useState } from "react";
import { Header } from "@/components/header";
import { Search, Volume2, Filter, Star } from "lucide-react";

/**
 * DictionaryPage — updated
 * - Uses only the words inside the page (dictionaryEntries).
 * - Category matching uses Unicode normalization and diacritic removal so matches are reliable.
 * - Play button uses browser SpeechSynthesis to speak the Fur text.
 */

type Entry = {
  fur?: string;
  english?: string;
  arabic?: string;
  pronunciation?: string;
  partOfSpeech?: string;
  definition?: string;
  examples?: string[];
  related?: string[];
};

export default function DictionaryPage() {
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [speakingKey, setSpeakingKey] = useState<string | null>(null);

  // ---------------------
  // DATA: dictionary entries (only words inside this file)
  // ---------------------
  const dictionaryEntries: Entry[] = useMemo(
    () => [
      { fur: "Kiijaŋ", english: "Forms", arabic: "الاستمارات", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Dormi", english: "Home", arabic: "الرئيسية", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Ta̱bʉ’ŋ ere", english: "User interface", arabic: "واجهة المستخدم", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "kormi", english: "Title", arabic: "العنوان", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "suur", english: "Body", arabic: "المتن", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Piis", english: "user", arabic: "مستخدم", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Saŋgala", english: "Pages", arabic: "الصفحات", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Dom-si piá", english: "Save configuration", arabic: "حفظ الإعدادات", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Jááso", english: "delete", arabic: "حذف", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Illaiŋ", english: "Status", arabic: "الحالة", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Rimmeŋ", english: "Register", arabic: "التسجيل", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Saŋal dɨwwôs já̱wlɨ.", english: "Create a new user account.", arabic: "أنشئ حساب مستخدم جديد.", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Ósom", english: "Markup", arabic: "ترميز, علامة / ماركة / صنف", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Waar", english: "Prefix", arabic: "سابقة", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "joomés", english: "Suffix", arabic: "لاحقة", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Jɨɨn", english: "Approve", arabic: "الموافقة", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "jááso", english: "Delete", arabic: "حذف", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "jányi", english: "Submit", arabic: "إضافة", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Tááríŋá", english: "Operations", arabic: "عمليات", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Ájé", english: "Content", arabic: "المحتوى", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Ájé wʉoŋ-si kee", english: "Moderated content", arabic: "محتوى خاضع للإشراف", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Délliŋ", english: "Attribute", arabic: "الخاصية", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Tullé-ii", english: "Value", arabic: "القيمة", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Tááríspii’ŋ kona", english: "Username", arabic: "اسم المستخدم", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Ɨmé’íŋ boot", english: "Email address", arabic: "عنوان البريد الإلكتروني", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Jʉtʉ́mó", english: "Development", arabic: "التطوير", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Daaraŋa", english: "Groups", arabic: ", / قروبات مجموعات", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Daara", english: "Group", arabic: "المجموعة", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "lóŋ", english: "Type", arabic: "النوع", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Járridʉŋo", english: "Author", arabic: "المؤلف", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "jawíŋá", english: "Replies", arabic: "الردود", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Ʉ́rrɨ́ŋ-si", english: "Closed", arabic: "مغلق", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Ee", english: "yes", arabic: "نعم", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Teŋge", english: "List", arabic: "لائحة", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Ájé", english: "Subject", arabic: "الموضوع", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Ɨmél áddeŋ jáa", english: "Send email", arabic: "أرسل بريد إلكتروني", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Tááríŋá", english: "Actions", arabic: "الإجراءات", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "keera", english: "disabled", arabic: "معطَّل", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Jɨbé", english: "Confirm", arabic: "تأكيد", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "jundí", english: "Cancel", arabic: "إلغاء", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "jááso", english: "Remove", arabic: "حذف", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "juaka̱rɨ kʉŋo", english: "Last comment", arabic: "آخر تعليق", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "jáwli", english: "Description", arabic: "الوصف", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Belé", english: "Language", arabic: "اللغة", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "RSS íní", english: "RSS feed", arabic: "تلقيمة آر.إس.إس", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "kerrŋa", english: "more", arabic: "المزيد", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Ja̱gɨ", english: "Enable", arabic: "تفعيل", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Jasi", english: "Disable", arabic: "تعطيل", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Játko wala domoŋa’ŋ dǒrajawí.", english: "Explanation or submission guidelines", arabic: "الشرح أو توجيهات الإرسال", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Ɨmél’íŋ jǎŋo", english: "Email settings", arabic: "إعدادات البريد الإلكتروني", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Magara", english: "Article", arabic: "نص,مقال", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Jɨttɨ eŋa", english: "Disabled", arabic: "معطل", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Táári pii", english: "Enabled", arabic: "مفعل", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Magaraŋa", english: "Articles", arabic: "المقالات", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Kʉrɨŋ", english: "Administration", arabic: "الإدارة", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "footer", english: "footer", arabic: "تذييل", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "juaŋa", english: "Comments", arabic: "التعليقات", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Kerŋa", english: "More", arabic: "المزيد", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Dééŋ arrá á kuroba", english: "not verified", arabic: "لم يتم التحقق", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "A̱rɨ", english: "Action", arabic: "إجراء", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Jǎŋo ka̱rɨkʉŋo", english: "Last updated", arabic: "آخر تحديث", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "kee", english: "On", arabic: "في", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Le", english: "For", arabic: "لـ", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Dɨwwô", english: "new", arabic: "جديد", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Ósoma", english: "Tags", arabic: "وسوم,علامة / ماركة / صنف", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Geraŋa’ŋ lóó", english: "Block title", arabic: "عنوان الصندوق", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Sa̱ndʉ́g’íŋ lóó âlbá lóŋíti dʉó’ƞ-le", english: "The title of the block as shown to the user.", arabic: "عنوان الصندوق كما يظهر للمستخدم.", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Jǎŋo", english: "Taxonomy", arabic: "التصنيف", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Rɨmmeŋ", english: "Logging", arabic: "تسجيل / كتابة", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Ee", english: "Yes", arabic: "نعم", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "lóolo", english: "No", arabic: "لا", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Ájéŋ’ŋ sabbaŋa", english: "Content types", arabic: "أنواع المحتوى", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Saŋgal dííg", english: "Homepage", arabic: "الصفحة الأولى", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Saŋal appâ", english: "Home page", arabic: "الصفحة الرئيسية", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Jopó", english: "Download", arabic: "تحميل", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "A̱rɨ́", english: "Version", arabic: "النسخة", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Jawar", english: "view", arabic: "عرض", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Á íwíríŋíba", english: "unpublished", arabic: "غير منشور", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Jáŋúŋó", english: "updated", arabic: "التحديث", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Taraas Ja̱gɨ́l", english: "Overview", arabic: "نظرة عامة", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Ká̠ba̠j’íŋ ótáŋá", english: "File information", arabic: "معلومات الملف", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Ká̠ba̠j", english: "File", arabic: "ملف", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Ósom", english: "Tag", arabic: "وسم", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Ká̠ba̠j’íŋ dorá", english: "File path", arabic: "مسار الملف", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Juuŋa irikwǎ", english: "Advanced options", arabic: "الخيارات المتقدمة", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Dééŋ a̱rɨ́’ŋ sabba", english: "Release notes", arabic: "ملاحظات النسخة", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Jǎŋo", english: "Edit", arabic: "تصحيح / تحرير", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Sime", english: "Date", arabic: "التاريخ", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Niin", english: "Size", arabic: "الحجم", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Jɨrgɨ́ŋóŋá", english: "Links", arabic: "روابط", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Jɨrgɨ́ŋó", english: "Search", arabic: "بحث", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Tesjáa", english: "Reset", arabic: "إعادة الضبط", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Kérrég", english: "Daily", arabic: "يوميًا", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Kóllíŋ-le", english: "Weekly", arabic: "أسبوعيًا", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Dúwal-le", english: "Monthly", arabic: "شهرياً", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "A̱rɨ á-iba", english: "None", arabic: "لا شيء", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Díígás jaa", english: "Use count", arabic: "استخدام العد", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Tesjáa’ŋ jawar", english: "Display settings", arabic: "إعدادات العرض", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "In ájé ka̱rɨ́’ŋ jawŋí ás keba", english: "This action cannot be undone.", arabic: "لا يمكن التراجع عن هذة العملية.", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Ja̱rɨ́ŋa’ŋ jǎŋo", english: "taxonomy terms", arabic: "مصطلحات التصنيف", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Kirre.", english: "Test", arabic: "الاختبار", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Jɨɨ́lo", english: "Number", arabic: "رقم", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Domoŋ", english: "Message", arabic: "الرسالة", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Domoŋ dɨwwô á keba", english: "No log messages available.", arabic: "لا توجد رسائل سجل.", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Saŋal’íŋ kona", english: "Account Name", arabic: "اسم الحساب", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "kitíbiskí", english: "Password", arabic: "كلمة المرور", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Geraŋa’ŋ tesjáa", english: "Block settings", arabic: "إعدادات الصناديق", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "á-keba", english: "- None -", arabic: "- لا شيء -", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Ba̱rʉ", english: "Country", arabic: "الدولة", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Dɨrrɨŋ", english: "Weight", arabic: "الوزن", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Tesjáa-sís jɨ́bé", english: "The configuration options have been saved.", arabic: "تم حفظ خيارات الضبط.", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Ja̱ɨŋó", english: "Variable", arabic: "متغير", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] },
      { fur: "Jɨrgɨ́ŋó", english: "Link", arabic: "رابط", pronunciation: "", partOfSpeech: "", definition: "", examples: [], related: [] }
    ],
    []
  );

  // ---------------------
  // CATEGORIES and KEYWORDS
  // ---------------------
  const categories = useMemo(() => ["Family", "Food", "Nature", "Body", "Colors", "Numbers"], []);

  // original keywords (readable). We'll normalize them below before matching.
  const categoryKeywords: Record<string, string[]> = {
    Family: ["mother", "father", "brother", "sister", "family", "أم", "أب", "أخ", "أخت"],
    Food: ["food", "eat", "rice", "bread", "meat", "أكل", "أرز", "خبز", "لحم", "فواكه"],
    Nature: ["sun", "river", "tree", "mountain", "sea", "شمس", "نهر", "شجرة", "جبل", "بحر"],
    Body: ["head", "hand", "eye", "heart", "body", "رأس", "يد", "عين", "قلب", "متن"],
    Colors: ["red", "blue", "green", "black", "white", "أحمر", "أزرق", "أخضر", "أسود", "أبيض"],
    Numbers: ["one", "two", "three", "four", "واحد", "اثنان", "ثلاثة", "أربعة"]
  };

  // ---------------------
  // Normalization helpers (strip accents & Arabic diacritics, remove punctuation, lowercase)
  // ---------------------
  function normalizeForMatch(s?: string) {
    if (!s) return "";
    // 1) Unicode normalize and remove Latin combining diacritics (accents)
    let out = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // 2) Remove common Arabic diacritics (Tashkeel & others)
    out = out.replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g, "");
    // 3) Normalize different apostrophes/quotes to single quote (useful in Fur)
    out = out.replace(/[‘’‚‛`´]/g, "'");
    // 4) Remove characters that are not Latin, Arabic, numbers, space, hyphen, apostrophe
    out = out.replace(/[^0-9A-Za-z\u0600-\u06FF\s'-]/g, " ");
    // 5) Collapse whitespace and lowercase
    out = out.replace(/\s+/g, " ").trim().toLowerCase();
    return out;
  }

  // Pre-normalize keywords for speed
  const normalizedCategoryKeywords = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const cat of Object.keys(categoryKeywords)) {
      map[cat] = (categoryKeywords[cat] || []).map(k => normalizeForMatch(k)).filter(Boolean);
    }
    return map;
  }, [categoryKeywords]);

  // ---------------------
  // Build entriesByCategory using normalized matching
  // ---------------------
  const entriesByCategory = useMemo(() => {
    const map: Record<string, Entry[]> = {};
    for (const cat of categories) map[cat] = [];

    for (const entry of dictionaryEntries) {
      const hay = normalizeForMatch(`${entry.english || ""} ${entry.fur || ""} ${entry.arabic || ""}`);
      for (const cat of categories) {
        const keys = normalizedCategoryKeywords[cat] || [];
        if (keys.some(k => k && hay.includes(k))) {
          map[cat].push(entry);
        }
      }
    }
    return map;
  }, [dictionaryEntries, categories, normalizedCategoryKeywords]);

  // ---------------------
  // Visible list (category + search)
  // ---------------------
  const visibleList = useMemo(() => {
    let list = dictionaryEntries;
    if (activeCategory) list = entriesByCategory[activeCategory] ?? [];
    if (query && query.trim()) {
      const q = normalizeForMatch(query);
      return list.filter((e) => {
        const hay = normalizeForMatch(`${e.fur || ""} ${e.english || ""} ${e.arabic || ""}`);
        return hay.includes(q);
      });
    }
    return list;
  }, [dictionaryEntries, activeCategory, entriesByCategory, query]);

  // ---------------------
  // Speak Fur (browser TTS)
  // ---------------------
  function speakFur(entry: Entry, idx: number) {
    const key = `${entry.fur || entry.english}-${idx}`;
    if (speakingKey === key) {
      try { window.speechSynthesis.cancel(); } catch {}
      setSpeakingKey(null);
      utterRef.current = null;
      return;
    }
    try { window.speechSynthesis.cancel(); } catch {}

    const text = entry.fur || entry.arabic || entry.english || "";
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    u.pitch = 1;
    u.onstart = () => { utterRef.current = u; setSpeakingKey(key); };
    u.onend = () => { utterRef.current = null; setSpeakingKey(null); };
    u.onerror = () => { utterRef.current = null; setSpeakingKey(null); console.error("SpeechSynthesis error"); };
    try { window.speechSynthesis.speak(u); } catch (err) { console.error("speak failed", err); }
  }

  function handleCategoryClick(cat: string) {
    if (activeCategory === cat) setActiveCategory(null);
    else setActiveCategory(cat);
    setSelectedEntry(null);
    setQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---------------------
  // Render
  // ---------------------
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Fur — English — Arabic Dictionary</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Click a category to view words derived from the words on this page. Search filters results.
          </p>
        </div>

        {/* Search & controls */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder={activeCategory ? `Search ${activeCategory}...` : "Search in Fur / English / Arabic..."}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-center space-x-4 text-sm mt-4">
            <button className="flex items-center text-teal-700 hover:text-teal-800">
              <Filter className="w-4 h-4 mr-1" />
              Advanced Search
            </button>
            <span className="text-gray-300">|</span>
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={() => {
                const r = dictionaryEntries[Math.floor(Math.random() * dictionaryEntries.length)];
                setSelectedEntry(r);
              }}
            >
              Random Word
            </button>
          </div>
        </div>

        {/* Category buttons */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`p-4 rounded-lg border shadow-sm text-center transition ${activeCategory === cat ? "bg-teal-600 text-white" : "bg-white text-gray-800"}`}
            >
              <div className="font-medium">{cat}</div>
              <div className="text-sm mt-1">{(entriesByCategory[cat] || []).length} words</div>
            </button>
          ))}
        </div>

        {/* Category panel */}
        {activeCategory ? (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{activeCategory} <span className="text-gray-500 text-base">({(entriesByCategory[activeCategory] || []).length})</span></h2>
              <div>
                <button onClick={() => { setActiveCategory(null); setQuery(""); }} className="px-3 py-1 bg-white border rounded mr-2">Clear</button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {(entriesByCategory[activeCategory] && entriesByCategory[activeCategory].length > 0) ? (
                entriesByCategory[activeCategory].map((e, i) => (
                  <div key={`${e.fur}-${i}`} className="bg-white rounded-lg border p-4 text-center">
                    <div className="text-xl font-semibold">{e.fur}</div>
                    <div className="text-sm text-gray-600">{e.english}</div>
                    <div className="mt-3 flex items-center justify-center gap-2">
                      <button onClick={() => speakFur(e, i)} className="px-2 py-1 bg-teal-50 rounded border text-teal-700 text-sm">Play</button>
                      <button onClick={() => setSelectedEntry(e)} className="px-2 py-1 bg-gray-50 rounded border text-gray-700 text-sm">Open</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full bg-white rounded-lg border p-6 text-center text-gray-600">
                  No words found for <strong>{activeCategory}</strong> in the current page data.
                  <div className="mt-3 text-sm">Add relevant entries into the <code>dictionaryEntries</code> array to populate this category.</div>
                </div>
              )}
            </div>
          </div>
        ) : null}

        {/* Word list */}
        <div className="space-y-6">
          {visibleList.map((entry, idx) => (
            <div key={`${entry.fur}-${idx}`} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-3xl font-bold text-gray-900 mr-4">{entry.fur}</h3>
                    <button onClick={() => speakFur(entry, idx)} className="text-teal-700 hover:text-teal-800 mr-3" title="Play Fur">
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-4 mb-3">
                    <span className="text-lg text-gray-700 font-medium">{entry.english}</span>
                    <span className="text-sm text-gray-500 italic">{entry.pronunciation ? `/${entry.pronunciation}/` : ""}</span>
                    {entry.partOfSpeech ? <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full">{entry.partOfSpeech}</span> : null}
                  </div>
                </div>

                <div className="ml-4">
                  <button className="text-gray-400 hover:text-yellow-500" onClick={() => setSelectedEntry(entry)}>
                    <Star className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {entry.definition ? <p className="text-gray-600 mb-4">{entry.definition}</p> : null}

              {entry.examples && entry.examples.length > 0 ? (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Examples:</h4>
                  <ul className="space-y-1">
                    {entry.examples.map((ex, i) => (
                      <li key={i} className="text-gray-600 text-sm flex items-center">
                        <span className="w-2 h-2 bg-teal-700 rounded-full mr-3" />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ))}

          {visibleList.length === 0 && (
            <div className="bg-white rounded-lg border p-6 text-center text-gray-600">
              No words match your search / category. Try clearing the search or adding entries to the page array.
            </div>
          )}
        </div>

        {/* Selected entry modal */}
        {selectedEntry && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold">{selectedEntry.fur}</h3>
                  <div className="text-sm text-gray-600">{selectedEntry.english}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => speakFur(selectedEntry, 0)} className="px-3 py-1 bg-teal-50 rounded border text-teal-700">Play</button>
                  <button onClick={() => setSelectedEntry(null)} className="px-3 py-1 bg-white border rounded">Close</button>
                </div>
              </div>

              {selectedEntry.definition ? <p className="mb-4 text-gray-700">{selectedEntry.definition}</p> : null}
              {selectedEntry.examples && selectedEntry.examples.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium">Examples</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {selectedEntry.examples.map((ex, i) => <li key={i}>{ex}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="bg-teal-50 rounded-lg p-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Dictionary Statistics</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-teal-700">{dictionaryEntries.length}</div>
              <div className="text-gray-600">Total Words (on this page)</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-700">—</div>
              <div className="text-gray-600">With Audio (use local /audio or TTS)</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-700">—</div>
              <div className="text-gray-600">With Examples</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-700">{categories.length}</div>
              <div className="text-gray-600">Categories</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
