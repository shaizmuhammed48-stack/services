"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calendar, Clock, User, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";

interface Booking {
  id: string;
  "pr id"?: string;
  prId?: string;
  providerId?: string;
  message?: string;
  "start time"?: string;
  startTime?: string;
  "end time"?: string;
  endTime?: string;
  status?: string;
  "payment status"?: string;
  paymentStatus?: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/bookings");
      const data = await res.json();
      if (data.success && data.data) {
        setBookings(data.data);
      } else if (data.error) {
        setError(data.message || "Failed to load bookings");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0B132B] mb-2">Bookings</h1>
            <p className="text-[#64748B]">
              {loading ? "Loading..." : `${bookings.length} bookings`}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700 text-sm">
              {error}
            </div>
          )}

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-[#E2E8F0] animate-pulse">
                  <div className="h-4 bg-[#F1F5F9] rounded w-1/4 mb-4"></div>
                  <div className="h-6 bg-[#F1F5F9] rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-[#F1F5F9] rounded w-1/3"></div>
                </div>
              ))}
            </div>
          ) : bookings.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-[#E2E8F0]">
              <Calendar className="w-12 h-12 text-[#94A3B8] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#0B132B] mb-2">No Bookings Found</h3>
              <p className="text-[#64748B]">Your booking history will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => {
                const providerId = booking["pr id"] || booking.prId || booking.providerId || "-";
                const startTime = booking["start time"] || booking.startTime || "-";
                const endTime = booking["end time"] || booking.endTime || "-";
                const status = (booking.status || "").toString();
                const paymentStatus = (booking["payment status"] || booking.paymentStatus || "").toString();
                const statusLower = status.toLowerCase();
                const paymentLower = paymentStatus.toLowerCase();
                
                return (
                  <div
                    key={booking.id}
                    className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-6 hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-[#0B132B]">Booking #{booking.id}</h3>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                              statusLower === "confirmed" || statusLower === "completed" || statusLower === "compeleted"
                                ? "bg-[#16A36A]/10 text-[#16A36A]"
                                : statusLower === "contacted"
                                ? "bg-[#3B82F6]/10 text-[#3B82F6]"
                                : "bg-[#F59E0B]/10 text-[#F59E0B]"
                            }`}
                          >
                            {status || "N/A"}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                              paymentLower === "paid"
                                ? "bg-[#16A36A]/10 text-[#16A36A]"
                                : "bg-[#EF4444]/10 text-[#EF4444]"
                            }`}
                          >
                            {paymentStatus || "N/A"}
                          </span>
                        </div>
                        <p className="text-[#64748B] mb-4">{booking.message}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-[#64748B]">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>Provider: {providerId}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>
                              {startTime} - {endTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            <span>Payment: {paymentStatus || "N/A"}</span>
                          </div>
                        </div>
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
