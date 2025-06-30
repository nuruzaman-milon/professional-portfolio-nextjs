"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { Share2, Facebook, Twitter, Linkedin, Link2, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ShareButtonProps {
  title: string
  url: string
  description?: string
}

export default function ShareButton({ title, url, description = "" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const scrollPositionRef = useRef(0)

  // Get the full URL
  const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${url}` : url
  const encodedUrl = encodeURIComponent(fullUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate position when opening
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const scrollY = window.scrollY
      const scrollX = window.scrollX

      // Store initial scroll position
      scrollPositionRef.current = scrollY

      // Calculate position relative to viewport
      let x = rect.right - 224 // 224px is dropdown width (w-56 = 14rem = 224px)
      let y = rect.bottom + 8

      // Adjust if dropdown would go off screen
      if (x < 16) x = 16 // 16px padding from left edge
      if (x + 224 > window.innerWidth - 16) x = window.innerWidth - 224 - 16

      // Adjust vertical position if needed
      if (y + 400 > window.innerHeight + scrollY) {
        // Approximate dropdown height
        y = rect.top - 8 - 400 // Position above button
      }

      setPosition({ x: x + scrollX, y: y + scrollY })
    }
  }, [isOpen])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        const dropdown = document.getElementById("share-dropdown")
        if (dropdown && !dropdown.contains(e.target as Node)) {
          setIsOpen(false)
        }
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Close on scroll - NEW FEATURE
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        const currentScrollY = window.scrollY
        const scrollDifference = Math.abs(currentScrollY - scrollPositionRef.current)

        // Close modal if user scrolls more than 10px
        if (scrollDifference > 10) {
          setIsOpen(false)
        }
      }
    }

    if (isOpen) {
      // Use passive listener for better performance
      window.addEventListener("scroll", handleScroll, { passive: true })
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [isOpen])

  // Close on window resize
  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [isOpen])

  // Social media share URLs
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
  }

  // Native Web Share API
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: fullUrl,
        })
        setIsOpen(false)
      } catch (error) {
        console.log("Error sharing:", error)
      }
    }
  }

  // Copy to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = fullUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Open share URL in new window
  const openShareWindow = (url: string, platform: string) => {
    const width = 600
    const height = 400
    const left = (window.innerWidth - width) / 2
    const top = (window.innerHeight - height) / 2

    window.open(
      url,
      `share-${platform}`,
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`,
    )
    setIsOpen(false)
  }

  const ShareDropdown = () => (
    <div
      id="share-dropdown"
      className="fixed z-[9999] w-56 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-xl rounded-lg overflow-hidden"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: isOpen ? "scale(1)" : "scale(0.95)",
        opacity: isOpen ? 1 : 0,
        transition: "all 0.15s ease-out",
        transformOrigin: "top right",
      }}
    >
      {/* Mobile close button */}
      <div className="md:hidden flex justify-between items-center p-3 border-b border-gray-200 dark:border-slate-600">
        <span className="font-medium text-gray-900 dark:text-white">Share</span>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
        >
          <X size={16} className="text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      <div className="py-2">
        {/* Native Share (if supported) */}
        {typeof window !== "undefined" && navigator.share && (
          <>
            <button
              onClick={handleNativeShare}
              className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-150 text-left"
            >
              <Share2 size={16} className="text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">Share...</span>
            </button>
            <div className="h-px bg-gray-200 dark:bg-slate-600 mx-2" />
          </>
        )}

        {/* Social Media Platforms */}
        <button
          onClick={() => openShareWindow(shareUrls.twitter, "twitter")}
          className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-150 text-left"
        >
          <Twitter size={16} className="text-blue-500" />
          <span className="text-gray-700 dark:text-gray-300">Share on Twitter</span>
        </button>

        <button
          onClick={() => openShareWindow(shareUrls.facebook, "facebook")}
          className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-150 text-left"
        >
          <Facebook size={16} className="text-blue-600" />
          <span className="text-gray-700 dark:text-gray-300">Share on Facebook</span>
        </button>

        <button
          onClick={() => openShareWindow(shareUrls.linkedin, "linkedin")}
          className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-150 text-left"
        >
          <Linkedin size={16} className="text-blue-700" />
          <span className="text-gray-700 dark:text-gray-300">Share on LinkedIn</span>
        </button>

        <button
          onClick={() => openShareWindow(shareUrls.whatsapp, "whatsapp")}
          className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-150 text-left"
        >
          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">W</span>
          </div>
          <span className="text-gray-700 dark:text-gray-300">Share on WhatsApp</span>
        </button>

        <button
          onClick={() => openShareWindow(shareUrls.telegram, "telegram")}
          className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-150 text-left"
        >
          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">T</span>
          </div>
          <span className="text-gray-700 dark:text-gray-300">Share on Telegram</span>
        </button>

        <button
          onClick={() => openShareWindow(shareUrls.reddit, "reddit")}
          className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-150 text-left"
        >
          <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">R</span>
          </div>
          <span className="text-gray-700 dark:text-gray-300">Share on Reddit</span>
        </button>

        <div className="h-px bg-gray-200 dark:bg-slate-600 mx-2" />

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-150 text-left"
        >
          {copied ? (
            <Check size={16} className="text-green-500" />
          ) : (
            <Link2 size={16} className="text-gray-600 dark:text-gray-400" />
          )}
          <span className="text-gray-700 dark:text-gray-300">{copied ? "Link copied!" : "Copy link"}</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      <Button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        size="sm"
        className="text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 dark:text-gray-400 dark:hover:text-emerald-400 dark:hover:bg-emerald-900/20 transition-all duration-200"
      >
        <Share2 size={16} />
      </Button>

      {/* Portal-based dropdown */}
      {mounted &&
        isOpen &&
        createPortal(
          <>
            {/* Backdrop for mobile */}
            <div className="fixed inset-0 z-[9998] bg-black/20 md:hidden" onClick={() => setIsOpen(false)} />
            <ShareDropdown />
          </>,
          document.body,
        )}
    </>
  )
}
