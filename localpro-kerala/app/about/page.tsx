import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ShieldCheck, Search, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#0B132B] mb-4">About LocalPro Kerala</h1>
            <p className="text-lg text-[#64748B]">
              Connecting customers with trusted local service providers across Kerala
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-8 mb-8">
            <h2 className="text-2xl font-semibold text-[#0B132B] mb-4">Our Mission</h2>
            <p className="text-[#64748B] leading-relaxed mb-6">
              LocalPro Kerala helps customers discover and connect with trusted local service providers across Kerala, India. 
              Our platform makes it easy to find professionals for home repairs, maintenance, education, and everyday needs.
            </p>
            
            <h2 className="text-2xl font-semibold text-[#0B132B] mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0F2A5C]/10 flex items-center justify-center text-[#0F2A5C] flex-shrink-0">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0B132B] mb-1">Search</h3>
                  <p className="text-[#64748B]">Find service providers by category and location across Kerala</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0284C7]/10 flex items-center justify-center text-[#0284C7] flex-shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0B132B] mb-1">Connect</h3>
                  <p className="text-[#64748B]">View provider profiles and connect with them directly</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#16A36A]/10 flex items-center justify-center text-[#16A36A] flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0B132B] mb-1">Book</h3>
                  <p className="text-[#64748B]">Request services and manage your bookings</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#F8FAFC] rounded-xl p-6 text-center border border-[#E2E8F0]">
            <p className="text-[#64748B]">
              LocalPro Kerala is a platform for connecting customers with local service providers. 
              We do not claim all providers are verified unless stated otherwise.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
