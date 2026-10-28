import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white mt-auto border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#0F2A5C] flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-semibold text-lg text-[#0B132B]">LocalPro Kerala</span>
            </div>
            <p className="text-sm text-[#64748B] max-w-md">
              A trusted platform helping customers find verified local service providers across Kerala, India. Connect with professionals for home and business services.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#0B132B] mb-3 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-[#64748B]">
              <li>
                <Link href="/providers" className="hover:text-[#0F2A5C] transition-colors">
                  Providers
                </Link>
              </li>
              <li>
                <Link href="/companies" className="hover:text-[#0F2A5C] transition-colors">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="/bookings" className="hover:text-[#0F2A5C] transition-colors">
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#0B132B] mb-3 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-[#64748B]">
              <li>
                <Link href="#" className="hover:text-[#0F2A5C] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#0F2A5C] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#0F2A5C] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#0F2A5C] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-[#E2E8F0] text-center text-sm text-[#64748B]">
          <p>© 2026 LocalPro Kerala. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
