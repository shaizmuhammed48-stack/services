"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  MapPin,
  Phone,
  Search,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import type { Company, Provider } from "@/lib/types";
import {
  distinctSorted,
  filterProvidersByCompany,
  findCompanyById,
  getCompanyContact,
  getCompanyImage,
  getCompanyName,
  getCompanyTown,
  getProviderCategory,
  getProviderDistrict,
  getProviderImage,
  getProviderName,
  getProviderPrice,
  getProviderStatus,
  isProviderActive,
  matchesProviderFilters,
  sortProviders,
  str,
  type ProviderSortKey,
} from "@/lib/utils/company-providers";

export default function CompanyDetailPage() {
  // useParams() data is only available at runtime — stream it in
  return (
    <Suspense fallback={<CompanyDetailsFallback />}>
      <CompanyDetails />
    </Suspense>
  );
}

function CompanyDetailsFallback() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="space-y-6">
            <Link
              href="/companies"
              className="inline-flex items-center gap-2 text-[#64748B] hover:text-[#0B132B] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Companies</span>
            </Link>
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-[#E2E8F0] animate-pulse">
              <div className="flex items-start gap-5">
                <div className="w-20 h-20 rounded-xl bg-[#F1F5F9] flex-shrink-0"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-[#F1F5F9] rounded w-1/3"></div>
                  <div className="h-4 bg-[#F1F5F9] rounded w-1/4"></div>
                  <div className="h-4 bg-[#F1F5F9] rounded w-1/2"></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 shadow-sm border border-[#E2E8F0] animate-pulse"
                >
                  <div className="h-4 bg-[#F1F5F9] rounded w-1/3 mb-4"></div>
                  <div className="h-6 bg-[#F1F5F9] rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-[#F1F5F9] rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function CompanyDetails() {
  const params = useParams<{ id: string }>();
  const companyIdParam = str(params?.id);

  const [companies, setCompanies] = useState<Company[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [sortKey, setSortKey] = useState<ProviderSortKey>("default");

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      setLoading(true);
      setError("");
      try {
        const [companiesRes, providersRes] = await Promise.all([
          fetch("/api/companies"),
          fetch("/api/providers"),
        ]);
        const companiesData = await companiesRes.json();
        const providersData = await providersRes.json();

        if (!companiesData.success || !Array.isArray(companiesData.data)) {
          throw new Error(
            companiesData.message ||
              "Failed to load companies from Google Sheets."
          );
        }
        if (!providersData.success || !Array.isArray(providersData.data)) {
          throw new Error(
            providersData.message ||
              "Failed to load providers from Google Sheets."
          );
        }
        if (cancelled) return;
        setCompanies(companiesData.data);
        setProviders(providersData.data);
      } catch (err: any) {
        if (cancelled) return;
        // Do not render any provider data when loading failed.
        setCompanies([]);
        setProviders([]);
        setError(
          err?.message ||
            "Could not load data from Google Sheets. Please try again."
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadData();
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const company = findCompanyById(companies, companyIdParam);
  const companyProviders = company
    ? filterProvidersByCompany(providers, companyIdParam)
    : [];

  const categoryOptions = distinctSorted(
    companyProviders.map(getProviderCategory)
  );
  const districtOptions = distinctSorted(
    companyProviders.map(getProviderDistrict)
  );

  const visibleProviders = sortProviders(
    companyProviders.filter((provider) =>
      matchesProviderFilters(provider, {
        search,
        category: categoryFilter,
        district: districtFilter,
      })
    ),
    sortKey
  );

  const hasActiveFilters =
    search !== "" || categoryFilter !== "" || districtFilter !== "";

  function clearFilters() {
    setSearch("");
    setCategoryFilter("");
    setDistrictFilter("");
    setSortKey("default");
  }

  const name = company ? getCompanyName(company) : "";
  const logo = company ? getCompanyImage(company) : "";
  const town = company ? getCompanyTown(company) : "";
  const contact = company ? getCompanyContact(company) : "";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <Link
            href="/companies"
            className="inline-flex items-center gap-2 text-[#64748B] hover:text-[#0B132B] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Companies</span>
          </Link>

          {loading ? (
            <>
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-[#E2E8F0] mb-8 animate-pulse">
                <div className="flex items-start gap-5">
                  <div className="w-20 h-20 rounded-xl bg-[#F1F5F9] flex-shrink-0"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-6 bg-[#F1F5F9] rounded w-1/3"></div>
                    <div className="h-4 bg-[#F1F5F9] rounded w-1/4"></div>
                    <div className="h-4 bg-[#F1F5F9] rounded w-1/2"></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-6 shadow-sm border border-[#E2E8F0] animate-pulse"
                  >
                    <div className="h-4 bg-[#F1F5F9] rounded w-1/3 mb-4"></div>
                    <div className="h-6 bg-[#F1F5F9] rounded w-2/3 mb-2"></div>
                    <div className="h-4 bg-[#F1F5F9] rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </>
          ) : error ? (
            <div className="bg-white rounded-xl p-10 text-center shadow-sm border border-[#E2E8F0]">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-6 h-6 text-red-500" />
              </div>
              <h2 className="text-lg font-semibold text-[#0B132B] mb-2">
                Couldn&apos;t load Google Sheets data
              </h2>
              <p className="text-[#64748B] mb-6 max-w-md mx-auto">{error}</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setReloadKey((k) => k + 1)}
                  className="px-6 py-2.5 bg-[#163A5F] text-white rounded-lg hover:bg-[#0F2A5C] transition-colors text-sm font-semibold"
                >
                  Try Again
                </button>
                <Link
                  href="/companies"
                  className="px-6 py-2.5 rounded-lg border border-[#E2E8F0] text-[#0B132B] hover:bg-[#F8FAFC] transition-colors text-sm font-medium"
                >
                  Back to Companies
                </Link>
              </div>
            </div>
          ) : !company ? (
            <div className="bg-white rounded-xl p-10 text-center shadow-sm border border-[#E2E8F0]">
              <div className="w-12 h-12 rounded-full bg-[#F1F5F9] flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-6 h-6 text-[#94A3B8]" />
              </div>
              <h2 className="text-lg font-semibold text-[#0B132B] mb-2">
                Company Not Found
              </h2>
              <p className="text-[#64748B] mb-6">
                We couldn&apos;t find a company with ID
                {companyIdParam ? ` “${companyIdParam}”` : " this ID"}.
              </p>
              <Link
                href="/companies"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#163A5F] text-white rounded-lg hover:bg-[#0F2A5C] transition-colors text-sm font-semibold"
              >
                <span>Back to Companies</span>
              </Link>
            </div>
          ) : (
            <>
              {/* Company header */}
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-[#E2E8F0] mb-8">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-20 h-20 rounded-xl bg-[#F1F5F9] overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={logo}
                        alt={name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Building2 className="w-10 h-10 text-[#0F2A5C]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h1 className="text-2xl font-bold text-[#0B132B]">
                        {name || "Unnamed Company"}
                      </h1>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#0F2A5C]/10 text-[#0F2A5C] text-xs font-semibold">
                        ID: {companyIdParam}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#64748B]">
                      {town && (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          <span>{town}</span>
                        </span>
                      )}
                      {contact && (
                        <span className="flex items-center gap-1.5">
                          <Phone className="w-4 h-4" />
                          <span>{contact}</span>
                        </span>
                      )}
                      <span className="flex items-center gap-1.5 text-[#0F2A5C] font-semibold">
                        <Users className="w-4 h-4" />
                        <span>
                          {companyProviders.length}{" "}
                          {companyProviders.length === 1
                            ? "Provider"
                            : "Providers"}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Providers */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-[#0B132B] mb-1">
                  Service Providers
                </h2>
                <p className="text-sm text-[#64748B]">
                  {companyProviders.length === 0
                    ? "Providers belonging to this company"
                    : hasActiveFilters
                      ? `Showing ${visibleProviders.length} of ${companyProviders.length} providers for this company`
                      : `${companyProviders.length} ${
                          companyProviders.length === 1
                            ? "provider"
                            : "providers"
                        } for this company`}
                </p>
              </div>

              {companyProviders.length === 0 ? (
                <div className="bg-white rounded-xl p-10 text-center shadow-sm border border-[#E2E8F0]">
                  <Users className="w-12 h-12 text-[#94A3B8] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#0B132B] mb-2">
                    No Service Providers Yet
                  </h3>
                  <p className="text-[#64748B] mb-6">
                    This company doesn&apos;t have any providers listed yet.
                    Check back soon or browse all providers.
                  </p>
                  <Link
                    href="/providers"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#163A5F] text-white rounded-lg hover:bg-[#0F2A5C] transition-colors text-sm font-semibold"
                  >
                    <span>Browse All Providers</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <>
                  {/* Search / filters / sort */}
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E2E8F0] mb-6">
                    <div className="flex flex-col md:flex-row gap-3">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                        <input
                          type="text"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Search providers by name..."
                          className="w-full h-11 pl-10 pr-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#0B132B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0F2A5C]"
                        />
                      </div>
                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="h-11 px-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#0F2A5C]"
                      >
                        <option value="">All Categories</option>
                        {categoryOptions.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                      <select
                        value={districtFilter}
                        onChange={(e) => setDistrictFilter(e.target.value)}
                        className="h-11 px-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#0F2A5C]"
                      >
                        <option value="">All Districts</option>
                        {districtOptions.map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                      <select
                        value={sortKey}
                        onChange={(e) =>
                          setSortKey(e.target.value as ProviderSortKey)
                        }
                        className="h-11 px-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#0F2A5C]"
                      >
                        <option value="default">Sort: Active First</option>
                        <option value="name">Sort: Name (A–Z)</option>
                        <option value="price">Sort: Price (Low to High)</option>
                        <option value="category">Sort: Category (A–Z)</option>
                      </select>
                      <button
                        onClick={clearFilters}
                        className="h-11 px-4 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0B132B] transition-colors"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </div>

                  {visibleProviders.length === 0 ? (
                    <div className="bg-white rounded-xl p-10 text-center shadow-sm border border-[#E2E8F0]">
                      <Search className="w-12 h-12 text-[#94A3B8] mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-[#0B132B] mb-2">
                        No Providers Match Your Filters
                      </h3>
                      <p className="text-[#64748B] mb-6">
                        Try adjusting your search or filters to see this
                        company&apos;s providers.
                      </p>
                      <button
                        onClick={clearFilters}
                        className="px-6 py-2.5 bg-[#163A5F] text-white rounded-lg hover:bg-[#0F2A5C] transition-colors text-sm font-semibold"
                      >
                        Clear Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {visibleProviders.map((provider) => {
                        const providerId = str(provider.id);
                        const img = getProviderImage(provider);
                        const price = getProviderPrice(provider);
                        const category = getProviderCategory(provider);
                        const district = getProviderDistrict(provider);
                        const status = getProviderStatus(provider);
                        const isActive = isProviderActive(provider);
                        const providerName = getProviderName(provider);

                        return (
                          <div
                            key={providerId}
                            className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] hover:shadow-md hover:border-[#CBD5E1] transition-all overflow-hidden"
                          >
                            <div className="p-6">
                              <div className="flex items-start gap-4 mb-4">
                                <div className="w-16 h-16 rounded-xl bg-[#F1F5F9] overflow-hidden flex-shrink-0 flex items-center justify-center">
                                  {img ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                      src={img}
                                      alt={providerName}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <span className="text-xl font-bold text-[#0F2A5C]">
                                      {providerName.charAt(0).toUpperCase()}
                                    </span>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2 mb-1">
                                    <h3 className="font-semibold text-[#0B132B] truncate">
                                      {providerName}
                                    </h3>
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
                                  <p className="text-sm text-[#64748B] mb-1">
                                    {category || "-"}
                                  </p>
                                  <div className="flex items-center gap-1 text-sm text-[#64748B]">
                                    <MapPin className="w-3.5 h-3.5" />
                                    <span className="truncate">
                                      {district || "-"}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between mb-4 text-sm">
                                <span className="text-[#64748B]">
                                  Price/Hour
                                </span>
                                <span className="text-[#0F2A5C] font-semibold">
                                  {price !== null
                                    ? `₹${price}/hour`
                                    : "Price N/A"}
                                </span>
                              </div>

                              <div className="flex gap-2">
                                <Link
                                  href={`/providers/${encodeURIComponent(
                                    providerId
                                  )}`}
                                  className="flex-1 px-4 py-2 text-center rounded-lg border border-[#E2E8F0] text-[#0B132B] hover:bg-[#F8FAFC] transition-colors text-sm font-medium"
                                >
                                  View Details
                                </Link>
                                <Link
                                  href={`/book?provider=${encodeURIComponent(
                                    providerId
                                  )}`}
                                  className={`flex-1 px-4 py-2 text-center rounded-lg text-white text-sm font-medium transition-colors ${
                                    isActive
                                      ? "bg-[#163A5F] hover:bg-[#0F2A5C]"
                                      : "bg-[#94A3B8] cursor-not-allowed pointer-events-none"
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
                </>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
