"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";
import LoginModal from "@/components/auth/LoginModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [userName, setUserName] = useState("");

  const userNameRef = useRef("");
  const triggerRef = useRef<HTMLElement | null>(null);
  const pillRef = useRef<HTMLDivElement | null>(null);
  const loginBtnRef = useRef<HTMLButtonElement | null>(null);

  const openLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = event.currentTarget;
    setLoginOpen(true);
  };

  const closeLogin = useCallback(() => {
    setLoginOpen(false);
    // Return focus to whichever control opened the dialog (or the pill
    // that replaced it after a successful submission).
    requestAnimationFrame(() => {
      if (userNameRef.current && pillRef.current) {
        pillRef.current.focus();
        return;
      }
      const trigger = triggerRef.current;
      if (trigger && trigger.isConnected) {
        trigger.focus();
        return;
      }
      loginBtnRef.current?.focus();
    });
  }, []);

  const handleLoginSuccess = useCallback((name: string) => {
    userNameRef.current = name;
    setUserName(name);
  }, []);

  const clearUser = () => {
    userNameRef.current = "";
    setUserName("");
    requestAnimationFrame(() => loginBtnRef.current?.focus());
  };

  const firstName = userName.trim().split(/\s+/)[0] || userName;

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(15,42,92,0.04)] border-b border-[#E2E8F0]">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-[#0F2A5C] flex items-center justify-center text-white shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="font-semibold text-lg text-[#0B132B] block leading-none">
              LocalPro Kerala
            </span>
            <span className="text-xs text-[#0F2A5C] tracking-wide block uppercase mt-0.5 font-semibold">
              Trusted Services
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-2">
          <Link
            href="/"
            className="px-3 py-2 rounded-lg text-sm font-medium text-[#64748B] hover:text-[#0B132B] hover:bg-[#F1F5F9] transition-all"
          >
            Home
          </Link>
          <Link
            href="/providers"
            className="px-3 py-2 rounded-lg text-sm font-medium text-[#64748B] hover:text-[#0B132B] hover:bg-[#F1F5F9] transition-all"
          >
            Providers
          </Link>
          <Link
            href="/companies"
            className="px-3 py-2 rounded-lg text-sm font-medium text-[#64748B] hover:text-[#0B132B] hover:bg-[#F1F5F9] transition-all"
          >
            Companies
          </Link>
          <Link
            href="/bookings"
            className="px-3 py-2 rounded-lg text-sm font-medium text-[#64748B] hover:text-[#0B132B] hover:bg-[#F1F5F9] transition-all"
          >
            Bookings
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {userName ? (
            <div
              ref={pillRef}
              tabIndex={-1}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0F2A5C]/10 text-[#0F2A5C] text-sm font-semibold outline-none"
            >
              <span className="max-w-[9rem] truncate">Hi, {firstName}</span>
              <button
                type="button"
                onClick={clearUser}
                aria-label={`Clear user name (currently ${userName})`}
                className="p-0.5 rounded hover:bg-[#0F2A5C]/10 transition-colors"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              ref={loginBtnRef}
              onClick={openLogin}
              className="px-4 py-2 rounded-lg border border-[#E2E8F0] text-[#0B132B] text-sm font-medium hover:bg-[#F8FAFC] transition-all"
            >
              Login
            </button>
          )}
          <Link
            href="/book"
            className="px-4 py-2 rounded-lg bg-[#163A5F] text-white text-sm font-semibold hover:bg-[#0F2A5C] transition-colors shadow-sm"
          >
            Book Service
          </Link>
        </div>

        <button
          className="lg:hidden p-2 rounded-lg hover:bg-[#F1F5F9] transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t border-[#E2E8F0] bg-white">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1">
            <Link href="/" className="px-3 py-2 rounded-lg text-sm font-medium text-[#0B132B] hover:bg-[#F1F5F9]">
              Home
            </Link>
            <Link href="/providers" className="px-3 py-2 rounded-lg text-sm font-medium text-[#0B132B] hover:bg-[#F1F5F9]">
              Providers
            </Link>
            <Link href="/companies" className="px-3 py-2 rounded-lg text-sm font-medium text-[#0B132B] hover:bg-[#F1F5F9]">
              Companies
            </Link>
            <Link href="/bookings" className="px-3 py-2 rounded-lg text-sm font-medium text-[#0B132B] hover:bg-[#F1F5F9]">
              Bookings
            </Link>
            {userName ? (
              <button
                type="button"
                onClick={clearUser}
                className="px-3 py-2 rounded-lg text-sm font-medium text-[#0F2A5C] hover:bg-[#F1F5F9] text-left flex items-center justify-between gap-2"
              >
                <span>Hi, {firstName}</span>
                <span className="flex items-center gap-1">
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                  <span className="sr-only">— clear user name</span>
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={openLogin}
                className="px-3 py-2 rounded-lg text-sm font-medium text-[#0B132B] hover:bg-[#F1F5F9] text-left"
              >
                Login
              </button>
            )}
            <Link href="/book" className="px-3 py-2 rounded-lg text-sm font-medium text-[#163A5F] hover:bg-[#F1F5F9]">
              Book Service
            </Link>
          </nav>
        </div>
      )}
    </header>
    {loginOpen && <LoginModal onClose={closeLogin} onSuccess={handleLoginSuccess} />}
    </>
  );
}
