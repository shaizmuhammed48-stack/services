import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function ProviderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {/* params is runtime data — stream it inside Suspense */}
          <Suspense fallback={<ProviderDetailFallback />}>
            <ProviderDetail params={params} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ProviderDetailFallback() {
  return (
    <div className="space-y-6">
      <div className="h-4 bg-[#F1F5F9] rounded w-36"></div>
      <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden">
        <div className="p-6 sm:p-8 animate-pulse">
          <div className="flex flex-col sm:flex-row gap-6 mb-6">
            <div className="w-24 h-24 rounded-xl bg-[#F1F5F9] flex-shrink-0"></div>
            <div className="flex-1 space-y-3">
              <div className="h-6 bg-[#F1F5F9] rounded w-1/3"></div>
              <div className="h-4 bg-[#F1F5F9] rounded w-1/4"></div>
              <div className="h-4 bg-[#F1F5F9] rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-6 sm:p-8 animate-pulse">
        <div className="h-5 bg-[#F1F5F9] rounded w-1/4 mb-4"></div>
        <div className="h-10 bg-[#F1F5F9] rounded w-40"></div>
      </div>
    </div>
  );
}

async function ProviderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <Link href="/providers" className="inline-flex items-center gap-2 text-[#64748B] hover:text-[#0B132B] mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Providers</span>
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden mb-6">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-6 mb-6">
            <div className="w-24 h-24 rounded-xl bg-[#F1F5F9] flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-[#0F2A5C]">P</span>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-[#0B132B] mb-2">Provider {id}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#64748B] mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>Location not specified</span>
                </div>
              </div>
              <p className="text-[#64748B]">
                Provider details will load from the API when configured.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-[#0B132B] mb-4">Book This Service</h2>
        <Link
          href="/book"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#163A5F] text-white rounded-lg hover:bg-[#0F2A5C] transition-colors"
        >
          <span>Proceed to Booking</span>
        </Link>
      </div>
    </>
  );
}
