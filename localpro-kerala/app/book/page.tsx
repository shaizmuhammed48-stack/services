"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calendar, User, Phone, MessageSquare, Clock } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function BookForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    providerId: searchParams.get("provider") || "",
    preferredDate: "",
    startTime: "",
    endTime: "",
    message: "",
  });

  useEffect(() => {
    const provider = searchParams.get("provider");
    if (provider) {
      setFormData(prev => ({ ...prev, providerId: provider }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          providerId: formData.providerId,
          message: formData.message || `Service request from ${formData.customerName}`,
          startTime: formData.startTime,
          endTime: formData.endTime,
          status: "pending",
          paymentStatus: "unpaid",
        }),
      });

      const data = await res.json();
      
      if (data.success || data.bookingId) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/bookings");
        }, 2000);
      } else if (data.error) {
        setError(data.message || "Failed to submit booking");
      } else {
        setError("Failed to submit booking");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (success) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-[#0B132B] mb-2">Booking Submitted Successfully!</h2>
        <p className="text-[#64748B] mb-4">Your booking request has been sent. Redirecting to bookings...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-6 sm:p-8 space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-[#0B132B] mb-2">
          Full Name <span className="text-[#DC2626]">*</span>
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            className="w-full h-11 pl-10 pr-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#0F2A5C] focus:bg-white"
            placeholder="Enter your full name"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#0B132B] mb-2">
          Phone Number <span className="text-[#DC2626]">*</span>
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
          <input
            type="tel"
            name="customerPhone"
            value={formData.customerPhone}
            onChange={handleChange}
            required
            className="w-full h-11 pl-10 pr-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#0F2A5C] focus:bg-white"
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#0B132B] mb-2">
          Provider ID <span className="text-[#DC2626]">*</span>
        </label>
        <input
          type="text"
          name="providerId"
          value={formData.providerId}
          onChange={handleChange}
          required
          className="w-full h-11 px-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#0F2A5C] focus:bg-white"
          placeholder="e.g., PR001"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#0B132B] mb-2">
            Start Time <span className="text-[#DC2626]">*</span>
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <input
              type="text"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
              className="w-full h-11 pl-10 pr-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#0F2A5C] focus:bg-white"
              placeholder="e.g., 1:00 PM"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0B132B] mb-2">
            End Time <span className="text-[#DC2626]">*</span>
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <input
              type="text"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
              className="w-full h-11 pl-10 pr-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#0F2A5C] focus:bg-white"
              placeholder="e.g., 2:00 PM"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#0B132B] mb-2">
          Service Request / Message <span className="text-[#DC2626]">*</span>
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-[#64748B]" />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#0F2A5C] focus:bg-white resize-none"
            placeholder="Describe the service you need..."
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 bg-[#163A5F] text-white rounded-lg hover:bg-[#0F2A5C] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Submit Booking Request"}
        </button>
        <p className="text-xs text-[#64748B] text-center mt-2">
          Booking will be saved to Google Sheets
        </p>
      </div>
    </form>
  );
}

export default function BookPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0B132B] mb-2">Book a Service</h1>
            <p className="text-[#64748B]">Fill in your details to request a service</p>
          </div>

          <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
            <BookForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
