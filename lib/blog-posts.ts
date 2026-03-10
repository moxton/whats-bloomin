export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  plantLinks: string[]; // slugs of plants to link to
  content: string; // HTML content
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "usda-hardiness-zones-explained",
    title: "How USDA Hardiness Zones Actually Work",
    description: "Zones aren't about summer heat, snowfall, or rainfall. They measure one thing: how cold does it get in winter? Here's what that means for your garden.",
    date: "2026-03-09",
    readTime: "5 min",
    category: "Fundamentals",
    plantLinks: ["crocus", "snowdrop", "lavender", "camellia", "bougainvillea", "hellebore"],
    content: `
<p>Every plant tag at the nursery has a zone number. Every gardening website lists zone ranges. But most gardeners have a fuzzy understanding of what zones actually measure, and that leads to expensive mistakes.</p>

<p>Here's the short version: USDA hardiness zones measure the average annual <em>minimum</em> winter temperature in your area. That's it. Not summer heat. Not rainfall. Not humidity. Just: how cold does it get?</p>

<h2>The scale</h2>

<p>The USDA divides the country into 13 zones, each representing a 10-degree Fahrenheit range. Zone 1 is the coldest (parts of Alaska, dipping below -60°F). Zone 13 is the warmest (parts of Puerto Rico and Hawaii, never below 60°F). Most of the continental US falls between zones 3 and 10.</p>

<p>Each zone is further divided into "a" and "b" halves, each covering 5°F. So zone 6a averages -10°F to -5°F in winter, while 6b averages -5°F to 0°F. This matters more than you might think. That 5-degree difference is the line between a lavender plant that thrives and one that dies its first winter.</p>

<h2>What zones tell you</h2>

<p>Zones answer a single question: will this plant survive winter here? A plant rated for zones 5-9 can handle winter cold down to about -20°F (zone 5) but doesn't need to be any colder than about 20°F (zone 9) to complete its dormancy cycle.</p>

<p>This is useful information. If you're in zone 4 and a plant is rated zone 5-9, it will probably die over winter. No amount of mulching, prayer, or wishful thinking changes that. The plant's cellular structure literally can't handle that level of cold.</p>

<h2>What zones don't tell you</h2>

<p>Zones say nothing about heat, humidity, rainfall, soil type, day length, or microclimates. A zone 7 garden in Portland, Oregon is radically different from a zone 7 garden in Richmond, Virginia, even though both survive the same winter lows. Portland is mild and wet. Richmond gets summer heat and humidity that would stress many Pacific Northwest plants.</p>

<p>This is why zone-rated plants sometimes fail even when the zone is right. The crape myrtle that flourishes in a zone 7 Southern garden may barely bloom in a zone 7 maritime Pacific Northwest garden. Same zone number, completely different growing conditions.</p>

<h2>Finding your zone</h2>

<p>The easiest way is to enter your zip code right on our homepage. We'll map it to your USDA zone instantly. You can also check the official USDA Plant Hardiness Zone Map, which was last updated in 2023.</p>

<p>Worth noting: zones have shifted over time. The 2023 map moved about half the country into warmer zones compared to the previous 2012 version. If you've been gardening in the same spot for 20 years, your zone may have changed. Plants that were risky bets a generation ago might now be safe choices.</p>

<h2>How to use zones wisely</h2>

<p>Think of zones as a first filter, not a final answer. When you're browsing plants, start by filtering to your zone. That eliminates everything that will definitely die. Then consider the other factors: does the plant need more sun or shade than you have? More water than your climate provides? More heat than your summers deliver?</p>

<p>Winter-blooming plants like camellias and hellebores push the zone boundaries in interesting ways. They need cold enough winters to set buds but not so cold that the buds freeze. Meanwhile, tropical plants like bougainvillea are zone-limited by definition. Below zone 9, they're annuals or container plants. No exceptions.</p>

<p>Zones are the beginning of plant selection, not the end. But they're an essential beginning.</p>
`,
  },
  {
    slug: "plan-garden-blooms-all-year",
    title: "How to Plan a Garden That Blooms Every Month",
    description: "Most gardens peak in June and look bare by October. With the right plant mix, you can have color in every month of the year. Here's the framework.",
    date: "2026-03-10",
    readTime: "6 min",
    category: "Planning",
    plantLinks: ["snowdrop", "crocus", "hellebore", "witch-hazel", "daffodil", "tulip", "lilac", "peony", "rose", "coneflower", "lavender", "hydrangea", "aster", "sedum", "chrysanthemum", "camellia", "winterberry"],
    content: `
<p>Here's the problem with most gardens: everything blooms at once. June hits and it's a riot of color. By August it's a wall of green. By November it's brown sticks. The garden peaked too early and crashed.</p>

<p>This happens because people buy plants the way they buy groceries - whatever looks good right now. You visit the nursery in May, everything in bloom catches your eye, and you bring it all home. But a garden full of May-blooming plants is a garden with an 11-month off-season.</p>

<h2>The month-by-month framework</h2>

<p>The fix is simple in concept: pick at least two plants that bloom in each month of the year. That gives you minimum coverage. Three or four per month gives you depth and insurance (some years, things bloom early or late).</p>

<p>Here's a skeleton plan for zones 5-7 that covers every month:</p>

<p><strong>January-February:</strong> Snowdrops, winter aconite, witch hazel, hellebores. These are the brave ones. They bloom when most people aren't even thinking about gardens. But their flowers against snow or bare soil make an outsized visual impact precisely because nothing else is happening.</p>

<p><strong>March-April:</strong> Crocus, daffodils, tulips, forsythia, bleeding heart, Virginia bluebells. Spring's opening act. Layer early and mid-spring bloomers so the show doesn't have a gap between the first crocus and the first tulip.</p>

<p><strong>May-June:</strong> Peonies, irises, lilacs, roses, catmint, salvia, alliums. This is the easy part. Every nursery is full of May-June bloomers. The challenge is restraint - don't fill your whole garden with these.</p>

<p><strong>July-August:</strong> Coneflowers, black-eyed Susans, daylilies, hydrangeas, lavender, bee balm, garden phlox. Midsummer workhorses. These need to carry the garden through heat, and most of them do it without complaining.</p>

<p><strong>September-October:</strong> Asters, sedums, chrysanthemums, goldenrod, Japanese anemones, toad lilies. Fall bloomers are the most underplanted category. People forget that the garden doesn't have to end when school starts.</p>

<p><strong>November-December:</strong> Winterberry (for berries), camellias (zones 7+), witch hazel (late varieties), ornamental grasses (dried plumes). Winter interest is as much about structure as flowers.</p>

<h2>Use the bloom preview</h2>

<p>Our browse page has a bloom preview strip that shows you which months your selected plants cover. As you filter and explore, watch the bar chart fill in. Empty months are gaps to fill. A complete bar means year-round color.</p>

<h2>The layering principle</h2>

<p>A good year-round garden isn't just about different bloom times. It's about layering heights and structures. Put tall late-season plants (Joe-Pye weed, ornamental grasses) behind mid-height summer bloomers (coneflowers, daylilies) and short spring bloomers (crocus, grape hyacinth) in front. When the front row finishes, the middle row is starting. When the middle row peaks, the back row is coming up. The garden evolves forward through the season like a slow wave.</p>

<h2>Start with the gaps</h2>

<p>If you already have a garden, don't rip everything out. Instead, figure out which months have no blooms. Those are your gaps. Use our season filter to find plants that bloom in your gap months, filter to your zone, and you'll have a shortlist of exactly what to add. Most gardens need more late fall and winter bloomers. Start there.</p>
`,
  },
  {
    slug: "easiest-perennials-for-beginners",
    title: "The 15 Easiest Perennials for Beginners",
    description: "These plants are close to unkillable. If you're new to gardening or just want something that works without fussing, start here.",
    date: "2026-03-11",
    readTime: "5 min",
    category: "Guides",
    plantLinks: ["catmint", "coneflower", "black-eyed-susan", "daylily", "hosta", "sedum", "lavender", "russian-sage", "blanket-flower", "yarrow", "stella-de-oro-daylily", "knock-out-rose", "creeping-phlox", "aster", "coral-bells"],
    content: `
<p>There are plants that need deadheading, dividing, staking, spraying, special soil amendments, and a very specific watering schedule. Those are not these plants.</p>

<p>These 15 perennials are the ones that experienced gardeners recommend to their friends who say "I kill everything." They forgive neglect, tolerate bad soil, bounce back from drought, and generally make you look like a better gardener than you are.</p>

<h2>The unkillable five</h2>

<p><strong>Catmint</strong> - Billowing lavender-blue mounds that bloom for months. Deer ignore it. Drought doesn't faze it. Shear it back after the first bloom flush and it comes right back. If you only plant one perennial, make it catmint.</p>

<p><strong>Coneflower</strong> - The native prairie plant that handles whatever you throw at it. Poor soil? Fine. Hot summer? No problem. Forgot to water? It barely notices. Pink-purple daisy flowers from June through September, and butterflies treat it like a restaurant.</p>

<p><strong>Black-eyed Susan</strong> - Golden daisies with dark centers. Blooms in the hottest, driest part of summer when everything else is struggling. Naturalizes (which is garden-speak for "spreads around without you doing anything"). Native to most of the US.</p>

<p><strong>Daylily</strong> - Specifically the Stella de Oro variety: compact, reblooming, yellow flowers from May to frost. Grows in almost any soil. Tolerates partial shade. You can divide it by literally hacking the clump apart with a shovel and both halves will be fine. That's how tough it is.</p>

<p><strong>Hosta</strong> - The shade garden MVP. Lush foliage in greens, blues, golds, and variegated patterns. Flowers are a bonus. The main event is those architectural leaves filling in under trees where nothing else will grow. Just keep slugs away.</p>

<h2>The reliable middle</h2>

<p><strong>Sedum (Autumn Joy)</strong> - Succulent foliage and fall blooms. Thrives in poor, dry soil. Looks good in every season: spring rosettes, summer green, fall pink-bronze flowers, winter dried seedheads. A four-season plant that requires zero maintenance.</p>

<p><strong>Lavender</strong> - Needs good drainage and full sun. Once you give it that, it's virtually self-sufficient. Fragrant, deer-resistant, loved by pollinators, and it looks like you spent a week in Provence planning your garden.</p>

<p><strong>Russian Sage</strong> - Silvery stems, blue-lavender flower haze from July to September. Laughs at heat and drought. Pair it with ornamental grasses for a low-water garden that looks sophisticated.</p>

<p><strong>Blanket Flower</strong> - Red-and-yellow pinwheel daisies that bloom all summer. Worse soil actually produces more flowers. One of the few perennials that blooms the first year from seed.</p>

<p><strong>Yarrow</strong> - Flat-topped flower clusters in yellow, pink, red, and white. Ferny foliage. Spreads to form a weed-suppressing mat. Cut flowers last well in a vase. Has been growing wild across the northern hemisphere for thousands of years, which tells you everything about its survival instincts.</p>

<h2>The bonus five</h2>

<p><strong>Knock Out Rose</strong> - The rose that ended the "roses are high maintenance" era. Disease-resistant, self-cleaning (no deadheading), and blooms from spring to frost. If you've been afraid of roses, this is your on-ramp.</p>

<p><strong>Creeping Phlox</strong> - Cascading sheets of spring color over walls and slopes. Plant it, ignore it, and watch it spread into a carpet of pink, purple, or white every April.</p>

<p><strong>Aster</strong> - Late-season blooms when everything else is winding down. Purple, blue, and pink daisy-like flowers covered in butterflies. Native species are particularly tough.</p>

<p><strong>Coral Bells</strong> - Evergreen foliage in wild colors (lime, burgundy, silver, peach) with dainty flower spikes. The foliage is the real show. Tucks into shady spots and edges beautifully.</p>

<p><strong>Ornamental Grasses</strong> - Fountain grass and switchgrass specifically. Plant them, step back, and enjoy the movement. They sway in wind, catch light, and provide winter structure. Cut them down in spring and they grow back. That's the entire care instruction.</p>

<h2>The pattern</h2>

<p>Notice what these plants have in common: they're mostly native or naturalized, they tolerate poor soil, they don't need staking, they resist deer, and they attract pollinators. Easy plants aren't boring plants. They're plants that evolved to survive without a gardener's help. You're just giving them a nicer spot to do their thing.</p>
`,
  },
  {
    slug: "best-plants-for-full-shade",
    title: "Best Plants for Full Shade Gardens",
    description: "That dark corner under the trees isn't a problem. It's an opportunity. These shade-loving plants thrive with less than 2 hours of direct sun.",
    date: "2026-03-12",
    readTime: "5 min",
    category: "Guides",
    plantLinks: ["hosta", "astilbe", "bleeding-heart", "brunnera", "hellebore", "japanese-painted-fern", "ostrich-fern", "solomon-s-seal", "toad-lily", "epimedium", "lungwort", "coral-bells", "goatsbeard", "blue-angel-hosta", "empress-wu-hosta", "jack-in-the-pulpit"],
    content: `
<p>Every yard has that spot. Under the big oak. The north side of the house. The narrow passage between buildings. Less than two hours of direct sun per day. Most gardeners look at it and see a problem. It's actually one of the most interesting places to garden.</p>

<p>Shade gardens have a different aesthetic than sunny borders. They're quieter. More textural. The focus shifts from flower power to foliage architecture - leaf shape, color, size, and the way light filters through layers. Done well, a shade garden looks like a woodland floor come to life.</p>

<h2>The foundation: hostas and ferns</h2>

<p>Hostas are the backbone of shade gardening for a reason. The range of sizes, colors, and textures within the genus is staggering. Blue Angel hosta gives you massive blue-gray leaves. Empress Wu is the world's largest hosta, with individual leaves exceeding two feet. June has gold centers streaked with blue-green margins. Mix three or four varieties and you have a garden before you've even thought about flowers.</p>

<p>Ferns bring a completely different texture. Japanese painted fern has silver and burgundy fronds that glow in low light. Ostrich fern creates dramatic vertical vases. Together, hostas and ferns give you the contrast between bold and delicate, round and linear, that makes a shade garden feel intentional.</p>

<h2>Flowers in the dark</h2>

<p>Shade doesn't mean no flowers. It means different flowers. Astilbe produces feathery plumes in pink, red, and white that last for weeks. Bleeding heart dangles rows of heart-shaped pendants from graceful arching stems. Hellebores bloom in late winter when the rest of the garden is dormant - their nodding cups in purple, pink, and green are the first sign that spring is coming.</p>

<p>For later in the season, toad lily is the secret weapon. Its orchid-like spotted flowers appear in September and October, when most shade gardens have given up for the year. And brunnera produces clouds of tiny blue flowers in spring that look exactly like forget-me-nots, followed by handsome heart-shaped foliage all summer.</p>

<h2>The tough groundcovers</h2>

<p>Epimedium is one of the most underused shade plants. Its delicate fairy-wing flowers belie an incredibly tough constitution. Once established, it handles dry shade - the most challenging garden condition there is. Solomon's seal adds graceful arching architecture, with dangling white bells and clean foliage that stays attractive all season.</p>

<p>Lungwort does something unusual: its flowers open pink and turn blue on the same stem. The silver-spotted foliage looks good from spring through fall. And coral bells, while not exclusively a shade plant, thrive in part shade and bring foliage colors (burgundy, lime, silver) that brighten dark corners.</p>

<h2>Design principles for shade</h2>

<p>White and light-colored flowers and foliage show up best in low light. A white-variegated hosta or white astilbe will glow in a spot where deep purple would disappear. Use lighter colors at the back and deeper greens and blues in front.</p>

<p>Texture contrast matters more in shade than in sun. Pair the bold round leaves of hosta with the fine fronds of fern, the spiky flowers of astilbe with the drooping bells of Solomon's seal. In shade, your eye moves by texture instead of color.</p>

<p>And embrace the mood. A shade garden doesn't need to be cheerful. It can be mysterious, calm, cool, and a little bit wild. That's the whole point.</p>
`,
  },
  {
    slug: "what-to-plant-in-march",
    title: "What to Plant in March",
    description: "March is the beginning of the gardening year for most of the US. Here's what's blooming, what to plant, and what to plan for.",
    date: "2026-03-09",
    readTime: "4 min",
    category: "Seasonal",
    plantLinks: ["crocus", "snowdrop", "daffodil", "hellebore", "witch-hazel", "winter-aconite", "glory-of-the-snow", "lungwort", "lenten-rose", "manzanita", "california-lilac", "forsythia"],
    content: `
<p>March is when it starts. In zones 7-10, things are already moving. In zones 3-5, the ground is still frozen but the planning window is open. Wherever you are, March is the month to pay attention.</p>

<h2>What's blooming now</h2>

<p>In warmer zones (7+), March is a full-blown show. Daffodils are up, forsythia is screaming yellow, early magnolias are opening their goblets on bare branches, and hellebores have been quietly blooming since February.</p>

<p>In colder zones (4-6), March is more subtle. Snowdrops and winter aconite push through snow. Crocus tips poke up. Witch hazel opens its spidery yellow flowers on bare wood. These early bloomers punch above their weight because they have no competition. A single crocus against bare soil makes more visual impact than a hundred roses in June.</p>

<p>On the West Coast, California native manzanita blooms with urn-shaped pink flowers that hummingbirds love, and California lilac (ceanothus) starts its electric blue display.</p>

<h2>What to plant this month</h2>

<p>In zones 7-10, March is prime planting time for perennials. The soil is warming, rain is still regular, and plants have the whole spring to establish roots before summer heat. Get your coneflowers, catmint, daylilies, and other summer bloomers in the ground now.</p>

<p>In zones 4-6, wait for the ground to thaw. When you can push a shovel in, you can plant. Start with bare-root roses, dormant perennials, and shrubs. Trees and shrubs planted in early spring have the best survival rates because they get a full growing season to establish.</p>

<p>Everywhere: start seeds indoors for summer annuals. Zinnias, cosmos, and sunflowers started now will be ready to transplant after the last frost.</p>

<h2>What to plan</h2>

<p>March is the best time to assess your garden's gaps. Walk your yard and note what's blooming. Now look at what's empty. Those bare spots are your planting opportunities. Use our bloom calendar view to find plants that fill the months you're missing.</p>

<p>This is also the month to order plants from online nurseries if you want specific varieties. The best selections sell out by April. If you want a particular hosta variety or a specific hydrangea cultivar, order now.</p>

<h2>What to do in the garden</h2>

<p>Cut back ornamental grasses before new growth emerges. Clean up any perennial foliage you left standing for winter interest. But don't be too aggressive with cleanup - leave some leaf litter for overwintering beneficial insects until temperatures are consistently above 50°F.</p>

<p>And resist the urge to fertilize yet. Wait until plants are actively growing. Early fertilizer pushes tender new growth that late frosts can kill.</p>
`,
  },
];
