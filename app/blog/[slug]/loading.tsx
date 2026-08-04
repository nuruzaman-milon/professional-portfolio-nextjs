import Container from "@/components/Container";

// Route-level skeleton for /blog/[slug] — back link, badges, title, meta,
// hero image, then the article card.
export default function BlogPostLoading() {
  return (
    <div className="pf-mesh pf-noise relative min-h-screen overflow-hidden py-24">
      <div className="pf-grid absolute inset-0 z-0" />
      <div className="relative z-10">
        <Container>
          <div className="animate-pulse">
            {/* back link */}
            <div className="h-4 w-24 rounded bg-gray-200/70 dark:bg-white/[0.06] mb-12" />

            {/* badges */}
            <div className="flex gap-1.5 mb-6">
              <div className="h-6 w-20 rounded-lg bg-teal-200/60 dark:bg-teal-400/10" />
              {[0, 1, 2].map((t) => (
                <div
                  key={t}
                  className="h-6 w-16 rounded-md bg-gray-200/60 dark:bg-white/[0.05]"
                />
              ))}
            </div>

            {/* title + excerpt */}
            <div className="h-12 md:h-14 w-4/5 rounded-lg bg-gray-200/70 dark:bg-white/[0.06] mb-3" />
            <div className="h-12 md:h-14 w-3/5 rounded-lg bg-gray-200/70 dark:bg-white/[0.06] mb-6" />
            <div className="h-5 w-full max-w-3xl rounded bg-gray-200/60 dark:bg-white/[0.05] mb-2" />
            <div className="h-5 w-2/3 max-w-2xl rounded bg-gray-200/60 dark:bg-white/[0.05] mb-8" />

            {/* meta row */}
            <div className="flex items-center gap-5 pb-8 border-b border-gray-200/40 dark:border-white/[0.06] mb-10">
              <div className="h-4 w-24 rounded bg-gray-200/60 dark:bg-white/[0.05]" />
              <div className="h-4 w-20 rounded bg-gray-200/60 dark:bg-white/[0.05]" />
              <div className="h-4 w-28 rounded bg-gray-200/60 dark:bg-white/[0.05]" />
            </div>

            {/* hero image */}
            <div className="h-64 md:h-96 rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-gray-200/70 dark:bg-white/[0.06] mb-10" />

            {/* article card */}
            <div className="rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] p-5 sm:p-8 md:p-12 space-y-4">
              <div className="h-7 w-1/2 rounded bg-gray-200/70 dark:bg-white/[0.06] mb-6" />
              {[0, 1, 2, 3, 4, 5, 6, 7].map((l) => (
                <div
                  key={l}
                  className="h-4 rounded bg-gray-200/60 dark:bg-white/[0.05]"
                  style={{ width: `${[100, 95, 88, 97, 72, 92, 85, 60][l]}%` }}
                />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
