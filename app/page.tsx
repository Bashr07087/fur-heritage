"use client"
import Link from "next/link"
import { Header } from "@/components/header"
import { 
  BookOpen, Video, Users, Heart, Calendar, ImageIcon, 
  FileText, Globe, Languages, Scroll, Mail, Phone, Github, Facebook, Twitter
} from "lucide-react"
import { useTranslation } from "@/lib/i18n/hooks"

export default function HomePage() {
  const { t, isRTL } = useTranslation()

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
          {/* Literacy Materials */}
          <Link
            href="/literacy-materials"
            className="bg-white p-8 rounded-lg shadow-sm border hover:shadow-md transition-shadow block"
          >
            <BookOpen className="w-12 h-12 text-blue-700 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{t("home.literacy.title")}</h3>
            <p className="text-gray-600 mb-4">{t("home.literacy.description")}</p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Basic alphabet and pronunciation guides</li>
              <li>• Reading comprehension exercises</li>
              <li>• Writing practice worksheets</li>
            </ul>
          </Link>

          {/* Videos */}
          <Link
            href="/videos"
            className="bg-white p-8 rounded-lg shadow-sm border hover:shadow-md transition-shadow block"
          >
            <Video className="w-12 h-12 text-blue-700 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{t("home.videos.title")}</h3>
            <p className="text-gray-600 mb-4">{t("home.videos.description")}</p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Pronunciation tutorials</li>
              <li>• Grammar explanations</li>
              <li>• Conversation practice</li>
            </ul>
          </Link>

          {/* Dictionary */}
          <Link
            href="/dictionary"
            className="bg-white p-8 rounded-lg shadow-sm border hover:shadow-md transition-shadow block"
          >
            <Languages className="w-12 h-12 text-blue-700 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{t("home.dictionary.title")}</h3>
            <p className="text-gray-600 mb-4">{t("home.dictionary.description")}</p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Comprehensive word definitions</li>
              <li>• Grammar rules and patterns</li>
              <li>• Language structure analysis</li>
            </ul>
          </Link>

          {/* Poems */}
          <Link
            href="/poems"
            className="bg-white p-8 rounded-lg shadow-sm border hover:shadow-md transition-shadow block"
          >
            <Scroll className="w-12 h-12 text-blue-700 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{t("home.poems.title")}</h3>
            <p className="text-gray-600 mb-4">{t("home.poems.description")}</p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Traditional folk tales</li>
              <li>• Cultural poems and songs</li>
              <li>• Historical narratives</li>
            </ul>
          </Link>

          {/* Literacy Programs */}
          <Link
            href="/literacy"
            className="bg-white p-8 rounded-lg shadow-sm border hover:shadow-md transition-shadow block"
          >
            <Heart className="w-12 h-12 text-blue-700 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{t("literacy.title")}</h3>
            <p className="text-gray-600 mb-4">
              Comprehensive literacy programs for adults and children in the Fur language community.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• {t("literacy.adult_program")}</li>
              <li>• {t("literacy.child_program")}</li>
              <li>• {t("literacy.community_circles")}</li>
            </ul>
          </Link>

          {/* Newsletters */}
          <Link
            href="/newsletters"
            className="bg-white p-8 rounded-lg shadow-sm border hover:shadow-md transition-shadow block"
          >
            <Globe className="w-12 h-12 text-blue-700 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Wikipedia & News</h3>
            <p className="text-gray-600 mb-4">
              Stay updated with community news, cultural events, and access to Fur language Wikipedia content.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Community newsletters</li>
              <li>• Cultural event updates</li>
              <li>• Educational articles</li>
            </ul>
          </Link>
        </div>

        {/* Additional Resources */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-12">
          <h2 className={`text-2xl font-bold text-gray-900 mb-6 text-center ${isRTL ? "text-right" : "text-left"}`}>
            Additional Resources
          </h2>
          <div className={`grid md:grid-cols-4 gap-6 ${isRTL ? "text-right" : "text-left"}`}>
            <Link href="/gallery" className="text-center hover:bg-gray-50 p-4 rounded-lg transition-colors">
              <ImageIcon className="w-8 h-8 text-blue-700 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900 mb-1">Gallery</h4>
              <p className="text-sm text-gray-600">Cultural photos and visual content</p>
            </Link>
            <Link href="/calendar" className="text-center hover:bg-gray-50 p-4 rounded-lg transition-colors">
              <Calendar className="w-8 h-8 text-blue-700 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900 mb-1">Calendar</h4>
              <p className="text-sm text-gray-600">Cultural events and important dates</p>
            </Link>
            <Link href="/newsletters" className="text-center hover:bg-gray-50 p-4 rounded-lg transition-colors">
              <FileText className="w-8 h-8 text-blue-700 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900 mb-1">Newsletters</h4>
              <p className="text-sm text-gray-600">Regular updates and announcements</p>
            </Link>
            <div className="text-center">
              <Users className="w-8 h-8 text-blue-700 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900 mb-1">Community</h4>
              <p className="text-sm text-gray-600">Connect with other learners</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`bg-blue-700 text-white rounded-lg p-8 text-center ${isRTL ? "text-right" : "text-left"}`}>
          <h2 className="text-2xl font-bold mb-4">Start Your Fur Language Journey Today</h2>
          <p className="text-lg mb-6 opacity-90">
            Join our community of learners and help preserve this beautiful language for future generations.
          </p>
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
          <p className="text-sm">&copy; {new Date().getFullYear()} Fur Language Project. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="mailto:your-email@example.com" className="hover:text-white">
              <Mail className="w-5 h-5" />
            </a>
            <a href="tel:+123456789" className="hover:text-white">
              <Phone className="w-5 h-5" />
            </a>
            <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
