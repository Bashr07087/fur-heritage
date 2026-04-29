// app/dictionary/page.tsx
"use client";

import React, { useMemo, useRef, useState } from "react";
import { Header } from "../../components/header";
import { Search, Volume2, Filter, Star } from "lucide-react";

type Entry = {
  fur?: string;
  english?: string;
  arabic?: string;
};

export default function DictionaryPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [query, setQuery] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [speakingKey, setSpeakingKey] = useState<string | null>(null);

  // ---------------------
  // DATA
  // ---------------------
  const dictionaryEntries: Entry[] = useMemo(
    () => [
      { fur: "Ása", english: "dog", arabic: "كلب" },
      { fur: "Dóga", english: "hen", arabic: "دجاجة" },
      { fur: "Ee", english: "Yes", arabic: "نعم" },
      { fur: "Biís", english: "cat", arabic: "قطة" },
      { fur: "Díg", english: "one", arabic: "واحد" },
      { fur: "Ǎ̱w", english: "two", arabic: "اثنان" },
      { fur: "Ɨ́ss", english: "three", arabic: "ثلاثة" },
      { fur: "Óŋal", english: "four", arabic: "أربعة" },
      { fur: "Óss", english: "five", arabic: "خمسة" },
      { fur: "Ósaŋdíg", english: "six", arabic: "ستة" },
      { fur: "Ósaŋǎ̱w", english: "seven", arabic: "سبعة" },
      { fur: "Osaŋɨ́ss", english: "eight", arabic: "ثمانية" },
      { fur: "Osaŋóŋal", english: "nine", arabic: "تسعة" },
      { fur: "Wa̱yé", english: "ten", arabic: "عشرة" },
      { fur: "Wa̱yé na díg", english: "eleven", arabic: "أحد عشر" },
      { fur: "Wa̱yé na ǎ̱w", english: "twelve", arabic: "اثنا عشر" },
      { fur: "Wa̱yé na Ɨ́ss", english: "thirteen", arabic: "ثلاثة عشر" },
      { fur: "Wa̱yé na Óŋal", english: "fourteen", arabic: "أربعة عشر" },
      { fur: "Wa̱yé na Óss", english: "fifteen", arabic: "خمسة عشر" },
      { fur: "Wa̱yé na Ósaŋdíg", english: "sixteen", arabic: "ستة عشر" },
      { fur: "Wa̱yé na Ósaŋǎ̱w", english: "seventeen", arabic: "سبعة عشر" },
      { fur: "Wa̱yé na Osaŋɨ́ss", english: "eighteen", arabic: "ثمانية عشر" },
      { fur: "Wa̱yé na Osaŋóŋal", english: "nineteen", arabic: "تسعة عشر" },
      { fur: "Wa̱yé na Wa̱yé", english: "twenty", arabic: "عشرون" },
    ],
    []
  );

  // ---------------------
  // 🔥 NORMALIZATION (FIXED)
  // ---------------------
  function normalizeForMatch(s?: string) {
    if (!s) return "";

    let out = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Arabic diacritics
    out = out.replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g, "");

// Normalize quotes
out = out.replace(/[‘’‚‛`´]/g, "'");

// Fur characters mapping
out = out
  .replace(/Ɨ/g, "I")
  .replace(/ɨ/g, "i")
  .replace(/ŋ/g, "ng")
  .replace(/ʉ/g, "u")
  .replace(/ɛ/g, "e");

// Remove unwanted chars
out = out.replace(/[^0-9A-Za-z\u0600-\u06FF\s'-]/g, " ");

return out.replace(/\s+/g, " ").trim().toLowerCase();
}

// ---------------------
// AUDIO FILE NAME FIX
// ---------------------
function getAudioFileName(fur?: string) {
  if (!fur) return "";

  return normalizeForMatch(fur)
    .replace(/\s+/g, "")
    .replace(/'/g, "");
}
  // ---------------------
  // SEARCH
  // ---------------------
  const visibleList = useMemo(() => {
    if (!query.trim()) return dictionaryEntries;

    const q = normalizeForMatch(query);

    return dictionaryEntries.filter((e) => {
      const text = normalizeForMatch(
        `${e.fur || ""} ${e.english || ""} ${e.arabic || ""}`
      );
      return text.includes(q);
    });
  }, [query, dictionaryEntries]);

  // ---------------------
  // AUDIO FUNCTION
  // ---------------------
  function speakFur(entry: Entry, idx: number) {
    const key = `${entry.fur}-${idx}`;

    if (speakingKey === key) {
      audioRef.current?.pause();
      setSpeakingKey(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const fileName = getAudioFileName(entry.fur);
    const path = `/audio/${fileName}.mp3`;

    const audio = new Audio(path);
    audioRef.current = audio;

    audio.onplay = () => setSpeakingKey(key);
    audio.onended = () => setSpeakingKey(null);
    audio.onerror = () => {
      console.error("❌ Audio not found:", path);
      setSpeakingKey(null);
    };

    audio.play();
  }

  // ---------------------
  // UI
  // ---------------------
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 py-10">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Fur Dictionary
          </h1>
          <p className="text-gray-600">
            Fur — English — Arabic
          </p>
        </div>

        {/* Search */}
        <div className="bg-white p-6 rounded-lg shadow mb-8 max-w-2xl mx-auto relative">
          <Search className="absolute left-9 top-9 text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="flex justify-center mt-4 gap-4 text-sm">
            <button className="flex items-center text-teal-700">
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </button>

            <button
              onClick={() => {
                const r =
                  dictionaryEntries[
                    Math.floor(Math.random() * dictionaryEntries.length)
                  ];
                setSelectedEntry(r);
              }}
            >
              Random Word
            </button>
          </div>
        </div>

        {/* Word List */}
        <div className="space-y-6">
          {visibleList.map((entry, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow border">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold">
                      {entry.fur}
                    </h2>

                    <button
                      onClick={() => speakFur(entry, idx)}
                      className={`${
                        speakingKey === `${entry.fur}-${idx}`
                          ? "text-red-500 animate-pulse"
                          : "text-teal-700"
                      }`}
                    >
                      <Volume2 />
                    </button>
                  </div>

                  <p className="text-gray-700">{entry.english}</p>
                  <p className="text-gray-500">{entry.arabic}</p>
                </div>

                <button
                  onClick={() => setSelectedEntry(entry)}
                  className="text-gray-400 hover:text-yellow-500"
                >
                  <Star />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold mb-2">
                {selectedEntry.fur}
              </h2>
              <p>{selectedEntry.english}</p>
              <p className="text-gray-600 mb-4">
                {selectedEntry.arabic}
              </p>

              <button
                onClick={() => speakFur(selectedEntry, 0)}
                className="bg-teal-600 text-white px-4 py-2 rounded mr-2"
              >
                Play
              </button>

              <button
                onClick={() => setSelectedEntry(null)}
                className="border px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}