"use client"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Target, Award, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

const translations = {
  en: {
    heroTitle: "Fur Language Literacy Programs",
    heroDesc: "Empowering our community through comprehensive literacy education. Building reading, writing, and communication skills in the Fur language.",
    literacyProgramsTitle: "Our Literacy Programs",
    learningResourcesTitle: "Learning Resources",
    ctaTitle: "Join Our Literacy Community",
    ctaDesc: "Start your literacy journey today and help preserve the Fur language for future generations.",
    literacyPrograms: [
      {
        title: "Adult Literacy Program",
        description: "Comprehensive reading and writing program for adults",
        level: "Beginner to Advanced",
        duration: "6 months",
        participants: "150+ enrolled",
        skills: ["Reading comprehension", "Writing skills", "Vocabulary building", "Grammar basics"]
      },
      {
        title: "Children's Literacy Initiative",
        description: "Fun and engaging literacy program for children aged 6-12",
        level: "Elementary",
        duration: "Ongoing",
        participants: "200+ children",
        skills: ["Phonics", "Story reading", "Creative writing", "Oral communication"]
      },
      {
        title: "Community Reading Circles",
        description: "Group reading sessions with traditional Fur stories and texts",
        level: "All levels",
        duration: "Weekly sessions",
        participants: "50+ members",
        skills: ["Group discussion", "Cultural literacy", "Critical thinking", "Public speaking"]
      },
    ],
    literacyStats: [
      { label: "Active Learners", value: "400+", icon: Users },
      { label: "Completion Rate", value: "85%", icon: Award },
      { label: "Weekly Sessions", value: "12", icon: Clock },
      { label: "Success Stories", value: "120+", icon: CheckCircle },
    ],
    learningResources: [
      {
        category: "Reading Materials",
        items: [
          "Fur Language Primer",
          "Traditional Folk Tales Collection",
          "Modern Fur Literature",
          "Children's Picture Books",
          "Adult Learning Workbooks",
        ]
      },
      {
        category: "Writing Exercises",
        items: [
          "Letter Formation Practice",
          "Word Building Activities",
          "Sentence Construction",
          "Paragraph Writing",
          "Creative Writing Prompts",
        ]
      },
      {
        category: "Assessment Tools",
        items: [
          "Reading Comprehension Tests",
          "Writing Skill Evaluations",
          "Progress Tracking Sheets",
          "Vocabulary Assessments",
          "Oral Communication Rubrics",
        ]
      }
    ],
    buttons: {
      startLearning: "Start Learning",
      getUpdates: "Get Updates",
      learnMore: "Learn More"
    }
  },
  ar: {
    heroTitle: "برامج محو الأمية بلغة الفور",
    heroDesc: "تمكين مجتمعنا من خلال تعليم شامل لمحو الأمية. بناء مهارات القراءة والكتابة والتواصل باللغة الفور.",
    literacyProgramsTitle: "برامج محو الأمية الخاصة بنا",
    learningResourcesTitle: "موارد التعلم",
    ctaTitle: "انضم إلى مجتمعنا لمحو الأمية",
    ctaDesc: "ابدأ رحلة تعلمك اليوم وساعد في الحفاظ على لغة الفور للأجيال القادمة.",
    literacyPrograms: [
      {
        title: "برنامج محو الأمية للكبار",
        description: "برنامج شامل للقراءة والكتابة للكبار",
        level: "مبتدئ إلى متقدم",
        duration: "6 أشهر",
        participants: "150+ مشارك",
        skills: ["فهم القراءة", "مهارات الكتابة", "توسيع المفردات", "أساسيات القواعد"]
      },
      {
        title: "مبادرة محو الأمية للأطفال",
        description: "برنامج ممتع وجذاب للأطفال من عمر 6-12 سنة",
        level: "ابتدائي",
        duration: "مستمر",
        participants: "200+ طفل",
        skills: ["الصوتيات", "قراءة القصص", "الكتابة الإبداعية", "التواصل الشفهي"]
      },
      {
        title: "دوائر القراءة المجتمعية",
        description: "جلسات قراءة جماعية مع قصص ونصوص تقليدية بلغة الفور",
        level: "جميع المستويات",
        duration: "جلسات أسبوعية",
        participants: "50+ عضو",
        skills: ["النقاش الجماعي", "المحو الأمية الثقافية", "التفكير النقدي", "التحدث أمام الجمهور"]
      },
    ],
    literacyStats: [
      { label: "المتعلمون النشطون", value: "400+", icon: Users },
      { label: "معدل الإتمام", value: "85%", icon: Award },
      { label: "الجلسات الأسبوعية", value: "12", icon: Clock },
      { label: "قصص النجاح", value: "120+", icon: CheckCircle },
    ],
    learningResources: [
      {
        category: "مواد القراءة",
        items: [
          "مقدمة بلغة الفور",
          "مجموعة القصص الشعبية التقليدية",
          "الأدب الفور الحديث",
          "كتب الأطفال المصورة",
          "كتب العمل للكبار"
        ]
      },
      {
        category: "تمارين الكتابة",
        items: [
          "تمارين تشكيل الحروف",
          "أنشطة بناء الكلمات",
          "تركيب الجمل",
          "كتابة الفقرات",
          "تمارين الكتابة الإبداعية"
        ]
      },
      {
        category: "أدوات التقييم",
        items: [
          "اختبارات فهم القراءة",
          "تقييم مهارات الكتابة",
          "جداول متابعة التقدم",
          "تقييم المفردات",
          "معايير التواصل الشفهي"
        ]
      }
    ],
    buttons: {
      startLearning: "ابدأ التعلم",
      getUpdates: "الحصول على التحديثات",
      learnMore: "اعرف المزيد"
    }
  },
  fur: {
    heroTitle: "Daali Fur Nyɔɔr Keriŋo Programs",
    heroDesc: "Kaŋa nyɔɔr raŋa nyɔɔr keriŋo daali laŋa. Nyɔɔr taŋa nyɔɔr keriŋo daali laŋa raŋa fúli Fur.",
    literacyProgramsTitle: "Daali Nyɔɔr Keriŋo Programs",
    learningResourcesTitle: "Daali Nyɔɔr Keriŋo Resources",
    keySkillsTitle: "Nyɔɔr Skills Taŋa:",
    ctaTitle: "Daali Community raŋa nyɔɔr",
    ctaDesc: "Taŋa nyɔɔr keriŋo journey kaŋa fúli Fur daali laŋa, nyɔɔr taŋa daali nyɔɔr.",
    literacyPrograms: [
      {
        title: "Nyɔɔr Keriŋo Adults Program",
        description: "Kaŋa nyɔɔr raŋa nyɔɔr keriŋo adults laŋa",
        level: "Kóŋgo ta Gáŋgo",
        duration: "6 months",
        participants: "150+ raŋa enrolled",
        skills: ["Taŋa reading nyɔɔr", "Taŋa writing nyɔɔr", "Taŋa vocabulary nyɔɔr", "Taŋa grammar nyɔɔr"]
      },
      {
        title: "Nyɔɔr Keriŋo Children Program",
        description: "Kaŋa nyɔɔr fun nyɔɔr keriŋo children 6-12 laŋa",
        level: "Elementary",
        duration: "Ongoing",
        participants: "200+ raŋa children",
        skills: ["Taŋa phonics", "Taŋa story reading", "Taŋa creative writing", "Taŋa oral communication"]
      },
      {
        title: "Community Reading Circles",
        description: "Kaŋa nyɔɔr group reading raŋa nyɔɔr traditional Fur stories",
        level: "Kóŋgo ta Gáŋgo",
        duration: "Weekly sessions",
        participants: "50+ raŋa members",
        skills: ["Taŋa group discussion", "Taŋa cultural literacy", "Taŋa critical thinking", "Taŋa public speaking"]
      }
    ],
    literacyStats: [
      { label: "Nyɔɔr Active Learners", value: "400+", icon: Users },
      { label: "Nyɔɔr Completion Rate", value: "85%", icon: Award },
      { label: "Nyɔɔr Weekly Sessions", value: "12", icon: Clock },
      { label: "Nyɔɔr Success Stories", value: "120+", icon: CheckCircle },
    ],
    learningResources: [
      {
        category: "Reading Materials",
        items: [
          "Fur Nyɔɔr Primer",
          "Traditional Fur Stories Collection",
          "Modern Fur Literature",
          "Children Nyɔɔr Picture Books",
          "Adult Nyɔɔr Workbooks"
        ]
      },
      {
        category: "Writing Exercises",
        items: [
          "Letter Nyɔɔr Practice",
          "Word Nyɔɔr Building",
          "Sentence Nyɔɔr Making",
          "Paragraph Nyɔɔr Writing",
          "Creative Nyɔɔr Writing"
        ]
      },
      {
        category: "Assessment Tools",
        items: [
          "Reading Nyɔɔr Tests",
          "Writing Nyɔɔr Evaluations",
          "Progress Nyɔɔr Sheets",
          "Vocabulary Nyɔɔr Tests",
          "Oral Communication Nyɔɔr Rubrics"
        ]
      }
    ],
    buttons: {
      startLearning: "Taŋa Nyɔɔr Learning",
      getUpdates: "Taŋa Nyɔɔr Updates",
      learnMore: "Taŋa Nyɔɔr More"
    }
  }
  
}

