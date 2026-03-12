import { Metadata } from "next";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import { PLANTS, PLANT_TYPE_LABELS, BLOOM_COLOR_HEX, MONTH_NAMES } from "@/lib/plants";

export const metadata: Metadata = {
  title: "All Plants A-Z - What's Bloomin'",
  description: `Browse all ${PLANTS.length}+ flowering plants, shrubs, and trees in our database. Find bloom seasons, USDA zones, sun requirements, and companion planting suggestions.`,
  openGraph: {
    title: "All Plants A-Z - What's Bloomin'",
    description: `Browse all ${PLANTS.length}+ flowering plants in our curated database.`,
  },
};

export default function PlantsIndexPage() {
  const sorted = [...PLANTS].sort((a, b) => a.name.localeCompare(b.name));

  // Group by first letter
  const groups: Record<string, typeof PLANTS> = {};
  for (const plant of sorted) {
    const letter = plant.name[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(plant);
  }

  const letters = Object.keys(groups).sort();

  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px clamp(18px, 4vw, 44px) 60px" }}>
        <h1 className="font-serif" style={{ fontSize: "clamp(32px, 5vw, 44px)", fontWeight: 600, marginBottom: 8 }}>
          All Plants A-Z
        </h1>
        <p className="font-serif" style={{ fontSize: 18, color: "#5A4E3E", lineHeight: 1.6, marginBottom: 32, maxWidth: 600 }}>
          {PLANTS.length} flowering plants, shrubs, and trees with bloom seasons, growing zones, and companion suggestions.
        </p>

        {/* Letter jump nav */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 40 }}>
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#${letter}`}
              className="font-mono"
              style={{
                fontSize: 13,
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(40,32,20,0.10)",
                background: "#FDFBF7",
                color: "#3E3628",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              {letter}
            </a>
          ))}
        </div>

        {/* Plant listings by letter */}
        {letters.map((letter) => (
          <div key={letter} id={letter} style={{ marginBottom: 36 }}>
            <div className="font-serif" style={{ fontSize: 28, fontWeight: 600, color: "#1A1610", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid rgba(40,32,20,0.08)" }}>
              {letter}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {groups[letter].map((plant) => {
                const bloomRange = [...plant.bloomMonths].sort((a, b) => a - b);
                const bloomText = bloomRange.length > 0
                  ? `${MONTH_NAMES[bloomRange[0] - 1]}-${MONTH_NAMES[bloomRange[bloomRange.length - 1] - 1]}`
                  : "";
                return (
                  <Link
                    key={plant.slug}
                    href={`/plants/${plant.slug}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 14px",
                      background: "#FDFBF7",
                      border: "1px solid rgba(40,32,20,0.06)",
                      textDecoration: "none",
                      transition: "border-color 0.2s",
                    }}
                  >
                    {/* Color dot */}
                    <div style={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: BLOOM_COLOR_HEX[plant.colors[0]] || "#ccc",
                      border: plant.colors[0] === "white" ? "1px solid #CCC5B8" : "1px solid rgba(0,0,0,0.06)",
                      flexShrink: 0,
                    }} />
                    {/* Name + botanical */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span className="font-serif" style={{ fontSize: 16, fontWeight: 600, color: "#1A1610" }}>{plant.name}</span>
                      <span className="font-mono" style={{ fontSize: 12, color: "#8A7E6E", marginLeft: 8, fontStyle: "italic" }}>{plant.botanical}</span>
                    </div>
                    {/* Meta */}
                    <div className="font-mono" style={{ fontSize: 11, color: "#8A7E6E", flexShrink: 0, textAlign: "right" }}>
                      <span>{PLANT_TYPE_LABELS[plant.type]}</span>
                      {bloomText && <span style={{ marginLeft: 10 }}>{bloomText}</span>}
                      <span style={{ marginLeft: 10 }}>Z{Math.min(...plant.zones)}-{Math.max(...plant.zones)}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <Footer maxWidth={900} />
    </div>
  );
}
