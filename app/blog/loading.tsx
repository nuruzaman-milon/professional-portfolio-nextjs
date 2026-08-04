import Container from "@/components/Container";

// Route-level skeleton — streams in place of the page while the server
// component fetches. Mirrors the /blog layout: back link, header, search bar,
// then post rows.
export default function BlogLoading() {
  return (
    <div className="pf-mesh pf-noise relative min-h-screen overflow-hidden py-24">
      <div className="pf-grid absolute inset-0 z-0" />
      <div className="relative z-10">
        <Container>
          <div className="animate-pulse">
            {/* back link */}
            <div className="h-4 w-28 rounded bg-gray-200/70 dark:bg-white/[0.06] mb-12" />

            {/* header */}
            <div className="h-3 w-16 rounded bg-teal-200/60 dark:bg-teal-400/10 mb-6" />
            <div className="h-12 md:h-14 w-64 max-w-full rounded-lg bg-gray-200/70 dark:bg-white/[0.06] mb-3" />
            <div className="h-12 md:h-14 w-96 max-w-full rounded-lg bg-gray-200/70 dark:bg-white/[0.06] mb-6" />
            <div className="h-4 w-80 max-w-full rounded bg-gray-200/60 dark:bg-white/[0.05] mb-12" />

            {/* search + sort + filter row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-12">
              <div className="h-10 flex-1 rounded-lg bg-gray-200/60 dark:bg-white/[0.05]" />
              <div className="flex items-center gap-3">
                <div className="h-10 w-24 rounded-lg bg-gray-200/60 dark:bg-white/[0.05]" />
                <div className="h-10 w-20 rounded-lg bg-gray-200/60 dark:bg-white/[0.05]" />
              </div>
            </div>

            {/* post rows */}
            <div className="space-y-6">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="grid lg:grid-cols-[2fr_3fr] rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] overflow-hidden"
                >
                  {/* image pane */}
                  <div className="p-4 sm:p-5">
                    <div className="aspect-[16/10] rounded-xl bg-gray-200/70 dark:bg-white/[0.06]" />
                  </div>
                  {/* content */}
                  <div className="p-5 sm:p-7 lg:pl-2 flex flex-col">
                    <div className="h-7 w-3/4 rounded bg-gray-200/70 dark:bg-white/[0.06] mb-4" />
                    <div className="h-4 w-full rounded bg-gray-200/60 dark:bg-white/[0.05] mb-2" />
                    <div className="h-4 w-11/12 rounded bg-gray-200/60 dark:bg-white/[0.05] mb-2" />
                    <div className="h-4 w-2/3 rounded bg-gray-200/60 dark:bg-white/[0.05] mb-5" />
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {[0, 1, 2].map((t) => (
                        <div
                          key={t}
                          className="h-6 w-16 rounded-md bg-gray-200/60 dark:bg-white/[0.05]"
                        />
                      ))}
                    </div>
                    <div className="mt-auto pt-4 border-t border-gray-200/60 dark:border-white/[0.06] flex items-center justify-between">
                      <div className="h-4 w-36 rounded bg-gray-200/60 dark:bg-white/[0.05]" />
                      <div className="h-4 w-24 rounded bg-gray-200/60 dark:bg-white/[0.05]" />
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
