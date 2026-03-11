import { Metadata } from "next";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px clamp(18px, 4vw, 44px) 80px" }}>
        <h1 className="font-serif" style={{ fontSize: 36, fontWeight: 600, marginBottom: 8 }}>Privacy Policy</h1>
        <p className="font-mono" style={{ fontSize: 11, color: "#8A7E6E", marginBottom: 32 }}>Last updated: March 2026</p>

        <div className="font-serif" style={{ fontSize: 17, color: "#332C22", lineHeight: 1.7 }}>
          <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, marginTop: 32, marginBottom: 8 }}>Overview</h2>
          <p style={{ marginBottom: 16 }}>
            What&apos;s Bloomin&apos; (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates whatsbloomin.com. This page informs you of our policies regarding the collection, use, and disclosure of personal information when you use our site.
          </p>

          <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, marginTop: 32, marginBottom: 8 }}>Information We Collect</h2>
          <p style={{ marginBottom: 16 }}>
            What&apos;s Bloomin&apos; is a static informational website. We do not require you to create an account, and we do not collect personal information such as your name, email address, or payment information through the site itself.
          </p>
          <p style={{ marginBottom: 16 }}>
            We may use third-party analytics services (such as Google Analytics) that collect anonymous usage data including pages visited, time on site, browser type, and approximate geographic location. This data is used solely to improve the site experience and understand how visitors use the tool.
          </p>

          <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, marginTop: 32, marginBottom: 8 }}>Cookies</h2>
          <p style={{ marginBottom: 16 }}>
            We may use cookies or similar technologies for analytics purposes. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. If you do not accept cookies, you can still use all features of our site.
          </p>

          <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, marginTop: 32, marginBottom: 8 }}>Third-Party Links</h2>
          <p style={{ marginBottom: 16 }}>
            Our site may contain links to other websites. We are not responsible for the privacy practices of other sites and encourage you to read their privacy policies.
          </p>

          <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, marginTop: 32, marginBottom: 8 }}>Children&apos;s Privacy</h2>
          <p style={{ marginBottom: 16 }}>
            Our site does not address anyone under the age of 13. We do not knowingly collect personal information from children.
          </p>

          <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, marginTop: 32, marginBottom: 8 }}>Changes to This Policy</h2>
          <p style={{ marginBottom: 16 }}>
            We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date.
          </p>

          <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, marginTop: 32, marginBottom: 8 }}>Contact</h2>
          <p style={{ marginBottom: 16 }}>
            If you have questions about this privacy policy, please contact us through our website.
          </p>
        </div>
      </div>

      <Footer maxWidth={720} />
    </div>
  );
}
