"use client"

import { useState } from "react"
import { Briefcase, GraduationCap, Award, Flag, Building2 } from "lucide-react"

interface TimelineEvent {
  year: string
  title: string
  description: string
  type: "education" | "career" | "award" | "political" | "diplomatic"
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "1984-1991",
    title: "Primary Education",
    description: "Attended Chepkoiyo Primary School in Ainamoi, completing KCPE certification.",
    type: "education",
  },
  {
    year: "1992-1995",
    title: "Kericho High School",
    description: "Completed secondary education at Kericho High School, achieving KCSE certification.",
    type: "education",
  },
  {
    year: "1997-2001",
    title: "Bachelor of Commerce",
    description: "Earned B.Com (Accounting) from the University of Nairobi.",
    type: "education",
  },
  {
    year: "1998-2002",
    title: "CPA Certification",
    description: "Qualified as Certified Public Accountant (CPA-K) through KASNEB, becoming a member of ICPAK.",
    type: "career",
  },
  {
    year: "2002-2003",
    title: "Senior Auditor",
    description: "Served as Senior Auditor at Waithaka Kiarie Mbaya & Co.",
    type: "career",
  },
  {
    year: "2003-2005",
    title: "Master of Business Administration",
    description: "Obtained MBA in Accounting from the University of Nairobi.",
    type: "education",
  },
  {
    year: "2005-2006",
    title: "Auditor - Consolidated Bank",
    description: "Worked as Auditor at Consolidated Bank of Kenya.",
    type: "career",
  },
  {
    year: "2006-2008",
    title: "Senior Accountant & Lecturer",
    description: "Served as Senior Accountant at Chai Trading Company (KTDA) and part-time lecturer at JKUAT.",
    type: "career",
  },
  {
    year: "2008",
    title: "First Election to Parliament",
    description: "Elected as Member of Parliament for Ainamoi Constituency, beginning his distinguished political career.",
    type: "political",
  },
  {
    year: "2008-2013",
    title: "Parliamentary Committees",
    description: "Served as Vice-Chairman of Local Authorities & Fund Accounts Committee and Member of Public Works & Housing Committee.",
    type: "political",
  },
  {
    year: "2013",
    title: "Re-election & Committee Chairman",
    description: "Re-elected to Parliament. Appointed Chairman of Finance, Planning & Trade Committee, and member of Budget & Appropriation Committee.",
    type: "political",
  },
  {
    year: "2013-2017",
    title: "Legislative Leadership",
    description: "Sponsored 9 major bills including Finance Bills (2013-2014), VAT Bill, Tax Appeals Tribunal Bill, and Insurance Amendment Bills.",
    type: "political",
  },
  {
    year: "2015",
    title: "CBS National Award",
    description: "Awarded Chief of the Order of the Burning Spear (CBS), First Class by President Uhuru Kenyatta for distinguished service to the nation.",
    type: "award",
  },
  {
    year: "2018-2022",
    title: "High Commissioner to Namibia",
    description: "Served as Kenya's High Commissioner to Namibia, promoting bilateral relations across economic, political, social, and environmental interests.",
    type: "diplomatic",
  },
  {
    year: "2022",
    title: "Return to Parliament - UDA",
    description: "Re-elected to Parliament under United Democratic Alliance (UDA) to represent Ainamoi Constituency in the 13th Parliament.",
    type: "political",
  },
  {
    year: "Present",
    title: "PhD Studies & Parliamentary Service",
    description: "Currently pursuing PhD in Finance at University of Nairobi while serving as MP. Over 2560 parliamentary appearances recorded.",
    type: "education",
  },
]

const iconMap = {
  education: GraduationCap,
  career: Briefcase,
  award: Award,
  political: Flag,
  diplomatic: Building2,
}

const colorMap = {
  education: "bg-blue-500",
  career: "bg-green-500",
  award: "bg-[#FFD700]",
  political: "bg-red-500",
  diplomatic: "bg-purple-500",
}

export function CareerTimeline() {
  const [activeFilter, setActiveFilter] = useState<string>("all")

  const filters = [
    { id: "all", label: "All" },
    { id: "education", label: "Education" },
    { id: "career", label: "Career" },
    { id: "political", label: "Political" },
    { id: "diplomatic", label: "Diplomatic" },
    { id: "award", label: "Awards" },
  ]

  const filteredEvents = activeFilter === "all" ? timelineEvents : timelineEvents.filter((e) => e.type === activeFilter)

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-black dark:text-white mb-4">Career Timeline</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-8 max-w-2xl mx-auto">
          A journey of education, professional excellence, and dedicated public service.
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === filter.id
                  ? "bg-[#FFD700] text-black"
                  : "bg-[#F5F5F5] dark:bg-gray-700 text-black dark:text-white hover:bg-[#FFD700] hover:text-black"
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#FFD700] hidden md:block" />

          {filteredEvents.map((event, index) => {
            const Icon = iconMap[event.type]
            const isEven = index % 2 === 0

            return (
              <div
                key={index}
                className={`relative flex items-center mb-8 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${isEven ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"}`}>
                  <div className="bg-[#F5F5F5] dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                    <span className="inline-block px-3 py-1 text-xs font-semibold bg-[#FFD700] text-black rounded-full mb-3">
                      {event.year}
                    </span>
                    <h3 className="text-lg font-bold text-black dark:text-white mb-2">{event.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{event.description}</p>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                  <div
                    className={`w-12 h-12 rounded-full ${colorMap[event.type]} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Mobile Icon */}
                <div
                  className={`md:hidden absolute left-0 top-0 w-10 h-10 rounded-full ${colorMap[event.type]} flex items-center justify-center`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>

                {/* Empty Space for other side */}
                <div className="hidden md:block w-5/12" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
