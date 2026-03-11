import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ minHeight: "calc(100vh - 62px)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: 40 }}>
      <p className="font-serif" style={{ fontSize: 52, fontWeight: 300, marginBottom: 8 }}>404</p>
      <p className="font-serif" style={{ fontSize: 22, color: "#5A4E3E", marginBottom: 24 }}>This plant hasn&apos;t been discovered yet.</p>
      <Link href="/" className="font-mono" style={{ fontSize: 12, color: "#2C4434", textDecoration: "underline", textUnderlineOffset: 3 }}>
        Back to all plants
      </Link>
    </div>
  );
}
