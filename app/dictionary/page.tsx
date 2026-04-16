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
      { fur: "Jasi", english: "Disable", arabic: "تعطيل" },
      { fur: "Magara", english: "Article", arabic: "مقال" },
      { fur: "Ee", english: "Yes", arabic: "نعم" },
      { fur: "Saŋgala", english: "Pages", arabic: "الصفحات" },
      { fur: "Rimmeŋ", english: "Register", arabic: "التسجيل" },
      { fur: "Tááríŋá", english: "Operations", arabic: "عمليات" },
      { fur: "Belé", english: "Language", arabic: "اللغة" },
      { fur: "Jawar", english: "View", arabic: "عرض" }
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

    // ✅ Fur characters mapping
    out = out
      .replace(/ŋ/g, "n")
      .replace(/ɨ/g, "i")
      .replace(/ʉ/g, "u")
      .replace(/ɛ/g, "e");

    // Remove unwanted chars
    out = out.replace(/[^0-9A-Za-z\u0600-\u06FF\s'-]/g, " ");

    return out.replace(/\s+/g, " ").trim().toLowerCase();
  }

  // ---------------------
  // 🔥 AUDIO FILE NAME FIX
  // ---------------------
  function getAudioFileName(fur?: string) {
    if (!fur) return "";

    return normalizeForMatch(fur)
      .replace(/\s+/g, "") // remove spaces
      .replace(/'/g, "");  // remove quotes
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