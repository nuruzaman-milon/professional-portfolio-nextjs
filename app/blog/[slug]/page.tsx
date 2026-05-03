import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Heart, MessageCircle } from "lucide-react";
import ShareButton from "@/components/ShareButton";
import type { Metadata, ResolvingMetadata } from "next";
import Container from "@/components/Container";
import { getBlogPost, getRelatedPosts } from "@/data/blog";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;

  console.log("meta data slug", slug);

  const post = getBlogPost(slug);

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
  const post = getBlogPost(slug);

  // ── 404 state ──────────────────────────────────────────────────────────────
  if (!post) {
    return (
      <div className="pf-mesh pf-noise relative min-h-screen overflow-hidden pt-20 flex items-center justify-center">
        <div className="pf-grid absolute inset-0 z-0" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Post Not Found
          </h1>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-emerald-500 hover:text-emerald-400 transition-colors font-light"
          >
            <ArrowLeft size={15} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }
  const related = getRelatedPosts(slug);

  return (
    <div className="pf-mesh pf-noise relative min-h-screen overflow-hidden pt-20">
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
            "radial-gradient(circle, rgba(16,185,129,.15) 0%, transparent 70%)",
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
            "radial-gradient(circle, rgba(16,185,129,.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        <Container className="py-12">
          {/* ── Back link ── */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200 font-light mb-14"
          >
            <ArrowLeft size={15} /> Back to Blog
          </Link>

          {/* ── Header ── */}
          <header className="mb-10">
            {/* Category + Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="px-3 py-1 bg-emerald-600 text-white text-[11px] font-mono tracking-wide rounded-md">
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

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 leading-relaxed font-light max-w-3xl">
              {post.excerpt}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-gray-200/40 dark:border-white/[0.06]">
              <div className="flex items-center gap-5 text-xs font-mono text-gray-400 dark:text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={12} />
                  <span>{post.readTime}</span>
                </div>
                <span>By {post.author}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  className="h-8 px-3 rounded-lg border border-gray-200/70 dark:border-white/[0.08]
                             bg-white/70 dark:bg-white/[0.04] text-xs font-mono
                             text-gray-500 dark:text-gray-400
                             hover:border-emerald-400/60 hover:text-emerald-600 dark:hover:text-emerald-400
                             flex items-center gap-1.5 transition-colors duration-200"
                >
                  <Heart size={12} /> 24
                </button>
                <button
                  className="h-8 px-3 rounded-lg border border-gray-200/70 dark:border-white/[0.08]
                             bg-white/70 dark:bg-white/[0.04] text-xs font-mono
                             text-gray-500 dark:text-gray-400
                             hover:border-emerald-400/60 hover:text-emerald-600 dark:hover:text-emerald-400
                             flex items-center gap-1.5 transition-colors duration-200"
                >
                  <MessageCircle size={12} /> 8
                </button>
                <ShareButton
                  title={post.title}
                  url={`/blog/${slug}`}
                  description={post.excerpt}
                />
              </div>
            </div>
          </header>

          {/* ── Hero image ── */}
          <div className="relative rounded-xl overflow-hidden mb-10 border border-gray-200/60 dark:border-white/[0.07]">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>

          {/* ── Article content ── */}
          <div className="rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm p-8 md:p-12 mb-10">
            <div
              className="prose prose-lg prose-gray dark:prose-invert max-w-none
                prose-headings:text-gray-900 dark:prose-headings:text-white
                prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:font-light prose-p:leading-relaxed
                prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
                prose-code:text-emerald-600 dark:prose-code:text-emerald-400
                prose-code:bg-gray-100/80 dark:prose-code:bg-white/[0.06]
                prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-[13px]
                prose-pre:bg-gray-50 dark:prose-pre:bg-white/[0.04]
                prose-pre:border prose-pre:border-gray-200/60 dark:prose-pre:border-white/[0.07]
                prose-pre:rounded-xl prose-pre:text-sm
                prose-li:text-gray-600 dark:prose-li:text-gray-300 prose-li:font-light
                prose-ul:my-4
                prose-a:text-emerald-600 dark:prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* ── Author card ── */}
          <div className="rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm p-7 mb-16 flex items-center gap-5">
            <div className="w-14 h-14 rounded-full overflow-hidden border border-emerald-400/30 flex-shrink-0">
              <Image
                src="/images/profile-photo.jpg"
                alt={post.author}
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-[10px] font-mono tracking-[.15em] uppercase text-emerald-500 dark:text-emerald-400 mb-1">
                Author
              </p>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                {post.author}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                Full Stack Developer with 2+ years of experience in MERN stack
                development. Passionate about sharing knowledge and building
                great products.
              </p>
            </div>
          </div>

          {/* ── Related articles ── */}
          {related.length > 0 && (
            <div>
              <p className="text-[10px] font-mono tracking-[.15em] uppercase text-emerald-500 dark:text-emerald-400 mb-6">
                Related Articles
              </p>
              <div className="grid md:grid-cols-2 gap-5">
                {related.map((rel) =>
                  rel ? (
                    <Link
                      key={rel.id}
                      href={`/blog/${rel.slug}`}
                      className="group rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm p-6 hover:border-emerald-300/50 dark:hover:border-emerald-700/40 transition-colors duration-300"
                    >
                      <span className="inline-block px-2.5 py-1 bg-emerald-600 text-white text-[10px] font-mono tracking-wide rounded-md mb-3">
                        {rel.category}
                      </span>
                      <h4 className="text-base font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                        {rel.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed line-clamp-2">
                        {rel.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-3 text-[11px] font-mono text-gray-400 dark:text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={10} />
                          {new Date(rel.date).toLocaleDateString()}
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
          <div className="mt-20 pt-10 border-t border-gray-200/40 dark:border-white/[0.06]">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200 font-light"
            >
              <ArrowLeft size={15} /> Back to Blog
            </Link>
          </div>
        </Container>
      </div>

      {/* Mobile floating share */}
      <div className="fixed bottom-6 right-6 md:hidden z-40">
        <div className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300">
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
