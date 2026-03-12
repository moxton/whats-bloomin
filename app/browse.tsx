"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { lookupZone } from "@/lib/zip-zones";
import Footer from "@/app/components/Footer";
import {
  PLANTS, PLANT_TYPE_LABELS, BLOOM_COLOR_HEX, SUN_LABELS, WATER_LABELS, BONUS_LABELS,
  MONTH_NAMES, RAINBOW, formatHeight, getSizeTier,
  type PlantType, type BloomColor, type SunLevel, type WaterLevel, type SoilType, type BonusTrait, type Plant,
} from "@/lib/plants";

const ZONES = [3, 4, 5, 6, 7, 8, 9, 10, 11];
const CURRENT_MONTH = new Date().getMonth() + 1; // 1-12
const PAGE_SIZE = 36;

const SEASONS = [
  { id: "early-spring", label: "Early Spring", months: [3], color: "#5A8A5A" },
  { id: "mid-spring", label: "Mid Spring", months: [4], color: "#4A7A4A" },
  { id: "late-spring", label: "Late Spring", months: [5], color: "#3A6A3A" },
  { id: "early-summer", label: "Early Summer", months: [6], color: "#B09030" },
  { id: "mid-summer", label: "Mid Summer", months: [7], color: "#9E7E28" },
  { id: "late-summer", label: "Late Summer", months: [8], color: "#8E6E28" },
  { id: "early-fall", label: "Early Fall", months: [9], color: "#A05830" },
  { id: "mid-fall", label: "Mid Fall", months: [10], color: "#8E4828" },
  { id: "late-fall", label: "Late Fall", months: [11], color: "#6E3820" },
  { id: "winter", label: "Winter", months: [12, 1, 2], color: "#5A7A90" },
];

const SIZE_TIERS = [
  { id: "groundcover", label: 'Ground Cover - under 6"' }, { id: "short", label: 'Short - 6-18"' },
  { id: "medium", label: 'Medium - 18-36"' }, { id: "tall", label: "Tall - 3-6'" }, { id: "very-tall", label: "Very Tall - 6'+" },
];

const SOIL_OPTIONS: { id: SoilType; label: string }[] = [
  { id: "clay", label: "Clay" }, { id: "sandy", label: "Sandy" }, { id: "poor", label: "Poor Soil" }, { id: "loam", label: "Loam" },
];

const BLOOM_COLORS: { id: BloomColor; label: string; hex: string }[] = [
  { id: "pink", label: "Pink", hex: "#D4899B" }, { id: "purple", label: "Purple", hex: "#8B6BAE" },
  { id: "blue", label: "Blue", hex: "#5B87A8" }, { id: "white", label: "White", hex: "#F0ECE4" },
  { id: "yellow", label: "Yellow", hex: "#C4A430" }, { id: "orange", label: "Orange", hex: "#C47A3A" },
  { id: "red", label: "Red", hex: "#B04A4A" }, { id: "lavender", label: "Lavender", hex: "#A08AB8" },
  { id: "green", label: "Green", hex: "#5A8A5A" },
];

type SortOption = "a-z" | "z-a" | "bloom" | "zone-range";
const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: "a-z", label: "A-Z" },
  { id: "z-a", label: "Z-A" },
  { id: "bloom", label: "Earliest Bloom" },
  { id: "zone-range", label: "Widest Range" },
];

function getSeasonForMonth(m: number) { return SEASONS.find((s) => s.months.includes(m))?.id || null; }

// ═══ PLANT CARD ═══

