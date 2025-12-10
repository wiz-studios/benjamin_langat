"use client"

import { useState } from "react"
import { MapPin, Users, Building, ArrowRight } from "lucide-react"

interface Ward {
  id: string
  name: string
  population: string
  projects: number
  description: string
}

const wards: Ward[] = [
  {
    id: "kapsoit",
    name: "Kapsoit",
    population: "28,450",
    projects: 12,
    description: "Agricultural hub with tea farming and dairy, featuring new market stalls and road upgrades.",
  },
  {
    id: "ainamoi",
    name: "Ainamoi",
    population: "32,100",
    projects: 15,
    description: "Administrative center hosting the CDF offices and major infrastructure projects.",
  },
  {
    id: "kapkugerwet",
    name: "Kapkugerwet",
    population: "24,800",
    projects: 10,
    description: "Fast-growing residential zone with focus on water sanitation and youth empowerment centers.",
  },
  {
    id: "kipchebor",
    name: "Kipchebor",
    population: "22,300",
    projects: 8,
    description: "Rural community centered on education development and scholarship programs.",
  },
  {
    id: "kipchimchim",
    name: "Kipchimchim",
    population: "26,700",
    projects: 11,
    description: "Traditional farming region benefiting from new agricultural extension services and roads.",
  },
  {
    id: "kapsaos",
    name: "Kapsaos",
    population: "20,150",
    projects: 9,
    description: "Community-driven ward with recent investments in healthcare facilities and electricity.",
  },
]

