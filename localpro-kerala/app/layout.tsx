import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LocalPro Kerala - Find Trusted Professionals Near You",
  description: "LocalPro Kerala helps customers find trusted local service providers across Kerala, India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${plusJakarta.variable}`}>
      <body className="min-h-full flex flex-col bg-[#F8FAFC] font-sans text-[#0B132B]">
        {children}
      </body>
    </html>
  );
}
