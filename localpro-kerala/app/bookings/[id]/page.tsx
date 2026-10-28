import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          {/* params is runtime data — stream it inside Suspense */}
          <Suspense fallback={<BookingDetailFallback />}>
            <BookingDetail params={params} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function BookingDetailFallback() {
  return (
    <div className="space-y-6">
      <div className="h-4 bg-[#F1F5F9] rounded w-36"></div>
      <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-6 sm:p-8 animate-pulse">
        <div className="h-6 bg-[#F1F5F9] rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-[#F1F5F9] rounded w-1/2"></div>
      </div>
    </div>
  );
}

async function BookingDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <Link href="/bookings" className="inline-flex items-center gap-2 text-[#64748B] hover:text-[#0B132B] mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Bookings</span>
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-[#0B132B] mb-4">Booking {id}</h1>
        <p className="text-[#64748B]">Booking details will load from the API.</p>
      </div>
    </>
  );
}
