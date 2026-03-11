import Link from "next/link";
import { PLANTS } from "@/lib/plants";

export default function Footer({ maxWidth = 1400 }: { maxWidth?: number }) {
  return (
    <footer style={{ maxWidth, margin: "0 auto", padding: "0 clamp(18px, 4vw, 48px)" }}>
      <div
        style={{
          borderTop: "1px solid rgba(40,32,20,0.08)",
          paddingTop: 24,
          paddingBottom: 16,
        }}
      >
        {/* About blurb */}
        <p className="font-serif" style={{ fontSize: 15, color: "#5A4E3E", lineHeight: 1.6, marginBottom: 16, maxWidth: 520 }}>
          A curated plant reference for US gardeners. Find what blooms in your zone, in your season, with your conditions.
        </p>

        {/* Links row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <span className="font-serif" style={{ fontSize: 16, color: "#5A4E3E", display: "block", marginBottom: 4 }}>What&apos;s Bloomin&apos;</span>
            <span className="font-mono" style={{ fontSize: 9, color: "#A09484", letterSpacing: 1 }}>v1.7 - {PLANTS.length} plants - US Zones 3-11</span>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <Link href="/blog" className="font-mono" style={{ fontSize: 10, color: "#A09484", textDecoration: "none" }}>Blog</Link>
            <Link href="/contact" className="font-mono" style={{ fontSize: 10, color: "#A09484", textDecoration: "none" }}>Contact</Link>
            <Link href="/privacy" className="font-mono" style={{ fontSize: 10, color: "#A09484", textDecoration: "none" }}>Privacy</Link>
            <Link href="/terms" className="font-mono" style={{ fontSize: 10, color: "#A09484", textDecoration: "none" }}>Terms</Link>
          </div>
        </div>
      </div>
      <div className="rainbow-strip" style={{ height: 3, opacity: 0.5, marginTop: 8 }} />
    </footer>
  );
}