export function ConstituencyMap() {
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null)
  const [hoveredWard, setHoveredWard] = useState<string | null>(null)

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-black dark:text-white mb-4 tracking-tight">
            Ainamoi Constituency Map
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore the six wards of our constituency. Click on any area to discover detailed demographics and development progress.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Interactive Map SVG */}
          <div className="lg:col-span-7 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl relative border border-gray-100 dark:border-gray-700">
            <svg viewBox="0 0 420 360" className="w-full h-auto drop-shadow-xl filter">
              <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                  <feOffset dx="2" dy="4" result="offsetblur" />
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.3" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="wardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f3f4f6" />
                  <stop offset="100%" stopColor="#e5e7eb" />
                </linearGradient>
                <linearGradient id="wardGradientHover" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
                <linearGradient id="wardGradientSelected" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>

              {/* Kapsoit Ward */}
              <g
                className={`transition-transform duration-300 ease-out origin-center cursor-pointer group ${hoveredWard === "kapsoit" || selectedWard?.id === "kapsoit" ? "scale-[1.02] z-10" : "scale-100 z-0"
                  }`}
                onMouseEnter={() => setHoveredWard("kapsoit")}
                onMouseLeave={() => setHoveredWard(null)}
                onClick={() => setSelectedWard(wards.find((w) => w.id === "kapsoit") || null)}
              >
                <path
                  d="M60,60 L160,40 L190,110 L130,160 L50,130 Z"
                  fill={
                    selectedWard?.id === "kapsoit"
                      ? "url(#wardGradientSelected)"
                      : hoveredWard === "kapsoit"
                        ? "url(#wardGradientHover)"
                        : "url(#wardGradient)"
                  }
                  stroke={selectedWard?.id === "kapsoit" ? "#000" : "#9ca3af"}
                  strokeWidth={selectedWard?.id === "kapsoit" ? "3" : "1.5"}
                  filter="url(#shadow)"
                  className="transition-all duration-300 backdrop-blur-sm"
                />
                <text
                  x="105"
                  y="95"
                  className={`text-xs font-bold pointer-events-none transition-colors duration-300 ${selectedWard?.id === "kapsoit" || hoveredWard === "kapsoit" ? "fill-black" : "fill-gray-600"
                    }`}
                >
                  Kapsoit
                </text>
              </g>

              {/* Ainamoi Ward */}
              <g
                className={`transition-transform duration-300 ease-out origin-center cursor-pointer group ${hoveredWard === "ainamoi" || selectedWard?.id === "ainamoi" ? "scale-[1.02] z-10" : "scale-100 z-0"
                  }`}
                onMouseEnter={() => setHoveredWard("ainamoi")}
                onMouseLeave={() => setHoveredWard(null)}
                onClick={() => setSelectedWard(wards.find((w) => w.id === "ainamoi") || null)}
              >
                <path
                  d="M160,40 L290,50 L310,140 L190,110 Z"
                  fill={
                    selectedWard?.id === "ainamoi"
                      ? "url(#wardGradientSelected)"
                      : hoveredWard === "ainamoi"
                        ? "url(#wardGradientHover)"
                        : "url(#wardGradient)"
                  }
                  stroke={selectedWard?.id === "ainamoi" ? "#000" : "#9ca3af"}
                  strokeWidth={selectedWard?.id === "ainamoi" ? "3" : "1.5"}
                  filter="url(#shadow)"
                  className="transition-all duration-300"
                />
                <text
                  x="220"
                  y="85"
                  className={`text-xs font-bold pointer-events-none transition-colors duration-300 ${selectedWard?.id === "ainamoi" || hoveredWard === "ainamoi" ? "fill-black" : "fill-gray-600"
                    }`}
                >
                  Ainamoi
                </text>
              </g>

              {/* Kapkugerwet Ward */}
              <g
                className={`transition-transform duration-300 ease-out origin-center cursor-pointer group ${hoveredWard === "kapkugerwet" || selectedWard?.id === "kapkugerwet" ? "scale-[1.02] z-10" : "scale-100 z-0"
                  }`}
                onMouseEnter={() => setHoveredWard("kapkugerwet")}
                onMouseLeave={() => setHoveredWard(null)}
                onClick={() => setSelectedWard(wards.find((w) => w.id === "kapkugerwet") || null)}
              >
                <path
                  d="M290,50 L380,90 L370,190 L310,140 Z"
                  fill={
                    selectedWard?.id === "kapkugerwet"
                      ? "url(#wardGradientSelected)"
                      : hoveredWard === "kapkugerwet"
                        ? "url(#wardGradientHover)"
                        : "url(#wardGradient)"
                  }
                  stroke={selectedWard?.id === "kapkugerwet" ? "#000" : "#9ca3af"}
                  strokeWidth={selectedWard?.id === "kapkugerwet" ? "3" : "1.5"}
                  filter="url(#shadow)"
                  className="transition-all duration-300"
                />
                <text
                  x="320"
                  y="125"
                  className={`text-xs font-bold pointer-events-none transition-colors duration-300 ${selectedWard?.id === "kapkugerwet" || hoveredWard === "kapkugerwet" ? "fill-black" : "fill-gray-600"
                    }`}
                >
                  Kapkugerwet
                </text>
              </g>

              {/* Kipchebor Ward */}
              <g
                className={`transition-transform duration-300 ease-out origin-center cursor-pointer group ${hoveredWard === "kipchebor" || selectedWard?.id === "kipchebor" ? "scale-[1.02] z-10" : "scale-100 z-0"
                  }`}
                onMouseEnter={() => setHoveredWard("kipchebor")}
                onMouseLeave={() => setHoveredWard(null)}
                onClick={() => setSelectedWard(wards.find((w) => w.id === "kipchebor") || null)}
              >
                <path
                  d="M50,130 L130,160 L150,260 L40,230 Z"
                  fill={
                    selectedWard?.id === "kipchebor"
                      ? "url(#wardGradientSelected)"
                      : hoveredWard === "kipchebor"
                        ? "url(#wardGradientHover)"
                        : "url(#wardGradient)"
                  }
                  stroke={selectedWard?.id === "kipchebor" ? "#000" : "#9ca3af"}
                  strokeWidth={selectedWard?.id === "kipchebor" ? "3" : "1.5"}
                  filter="url(#shadow)"
                  className="transition-all duration-300"
                />
                <text
                  x="75"
                  y="195"
                  className={`text-xs font-bold pointer-events-none transition-colors duration-300 ${selectedWard?.id === "kipchebor" || hoveredWard === "kipchebor" ? "fill-black" : "fill-gray-600"
                    }`}
                >
                  Kipchebor
                </text>
              </g>

              {/* Kipchimchim Ward */}
              <g
                className={`transition-transform duration-300 ease-out origin-center cursor-pointer group ${hoveredWard === "kipchimchim" || selectedWard?.id === "kipchimchim" ? "scale-[1.02] z-10" : "scale-100 z-0"
                  }`}
                onMouseEnter={() => setHoveredWard("kipchimchim")}
                onMouseLeave={() => setHoveredWard(null)}
                onClick={() => setSelectedWard(wards.find((w) => w.id === "kipchimchim") || null)}
              >
                <path
                  d="M130,160 L310,140 L290,250 L150,260 Z"
                  fill={
                    selectedWard?.id === "kipchimchim"
                      ? "url(#wardGradientSelected)"
                      : hoveredWard === "kipchimchim"
                        ? "url(#wardGradientHover)"
                        : "url(#wardGradient)"
                  }
                  stroke={selectedWard?.id === "kipchimchim" ? "#000" : "#9ca3af"}
                  strokeWidth={selectedWard?.id === "kipchimchim" ? "3" : "1.5"}
                  filter="url(#shadow)"
                  className="transition-all duration-300"
                />
                <text
                  x="200"
                  y="205"
                  className={`text-xs font-bold pointer-events-none transition-colors duration-300 ${selectedWard?.id === "kipchimchim" || hoveredWard === "kipchimchim" ? "fill-black" : "fill-gray-600"
                    }`}
                >
                  Kipchimchim
                </text>
              </g>

              {/* Kapsaos Ward */}
              <g
                className={`transition-transform duration-300 ease-out origin-center cursor-pointer group ${hoveredWard === "kapsaos" || selectedWard?.id === "kapsaos" ? "scale-[1.02] z-10" : "scale-100 z-0"
                  }`}
                onMouseEnter={() => setHoveredWard("kapsaos")}
                onMouseLeave={() => setHoveredWard(null)}
                onClick={() => setSelectedWard(wards.find((w) => w.id === "kapsaos") || null)}
              >
                <path
                  d="M310,140 L370,190 L350,290 L290,250 Z"
                  fill={
                    selectedWard?.id === "kapsaos"
                      ? "url(#wardGradientSelected)"
                      : hoveredWard === "kapsaos"
                        ? "url(#wardGradientHover)"
                        : "url(#wardGradient)"
                  }
                  stroke={selectedWard?.id === "kapsaos" ? "#000" : "#9ca3af"}
                  strokeWidth={selectedWard?.id === "kapsaos" ? "3" : "1.5"}
                  filter="url(#shadow)"
                  className="transition-all duration-300"
                />
                <text
                  x="320"
                  y="220"
                  className={`text-xs font-bold pointer-events-none transition-colors duration-300 ${selectedWard?.id === "kapsaos" || hoveredWard === "kapsaos" ? "fill-black" : "fill-gray-600"
                    }`}
                >
                  Kapsaos
                </text>
              </g>
            </svg>
            <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/90 px-3 py-1 rounded-full text-xs font-mono text-gray-500 backdrop-blur-sm shadow-sm border border-gray-100 dark:border-gray-800">
              Click to Interact
            </div>
          </div>

          {/* Ward Details Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`transition-all duration-500 ${selectedWard ? "opacity-100 translate-x-0" : "opacity-100"}`}>
              {selectedWard ? (
                <div className="bg-white dark:bg-gray-800 border border-[#FFD700] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/10 rounded-bl-full -mr-8 -mt-8" />

                  <div className="flex items-center gap-4 mb-6 relative">
                    <div className="bg-[#FFD700] p-3 rounded-2xl shadow-lg">
                      <MapPin className="h-8 w-8 text-black" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-black dark:text-white leading-tight">{selectedWard.name}</h3>
                      <span className="text-sm font-medium text-[#FFD700] tracking-wider uppercase">Active Ward</span>
                    </div>
                  </div>

                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    {selectedWard.description}
                  </p>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-5 border border-gray-100 dark:border-gray-600 hover:border-[#FFD700] transition-colors group">
                      <Users className="h-6 w-6 text-gray-400 group-hover:text-[#FFD700] mb-3 transition-colors" />
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Population</p>
                      <p className="text-2xl font-bold text-black dark:text-white group-hover:scale-105 transition-transform origin-left">
                        {selectedWard.population}
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-5 border border-gray-100 dark:border-gray-600 hover:border-[#FFD700] transition-colors group">
                      <Building className="h-6 w-6 text-gray-400 group-hover:text-[#FFD700] mb-3 transition-colors" />
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Active Projects</p>
                      <p className="text-2xl font-bold text-black dark:text-white group-hover:scale-105 transition-transform origin-left">
                        {selectedWard.projects}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 text-center border-2 border-dashed border-gray-200 dark:border-gray-700 h-full flex flex-col justify-center items-center">
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-full mb-6 animate-pulse">
                    <MapPin className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-black dark:text-white mb-3">Select a Ward</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                    Click on any ward region in the map to reveal detailed statistics and development highlights.
                  </p>
                </div>
              )}
            </div>

            {/* Ward List */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Quick Select</h4>
              <div className="grid grid-cols-2 gap-3">
                {wards.map((ward) => (
                  <button
                    key={ward.id}
                    onClick={() => setSelectedWard(ward)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${selectedWard?.id === ward.id
                        ? "bg-black text-white shadow-xl scale-[1.02]"
                        : "bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-[#FFD700] hover:text-black hover:shadow-md"
                      }`}
                  >
                    <span>{ward.name}</span>
                    {selectedWard?.id === ward.id && <ArrowRight className="h-4 w-4 text-[#FFD700]" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
