"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Search, Building2, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Company {
  id: string;
  "company name"?: string;
  companyName?: string;
  name?: string;
  "image url"?: string;
  imageUrl?: string;
  imgUrl?: string;
  town?: string;
  location?: string;
  district?: string;
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, []);

  async function fetchCompanies() {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/companies");
      const data = await res.json();
      if (data.success && data.data) {
        setCompanies(data.data);
      } else if (data.error) {
        setError(data.message || "Failed to load companies");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const filtered = companies.filter((c) => {
    if (!search) return true;
    const name = c["company name"] || c.companyName || c.name || "";
    const id = c.id || "";
    const town = c.town || c.location || c.district || "";
    const q = search.toLowerCase();
    return name.toLowerCase().includes(q) || id.toLowerCase().includes(q) || town.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0B132B] mb-2">Companies Directory</h1>
            <p className="text-[#64748B]">
              {loading ? "Loading..." : `${filtered.length} companies • ${companies.length} total`}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E2E8F0] mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search companies..."
                className="w-full h-11 pl-10 pr-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#0B132B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0F2A5C]"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700 text-sm">
              {error}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-[#E2E8F0] animate-pulse">
                  <div className="h-4 bg-[#F1F5F9] rounded w-1/3 mb-4"></div>
                  <div className="h-6 bg-[#F1F5F9] rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-[#F1F5F9] rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-[#E2E8F0]">
              <Building2 className="w-12 h-12 text-[#94A3B8] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#0B132B] mb-2">No Companies Found</h3>
              <p className="text-[#64748B]">Try adjusting your search or check the API connection.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((company) => {
                const name = company["company name"] || company.companyName || company.name || "-";
                const img = company["image url"] || company.imageUrl || company.imgUrl || "";
                const town = company.town || company.location || company.district || "-";
                const companyId = (company.id || "").trim();
                return (
                  <Link
                    key={company.id}
                    href={`/companies/${encodeURIComponent(companyId)}`}
                    className="block bg-white rounded-xl shadow-sm border border-[#E2E8F0] hover:shadow-md hover:border-[#CBD5E1] hover:-translate-y-0.5 transition-all overflow-hidden cursor-pointer group"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 rounded-xl bg-[#F1F5F9] overflow-hidden flex-shrink-0 flex items-center justify-center">
                          {img ? (
                            <img src={img} alt={name} className="w-full h-full object-cover" />
                          ) : (
                            <Building2 className="w-8 h-8 text-[#0F2A5C]" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-[#0B132B] mb-1 truncate">{name}</h3>
                          <p className="text-sm text-[#64748B] mb-1">ID: {company.id}</p>
                          <div className="flex items-center gap-1 text-sm text-[#64748B]">
                            <MapPin className="w-3.5 h-3.5" />
                            <span className="truncate">{town}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#0F2A5C] text-sm font-medium pt-4 border-t border-[#F1F5F9]">
                        <span>View Providers</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
