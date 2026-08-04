import Container from "@/components/Container";

// Route-level skeleton — streams in place of the page while the server
// component fetches. Mirrors the /projects layout: back link, header, search
// bar, then project rows with their browser-frame image panes.
export default function ProjectsLoading() {
  return (
    <div className="pf-mesh pf-noise relative min-h-screen overflow-hidden py-24">
      <div className="pf-grid absolute inset-0 z-0" />
      <div className="relative z-10">
        <Container>
          <div className="animate-pulse">
            {/* back link */}
            <div className="h-4 w-28 rounded bg-gray-200/70 dark:bg-white/[0.06] mb-12" />

            {/* header */}
            <div className="h-3 w-20 rounded bg-teal-200/60 dark:bg-teal-400/10 mb-6" />
            <div className="h-12 md:h-14 w-72 max-w-full rounded-lg bg-gray-200/70 dark:bg-white/[0.06] mb-3" />
            <div className="h-12 md:h-14 w-80 max-w-full rounded-lg bg-gray-200/70 dark:bg-white/[0.06] mb-6" />
            <div className="h-4 w-96 max-w-full rounded bg-gray-200/60 dark:bg-white/[0.05] mb-12" />

            {/* search + sort + filter row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
              <div className="h-10 flex-1 rounded-lg bg-gray-200/60 dark:bg-white/[0.05]" />
              <div className="flex items-center gap-3">
                <div className="h-10 w-24 rounded-lg bg-gray-200/60 dark:bg-white/[0.05]" />
                <div className="h-10 w-20 rounded-lg bg-gray-200/60 dark:bg-white/[0.05]" />
              </div>
            </div>

            {/* project rows */}
            <div className="space-y-6">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="grid lg:grid-cols-[2fr_3fr] rounded-xl border border-gray-200/60 dark:border-white/[0.06] bg-white/75 dark:bg-zinc-900/60 overflow-hidden"
                >
                  {/* browser-frame image pane */}
                  <div className="p-4 sm:p-5 lg:pr-0">
                    <div className="rounded-xl overflow-hidden border border-gray-200/70 dark:border-white/10">
                      {/* chrome bar */}
                      <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-100/90 dark:bg-white/[0.06] border-b border-gray-200/70 dark:border-white/[0.06]">
                        <span className="w-2 h-2 rounded-full bg-gray-300/80 dark:bg-white/10" />
                        <span className="w-2 h-2 rounded-full bg-gray-300/80 dark:bg-white/10" />
                        <span className="w-2 h-2 rounded-full bg-gray-300/80 dark:bg-white/10" />
                        <span className="ml-2 h-3 flex-1 rounded bg-gray-200/70 dark:bg-white/[0.05]" />
                      </div>
                      <div className="aspect-[16/10] bg-gray-200/70 dark:bg-white/[0.06]" />
                    </div>
                  </div>
                  {/* content */}
                  <div className="p-5 sm:p-7 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-3 w-24 rounded bg-teal-200/60 dark:bg-teal-400/10" />
                      <div className="h-3 w-16 rounded bg-gray-200/60 dark:bg-white/[0.05]" />
                    </div>
                    <div className="h-8 w-2/3 rounded bg-gray-200/70 dark:bg-white/[0.06] mb-4" />
                    <div className="h-4 w-full rounded bg-gray-200/60 dark:bg-white/[0.05] mb-2" />
                    <div className="h-4 w-5/6 rounded bg-gray-200/60 dark:bg-white/[0.05] mb-5" />
                    <div className="space-y-2.5 mb-6">
                      <div className="h-4 w-3/4 rounded bg-gray-200/60 dark:bg-white/[0.05]" />
                      <div className="h-4 w-2/3 rounded bg-gray-200/60 dark:bg-white/[0.05]" />
                      <div className="h-4 w-3/5 rounded bg-gray-200/60 dark:bg-white/[0.05]" />
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {[0, 1, 2, 3].map((t) => (
                        <div
                          key={t}
                          className="h-6 w-16 rounded-md bg-gray-200/60 dark:bg-white/[0.05]"
                        />
                      ))}
                    </div>
                    <div className="mt-auto pt-4 border-t border-gray-200/60 dark:border-white/[0.06] flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-gray-200/60 dark:bg-white/[0.05]" />
                      <div className="h-4 w-28 rounded bg-gray-200/60 dark:bg-white/[0.05]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
