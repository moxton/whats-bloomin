import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the What's Bloomin' team. Suggest plants, report errors, or explore partnerships.",
};

export default function ContactPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="rainbow-strip" style={{ height: 3, opacity: 0.7 }} />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px clamp(18px, 4vw, 44px) 80px" }}>
        <Link href="/" className="font-mono" style={{ fontSize: 11, color: "#8A7E6E", textDecoration: "none", letterSpacing: 1.5 }}>← BACK</Link>

        <h1 className="font-serif" style={{ fontSize: 36, fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Get in Touch</h1>
        <p className="font-serif" style={{ fontSize: 19, color: "#332C22", lineHeight: 1.65, marginBottom: 32, maxWidth: 560 }}>
          Spot a missing plant? Found an error in our data? Want to suggest something we should cover? We&apos;d love to hear from you.
        </p>

        {/* Email card */}
        <div style={{ background: "#FDFBF7", border: "1px solid rgba(40,32,20,0.06)", padding: "28px 32px", marginBottom: 32 }}>
          <div className="font-mono" style={{ fontSize: 9, color: "#8A7E6E", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Email Us</div>
          <a href="mailto:hello@whatsbloomin.com" className="font-serif" style={{ fontSize: 22, fontWeight: 600, color: "var(--green)", textDecoration: "none" }}>
            hello@whatsbloomin.com
          </a>
        </div>

        {/* Reasons */}
        <div className="font-serif" style={{ fontSize: 17, color: "#332C22", lineHeight: 1.7 }}>
          <h2 className="font-serif" style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "#3E3628" }}>Common Reasons People Write</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", gap: 16 }}>
              <span className="font-mono" style={{ fontSize: 14, color: "var(--green)", flexShrink: 0, marginTop: 2 }}>→</span>
              <div>
                <strong style={{ fontWeight: 600 }}>Plant suggestions</strong>
                <span style={{ color: "#5A4E3E" }}> - Tell us which plant you want to see added. We prioritize based on reader interest.</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: 16 }}>
              <span className="font-mono" style={{ fontSize: 14, color: "var(--green)", flexShrink: 0, marginTop: 2 }}>→</span>
              <div>
                <strong style={{ fontWeight: 600 }}>Corrections</strong>
                <span style={{ color: "#5A4E3E" }}> - If you spot an error in our zone data, bloom times, or plant details, please let us know. We take accuracy seriously.</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: 16 }}>
              <span className="font-mono" style={{ fontSize: 14, color: "var(--green)", flexShrink: 0, marginTop: 2 }}>→</span>
              <div>
                <strong style={{ fontWeight: 600 }}>Partnerships</strong>
                <span style={{ color: "#5A4E3E" }}> - Interested in working together? We&apos;re open to collaborations with nurseries, garden centers, and horticultural organizations.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
