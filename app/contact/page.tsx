import { Metadata } from "next";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the What's Bloomin' team. Suggest plants, report errors, or explore partnerships.",
};

export default function ContactPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px clamp(18px, 4vw, 44px) 80px" }}>
        <h1 className="font-serif" style={{ fontSize: 36, fontWeight: 600, marginBottom: 12 }}>Get in Touch</h1>
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

      <Footer maxWidth={720} />
    </div>
  );
}
