import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Calendar, Clock } from "lucide-react";
import ShareButton from "@/components/ShareButton";
import type { Metadata, ResolvingMetadata } from "next";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { getPostBySlug, getRelatedPosts } from "@/lib/content";

export const revalidate = 300;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://nuruzaman-milon.dev";
  const postUrl = `${baseUrl}/blog/${slug}`;
  const imageUrl = `${baseUrl}${post.image}`;

  return {
    title: `${post.title} | Nuruzaman Milon`,
    description: post.excerpt,
    keywords: post.tags.join(", "),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: "Nuruzaman Milon - Full Stack Developer",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
      locale: "en_US",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
    alternates: { canonical: postUrl },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  // ── 404 state ──────────────────────────────────────────────────────────────
  if (!post) {
    return (
      <div className="pf-mesh pf-noise relative min-h-screen overflow-hidden pt-20 flex items-center justify-center">
        <div className="pf-grid absolute inset-0 z-0" />
        <div className="relative z-10 text-center">
          <h1 className="pf-serif text-4xl md:text-5xl font-normal text-gray-900 dark:text-white mb-5">
            Post not found
          </h1>
          <Link href="/blog" className="cta-link justify-center">
            <ArrowLeft size={13} /> Back to blog
          </Link>
        </div>
      </div>
    );
  }
  const related = await getRelatedPosts(slug);

  return (
    <div className="pf-mesh pf-noise relative min-h-screen overflow-hidden py-24">
      {/* Grid overlay */}
      <div className="pf-grid absolute inset-0 z-0" />

      {/* Ambient orb — top right */}
      <div
        className="absolute pointer-events-none z-0 opacity-25"
        style={{
          top: "5%",
          right: "-8%",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(13,148,136,.15) 0%, transparent 70%)",
        }}
      />

      {/* Ambient orb — bottom left */}
      <div
        className="absolute pointer-events-none z-0 opacity-15"
        style={{
          bottom: "15%",
          left: "-6%",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(13,148,136,.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        <Container>
          {/* ── Back link ── */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 mb-10"
          >
            <ArrowLeft size={15} /> Back to blog
          </Link>

          {/* ── Header ── */}
          <header className="mb-10">
            {/* Category + Tags */}
            <div className="flex flex-wrap items-center gap-1.5 mb-6">
              <span className="px-2.5 py-1 rounded-lg bg-teal-700 text-white text-[10px] font-mono tracking-[.12em] uppercase">
                {post.category}
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-[11px] font-medium border border-gray-200/60 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.04] text-gray-500 dark:text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title — serif display, matching the site's heading language */}
            <h1 className="pf-serif text-4xl md:text-6xl font-normal text-gray-900 dark:text-white mb-5 leading-[1.1]">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-gray-200/40 dark:border-white/[0.06]">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-gray-400 dark:text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={12} />
                  <span>{post.readTime}</span>
                </div>
                <span>By {post.author}</span>
              </div>

              <ShareButton
                title={post.title}
                url={`/blog/${slug}`}
                description={post.excerpt}
              />
            </div>
          </header>

          {/* ── Hero image — framed, site image language ── */}
          <div className="relative rounded-xl overflow-hidden mb-10 border border-gray-200/70 dark:border-white/10 shadow-xl bg-gray-100 dark:bg-gray-800/50">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={1200}
              height={675}
              priority
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/10 to-transparent pointer-events-none" />
          </div>

          {/* ── Article content ── */}
          <div className="rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm p-5 sm:p-8 md:p-12 mb-10">
            <div
              className="prose prose-lg prose-gray dark:prose-invert max-w-none
                prose-headings:text-gray-900 dark:prose-headings:text-white
                prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
                prose-code:text-teal-700 dark:prose-code:text-teal-400
                prose-code:bg-gray-100/80 dark:prose-code:bg-white/[0.06]
                prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-[13px]
                prose-pre:bg-gray-50 dark:prose-pre:bg-white/[0.04]
                prose-pre:border prose-pre:border-gray-200/60 dark:prose-pre:border-white/[0.07]
                prose-pre:rounded-xl prose-pre:text-sm
                prose-li:text-gray-600 dark:prose-li:text-gray-300
                prose-ul:my-4
                prose-a:text-teal-700 dark:prose-a:text-teal-400 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* ── Author card ── */}
          <div className="rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm p-5 sm:p-7 mb-16 flex items-center gap-4 sm:gap-5">
            <div className="w-14 h-14 rounded-full overflow-hidden border border-teal-400/30 flex-shrink-0">
              <Image
                src="/images/me/nuruzaman-milon1.webp"
                alt={post.author}
                width={56}
                height={56}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <p className="text-[10px] font-mono tracking-[.15em] uppercase text-teal-600 dark:text-teal-400 mb-1">
                Author
              </p>
              <h3 className="pf-serif text-lg font-normal text-gray-900 dark:text-white mb-1">
                {post.author}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Full Stack Developer with 4+ years of experience in MERN stack
                development. Passionate about sharing knowledge and building
                great products.
              </p>
            </div>
          </div>

          {/* ── Related articles ── */}
          {related.length > 0 && (
            <div>
              <p className="text-[10px] font-mono tracking-[.15em] uppercase text-teal-600 dark:text-teal-400 mb-6">
                Related Articles
              </p>
              <div className="grid md:grid-cols-2 gap-5">
                {related.map((rel) =>
                  rel ? (
                    <Link
                      key={rel.id}
                      href={`/blog/${rel.slug}`}
                      className="group rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm p-6 hover:border-teal-300/50 dark:hover:border-teal-800/40 transition-[border-color] duration-300"
                    >
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-teal-700 text-white text-[10px] font-mono tracking-[.12em] uppercase mb-3">
                        {rel.category}
                      </span>
                      <div className="flex items-start gap-2 mb-2">
                        <h4 className="pf-serif text-lg font-normal text-gray-900 dark:text-white leading-snug group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors duration-200">
                          {rel.title}
                        </h4>
                        <ArrowUpRight
                          size={15}
                          className="mt-1 flex-shrink-0 text-gray-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                        />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
                        {rel.excerpt}
                      </p>
                      <div className="mt-4 pt-4 border-t border-gray-200/60 dark:border-white/[0.06] flex items-center gap-3 text-[11px] font-mono text-gray-400 dark:text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={10} />
                          {formatDate(rel.date)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={10} />
                          {rel.readTime}
                        </div>
                      </div>
                    </Link>
                  ) : null,
                )}
              </div>
            </div>
          )}

          {/* ── Bottom back link ── */}
          <div className="mt-16 flex flex-col items-center gap-5">
            <div className="hl w-full" />
            <Button variant="ghost" href="/blog">
              <ArrowLeft size={14} /> Back to blog
            </Button>
          </div>
        </Container>
      </div>

      {/* Mobile floating share */}
      <div className="fixed bottom-6 right-6 md:hidden z-40">
        <div className="bg-teal-700 hover:bg-teal-800 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300">
          <ShareButton
            title={post.title}
            url={`/blog/${slug}`}
            description={post.excerpt}
          />
        </div>
      </div>
    </div>
  );
}
