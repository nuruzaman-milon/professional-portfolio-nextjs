"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import useEmblaCarousel from "embla-carousel-react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CarouselImage = string | StaticImageData;

export interface ImageCarouselProps {
  images: CarouselImage[];
  title: string;
  /** Shown as a zero-padded watermark (e.g. "01") */
  index?: number;
  /** Auto-advance interval in ms. Set to 0 to disable. Default: 3500 */
  interval?: number;
  /** Accent colour for active dot & ring. Default: emerald */
  accent?: string;
  className?: string;
}

// ─── Animation variants ───────────────────────────────────────────────────────

const slideVariants: Variants = {
  enter: { opacity: 0, y: 8 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: "easeIn" } },
};

const lightboxVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 8,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Dot indicator ────────────────────────────────────────────────────────────

function Dots({
  count,
  current,
  onGoto,
  accent = "#34d399",
}: {
  count: number;
  current: number;
  onGoto: (i: number) => void;
  accent?: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={(e) => {
            e.stopPropagation();
            onGoto(i);
          }}
          aria-label={`Go to image ${i + 1}`}
          style={{
            width: i === current ? 16 : 6,
            height: 6,
            borderRadius: 9999,
            background: i === current ? accent : "rgba(255,255,255,0.35)",
            transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        />
      ))}
    </div>
  );
}

// ─── Lightbox (fullscreen preview) ───────────────────────────────────────────

