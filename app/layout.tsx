import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ThemeProvider } from "@/contexts/ThemeContext"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Alex Johnson - Full Stack Developer",
  description: "Experienced MERN Stack Developer with 2+ years of experience building scalable web applications",
  keywords: "Full Stack Developer, MERN Stack, React, Node.js, MongoDB, Express.js, JavaScript, TypeScript",
  authors: [{ name: "Alex Johnson" }],
  openGraph: {
    title: "Alex Johnson - Full Stack Developer",
    description: "Experienced MERN Stack Developer with 2+ years of experience building scalable web applications",
    url: "https://alexjohnson.dev",
    siteName: "Alex Johnson - Full Stack Developer",
    images: [
      {
        url: "https://alexjohnson.dev/images/profile-photo.jpg",
        width: 1200,
        height: 630,
        alt: "Alex Johnson - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Johnson - Full Stack Developer",
    description: "Experienced MERN Stack Developer with 2+ years of experience building scalable web applications",
    images: ["https://alexjohnson.dev/images/profile-photo.jpg"],
    creator: "@alexjohnson_dev",
    site: "@alexjohnson_dev",
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
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
