"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RAINBOW } from "@/lib/plants";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isHome = pathname === "/";

  const links = [
    { href: "/", label: "Browse" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#F2EDE5",
        borderBottom: scrolled ? "1px solid rgba(40,32,20,0.08)" : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 4px rgba(40,32,20,0.04)" : "none",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 clamp(18px, 4vw, 48px)",
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: isHome ? "center" : "space-between",
        }}
      >
        {/* Logo - hidden on homepage where it's shown large and centered in the hero */}
        {!isHome && (
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: `conic-gradient(${RAINBOW.map((c, i) => `${c} ${i * 45}deg ${(i + 1) * 45}deg`).join(", ")})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "#F2EDE5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: 10 }}>✿</span>
              </div>
            </div>
            <span className="font-serif nav-logo-text" style={{ fontSize: 18, fontWeight: 700, color: "#1A1610" }}>
              What&apos;s Bloomin&apos;
            </span>
          </Link>
        )}

        {/* Desktop nav links */}
        <div className="nav-links-desktop" style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono"
              style={{
                fontSize: 11,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                textDecoration: "none",
                color: isActive(link.href) ? "var(--green)" : "#5A4E3E",
                fontWeight: isActive(link.href) ? 500 : 400,
                transition: "color 0.2s",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none", background: "none", border: "none", cursor: "pointer",
            padding: 6, color: "#5A4E3E", fontSize: 20, lineHeight: 1,
          }}
          aria-label="Menu"
        >
          {menuOpen ? "\u2715" : "\u2630"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="nav-mobile-menu" style={{
          padding: "8px clamp(18px, 4vw, 48px) 16px",
          borderTop: "1px solid rgba(40,32,20,0.06)",
          display: "flex", flexDirection: "column", gap: 12,
        }}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono"
              style={{
                fontSize: 12,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                textDecoration: "none",
                color: isActive(link.href) ? "var(--green)" : "#5A4E3E",
                fontWeight: isActive(link.href) ? 500 : 400,
                padding: "4px 0",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