function Lightbox({
  images,
  title,
  startIndex,
  open,
  onClose,
  accent,
}: {
  images: CarouselImage[];
  title: string;
  startIndex: number;
  open: boolean;
  onClose: () => void;
  accent: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex,
    loop: true,
    dragFree: false,
  });
  const [current, setCurrent] = useState(startIndex);

  // Sync current index with embla
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Jump to startIndex when lightbox opens
  useEffect(() => {
    if (open && emblaApi) {
      emblaApi.scrollTo(startIndex, true);
      setCurrent(startIndex);
    }
  }, [open, startIndex, emblaApi]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") emblaApi?.scrollNext();
      if (e.key === "ArrowLeft") emblaApi?.scrollPrev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, emblaApi, onClose]);

  const hasMultiple = images.length > 1;

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop */}
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  key="lb-overlay"
                  variants={overlayVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="fixed inset-0 z-50"
                  style={{
                    background: "rgba(0,0,0,0.92)",
                    backdropFilter: "blur(6px)",
                  }}
                />
              </Dialog.Overlay>

              {/* Content */}
              <Dialog.Content asChild forceMount>
                <motion.div
                  key="lb-content"
                  variants={lightboxVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 focus:outline-none"
                  onClick={onClose}
                >
                  {/* Top bar */}
                  <div
                    className="w-full max-w-5xl flex items-center justify-between mb-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs font-mono tracking-widest uppercase"
                        style={{ color: accent }}
                      >
                        {title}
                      </span>
                      {hasMultiple && (
                        <span className="text-xs font-mono text-white/40">
                          {current + 1} / {images.length}
                        </span>
                      )}
                    </div>

                    <Dialog.Close asChild>
                      <button
                        className="flex items-center justify-center rounded-full transition-all duration-200"
                        style={{
                          width: 36,
                          height: 36,
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          color: "rgba(255,255,255,0.7)",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background = "rgba(255,255,255,0.15)";
                        }}
                        onMouseLeave={(e) => {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background = "rgba(255,255,255,0.08)";
                        }}
                        aria-label="Close preview"
                      >
                        <X size={16} />
                      </button>
                    </Dialog.Close>
                  </div>

                  {/* Embla carousel */}
                  <div
                    className="w-full max-w-5xl relative rounded-xl overflow-hidden"
                    style={{
                      aspectRatio: "16/9",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      ref={emblaRef}
                      className="overflow-hidden w-full h-full"
                    >
                      <div className="flex h-full">
                        {images.map((src, i) => (
                          <div
                            key={i}
                            className="relative flex-none w-full h-full"
                          >
                            <Image
                              src={src}
                              alt={`${title} — image ${i + 1}`}
                              fill
                              className="object-contain"
                              priority={i === startIndex}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Prev / Next arrows */}
                    {hasMultiple && (
                      <>
                        <button
                          onClick={() => emblaApi?.scrollPrev()}
                          aria-label="Previous image"
                          className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-200 z-10"
                          style={{
                            width: 40,
                            height: 40,
                            background: "rgba(0,0,0,0.45)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "rgba(255,255,255,0.8)",
                            cursor: "pointer",
                            backdropFilter: "blur(4px)",
                          }}
                          onMouseEnter={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background = "rgba(0,0,0,0.7)";
                          }}
                          onMouseLeave={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background = "rgba(0,0,0,0.45)";
                          }}
                        >
                          <ChevronLeft size={18} />
                        </button>

                        <button
                          onClick={() => emblaApi?.scrollNext()}
                          aria-label="Next image"
                          className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-200 z-10"
                          style={{
                            width: 40,
                            height: 40,
                            background: "rgba(0,0,0,0.45)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "rgba(255,255,255,0.8)",
                            cursor: "pointer",
                            backdropFilter: "blur(4px)",
                          }}
                          onMouseEnter={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background = "rgba(0,0,0,0.7)";
                          }}
                          onMouseLeave={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background = "rgba(0,0,0,0.45)";
                          }}
                        >
                          <ChevronRight size={18} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Bottom dots */}
                  {hasMultiple && (
                    <div className="mt-4" onClick={(e) => e.stopPropagation()}>
                      <Dots
                        count={images.length}
                        current={current}
                        onGoto={(i) => emblaApi?.scrollTo(i)}
                        accent={accent}
                      />
                    </div>
                  )}

                  {/* Dismiss hint */}
                  <p className="mt-5 text-xs text-white/25 font-mono tracking-widest">
                    ESC OR CLICK OUTSIDE TO CLOSE
                  </p>
                </motion.div>
              </Dialog.Content>
            </>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ─── Main ImageCarousel component ─────────────────────────────────────────────

export default function ImageCarousel({
  images,
  title,
  index: cardIndex = 0,
  interval = 3500,
  accent = "#34d399",
  className = "",
}: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxStart, setLightboxStart] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const hasMultiple = images.length > 1;

  // Auto-advance — pauses on hover
  useEffect(() => {
    if (!hasMultiple || interval === 0 || isHovered) return;
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, interval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hasMultiple, interval, images.length, isHovered]);

  const goTo = useCallback((i: number) => setCurrent(i), []);

  const openLightbox = useCallback(() => {
    setLightboxStart(current);
    setLightboxOpen(true);
  }, [current]);

  return (
    <>
      <div
        className={`relative overflow-hidden bg-gray-100 dark:bg-gray-800/50 aspect-[16/10] lg:aspect-auto min-h-[200px] ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Crossfade image stack */}
        <AnimatePresence mode="crossfade">
          <motion.div
            key={current}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <Image
              src={images[current]}
              alt={`${title} screenshot ${current + 1}`}
              fill
              className="object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(16,185,129,0.18) 0%, transparent 70%)",
            opacity: 0.6,
          }}
        />

        {/* Click-to-expand button — visible on hover */}
        <motion.button
          onClick={openLightbox}
          aria-label="Open fullscreen preview"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 z-20 w-full h-full flex items-center justify-center cursor-zoom-in"
          style={{ background: "transparent", border: "none", padding: 0 }}
        >
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.85)",
              fontSize: 12,
              fontFamily: "monospace",
              letterSpacing: "0.1em",
              pointerEvents: "none",
            }}
          >
            <ZoomIn size={13} />
            PREVIEW
          </div>
        </motion.button>

        {/* Index watermark */}
        <div
          className="absolute bottom-3 left-4 z-30"
          style={{
            fontSize: 10,
            fontFamily: "monospace",
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.35)",
            pointerEvents: "none",
          }}
        >
          {String(cardIndex + 1).padStart(2, "0")}
        </div>

        {/* Dots */}
        {hasMultiple && (
          <div className="absolute bottom-3 right-4 z-30">
            <Dots
              count={images.length}
              current={current}
              onGoto={goTo}
              accent={accent}
            />
          </div>
        )}

        {/* Counter badge */}
        {hasMultiple && (
          <div
            className="absolute top-3 right-3 z-30 px-2 py-0.5 rounded-md"
            style={{
              background: "rgba(0,0,0,0.3)",
              backdropFilter: "blur(4px)",
              fontSize: 10,
              fontFamily: "monospace",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            {current + 1}/{images.length}
          </div>
        )}
      </div>

      {/* Fullscreen lightbox */}
      <Lightbox
        images={images}
        title={title}
        startIndex={lightboxStart}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        accent={accent}
      />
    </>
  );
}
