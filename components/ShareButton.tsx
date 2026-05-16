"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareButtonProps {
  title: string;
  url: string;
  description?: string;
}

export default function ShareButton({
  title,
  url,
  description = "",
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const fullUrl =
    typeof window !== "undefined" ? `${window.location.origin}${url}` : url;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description, url: fullUrl });
        setIsOpen(false);
      } catch (error) {
        console.log("Error sharing:", error);
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = fullUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openShareWindow = (shareUrl: string, platform: string) => {
    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    window.open(
      shareUrl,
      `share-${platform}`,
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`,
    );
    setIsOpen(false);
  };

  const shareItems = [
    {
      label: "Share on Twitter",
      icon: <Twitter size={16} className="text-sky-500" />,
      onClick: () => openShareWindow(shareUrls.twitter, "twitter"),
    },
    {
      label: "Share on Facebook",
      icon: <Facebook size={16} className="text-blue-600" />,
      onClick: () => openShareWindow(shareUrls.facebook, "facebook"),
    },
    {
      label: "Share on LinkedIn",
      icon: <Linkedin size={16} className="text-blue-700" />,
      onClick: () => openShareWindow(shareUrls.linkedin, "linkedin"),
    },
    {
      label: "Share on WhatsApp",
      icon: (
        <span className="flex items-center justify-center w-4 h-4 rounded-full bg-green-500 text-white text-[10px] font-bold">
          W
        </span>
      ),
      onClick: () => openShareWindow(shareUrls.whatsapp, "whatsapp"),
    },
    {
      label: "Share on Telegram",
      icon: (
        <span className="flex items-center justify-center w-4 h-4 rounded-full bg-sky-500 text-white text-[10px] font-bold">
          T
        </span>
      ),
      onClick: () => openShareWindow(shareUrls.telegram, "telegram"),
    },
    {
      label: "Share on Reddit",
      icon: (
        <span className="flex items-center justify-center w-4 h-4 rounded-full bg-orange-500 text-white text-[10px] font-bold">
          R
        </span>
      ),
      onClick: () => openShareWindow(shareUrls.reddit, "reddit"),
    },
  ];

  const ShareModal = () => (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Share this post"
        className="fixed z-[9999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 dark:border-slate-700">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            Share this post
          </span>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close share modal"
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="py-2">
          {/* Native share — mobile only */}
          {typeof window !== "undefined" && navigator.share !== undefined && (
            <>
              <button
                onClick={handleNativeShare}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-left"
              >
                <Share2
                  size={16}
                  className="text-gray-500 dark:text-gray-400"
                />
                Share via…
              </button>
              <div className="h-px bg-gray-100 dark:bg-slate-700 mx-3 my-1" />
            </>
          )}

          {/* Social platforms */}
          {shareItems.map(({ label, icon, onClick }) => (
            <button
              key={label}
              onClick={onClick}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-left"
            >
              {icon}
              {label}
            </button>
          ))}

          <div className="h-px bg-gray-100 dark:bg-slate-700 mx-3 my-1" />

          {/* Copy link */}
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-left"
          >
            {copied ? (
              <Check size={16} className="text-emerald-500" />
            ) : (
              <Link2 size={16} className="text-gray-500 dark:text-gray-400" />
            )}
            <span className={copied ? "text-emerald-500" : ""}>
              {copied ? "Link copied!" : "Copy link"}
            </span>
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        size="sm"
        aria-label="Share this post"
        className="text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 dark:text-gray-400 dark:hover:text-emerald-400 dark:hover:bg-emerald-900/20 transition-all duration-200"
      >
        <Share2 size={16} />
      </Button>

      {mounted && isOpen && createPortal(<ShareModal />, document.body)}
    </>
  );
}