function PlantCard({ plant, index }: { plant: Plant; index: number }) {
  const pc = BLOOM_COLOR_HEX[plant.colors[0]] || "#ccc";
  const bloomRange = (() => { const m = [...plant.bloomMonths].sort((a, b) => a - b); return `${MONTH_NAMES[m[0] - 1]}-${MONTH_NAMES[m[m.length - 1] - 1]}`; })();
  const typeLabel = PLANT_TYPE_LABELS[plant.type];
  const sunIcons = plant.sun.map((s) => SUN_LABELS[s]?.icon || "").join(" ");
  const isBloomingNow = plant.bloomMonths.includes(CURRENT_MONTH);

  return (
    <Link href={`/plants/${plant.slug}`} style={{ display: "block", textDecoration: "none", color: "inherit", background: "#FDFBF7", overflow: "hidden", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)", boxShadow: "0 1px 3px rgba(40,32,20,0.05), 0 0 0 1px rgba(40,32,20,0.06)", animationDelay: `${Math.min(index, 8) * 40}ms` }} className="animate-card-in hover:-translate-y-1 hover:shadow-lg">
      <div style={{ height: 180, background: `linear-gradient(160deg, ${pc}10 0%, ${pc}22 100%)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", borderBottom: "1px solid rgba(40,32,20,0.06)" }}>
        <div style={{ width: 100, height: 100, border: `1.5px solid ${pc}40`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 80, height: 80, border: `1px solid ${pc}22`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="font-serif" style={{ fontSize: 11, letterSpacing: 1.5, color: pc, textTransform: "uppercase", opacity: 0.5 }}>Image</span>
          </div>
        </div>
        <span className="font-mono" style={{ position: "absolute", top: 10, left: 12, fontSize: 10, color: "#5A4E3E", background: "rgba(253,251,247,0.88)", backdropFilter: "blur(8px)", padding: "2px 8px" }}>{typeLabel}</span>
        <span className="font-serif" style={{ position: "absolute", top: 10, right: 12, fontSize: 13, color: "#4A3E30", background: "rgba(253,251,247,0.88)", backdropFilter: "blur(8px)", padding: "2px 8px" }}>{bloomRange}</span>
        {isBloomingNow && (
          <span className="font-mono" style={{ position: "absolute", bottom: 22, left: 12, fontSize: 9, color: "#fff", background: "var(--green)", padding: "2px 8px", letterSpacing: 0.5 }}>Blooming now</span>
        )}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 16, display: "flex", alignItems: "center", padding: "0 12px", gap: 2, background: "rgba(253,251,247,0.5)" }}>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: plant.bloomMonths.includes(i + 1) ? pc : "rgba(40,32,20,0.06)", opacity: plant.bloomMonths.includes(i + 1) ? 0.6 : 1 }} />
          ))}
        </div>
      </div>
      <div style={{ padding: "16px 18px 18px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 2 }}>
          <h3 className="font-serif" style={{ fontSize: 23, fontWeight: 600, color: "#1A1610", lineHeight: 1.15 }}>{plant.name}</h3>
          <span className="font-mono" style={{ fontSize: 11, color: "#6A5E4E" }}>{formatHeight(plant)}</span>
        </div>
        <p className="font-mono" style={{ fontSize: 11, color: "#7A6E5E", margin: "1px 0 10px", fontStyle: "italic" }}>{plant.botanical}</p>
        <p className="font-serif" style={{ fontSize: 16, color: "#332C22", margin: "0 0 12px", lineHeight: 1.6 }}>{plant.desc}</p>
        <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
          <span className="font-mono" style={{ fontSize: 11, color: "#5A4E3E" }}>{sunIcons} {plant.sun.map((s) => SUN_LABELS[s]?.label).join(" / ")}</span>
          <span className="font-mono" style={{ fontSize: 11, color: "#5A4E3E" }}>{plant.water.charAt(0).toUpperCase() + plant.water.slice(1)}</span>
          <span className="font-mono" style={{ fontSize: 11, color: "#5A4E3E" }}>Z{Math.min(...plant.zones)}-{Math.max(...plant.zones)}</span>
        </div>
        <div style={{ height: 1, background: "rgba(40,32,20,0.06)", marginBottom: 12 }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {plant.bonus.slice(0, 4).map((b) => {
            const trait = BONUS_LABELS[b];
            return <span key={b} className="font-mono" style={{ fontSize: 11, color: "#5A4E3E", padding: "3px 8px", border: "1px solid rgba(40,32,20,0.08)" }}>{trait.icon} {trait.label}</span>;
          })}
        </div>
        <div style={{ display: "flex", gap: 5, marginTop: 12, alignItems: "center" }}>
          {plant.colors.map((c) => (
            <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: BLOOM_COLOR_HEX[c], border: c === "white" ? "1px solid #CCC5B8" : "1px solid rgba(0,0,0,0.06)" }} />
          ))}
        </div>
        {plant.pairsWith.length > 0 && (
          <p className="font-serif" style={{ fontSize: 13, color: "#8A7E6E", marginTop: 12, fontStyle: "italic" }}>
            Pairs well with {plant.pairsWith.slice(0, 2).join(" and ")}
          </p>
        )}
      </div>
    </Link>
  );
}

// ═══ FILTER BLOCK ═══

function FilterBlock({ label, children, defaultOpen = true }: { label: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ paddingBottom: open ? 14 : 0, marginBottom: 4 }}>
      <button onClick={() => setOpen(!open)} className="font-mono" style={{ fontSize: 12, color: "#5A4E3E", letterSpacing: 2, textTransform: "uppercase", fontWeight: 500, display: "flex", alignItems: "center", gap: 8, marginBottom: open ? 10 : 4, background: "none", border: "none", cursor: "pointer", padding: "4px 0", width: "100%", textAlign: "left" }}>
        <span style={{ fontSize: 10, color: "#8A7E6E", transition: "transform 0.2s", transform: open ? "rotate(90deg)" : "rotate(0)", display: "inline-block" }}>▸</span>
        {label}
      </button>
      {open && children}
    </div>
  );
}

// ═══ BLOOM PREVIEW STRIP ═══

function BloomPreviewStrip({ plants, onSwitchToCalendar }: { plants: Plant[]; onSwitchToCalendar: () => void }) {
  const monthCounts = Array.from({ length: 12 }, (_, i) => {
    return plants.filter((p) => p.bloomMonths.includes(i + 1)).length;
  });
  const maxCount = Math.max(...monthCounts, 1);
  const gaps = monthCounts.map((c, i) => c === 0 ? MONTH_NAMES[i] : null).filter(Boolean);

  return (
    <div style={{ background: "#FDFBF7", border: "1px solid rgba(40,32,20,0.07)", padding: "14px 20px", marginBottom: 14, display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 32, marginBottom: 4 }}>
          {monthCounts.map((count, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <div style={{
                width: "100%", borderRadius: 2,
                height: Math.max(2, (count / maxCount) * 28),
                background: i + 1 === CURRENT_MONTH
                  ? "var(--green)"
                  : count > 0 ? `${RAINBOW[i % RAINBOW.length]}88` : "rgba(40,32,20,0.06)",
                transition: "height 0.3s",
              }} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 3 }}>
          {MONTH_NAMES.map((m, i) => (
            <span key={m} className="font-mono" style={{ flex: 1, textAlign: "center", fontSize: 8, color: i + 1 === CURRENT_MONTH ? "var(--green)" : "#8A7E6E", fontWeight: i + 1 === CURRENT_MONTH ? 600 : 400 }}>{m}</span>
          ))}
        </div>
        {gaps.length > 0 && gaps.length <= 4 && (
          <p className="font-mono" style={{ fontSize: 9, color: "#A05830", marginTop: 6 }}>
            Gap{gaps.length > 1 ? "s" : ""} in coverage: {gaps.join(", ")}
          </p>
        )}
      </div>
      <button onClick={onSwitchToCalendar} className="font-mono" style={{ fontSize: 10, color: "var(--green)", background: "none", border: "1px solid var(--green)", padding: "6px 12px", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s" }}>
        Full calendar &#8594;
      </button>
    </div>
  );
}

// ═══ MAIN ═══

export default function BrowsePage() {
  const [zone, setZone] = useState<number | null>(null);
  const [zipInput, setZipInput] = useState("");
  const [zipResult, setZipResult] = useState<{ zone: number; half: string; region: string } | null>(null);
  const [types, setTypes] = useState<PlantType[]>([]);
  const [seasons, setSeasons] = useState<string[]>([]);
  const [colors, setColors] = useState<BloomColor[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [suns, setSuns] = useState<SunLevel[]>([]);
  const [water, setWater] = useState<WaterLevel | null>(null);
  const [soils, setSoils] = useState<SoilType[]>([]);
  const [bonuses, setBonuses] = useState<BonusTrait[]>([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "calendar">("grid");
  const [sortBy, setSortBy] = useState<SortOption>("a-z");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const filterPanelRef = useRef<HTMLDivElement>(null);
  const filterSentinelRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  function tog<T>(set: React.Dispatch<React.SetStateAction<T[]>>, id: T) {
    set((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  }

  const handleZipChange = (val: string) => {
    const clean = val.replace(/\D/g, "").substring(0, 5);
    setZipInput(clean);
    if (clean.length >= 3) {
      const result = lookupZone(clean);
      if (result) { setZipResult(result); setZone(result.zone); } else { setZipResult(null); }
    } else { setZipResult(null); }
  };

  const filtered = useMemo(() => {
    return PLANTS.filter((p) => {
      if (zone && !p.zones.includes(zone)) return false;
      if (types.length && !types.includes(p.type)) return false;
      if (seasons.length && !seasons.some((s) => p.bloomMonths.map(getSeasonForMonth).includes(s))) return false;
      if (colors.length && !colors.some((c) => p.colors.includes(c))) return false;
      if (sizes.length && !sizes.includes(getSizeTier(p))) return false;
      if (suns.length && !suns.some((s) => p.sun.includes(s))) return false;
      if (water && p.water !== water) return false;
      if (soils.length && !soils.some((s) => p.soil.includes(s))) return false;
      if (bonuses.length && !bonuses.every((b) => p.bonus.includes(b))) return false;
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        if (!p.name.toLowerCase().includes(q) && !p.botanical.toLowerCase().includes(q) && !p.desc.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [zone, types, seasons, colors, sizes, suns, water, soils, bonuses, search]);

  // Sorting
  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sortBy) {
      case "a-z": return arr.sort((a, b) => a.name.localeCompare(b.name));
      case "z-a": return arr.sort((a, b) => b.name.localeCompare(a.name));
      case "bloom": return arr.sort((a, b) => Math.min(...a.bloomMonths) - Math.min(...b.bloomMonths));
      case "zone-range": return arr.sort((a, b) => b.zones.length - a.zones.length);
      default: return arr;
    }
  }, [filtered, sortBy]);

  // Reset visible count when filters change
  useEffect(() => { setVisibleCount(PAGE_SIZE); }, [zone, types, seasons, colors, sizes, suns, water, soils, bonuses, search, sortBy]);

  const activeCount = (zone ? 1 : 0) + types.length + seasons.length + colors.length + sizes.length + suns.length + (water ? 1 : 0) + soils.length + bonuses.length + (search.trim() ? 1 : 0);

  const clearAll = () => { setZone(null); setZipInput(""); setZipResult(null); setTypes([]); setSeasons([]); setColors([]); setSizes([]); setSuns([]); setWater(null); setSoils([]); setBonuses([]); setSearch(""); };

  // Seasonal urgency - plants blooming now in selected zone
  const bloomingNow = useMemo(() => {
    return PLANTS.filter((p) => {
      if (zone && !p.zones.includes(zone)) return false;
      return p.bloomMonths.includes(CURRENT_MONTH);
    }).slice(0, 6);
  }, [zone]);

  // Back to top visibility
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-collapse filters only when user scrolls past on desktop (not on mobile where it causes issues)
  useEffect(() => {
    const sentinel = filterSentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && window.innerWidth > 768) setFiltersOpen(false);
      },
      { threshold: 0, rootMargin: "-60px 0px 0px 0px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const px = "clamp(18px, 4vw, 48px)";

  const Pill = ({ active, onClick, label, activeColor, activeBg }: { active: boolean; onClick: () => void; label: string; activeColor?: string; activeBg?: string }) => (
    <button onClick={onClick} className="font-serif" style={{ fontSize: 15, padding: "7px 14px", border: active ? `1.5px solid ${activeColor || "var(--green)"}` : "1px solid rgba(40,32,20,0.12)", background: active ? (activeBg || "var(--green)") : "transparent", color: active ? (activeColor || "#EDE8DE") : "#3E3628", transition: "all 0.2s", fontWeight: active ? 600 : 400, cursor: "pointer" }}>{label}</button>
  );

  const MonoPill = ({ active, onClick, label, activeColor }: { active: boolean; onClick: () => void; label: string; activeColor?: string }) => (
    <button onClick={onClick} className="font-mono" style={{ fontSize: 12, padding: "7px 14px", border: active ? `1.5px solid ${activeColor || "var(--green)"}` : "1px solid rgba(40,32,20,0.12)", background: active ? `${activeColor || "var(--green)"}12` : "transparent", color: active ? (activeColor || "var(--green)") : "#3E3628", transition: "all 0.2s", cursor: "pointer", textAlign: "left" }}>{label}</button>
  );

  // Active filter summary tags for collapsed bar
  const filterTags = useMemo(() => {
    const tags: string[] = [];
    if (zone) tags.push(`Zone ${zone}`);
    types.forEach((t) => tags.push(PLANT_TYPE_LABELS[t]));
    seasons.forEach((s) => { const season = SEASONS.find((x) => x.id === s); if (season) tags.push(season.label); });
    colors.forEach((c) => tags.push(c.charAt(0).toUpperCase() + c.slice(1)));
    if (search.trim()) tags.push(`"${search.trim()}"`);
    return tags;
  }, [zone, types, seasons, colors, search]);

  const visiblePlants = view === "grid" ? sorted.slice(0, visibleCount) : sorted;
  const hasMore = view === "grid" && visibleCount < sorted.length;

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ═══ HERO - big logo + tagline + search ═══ */}
      <header className="animate-fade-in" style={{ maxWidth: 1400, margin: "0 auto", padding: `14px ${px} 0`, textAlign: "center" }}>
        {/* Big centered logo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 12 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: `conic-gradient(${RAINBOW.map((c, i) => `${c} ${i * 45}deg ${(i + 1) * 45}deg`).join(", ")})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                background: "#F2EDE5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 22 }}>✿</span>
            </div>
          </div>
          <h1 className="font-serif" style={{ fontSize: "clamp(32px, 5vw, 44px)", fontWeight: 700, color: "#1A1610", lineHeight: 1.2, margin: 0 }}>
            What&apos;s Bloomin&apos;
          </h1>
        </div>
        <p className="font-serif" style={{ fontSize: "clamp(20px, 3vw, 24px)", fontWeight: 400, color: "#3E3628", lineHeight: 1.4, margin: "0 0 4px" }}>
          Find the perfect blooms for your garden
        </p>
        <p className="font-mono" style={{ fontSize: 11, color: "#7A6E5E", marginBottom: 16 }}>
          {PLANTS.length}+ plants. Filter by zone, season, color, and more.
        </p>

        {/* Search bar */}
        <div style={{ position: "relative", maxWidth: 520, margin: "0 auto 20px" }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#8A7E6E", pointerEvents: "none" }}>&#x1F50D;</span>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or botanical name..." className="font-serif" style={{ width: "100%", padding: "12px 16px 12px 42px", fontSize: 17, border: "1px solid rgba(40,32,20,0.12)", background: "#FDFBF7", color: "#1A1610", outline: "none", transition: "border 0.2s" }} onFocus={(e) => (e.target.style.borderColor = "var(--green)")} onBlur={(e) => (e.target.style.borderColor = "rgba(40,32,20,0.12)")} />
          {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#8A7E6E" }}>&#x2715;</button>}
        </div>
      </header>

      {/* ═══ SEASONAL URGENCY ═══ */}
      {bloomingNow.length > 0 && (
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: `0 ${px} 12px` }}>
          <div style={{ background: "rgba(44,68,52,0.04)", border: "1px solid rgba(44,68,52,0.10)", padding: "12px 20px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span className="font-mono" style={{ fontSize: 10, color: "var(--green)", fontWeight: 600, letterSpacing: 1.5, flexShrink: 0 }}>BLOOMING NOW{zone ? ` IN ZONE ${zone}` : ""}</span>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {bloomingNow.map((p) => (
                <Link key={p.slug} href={`/plants/${p.slug}`} className="font-serif" style={{ fontSize: 14, color: "var(--green)", textDecoration: "none", padding: "2px 8px", background: "rgba(44,68,52,0.06)", transition: "background 0.2s" }}>
                  {p.name}
                </Link>
              ))}
              {bloomingNow.length >= 6 && <button onClick={() => { const season = getSeasonForMonth(CURRENT_MONTH); if (season) setSeasons([season]); setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100); }} className="font-mono" style={{ fontSize: 11, color: "var(--green)", textDecoration: "underline", textUnderlineOffset: 2, background: "none", border: "none", cursor: "pointer" }}>See all →</button>}
            </div>
          </div>
        </div>
      )}

      {/* ═══ COLLAPSED FILTER BAR (sticky) ═══ */}
      {!filtersOpen && (
        <div style={{ position: "sticky", top: 56, zIndex: 40, background: "#F2EDE5", borderBottom: "1px solid rgba(40,32,20,0.08)", padding: "10px 0" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", padding: `0 ${px}`, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <button onClick={() => setFiltersOpen(true)} className="font-mono" style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--green)", background: "none", border: "1px solid var(--green)", padding: "6px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              ▸ Filters {activeCount > 0 && <span style={{ background: "var(--green)", color: "#EDE8DE", padding: "1px 6px", fontSize: 10 }}>{activeCount}</span>}
            </button>
            {filterTags.slice(0, 4).map((tag, i) => (
              <span key={i} className="font-mono" style={{ fontSize: 10, color: "#5A4E3E", padding: "4px 10px", background: "rgba(44,68,52,0.06)", border: "1px solid rgba(44,68,52,0.10)" }}>{tag}</span>
            ))}
            {filterTags.length > 4 && <span className="font-mono" style={{ fontSize: 10, color: "#8A7E6E" }}>+{filterTags.length - 4} more</span>}
            {activeCount > 0 && <button onClick={clearAll} className="font-mono" style={{ fontSize: 10, color: "#7A6E5E", background: "none", border: "none", textDecoration: "underline", textUnderlineOffset: 3, cursor: "pointer" }}>Clear all</button>}
          </div>
        </div>
      )}

      {/* ═══ FILTERS - progressive disclosure ═══ */}
      <div className="animate-fade-in" style={{ maxWidth: 1400, margin: "0 auto", padding: `0 ${px} 16px`, animationDelay: "0.15s" }} ref={filterPanelRef}>
        <div style={{
          background: "#FDFBF7", border: "1px solid rgba(40,32,20,0.07)", position: "relative", overflow: "hidden",
          maxHeight: filtersOpen ? 2000 : 0, opacity: filtersOpen ? 1 : 0,
          transition: "max-height 0.35s ease, opacity 0.25s ease",
        }}>
          <div style={{ padding: "20px 24px 8px" }}>
            <div className="rainbow-strip" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, opacity: 0.3 }} />

            {/* Collapse button */}
            <button onClick={() => setFiltersOpen(false)} className="font-mono" style={{ position: "absolute", top: 8, right: 12, fontSize: 10, color: "#8A7E6E", background: "none", border: "none", cursor: "pointer", padding: "4px 8px" }}>Collapse ▴</button>

            {/* Primary filters - 2 column, always open */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: "0 32px" }}>
              <div>
                <FilterBlock label="Your Zone">
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <input type="text" value={zipInput} onChange={(e) => handleZipChange(e.target.value)} placeholder="Enter zip code" className="font-mono" style={{ width: 140, padding: "7px 12px", fontSize: 13, border: "1px solid rgba(40,32,20,0.15)", background: "#fff", color: "#1A1610", outline: "none" }} />
                      {zipResult && <span className="font-mono" style={{ fontSize: 12, color: "var(--green)", fontWeight: 500 }}>{zipResult.region} - Zone {zipResult.zone}{zipResult.half}</span>}
                    </div>
                    <details><summary className="font-mono" style={{ fontSize: 10, color: "#8A7E6E", cursor: "pointer", listStyle: "none" }}><span style={{ textDecoration: "underline", textUnderlineOffset: 2 }}>What are zones?</span></summary>
                      <p className="font-serif" style={{ fontSize: 14, color: "#6A5E4E", lineHeight: 1.55, marginTop: 6, padding: "10px 14px", background: "rgba(40,32,20,0.03)", border: "1px solid rgba(40,32,20,0.06)" }}>USDA hardiness zones tell you what survives winter where you live. Zone 3 is coldest (northern Minnesota), Zone 11 is warmest (Hawaii, south Florida coast). Most of the US is zones 5-8. Enter your zip code above or pick your zone manually.</p>
                    </details>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {ZONES.map((z) => (<Pill key={z} active={zone === z} onClick={() => { setZone(zone === z ? null : z); if (zone === z) { setZipInput(""); setZipResult(null); } }} label={`${z}`} />))}
                  </div>
                </FilterBlock>

                <FilterBlock label="Plant Type">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {(Object.entries(PLANT_TYPE_LABELS) as [PlantType, string][]).map(([id, label]) => (
                      <Pill key={id} active={types.includes(id)} onClick={() => tog(setTypes, id)} label={label} activeColor="var(--green)" activeBg="rgba(44,68,52,0.08)" />
                    ))}
                  </div>
                </FilterBlock>
              </div>
              <div>
                <FilterBlock label="Bloom Season">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {SEASONS.map((s) => (<Pill key={s.id} active={seasons.includes(s.id)} onClick={() => tog(setSeasons, s.id)} label={s.label} activeColor={s.color} activeBg={`${s.color}18`} />))}
                  </div>
                </FilterBlock>

                <FilterBlock label="Bloom Color">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                    {BLOOM_COLORS.map((c) => (
                      <button key={c.id} onClick={() => tog(setColors, c.id)} title={c.label} style={{ width: 34, height: 34, borderRadius: "50%", background: c.hex, padding: 0, border: colors.includes(c.id) ? "3px solid #1A1610" : c.id === "white" ? "1.5px solid #C8C0B4" : "1.5px solid transparent", transition: "all 0.2s", transform: colors.includes(c.id) ? "scale(1.12)" : "scale(1)", outline: colors.includes(c.id) ? "2px solid rgba(26,22,16,0.12)" : "none", outlineOffset: 3, cursor: "pointer" }} />
                    ))}
                  </div>
                </FilterBlock>
              </div>
            </div>

            {/* Secondary filters - collapsed by default, single row of labels */}
            <div style={{ borderTop: "1px solid rgba(40,32,20,0.06)", marginTop: 4, paddingTop: 8 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: "0 32px" }}>
                <div>
                  <FilterBlock label="Sunlight" defaultOpen={false}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {(Object.entries(SUN_LABELS) as [SunLevel, { label: string; sub: string; icon: string }][]).map(([id, s]) => (
                        <MonoPill key={id} active={suns.includes(id)} onClick={() => tog(setSuns, id)} label={`${s.icon} ${s.label} (${s.sub})`} />
                      ))}
                    </div>
                  </FilterBlock>
                  <FilterBlock label="Water Needs" defaultOpen={false}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {(Object.entries(WATER_LABELS) as [WaterLevel, { label: string; sub: string }][]).map(([id, w]) => (
                        <MonoPill key={id} active={water === id} onClick={() => setWater(water === id ? null : id)} label={`${w.label} (${w.sub})`} activeColor="#5A7A90" />
                      ))}
                    </div>
                  </FilterBlock>
                </div>
                <div>
                  <FilterBlock label="Height" defaultOpen={false}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {SIZE_TIERS.map((s) => (<MonoPill key={s.id} active={sizes.includes(s.id)} onClick={() => tog(setSizes, s.id)} label={s.label} />))}
                    </div>
                  </FilterBlock>
                  <FilterBlock label="Soil Tolerance" defaultOpen={false}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {SOIL_OPTIONS.map((s) => (<MonoPill key={s.id} active={soils.includes(s.id)} onClick={() => tog(setSoils, s.id)} label={`Tolerates ${s.label}`} activeColor="#8E6E28" />))}
                    </div>
                  </FilterBlock>
                  <FilterBlock label="Special Traits" defaultOpen={false}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {(Object.entries(BONUS_LABELS) as [BonusTrait, { label: string; icon: string }][]).map(([id, b]) => (
                        <MonoPill key={id} active={bonuses.includes(id)} onClick={() => tog(setBonuses, id)} label={`${b.icon} ${b.label}`} />
                      ))}
                    </div>
                  </FilterBlock>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sentinel for IntersectionObserver */}
        <div ref={filterSentinelRef} style={{ height: 1 }} />

        {/* Results bar with sort + view toggle */}
        <div ref={resultsRef} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, padding: "0 2px", flexWrap: "wrap", gap: 10, scrollMarginTop: 70 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span className="font-serif" style={{ fontSize: 26, fontWeight: 600 }}>{sorted.length}</span>
              <span className="font-serif" style={{ fontSize: 17, color: "#5A4E3E" }}>plant{sorted.length !== 1 ? "s" : ""}</span>
              {activeCount > 0 && <button onClick={clearAll} className="font-mono" style={{ fontSize: 11, color: "#7A6E5E", background: "none", border: "none", textDecoration: "underline", textUnderlineOffset: 3, cursor: "pointer" }}>Clear all ({activeCount})</button>}
            </div>
            {/* Sort pills */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span className="font-mono" style={{ fontSize: 9, color: "#8A7E6E", letterSpacing: 1.5 }}>SORT</span>
              {SORT_OPTIONS.map((opt) => (
                <button key={opt.id} onClick={() => setSortBy(opt.id)} className="font-mono" style={{
                  fontSize: 10, padding: "4px 10px", cursor: "pointer", transition: "all 0.2s",
                  border: sortBy === opt.id ? "1px solid var(--green)" : "1px solid rgba(40,32,20,0.10)",
                  background: sortBy === opt.id ? "rgba(44,68,52,0.08)" : "transparent",
                  color: sortBy === opt.id ? "var(--green)" : "#5A4E3E",
                  fontWeight: sortBy === opt.id ? 500 : 400,
                }}>{opt.label}</button>
              ))}
            </div>
          </div>
          {/* View toggle */}
          <div style={{ display: "flex", gap: 0, border: "1px solid rgba(40,32,20,0.12)" }}>
            <button onClick={() => setView("grid")} className="font-mono" style={{ fontSize: 11, padding: "10px 20px", border: "none", background: view === "grid" ? "var(--green)" : "#FDFBF7", color: view === "grid" ? "#EDE8DE" : "#5A4E3E", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s" }}>
              <span style={{ fontSize: 14 }}>▦</span> Browse plants
            </button>
            <button onClick={() => setView("calendar")} className="font-mono" style={{ fontSize: 11, padding: "10px 20px", border: "none", borderLeft: "1px solid rgba(40,32,20,0.12)", background: view === "calendar" ? "var(--green)" : "#FDFBF7", color: view === "calendar" ? "#EDE8DE" : "#5A4E3E", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s" }}>
              <span style={{ fontSize: 14 }}>☰</span> Bloom calendar
            </button>
          </div>
        </div>

        {/* Showing X of Y */}
        {view === "grid" && sorted.length > PAGE_SIZE && (
          <p className="font-mono" style={{ fontSize: 10, color: "#8A7E6E", marginTop: 6, padding: "0 2px" }}>
            Showing {Math.min(visibleCount, sorted.length)} of {sorted.length}
          </p>
        )}
      </div>

      {/* ═══ CONTENT ═══ */}
      <main style={{ maxWidth: 1400, margin: "0 auto", padding: `0 ${px} 80px` }}>
        {/* Bloom preview strip above grid */}
        {view === "grid" && sorted.length > 0 && (
          <BloomPreviewStrip plants={sorted} onSwitchToCalendar={() => setView("calendar")} />
        )}

        {view === "grid" ? (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 310px), 1fr))", gap: 22 }}>
              {visiblePlants.map((p, i) => <PlantCard key={p.name} plant={p} index={i} />)}
            </div>
            {/* Load more */}
            {hasMore && (
              <div style={{ textAlign: "center", marginTop: 32 }}>
                <button
                  onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                  className="font-mono"
                  style={{
                    fontSize: 12, padding: "12px 32px", border: "1px solid var(--green)",
                    color: "var(--green)", background: "transparent", cursor: "pointer",
                    transition: "all 0.2s", letterSpacing: 0.5,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(44,68,52,0.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  Load more plants ({sorted.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        ) : (
          <div style={{ background: "#FDFBF7", overflowX: "auto", border: "1px solid rgba(40,32,20,0.06)" }} className="animate-fade-in">
            <div style={{ display: "grid", gridTemplateColumns: "180px repeat(12, 1fr)", minWidth: 660 }}>
              <div className="font-mono" style={{ padding: "14px 16px", fontSize: 10, color: "#706458", letterSpacing: 2, fontWeight: 500, borderBottom: "1px solid rgba(40,32,20,0.08)", background: "#FDFBF7", position: "sticky", top: 0, zIndex: 2 }}>PLANT</div>
              {MONTH_NAMES.map((m, mi) => (
                <div key={m} className="font-serif" style={{ padding: "14px 2px", textAlign: "center", fontSize: 14, color: mi + 1 === CURRENT_MONTH ? "var(--green)" : "#4A3E30", fontWeight: mi + 1 === CURRENT_MONTH ? 700 : 500, borderLeft: "1px solid rgba(40,32,20,0.04)", borderBottom: "1px solid rgba(40,32,20,0.08)", background: mi + 1 === CURRENT_MONTH ? "rgba(44,68,52,0.04)" : "#FDFBF7", position: "sticky", top: 0, zIndex: 2 }}>{m}</div>
              ))}
              {sorted.map((p) => {
                const pc = BLOOM_COLOR_HEX[p.colors[0]] || "#ccc";
                return (
                  <div key={p.name} style={{ display: "contents" }}>
                    <div style={{ padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(40,32,20,0.04)" }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: pc, flexShrink: 0 }} />
                      <div>
                        <Link href={`/plants/${p.slug}`} className="font-serif hover:underline" style={{ fontSize: 14, fontWeight: 600, color: "#1A1610", lineHeight: 1.2, textDecorationColor: "rgba(40,32,20,0.2)" }}>{p.name}</Link>
                        <div className="font-mono" style={{ fontSize: 9, color: "#8A7E6E" }}>{formatHeight(p)}</div>
                      </div>
                    </div>
                    {Array.from({ length: 12 }, (_, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 2px", borderLeft: "1px solid rgba(40,32,20,0.04)", borderBottom: "1px solid rgba(40,32,20,0.04)", background: i + 1 === CURRENT_MONTH ? "rgba(44,68,52,0.02)" : "transparent" }}>
                        <div style={{ width: "100%", height: 14, background: p.bloomMonths.includes(i + 1) ? pc : "transparent", opacity: p.bloomMonths.includes(i + 1) ? 0.5 : 0 }} />
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {sorted.length === 0 && (
          <div className="animate-fade-in" style={{ textAlign: "center", padding: "60px 20px" }}>
            <p className="font-serif" style={{ fontSize: 22, fontWeight: 300, marginBottom: 6 }}>No matches found</p>
            <p className="font-serif" style={{ fontSize: 16, color: "#5A4E3E" }}>{search ? `No plants match "${search}" with your current filters.` : "Try loosening your filters."}</p>
          </div>
        )}
      </main>

      <Footer />

      {/* ═══ BACK TO TOP ═══ */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="font-mono back-to-top"
        style={{
          opacity: showBackToTop ? 1 : 0,
          transform: showBackToTop ? "translateY(0)" : "translateY(12px)",
          pointerEvents: showBackToTop ? "auto" : "none",
        }}
        aria-label="Back to top"
      >
        ↑
      </button>
    </div>
  );
}
