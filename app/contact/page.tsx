import { ContactForm } from "@/components/contact-form"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export const metadata = {
  title: "Contact - Hon. Amb. CPA Benjamin Kipkirui Langat, CBS",
  description:
    "Get in touch with Hon. Amb. CPA Benjamin Kipkirui Langat, CBS, Member of Parliament for Ainamoi Constituency.",
}

export default function ContactPage() {
  return (
    <main className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions, concerns, or suggestions? We would love to hear from you. Reach out through any of the
            channels below or fill out the contact form.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-6">Get In Touch</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#FFD700] rounded-lg p-3">
                  <MapPin className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold text-black">Constituency Office</h3>
                  <p className="text-gray-600">
                    Ainamoi Constituency Office
                    <br />
                    Kericho County, Kenya
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#FFD700] rounded-lg p-3">
                  <Phone className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold text-black">Phone</h3>
                  <a href="tel:+254722895939" className="text-gray-600 hover:text-[#FFD700] transition-colors">
                    +254 722 895 939
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#FFD700] rounded-lg p-3">
                  <Mail className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold text-black">Email</h3>
                  <a href="mailto:lkbenjami@yahoo.com" className="text-gray-600 hover:text-[#FFD700] transition-colors">
                    lkbenjami@yahoo.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#FFD700] rounded-lg p-3">
                  <Clock className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold text-black">Office Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 8:00 AM - 5:00 PM
                    <br />
                    Saturday: 9:00 AM - 1:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Parliamentary Office */}
            <div className="mt-8 p-6 bg-[#FFD700]/10 border border-[#FFD700] rounded-lg">
              <h3 className="font-semibold text-black mb-2">Parliamentary Office</h3>
              <p className="text-gray-600 text-sm">
                Parliament Buildings
                <br />
                Parliament Road, Nairobi
                <br />
                P.O. Box 41842-00100
                <br />
                Nairobi, Kenya
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-6">Send a Message</h2>
            <div className="bg-[#F5F5F5] rounded-lg p-6 border border-gray-200">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
