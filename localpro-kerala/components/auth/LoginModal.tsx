"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { EMAIL_PATTERN } from "@/lib/validation/userDetails";

interface LoginModalProps {
  /** Close the modal (Cancel / X / Escape). Restores focus to the trigger. */
  onClose: () => void;
  /** Called only after the backend has successfully processed the details. */
  onSuccess: (fullName: string) => void;
}

interface FieldErrors {
  fullName?: string;
  email?: string;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function LoginModal({ onClose, onSuccess }: LoginModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  // Mount = modal opened: focus the first field, lock background scroll,
  // and listen for Escape. Cleanup restores scroll and aborts any request.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = setTimeout(() => nameInputRef.current?.focus(), 30);

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current();
      }
    };
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
      clearTimeout(focusTimer);
      abortRef.current?.abort();
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    };
  }, []);

  // Keep keyboard focus inside the dialog while it is open.
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusables = Array.from(
      dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    ).filter((el) => el.getClientRects().length > 0);
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;

    if (event.shiftKey) {
      if (active === first || !dialog.contains(active)) {
        event.preventDefault();
        last.focus();
      }
    } else if (active === last || !dialog.contains(active)) {
      event.preventDefault();
      first.focus();
    }
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting || successMessage) return; // no repeated submissions

    // Client-side validation with messages below each field.
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const nextErrors: FieldErrors = {};
    if (!trimmedName) nextErrors.fullName = "Please enter your full name.";
    if (!trimmedEmail) {
      nextErrors.email = "Please enter your email address.";
    } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    setErrors(nextErrors);
    setErrorMessage("");
    setInfoMessage("");
    if (nextErrors.fullName || nextErrors.email) return;

    setSubmitting(true);
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: trimmedName, email: trimmedEmail }),
        signal: controller.signal,
      });
      const data = await res.json();

      if (data.success) {
        // Only reached after the backend truly processed the details.
        setSuccessMessage(
          data.message || `Thanks, ${trimmedName}! Your details were saved.`
        );
        onSuccess(trimmedName);
        successTimerRef.current = setTimeout(() => closeRef.current(), 1600);
        return;
      }

      if (data.code === "NOT_CONFIGURED") {
        // Be honest: no fake login success.
        setInfoMessage(
          data.message ||
            "This form isn't connected to a backend yet — your details were not saved and you're not signed in."
        );
      } else {
        setErrorMessage(
          data.message || "Something went wrong. Please try again."
        );
      }
    } catch (error: any) {
      if (error?.name === "AbortError") return; // closed/unmounted mid-request
      setErrorMessage(
        "We couldn't reach the server. Please check your connection and try again."
      );
    } finally {
      abortRef.current = null;
      setSubmitting(false);
    }
  }

  const inputClasses =
    "w-full h-11 px-4 rounded-lg bg-[#F8FAFC] border text-[#0B132B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0F2A5C] focus:bg-white transition-colors";

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#0B132B]/50 backdrop-blur-sm"
      onMouseDown={(e) => {
        // Swallow background clicks — no accidental interaction or dismissal.
        if (e.target === e.currentTarget) e.preventDefault();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-subtitle"
        onKeyDown={handleKeyDown}
        className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-[#E2E8F0]"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2
                id="login-modal-title"
                className="text-xl font-bold text-[#0B132B] mb-1"
              >
                Welcome to LocalPro Kerala
              </h2>
              <p id="login-modal-subtitle" className="text-sm text-[#64748B]">
                Enter your details to continue to trusted local services.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close login dialog"
              className="shrink-0 p-1.5 -m-1 rounded-lg text-[#64748B] hover:text-[#0B132B] hover:bg-[#F1F5F9] transition-colors"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {successMessage && (
              <div
                role="status"
                className="bg-[#16A36A]/10 border border-[#16A36A]/30 text-[#0B7A50] rounded-lg px-4 py-3 text-sm"
              >
                {successMessage}
              </div>
            )}
            {infoMessage && (
              <div
                role="status"
                className="bg-amber-50 border border-amber-200 text-amber-800 rounded-lg px-4 py-3 text-sm"
              >
                {infoMessage}
              </div>
            )}
            {errorMessage && (
              <div
                role="alert"
                className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm"
              >
                {errorMessage}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="login-full-name"
                className="block text-sm font-medium text-[#0B132B] mb-2"
              >
                Full Name
              </label>
              <input
                id="login-full-name"
                ref={nameInputRef}
                type="text"
                autoComplete="name"
                placeholder="e.g., Arun Kumar"
                value={fullName}
                disabled={submitting}
                aria-invalid={errors.fullName ? true : undefined}
                aria-describedby={errors.fullName ? "login-full-name-error" : undefined}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName)
                    setErrors((prev) => ({ ...prev, fullName: undefined }));
                }}
                className={`${inputClasses} ${
                  errors.fullName ? "border-red-300" : "border-[#E2E8F0]"
                }`}
              />
              {errors.fullName && (
                <p
                  id="login-full-name-error"
                  role="alert"
                  className="mt-1.5 text-sm text-red-600"
                >
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="login-email"
                className="block text-sm font-medium text-[#0B132B] mb-2"
              >
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                disabled={submitting}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? "login-email-error" : undefined}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email)
                    setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                className={`${inputClasses} ${
                  errors.email ? "border-red-300" : "border-[#E2E8F0]"
                }`}
              />
              {errors.email && (
                <p
                  id="login-email-error"
                  role="alert"
                  className="mt-1.5 text-sm text-red-600"
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end pt-2">
              <button
                type="button"
                onClick={onClose}
                className="h-11 px-5 rounded-lg border border-[#E2E8F0] text-[#0B132B] text-sm font-medium hover:bg-[#F8FAFC] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || !!successMessage}
                className="h-11 px-6 rounded-lg bg-[#163A5F] hover:bg-[#0F2A5C] text-white text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting && (
                  <span
                    className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"
                    aria-hidden="true"
                  />
                )}
                {submitting ? "Continuing..." : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}
