"use client";

import React, { useState } from "react";

interface ContentData {
  title: string;
  text: string;
}

type Language = "en" | "ar" | "fur";

const contentData: Record<Language, Record<string, ContentData>> = {
  en: {
    opinions: { title: 'Opinions & Analysis', text: 'In this section, we provide analytical articles and expert opinions...' },
    regional: { title: 'Regional News', text: 'This section covers the latest developments in the Horn of Africa...' },
    international: { title: 'International News', text: 'Our international news section offers global coverage...' },
    local: { title: 'Local News', text: 'Here we focus on local news from all states of Sudan...' },
    news: { title: 'News', text: 'General news section providing fast, comprehensive coverage...' },
    investigations: { title: 'Investigations & Reports', text: 'In-depth investigative journalism and reports...' },
    democracy: { title: 'Civil Transition & Democracy', text: 'Coverage of Sudan’s democratic transition...' },
    culture: { title: 'Culture & Society', text: 'Celebrates Sudan’s cultural diversity, arts, music...' },
    youth: { title: 'Youth & Participation', text: 'Focuses on the role of youth in building Sudan’s future...' },
    media: { title: 'Video & Podcast', text: 'Our multimedia platform offers interviews, talk shows...' },
    'hate-speech': { title: 'Combating Hate Speech', text: 'Committed to fighting hate speech and promoting tolerance...' },
  },
  ar: {
    opinions: { title: 'آراء وتحليلات', text: 'في هذا القسم، نقدم مجموعة متنوعة من المقالات التحليلية والآراء...' },
    regional: { title: 'أخبار المنطقة', text: 'يغطي هذا القسم أحدث التطورات في القرن الإفريقي...' },
    international: { title: 'أخبار دولية', text: 'يوفر قسم الأخبار الدولية تغطية شاملة للأحداث العالمية...' },
    local: { title: 'أخبار محلية', text: 'نركز هنا على الأخبار المحلية من جميع ولايات السودان...' },
    news: { title: 'الأخبار', text: 'قسم الأخبار العامة لتغطية الأحداث والتطورات الأخيرة...' },
    investigations: { title: 'تحقيقات وتقارير', text: 'صحافة استقصائية متعمقة وتقارير خاصة...' },
    democracy: { title: 'الانتقال المدني والديمقراطية', text: 'تغطية الانتقال الديمقراطي في السودان...' },
    culture: { title: 'الثقافة والمجتمع', text: 'يحتفل هذا القسم بتنوع السودان الثقافي والفني...' },
    youth: { title: 'الشباب والمشاركة', text: 'يركز على دور الشباب في بناء مستقبل السودان...' },
    media: { title: 'فيديو وبودكاست', text: 'يوفر منصتنا الإعلامية محتوى متنوع مثل المقابلات...' },
    'hate-speech': { title: 'مكافحة خطاب الكراهية', text: 'ملتزمون بمكافحة خطاب الكراهية وتعزيز التسامح...' },
  },
  fur: {
    opinions: { title: 'Laabu & Daalal', text: 'E joo, kaŋ koomi waale daalal e laabu kaŋ...' },
    regional: { title: 'Furni Wuro', text: 'E kaŋ kaŋ koomi wuro daanga fuu nji Darfur...' },
    international: { title: 'Furni Diinee', text: 'E kaŋ kaŋ furni diinee fuu nji Africa...' },
    local: { title: 'Furni Maali', text: 'E kaŋ kaŋ furni maali wuro daanga fuu nji Sudan...' },
    news: { title: 'Furni', text: 'Furni kaŋ koomi laabu kaŋ daanga e leemi...' },
    investigations: { title: 'Daalal & Buura', text: 'E kaŋ koomi daalal e buura nji Sudan...' },
    democracy: { title: 'Laabu e Civili', text: 'E kaŋ kaŋ civili e laabu nji Sudan...' },
    culture: { title: 'Fur & Laabu', text: 'E kaŋ kaŋ wuro kaŋ laabu fuu arts, music...' },
    youth: { title: 'Juuth e Koomi', text: 'E kaŋ kaŋ juuth daanga koomi Sudan...' },
    media: { title: 'Video & Podcast', text: 'E kaŋ kaŋ platform video e podcast...' },
    'hate-speech': { title: 'Yidi Hate Speech', text: 'E kaŋ kaŋ yidi hate speech e kaŋ laabu...' },
  }
};

