import { Metadata } from "next";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};

export default function TermsPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px clamp(18px, 4vw, 44px) 80px" }}>
        <h1 className="font-serif" style={{ fontSize: 36, fontWeight: 600, marginBottom: 8 }}>Terms &amp; Conditions</h1>
        <p className="font-mono" style={{ fontSize: 11, color: "#8A7E6E", marginBottom: 32 }}>Last updated: March 2026</p>

        <div className="font-serif" style={{ fontSize: 17, color: "#332C22", lineHeight: 1.7 }}>
          <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, marginTop: 32, marginBottom: 8 }}>Agreement to Terms</h2>
          <p style={{ marginBottom: 16 }}>
            By accessing and using What&apos;s Bloomin&apos; (whatsbloomin.com), you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, please do not use our site.
          </p>

          <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, marginTop: 32, marginBottom: 8 }}>Use of the Site</h2>
          <p style={{ marginBottom: 16 }}>
            What&apos;s Bloomin&apos; provides general gardening and plant information for educational purposes only. The information on this site is not intended as professional horticultural, landscaping, or agricultural advice. Plant performance may vary based on local conditions, microclimate, soil composition, and other factors.
          </p>

          <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, marginTop: 32, marginBottom: 8 }}>Accuracy of Information</h2>
          <p style={{ marginBottom: 16 }}>
            While we strive to provide accurate and up-to-date plant information, we make no warranties or representations regarding the completeness, accuracy, or reliability of any content on this site. USDA hardiness zone data, bloom times, and growing requirements are general guidelines and may not reflect conditions specific to your location.
          </p>

          <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, marginTop: 32, marginBottom: 8 }}>Intellectual Property</h2>
          <p style={{ marginBottom: 16 }}>
            All content on this site, including text, design, graphics, and code, is the property of What&apos;s Bloomin&apos; and is protected by copyright laws. You may not reproduce, distribute, or create derivative works from this content without our written permission.
          </p>

          <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, marginTop: 32, marginBottom: 8 }}>Limitation of Liability</h2>
          <p style={{ marginBottom: 16 }}>
            What&apos;s Bloomin&apos; shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use of or inability to use this site, or from any information provided on this site. This includes, without limitation, damages from failed plantings, property damage, or reliance on plant information.
          </p>

          <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, marginTop: 32, marginBottom: 8 }}>External Links</h2>
          <p style={{ marginBottom: 16 }}>
            Our site may contain links to third-party websites. We are not responsible for the content, accuracy, or practices of external sites.
          </p>

          <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, marginTop: 32, marginBottom: 8 }}>Changes to Terms</h2>
          <p style={{ marginBottom: 16 }}>
            We reserve the right to modify these terms at any time. Changes take effect immediately upon posting. Continued use of the site constitutes acceptance of the updated terms.
          </p>

          <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, marginTop: 32, marginBottom: 8 }}>Governing Law</h2>
          <p style={{ marginBottom: 16 }}>
            These terms shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.
          </p>
        </div>
      </div>

      <Footer maxWidth={720} />
    </div>
  );
}
