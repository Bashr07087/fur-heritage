import { Header } from "@/components/header"
import { Mail, Download, Search, Filter, Bell, Users, Globe } from "lucide-react"

export default function NewslettersPage() {
  const newsletterCategories = [
    { name: "Community News", count: 24, color: "bg-blue-100 text-blue-700" },
    { name: "Educational Updates", count: 18, color: "bg-green-100 text-green-700" },
    { name: "Cultural Events", count: 15, color: "bg-purple-100 text-purple-700" },
    { name: "Language Resources", count: 12, color: "bg-yellow-100 text-yellow-700" },
    { name: "Health & Wellness", count: 9, color: "bg-red-100 text-red-700" },
    { name: "Youth Programs", count: 8, color: "bg-teal-100 text-teal-700" },
  ]

  const newsletters = [
    {
      title: "Fur Language Revival Initiative - Monthly Update",
      subtitle: "Progress report on community language preservation efforts",
      date: "December 2024",
      category: "Educational Updates",
      excerpt:
        "This month we've seen remarkable progress in our language preservation efforts with over 500 new learners joining our programs. The digital literacy materials have been downloaded more than 10,000 times, and our video lessons are reaching communities across three countries.",
      highlights: [
        "500+ new language learners enrolled",
        "10,000+ digital resource downloads",
        "New partnership with UNESCO",
        "Youth language camps launched",
      ],
      author: "Fur Language Committee",
      readTime: "5 min read",
      downloads: 1250,
    },
    {
      title: "Cultural Heritage Festival 2024 - Event Recap",
      subtitle: "Celebrating Fur traditions and community unity",
      date: "November 2024",
      category: "Cultural Events",
      excerpt:
        "The annual Cultural Heritage Festival brought together over 2,000 community members for three days of traditional music, dance, storytelling, and cultural workshops. This year's theme 'Preserving Our Roots, Growing Our Future' highlighted the importance of passing traditions to younger generations.",
      highlights: [
        "2,000+ community participants",
        "50+ traditional performances",
        "Cultural workshops for children",
        "Traditional craft exhibitions",
      ],
      author: "Cultural Events Committee",
      readTime: "7 min read",
      downloads: 890,
    },
    {
      title: "Health Education Campaign Results",
      subtitle: "Community health awareness program outcomes",
      date: "October 2024",
      category: "Health & Wellness",
      excerpt:
        "Our health education campaign in Fur language has reached over 15,000 community members across rural and urban areas. The culturally-adapted health materials have significantly improved health knowledge and practices in participating communities.",
      highlights: [
        "15,000+ people reached",
        "85% improvement in health knowledge",
        "200+ health workers trained",
        "Materials translated into 3 dialects",
      ],
      author: "Community Health Team",
      readTime: "6 min read",
      downloads: 670,
    },
    {
      title: "New Digital Learning Platform Launch",
      subtitle: "Interactive online resources for Fur language learners",
      date: "September 2024",
      category: "Language Resources",
      excerpt:
        "We're excited to announce the launch of our new interactive digital learning platform featuring gamified lessons, progress tracking, and community features. The platform includes over 100 interactive exercises and connects learners worldwide.",
      highlights: [
        "100+ interactive exercises",
        "Progress tracking system",
        "Global learner community",
        "Mobile-friendly design",
      ],
      author: "Digital Education Team",
      readTime: "4 min read",
      downloads: 1450,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Newsletters</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay connected with the Fur language community through our regular newsletters featuring updates, events,
            educational resources, and cultural news.
          </p>
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-teal-700 text-white rounded-lg p-8 mb-8">
          <div className="max-w-2xl mx-auto text-center">
            <Mail className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="mb-6 opacity-90">
              Get the latest updates on Fur language resources, cultural events, and community news delivered to your
              inbox monthly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button className="bg-white text-teal-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm opacity-75 mt-4">Join 3,500+ community members already subscribed</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search newsletters by title, category, or content..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filter by Category
            </button>
          </div>
        </div>

        {/* Newsletter Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {newsletterCategories.map((category, index) => (
            <button
              key={index}
              className={`p-4 rounded-lg text-center hover:shadow-md transition-shadow ${category.color}`}
            >
              <div className="font-medium text-sm">{category.name}</div>
              <div className="text-xs opacity-75 mt-1">{category.count} issues</div>
            </button>
          ))}
        </div>

        {/* Newsletter List */}
        <div className="space-y-8">
          {newsletters.map((newsletter, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium mr-4 ${
                          newsletter.category === "Educational Updates"
                            ? "bg-green-100 text-green-700"
                            : newsletter.category === "Cultural Events"
                              ? "bg-purple-100 text-purple-700"
                              : newsletter.category === "Health & Wellness"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {newsletter.category}
                      </span>
                      <span className="text-sm text-gray-500">{newsletter.date}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{newsletter.title}</h2>
                    <p className="text-lg text-gray-600 mb-4">{newsletter.subtitle}</p>
                    <div className="flex items-center text-sm text-gray-500 space-x-4 mb-4">
                      <span>By {newsletter.author}</span>
                      <span>•</span>
                      <span>{newsletter.readTime}</span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        {newsletter.downloads} downloads
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-teal-700">
                      <Bell className="w-5 h-5" />
                    </button>
                    <button className="flex items-center px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </button>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">{newsletter.excerpt}</p>

                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Key Highlights</h3>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {newsletter.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="flex items-start">
                        <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-6 border-t">
                  <button className="text-teal-700 hover:text-teal-800 font-medium">Read Full Newsletter →</button>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <button className="hover:text-gray-700">Share</button>
                    <button className="hover:text-gray-700">Archive</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Archive */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Newsletter Archive</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-700 mb-2">86</div>
              <div className="text-gray-600">Total Issues Published</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-700 mb-2">3,500+</div>
              <div className="text-gray-600">Active Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-700 mb-2">25K+</div>
              <div className="text-gray-600">Total Downloads</div>
            </div>
          </div>
          <div className="text-center mt-6">
            <button className="text-teal-700 hover:text-teal-800 font-medium">Browse Complete Archive →</button>
          </div>
        </div>

        {/* Community Impact */}
        <div className="bg-teal-50 rounded-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Impact</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Global Reach</h3>
              <p className="text-gray-700 mb-4">
                Our newsletters reach Fur language communities across Sudan, Chad, and diaspora communities worldwide,
                helping maintain cultural connections and language preservation efforts.
              </p>
              <div className="flex items-center text-sm text-gray-600">
                <Globe className="w-4 h-4 mr-2" />
                Available in 15+ countries
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Community Engagement</h3>
              <p className="text-gray-700 mb-4">
                Regular newsletters have increased community participation in cultural events by 40% and improved
                awareness of educational resources and health programs.
              </p>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                40% increase in event participation
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
