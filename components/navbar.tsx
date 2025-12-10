"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/agenda", label: "Agenda" },
  { href: "/projects", label: "Projects" },
  { href: "/cdf", label: "NG-CDF" },
  {
    label: "Media",
    children: [
      { href: "/blog", label: "Blog" },
      { href: "/gallery", label: "Gallery" },
    ],
  },
  { href: "/report-issue", label: "Report Issue" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="bg-black dark:bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white p-1">
              <Image src="/kenya-coat-of-arms-emblem.webp" alt="Coat of Arms" fill className="object-contain" />
            </div>
            <span className="font-bold text-lg hidden sm:block">Hon. Benjamin Langat</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              if (link.children) {
                return (
                  <DropdownMenu key={link.label}>
                    <DropdownMenuTrigger className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-[#FFD700] hover:text-black transition-colors focus:outline-none">
                      {link.label}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-black dark:bg-gray-900 border-white/20 text-white">
                      {link.children.map((child) => (
                        <DropdownMenuItem key={child.href} asChild>
                          <Link
                            href={child.href}
                            className={`w-full cursor-pointer hover:bg-[#FFD700] hover:text-black focus:bg-[#FFD700] focus:text-black ${pathname === child.href ? "bg-[#FFD700] text-black" : ""
                              }`}
                          >
                            {child.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              }
              return (
                <Link
                  key={link.href}
                  href={link.href!}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === link.href ? "bg-[#FFD700] text-black" : "text-white hover:bg-[#FFD700] hover:text-black"
                    }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-[#FFD700] hover:text-black"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 bg-black dark:bg-gray-900">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                if (link.children) {
                  return (
                    <div key={link.label} className="flex flex-col">
                      <div className="px-3 py-2 text-sm font-bold text-[#FFD700] opacity-80 uppercase tracking-wider">
                        {link.label}
                      </div>
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors pl-6 ${pathname === child.href
                            ? "bg-[#FFD700] text-black"
                            : "text-white hover:bg-[#FFD700] hover:text-black"
                            }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href!}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === link.href
                      ? "bg-[#FFD700] text-black"
                      : "text-white hover:bg-[#FFD700] hover:text-black"
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