export default function LiteracyPage() {
  const [lang, setLang] = useState<"en" | "ar" | "fur">("en")
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")

  useEffect(() => {
    setDir(lang === "ar" ? "rtl" : "ltr")
  }, [lang])

  const t = translations[lang]
  const literacyPrograms = t.literacyPrograms
  const literacyStats = t.literacyStats
  const learningResources = t.learningResources

  return (
    <div className="min-h-screen bg-gray-50" dir={dir}>
      <Header />

      <main className="container mx-auto px-6 py-8">
        {/* Language Switcher */}
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

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.heroTitle}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.heroDesc}</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {literacyStats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <stat.icon className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Literacy Programs */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t.literacyProgramsTitle}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {literacyPrograms.map((program, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-teal-600" />
                    {program.title}
                  </CardTitle>
                  <CardDescription>{program.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{program.level}</Badge>
                      <Badge variant="outline">{program.duration}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      {program.participants}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Key Skills Covered:</h4>
                      <ul className="space-y-1">
                        {program.skills.map((skill, skillIndex) => (
                          <li key={skillIndex} className="flex items-center gap-2 text-sm">
                            <Target className="w-3 h-3 text-teal-600" />
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className="w-full mt-4" asChild>
                      <Link href="/literacy-materials">{t.buttons.learnMore}</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Learning Resources */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t.learningResourcesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learningResources.map((resource, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{resource.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {resource.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-teal-700 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t.ctaTitle}</h2>
          <p className="text-xl mb-6 text-teal-100">{t.ctaDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/literacy-materials/basic">{t.buttons.startLearning}</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-teal-700 bg-transparent"
              asChild
            >
              <Link href="/newsletters">{t.buttons.getUpdates}</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
