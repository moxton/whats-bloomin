import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/app/components/Footer";
import {
  PLANTS, PLANT_TYPE_LABELS, BLOOM_COLOR_HEX, SUN_LABELS, WATER_LABELS, BONUS_LABELS,
  MONTH_NAMES, RAINBOW, formatHeight, slugify,
} from "@/lib/plants";

export async function generateStaticParams() {
  return PLANTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const plant = PLANTS.find((p) => p.slug === params.slug);
  if (!plant) return { title: "Plant Not Found" };
  return {
    title: `${plant.name} (${plant.botanical}) - Growing Guide`,
    description: `${plant.desc} Learn about ${plant.name} bloom season, sun requirements, water needs, USDA zones ${Math.min(...plant.zones)}-${Math.max(...plant.zones)}, and companion plants.`,
    openGraph: {
      title: `${plant.name} - What's Bloomin'`,
      description: plant.desc,
    },
  };
}

export default function PlantPage({ params }: { params: { slug: string } }) {
  const plant = PLANTS.find((p) => p.slug === params.slug);
  if (!plant) notFound();

  const pc = BLOOM_COLOR_HEX[plant.colors[0]] || "#ccc";
  const companions = plant.pairsWith.map((name) => PLANTS.find((p) => p.name === name)).filter(Boolean);
  const bloomMonthNames = [...plant.bloomMonths].sort((a, b) => a - b).map((m) => MONTH_NAMES[m - 1]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: `${plant.name} Growing Guide`,
    description: plant.desc,
    mainEntityOfPage: `https://whatsbloomin.com/plants/${plant.slug}`,
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px clamp(18px, 4vw, 44px) 60px" }}>
        {/* Image placeholder */}
        <div style={{
          height: 300, background: `linear-gradient(160deg, ${pc}10 0%, ${pc}22 100%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 32, position: "relative",
          border: "1px solid rgba(40,32,20,0.06)",
        }}>
          <div style={{ width: 160, height: 160, border: `1.5px solid ${pc}40`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 130, height: 130, border: `1px solid ${pc}22`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="font-serif" style={{ fontSize: 12, letterSpacing: 2, color: pc, textTransform: "uppercase", opacity: 0.5 }}>Image</span>
            </div>
          </div>
          <div className="font-mono" style={{ position: "absolute", top: 16, left: 16, fontSize: 9, color: "#5A4E3E", background: "rgba(253,251,247,0.9)", padding: "3px 10px", letterSpacing: 0.5 }}>
            {PLANT_TYPE_LABELS[plant.type]}
          </div>
        </div>

        {/* Title */}
        <h1 className="font-serif" style={{ fontSize: "clamp(36px, 6vw, 52px)", fontWeight: 600, marginBottom: 4, lineHeight: 1.1 }}>{plant.name}</h1>
        <p className="font-mono" style={{ fontSize: 14, color: "#7A6E5E", fontStyle: "italic", marginBottom: 20 }}>{plant.botanical}</p>
        {/* Variety badge */}
        {plant.isVariety && plant.parentSpecies && (
          <div className="font-mono" style={{ fontSize: 10, color: "var(--green)", marginBottom: 8 }}>
            <Link href={`/plants/${plant.parentSpecies.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} style={{ color: "var(--green)", textDecoration: "underline", textUnderlineOffset: 2 }}>{plant.parentSpecies}</Link> variety
          </div>
        )}
        <p className="font-serif" style={{ fontSize: 19, color: "#332C22", lineHeight: 1.65, maxWidth: 640, marginBottom: 32 }}>{plant.desc}</p>

        {/* Quick stats - 2x2 grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: 16, marginBottom: 32 }}>
          {/* Bloom Season */}
          <div style={{ background: "#FDFBF7", border: "1px solid rgba(40,32,20,0.06)", padding: 20 }}>
            <div className="font-mono" style={{ fontSize: 9, color: "#8A7E6E", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Bloom Season</div>
            <div className="font-serif" style={{ fontSize: 18, fontWeight: 600, color: "#1A1610", marginBottom: 12 }}>{bloomMonthNames[0]} - {bloomMonthNames[bloomMonthNames.length - 1]}</div>
            <div style={{ display: "flex", gap: 3 }}>
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: plant.bloomMonths.includes(i + 1) ? pc : "rgba(40,32,20,0.06)", opacity: plant.bloomMonths.includes(i + 1) ? 0.7 : 1 }} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              {MONTH_NAMES.map((m) => <span key={m} className="font-mono" style={{ fontSize: 7, color: "#8A7E6E" }}>{m[0]}</span>)}
            </div>
          </div>

          {/* Sun */}
          <div style={{ background: "#FDFBF7", border: "1px solid rgba(40,32,20,0.06)", padding: 20 }}>
            <div className="font-mono" style={{ fontSize: 9, color: "#8A7E6E", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Sun Requirements</div>
            {plant.sun.map((s) => {
              const info = SUN_LABELS[s];
              return (
                <div key={s} style={{ marginBottom: 6 }}>
                  <span className="font-serif" style={{ fontSize: 16, fontWeight: 500 }}>{info.icon} {info.label}</span>
                  <span className="font-mono" style={{ fontSize: 10, color: "#8A7E6E", marginLeft: 8 }}>{info.sub}</span>
                </div>
              );
            })}
          </div>

          {/* Water */}
          <div style={{ background: "#FDFBF7", border: "1px solid rgba(40,32,20,0.06)", padding: 20 }}>
            <div className="font-mono" style={{ fontSize: 9, color: "#8A7E6E", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Water Needs</div>
            <div className="font-serif" style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{plant.water.charAt(0).toUpperCase() + plant.water.slice(1)}</div>
            <div className="font-mono" style={{ fontSize: 11, color: "#6A5E4E" }}>{WATER_LABELS[plant.water].sub}</div>
          </div>

          {/* Size & Zones */}
          <div style={{ background: "#FDFBF7", border: "1px solid rgba(40,32,20,0.06)", padding: 20 }}>
            <div className="font-mono" style={{ fontSize: 9, color: "#8A7E6E", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Size & Zones</div>
            <div className="font-serif" style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{formatHeight(plant)} tall</div>
            <div className="font-mono" style={{ fontSize: 11, color: "#6A5E4E" }}>USDA Zones {Math.min(...plant.zones)}-{Math.max(...plant.zones)}</div>
          </div>
        </div>

        {/* Colors + Traits + Soil - unified card row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: 16, marginBottom: 40 }}>
          {/* Colors */}
          <div style={{ background: "#FDFBF7", border: "1px solid rgba(40,32,20,0.06)", padding: 20 }}>
            <div className="font-mono" style={{ fontSize: 9, color: "#8A7E6E", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Bloom Colors</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {plant.colors.map((c) => (
                <div key={c} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: BLOOM_COLOR_HEX[c], border: c === "white" ? "1px solid #CCC5B8" : "1px solid rgba(0,0,0,0.06)" }} />
                  <span className="font-serif" style={{ fontSize: 15, color: "#4A3E30" }}>{c.charAt(0).toUpperCase() + c.slice(1)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Traits */}
          <div style={{ background: "#FDFBF7", border: "1px solid rgba(40,32,20,0.06)", padding: 20 }}>
            <div className="font-mono" style={{ fontSize: 9, color: "#8A7E6E", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Traits</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {plant.bonus.map((b) => {
                const trait = BONUS_LABELS[b];
                return <span key={b} className="font-mono" style={{ fontSize: 12, color: "#4A3E30", padding: "5px 14px", border: "1px solid rgba(40,32,20,0.10)", background: "rgba(44,68,52,0.03)" }}>{trait.icon} {trait.label}</span>;
              })}
            </div>
          </div>

          {/* Soil */}
          {plant.soil.length > 0 && (
            <div style={{ background: "#FDFBF7", border: "1px solid rgba(40,32,20,0.06)", padding: 20 }}>
              <div className="font-mono" style={{ fontSize: 9, color: "#8A7E6E", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Soil</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {plant.soil.map((s) => (
                  <span key={s} className="font-mono" style={{ fontSize: 12, color: "#8E6E28", padding: "5px 14px", border: "1px solid rgba(142,110,40,0.2)", background: "rgba(142,110,40,0.04)" }}>
                    {s === "clay" ? "Clay" : s === "sandy" ? "Sandy" : s === "loam" ? "Loam" : "Poor Soil"}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Companion Plants */}
        {companions.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <div className="font-mono" style={{ fontSize: 9, color: "#8A7E6E", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Pairs Well With</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
              {companions.map((comp) => {
                if (!comp) return null;
                const compColor = BLOOM_COLOR_HEX[comp.colors[0]] || "#ccc";
                return (
                  <Link key={comp.slug} href={`/plants/${comp.slug}`} style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                    background: "#FDFBF7", border: "1px solid rgba(40,32,20,0.06)",
                    textDecoration: "none", transition: "all 0.2s",
                  }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${compColor}20`, border: `1px solid ${compColor}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: compColor }} />
                    </div>
                    <div>
                      <div className="font-serif" style={{ fontSize: 16, fontWeight: 600, color: "#1A1610" }}>{comp.name}</div>
                      <div className="font-mono" style={{ fontSize: 9, color: "#8A7E6E" }}>{PLANT_TYPE_LABELS[comp.type]}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Footer maxWidth={900} />
    </div>
  );
}
