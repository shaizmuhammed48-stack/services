import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#0B132B] mb-4">Contact Us</h1>
            <p className="text-lg text-[#64748B]">Get in touch with us</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-8">
              <h2 className="text-xl font-semibold text-[#0B132B] mb-6">Send us a message</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#0B132B] mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full h-11 px-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#0F2A5C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0B132B] mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full h-11 px-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#0F2A5C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0B132B] mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#0F2A5C] resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-11 bg-[#163A5F] text-white rounded-lg hover:bg-[#0F2A5C] transition-colors font-semibold"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0F2A5C]/10 flex items-center justify-center text-[#0F2A5C] flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0B132B] mb-1">Location</h3>
                    <p className="text-[#64748B]">Kerala, India</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0284C7]/10 flex items-center justify-center text-[#0284C7] flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0B132B] mb-1">Email</h3>
                    <p className="text-[#64748B]">Contact details to be configured</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#16A36A]/10 flex items-center justify-center text-[#16A36A] flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0B132B] mb-1">Phone</h3>
                    <p className="text-[#64748B]">Contact details to be configured</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
