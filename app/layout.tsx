import type React from "react";
import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/contexts/ThemeContext";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nuruzaman Milon - Software Engineer",
  description:
    "Full-stack Software Engineer with 3+ years of experience building scalable web applications using React, Next.js, and Node.js.",
  keywords:
    "Full Stack Developer, React, Next.js, Node.js, TypeScript, Web3, MongoDB, PostgreSQL",
  authors: [{ name: "Nuruzaman Milon" }],
  openGraph: {
    title: "Nuruzaman Milon - Software Engineer",
    description:
      "Full-stack Software Engineer with 3+ years of experience building scalable web applications using React, Next.js, and Node.js.",
    url: "https://nuruzaman-milon.vercel.app",
    siteName: "Nuruzaman Milon - Software Engineer",
    images: [
      {
        url: "https://nuruzaman-milon.vercel.app/images/nuruzaman-milon-profile-photo.png",
        width: 1200,
        height: 630,
        alt: "Nuruzaman Milon - Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuruzaman Milon - Software Engineer",
    description:
      "Full-stack Software Engineer with 3+ years of experience building scalable web applications using React, Next.js, and Node.js.",
    images: [
      "https://nuruzaman-milon.vercel.app/images/nuruzaman-milon-profile-photo.png",
    ],
    creator: "@nuruzaman_milon",
    site: "@nuruzaman_milon",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// ✅ Anti-flash script — render এর আগেই theme class set করে
const themeScript = `
  (function() {
    try {
      var t = localStorage.getItem('theme');
      if (t === 'light' || t === 'dark') {
        document.documentElement.classList.add(t);
        return;
      }
      if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.add('dark');
      }
    } catch(e) {}
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${plusJakartaSans.variable}`}
      suppressHydrationWarning // ✅ এটা জরুরি — theme class hydration warning suppress করে
    >
      <head>
        {/* ✅ Flash বন্ধ করার script — সবার আগে execute হয় */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
