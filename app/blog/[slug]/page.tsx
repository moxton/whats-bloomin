import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { PLANTS, BLOOM_COLOR_HEX, PLANT_TYPE_LABELS } from "@/lib/plants";

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: `${post.title} - What's Bloomin'`,
      description: post.description,
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const linkedPlants = post.plantLinks
    .map((slug) => PLANTS.find((p) => p.slug === slug))
    .filter(Boolean);

  // Find prev/next posts
  const sorted = [...BLOG_POSTS].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const idx = sorted.findIndex((p) => p.slug === post.slug);
  const prev = idx > 0 ? sorted[idx - 1] : null;
  const next = idx < sorted.length - 1 ? sorted[idx + 1] : null;

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="rainbow-strip" style={{ height: 3, opacity: 0.7 }} />

      <article style={{ maxWidth: 720, margin: "0 auto", padding: "40px clamp(18px, 4vw, 44px) 60px" }}>
        <nav style={{ marginBottom: 32 }}>
          <Link href="/blog" className="font-mono" style={{ fontSize: 11, color: "#8A7E6E", textDecoration: "none", letterSpacing: 1.5 }}>← ALL POSTS</Link>
        </nav>

        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
            <span className="font-mono" style={{ fontSize: 9, color: "var(--green)", letterSpacing: 1.5, textTransform: "uppercase" }}>{post.category}</span>
            <span className="font-mono" style={{ fontSize: 9, color: "#A09484" }}>{post.readTime}</span>
          </div>
          <h1 className="font-serif" style={{ fontSize: "clamp(30px, 5vw, 42px)", fontWeight: 600, lineHeight: 1.2, marginBottom: 12 }}>{post.title}</h1>
          <p className="font-serif" style={{ fontSize: 18, color: "#5A4E3E", lineHeight: 1.6 }}>{post.description}</p>
        </div>

        <div style={{ height: 1, background: "rgba(40,32,20,0.08)", marginBottom: 32 }} />

        {/* Article body */}
        <div
          className="font-serif blog-content"
          style={{ fontSize: 18, color: "#332C22", lineHeight: 1.75 }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Related plants */}
        {linkedPlants.length > 0 && (
          <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid rgba(40,32,20,0.08)" }}>
            <div className="font-mono" style={{ fontSize: 9, color: "#8A7E6E", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Plants Mentioned</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
              {linkedPlants.map((plant) => {
                if (!plant) return null;
                const pc = BLOOM_COLOR_HEX[plant.colors[0]] || "#ccc";
                return (
                  <Link key={plant.slug} href={`/plants/${plant.slug}`} style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                    background: "#FDFBF7", border: "1px solid rgba(40,32,20,0.06)",
                    textDecoration: "none", transition: "all 0.2s",
                  }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${pc}20`, border: `1px solid ${pc}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: pc }} />
                    </div>
                    <div>
                      <div className="font-serif" style={{ fontSize: 14, fontWeight: 600, color: "#1A1610", lineHeight: 1.2 }}>{plant.name}</div>
                      <div className="font-mono" style={{ fontSize: 8, color: "#8A7E6E" }}>{PLANT_TYPE_LABELS[plant.type]}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Prev/Next navigation */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(40,32,20,0.08)", display: "flex", justifyContent: "space-between", gap: 24 }}>
          {prev ? (
            <Link href={`/blog/${prev.slug}`} style={{ textDecoration: "none", flex: 1 }}>
              <span className="font-mono" style={{ fontSize: 9, color: "#A09484", letterSpacing: 1 }}>← PREVIOUS</span>
              <div className="font-serif" style={{ fontSize: 15, color: "#3E3628", marginTop: 4 }}>{prev.title}</div>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/blog/${next.slug}`} style={{ textDecoration: "none", flex: 1, textAlign: "right" }}>
              <span className="font-mono" style={{ fontSize: 9, color: "#A09484", letterSpacing: 1 }}>NEXT →</span>
              <div className="font-serif" style={{ fontSize: 15, color: "#3E3628", marginTop: 4 }}>{next.title}</div>
            </Link>
          ) : <div />}
        </div>
      </article>

      <footer style={{ maxWidth: 720, margin: "0 auto", padding: "40px clamp(18px, 4vw, 44px) 0" }}>
        <div style={{ borderTop: "1px solid rgba(40,32,20,0.08)", paddingTop: 16, paddingBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <Link href="/" className="font-serif" style={{ fontSize: 14, color: "#7A6E5E", textDecoration: "none" }}>What&apos;s Bloomin&apos;</Link>
          <span className="font-mono" style={{ fontSize: 9, color: "#9A8E7E", letterSpacing: 1.5 }}>US - ZONES 3-11</span>
        </div>
      </footer>
      <div className="rainbow-strip" style={{ height: 3, opacity: 0.5 }} />
    </div>
  );
}
