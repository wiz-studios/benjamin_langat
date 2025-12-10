interface StatsSectionProps {
  stats: {
    label: string
    value: string
  }[]
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="bg-[#F5F5F5] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow border-b-4 border-transparent hover:border-[#FFD700]"
            >
              <p className="text-3xl md:text-4xl font-bold text-black mb-2">{stat.value}</p>
              <p className="text-gray-600 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
