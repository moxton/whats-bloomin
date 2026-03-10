# What's Bloomin' - Project Context

## What this is
A curated plant reference and bloom planning tool for US gardeners. Live at whatsbloomin.com. The core value proposition: find plants that bloom in your zone, in your season, with your conditions. Not an encyclopedia. An opinionated, visual discovery tool.

## Tech stack
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS (minimal usage, mostly inline styles)
- Vercel (auto-deploys on push to main)
- No database. All data lives in TypeScript files.
- No auth. No user accounts. Static site.

## File structure

```
lib/plants.ts          - ALL plant data (213 entries), Plant interface, type definitions, helper functions p() and v()
lib/blog-posts.ts      - Blog post data (BlogPost interface, content as HTML strings)
lib/zip-zones.ts       - Static zip3-to-zone mapping (do not edit, it's huge)
app/browse.tsx         - Main browse page (client component, filters, grid, calendar view)
app/plants/[slug]/     - Plant detail pages (SSG)
app/blog/page.tsx      - Blog index
app/blog/[slug]/       - Blog post pages (SSG, crosslinks to plant pages)
app/contact/           - Contact page (hello@whatsbloomin.com)
app/privacy/           - Privacy policy
app/terms/             - Terms of service
app/layout.tsx         - Root layout, Google Analytics, font loading
app/globals.css        - CSS variables, animations, blog content styles
app/sitemap.ts         - Auto-generated sitemap (plants + blog + static pages)
app/robots.ts          - Robots.txt
app/icon.svg           - Favicon (rainbow ring with flower)
```

## Plant data model

```typescript
interface Plant {
  name: string;           // "Endless Summer Hydrangea"
  botanical: string;      // "Hydrangea macrophylla 'Endless Summer'"
  slug: string;           // auto-generated via slugify()
  type: PlantType;        // "perennial" | "annual" | "bulb" | "shrub" | "vine" | "groundcover" | "grass" | "tree"
  bloomMonths: number[];  // [6,7,8,9] = June-Sept
  zones: number[];        // [4,5,6,7,8,9] = USDA zones
  colors: BloomColor[];   // "pink" | "purple" | "blue" | "white" | "yellow" | "orange" | "red" | "lavender" | "green"
  sun: SunLevel[];        // "full-sun" | "part-sun" | "part-shade" | "full-shade"
  water: WaterLevel;      // "low" | "moderate" | "high"
  soil: SoilType[];       // "clay" | "sandy" | "poor" | "loam"
  heightMin: number;      // inches
  heightMax: number;      // inches
  bonus: BonusTrait[];    // see below
  desc: string;           // One sentence. Opinionated, vivid, not clinical.
  pairsWith: string[];    // companion plant names (must match exact name of another plant in database)
  parentSpecies?: string; // for varieties: "Hydrangea"
  varietyName?: string;   // for varieties: "Endless Summer"
  isVariety?: boolean;    // true for varieties
}
```

**BonusTrait values:** "deer-resistant" | "pollinator" | "native" | "fragrant" | "cut-flower" | "container" | "winter-interest" | "low-maintenance" | "reblooming" | "ground-cover" | "edible" | "evergreen" | "hummingbird" | "slug-resistant"

**Two helper functions:**
- `p(...)` creates a standard Plant entry
- `v(...)` creates a variety entry (adds parentSpecies, varietyName, isVariety)

## Adding new plants

Add entries to the PLANTS array in `lib/plants.ts`. Use `p()` for species, `v()` for named varieties. Heights are in inches. Bloom months are 1-12. Descriptions should be one sentence, personality-driven, not Wikipedia-style. Companion plant names must match the `name` field of an existing plant exactly.

Example species:
```typescript
p("Brunnera","Brunnera macrophylla","perennial",[4,5],[3,4,5,6,7,8],["blue"],["part-shade","full-shade"],"moderate",["loam","clay"],12,18,["deer-resistant","low-maintenance"],"Clouds of tiny forget-me-not blue flowers over heart-shaped leaves. Thrives in dry shade once established.",["Hosta","Astilbe","Fern"]),
```

Example variety:
```typescript
v("Endless Summer Hydrangea","Hydrangea macrophylla 'Endless Summer'","shrub",[6,7,8,9],[4,5,6,7,8,9],["blue","pink","purple"],["part-sun","part-shade"],"moderate",["clay","loam"],36,60,["pollinator","cut-flower","reblooming"],"Reblooms on old and new wood, so you get flowers even after a harsh winter. Color shifts with soil pH.",["Hosta","Astilbe","Japanese Anemone"],"Hydrangea","Endless Summer"),
```

