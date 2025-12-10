import { GraduationCap, Building2, Stethoscope, Wheat, Scale } from "lucide-react"

export const metadata = {
  title: "Agenda - Hon. Amb. CPA Benjamin Kipkirui Langat, CBS",
  description:
    "View the development agenda and priority areas for Ainamoi Constituency including Education, Infrastructure, Healthcare, Agriculture, and Governance.",
}

const agendaItems = [
  {
    title: "Education",
    icon: GraduationCap,
    description:
      "Ensuring every child in Ainamoi has access to quality education through comprehensive support programs.",
    initiatives: [
      "Bursary programs for needy students at all levels",
      "School infrastructure development and renovation",
      "Provision of modern learning materials and equipment",
      "Support for teacher training and professional development",
      "Partnership with universities for scholarship opportunities",
    ],
  },
  {
    title: "Infrastructure",
    icon: Building2,
    description: "Building and maintaining essential infrastructure to connect communities and drive economic growth.",
    initiatives: [
      "Construction and rehabilitation of key access roads",
      "Bridge construction to improve connectivity",
      "Electrification of rural areas",
      "Water supply projects for clean drinking water",
      "Construction of public facilities and community centers",
    ],
  },
  {
    title: "Healthcare",
    icon: Stethoscope,
    description: "Improving healthcare delivery and access to medical services for all constituents.",
    initiatives: [
      "Upgrade and equip existing health facilities",
      "Advocate for more healthcare workers in the constituency",
      "Support community health programs",
      "Mobile health clinics for remote areas",
      "Health education and awareness campaigns",
    ],
  },
  {
    title: "Agriculture",
    icon: Wheat,
    description: "Supporting farmers and agricultural activities that form the backbone of our local economy.",
    initiatives: [
      "Advocacy for fair tea prices and market access",
      "Support for agricultural diversification",
      "Provision of subsidized farm inputs",
      "Training on modern farming techniques",
      "Post-harvest handling and value addition support",
    ],
  },
  {
    title: "Governance",
    icon: Scale,
    description: "Promoting good governance, transparency, and community participation in development.",
    initiatives: [
      "Regular community engagement forums",
      "Transparent management of constituency funds",
      "Support for devolution and county development",
      "Advocacy for legislative reforms",
      "Youth and women empowerment programs",
    ],
  },
]

export default function AgendaPage() {
  return (
    <main className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">Development Agenda</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our commitment to comprehensive development across key sectors, aimed at improving the quality of life for
            all residents of Ainamoi Constituency.
          </p>
        </div>

        <div className="space-y-8">
          {agendaItems.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#FFD700]"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-[#FFD700] rounded-lg p-3 flex-shrink-0">
                    <item.icon className="h-8 w-8 text-black" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-black mb-2">{item.title}</h2>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="bg-[#F5F5F5] rounded-lg p-4">
                      <h3 className="font-semibold text-black mb-3">Key Initiatives:</h3>
                      <ul className="space-y-2">
                        {item.initiatives.map((initiative, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-700">
                            <span className="text-[#FFD700] mt-1 font-bold">•</span>
                            {initiative}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
