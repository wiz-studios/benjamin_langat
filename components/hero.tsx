import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface HeroProps {
  name: string
  title: string
  shortBio: string
  photo: string
}

export function Hero({ name, title, shortBio, photo }: HeroProps) {
  return (
    <section className="bg-white relative overflow-hidden">
      <div className="absolute top-4 right-4 opacity-10 pointer-events-none">
        <Image
          src="/kenya-coat-of-arms-emblem.webp"
          alt=""
          width={200}
          height={200}
          className="object-contain"
          aria-hidden="true"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-black text-balance">
              {name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4">{title}</p>
            <div
              className="text-gray-700 mb-8 leading-relaxed prose prose-p:mb-2"
              dangerouslySetInnerHTML={{ __html: shortBio }}
            />
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-[#FFD700] text-black hover:bg-[#E6C200] font-semibold">
                <Link href="/about">Learn More</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white bg-transparent"
              >
                <Link href="/blog">Read Blog</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white bg-transparent"
              >
                <Link href="/contact">Contact</Link>
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-black shadow-2xl">
              <Image
                src={photo || "/placeholder.svg"}
                alt={`Portrait of ${name}`}
                fill
                className="object-cover object-top" // Aligned to top to prevent head cutoff

                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