After adding plants, verify:
1. `npx tsc --noEmit` passes
2. `npx next build` succeeds (generates new plant detail pages)
3. No duplicate slugs (names that slugify to the same string)

## Adding blog posts

Add entries to the BLOG_POSTS array in `lib/blog-posts.ts`. Content is HTML strings. Use `<h2>` for section headers, `<p>` for paragraphs, `<strong>` and `<em>` for emphasis. The `plantLinks` array should contain slugs of plants in the database. These render as clickable "Plants Mentioned" cards at the bottom of each post.

Blog posts auto-generate: detail pages at /blog/[slug], entries in sitemap.xml, and listings on the /blog index.

## Design system

**Fonts:**
- Cormorant Garamond (serif) - headings, body text, plant names. Class: `font-serif`
- IBM Plex Mono (mono) - labels, metadata, filters, small caps. Class: `font-mono`

**Colors:**
- Background: #F2EDE5 (cream)
- Cards: #FDFBF7 (warm white)
- Primary accent: #2C4434 (deep green, CSS var: `var(--green)`)
- Text: #1A1610 (near-black), #3E3628 (dark), #5A4E3E (medium), #8A7E6E (muted), #A09484 (light)
- Rainbow gradient: 8-color botanical palette used in strips at top/bottom of pages

**Bloom color palette (9 colors):**
pink #D4899B, purple #8B6BAE, blue #5B87A8, white #F0ECE4, yellow #C4A430, orange #C47A3A, red #B04A4A, lavender #A08AB8, green #5A8A5A

**Layout patterns:**
- Max width: 1400px for browse, 900px for detail pages, 720px for text pages (blog, contact, privacy, terms)
- Padding: `clamp(18px, 4vw, 44px)` for responsive horizontal padding
- Cards use `background: #FDFBF7, border: 1px solid rgba(40,32,20,0.06)`
- Section labels use `font-mono, fontSize: 9, letterSpacing: 2, textTransform: uppercase, color: #8A7E6E`
- Rainbow strips at top and bottom of every page: `className="rainbow-strip"` with height 3 and opacity 0.5-0.7

## Writing rules

- No em dashes anywhere. Use periods, commas, or hyphens.
- Plant descriptions: one sentence, vivid, opinionated. Not "This plant produces flowers." More like "Massive mophead blooms that shift color with soil pH. Showstoppers."
- Blog posts: warm, direct, knowledgeable friend tone. No "In the wonderful world of gardening..." openings. Start with concrete observations or problems.
- Use "What's Bloomin'" with apostrophes everywhere (not "What's Bloomin" or "Whats Bloomin").
- In HTML/JSX use `What&apos;s Bloomin&apos;`

## Deployment

GitHub: github.com/moxton/whats-bloomin
Live: whatsbloomin.com
Hosting: Vercel (auto-deploys on push to main)
DNS: Namecheap
GA: G-VT74XQBLJ6

After making changes:
```bash
npx tsc --noEmit          # type check
npx next build            # full build (generates all static pages)
git add .
git commit -m "v1.X - description"
git push origin main
```

## Current version: v1.7

213 plants (172 species + 41 varieties), 5 blog posts, contact page, zone 3-11 coverage.

## Roadmap (in priority order)

1. Expand to 500+ plants (more varieties, natives by region, flowering fruit trees, fragrant plants, ornamental grasses)
2. Gemini-generated watercolor images for all plants (script exists, needs API billing)
3. Blog content expansion (target 2 posts/week, seasonal + evergreen guides)
4. "Build My Garden" planner (select plants, live bloom calendar fills in, gap detection)
5. AI plant advisor (/ask page, natural language plant recommendations)
6. Monetization (affiliate links, premium features, ads at 50K+ sessions)

## Things NOT to do

- Don't add vegetables. The site is bloom-focused.
- Don't add shade/timber trees that nobody plants for flowers.
- Don't add localStorage or sessionStorage (not supported in the Vercel deployment context).
- Don't add a CMS or database. The TypeScript data files are the source of truth.
- Don't add npm dependencies without good reason. The site is intentionally lightweight.
- Don't change fonts, color palette, or overall layout philosophy without explicit instruction.
