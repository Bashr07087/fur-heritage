"use client"
import Link from "next/link"
import { Header } from "@/components/header"
import { 
  BookOpen, Video, Languages, Scroll, Globe, Mail, Phone, Github, Facebook, Twitter
} from "lucide-react"
import { useTranslation } from "@/lib/i18n/hooks"

export default function HomePage() {
  const { t, isRTL } = useTranslation()

  // Main features data
  const features = [
    {
      href: "/literacy-materials",
      Icon: BookOpen,
      title: t("home.literacy.title"),
      description: t("home.literacy.description"),
      list: [
        t("literacy.adult_program"),
        t("literacy.child_program"),
        t("literacy.community_circles")
      ]
    },
    {
      href: "/videos",
      Icon: Video,
      title: t("home.videos.title"),
      description: t("home.videos.description"),
      list: [
        t("videos.language_lessons"),
        t("videos.cultural_content")
      ]
    },
    {
      href: "/dictionary",
      Icon: Languages,
      title: t("home.dictionary.title"),
      description: t("home.dictionary.description"),
      list: [
        t("dictionary.search_placeholder"),
        t("dictionary.grammar_rules"),
        t("dictionary.language_structure")
      ]
    },
    {
      href: "/poems",
      Icon: Scroll,
      title: t("home.poems.title"),
      description: t("home.poems.description"),
      list: [
        t("poems.folk_tales")
      ]
    },
    {
      href: "/newsletters",
      Icon: Globe,
      title: t("nav.newsletters"),
      description: t("home.newsletters_description"),
      list: []
    }
  ]

  // Footer links
  const footerLinks = [
    { href: "mailto:your-email@example.com", icon: Mail },
    { href: "tel:+123456789", icon: Phone },
    { href: "https://github.com/yourprofile", icon: Github },
    { href: "https://facebook.com", icon: Facebook },
    { href: "https://twitter.com", icon: Twitter }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 py-12 flex-grow">
        {/* Hero Section */}
        <div className={`text-center mb-16 ${isRTL ? "text-right" : "text-left"}`}>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{t("home.welcome")}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">{t("home.description")}</p>
          <Link
            href="/literacy-materials"
            className="bg-blue-700 text-white px-8 py-4 rounded-lg inline-block hover:bg-blue-800 transition-colors"
          >
            <p className="text-lg font-medium">{t("site.subtitle")}</p>
          </Link>
        </div>

        {/* Main Features Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 ${isRTL ? "text-right" : "text-left"}`}>
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="bg-white p-8 rounded-lg shadow-sm border hover:shadow-md transition-shadow block"
            >
              <feature.Icon className="w-12 h-12 text-blue-700 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              {feature.list.length > 0 && (
                <ul className="text-sm text-gray-500 space-y-1">
                  {feature.list.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              )}
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`bg-blue-700 text-white rounded-lg p-8 text-center ${isRTL ? "text-right" : "text-left"}`}>
          <h2 className="text-2xl font-bold mb-4">{t("home.cta_title")}</h2>
          <p className="text-lg mb-6 opacity-90">{t("home.cta_subtitle")}</p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? "sm:flex-row-reverse" : ""}`}>
            <Link
              href="/literacy-materials/basic"
              className="bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              {t("home.begin_literacy")}
            </Link>
            <Link
              href="/literacy-materials"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-700 transition-colors"
            >
              {t("home.explore_all")}
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} {t("site.title")}. {t("common.rights_reserved")}
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            {footerLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="hover:text-white"
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
