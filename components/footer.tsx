import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-12 h-12">
                <Image src="/kenya-coat-of-arms-emblem.webp" alt="Coat of Arms" fill className="object-contain" />
              </div>
              <h3 className="text-xl font-bold">Hon. Amb. CPA Benjamin Langat, CBS</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Member of Parliament for Ainamoi Constituency, committed to serving the people and driving development in
              our community.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/AmbBenjaminLangat" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#FFD700] transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/agenda" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  Agenda
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-[#FFD700]" />
                <span className="text-gray-300 text-sm">Ainamoi Constituency, Kericho County</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-[#FFD700]" />
                <a href="tel:+254722895939" className="text-gray-300 text-sm hover:text-[#FFD700] transition-colors">
                  +254 722 895 939
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-[#FFD700]" />
                <a href="mailto:lkbenjami@yahoo.com" className="text-gray-300 text-sm hover:text-[#FFD700] transition-colors">
                  lkbenjami@yahoo.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Hon. Amb. CPA Benjamin Kipkirui Langat, CBS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
