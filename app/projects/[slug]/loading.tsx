import Container from "@/components/Container";

// Route-level skeleton for /projects/[slug] — back link, hero, browser-frame
// carousel window, then the content grid with sidebar.
export default function ProjectDetailLoading() {
  return (
    <div className="pf-mesh pf-noise relative min-h-screen overflow-hidden py-24">
      <div className="pf-grid absolute inset-0 z-0" />
      <div className="relative z-10">
        <Container>
          <div className="animate-pulse">
            {/* back link */}
            <div className="h-4 w-32 rounded bg-gray-200/70 dark:bg-white/[0.06] mb-14" />

            {/* hero */}
            <div className="h-3 w-24 rounded bg-teal-200/60 dark:bg-teal-400/10 mb-5" />
            <div className="h-12 md:h-16 w-3/4 rounded-lg bg-gray-200/70 dark:bg-white/[0.06] mb-6" />
            <div className="flex items-center gap-6 mb-7">
              <div className="h-4 w-24 rounded bg-gray-200/60 dark:bg-white/[0.05]" />
              <div className="h-4 w-20 rounded bg-gray-200/60 dark:bg-white/[0.05]" />
              <div className="h-4 w-28 rounded bg-gray-200/60 dark:bg-white/[0.05]" />
            </div>
            <div className="flex items-center gap-3 mb-16">
              <div className="h-11 w-32 rounded-lg bg-teal-200/60 dark:bg-teal-400/10" />
              <div className="h-11 w-32 rounded-lg bg-gray-200/60 dark:bg-white/[0.05]" />
            </div>

            {/* browser-frame carousel window */}
            <div className="rounded-xl overflow-hidden border border-gray-200/70 dark:border-white/10 mb-16">
              <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-100/90 dark:bg-white/[0.06] border-b border-gray-200/70 dark:border-white/[0.06]">
                <span className="w-2 h-2 rounded-full bg-gray-300/80 dark:bg-white/10" />
                <span className="w-2 h-2 rounded-full bg-gray-300/80 dark:bg-white/10" />
                <span className="w-2 h-2 rounded-full bg-gray-300/80 dark:bg-white/10" />
                <span className="ml-2 h-3 flex-1 rounded bg-gray-200/70 dark:bg-white/[0.05]" />
              </div>
              <div className="aspect-[16/9] bg-gray-200/70 dark:bg-white/[0.06]" />
            </div>

            {/* content grid */}
            <div className="grid lg:grid-cols-[1fr_300px] gap-6">
              <div className="space-y-6">
                {[0, 1].map((c) => (
                  <div
                    key={c}
                    className="rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] p-5 sm:p-7"
                  >
                    <div className="h-3 w-24 rounded bg-teal-200/60 dark:bg-teal-400/10 mb-5" />
                    <div className="space-y-3">
                      <div className="h-4 w-full rounded bg-gray-200/60 dark:bg-white/[0.05]" />
                      <div className="h-4 w-11/12 rounded bg-gray-200/60 dark:bg-white/[0.05]" />
                      <div className="h-4 w-4/5 rounded bg-gray-200/60 dark:bg-white/[0.05]" />
                      <div className="h-4 w-2/3 rounded bg-gray-200/60 dark:bg-white/[0.05]" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                <div className="rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] p-5 sm:p-7">
                  <div className="h-3 w-20 rounded bg-teal-200/60 dark:bg-teal-400/10 mb-5" />
                  <div className="flex flex-wrap gap-1.5">
                    {[0, 1, 2, 3, 4].map((t) => (
                      <div
                        key={t}
                        className="h-6 w-16 rounded-md bg-gray-200/60 dark:bg-white/[0.05]"
                      />
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] p-5 sm:p-7">
                  <div className="h-3 w-16 rounded bg-teal-200/60 dark:bg-teal-400/10 mb-5" />
                  <div className="space-y-3">
                    <div className="h-4 w-full rounded bg-gray-200/60 dark:bg-white/[0.05]" />
                    <div className="h-4 w-5/6 rounded bg-gray-200/60 dark:bg-white/[0.05]" />
                    <div className="h-4 w-3/4 rounded bg-gray-200/60 dark:bg-white/[0.05]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
