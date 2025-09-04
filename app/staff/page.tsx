"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  cv: string
}

// 👥 People who started the idea
const founders: TeamMember[] = [
  {
    name: "Omer_Soba",
    role: "Founder – Visionary & Project Initiator",
    bio: "Originated the concept of the Fur Language & Culture project, setting the vision and mission.",
    image: "/images/omer_soba.jpg",
    cv: "/cvs/mustafa-cv.pdf",
  },
  {
    name: "Bashr Ismail",
    role: "Technical Supporter",
    bio: "Responsible for turning the vision into reality with technical development and project structuring.",
    image: "/images/Technician.jpg",
    cv: "https://bashr07087.github.io/Bash_portfolio/",
  },
]

// 👨‍🏫 Staff / contributors
const staff: TeamMember[] = [
  {
    name: "Aisha Adam",
    role: "Community Coordinator",
    bio: "Leads outreach efforts and connects the community with resources.",
    image: "/images/staff/aisha.jpg",
    cv: "/cvs/aisha-cv.pdf",
  },
  {
    name: "Omar Suleiman",
    role: "Content Developer",
    bio: "Creates and curates educational and cultural resources for the platform.",
    image: "/images/staff/omar.jpg",
    cv: "/cvs/omar-cv.pdf",
  },
]

function TeamSection({ title, members }: { title: string; members: TeamMember[] }) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {members.map((member) => (
          <Card key={member.name} className="shadow-lg rounded-2xl overflow-hidden">
            <CardContent className="flex flex-col items-center text-center p-6">
              <div className="w-24 h-24 relative mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-blue-600 font-medium">{member.role}</p>
              <p className="text-sm text-gray-600 mt-2">{member.bio}</p>
              <Button asChild className="mt-4">
                <a href={member.cv} target="_blank" rel="noopener noreferrer" download>
                  <Download className="mr-2 h-4 w-4" /> Download CV
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default function StaffPage() {
  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-10">Our Team</h1>
      <TeamSection title="Founders" members={founders} />
      <TeamSection title="Staff & Contributors" members={staff} />
    </div>
  )
}
