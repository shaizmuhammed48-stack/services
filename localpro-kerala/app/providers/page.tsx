"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Search, Filter, Users, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Provider {
  id: string;
  name: string;
  category: string;
  district: string;
  "company id"?: string;
  companyId?: string;
  company_id?: string;
  "price per hr"?: string | number;
  pricePerHr?: string | number;
  price_per_hr?: string | number;
  status?: string;
  contact?: string;
  "image url"?: string;
  imageUrl?: string;
  "img url"?: string;
  imgUrl?: string;
}

export default function ProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchProviders();
  }, []);

  async function fetchProviders() {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/providers");
      const data = await res.json();
      if (data.success && data.data) {
        setProviders(data.data);
      } else if (data.error) {
        setError(data.message || "Failed to load providers");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const filtered = providers.filter((p) => {
    const matchesSearch =
      !search ||
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.id?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      p.status?.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const activeCount = providers.filter((p) => p.status?.toLowerCase() === "active").length;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0B132B] mb-2">Provider Directory</h1>
            <p className="text-[#64748B]">
              {loading ? "Loading..." : `${activeCount} active providers • ${providers.length} total`}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E2E8F0] mb-6">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search providers by name, ID, or category..."
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#0B132B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0F2A5C]"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-11 px-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#0F2A5C]"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                }}
                className="h-11 px-4 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] transition-colors"
              >
                Reset
              </button>
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
              <Users className="w-12 h-12 text-[#94A3B8] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#0B132B] mb-2">No Providers Found</h3>
              <p className="text-[#64748B]">Try adjusting your filters or check the API connection.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((provider) => {
                const img = provider["image url"] || provider["img url"] || provider.imageUrl || provider.imgUrl || "";
                const price = provider["price per hr"] || provider["pricePerHr"] || provider.price_per_hr || "-";
                const comp = provider["company id"] || provider["companyId"] || provider.company_id || "-";
                const status = (provider.status || "").toString().trim();
                const isActive = status.toLowerCase() === "active";
                
                return (
                  <div
                    key={provider.id}
                    className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] hover:shadow-md hover:border-[#CBD5E1] transition-all overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 rounded-xl bg-[#F1F5F9] overflow-hidden flex-shrink-0 flex items-center justify-center">
                          {img ? (
                            <img src={img} alt={provider.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xl font-bold text-[#0F2A5C]">
                              {provider.name?.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-semibold text-[#0B132B] truncate">{provider.name}</h3>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0 ${
                                isActive
                                  ? "bg-[#16A36A]/10 text-[#16A36A]"
                                  : "bg-[#94A3B8]/10 text-[#64748B]"
                              }`}
                            >
                              {status || "N/A"}
                            </span>
                          </div>
                          <p className="text-sm text-[#64748B] mb-1">{provider.category}</p>
                          <div className="flex items-center gap-1 text-sm text-[#64748B]">
                            <MapPin className="w-3.5 h-3.5" />
                            <span className="truncate">{provider.district || "-"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-[#64748B]">Provider ID</span>
                          <span className="text-[#0B132B] font-medium">{provider.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#64748B]">Company</span>
                          <span className="text-[#0B132B] font-medium">{comp}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#64748B]">Price/Hour</span>
                          <span className="text-[#0F2A5C] font-semibold">₹{price}</span>
                        </div>
                        {provider.contact && (
                          <div className="flex justify-between">
                            <span className="text-[#64748B]">Contact</span>
                            <span className="text-[#0B132B] flex items-center gap-1">
                              <Phone className="w-3.5 h-3.5" />
                              {provider.contact}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href={`/providers/${provider.id}`}
                          className="flex-1 px-4 py-2 text-center rounded-lg border border-[#E2E8F0] text-[#0B132B] hover:bg-[#F8FAFC] transition-colors text-sm font-medium"
                        >
                          View Profile
                        </Link>
                        <Link
                          href={`/book?provider=${provider.id}`}
                          className={`flex-1 px-4 py-2 text-center rounded-lg text-white text-sm font-medium transition-colors ${
                            isActive ? "bg-[#163A5F] hover:bg-[#0F2A5C]" : "bg-[#94A3B8] cursor-not-allowed pointer-events-none"
                          }`}
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
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
