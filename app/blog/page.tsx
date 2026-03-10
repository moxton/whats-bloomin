import Link from "next/link";
import { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog - Gardening Guides & Seasonal Tips",
  description: "Practical gardening guides, seasonal planting tips, and plant recommendations from What's Bloomin'.",
};

export default function BlogPage() {
  const sorted = [...BLOG_POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="rainbow-strip" style={{ height: 3, opacity: 0.7 }} />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px clamp(18px, 4vw, 44px) 80px" }}>
        <nav style={{ marginBottom: 24 }}>
          <Link href="/" className="font-mono" style={{ fontSize: 11, color: "#8A7E6E", textDecoration: "none", letterSpacing: 1.5 }}>← BACK TO PLANTS</Link>
        </nav>

        <h1 className="font-serif" style={{ fontSize: 36, fontWeight: 600, marginBottom: 8 }}>Blog</h1>
        <p className="font-serif" style={{ fontSize: 18, color: "#5A4E3E", lineHeight: 1.6, marginBottom: 40 }}>
          Practical guides to help you grow a better garden.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {sorted.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ display: "block", textDecoration: "none", color: "inherit", padding: "28px 0", borderTop: i === 0 ? "1px solid rgba(40,32,20,0.08)" : "none", borderBottom: "1px solid rgba(40,32,20,0.08)", transition: "background 0.2s" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
                <span className="font-mono" style={{ fontSize: 9, color: "var(--green)", letterSpacing: 1.5, textTransform: "uppercase" }}>{post.category}</span>
                <span className="font-mono" style={{ fontSize: 9, color: "#A09484" }}>{post.readTime}</span>
              </div>
              <h2 className="font-serif" style={{ fontSize: 24, fontWeight: 600, color: "#1A1610", marginBottom: 6, lineHeight: 1.3 }}>{post.title}</h2>
              <p className="font-serif" style={{ fontSize: 16, color: "#5A4E3E", lineHeight: 1.6, margin: 0 }}>{post.description}</p>
            </Link>
          ))}
        </div>
      </div>

      <footer style={{ maxWidth: 800, margin: "0 auto", padding: "40px clamp(18px, 4vw, 44px) 0" }}>
        <div style={{ borderTop: "1px solid rgba(40,32,20,0.08)", paddingTop: 16, paddingBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <Link href="/" className="font-serif" style={{ fontSize: 14, color: "#7A6E5E", textDecoration: "none" }}>What&apos;s Bloomin&apos;</Link>
          <span className="font-mono" style={{ fontSize: 9, color: "#9A8E7E", letterSpacing: 1.5 }}>US - ZONES 3-11</span>
        </div>
      </footer>
      <div className="rainbow-strip" style={{ height: 3, opacity: 0.5 }} />
    </div>
  );
}
