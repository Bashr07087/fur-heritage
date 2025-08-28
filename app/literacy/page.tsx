import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Target, Award, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function LiteracyPage() {
  const literacyPrograms = [
    {
      title: "Adult Literacy Program",
      description: "Comprehensive reading and writing program for adults",
      level: "Beginner to Advanced",
      duration: "6 months",
      participants: "150+ enrolled",
      skills: ["Reading comprehension", "Writing skills", "Vocabulary building", "Grammar basics"],
    },
    {
      title: "Children's Literacy Initiative",
      description: "Fun and engaging literacy program for children aged 6-12",
      level: "Elementary",
      duration: "Ongoing",
      participants: "200+ children",
      skills: ["Phonics", "Story reading", "Creative writing", "Oral communication"],
    },
    {
      title: "Community Reading Circles",
      description: "Group reading sessions with traditional Fur stories and texts",
      level: "All levels",
      duration: "Weekly sessions",
      participants: "50+ members",
      skills: ["Group discussion", "Cultural literacy", "Critical thinking", "Public speaking"],
    },
  ]

  const literacyStats = [
    { label: "Active Learners", value: "400+", icon: Users },
    { label: "Completion Rate", value: "85%", icon: Award },
    { label: "Weekly Sessions", value: "12", icon: Clock },
    { label: "Success Stories", value: "120+", icon: CheckCircle },
  ]

  const learningResources = [
    {
      category: "Reading Materials",
      items: [
        "Fur Language Primer",
        "Traditional Folk Tales Collection",
        "Modern Fur Literature",
        "Children's Picture Books",
        "Adult Learning Workbooks",
      ],
    },
    {
      category: "Writing Exercises",
      items: [
        "Letter Formation Practice",
        "Word Building Activities",
        "Sentence Construction",
        "Paragraph Writing",
        "Creative Writing Prompts",
      ],
    },
    {
      category: "Assessment Tools",
      items: [
        "Reading Comprehension Tests",
        "Writing Skill Evaluations",
        "Progress Tracking Sheets",
        "Vocabulary Assessments",
        "Oral Communication Rubrics",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Fur Language Literacy Programs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering our community through comprehensive literacy education. Building reading, writing, and
            communication skills in the Fur language.
          </p>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Literacy Programs</h2>
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
                      <Link href="/literacy-materials">Learn More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Learning Resources */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Learning Resources</h2>
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
          <h2 className="text-3xl font-bold mb-4">Join Our Literacy Community</h2>
          <p className="text-xl mb-6 text-teal-100">
            Start your literacy journey today and help preserve the Fur language for future generations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/literacy-materials/basic">Start Learning</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-teal-700 bg-transparent"
              asChild
            >
              <Link href="/newsletters">Get Updates</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
