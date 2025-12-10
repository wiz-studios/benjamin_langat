"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, Award, Briefcase, GraduationCap, FileText, Users, Target, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface PoliticianProfile {
  name: string
  title: string
  bio: string
  photo: string
  email: string
  phone: string
  birth_date: string | null
}

export default function AboutPage() {
  const [openSections, setOpenSections] = useState<string[]>(["bio"])
  const [profile, setProfile] = useState<PoliticianProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProfile() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("politician")
        .select("*")
        .single()

      if (!error && data) {
        setProfile({
          name: data.name,
          title: data.title,
          bio: data.bio,
          photo: data.photo,
          email: data.email,
          phone: data.phone,
          birth_date: data.birth_date,
        })
      }
      setLoading(false)
    }

    fetchProfile()
  }, [])

  const toggleSection = (section: string) => {
    setOpenSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const SectionHeader = ({ id, title, icon: Icon }: { id: string; title: string; icon: any }) => (
    <button
      onClick={() => toggleSection(id)}
      className="w-full flex items-center justify-between p-4 bg-white border-2 border-[#FFD700] rounded-lg hover:bg-[#FFD700]/10 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="bg-[#FFD700] p-2 rounded-lg">
          <Icon className="h-5 w-5 text-black" />
        </div>
        <h2 className="text-xl font-bold text-black">{title}</h2>
      </div>
      {openSections.includes(id) ? (
        <ChevronUp className="h-5 w-5 text-black" />
      ) : (
        <ChevronDown className="h-5 w-5 text-black" />
      )}
    </button>
  )

  if (loading) {
    return (
      <main className="py-16 bg-[#F5F5F5] min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#FFD700]" />
      </main>
    )
  }

  if (!profile) {
    return (
      <main className="py-16 bg-[#F5F5F5] min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Profile not found</p>
      </main>
    )
  }

  return (
    <main className="py-16 bg-[#F5F5F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 bg-white rounded-2xl p-8 shadow-lg">
          <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-[#FFD700] shadow-lg mb-6 bg-white">
            <Image
              src={profile.photo || "/placeholder.svg"}
              alt={`Portrait of ${profile.name}`}
              fill
              className="object-contain scale-110"
              style={{ objectPosition: 'center top' }}
            />
          </div>
          <h1 className="text-4xl font-bold text-black mb-2">{profile.name}</h1>
          <p className="text-xl text-gray-700 mb-4">{profile.title}</p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="bg-[#FFD700] text-black px-4 py-1 rounded-full text-sm font-semibold">
              CBS, First Class
            </span>
            <span className="bg-gray-200 text-black px-4 py-1 rounded-full text-sm font-semibold">
              CPA (K)
            </span>
            <span className="bg-gray-200 text-black px-4 py-1 rounded-full text-sm font-semibold">
              ICPAK Member
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {/* Biography */}
          <div>
            <SectionHeader id="bio" title="Biography" icon={FileText} />
            {openSections.includes("bio") && (
              <div className="mt-2 bg-white rounded-lg p-6 border border-gray-200">
                <div 
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: profile.bio }}
                />
              </div>
            )}
          </div>

          {/* Education Background */}
          <div>
            <SectionHeader id="education" title="Education Background" icon={GraduationCap} />
            {openSections.includes("education") && (
              <div className="mt-2 bg-white rounded-lg p-6 border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-[#FFD700]">
                        <th className="text-left p-3 font-semibold text-black">From</th>
                        <th className="text-left p-3 font-semibold text-black">To</th>
                        <th className="text-left p-3 font-semibold text-black">Institution</th>
                        <th className="text-left p-3 font-semibold text-black">Qualification</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 hover:bg-[#FFD700]/5">
                        <td className="p-3 text-gray-700">2003</td>
                        <td className="p-3 text-gray-700">2005</td>
                        <td className="p-3 text-gray-700">University of Nairobi</td>
                        <td className="p-3 text-gray-700 font-semibold">MBA</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-[#FFD700]/5">
                        <td className="p-3 text-gray-700">1997</td>
                        <td className="p-3 text-gray-700">2001</td>
                        <td className="p-3 text-gray-700">University of Nairobi</td>
                        <td className="p-3 text-gray-700 font-semibold">B.Com (Accounting)</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-[#FFD700]/5">
                        <td className="p-3 text-gray-700">1998</td>
                        <td className="p-3 text-gray-700">2002</td>
                        <td className="p-3 text-gray-700">KASNEB</td>
                        <td className="p-3 text-gray-700 font-semibold">CPA(K)</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-[#FFD700]/5">
                        <td className="p-3 text-gray-700">1992</td>
                        <td className="p-3 text-gray-700">1995</td>
                        <td className="p-3 text-gray-700">Kericho High School</td>
                        <td className="p-3 text-gray-700">KCSE</td>
                      </tr>
                      <tr className="hover:bg-[#FFD700]/5">
                        <td className="p-3 text-gray-700">1984</td>
                        <td className="p-3 text-gray-700">1991</td>
                        <td className="p-3 text-gray-700">Chepkoiyo Primary</td>
                        <td className="p-3 text-gray-700">KCPE</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <p className="text-sm font-semibold text-blue-900">Current Pursuit</p>
                  <p className="text-sm text-blue-800 mt-1">PhD in Finance - University of Nairobi</p>
                </div>
              </div>
            )}
          </div>

          {/* Employment History */}
          <div>
            <SectionHeader id="employment" title="Employment History" icon={Briefcase} />
            {openSections.includes("employment") && (
              <div className="mt-2 bg-white rounded-lg p-6 border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-[#FFD700]">
                        <th className="text-left p-3 font-semibold text-black">From</th>
                        <th className="text-left p-3 font-semibold text-black">To</th>
                        <th className="text-left p-3 font-semibold text-black">Employer</th>
                        <th className="text-left p-3 font-semibold text-black">Position Held</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 hover:bg-[#FFD700]/5 bg-[#FFD700]/10">
                        <td className="p-3 text-gray-700">2022</td>
                        <td className="p-3 text-gray-700 font-semibold">Present</td>
                        <td className="p-3 text-gray-700">Kenya National Assembly</td>
                        <td className="p-3 text-gray-700 font-semibold text-[#FFD700]">MP - Ainamoi Constituency</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-[#FFD700]/5">
                        <td className="p-3 text-gray-700">2018</td>
                        <td className="p-3 text-gray-700">2022</td>
                        <td className="p-3 text-gray-700">Kenya Government</td>
                        <td className="p-3 text-gray-700 font-semibold">High Commissioner - Namibia</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-[#FFD700]/5">
                        <td className="p-3 text-gray-700">2008</td>
                        <td className="p-3 text-gray-700">2017</td>
                        <td className="p-3 text-gray-700">Kenya National Assembly</td>
                        <td className="p-3 text-gray-700 font-semibold">MP - Ainamoi Constituency</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-[#FFD700]/5">
                        <td className="p-3 text-gray-700">2006</td>
                        <td className="p-3 text-gray-700">2008</td>
                        <td className="p-3 text-gray-700">Jomo Kenyatta University of Agriculture and Technology</td>
                        <td className="p-3 text-gray-700">Part-time Lecturer</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-[#FFD700]/5">
                        <td className="p-3 text-gray-700">2006</td>
                        <td className="p-3 text-gray-700">2008</td>
                        <td className="p-3 text-gray-700">Chai Trading Company</td>
                        <td className="p-3 text-gray-700">Senior Accountant</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-[#FFD700]/5">
                        <td className="p-3 text-gray-700">2006</td>
                        <td className="p-3 text-gray-700">2007</td>
                        <td className="p-3 text-gray-700">Kenya Tea Development Agency (KTDA)</td>
                        <td className="p-3 text-gray-700">Senior Accountant</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-[#FFD700]/5">
                        <td className="p-3 text-gray-700">2005</td>
                        <td className="p-3 text-gray-700">2006</td>
                        <td className="p-3 text-gray-700">Consolidated Bank of Kenya</td>
                        <td className="p-3 text-gray-700">Auditor</td>
                      </tr>
                      <tr className="hover:bg-[#FFD700]/5">
                        <td className="p-3 text-gray-700">2002</td>
                        <td className="p-3 text-gray-700">2003</td>
                        <td className="p-3 text-gray-700">Waithaka Kiarie Mbaya & Co.</td>
                        <td className="p-3 text-gray-700">Senior Auditor</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Committee Memberships */}
          <div>
            <SectionHeader id="committees" title="Parliamentary Committee Memberships" icon={Users} />
            {openSections.includes("committees") && (
              <div className="mt-2 bg-white rounded-lg p-6 border border-gray-200">
                <p className="text-sm text-gray-600 mb-4 italic">
                  Membership to Committees in previous Parliaments (12th, 11th, 10th, 9th)
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-[#FFD700]">
                        <th className="text-left p-3 font-semibold text-black">From</th>
                        <th className="text-left p-3 font-semibold text-black">To</th>
                        <th className="text-left p-3 font-semibold text-black">Committee</th>
                        <th className="text-left p-3 font-semibold text-black">Position Held</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 hover:bg-[#FFD700]/5">
                        <td className="p-3 text-gray-700">2013</td>
                        <td className="p-3 text-gray-700">2017</td>
                        <td className="p-3 text-gray-700">Finance & Planning & Trade</td>
                        <td className="p-3 text-gray-700 font-semibold text-[#FFD700]">Chairman</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-[#FFD700]/5">
                        <td className="p-3 text-gray-700">2013</td>
                        <td className="p-3 text-gray-700">2017</td>
                        <td className="p-3 text-gray-700">Budget & Appropriation Committee</td>
                        <td className="p-3 text-gray-700">Member</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-[#FFD700]/5">
                        <td className="p-3 text-gray-700">2013</td>
                        <td className="p-3 text-gray-700">2017</td>
                        <td className="p-3 text-gray-700">Liaison Committee</td>
                        <td className="p-3 text-gray-700">Member</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-[#FFD700]/5">
                        <td className="p-3 text-gray-700">2008</td>
                        <td className="p-3 text-gray-700">2013</td>
                        <td className="p-3 text-gray-700">Local Authorities & Fund Acc. Committee</td>
                        <td className="p-3 text-gray-700 font-semibold">Vice-Chairman</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-[#FFD700]/5">
                        <td className="p-3 text-gray-700">2008</td>
                        <td className="p-3 text-gray-700">2013</td>
                        <td className="p-3 text-gray-700">Committee on Implementation</td>
                        <td className="p-3 text-gray-700">Member</td>
                      </tr>
                      <tr className="hover:bg-[#FFD700]/5">
                        <td className="p-3 text-gray-700">2008</td>
                        <td className="p-3 text-gray-700">2013</td>
                        <td className="p-3 text-gray-700">Transport, Public Works and Housing Committee</td>
                        <td className="p-3 text-gray-700">Member</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Bills Sponsored */}
          <div>
            <SectionHeader id="bills" title="Bills Sponsored" icon={FileText} />
            {openSections.includes("bills") && (
              <div className="mt-2 bg-white rounded-lg p-6 border border-gray-200">
                <p className="text-gray-700 mb-4">
                  <span className="font-semibold">Total Bills Sponsored:</span> 9 bills during the National Assembly 2013-2017
                </p>
                <ul className="space-y-2">
                  {[
                    "The Value Added Tax Bill, 2013",
                    "The Insurance (Motor Vehicle Third Party Risks)(Amendment) Bill, 2013",
                    "The Tax Appeals Tribunal Bill, 2013",
                    "The Finance Bill, 2013",
                    "The Microfinance (Amendment) Bill, 2013",
                    "The Kenya Deposit Insurance (Amendment) Bill, 2013",
                    "The Insurance (Amendment) Bill, 2013",
                    "The Securities and Investment Analysts Bill, 2014",
                    "The Finance Bill, 2014"
                  ].map((bill, index) => (
                    <li key={index} className="flex items-start gap-2 p-2 hover:bg-[#FFD700]/5 rounded">
                      <span className="text-[#FFD700] font-bold mt-1">•</span>
                      <span className="text-gray-700">{bill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Professional Profile */}
          <div>
            <SectionHeader id="professional" title="Professional Profile" icon={Award} />
            {openSections.includes("professional") && (
              <div className="mt-2 bg-white rounded-lg p-6 border border-gray-200 space-y-4">
                <div>
                  <h3 className="font-semibold text-black mb-2">Professional Affiliations</h3>
                  <p className="text-gray-700">Member, Institute of Certified Public Accountants of Kenya (ICPAK)</p>
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-2">Honours/Awards</h3>
                  <p className="text-gray-700">Chief of the Burning Spear (CBS), First Class - 2015</p>
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-2">Special Skills</h3>
                  <p className="text-gray-700">Public Finance; Budgeting</p>
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-2">Areas of Interest</h3>
                  <p className="text-gray-700">
                    Economic Affairs; Public Finance; Budgeting & Infrastructure Initiatives; Foreign Relations
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Political Career */}
          <div>
            <SectionHeader id="career" title="Political & Diplomatic Career" icon={Target} />
            {openSections.includes("career") && (
              <div className="mt-2 bg-white rounded-lg p-6 border border-gray-200 space-y-4">
                <div>
                  <h3 className="font-semibold text-black mb-2">Legislative Work</h3>
                  <p className="text-gray-700 leading-relaxed">
                    In his tenure in Parliament, he was actively involved as spokesman and chairman of the Departmental
                    Committee on Finance, Planning and Trade, tasked with presenting the views of the committee on the floor of
                    the House, including moving motions on different committee reports and Bills. He was also involved in
                    reviewing the legislation on finance, industry, tourism, trade and planning.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-2">Ambassadorial Role</h3>
                  <p className="text-gray-700 leading-relaxed">
                    As the Head of Mission in Windhoek, Namibia (2018-2022), he sought to promote, protect and project
                    Kenyan-Namibian relations within the broad areas of economic, political, social, and environmental interests
                    of the two countries.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-2">Current Role</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Re-elected to Parliament on 9 August 2022 to represent the people of Ainamoi Constituency in the 13th
                    Parliament under the United Democratic Alliance (UDA) party.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
