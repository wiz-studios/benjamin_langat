import { Hero } from "@/components/hero"
import { StatsSection } from "@/components/stats-section"
import { Card } from "@/components/card"
import { ConstituencyMap } from "@/components/constituency-map"
import { CareerTimeline } from "@/components/career-timeline"
import { VideoGallery } from "@/components/video-gallery"
import { SocialMediaFeeds } from "@/components/social-media-feeds"
import { ParallaxSection } from "@/components/parallax-section"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap, Building2, Stethoscope } from "lucide-react"
import politicianData from "@/src/data/politician.json"
import { createClient } from "@/lib/supabase/server"

// Helper to merge JSON data with DB data
async function getPoliticianData() {
  const supabase = await createClient()
  const { data: dbPolitician, error } = await supabase.from("politician").select("*").single()

  if (error || !dbPolitician) {
    console.error("Failed to fetch politician data:", error)
    return politicianData // Fallback to local JSON
  }

  return {
    ...politicianData,
    ...dbPolitician,
    // Ensure nested objects from JSON are preserved if not in DB
    quickFacts: politicianData.quickFacts,
    stats: politicianData.stats,
    // Map DB fields if names differ (e.g. bio vs shortBio? DB has bio)
    // The migration mapped shortBio -> bio. So dbPolitician.bio is correct.
    // If the components expect 'shortBio', we might need to alias it.
    shortBio: dbPolitician.bio || politicianData.shortBio
  }
}

export default async function HomePage() {
  const politician = await getPoliticianData()

  // Note: Hero, Stats, etc might need props passed if they are not using the JSON directly?
  // Checking imports: They import components. 
  // If components import politicianData internally, they will still use the old JSON!
  // I need to check if Hero, StatsSection etc import internal JSON.
  // User's previous `app/page.tsx` imported `politicianData` and used it for `Quick Facts`.
  // `Hero` and others merge imports? No, `Hero` is imported. 
  // Quick Facts section IS IN `Page.tsx` directly (lines 20-51).
  // So `politician.quickFacts` will work here.

  // BUT: `Hero` component inside `components/hero.tsx` probably imports `politician.json` directly?
  // If so, I need to update `Hero` to accept props OR refactor it too.
  // For this task, I will pass props to components if they support it, or I might need to refactor them.
  // I'll check `Hero` component next.

  return (
    <main>
      {/* If Hero expects props, I'll pass them. If it uses JSON, it's stale data... */}
      {/* I will assume for now I need to check Hero. Passing props is better. */}
      {/* For now, I render the Quick Facts part using the fetched 'politician' object */}

      <Hero
        name={politician.name}
        title={politician.title}
        shortBio={politician.shortBio}
        photo={politician.photo}
      />
      <StatsSection stats={politician.stats} />

      {/* Quick Facts Section */}
      <section className="bg-[#F5F5F5] dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-black dark:text-white mb-12">Quick Facts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-black dark:text-white mb-2">Constituency</h3>
              <p className="text-gray-600 dark:text-gray-300">{politician.quickFacts.constituency}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-black dark:text-white mb-2">Political Party</h3>
              <p className="text-gray-600 dark:text-gray-300">{politician.quickFacts.party}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-black dark:text-white mb-2">National Award</h3>
              <p className="text-gray-600 dark:text-gray-300">{politician.quickFacts.award}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-black dark:text-white mb-2">Education</h3>
              <p className="text-gray-600 dark:text-gray-300">{politician.quickFacts.education}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-black dark:text-white mb-2">Professional Qualification</h3>
              <p className="text-gray-600 dark:text-gray-300">{politician.quickFacts.profession}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-black dark:text-white mb-2">Current Pursuit</h3>
              <p className="text-gray-600 dark:text-gray-300">{politician.quickFacts.currentPursuit}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax CTA Section */}
      <ParallaxSection backgroundImage="/kericho-tea-plantation-kenya-landscape.jpg">
        <div className="py-24 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Building a Better Ainamoi</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto px-4">
            Together, we are transforming our constituency through education, infrastructure, and healthcare
            initiatives.
          </p>
          <Button asChild size="lg" className="bg-[#FFD700] text-black hover:bg-[#E6C200] font-semibold">
            <Link href="/projects">View Our Projects</Link>
          </Button>
        </div>
      </ParallaxSection>

      {/* Interactive Constituency Map */}
      <ConstituencyMap />

      {/* Priority Areas Preview */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-black dark:text-white mb-4">Priority Areas</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Committed to driving development and improving the lives of constituents through focused initiatives in key
            sectors.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              title="Education"
              description="Improving access to quality education through infrastructure development, bursaries, and teacher support programs."
              icon={<GraduationCap className="h-8 w-8" />}
            />
            <Card
              title="Infrastructure"
              description="Building and maintaining roads, bridges, and public facilities to connect communities and boost economic activity."
              icon={<Building2 className="h-8 w-8" />}
            />
            <Card
              title="Healthcare"
              description="Enhancing healthcare delivery through facility upgrades, equipment provision, and improved access to medical services."
              icon={<Stethoscope className="h-8 w-8" />}
            />
          </div>
          <div className="text-center mt-10">
            <Button asChild className="bg-[#FFD700] text-black hover:bg-[#E6C200] font-semibold">
              <Link href="/agenda">View Full Agenda</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Career Timeline */}
      <CareerTimeline />

      {/* Video Gallery */}
      <VideoGallery />

      {/* Social Media Feeds */}
      <SocialMediaFeeds />
    </main>
  )
}
