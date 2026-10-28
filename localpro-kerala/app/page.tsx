import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Search, ShieldCheck, Star, ArrowRight, Zap, Droplet, Wind, Sparkles, GraduationCap, Wrench } from "lucide-react";

const categories = [
  { name: "Electricians", icon: Zap, color: "bg-blue-50 text-blue-600" },
  { name: "Plumbers", icon: Droplet, color: "bg-cyan-50 text-cyan-600" },
  { name: "AC Technicians", icon: Wind, color: "bg-indigo-50 text-indigo-600" },
  { name: "Cleaning Services", icon: Sparkles, color: "bg-green-50 text-green-600" },
  { name: "Tutors", icon: GraduationCap, color: "bg-purple-50 text-purple-600" },
  { name: "Appliance Technicians", icon: Wrench, color: "bg-orange-50 text-orange-600" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F8FAFC] to-[#F8FAFC] pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 flex flex-col space-y-6">
                <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-[#0F2A5C]/10 text-[#0F2A5C] border border-[#0F2A5C]/20">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Trusted Across Kerala
                  </span>
                </div>
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0B132B] tracking-tight leading-tight">
                    Find Trusted Professionals Near You
                  </h1>
                  <p className="text-lg text-[#64748B] max-w-xl">
                    Connect with verified local service providers across Kerala for home repairs, maintenance, education, and more. Quality services you can trust.
                  </p>
                </div>

                {/* Search Bar */}
                <div className="p-2 sm:p-3 rounded-xl bg-white shadow-lg border border-[#E2E8F0]">
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex-1 relative flex items-center">
                      <Search className="absolute left-3.5 w-5 h-5 text-[#64748B]" />
                      <select className="w-full h-12 pl-11 pr-4 bg-[#F8FAFC] rounded-lg text-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#0F2A5C] appearance-none cursor-pointer">
                        <option value="">Select Service Category</option>
                        {categories.map((cat) => (
                          <option key={cat.name} value={cat.name.toLowerCase()}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1 relative flex items-center">
                      <Search className="absolute left-3.5 w-5 h-5 text-[#64748B]" />
                      <select className="w-full h-12 pl-11 pr-4 bg-[#F8FAFC] rounded-lg text-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#0F2A5C] appearance-none cursor-pointer">
                        <option value="">Select Location (District)</option>
                        <option value="thiruvananthapuram">Thiruvananthapuram</option>
                        <option value="ernakulam">Ernakulam</option>
                        <option value="kozhikode">Kozhikode</option>
                        <option value="thrissur">Thrissur</option>
                        <option value="kollam">Kollam</option>
                        <option value="kottayam">Kottayam</option>
                        <option value="alappuzha">Alappuzha</option>
                        <option value="palakkad">Palakkad</option>
                        <option value="malappuram">Malappuram</option>
                        <option value="kannur">Kannur</option>
                        <option value="kasaragod">Kasaragod</option>
                        <option value="wayanad">Wayanad</option>
                        <option value="idukki">Idukki</option>
                        <option value="pathanamthitta">Pathanamthitta</option>
                      </select>
                    </div>
                    <Link
                      href="/providers"
                      className="h-12 px-6 bg-[#163A5F] hover:bg-[#0F2A5C] text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm whitespace-nowrap"
                    >
                      <Search className="w-5 h-5" />
                      <span>Find Professionals</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-white aspect-[4/3]">
                  <img
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop"
                    alt="Professional service provider at work"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center justify-between border border-[#E2E8F0]">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-[#16A36A]/10 flex items-center justify-center text-[#16A36A]">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#0B132B]">Verified Professionals</h4>
                        <p className="text-sm text-[#64748B]">Trusted & Background Checked</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[#D97706]">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="font-semibold">4.9</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-[#0B132B] mb-2">Browse by Service Category</h2>
              <p className="text-[#64748B] max-w-2xl">
                Find the right professional for your needs across popular service categories
              </p>
            </div>
            <Link
              href="/providers"
              className="inline-flex items-center gap-2 text-[#0F2A5C] hover:text-[#163A5F] font-semibold transition-colors"
            >
              <span>View All Providers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.name}
                  href="/providers"
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-[#E2E8F0] hover:border-[#CBD5E1] group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0B132B] mb-2">{category.name}</h3>
                  <p className="text-sm text-[#64748B] mb-4">Find qualified professionals</p>
                  <div className="flex items-center gap-1 text-[#0F2A5C] text-sm font-medium">
                    <span>Browse</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Trust Section */}
        <section className="bg-white border-y border-[#E2E8F0] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-[#0B132B] mb-2">Why Choose LocalPro Kerala</h2>
              <p className="text-[#64748B]">Your trusted partner for local services</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#16A36A]/10 flex items-center justify-center text-[#16A36A] mx-auto mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-[#0B132B] mb-2">Verified Professionals</h3>
                <p className="text-sm text-[#64748B]">All service providers are verified for quality and reliability</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#0284C7]/10 flex items-center justify-center text-[#0284C7] mx-auto mb-4">
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-[#0B132B] mb-2">Quality Assured</h3>
                <p className="text-sm text-[#64748B]">Professional services with transparent pricing</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#0F2A5C]/10 flex items-center justify-center text-[#0F2A5C] mx-auto mb-4">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-[#0B132B] mb-2">Easy to Find</h3>
                <p className="text-sm text-[#64748B]">Search and connect with local professionals quickly</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
