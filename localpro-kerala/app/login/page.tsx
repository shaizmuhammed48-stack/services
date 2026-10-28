import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#0B132B] mb-2">Login</h1>
            <p className="text-[#64748B]">Sign in to your account</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-8">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#0B132B] mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                  <input
                    type="email"
                    className="w-full h-11 pl-10 pr-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#0F2A5C]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0B132B] mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                  <input
                    type="password"
                    className="w-full h-11 pl-10 pr-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#0B132B] focus:outline-none focus:ring-2 focus:ring-[#0F2A5C]"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full h-11 bg-[#163A5F] text-white rounded-lg hover:bg-[#0F2A5C] transition-colors font-semibold"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-[#64748B]">Don't have an account? </span>
              <Link href="/register" className="text-[#0F2A5C] hover:underline font-medium">
                Register
              </Link>
            </div>

            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs text-amber-800">
                Authentication not configured. Secure authentication needs to be implemented.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