const categories = [
  { key: 'opinions', label: 'Opinions & Analysis' },
  { key: 'regional', label: 'Regional News' },
  { key: 'international', label: 'International News' },
  { key: 'local', label: 'Local News' },
  { key: 'news', label: 'News' },
  { key: 'investigations', label: 'Investigations & Reports' },
  { key: 'democracy', label: 'Civil Transition & Democracy' },
  { key: 'culture', label: 'Culture & Society' },
  { key: 'youth', label: 'Youth & Participation' },
  { key: 'media', label: 'Video & Podcast' },
  { key: 'hate-speech', label: 'Combating Hate Speech' },
];

const NewslettersPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>("en");

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f9f9f9", minHeight: "100vh", padding: "20px" }}>
      
      {/* Language Selector */}
      <div style={{ marginBottom: 20, display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <button onClick={() => setLanguage("en")} style={{ padding: "5px 15px", cursor: "pointer", background: language === "en" ? "#3498db" : "#ecf0f1", color: language === "en" ? "#fff" : "#2c3e50", borderRadius: 5 }}>English</button>
        <button onClick={() => setLanguage("ar")} style={{ padding: "5px 15px", cursor: "pointer", background: language === "ar" ? "#3498db" : "#ecf0f1", color: language === "ar" ? "#fff" : "#2c3e50", borderRadius: 5 }}>العربية</button>
        <button onClick={() => setLanguage("fur")} style={{ padding: "5px 15px", cursor: "pointer", background: language === "fur" ? "#3498db" : "#ecf0f1", color: language === "fur" ? "#fff" : "#2c3e50", borderRadius: 5 }}>Fur</button>
      </div>

      {/* Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <div style={{ display: "flex", gap: "5px" }}>
          <div style={{ width: 20, height: 20, backgroundColor: "#1f2d3d", borderRadius: 3 }}></div>
          <div style={{ width: 20, height: 20, backgroundColor: "#1f2d3d", borderRadius: 3 }}></div>
          <div style={{ width: 20, height: 20, backgroundColor: "#1f2d3d", borderRadius: 3 }}></div>
          <div style={{ width: 20, height: 20, backgroundColor: "#1f2d3d", borderRadius: 3 }}></div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: "bold" }}>Sudanese Civil Media Network (CMN)</div>
          <div style={{ fontSize: 12, color: "#7f8c8d" }}>by MR: Bashr Ismail</div>
        </div>
      </header>

      {/* Banner */}
      <div style={{ display: "flex", justifyContent: "space-between", background: "linear-gradient(90deg, #e74c3c, #c0392b)", borderRadius: "0 0 0 100px", padding: "30px", color: "#fff", marginBottom: "40px" }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: "bold" }}>Voice of Truth in Dark Times</h1>
          <p>Electronic newspaper published by Sudanese Civil Media Network</p>
        </div>
        <div style={{ backgroundColor: "#fff", color: "#c0392b", padding: "20px", borderRadius: 10, minWidth: "180px", textAlign: "center" }}>
          <div style={{ fontSize: 12 }}>Al-Tanwir Newspaper</div>
          <div style={{ fontSize: 20, fontWeight: "bold", margin: "10px 0" }}>Al-Tanwir</div>
          <div style={{ fontSize: 12 }}>Voice of Truth in Dark Times</div>
        </div>
      </div>

      {/* Categories */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginBottom: "40px" }}>
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            style={{
              padding: "10px 25px",
              borderRadius: 50,
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              background: activeCategory === cat.key ? "#d89600" : "#f1b600",
              color: "#fff",
              transition: "all 0.3s ease"
            }}
          >
            {language === "ar" ? contentData.ar[cat.key].title : language === "fur" ? contentData.fur[cat.key].title : cat.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ backgroundColor: "#fff", padding: "30px", borderRadius: 20, minHeight: "200px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
        {activeCategory ? (
          <>
            <h2 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 15 }}>
              {contentData[language][activeCategory].title}
            </h2>
            <p style={{ lineHeight: 1.8, color: "#34495e" }}>
              {contentData[language][activeCategory].text}
            </p>
          </>
        ) : (
          <h2 style={{ textAlign: "center", fontSize: 24, fontWeight: "bold", color: "#2c3e50" }}>
            {language === "ar" ? "مقالة تجريبية" : language === "fur" ? "Laabu Taal" : "Test News Article"}
          </h2>
        )}
      </div>
    </div>
  );
};

export default NewslettersPage;
