import { Header } from "@/components/header"
import { Search, Filter, Download, Heart, Share, Eye, Grid, List } from "lucide-react"

export default function GalleryPage() {
  const galleryCategories = [
    { name: "Traditional Clothing", count: 45, color: "bg-purple-100 text-purple-700" },
    { name: "Cultural Ceremonies", count: 38, color: "bg-blue-100 text-blue-700" },
    { name: "Architecture", count: 22, color: "bg-green-100 text-green-700" },
    { name: "Handicrafts", count: 35, color: "bg-yellow-100 text-yellow-700" },
    { name: "Landscapes", count: 28, color: "bg-teal-100 text-teal-700" },
    { name: "Historical Photos", count: 18, color: "bg-red-100 text-red-700" },
  ]

  const galleryItems = [
    {
      title: "Traditional Fur Wedding Dress",
      description:
        "Elaborate traditional wedding attire worn by Fur brides, featuring intricate embroidery and cultural symbols",
      category: "Traditional Clothing",
      photographer: "Amina Hassan",
      date: "March 2024",
      location: "Nyala, South Darfur",
      likes: 245,
      views: 1520,
      image: "/fur-embroidered-wedding-dress.png",
    },
    {
      title: "Harvest Festival Celebration",
      description: "Community gathering during the annual harvest festival with traditional music and dance",
      category: "Cultural Ceremonies",
      photographer: "Mohamed Ali",
      date: "October 2023",
      location: "Jebel Marra",
      likes: 189,
      views: 2340,
      image: "/placeholder-x20ts.png",
    },
    {
      title: "Traditional Fur Architecture",
      description:
        "Ancient architectural style of Fur buildings with distinctive conical roofs and mud brick construction",
      category: "Architecture",
      photographer: "Sarah Ibrahim",
      date: "January 2024",
      location: "Fur Sultanate Ruins",
      likes: 156,
      views: 980,
      image: "/fur-architecture.png",
    },
    {
      title: "Handwoven Baskets",
      description: "Beautiful traditional baskets woven by Fur women using local materials and ancestral techniques",
      category: "Handicrafts",
      photographer: "Fatima Al-Fur",
      date: "February 2024",
      location: "Fur Villages",
      likes: 203,
      views: 1450,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Jebel Marra Landscape",
      description: "Stunning view of the sacred Jebel Marra mountain range, central to Fur cultural identity",
      category: "Landscapes",
      photographer: "Ahmed Hassan",
      date: "December 2023",
      location: "Jebel Marra National Park",
      likes: 312,
      views: 2890,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Traditional Pottery Making",
      description: "Elder woman demonstrating traditional pottery techniques passed down through generations",
      category: "Handicrafts",
      photographer: "Khadija Omar",
      date: "April 2024",
      location: "Fur Cultural Center",
      likes: 178,
      views: 1230,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Historical Fur Sultanate",
      description: "Rare historical photograph of the last Fur Sultan and his court from the early 20th century",
      category: "Historical Photos",
      photographer: "Historical Archive",
      date: "1916",
      location: "Fur Sultanate Palace",
      likes: 445,
      views: 3560,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Traditional Music Instruments",
      description: "Collection of traditional Fur musical instruments including drums, flutes, and string instruments",
      category: "Handicrafts",
      photographer: "Omar Abdallah",
      date: "May 2024",
      location: "Cultural Heritage Museum",
      likes: 167,
      views: 1100,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Coming of Age Ceremony",
      description: "Traditional ceremony marking the transition from childhood to adulthood in Fur culture",
      category: "Cultural Ceremonies",
      photographer: "Maryam Hassan",
      date: "June 2024",
      location: "Fur Community Center",
      likes: 234,
      views: 1780,
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cultural Gallery</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the visual heritage of the Fur people through photographs, artwork, and cultural artifacts that
            showcase the beauty and richness of Fur traditions.
          </p>
        </div>

        {/* Search and Controls */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search gallery by title, category, or photographer..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Grid className="w-4 h-4" />
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {galleryCategories.map((category, index) => (
            <button
              key={index}
              className={`p-4 rounded-lg text-center hover:shadow-md transition-shadow ${category.color}`}
            >
              <div className="font-medium text-sm">{category.name}</div>
              <div className="text-xs opacity-75 mt-1">{category.count} items</div>
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                    <button className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100">
                      <Eye className="w-4 h-4 text-gray-700" />
                    </button>
                    <button className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100">
                      <Heart className="w-4 h-4 text-gray-700" />
                    </button>
                    <button className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100">
                      <Share className="w-4 h-4 text-gray-700" />
                    </button>
                    <button className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100">
                      <Download className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                </div>
                <div className="absolute top-2 left-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      item.category === "Traditional Clothing"
                        ? "bg-purple-600 text-white"
                        : item.category === "Cultural Ceremonies"
                          ? "bg-blue-600 text-white"
                          : item.category === "Architecture"
                            ? "bg-green-600 text-white"
                            : item.category === "Handicrafts"
                              ? "bg-yellow-600 text-white"
                              : item.category === "Landscapes"
                                ? "bg-teal-600 text-white"
                                : "bg-red-600 text-white"
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

                <div className="text-xs text-gray-500 mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span>By {item.photographer}</span>
                    <span>{item.date}</span>
                  </div>
                  <div>{item.location}</div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-3 text-gray-500">
                    <span className="flex items-center">
                      <Heart className="w-3 h-3 mr-1" />
                      {item.likes}
                    </span>
                    <span className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {item.views}
                    </span>
                  </div>
                  <button className="text-teal-700 hover:text-teal-800 font-medium">View Full Size</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Statistics */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Gallery Statistics</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-teal-700">186</div>
              <div className="text-gray-600">Total Images</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-700">25+</div>
              <div className="text-gray-600">Contributing Photographers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-700">15K+</div>
              <div className="text-gray-600">Total Views</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-700">6</div>
              <div className="text-gray-600">Categories</div>
            </div>
          </div>
        </div>

        {/* Contribution Guidelines */}
        <div className="bg-teal-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contribute to Our Gallery</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Photo Submission Guidelines</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  High-resolution images (minimum 1920x1080)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Original photography showcasing Fur culture
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Include detailed descriptions and context
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Respect privacy and cultural sensitivity
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">What We're Looking For</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Traditional ceremonies and celebrations
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Handicrafts and traditional arts
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Historical photographs and documents
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-teal-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Landscapes of cultural significance
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-6">
            <button className="bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-800 transition-colors">
              Submit Your Photos
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
