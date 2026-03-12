export interface Plant {
  name: string;
  botanical: string;
  slug: string;
  type: PlantType;
  bloomMonths: number[];
  zones: number[];
  colors: BloomColor[];
  sun: SunLevel[];
  water: WaterLevel;
  soil: SoilType[];
  heightMin: number;
  heightMax: number;
  bonus: BonusTrait[];
  desc: string;
  pairsWith: string[];
  parentSpecies?: string;
  varietyName?: string;
  isVariety?: boolean;
}

export type PlantType = "perennial" | "annual" | "bulb" | "shrub" | "vine" | "groundcover" | "grass" | "tree";
export type BloomColor = "pink" | "purple" | "blue" | "white" | "yellow" | "orange" | "red" | "lavender" | "green";
export type SunLevel = "full-sun" | "part-sun" | "part-shade" | "full-shade";
export type WaterLevel = "low" | "moderate" | "high";
export type SoilType = "clay" | "sandy" | "poor" | "loam";
export type BonusTrait = "deer-resistant" | "pollinator" | "native" | "fragrant" | "cut-flower" | "container" | "winter-interest" | "low-maintenance" | "reblooming" | "ground-cover" | "edible" | "evergreen" | "hummingbird" | "slug-resistant";

export const PLANT_TYPE_LABELS: Record<PlantType, string> = {
  perennial: "Perennial", annual: "Annual", bulb: "Bulb", shrub: "Shrub",
  vine: "Vine", groundcover: "Ground Cover", grass: "Grass", tree: "Tree",
};

export const BLOOM_COLOR_HEX: Record<BloomColor, string> = {
  pink: "#D4899B", purple: "#8B6BAE", blue: "#5B87A8", white: "#F0ECE4",
  yellow: "#C4A430", orange: "#C47A3A", red: "#B04A4A", lavender: "#A08AB8", green: "#5A8A5A",
};

export const SUN_LABELS: Record<SunLevel, { label: string; sub: string; icon: string }> = {
  "full-sun": { label: "Full Sun", sub: "6+ hours direct", icon: "○" },
  "part-sun": { label: "Part Sun", sub: "4-6 hours", icon: "◐" },
  "part-shade": { label: "Part Shade", sub: "2-4 hours", icon: "◑" },
  "full-shade": { label: "Full Shade", sub: "Under 2 hours", icon: "●" },
};

export const WATER_LABELS: Record<WaterLevel, { label: string; sub: string }> = {
  low: { label: "Low", sub: "Drought tolerant" },
  moderate: { label: "Moderate", sub: "Regular watering" },
  high: { label: "High", sub: "Consistently moist" },
};

export const BONUS_LABELS: Record<BonusTrait, { label: string; icon: string }> = {
  "deer-resistant": { label: "Deer Resistant", icon: "△" },
  pollinator: { label: "Pollinator Friendly", icon: "✿" },
  native: { label: "Native Species", icon: "♣" },
  fragrant: { label: "Fragrant", icon: "❋" },
  "cut-flower": { label: "Cut Flower", icon: "✂" },
  container: { label: "Container Friendly", icon: "▢" },
  "winter-interest": { label: "Winter Interest", icon: "❄" },
  "low-maintenance": { label: "Low Maintenance", icon: "✦" },
  "reblooming": { label: "Reblooming", icon: "↻" },
  "ground-cover": { label: "Ground Cover", icon: "〰" },
  "edible": { label: "Edible", icon: "♨" },
  "evergreen": { label: "Evergreen", icon: "⌘" },
  "hummingbird": { label: "Hummingbird Magnet", icon: "❖" },
  "slug-resistant": { label: "Slug Resistant", icon: "⊘" },
};

export const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
export const RAINBOW = ["#D4899B","#B04A4A","#C47A3A","#C4A430","#5A8A5A","#5B87A8","#8B6BAE","#A08AB8"];

export function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function formatHeight(p: Plant): string {
  if (p.heightMax >= 36) return `${Math.round(p.heightMin / 12)}-${Math.round(p.heightMax / 12)}'`;
  return `${p.heightMin}-${p.heightMax}"`;
}

export function getSizeTier(p: Plant): string {
  const avg = (p.heightMin + p.heightMax) / 2;
  if (avg <= 6) return "groundcover";
  if (avg <= 18) return "short";
  if (avg <= 36) return "medium";
  if (avg <= 72) return "tall";
  return "very-tall";
}

function p(name: string, botanical: string, type: PlantType, bloomMonths: number[], zones: number[], colors: BloomColor[], sun: SunLevel[], water: WaterLevel, soil: SoilType[], heightMin: number, heightMax: number, bonus: BonusTrait[], desc: string, pairsWith: string[]): Plant {
  return { name, botanical, slug: slugify(name), type, bloomMonths, zones, colors, sun, water, soil, heightMin, heightMax, bonus, desc, pairsWith };
}

function v(name: string, botanical: string, type: PlantType, bloomMonths: number[], zones: number[], colors: BloomColor[], sun: SunLevel[], water: WaterLevel, soil: SoilType[], heightMin: number, heightMax: number, bonus: BonusTrait[], desc: string, pairsWith: string[], parentSpecies: string, varietyName: string): Plant {
  return { ...p(name, botanical, type, bloomMonths, zones, colors, sun, water, soil, heightMin, heightMax, bonus, desc, pairsWith), parentSpecies, varietyName, isVariety: true };
}

export const PLANTS: Plant[] = [
  // BULBS
  p("Crocus","Crocus vernus","bulb",[2,3,4],[3,4,5,6,7,8],["purple","yellow","white"],["full-sun","part-sun"],"low",["sandy","poor"],4,6,["pollinator","deer-resistant","low-maintenance","container"],"One of the first signs of spring, pushing through snow with jewel-toned cups.",["Snowdrop","Daffodil","Hellebore"]),
  p("Snowdrop","Galanthus nivalis","bulb",[1,2,3],[3,4,5,6,7,8],["white"],["part-sun","part-shade","full-shade"],"moderate",[],3,6,["deer-resistant","low-maintenance","winter-interest"],"Delicate nodding bells that bloom fearlessly in late winter cold.",["Crocus","Winter Aconite","Hellebore"]),
  p("Daffodil","Narcissus","bulb",[3,4,5],[3,4,5,6,7,8,9,10],["yellow","white","orange"],["full-sun","part-sun"],"moderate",["clay","sandy"],12,18,["deer-resistant","pollinator","low-maintenance","cut-flower","container"],"Cheerful trumpets that naturalize beautifully and return stronger each year.",["Tulip","Grape Hyacinth","Bleeding Heart"]),
  p("Tulip","Tulipa","bulb",[3,4,5],[3,4,5,6,7,8],["red","pink","purple","yellow","orange","white"],["full-sun"],"moderate",["sandy"],10,24,["cut-flower","container"],"The classic spring icon in almost every color imaginable.",["Daffodil","Grape Hyacinth","Crocus"]),
  p("Hyacinth","Hyacinthus orientalis","bulb",[3,4],[3,4,5,6,7,8],["purple","pink","blue","white"],["full-sun","part-sun"],"moderate",["sandy"],8,12,["deer-resistant","pollinator","fragrant","cut-flower","container"],"Dense, intensely fragrant spikes. One bulb can perfume an entire room.",["Tulip","Daffodil","Crocus"]),
  p("Grape Hyacinth","Muscari armeniacum","bulb",[3,4,5],[3,4,5,6,7,8],["blue","purple","white"],["full-sun","part-sun"],"low",["sandy","poor","clay"],6,8,["deer-resistant","low-maintenance","pollinator","container"],"Tiny grape-like clusters that spread into rivers of blue over time.",["Tulip","Daffodil","Creeping Phlox"]),
  p("Allium","Allium giganteum","bulb",[5,6],[3,4,5,6,7,8,9,10],["purple","lavender","white","pink"],["full-sun"],"low",["sandy","poor"],24,48,["deer-resistant","pollinator","cut-flower"],"Dramatic globe-shaped heads on tall stems. Architectural and deer-proof.",["Salvia","Catmint","Lavender"]),
  p("Fritillaria","Fritillaria meleagris","bulb",[4,5],[3,4,5,6,7,8],["purple","white"],["part-sun","part-shade"],"moderate",[],8,12,["deer-resistant"],"Checkered, nodding bells with an otherworldly pattern. A collector's favorite.",["Snowdrop","Virginia Bluebell","Trillium"]),
  p("Scilla","Scilla siberica","bulb",[3,4],[3,4,5,6,7,8],["blue","white"],["part-sun","part-shade","full-shade"],"moderate",["clay"],4,6,["deer-resistant","low-maintenance"],"Carpets of brilliant blue that naturalize under trees with zero effort.",["Snowdrop","Crocus","Daffodil"]),
  p("Winter Aconite","Eranthis hyemalis","bulb",[2,3],[3,4,5,6,7,8],["yellow"],["part-sun","part-shade","full-shade"],"moderate",["clay"],3,4,["deer-resistant","low-maintenance","winter-interest"],"Buttercup-yellow blooms that push through frozen ground before the crocuses.",["Snowdrop","Crocus","Hellebore"]),
  p("Glory-of-the-Snow","Chionodoxa luciliae","bulb",[3,4],[3,4,5,6,7,8],["blue","pink","white"],["full-sun","part-sun"],"moderate",[],4,6,["deer-resistant","low-maintenance"],"Star-shaped blooms that appear as snow melts. Naturalizes into drifts.",["Crocus","Snowdrop","Scilla"]),
  p("Dahlia","Dahlia","bulb",[7,8,9,10],[3,4,5,6,7,8,9,10],["red","pink","orange","yellow","purple","white","lavender"],["full-sun"],"moderate",[],12,60,["pollinator","cut-flower"],"Endless forms from dinner-plate to pompom. The obsession of flower farmers.",["Zinnia","Cosmos","Sunflower"]),

  // PERENNIALS
  p("Bleeding Heart","Dicentra spectabilis","perennial",[4,5,6],[3,4,5,6,7,8],["pink","white"],["part-sun","part-shade","full-shade"],"moderate",[],24,36,["deer-resistant","native","cut-flower"],"Arching sprays of heart-shaped flowers for shady woodland gardens.",["Hosta","Astilbe","Hellebore"]),
  p("Peony","Paeonia","perennial",[5,6],[3,4,5,6,7,8],["pink","white","red"],["full-sun","part-sun"],"moderate",["clay"],24,36,["deer-resistant","pollinator","fragrant","cut-flower"],"Lush, ruffled blooms with intoxicating fragrance. Lives for decades.",["Iris","Catmint","Allium"]),
  p("Iris","Iris germanica","perennial",[5,6],[3,4,5,6,7,8,9,10],["purple","blue","yellow","white","lavender"],["full-sun"],"low",["clay","poor"],24,40,["deer-resistant","cut-flower","fragrant"],"Elegant sword-leaved perennials with intricate, ruffled blooms.",["Peony","Salvia","Catmint"]),
  p("Lavender","Lavandula","perennial",[6,7,8],[5,6,7,8,9,10],["lavender","purple","blue"],["full-sun"],"low",["sandy","poor"],18,36,["pollinator","deer-resistant","low-maintenance","fragrant","cut-flower","container"],"Fragrant silver-green mounds beloved by bees and humans alike.",["Rose","Salvia","Catmint"]),
  p("Coneflower","Echinacea purpurea","perennial",[6,7,8,9],[3,4,5,6,7,8,9,10],["pink","purple","orange","yellow","white"],["full-sun"],"low",["clay","sandy","poor"],24,48,["pollinator","native","deer-resistant","low-maintenance","cut-flower"],"Tough prairie native with long bloom season and medicinal history.",["Black-Eyed Susan","Salvia","Yarrow"]),
  p("Daylily","Hemerocallis","perennial",[6,7,8],[3,4,5,6,7,8,9,10],["orange","yellow","red","pink","purple"],["full-sun","part-sun"],"low",["clay","sandy","poor"],12,36,["low-maintenance"],"Virtually indestructible perennial with trumpet blooms in every warm hue.",["Coneflower","Shasta Daisy","Daffodil"]),
  p("Rose","Rosa","perennial",[5,6,7,8,9,10],[3,4,5,6,7,8,9,10],["red","pink","yellow","white","orange"],["full-sun"],"moderate",["clay"],24,96,["pollinator","fragrant","cut-flower"],"The queen of the garden. Modern varieties are surprisingly low-maintenance.",["Lavender","Catmint","Salvia"]),
  p("Black-Eyed Susan","Rudbeckia hirta","perennial",[7,8,9,10],[3,4,5,6,7,8,9,10],["yellow","orange"],["full-sun"],"low",["clay","sandy","poor"],24,36,["pollinator","native","deer-resistant","low-maintenance","cut-flower"],"Golden prairie workhorse that lights up late summer meadows.",["Coneflower","Goldenrod","Aster"]),
  p("Hellebore","Helleborus","perennial",[1,2,3,4],[3,4,5,6,7,8,9,10],["purple","pink","white","lavender","green"],["part-sun","part-shade","full-shade"],"moderate",["clay"],12,18,["deer-resistant","low-maintenance","winter-interest","cut-flower"],"The Lenten Rose. Elegant nodding blooms that thrive in deep shade.",["Snowdrop","Crocus","Hosta"]),
  p("Salvia","Salvia nemorosa","perennial",[5,6,7,8,9],[3,4,5,6,7,8,9,10],["purple","blue","red","pink","white"],["full-sun"],"low",["sandy","poor"],12,36,["pollinator","deer-resistant","low-maintenance","cut-flower"],"Vertical flower spikes that hummingbirds and bees cannot resist.",["Rose","Coneflower","Catmint"]),
  p("Japanese Anemone","Anemone hupehensis","perennial",[8,9,10],[5,6,7,8],["pink","white"],["part-sun","part-shade"],"moderate",[],24,48,["deer-resistant","low-maintenance","cut-flower"],"Graceful, swaying blooms on tall stems. Elegant in partial shade.",["Aster","Sedum","Turtlehead"]),
  p("Sedum","Hylotelephium","perennial",[8,9,10,11],[3,4,5,6,7,8,9,10],["pink","red","yellow","green"],["full-sun"],"low",["sandy","poor"],6,24,["pollinator","deer-resistant","low-maintenance","winter-interest","container"],"Succulent leaves, tough as nails. Ages to deep crimson in autumn.",["Aster","Goldenrod","Russian Sage"]),
  p("Bee Balm","Monarda didyma","perennial",[6,7,8],[3,4,5,6,7,8,9,10],["red","pink","purple","lavender"],["full-sun","part-sun"],"moderate",["clay"],24,48,["pollinator","native","cut-flower","fragrant"],"Shaggy, crown-shaped flowers that hummingbirds fight over.",["Coneflower","Garden Phlox","Daylily"]),
  p("Catmint","Nepeta faassenii","perennial",[5,6,7,8,9],[3,4,5,6,7,8,9,10],["lavender","blue","purple"],["full-sun"],"low",["sandy","poor"],12,24,["deer-resistant","pollinator","low-maintenance","fragrant"],"Billowy lavender-blue haze that blooms all season if you shear it back.",["Rose","Peony","Iris"]),
  p("Yarrow","Achillea millefolium","perennial",[6,7,8,9],[3,4,5,6,7,8,9,10],["yellow","pink","red","white","orange"],["full-sun"],"low",["sandy","poor"],18,36,["deer-resistant","native","pollinator","low-maintenance","cut-flower"],"Flat-topped clusters on ferny foliage. Thrives on neglect in poor soil.",["Coneflower","Salvia","Blanket Flower"]),
  p("Coral Bells","Heuchera","perennial",[5,6,7],[3,4,5,6,7,8,9,10],["pink","red","white","green"],["part-sun","part-shade","full-shade"],"moderate",[],12,18,["deer-resistant","low-maintenance","container"],"Grown mostly for dramatic foliage, but the tiny bell flowers are a bonus.",["Hosta","Astilbe","Bleeding Heart"]),
  p("Hosta","Hosta","perennial",[7,8],[3,4,5,6,7,8],["lavender","white"],["part-shade","full-shade"],"moderate",["clay"],12,36,["low-maintenance","fragrant","container"],"The undisputed queen of shade gardening. Foliage in every green and blue.",["Astilbe","Bleeding Heart","Hellebore"]),
  p("Shasta Daisy","Leucanthemum x superbum","perennial",[6,7,8],[3,4,5,6,7,8,9,10],["white","yellow"],["full-sun"],"moderate",[],24,36,["deer-resistant","pollinator","low-maintenance","cut-flower"],"Classic white-and-gold daisies that look fresh from a meadow painting.",["Coneflower","Daylily","Salvia"]),
  p("Delphinium","Delphinium elatum","perennial",[6,7],[3,4,5,6,7,8],["blue","purple","pink","white","lavender"],["full-sun"],"moderate",[],36,72,["pollinator","cut-flower"],"Towering spires of true blue. The tallest, most dramatic back-of-border plant.",["Rose","Peony","Foxglove"]),
  p("Foxglove","Digitalis purpurea","perennial",[5,6,7],[3,4,5,6,7,8],["purple","pink","white","yellow"],["part-sun","part-shade"],"moderate",[],36,60,["pollinator","deer-resistant","cut-flower"],"Stately spires of spotted, bell-shaped flowers. Cottage garden royalty.",["Delphinium","Rose","Astilbe"]),
  p("Lupine","Lupinus","perennial",[5,6],[3,4,5,6,7,8],["purple","pink","blue","yellow","red","white"],["full-sun"],"moderate",["sandy","poor"],24,48,["native","pollinator","cut-flower"],"Dramatic spikes in every color. Short-lived but self-seeds generously.",["Iris","Peony","Columbine"]),
  p("Russian Sage","Perovskia atriplicifolia","perennial",[7,8,9,10],[3,4,5,6,7,8,9,10],["lavender","blue"],["full-sun"],"low",["sandy","poor"],36,48,["deer-resistant","pollinator","low-maintenance"],"Airy lavender clouds on silver stems. Thrives in heat and poor soil.",["Coneflower","Sedum","Black-Eyed Susan"]),
  p("Joe-Pye Weed","Eutrochium purpureum","perennial",[7,8,9],[3,4,5,6,7,8],["pink","purple","lavender"],["full-sun","part-sun"],"high",["clay"],48,84,["pollinator","native"],"Towering native with mauve domes that butterflies swarm in late summer.",["Cardinal Flower","Bee Balm","Aster"]),
  p("Liatris","Liatris spicata","perennial",[7,8],[3,4,5,6,7,8,9,10],["purple","pink","white"],["full-sun"],"low",["sandy","poor"],24,48,["pollinator","native","deer-resistant","cut-flower"],"Blazing star. Spikes that bloom unusually from top to bottom.",["Coneflower","Black-Eyed Susan","Yarrow"]),
  p("Astilbe","Astilbe","perennial",[6,7,8],[3,4,5,6,7,8],["pink","red","purple","white","lavender"],["part-sun","part-shade","full-shade"],"high",[],18,36,["deer-resistant","pollinator","cut-flower"],"Feathery plumes that light up shady, moist spots like nothing else can.",["Hosta","Bleeding Heart","Foxglove"]),
  p("Dianthus","Dianthus","perennial",[5,6,7,8],[3,4,5,6,7,8,9,10],["pink","red","white"],["full-sun"],"low",["sandy","poor"],6,18,["deer-resistant","pollinator","fragrant","cut-flower","container"],"Spicy-scented, fringed petals. One of the best edging plants there is.",["Lavender","Catmint","Creeping Phlox"]),
  p("Garden Phlox","Phlox paniculata","perennial",[7,8,9],[3,4,5,6,7,8],["pink","purple","white","red","lavender"],["full-sun","part-sun"],"moderate",[],24,48,["pollinator","native","fragrant","cut-flower"],"Billowing clusters of fragrant summer color. A butterfly magnet.",["Bee Balm","Coneflower","Daylily"]),
  p("Columbine","Aquilegia","perennial",[4,5,6],[3,4,5,6,7,8],["purple","red","yellow","blue","pink","white"],["part-sun","part-shade"],"moderate",[],18,36,["native","pollinator","deer-resistant","cut-flower"],"Delicate, spurred flowers that dance on wiry stems. Hummingbird favorite.",["Bleeding Heart","Lupine","Foxglove"]),
  p("Blanket Flower","Gaillardia","perennial",[6,7,8,9,10],[3,4,5,6,7,8,9,10],["red","yellow","orange"],["full-sun"],"low",["sandy","poor"],12,24,["native","pollinator","deer-resistant","low-maintenance","cut-flower"],"Fiery bicolor pinwheels that bloom nonstop in the worst heat and soil.",["Coneflower","Yarrow","Black-Eyed Susan"]),
  p("Speedwell","Veronica spicata","perennial",[5,6,7,8],[3,4,5,6,7,8],["blue","purple","pink","white"],["full-sun"],"moderate",[],12,24,["deer-resistant","pollinator","low-maintenance","cut-flower"],"Tidy spikes of blue that add vertical punch to the front of the border.",["Shasta Daisy","Dianthus","Catmint"]),
  p("Tickseed","Coreopsis","perennial",[6,7,8,9],[3,4,5,6,7,8,9,10],["yellow","pink","red","orange"],["full-sun"],"low",["sandy","poor"],12,24,["native","pollinator","deer-resistant","low-maintenance","cut-flower"],"Cheerful native daisy that blooms for months with almost no care.",["Coneflower","Salvia","Blanket Flower"]),
  p("Penstemon","Penstemon digitalis","perennial",[5,6,7],[3,4,5,6,7,8],["purple","pink","white","lavender"],["full-sun"],"low",["sandy","poor"],18,36,["native","pollinator","deer-resistant"],"Tubular flowers on upright stems. Native hummingbird magnet for dry gardens.",["Salvia","Yarrow","Catmint"]),
  p("Cardinal Flower","Lobelia cardinalis","perennial",[7,8,9],[3,4,5,6,7,8,9,10],["red"],["part-sun","part-shade"],"high",["clay"],24,48,["pollinator","native"],"Screaming scarlet spikes. The most vivid red in the native plant world.",["Joe-Pye Weed","Bee Balm","Astilbe"]),
  p("Turtlehead","Chelone lyonii","perennial",[8,9,10],[3,4,5,6,7,8],["pink","white"],["part-sun","part-shade"],"high",["clay"],24,36,["native","pollinator","deer-resistant"],"Snapdragon-like flowers shaped exactly like a turtle's head. Loves wet feet.",["Japanese Anemone","Cardinal Flower","Aster"]),
  p("Aster","Symphyotrichum","perennial",[8,9,10,11],[3,4,5,6,7,8],["purple","blue","pink","lavender","white"],["full-sun","part-sun"],"moderate",["clay"],12,48,["pollinator","native","deer-resistant","cut-flower"],"The grand finale of the garden season. Essential for fall pollinators.",["Sedum","Goldenrod","Chrysanthemum"]),
  p("Chrysanthemum","Chrysanthemum","perennial",[9,10,11],[5,6,7,8,9,10],["yellow","orange","red","purple","white","pink"],["full-sun"],"moderate",[],12,36,["low-maintenance","cut-flower","container"],"The fall icon. Mounds of color when everything else is fading.",["Aster","Sedum","Fountain Grass"]),
  p("Goldenrod","Solidago","perennial",[8,9,10],[3,4,5,6,7,8,9,10],["yellow"],["full-sun"],"low",["clay","sandy","poor"],24,60,["pollinator","native","deer-resistant","low-maintenance","cut-flower"],"Wrongly blamed for allergies. A vital late-season pollinator magnet.",["Aster","Black-Eyed Susan","Sedum"]),
  p("Virginia Bluebell","Mertensia virginica","perennial",[3,4,5],[3,4,5,6,7,8],["blue","pink"],["part-sun","part-shade","full-shade"],"moderate",[],12,24,["native","deer-resistant","pollinator"],"Woodland ephemeral with sky-blue bells. Disappears by summer, returns faithfully.",["Trillium","Bleeding Heart","Hosta"]),
  p("Wild Geranium","Geranium maculatum","perennial",[4,5,6],[3,4,5,6,7,8],["pink","purple","lavender"],["part-sun","part-shade"],"moderate",["clay"],12,24,["native","pollinator","deer-resistant","low-maintenance"],"Soft pink blooms over deeply-cut foliage. A woodland edge staple.",["Columbine","Bleeding Heart","Virginia Bluebell"]),
  p("Blue False Indigo","Baptisia australis","perennial",[5,6],[3,4,5,6,7,8,9,10],["blue","purple"],["full-sun"],"low",["clay","sandy","poor"],36,48,["native","deer-resistant","pollinator","low-maintenance"],"Lupine-like spikes on a native that lives forever. Gets better with age.",["Iris","Peony","Catmint"]),
  p("Trillium","Trillium grandiflorum","perennial",[4,5],[3,4,5,6,7,8],["white","pink","red"],["part-shade","full-shade"],"moderate",[],12,18,["native","deer-resistant"],"Three leaves, three petals, pure elegance. The jewel of eastern woodlands.",["Virginia Bluebell","Bleeding Heart","Hellebore"]),
  p("Lantana","Lantana camara","perennial",[5,6,7,8,9,10,11],[7,8,9,10],["orange","yellow","pink","red","purple","white"],["full-sun"],"low",["sandy","poor"],12,48,["pollinator","deer-resistant","low-maintenance","container"],"Multi-colored flower clusters that bloom relentlessly in brutal heat.",["Bougainvillea","Butterfly Bush","Zinnia"]),
  p("Bird of Paradise","Strelitzia reginae","perennial",[3,4,5,6,7,8,9,10,11,12],[9,10],["orange","blue"],["full-sun","part-sun"],"moderate",[],36,60,["deer-resistant","cut-flower","container"],"Sculptural, crane-like flowers in orange and blue. Unmistakable.",["Plumeria","Bougainvillea","Lantana"]),

  // ANNUALS
  p("Zinnia","Zinnia elegans","annual",[6,7,8,9,10],[3,4,5,6,7,8,9,10],["red","orange","pink","yellow","purple","white"],["full-sun"],"moderate",[],12,36,["pollinator","low-maintenance","cut-flower"],"Easy-grow annual with electric colors. Cut-and-come-again champion.",["Cosmos","Dahlia","Marigold"]),
  p("Cosmos","Cosmos bipinnatus","annual",[6,7,8,9,10],[3,4,5,6,7,8,9,10],["pink","white","red","orange"],["full-sun"],"low",["sandy","poor"],36,60,["pollinator","low-maintenance","cut-flower"],"Airy, dancing flowers on thread-thin stems. Effortless cottage garden charm.",["Zinnia","Sunflower","Dahlia"]),
  p("Marigold","Tagetes","annual",[6,7,8,9,10],[3,4,5,6,7,8,9,10],["yellow","orange","red"],["full-sun"],"moderate",["clay","sandy","poor"],8,36,["deer-resistant","low-maintenance","pollinator","container"],"Bulletproof color all season long. The workhorse of warm-toned borders.",["Zinnia","Petunia","Snapdragon"]),
  p("Sunflower","Helianthus annuus","annual",[7,8,9],[3,4,5,6,7,8,9,10],["yellow","orange","red"],["full-sun"],"moderate",["sandy","poor"],36,96,["pollinator","native","cut-flower"],"Pure joy on a stalk. Birds love the seeds, kids love the spectacle.",["Cosmos","Zinnia","Dahlia"]),
  p("Petunia","Petunia x hybrida","annual",[5,6,7,8,9,10],[3,4,5,6,7,8,9,10],["purple","pink","red","white","yellow","lavender"],["full-sun"],"moderate",[],6,18,["low-maintenance","container","fragrant"],"Cascading color for containers and beds. Blooms nonstop until frost.",["Sweet Alyssum","Snapdragon","Marigold"]),
  p("Impatiens","Impatiens walleriana","annual",[5,6,7,8,9,10],[3,4,5,6,7,8,9,10],["pink","red","orange","white","purple","lavender"],["part-shade","full-shade"],"moderate",[],8,24,["low-maintenance","container"],"The shade annual champion. Flowers prolifically where nothing else will.",["Hosta","Coral Bells","Astilbe"]),
  p("Snapdragon","Antirrhinum majus","annual",[4,5,6,7,8,9],[3,4,5,6,7,8,9,10],["red","pink","yellow","orange","white","purple"],["full-sun","part-sun"],"moderate",[],12,36,["pollinator","cut-flower","container"],"Vertical flower spikes with squeeze-open blooms. Kids love them.",["Petunia","Zinnia","Sweet Alyssum"]),
  p("Sweet Alyssum","Lobularia maritima","annual",[4,5,6,7,8,9,10],[3,4,5,6,7,8,9,10],["white","pink","purple","lavender"],["full-sun","part-sun"],"moderate",[],3,6,["pollinator","low-maintenance","fragrant","container"],"Honey-scented carpet of tiny flowers. The best living edging plant.",["Petunia","Marigold","Snapdragon"]),
  p("Morning Glory","Ipomoea purpurea","annual",[6,7,8,9,10],[3,4,5,6,7,8,9,10],["blue","purple","pink","red","white"],["full-sun"],"moderate",["poor"],96,144,["low-maintenance","pollinator"],"Fast-climbing vine with trumpets that open fresh every morning.",["Clematis","Sunflower"]),

  // SHRUBS
  p("Lilac","Syringa vulgaris","shrub",[4,5],[3,4,5,6,7,8],["purple","lavender","white","pink"],["full-sun"],"moderate",["clay"],96,180,["pollinator","deer-resistant","fragrant","cut-flower"],"Intensely fragrant clusters that define spring in northern gardens.",["Peony","Iris","Viburnum"]),
  p("Hydrangea","Hydrangea macrophylla","shrub",[6,7,8,9],[5,6,7,8,9,10],["blue","pink","purple","white","lavender"],["part-sun","part-shade"],"moderate",["clay"],36,72,["pollinator","cut-flower"],"Massive mophead blooms that shift color with soil pH. Showstoppers.",["Hosta","Astilbe","Japanese Anemone"]),
  p("Azalea","Rhododendron","shrub",[4,5],[5,6,7,8,9,10],["pink","red","purple","white","orange"],["part-sun","part-shade"],"moderate",[],48,96,["pollinator"],"Explosive spring color in every warm hue. Acid-loving woodland classic.",["Rhododendron","Mountain Laurel","Bleeding Heart"]),
  p("Rhododendron","Rhododendron catawbiense","shrub",[5,6],[3,4,5,6,7,8],["purple","pink","white","lavender","red"],["part-sun","part-shade"],"moderate",[],72,120,["deer-resistant"],"Big, bold trusses of bloom over glossy evergreen foliage.",["Azalea","Mountain Laurel","Hosta"]),
  p("Forsythia","Forsythia x intermedia","shrub",[3,4],[3,4,5,6,7,8],["yellow"],["full-sun","part-sun"],"moderate",["clay","sandy","poor"],72,120,["deer-resistant","low-maintenance"],"A wall of golden yellow on bare branches. Spring's loudest announcement.",["Daffodil","Crocus","Witch Hazel"]),
  p("Butterfly Bush","Buddleja davidii","shrub",[6,7,8,9,10],[5,6,7,8,9,10],["purple","pink","white","lavender","blue"],["full-sun"],"low",["sandy","poor"],60,120,["pollinator","deer-resistant","low-maintenance","fragrant","cut-flower"],"Long, arching flower wands that butterflies absolutely lose their minds over.",["Lavender","Rose","Coneflower"]),
  p("Weigela","Weigela florida","shrub",[5,6],[3,4,5,6,7,8],["pink","red","white"],["full-sun","part-sun"],"moderate",["clay"],48,72,["pollinator","low-maintenance"],"Tubular blooms smother arching branches in late spring. Hummingbird haven.",["Lilac","Spirea","Viburnum"]),
  p("Spirea","Spiraea japonica","shrub",[5,6,7],[3,4,5,6,7,8,9,10],["pink","red","white"],["full-sun"],"moderate",["clay","sandy"],36,60,["deer-resistant","pollinator","low-maintenance"],"Flat-topped flower clusters on tidy mounds. The easiest flowering shrub.",["Weigela","Ninebark","Rose"]),
  p("Viburnum","Viburnum","shrub",[4,5,6],[3,4,5,6,7,8,9,10],["white","pink"],["full-sun","part-sun"],"moderate",["clay"],72,144,["pollinator","native","deer-resistant","fragrant"],"Fragrant snowball clusters in spring, then berries for birds in fall.",["Lilac","Azalea","Weigela"]),
  p("Mountain Laurel","Kalmia latifolia","shrub",[5,6],[3,4,5,6,7,8],["pink","white","red"],["part-sun","part-shade"],"moderate",[],60,120,["native","deer-resistant"],"Exquisite geometric buds open to cupped flowers. A native evergreen gem.",["Rhododendron","Azalea","Bleeding Heart"]),
  p("Rose of Sharon","Hibiscus syriacus","shrub",[7,8,9,10],[5,6,7,8,9,10],["purple","pink","white","blue","lavender"],["full-sun"],"moderate",["clay","sandy"],96,144,["pollinator","low-maintenance"],"Tropical-looking hibiscus flowers on a cold-hardy shrub. Blooms late.",["Butterfly Bush","Hydrangea","Russian Sage"]),
  p("Ninebark","Physocarpus opulifolius","shrub",[5,6],[3,4,5,6,7,8],["white","pink"],["full-sun","part-sun"],"moderate",["clay","sandy","poor"],60,96,["native","deer-resistant","low-maintenance","winter-interest"],"Peeling bark, burgundy foliage, and white puffs. A native multitasker.",["Spirea","Viburnum","Weigela"]),
  p("Camellia","Camellia japonica","shrub",[11,12,1,2,3],[7,8,9],["pink","red","white"],["part-sun","part-shade"],"moderate",[],72,144,["deer-resistant","winter-interest","cut-flower"],"Glossy evergreen with rose-like blooms in the depths of winter.",["Hellebore","Witch Hazel","Snowdrop"]),
  p("Witch Hazel","Hamamelis","shrub",[1,2,3],[3,4,5,6,7,8],["yellow","orange","red"],["full-sun","part-sun"],"moderate",[],120,240,["deer-resistant","native","fragrant","winter-interest"],"Spidery, fragrant blooms on bare branches when nothing else dares.",["Snowdrop","Hellebore","Camellia"]),
  p("Winterberry","Ilex verticillata","shrub",[6,7],[3,4,5,6,7,8],["white"],["full-sun","part-sun"],"high",["clay"],72,120,["native","winter-interest"],"Inconspicuous blooms, but covered in brilliant red berries all winter long.",["Witch Hazel","Camellia","Hellebore"]),

  // VINES
  p("Clematis","Clematis","vine",[5,6,7,8,9],[3,4,5,6,7,8,9,10],["purple","pink","blue","white","red","lavender"],["full-sun","part-sun"],"moderate",[],72,240,["pollinator","cut-flower"],"The queen of flowering vines. Over 300 species, something for every spot.",["Rose","Wisteria","Honeysuckle"]),
  p("Wisteria","Wisteria sinensis","vine",[4,5],[5,6,7,8,9,10],["purple","lavender","white","pink","blue"],["full-sun"],"moderate",[],180,360,["pollinator","fragrant"],"Cascading, fragrant racemes that create a dreamy canopy. Needs structure.",["Clematis","Lilac","Rose"]),
  p("Honeysuckle","Lonicera","vine",[5,6,7,8],[3,4,5,6,7,8,9,10],["yellow","orange","pink","red","white"],["full-sun","part-sun"],"moderate",["clay","sandy","poor"],96,240,["pollinator","native","deer-resistant","fragrant"],"Tubular, nectar-rich flowers with a fragrance that defines summer evenings.",["Clematis","Trumpet Vine","Rose"]),
  p("Trumpet Vine","Campsis radicans","vine",[6,7,8,9],[5,6,7,8,9,10],["orange","red","yellow"],["full-sun"],"low",["clay","sandy","poor"],240,480,["native","pollinator","low-maintenance"],"Aggressive native vine with fiery trumpets. Hummingbird highway.",["Honeysuckle","Morning Glory","Clematis"]),
  p("Bougainvillea","Bougainvillea","vine",[3,4,5,6,7,8,9,10,11],[9,10,11],["pink","purple","red","orange","white"],["full-sun"],"low",["sandy","poor"],120,360,["low-maintenance"],"Explosive cascades of papery bracts. Covers walls and fences in color.",["Plumeria","Lantana","Bird of Paradise"]),
  p("Jasmine","Jasminum","vine",[3,4,5,6,7,8],[7,8,9,10],["white","yellow"],["full-sun","part-sun"],"moderate",[],72,180,["pollinator","fragrant"],"Intensely sweet-scented white stars. The scent of warm southern evenings.",["Honeysuckle","Clematis","Rose"]),

  // GROUND COVERS
  p("Creeping Phlox","Phlox subulata","groundcover",[4,5],[3,4,5,6,7,8,9,10],["pink","purple","blue","white","lavender"],["full-sun"],"low",["sandy","poor"],4,6,["deer-resistant","low-maintenance"],"Cascading sheets of spring color over walls and slopes. Evergreen mat.",["Tulip","Daffodil","Dianthus"]),
  p("Ajuga","Ajuga reptans","groundcover",[4,5],[3,4,5,6,7,8,9,10],["blue","purple"],["part-sun","part-shade","full-shade"],"moderate",["clay"],4,6,["deer-resistant","low-maintenance"],"Bronze-purple foliage with blue spikes. Fills bare shade in one season.",["Hosta","Vinca","Coral Bells"]),
  p("Creeping Thyme","Thymus serpyllum","groundcover",[6,7],[3,4,5,6,7,8,9,10],["pink","purple","white"],["full-sun"],"low",["sandy","poor"],2,4,["deer-resistant","pollinator","low-maintenance","fragrant"],"Fragrant, walkable ground cover. Bees love it, foot traffic can't kill it.",["Dianthus","Lavender","Sedum"]),
  p("Vinca","Vinca minor","groundcover",[4,5,6],[3,4,5,6,7,8,9,10],["blue","purple","white","lavender"],["part-sun","part-shade","full-shade"],"low",["clay","sandy","poor"],4,6,["deer-resistant","low-maintenance"],"Evergreen mat with periwinkle-blue flowers. Tough shade ground cover.",["Ajuga","Hosta","Hellebore"]),

  // GRASSES
  p("Fountain Grass","Pennisetum alopecuroides","grass",[8,9,10,11],[5,6,7,8,9,10],["pink","white"],["full-sun"],"low",["sandy","poor"],24,48,["deer-resistant","low-maintenance","winter-interest"],"Arching, bottlebrush plumes that catch the light. Movement in the garden.",["Sedum","Aster","Chrysanthemum"]),
  p("Switchgrass","Panicum virgatum","grass",[8,9,10],[3,4,5,6,7,8,9,10],["pink","red"],["full-sun"],"low",["clay","sandy","poor"],36,72,["native","deer-resistant","low-maintenance","winter-interest"],"Upright native grass with airy seed heads. Gold and red fall color.",["Coneflower","Black-Eyed Susan","Goldenrod"]),
  p("Blue Fescue","Festuca glauca","grass",[6,7],[3,4,5,6,7,8],["blue"],["full-sun"],"low",["sandy","poor"],8,12,["deer-resistant","low-maintenance","container"],"Steel-blue tufted mound. Perfect edging or rock garden accent.",["Lavender","Sedum","Dianthus"]),
  p("Miscanthus","Miscanthus sinensis","grass",[9,10,11],[5,6,7,8,9,10],["pink","white","red"],["full-sun"],"low",["clay","sandy"],48,96,["deer-resistant","low-maintenance","winter-interest"],"Tall, graceful plumes that persist through winter. Living architecture.",["Russian Sage","Aster","Fountain Grass"]),

  // TREES
  p("Eastern Redbud","Cercis canadensis","tree",[3,4],[5,6,7,8,9,10],["pink","purple","lavender"],["full-sun","part-sun"],"moderate",["clay"],180,360,["native","pollinator"],"Magenta flowers erupt directly from bare branches. Spring showstopper tree.",["Daffodil","Virginia Bluebell","Forsythia"]),
  p("Dogwood","Cornus florida","tree",[4,5],[5,6,7,8,9],["white","pink"],["part-sun","part-shade"],"moderate",[],180,300,["native","pollinator","winter-interest"],"Iconic spring bloomer with fall berries and winter bark. Four-season beauty.",["Azalea","Rhododendron","Virginia Bluebell"]),
  p("Crape Myrtle","Lagerstroemia","tree",[6,7,8,9],[7,8,9,10],["pink","purple","red","white","lavender"],["full-sun"],"moderate",["clay","sandy"],120,300,["low-maintenance","pollinator"],"The tree of the South. Months of crinkled blooms and gorgeous peeling bark.",["Butterfly Bush","Lantana","Rose"]),
  p("Magnolia","Magnolia x soulangeana","tree",[3,4,5],[5,6,7,8,9],["pink","white","purple"],["full-sun","part-sun"],"moderate",[],180,360,["fragrant","cut-flower"],"Goblet-shaped blooms on bare branches. One of spring's most dramatic moments.",["Daffodil","Forsythia","Camellia"]),
  p("Plumeria","Plumeria rubra","tree",[5,6,7,8,9,10],[9,10],["white","pink","yellow","red"],["full-sun"],"low",["sandy"],120,300,["fragrant","container"],"Intoxicatingly fragrant tropical blooms. The flower of Hawaiian leis.",["Bougainvillea","Bird of Paradise","Lantana"]),

  // =====================
  // NEW PLANTS (115 entries added in v1.6)
  // =====================

  // ============================================================
  // ============================================================
  //   - Oakleaf Hydrangea (distinct native species vs your macrophylla Hydrangea)
  //   - Lenten Rose (Helleborus orientalis vs your Hellebore entry)
  // ============================================================
  // =====================
  // HYDRANGEA VARIETIES
  // =====================
  v("Endless Summer Hydrangea","Hydrangea macrophylla 'Endless Summer'","shrub",[6,7,8,9],[4,5,6,7,8,9],["blue","pink","purple"],["part-sun","part-shade"],"moderate",["clay","loam"],36,60,["pollinator","cut-flower","reblooming"],"Reblooms on old and new wood, so you get flowers even after a harsh winter. Color shifts with soil pH.",["Hosta","Astilbe","Japanese Anemone"],"Hydrangea","Endless Summer"),
  v("Limelight Hydrangea","Hydrangea paniculata 'Limelight'","shrub",[7,8,9],[3,4,5,6,7,8],["green","white"],["full-sun","part-sun"],"moderate",["clay","loam"],72,96,["cut-flower","low-maintenance"],"Cone-shaped blooms open chartreuse, mature to white, then blush pink in fall. Tough as nails.",["Rose","Catmint","Russian Sage"],"Hydrangea","Limelight"),
  v("Annabelle Hydrangea","Hydrangea arborescens 'Annabelle'","shrub",[6,7,8],[3,4,5,6,7,8,9],["white"],["part-sun","part-shade"],"moderate",["clay","loam"],36,60,["cut-flower","native"],"Enormous snowball blooms on a native species. Blooms on new wood, so prune hard in spring.",["Hosta","Fern","Astilbe"],"Hydrangea","Annabelle"),
  v("Incrediball Hydrangea","Hydrangea arborescens 'Incrediball'","shrub",[6,7,8],[3,4,5,6,7,8],["white","green"],["part-sun","part-shade"],"moderate",["clay","loam"],48,60,["cut-flower","native"],"Annabelle's bigger sibling with stronger stems that don't flop. Blooms the size of basketballs.",["Hosta","Astilbe","Brunnera"],"Hydrangea","Incrediball"),
  v("Little Lime Hydrangea","Hydrangea paniculata 'Little Lime'","shrub",[7,8,9],[3,4,5,6,7,8],["green","white","pink"],["full-sun","part-sun"],"moderate",["clay","loam"],36,60,["container","cut-flower","low-maintenance"],"Compact Limelight. Same color show in a smaller package perfect for borders and containers.",["Catmint","Lavender","Salvia"],"Hydrangea","Little Lime"),
  v("Bobo Hydrangea","Hydrangea paniculata 'Bobo'","shrub",[7,8,9],[3,4,5,6,7,8],["white","pink"],["full-sun","part-sun"],"moderate",["clay","loam"],30,36,["container","cut-flower","low-maintenance"],"Dwarf paniculata smothered in blooms. Perfect front-of-border plant that needs almost no care.",["Boxwood","Catmint","Lavender"],"Hydrangea","Bobo"),
  v("Quick Fire Hydrangea","Hydrangea paniculata 'Quick Fire'","shrub",[6,7,8,9],[3,4,5,6,7,8],["white","pink","red"],["full-sun","part-sun"],"moderate",["clay","loam"],72,96,["cut-flower"],"Blooms a full month before other paniculatas. White cones age to deep rosy pink by fall.",["Russian Sage","Coneflower","Ornamental Grass"],"Hydrangea","Quick Fire"),
  v("Pinky Winky Hydrangea","Hydrangea paniculata 'Pinky Winky'","shrub",[7,8,9],[3,4,5,6,7,8],["white","pink"],["full-sun","part-sun"],"moderate",["clay","loam"],72,96,["cut-flower"],"Two-tone blooms with white tips and pink bases. Strong stems hold heavy flower heads upright.",["Russian Sage","Catmint","Ornamental Grass"],"Hydrangea","Pinky Winky"),
  v("Nikko Blue Hydrangea","Hydrangea macrophylla 'Nikko Blue'","shrub",[6,7,8],[5,6,7,8,9],["blue"],["part-sun","part-shade"],"moderate",["clay","loam"],48,72,["cut-flower"],"The classic blue mophead. Rich, true blue in acidic soil. A cottage garden essential.",["Hosta","Astilbe","Fern"],"Hydrangea","Nikko Blue"),
  // =====================
  // ROSE VARIETIES
  // =====================
  v("Knock Out Rose","Rosa 'Knock Out'","shrub",[5,6,7,8,9,10],[5,6,7,8,9,10],["red","pink"],["full-sun"],"moderate",["loam","clay"],36,48,["pollinator","low-maintenance","reblooming"],"The rose that changed everything. Disease-resistant, self-cleaning, and blooms nonstop from spring to frost.",["Lavender","Catmint","Salvia"],"Rose","Knock Out"),
  v("Double Knock Out Rose","Rosa 'Double Knock Out'","shrub",[5,6,7,8,9,10],[5,6,7,8,9,10],["red"],["full-sun"],"moderate",["loam","clay"],36,48,["pollinator","low-maintenance","reblooming"],"Fuller, double-petaled version of the Knock Out. Same bulletproof performance with more petal count.",["Lavender","Catmint","Salvia"],"Rose","Double Knock Out"),
  v("Drift Rose","Rosa 'Drift'","shrub",[5,6,7,8,9,10],[4,5,6,7,8,9,10,11],["pink","red","orange"],["full-sun"],"moderate",["loam","sandy"],18,24,["pollinator","low-maintenance","ground-cover","reblooming","container"],"Groundcover rose that stays low and spreads wide. Tough, disease-resistant, and constantly in bloom.",["Lavender","Catmint","Salvia"],"Rose","Drift"),
  v("New Dawn Climbing Rose","Rosa 'New Dawn'","vine",[6,7,8,9],[5,6,7,8,9],["pink"],["full-sun","part-sun"],"moderate",["loam","clay"],120,180,["fragrant","cut-flower","pollinator"],"The world's most popular climbing rose. Soft blush pink, sweetly fragrant, and remarkably vigorous.",["Clematis","Lavender","Catmint"],"Rose","New Dawn"),
  v("Don Juan Climbing Rose","Rosa 'Don Juan'","vine",[6,7,8,9,10],[5,6,7,8,9,10],["red"],["full-sun"],"moderate",["loam","clay"],96,144,["fragrant","cut-flower","pollinator","reblooming"],"Deep velvety red climber with classic rose fragrance. Repeats reliably on a strong, vigorous plant.",["Clematis","Lavender","Catmint"],"Rose","Don Juan"),
  // =====================
  // LILAC VARIETIES
  // =====================
  v("Bloomerang Lilac","Syringa 'Bloomerang'","shrub",[5,6,9],[3,4,5,6,7],["purple","lavender"],["full-sun"],"low",["loam"],48,72,["fragrant","pollinator","reblooming"],"Blooms in spring, then reblooms summer through frost. Compact habit with classic lilac fragrance.",["Peony","Iris","Rose"],"Lilac","Bloomerang"),
  v("Miss Kim Lilac","Syringa patula 'Miss Kim'","shrub",[5,6],[3,4,5,6,7,8],["lavender"],["full-sun"],"low",["loam"],48,72,["fragrant","pollinator","deer-resistant"],"Compact lilac with pale lavender blooms and outstanding fragrance. Burgundy fall foliage as a bonus.",["Peony","Iris","Catmint"],"Lilac","Miss Kim"),
  v("Sensation Lilac","Syringa vulgaris 'Sensation'","shrub",[5],[3,4,5,6,7],["purple","white"],["full-sun"],"low",["loam"],96,120,["fragrant","pollinator","cut-flower"],"Unique bicolor blooms with purple petals edged in white. A head-turner in any spring garden.",["Peony","Iris","Tulip"],"Lilac","Sensation"),
  v("Dwarf Korean Lilac","Syringa meyeri 'Palibin'","shrub",[5,6],[3,4,5,6,7],["lavender","pink"],["full-sun"],"low",["loam"],48,60,["fragrant","pollinator","deer-resistant","container"],"Slow-growing dwarf with dense rounded habit. Perfect for small gardens and foundation plantings.",["Boxwood","Catmint","Peony"],"Lilac","Dwarf Korean"),
  // =====================
  // HOSTA VARIETIES
  // =====================
  v("Blue Angel Hosta","Hosta 'Blue Angel'","perennial",[7,8],[3,4,5,6,7,8],["lavender","white"],["part-shade","full-shade"],"moderate",["loam","clay"],30,36,["fragrant","low-maintenance"],"Massive blue-gray leaves up to 18 inches long. One of the largest and most slug-resistant hostas.",["Astilbe","Brunnera","Fern"],"Hosta","Blue Angel"),
  v("Sum and Substance Hosta","Hosta 'Sum and Substance'","perennial",[7,8],[3,4,5,6,7,8],["lavender"],["part-sun","part-shade"],"moderate",["loam","clay"],30,36,["low-maintenance","slug-resistant"],"Chartreuse giant that can take more sun than most hostas. Heart-shaped leaves grow enormous.",["Astilbe","Heuchera","Japanese Anemone"],"Hosta","Sum and Substance"),
  v("Patriot Hosta","Hosta 'Patriot'","perennial",[7,8],[3,4,5,6,7,8],["lavender"],["part-shade","full-shade"],"moderate",["loam","clay"],18,22,["low-maintenance"],"Dark green leaves with crisp white margins. Classic variegated hosta that brightens shady spots.",["Astilbe","Brunnera","Bleeding Heart"],"Hosta","Patriot"),
  v("Halcyon Hosta","Hosta 'Halcyon'","perennial",[7,8],[3,4,5,6,7,8],["lavender"],["part-shade","full-shade"],"moderate",["loam","clay"],14,18,["low-maintenance","slug-resistant"],"The bluest hosta you can grow. Thick, heavily textured leaves resist slugs better than most.",["Astilbe","Fern","Bleeding Heart"],"Hosta","Halcyon"),
  v("Empress Wu Hosta","Hosta 'Empress Wu'","perennial",[7,8],[3,4,5,6,7,8],["lavender"],["part-shade","full-shade"],"moderate",["loam","clay"],36,48,["low-maintenance"],"The world's largest hosta. Individual leaves can exceed two feet. A bold statement in any shade garden.",["Astilbe","Fern","Ligularia"],"Hosta","Empress Wu"),
  v("June Hosta","Hosta 'June'","perennial",[7,8],[3,4,5,6,7,8],["lavender"],["part-shade","full-shade"],"moderate",["loam","clay"],12,15,["low-maintenance"],"Gold center streaked with blue-green margins. Color shifts through the season. A collector's favorite.",["Heuchera","Brunnera","Astilbe"],"Hosta","June"),
  // =====================
  // CONEFLOWER VARIETIES
  // =====================
  v("Magnus Coneflower","Echinacea purpurea 'Magnus'","perennial",[6,7,8,9],[3,4,5,6,7,8],["pink"],["full-sun"],"low",["sandy","loam","poor"],36,48,["pollinator","deer-resistant","native","cut-flower","low-maintenance"],"The gold standard coneflower. Flat, non-drooping petals around a bold copper cone. Perennial Plant of the Year.",["Black-Eyed Susan","Ornamental Grass","Catmint"],"Coneflower","Magnus"),
  v("PowWow Wild Berry Coneflower","Echinacea purpurea 'PowWow Wild Berry'","perennial",[6,7,8,9],[3,4,5,6,7,8],["pink","purple"],["full-sun"],"low",["sandy","loam","poor"],18,24,["pollinator","deer-resistant","native","container","reblooming"],"Compact, heavily branched, and smothered in deep rose-purple blooms. Reblooms without deadheading.",["Catmint","Salvia","Lavender"],"Coneflower","PowWow Wild Berry"),
  v("Cheyenne Spirit Coneflower","Echinacea 'Cheyenne Spirit'","perennial",[6,7,8,9],[4,5,6,7,8,9,10],["red","orange","yellow","pink","purple","white"],["full-sun"],"low",["sandy","loam","poor"],24,30,["pollinator","deer-resistant","cut-flower"],"A rainbow mix of coneflower colors from a single seed strain. Every plant is a surprise.",["Black-Eyed Susan","Ornamental Grass","Salvia"],"Coneflower","Cheyenne Spirit"),
  v("White Swan Coneflower","Echinacea purpurea 'White Swan'","perennial",[6,7,8,9],[3,4,5,6,7,8,9],["white"],["full-sun"],"low",["sandy","loam","poor"],24,36,["pollinator","deer-resistant","native","cut-flower"],"Pure white drooping petals around a bronze-orange cone. Elegant and underused.",["Black-Eyed Susan","Catmint","Russian Sage"],"Coneflower","White Swan"),
  // =====================
  // DAYLILY VARIETIES
  // =====================
  v("Stella de Oro Daylily","Hemerocallis 'Stella de Oro'","perennial",[5,6,7,8,9],[3,4,5,6,7,8,9,10],["yellow"],["full-sun","part-sun"],"low",["loam","clay","sandy"],12,18,["low-maintenance","reblooming","deer-resistant","pollinator"],"The most planted perennial in America. Compact, reblooming, and basically indestructible.",["Catmint","Salvia","Lavender"],"Daylily","Stella de Oro"),
  v("Happy Returns Daylily","Hemerocallis 'Happy Returns'","perennial",[5,6,7,8,9],[3,4,5,6,7,8,9],["yellow"],["full-sun","part-sun"],"low",["loam","clay","sandy"],18,24,["low-maintenance","reblooming","fragrant"],"Lemon-yellow rebloomer with light fragrance. A bit taller than Stella with softer color.",["Catmint","Iris","Black-Eyed Susan"],"Daylily","Happy Returns"),
  v("Purple de Oro Daylily","Hemerocallis 'Purple de Oro'","perennial",[6,7,8],[3,4,5,6,7,8,9],["purple"],["full-sun","part-sun"],"low",["loam","clay","sandy"],12,18,["low-maintenance","reblooming"],"Deep purple-red blooms on a compact Stella-sized plant. Brings rich color to the front of the border.",["Catmint","Coreopsis","Salvia"],"Daylily","Purple de Oro"),
  v("Chicago Apache Daylily","Hemerocallis 'Chicago Apache'","perennial",[6,7,8],[3,4,5,6,7,8,9],["red"],["full-sun","part-sun"],"low",["loam","clay","sandy"],24,30,["cut-flower","low-maintenance"],"Scarlet red with a velvety texture. One of the best true red daylilies available.",["Ornamental Grass","Catmint","Black-Eyed Susan"],"Daylily","Chicago Apache"),
  // =====================
  // CLEMATIS VARIETIES
  // =====================
  v("Jackmanii Clematis","Clematis 'Jackmanii'","vine",[6,7,8,9],[4,5,6,7,8],["purple"],["full-sun","part-sun"],"moderate",["loam"],72,120,["pollinator","cut-flower"],"The classic large-flowered clematis since 1858. Deep violet-purple blooms cover the vine midsummer.",["Rose","Lavender","Hosta"],"Clematis","Jackmanii"),
  v("Nelly Moser Clematis","Clematis 'Nelly Moser'","vine",[5,6,9],[4,5,6,7,8],["pink","lavender"],["part-sun","part-shade"],"moderate",["loam"],72,96,["cut-flower"],"Pale pink petals with a darker pink bar down the center. Prefers some shade to prevent color fading.",["Rose","Hosta","Hydrangea"],"Clematis","Nelly Moser"),
  v("Sweet Autumn Clematis","Clematis terniflora","vine",[8,9],[4,5,6,7,8,9],["white"],["full-sun","part-sun"],"moderate",["loam","clay"],120,240,["fragrant","pollinator"],"Explosive late-summer bloom of thousands of tiny fragrant white flowers. Vigorous to a fault.",["Rose","Hydrangea","Aster"],"Clematis","Sweet Autumn"),
  // =====================
  // AZALEA VARIETIES
  // =====================
  v("Encore Autumn Azalea","Rhododendron 'Encore Autumn Twist'","shrub",[4,5,9,10],[6,7,8,9,10],["pink","purple"],["part-sun","part-shade"],"moderate",["loam"],36,60,["pollinator","reblooming"],"Spring blooms plus a full fall encore. Multiple color options in the Encore series.",["Hydrangea","Hosta","Fern"],"Azalea","Encore Autumn"),
  v("Bloom-a-Thon Azalea","Rhododendron 'Bloom-a-Thon'","shrub",[4,5,6,7,8,9],[5,6,7,8,9],["pink","purple","lavender"],["part-sun","part-shade"],"moderate",["loam"],36,48,["pollinator","reblooming"],"Repeat-blooming azalea with waves of color spring through fall. Evergreen in mild climates.",["Hydrangea","Hosta","Japanese Maple"],"Azalea","Bloom-a-Thon"),
  // =====================
  // SEDUM VARIETIES
  // =====================
  v("Autumn Joy Sedum","Hylotelephium 'Autumn Joy'","perennial",[8,9,10],[3,4,5,6,7,8,9],["pink"],["full-sun"],"low",["sandy","loam","poor"],18,24,["pollinator","deer-resistant","low-maintenance","cut-flower"],"Broccoli-like heads open pink and age to copper-bronze. Four-season interest, zero maintenance.",["Ornamental Grass","Catmint","Aster"],"Sedum","Autumn Joy"),
  v("Dragon's Blood Sedum","Sedum spurium 'Dragon's Blood'","perennial",[7,8],[3,4,5,6,7,8,9],["pink","red"],["full-sun"],"low",["sandy","poor"],3,6,["ground-cover","deer-resistant","low-maintenance","container"],"Creeping mat of burgundy-tinged foliage with starry red flowers. Turns deep red in fall.",["Creeping Thyme","Hens and Chicks","Armeria"],"Sedum","Dragon's Blood"),
  v("Angelina Sedum","Sedum rupestre 'Angelina'","perennial",[6,7],[3,4,5,6,7,8,9],["yellow"],["full-sun"],"low",["sandy","poor"],4,8,["ground-cover","deer-resistant","low-maintenance","container"],"Chartreuse needle-like foliage turns golden orange in fall. Tiny yellow flowers are a bonus.",["Creeping Thyme","Hens and Chicks","Catmint"],"Sedum","Angelina"),
  // =====================
  // MORE SHADE PLANTS
  // =====================
  p("Brunnera","Brunnera macrophylla","perennial",[4,5],[3,4,5,6,7,8],["blue"],["part-shade","full-shade"],"moderate",["loam","clay"],12,18,["deer-resistant","low-maintenance"],"Clouds of tiny forget-me-not blue flowers over heart-shaped leaves. Thrives in dry shade once established.",["Hosta","Astilbe","Fern"]),
  p("Epimedium","Epimedium grandiflorum","perennial",[4,5],[4,5,6,7,8],["pink","yellow","white"],["part-shade","full-shade"],"low",["loam"],8,12,["deer-resistant","ground-cover","low-maintenance"],"Delicate fairy-wing flowers above leathery foliage. One of the toughest dry shade groundcovers.",["Hosta","Fern","Hellebore"]),
  p("Ligularia","Ligularia dentata","perennial",[7,8],[4,5,6,7,8],["yellow","orange"],["part-shade"],"high",["clay","loam"],36,48,["pollinator","deer-resistant"],"Bold, dinner-plate leaves with daisy-like flowers. Loves wet feet and will wilt dramatically if dry.",["Hosta","Astilbe","Japanese Iris"]),
  p("Rodgersia","Rodgersia pinnata","perennial",[6,7],[5,6,7],["pink","white"],["part-shade"],"high",["clay","loam"],36,48,["deer-resistant","low-maintenance"],"Huge textured leaves resembling horse chestnuts with fluffy plumes. Architectural shade statement.",["Hosta","Ligularia","Astilbe"]),
  p("Solomon's Seal","Polygonatum odoratum","perennial",[5,6],[3,4,5,6,7,8],["white"],["part-shade","full-shade"],"moderate",["loam"],18,36,["deer-resistant","native","low-maintenance"],"Arching stems hung with dangling white bells. Pairs of leaves create graceful, layered architecture.",["Hosta","Fern","Bleeding Heart"]),
  p("Toad Lily","Tricyrtis hirta","perennial",[9,10],[4,5,6,7,8],["purple","white"],["part-shade","full-shade"],"moderate",["loam"],24,36,["deer-resistant","low-maintenance"],"Orchid-like spotted flowers when everything else is done. A late-season shade garden gem.",["Hosta","Fern","Japanese Anemone"]),
  p("Jack-in-the-Pulpit","Arisaema triphyllum","perennial",[4,5],[4,5,6,7,8,9],["green"],["part-shade","full-shade"],"moderate",["loam","clay"],12,24,["native","deer-resistant"],"Hooded green-and-brown striped spathe sheltering a hidden spadix. Woodland curiosity followed by red berries.",["Fern","Trillium","Solomon's Seal"]),
  p("Japanese Painted Fern","Athyrium niponicum 'Pictum'","perennial",[5,6,7,8,9],[4,5,6,7,8],["green"],["part-shade","full-shade"],"moderate",["loam"],12,18,["low-maintenance","deer-resistant"],"Silver and burgundy fronds unlike any other fern. Foliage plant that earns its keep on color alone.",["Hosta","Astilbe","Brunnera"]),
  p("Ostrich Fern","Matteuccia struthiopteris","perennial",[5,6,7,8,9],[3,4,5,6,7],["green"],["part-shade","full-shade"],"high",["loam","clay"],36,60,["native","deer-resistant","low-maintenance"],"Tall vase-shaped fronds that unfurl from fiddleheads in spring. Spreads to form dramatic colonies.",["Hosta","Solomon's Seal","Astilbe"]),
  p("Meadow Rue","Thalictrum aquilegiifolium","perennial",[5,6],[5,6,7,8],["purple","lavender","white"],["part-shade","part-sun"],"moderate",["loam"],36,48,["deer-resistant","cut-flower"],"Fluffy puffs of bloom on tall, airy stems above columbine-like foliage. Light and ethereal.",["Astilbe","Hosta","Japanese Anemone"]),
  p("Goatsbeard","Aruncus dioicus","perennial",[6,7],[3,4,5,6,7],["white"],["part-shade","full-shade"],"moderate",["loam","clay"],48,72,["native","deer-resistant","low-maintenance"],"Giant creamy plumes like an astilbe on steroids. Native woodland giant that anchors a shade border.",["Hosta","Astilbe","Fern"]),
  p("Lungwort","Pulmonaria saccharata","perennial",[3,4,5],[3,4,5,6,7,8],["blue","pink"],["part-shade","full-shade"],"moderate",["loam"],10,14,["deer-resistant","low-maintenance","pollinator"],"Flowers open pink and turn blue on the same stem. Silver-spotted foliage looks great all season.",["Hosta","Brunnera","Bleeding Heart"]),
  // =====================
  // HERBS THAT FLOWER
  // =====================
  p("Rosemary","Salvia rosmarinus","perennial",[3,4,5],[8,9,10],["blue","lavender"],["full-sun"],"low",["sandy","poor"],24,48,["pollinator","fragrant","deer-resistant","container"],"Aromatic evergreen herb with tiny blue flowers loved by early bees. Needs excellent drainage.",["Lavender","Sage","Thyme"]),
  p("Chives","Allium schoenoprasum","perennial",[5,6],[3,4,5,6,7,8,9],["purple","lavender","pink"],["full-sun","part-sun"],"moderate",["loam"],12,18,["pollinator","deer-resistant","container","edible"],"Cheerful purple pom-pom flowers on a kitchen staple. Edible blooms make any salad Instagram-worthy.",["Lavender","Sage","Catmint"]),
  p("Oregano","Origanum vulgare","perennial",[6,7,8],[4,5,6,7,8,9],["pink","purple"],["full-sun"],"low",["sandy","loam","poor"],12,24,["pollinator","deer-resistant","fragrant","container","edible"],"Tiny flowers are a pollinator magnet when allowed to bloom. Let a patch go to flower for the bees.",["Lavender","Thyme","Sage"]),
  p("Culinary Sage","Salvia officinalis","perennial",[5,6],[4,5,6,7,8],["purple","blue"],["full-sun"],"low",["sandy","loam"],18,24,["pollinator","deer-resistant","fragrant","container","edible"],"Spiky purple blooms above silver-green aromatic foliage. A kitchen herb that doubles as an ornamental.",["Lavender","Rosemary","Oregano"]),
  p("Borage","Borago officinalis","annual",[6,7,8,9],[2,3,4,5,6,7,8,9,10,11],["blue"],["full-sun"],"low",["sandy","loam"],18,36,["pollinator","edible","container"],"Star-shaped electric blue flowers that bees go absolutely wild for. Self-sows freely.",["Tomato","Squash","Strawberry"]),
  p("Chamomile","Matricaria chamomilla","annual",[5,6,7,8],[3,4,5,6,7,8,9],["white","yellow"],["full-sun"],"low",["sandy","loam","poor"],12,24,["pollinator","fragrant","edible","container"],"Tiny daisy flowers with apple-scented foliage. Brew into tea or let it naturalize between pavers.",["Lavender","Sage","Chives"]),
  p("Feverfew","Tanacetum parthenium","perennial",[6,7,8],[5,6,7,8,9],["white"],["full-sun","part-sun"],"low",["loam","sandy"],18,24,["pollinator","deer-resistant","cut-flower","container"],"Clusters of small white daisies that bloom for weeks. Historic medicinal herb that self-sows readily.",["Lavender","Catmint","Salvia"]),
  p("Wild Bergamot","Monarda fistulosa","perennial",[7,8],[3,4,5,6,7,8,9],["lavender","purple"],["full-sun","part-sun"],"low",["loam","sandy","poor"],24,48,["pollinator","native","deer-resistant","fragrant"],"The wild cousin of bee balm. Lavender puffs alive with pollinators. Tougher and more mildew-resistant.",["Coneflower","Black-Eyed Susan","Ornamental Grass"]),
  p("Anise Hyssop","Agastache foeniculum","perennial",[7,8,9],[4,5,6,7,8,9],["purple","blue","lavender"],["full-sun"],"low",["sandy","loam"],24,36,["pollinator","deer-resistant","fragrant","edible","container"],"Lavender-blue spikes with licorice-scented foliage. A pollinator powerhouse that blooms for months.",["Coneflower","Catmint","Ornamental Grass"]),
  // =====================
  // NATIVE SPECIES BY REGION
  // =====================
  // --- California ---
  p("California Poppy","Eschscholzia californica","annual",[3,4,5,6,7,8,9],[5,6,7,8,9,10],["orange","yellow"],["full-sun"],"low",["sandy","poor"],6,18,["native","deer-resistant","low-maintenance"],"Golden cups that carpet hillsides across the state. Closes at night and on cloudy days.",["Lavender","Salvia","Catmint"]),
  p("Matilija Poppy","Romneya coulteri","perennial",[5,6,7],[7,8,9,10],["white"],["full-sun"],"low",["sandy","poor"],48,96,["native","deer-resistant","fragrant"],"Enormous fried-egg flowers on blue-gray stems. California's largest native wildflower. Spreads aggressively.",["Salvia","Ceanothus","Lavender"]),
  p("California Lilac","Ceanothus thyrsiflorus","shrub",[3,4,5],[8,9,10],["blue"],["full-sun"],"low",["sandy"],48,144,["native","pollinator","deer-resistant"],"Electric blue flower clusters on an evergreen California native. Hummingbird and bee magnet.",["Manzanita","California Poppy","Salvia"]),
  p("Manzanita","Arctostaphylos densiflora","shrub",[1,2,3],[7,8,9,10],["pink","white"],["full-sun"],"low",["sandy","poor"],24,72,["native","pollinator","deer-resistant","evergreen"],"Smooth red bark with urn-shaped flowers that feed hummingbirds in late winter. Sculptural beauty.",["California Lilac","Salvia","California Poppy"]),
  // --- Southwest ---
  p("Desert Marigold","Baileya multiradiata","perennial",[3,4,5,6,7,8,9,10],[7,8,9,10,11],["yellow"],["full-sun"],"low",["sandy","poor"],12,18,["native","deer-resistant","low-maintenance"],"Cheerful desert wildflower that blooms almost year-round in warm climates. Thrives on neglect.",["Penstemon","Salvia","Agave"]),
  p("Firecracker Penstemon","Penstemon eatonii","perennial",[4,5,6],[4,5,6,7,8,9],["red"],["full-sun"],"low",["sandy","poor"],18,36,["native","pollinator","deer-resistant","hummingbird"],"Spikes of scarlet tubular flowers that hummingbirds fight over. Southwestern native at its finest.",["Desert Marigold","Salvia","Agave"]),
  p("Century Plant","Agave americana","perennial",[6,7],[8,9,10,11],["yellow"],["full-sun"],"low",["sandy","poor"],24,48,["deer-resistant","low-maintenance"],"Grows for decades, then sends up a massive flower stalk up to 20 feet tall before dying. Worth the wait.",["Yucca","Desert Marigold","Penstemon"]),
  // --- Pacific Northwest ---
  p("Pacific Bleeding Heart","Dicentra formosa","perennial",[4,5,6,7,8],[3,4,5,6,7,8,9],["pink"],["part-shade","full-shade"],"moderate",["loam"],12,18,["native","deer-resistant","low-maintenance","ground-cover"],"Western native that blooms much longer than its eastern cousin. Ferny foliage all season.",["Hosta","Fern","Solomon's Seal"]),
  p("Oregon Grape","Mahonia aquifolium","shrub",[3,4],[5,6,7,8,9],["yellow"],["part-shade","full-shade"],"low",["loam","clay"],36,72,["native","pollinator","deer-resistant","evergreen"],"Holly-like evergreen with yellow flower clusters followed by blue berries. Tough, shade-loving native.",["Fern","Hosta","Bleeding Heart"]),
  p("Salal","Gaultheria shallon","shrub",[5,6],[6,7,8,9],["pink","white"],["part-shade","full-shade"],"moderate",["loam","sandy"],24,60,["native","deer-resistant","evergreen"],"Leathery evergreen groundcover of Pacific Northwest forests. Urn-shaped flowers lead to edible berries.",["Oregon Grape","Fern","Hosta"]),
  // --- Southeast ---
  p("American Beautyberry","Callicarpa americana","shrub",[6,7],[5,6,7,8],["pink","lavender"],["full-sun","part-sun"],"moderate",["loam","sandy"],48,72,["native","pollinator"],"Inconspicuous flowers give way to stunning clusters of magenta-purple berries in fall. The berries are the show.",["Oakleaf Hydrangea","Amsonia","Coneflower"]),
  p("Oakleaf Hydrangea","Hydrangea quercifolia","shrub",[6,7],[5,6,7,8,9],["white"],["part-sun","part-shade"],"moderate",["loam","clay"],48,96,["native","cut-flower","deer-resistant"],"Oak-shaped leaves turn burgundy in fall. White cone blooms age to pink. Four-season native shrub.",["Hosta","Fern","Astilbe"]),
  p("Bottlebrush Buckeye","Aesculus parviflora","shrub",[6,7],[4,5,6,7,8],["white"],["part-sun","part-shade"],"moderate",["loam","clay"],96,144,["native","pollinator","deer-resistant"],"Massive suckering shrub with foot-long white flower candles. Showpiece for large shade gardens.",["Oakleaf Hydrangea","Hosta","Fern"]),
  // =====================
  // SUCCULENTS
  // =====================
  p("Hens and Chicks","Sempervivum tectorum","perennial",[6,7],[3,4,5,6,7,8],["pink","red"],["full-sun"],"low",["sandy","poor"],3,6,["deer-resistant","low-maintenance","container","ground-cover"],"Tight rosettes that multiply by producing offsets. The mother plant flowers once, then dies, replaced by chicks.",["Sedum","Creeping Thyme","Armeria"]),
  p("Echeveria","Echeveria elegans","perennial",[5,6,7],[9,10,11],["orange","pink"],["full-sun"],"low",["sandy","poor"],6,12,["deer-resistant","container","low-maintenance"],"Perfect rosettes in blue, green, pink, and purple. Bell-shaped flowers on arching stems. Frost-tender.",["Sedum","Agave","Aeonium"]),
  p("Ice Plant","Delosperma cooperi","perennial",[6,7,8,9],[5,6,7,8,9,10],["pink","purple","orange","yellow"],["full-sun"],"low",["sandy","poor"],3,6,["ground-cover","deer-resistant","low-maintenance","container"],"Neon-bright daisy flowers that shimmer in the sun over succulent foliage. Thrives in hot, dry rock gardens.",["Sedum","Hens and Chicks","Armeria"]),
  p("Aeonium","Aeonium arboreum","perennial",[5,6],[9,10,11],["yellow"],["full-sun","part-sun"],"low",["sandy"],24,36,["deer-resistant","container"],"Dramatic rosettes on woody stems. 'Zwartkop' variety has near-black leaves. Stunning in containers.",["Echeveria","Agave","Sedum"]),
  p("Yucca","Yucca filamentosa","perennial",[6,7],[4,5,6,7,8,9,10],["white"],["full-sun"],"low",["sandy","poor"],48,96,["native","deer-resistant","low-maintenance"],"Sword-like evergreen foliage sends up dramatic stalks of white bells. Tough, architectural, underrated.",["Ornamental Grass","Sedum","Lavender"]),
  p("Coral Aloe","Aloe striata","perennial",[2,3,4],[9,10,11],["orange","red"],["full-sun"],"low",["sandy","poor"],18,24,["deer-resistant","container","hummingbird"],"Flat coral-orange rosettes produce vivid flower stalks in late winter. One of the hardiest aloes.",["Echeveria","Agave","Aeonium"]),
  // =====================
  // WATER AND BOG PLANTS
  // =====================
  p("Water Lily","Nymphaea","perennial",[6,7,8,9],[4,5,6,7,8,9,10],["white","pink","yellow"],["full-sun"],"high",["clay"],1,6,["fragrant","pollinator"],"Floating jewels that transform any pond. Pads provide shade for fish while flowers dazzle above.",["Lotus","Pickerelweed","Japanese Iris"]),
  p("Sacred Lotus","Nelumbo nucifera","perennial",[7,8],[4,5,6,7,8,9,10],["pink","white"],["full-sun"],"high",["clay"],36,60,["fragrant"],"Massive blooms rise above umbrella leaves in shallow water. Seedpods are as ornamental as the flowers.",["Water Lily","Japanese Iris","Marsh Marigold"]),
  p("Japanese Iris","Iris ensata","perennial",[6,7],[4,5,6,7,8,9],["purple","blue","white"],["full-sun","part-sun"],"high",["clay","loam"],24,36,["cut-flower","deer-resistant"],"Huge, flat, ruffled blooms up to 10 inches across. Needs consistent moisture, especially during bloom.",["Hosta","Astilbe","Ligularia"]),
  p("Marsh Marigold","Caltha palustris","perennial",[4,5],[3,4,5,6,7],["yellow"],["full-sun","part-sun"],"high",["clay","loam"],12,18,["native","pollinator"],"Glossy buttercup flowers in early spring along streams and wet areas. One of the first wetland bloomers.",["Japanese Iris","Fern","Astilbe"]),
  p("Pickerelweed","Pontederia cordata","perennial",[6,7,8,9],[3,4,5,6,7,8,9,10],["purple","blue"],["full-sun","part-sun"],"high",["clay"],24,36,["native","pollinator"],"Spikes of violet-blue flowers above glossy arrow-shaped leaves. Native pond and stream bank staple.",["Water Lily","Japanese Iris","Marsh Marigold"]),
  // =====================
  // ORNAMENTAL TREES
  // =====================
  p("Japanese Maple","Acer palmatum","tree",[4,5],[5,6,7,8],["red"],["part-sun","part-shade"],"moderate",["loam"],96,300,["deer-resistant"],"Small flowers are modest but foliage is the star. Hundreds of cultivars from laceleaf to upright. The connoisseur's tree.",["Hosta","Fern","Azalea"]),
  p("Serviceberry","Amelanchier canadensis","tree",[3,4],[4,5,6,7,8],["white"],["full-sun","part-sun"],"moderate",["loam","clay"],120,300,["native","pollinator","edible"],"White spring clouds, edible berries, and blazing fall color. Four-season native tree that deserves more attention.",["Fern","Hosta","Bleeding Heart"]),
  p("Stewartia","Stewartia pseudocamellia","tree",[6,7],[5,6,7,8],["white"],["part-sun","part-shade"],"moderate",["loam"],120,360,["deer-resistant"],"Camellia-like white flowers, exfoliating bark, and crimson fall color. The four-season tree professionals love.",["Japanese Maple","Hosta","Fern"]),
  p("Smoke Tree","Cotinus coggygria","tree",[6,7],[4,5,6,7,8],["pink"],["full-sun"],"low",["loam","sandy","poor"],120,180,["deer-resistant","low-maintenance"],"Airy pink flower plumes create a smoke-like haze around the canopy. 'Royal Purple' has burgundy foliage.",["Russian Sage","Ornamental Grass","Catmint"]),
  p("Fringe Tree","Chionanthus virginicus","tree",[5,6],[4,5,6,7,8,9],["white"],["full-sun","part-sun"],"moderate",["loam","clay"],120,240,["native","fragrant","deer-resistant","pollinator"],"Clouds of white fringed petals dripping from branches in late spring. Fragrant and underused native.",["Serviceberry","Hosta","Fern"]),
  p("Prairifire Crabapple","Malus 'Prairifire'","tree",[4,5],[4,5,6,7,8],["pink","red"],["full-sun"],"moderate",["loam","clay"],120,240,["pollinator"],"Deep pink-red flowers on a disease-resistant crabapple. Persistent small fruit feeds winter birds.",["Serviceberry","Ornamental Grass","Catmint"]),
  p("Hawthorn","Crataegus viridis 'Winter King'","tree",[5],[4,5,6,7],["white"],["full-sun"],"moderate",["loam","clay"],120,300,["native","pollinator"],"White spring flowers, glossy red fruit, and exfoliating bark. Thorny but beautiful native with winter interest.",["Serviceberry","Crabapple","Ornamental Grass"]),
  v("Arnold Promise Witch Hazel","Hamamelis x intermedia 'Arnold Promise'","tree",[2,3],[5,6,7,8],["yellow"],["full-sun","part-sun"],"moderate",["loam"],120,180,["fragrant","deer-resistant"],"Spidery yellow flowers with sweet fragrance on bare branches in late winter. The earliest tree to bloom.",["Snowdrop","Crocus","Hellebore"],"Witch Hazel","Arnold Promise"),
  p("Golden Rain Tree","Koelreuteria paniculata","tree",[6,7],[5,6,7,8,9],["yellow"],["full-sun"],"low",["loam","sandy","clay"],180,360,["low-maintenance"],"Showers of small yellow flowers followed by papery lantern-like seed pods. Tolerates tough urban conditions.",["Ornamental Grass","Catmint","Salvia"]),
  // =====================
  // ROCK GARDEN PLANTS
  // =====================
  p("Aubrieta","Aubrieta deltoidea","perennial",[4,5],[4,5,6,7,8],["purple","blue","pink"],["full-sun"],"low",["sandy","loam"],4,8,["deer-resistant","ground-cover","low-maintenance","container"],"Purple cascades spilling over walls and rocks in spring. Shear after bloom for a fresh flush of foliage.",["Creeping Phlox","Armeria","Basket-of-Gold"]),
  p("Sea Thrift","Armeria maritima","perennial",[4,5,6],[3,4,5,6,7,8],["pink"],["full-sun"],"low",["sandy","poor"],6,12,["deer-resistant","low-maintenance","container","ground-cover","native"],"Grassy tufts topped with round pink pom-poms. Loves lean soil and coastal conditions.",["Sedum","Aubrieta","Creeping Phlox"]),
  p("Lewisia","Lewisia cotyledon","perennial",[5,6],[4,5,6,7,8],["pink","orange","yellow"],["full-sun","part-sun"],"low",["sandy"],6,12,["deer-resistant","container"],"Succulent rosettes with brilliant striped flowers in hot sunset colors. Must have perfect drainage or it rots.",["Sedum","Hens and Chicks","Saxifrage"]),
  p("Saxifrage","Saxifraga","perennial",[4,5],[4,5,6,7],["pink","white"],["part-sun","part-shade"],"moderate",["sandy","loam"],4,12,["deer-resistant","container","ground-cover"],"Mossy cushions dotted with dainty flowers. Tucks into rock crevices where little else will grow.",["Lewisia","Aubrieta","Hens and Chicks"]),
  p("Draba","Draba aizoides","perennial",[3,4],[4,5,6,7],["yellow"],["full-sun"],"low",["sandy","poor"],2,4,["deer-resistant","low-maintenance"],"Tiny alpine cushion plant smothered in bright yellow flowers in early spring. Perfect miniature scale.",["Saxifrage","Aubrieta","Hens and Chicks"]),
  p("Trumpet Gentian","Gentiana acaulis","perennial",[5,6],[3,4,5,6,7],["blue"],["full-sun","part-sun"],"moderate",["loam"],4,8,["deer-resistant","container"],"Intense, almost electric blue trumpet flowers on a low mat. The holy grail of alpine gardeners.",["Saxifrage","Draba","Lewisia"]),
  p("Basket-of-Gold","Aurinia saxatilis","perennial",[4,5],[3,4,5,6,7],["yellow"],["full-sun"],"low",["sandy","poor"],6,12,["deer-resistant","low-maintenance","ground-cover"],"Bright golden-yellow cascades over walls and rock edges in spring. Cut back after flowering to stay tidy.",["Aubrieta","Creeping Phlox","Armeria"]),
  // =====================
  // MORE ANNUALS
  // =====================
  p("Calibrachoa","Calibrachoa hybrid","annual",[5,6,7,8,9,10],[9,10,11],["pink","purple","yellow","orange","red","white"],["full-sun"],"moderate",["loam","sandy"],6,12,["container","low-maintenance","reblooming"],"Mini petunias that bloom nonstop in hanging baskets. Dozens of color options and no deadheading needed.",["Petunia","Verbena","Lobelia"]),
  p("Tall Verbena","Verbena bonariensis","annual",[6,7,8,9,10],[7,8,9,10,11],["purple"],["full-sun"],"low",["sandy","loam"],36,48,["pollinator","cut-flower","deer-resistant"],"Wiry stems topped with purple clusters that butterflies can't resist. See-through plant for layering.",["Ornamental Grass","Coneflower","Salvia"]),
  p("Coleus","Coleus scutellarioides","annual",[7,8],[10,11],["green","purple","pink"],["part-shade","part-sun"],"moderate",["loam"],12,36,["container","low-maintenance"],"Grown for kaleidoscopic foliage, not flowers. Pinch blooms to keep energy in the leaves.",["Begonia","Impatiens","Fern"]),
  p("Wax Begonia","Begonia semperflorens","annual",[5,6,7,8,9,10],[8,9,10,11],["pink","red","white"],["part-sun","part-shade"],"moderate",["loam"],8,12,["container","low-maintenance","reblooming"],"Glossy leaves and nonstop flowers in sun or shade. One of the most reliable bedding plants anywhere.",["Coleus","Impatiens","Lobelia"]),
  p("Celosia","Celosia argentea","annual",[6,7,8,9,10],[2,3,4,5,6,7,8,9,10,11],["red","orange","yellow","pink"],["full-sun"],"moderate",["loam"],12,36,["cut-flower","deer-resistant","container"],"Flame-shaped or crested flowers in electric colors that dry beautifully. Heat lovers that thrive in summer.",["Zinnia","Marigold","Salvia"]),
  p("Cleome","Cleome hassleriana","annual",[6,7,8,9],[2,3,4,5,6,7,8,9,10,11],["pink","purple","white"],["full-sun"],"low",["loam","sandy"],36,60,["pollinator","cut-flower","deer-resistant"],"Spider-flower with whisker-like stamens and airy blooms. Tall, dramatic annual that self-sows freely.",["Zinnia","Coneflower","Ornamental Grass"]),
  p("Flowering Tobacco","Nicotiana alata","annual",[6,7,8,9],[2,3,4,5,6,7,8,9,10,11],["white","pink","green"],["full-sun","part-sun"],"moderate",["loam"],24,48,["fragrant","pollinator","hummingbird"],"Tubular flowers that release sweet fragrance at dusk. A cottage garden classic that attracts moths and hummingbirds.",["Petunia","Verbena","Salvia"]),
  p("Indian Summer Rudbeckia","Rudbeckia hirta 'Indian Summer'","annual",[7,8,9],[3,4,5,6,7],["yellow","orange"],["full-sun"],"low",["loam","clay","sandy"],24,36,["pollinator","native","cut-flower","deer-resistant"],"Massive 6-9 inch golden daisies on a short-lived plant. Bigger and bolder than perennial black-eyed susans.",["Coneflower","Ornamental Grass","Salvia"]),
  p("Scarlet Sage","Salvia splendens","annual",[6,7,8,9,10],[2,3,4,5,6,7,8,9,10,11],["red"],["full-sun","part-sun"],"moderate",["loam"],12,24,["hummingbird","container","reblooming"],"Electric red spikes that hummingbirds zero in on. Common bedding plant that earns its spot every year.",["Petunia","Marigold","Zinnia"]),
  p("Pelargonium","Pelargonium x hortorum","annual",[5,6,7,8,9,10],[9,10,11],["red","pink","white","orange"],["full-sun"],"moderate",["loam","sandy"],12,18,["container","cut-flower","deer-resistant","reblooming"],"The classic window-box geranium. Ball-shaped flower clusters above scalloped leaves. Tough container staple.",["Petunia","Calibrachoa","Verbena"]),
  // =====================
  // =====================
  p("Sweet Pea","Lathyrus odoratus","annual",[4,5,6],[2,3,4,5,6,7,8,9,10,11],["pink","purple","white","red","lavender"],["full-sun"],"moderate",["loam"],48,72,["fragrant","cut-flower","container"],"Ruffled, intensely fragrant climbing flowers in every pastel shade. Cool-season annual that hates heat.",["Clematis","Rose","Snapdragon"]),
  p("Crocosmia","Crocosmia 'Lucifer'","bulb",[7,8],[5,6,7,8,9],["red","orange"],["full-sun","part-sun"],"moderate",["loam","sandy"],24,36,["hummingbird","cut-flower","deer-resistant"],"Arching sprays of fiery red-orange that hummingbirds go crazy for. Sword-like foliage adds structure.",["Ornamental Grass","Catmint","Coneflower"]),
  p("Helenium","Helenium autumnale","perennial",[8,9,10],[3,4,5,6,7,8],["yellow","orange","red"],["full-sun"],"moderate",["loam","clay"],36,60,["native","pollinator","cut-flower","deer-resistant"],"Warm-toned daisy-like flowers with raised centers bloom as summer turns to fall. Loves moist soil.",["Aster","Goldenrod","Joe Pye Weed"]),
  p("Lenten Rose","Helleborus orientalis","perennial",[2,3,4],[4,5,6,7,8,9],["purple","pink","white","green"],["part-shade","full-shade"],"moderate",["loam","clay"],12,18,["deer-resistant","evergreen","low-maintenance"],"Nodding flowers in late winter when nothing else is blooming. Evergreen foliage adds year-round structure to shade gardens.",["Snowdrop","Crocus","Brunnera"]),

  // =====================
  // SPRING BULBS (v1.9)
  // =====================
  p("Camassia","Camassia leichtlinii","bulb",[4,5,6],[3,4,5,6,7,8],["blue","white"],["full-sun","part-sun"],"moderate",["loam","clay"],24,36,["pollinator","low-maintenance"],"Tall spikes of starry flowers rise above strappy foliage in late spring.",["Allium","Dutch Iris","Prairie Dropseed"]),
  p("Persian Buttercup","Ranunculus asiaticus","bulb",[3,4,5],[8,9,10,11],["pink","red","yellow","white","orange"],["full-sun"],"moderate",["loam","sandy"],12,24,["cut-flower","container"],"Ruffled, rose-like blooms in vivid colors brighten cool spring beds and pots.",["Tulip","Anemone de Caen","Sweet Alyssum"]),
  p("Anemone de Caen","Anemone coronaria 'De Caen'","bulb",[3,4,5],[7,8,9,10],["blue","red","white","pink"],["full-sun","part-sun"],"moderate",["loam","sandy"],8,12,["cut-flower","pollinator"],"Poppy-like flowers in jewel tones bloom in mid-spring over ferny foliage.",["Persian Buttercup","Dutch Iris","Chamomile"]),
  p("Dutch Iris","Iris x hollandica","bulb",[5,6],[5,6,7,8,9],["blue","yellow","white","purple"],["full-sun"],"moderate",["loam","sandy"],18,24,["cut-flower","low-maintenance"],"Slender stems bear elegant iris blooms in late spring to early summer.",["Tulip","Allium","Shasta Daisy"]),
  v("Emily McKenzie Crocosmia","Crocosmia x crocosmiiflora 'Emily McKenzie'","bulb",[7,8,9],[5,6,7,8,9],["orange","red"],["full-sun","part-sun"],"moderate",["loam","sandy","clay"],24,30,["hummingbird","pollinator","cut-flower","deer-resistant"],"Bold orange blooms with red throats appear on graceful arching stems in late summer.",["Salvia","Catmint","Coneflower"],"Crocosmia","Emily McKenzie"),
  p("Tuberose","Polianthes tuberosa","bulb",[7,8,9],[7,8,9,10],["white"],["full-sun"],"moderate",["loam","sandy"],24,36,["fragrant","cut-flower","container"],"Tall summer spikes of waxy white blooms release powerful evening fragrance.",["Zinnia","Dahlia","Salvia"]),

  // =====================
  // NATIVE SPECIES (v1.9)
  // =====================
  p("Prairie Dock","Silphium terebinthinaceum","perennial",[7,8,9],[3,4,5,6,7,8],["yellow"],["full-sun"],"low",["clay","loam","poor"],48,96,["native","pollinator","low-maintenance"],"Huge basal leaves and tall stalks topped with yellow daisies give strong prairie structure.",["Little Bluestem","Coneflower","Liatris"]),
  p("Showy Goldenrod","Solidago speciosa","perennial",[8,9,10],[3,4,5,6,7,8],["yellow"],["full-sun"],"low",["poor","loam","sandy"],24,48,["native","pollinator","deer-resistant","low-maintenance"],"Upright spikes of bright yellow flowers feed late-season pollinators on dry prairies.",["Aster","Liatris","Little Bluestem"]),
  p("Purple Prairie Clover","Dalea purpurea","perennial",[6,7,8],[3,4,5,6,7,8],["purple"],["full-sun"],"low",["poor","sandy","loam"],12,24,["native","pollinator","low-maintenance"],"Brushy purple flower spikes rise over fine foliage and feed prairie pollinators.",["Little Bluestem","Coneflower","Yarrow"]),
  p("Compass Plant","Silphium laciniatum","perennial",[7,8,9],[3,4,5,6,7,8],["yellow"],["full-sun"],"low",["poor","loam","clay"],60,108,["native","pollinator","low-maintenance"],"Tall stems with large yellow daisies tower over deeply cut basal leaves that align north-south.",["Switchgrass","Prairie Dropseed","Liatris"]),
  p("Shooting Star","Dodecatheon meadia","perennial",[4,5,6],[4,5,6,7,8],["pink","white"],["part-sun","part-shade"],"moderate",["loam"],6,18,["native","pollinator"],"Nodding flowers with swept-back petals resemble tiny shooting stars in spring meadows.",["Wild Geranium","Columbine","Trillium"]),
  p("Rocky Mountain Columbine","Aquilegia caerulea","perennial",[5,6,7],[3,4,5,6,7,8],["blue","white"],["full-sun","part-sun"],"moderate",["loam","sandy"],18,24,["native","pollinator"],"Large blue-and-white spurred flowers bloom in late spring above lacy foliage.",["Penstemon","Blue Flax","Serviceberry"]),
  p("Indian Paintbrush","Castilleja indivisa","annual",[4,5,6],[4,5,6,7,8,9],["red","orange"],["full-sun"],"moderate",["poor","sandy","loam"],6,24,["native","pollinator"],"Bright red to orange bracts surround small flowers and glow across spring prairies.",["Little Bluestem","Tickseed","Blanket Flower"]),
  p("Coral Bean","Erythrina herbacea","shrub",[4,5,6],[7,8,9,10],["red"],["full-sun","part-sun"],"low",["sandy","loam"],36,96,["native","pollinator","hummingbird"],"Bold spikes of tubular red flowers in spring attract hummingbirds before bean pods form.",["Lantana","Pink Muhly Grass","Salvia"]),
  p("Blue Grama Grass","Bouteloua gracilis","grass",[7,8,9],[3,4,5,6,7,8,9,10],["green"],["full-sun"],"low",["poor","sandy","loam"],8,18,["native","low-maintenance","ground-cover"],"Short clumping grass with distinctive eyebrow-shaped seed heads thrives in dry soils.",["Prairie Dropseed","Coneflower","Yarrow"]),
  p("Rocky Mountain Penstemon","Penstemon strictus","perennial",[5,6,7],[3,4,5,6,7,8],["blue","purple"],["full-sun"],"low",["sandy","poor","loam"],18,30,["native","pollinator","hummingbird","deer-resistant"],"Spikes of deep blue tubular flowers rise above glossy evergreen foliage in early summer.",["Blue Grama Grass","Blanket Flower","Sedum"]),
  p("Blue Flax","Linum lewisii","perennial",[5,6,7],[4,5,6,7,8,9],["blue"],["full-sun"],"low",["poor","sandy","loam"],12,24,["native","pollinator","low-maintenance"],"Delicate sky-blue flowers open each morning on airy stems over fine foliage.",["Penstemon","Prairie Dropseed","Yarrow"]),
  p("Gulf Coast Penstemon","Penstemon tenuis","perennial",[3,4,5],[7,8,9],["lavender","pink"],["part-sun","part-shade"],"moderate",["loam","clay"],18,30,["native","pollinator","hummingbird"],"Nodding tubular flowers in soft lavender shades brighten moist woods of the Gulf Coast.",["Coral Bells","Tickseed","Solomon's Seal"]),
  p("Texas Blue Star","Amsonia ciliata var. texana","perennial",[4,5],[6,7,8,9,10],["blue"],["full-sun","part-sun"],"low",["sandy","loam"],18,30,["native","low-maintenance","pollinator"],"Fine foliage and pale blue starry flowers are followed by golden fall color.",["Little Bluestem","Coneflower","Tickseed"]),
  p("Little Bluestem","Schizachyrium scoparium","grass",[8,9,10],[3,4,5,6,7,8,9],["green"],["full-sun"],"low",["poor","sandy","loam"],24,48,["native","low-maintenance","winter-interest"],"Upright clumps turn coppery orange in fall and stand well through winter.",["Coneflower","Aster","Yarrow"]),
  p("California Fuchsia","Epilobium canum","perennial",[8,9,10],[8,9,10],["red","orange"],["full-sun"],"low",["sandy","poor","loam"],12,24,["native","hummingbird","low-maintenance"],"Low mounds of gray foliage are covered in tubular red-orange flowers in late summer.",["Yarrow","Blue Grama Grass","Salvia"]),
  p("Mexican Hat","Ratibida columnifera","perennial",[6,7,8,9],[4,5,6,7,8,9],["yellow","red"],["full-sun"],"low",["poor","sandy","loam"],12,36,["native","pollinator","low-maintenance"],"Distinctive sombrero-like flowers sway on wiry stems in summer prairies.",["Little Bluestem","Tickseed","Blanket Flower"]),

  // =====================
  // TROPICAL / SUBTROPICAL (v1.9)
  // =====================
  p("Hawaiian Hibiscus","Hibiscus rosa-sinensis","shrub",[3,4,5,6,7,8,9,10,11],[9,10,11],["red","yellow","orange","pink"],["full-sun","part-sun"],"moderate",["loam","sandy"],36,96,["container","evergreen","hummingbird"],"Large tropical blooms in vivid colors appear repeatedly from spring through fall.",["Mandevilla","Plumeria","Lantana"]),
  p("Angel's Trumpet","Brugmansia suaveolens","shrub",[5,6,7,8,9,10],[9,10,11],["white","yellow","pink"],["full-sun","part-sun"],"high",["loam","sandy"],72,180,["fragrant","container","evergreen"],"Huge pendant trumpets release intense evening fragrance over a long warm-season bloom.",["Hawaiian Hibiscus","Plumeria","Lantana"]),
  p("Mandevilla","Mandevilla splendens","vine",[5,6,7,8,9,10],[9,10,11],["red","pink"],["full-sun","part-sun"],"moderate",["loam","sandy"],36,120,["container","evergreen","hummingbird"],"Glossy vines are covered in showy trumpet flowers from early summer to frost in warm climates.",["Hawaiian Hibiscus","Lantana","Bougainvillea"]),
  p("Pink Dipladenia","Mandevilla sanderi","shrub",[5,6,7,8,9,10],[9,10,11],["pink"],["full-sun","part-sun"],"moderate",["loam","sandy"],18,36,["container","evergreen","hummingbird"],"Bushy form with glossy foliage and abundant pink trumpets suited to pots and borders.",["Mandevilla","Hawaiian Hibiscus","Lantana"]),
  v("White Plumeria","Plumeria rubra 'Singapore White'","tree",[5,6,7,8,9,10],[10,11],["white","yellow"],["full-sun"],"moderate",["sandy","loam"],72,180,["fragrant","container","evergreen"],"Highly fragrant white flowers with yellow centers appear in clusters on succulent branches.",["Hawaiian Hibiscus","Bird of Paradise","Mandevilla"],"Plumeria","Singapore White"),
  v("Pink Plumeria","Plumeria rubra 'Pink'","tree",[5,6,7,8,9,10],[10,11],["pink","yellow"],["full-sun"],"moderate",["sandy","loam"],72,180,["fragrant","container","evergreen"],"Clusters of pink, sweetly scented blooms cover this classic tropical tree in summer.",["Hawaiian Hibiscus","Mandevilla","Angel's Trumpet"],"Plumeria","Pink"),

  // =====================
  // FRAGRANT PLANTS (v1.9)
  // =====================
  p("Gardenia","Gardenia jasminoides","shrub",[5,6,7,8],[8,9,10,11],["white"],["full-sun","part-sun"],"moderate",["loam"],24,72,["fragrant","evergreen","container"],"Glossy evergreen foliage frames intensely fragrant white flowers from late spring into summer.",["Azalea","Camellia","Hosta"]),
  p("Sweet Olive","Osmanthus fragrans","shrub",[9,10,11,3,4],[8,9,10,11],["white","yellow"],["full-sun","part-sun"],"moderate",["loam"],72,120,["fragrant","evergreen","low-maintenance"],"Small clustered flowers perfume the garden with an apricot-like scent over a long season.",["Camellia","Gardenia","Azalea"]),
  p("Winter Daphne","Daphne odora","shrub",[2,3],[7,8,9],["pink","white"],["part-shade","part-sun"],"moderate",["loam"],24,48,["fragrant","evergreen"],"Clusters of pink buds open to white, intensely scented blooms in late winter.",["Hellebore","Camellia","Lenten Rose"]),
  p("Mock Orange","Philadelphus coronarius","shrub",[5,6],[4,5,6,7,8],["white"],["full-sun","part-sun"],"moderate",["loam","clay"],72,120,["fragrant","cut-flower"],"Arching stems carry orange-blossom-scented white flowers in late spring.",["Weigela","Spirea","Lilac"]),

  // =====================
  // ORNAMENTAL GRASSES (v1.9)
  // =====================
  p("Karl Foerster Feather Reed Grass","Calamagrostis x acutiflora 'Karl Foerster'","grass",[6,7,8],[4,5,6,7,8,9],["green"],["full-sun","part-sun"],"low",["loam","clay"],24,60,["low-maintenance","winter-interest"],"Strong vertical plumes emerge in early summer and persist as tawny stems through winter.",["Coneflower","Russian Sage","Yarrow"]),
  p("Pink Muhly Grass","Muhlenbergia capillaris","grass",[9,10,11],[6,7,8,9,10],["pink"],["full-sun"],"low",["sandy","loam","poor"],18,36,["low-maintenance","winter-interest","ground-cover"],"Billowing pink seed clouds float over fine foliage in autumn and remain attractive dried.",["Little Bluestem","Black-Eyed Susan","Sedum"]),
  p("Blue Oat Grass","Helictotrichon sempervirens","grass",[6,7],[4,5,6,7,8,9],["blue"],["full-sun"],"low",["loam","sandy"],18,30,["evergreen","low-maintenance"],"Compact clumps of steel-blue blades provide year-round color and texture.",["Lavender","Salvia","Yarrow"]),
  p("Japanese Forest Grass","Hakonechloa macra 'Aureola'","grass",[8,9],[5,6,7,8,9],["green"],["part-shade","part-sun"],"moderate",["loam"],12,18,["container","ground-cover","low-maintenance"],"Arching variegated leaves form graceful cascades and brighten shady spots.",["Hosta","Japanese Painted Fern","Coral Bells"]),
  p("Prairie Dropseed","Sporobolus heterolepis","grass",[8,9],[3,4,5,6,7,8,9],["green"],["full-sun"],"low",["poor","loam","sandy"],18,30,["native","low-maintenance","winter-interest","ground-cover"],"Fine-textured mounds send up airy fragrant flower sprays that persist into winter.",["Coneflower","Liatris","Tickseed"]),

  // =====================
  // EDIBLE-ORNAMENTAL (v1.9)
  // =====================
  p("Globe Artichoke","Cynara cardunculus var. scolymus","perennial",[6,7,8],[7,8,9,10,11],["purple","green"],["full-sun"],"moderate",["loam","sandy"],36,60,["edible","pollinator"],"Bold silvery foliage and large thistle-like buds are both decorative and edible.",["Lavender","Rosemary","Yarrow"]),
  p("Rhubarb","Rheum rhabarbarum","perennial",[5,6],[3,4,5,6,7,8],["green"],["full-sun","part-sun"],"moderate",["loam","clay"],24,48,["edible","low-maintenance"],"Huge leaves and thick red stalks give a lush look while supplying tart harvests.",["Chives","Bee Balm","Hosta"]),

  // =====================
  // FLOWERING FRUIT TREES (v1.9)
  // =====================
  p("Yoshino Cherry","Prunus x yedoensis","tree",[3,4],[5,6,7,8],["white","pink"],["full-sun","part-sun"],"moderate",["loam"],240,480,["edible","pollinator"],"Clouds of pale blossoms cover the tree in early spring, later followed by small bird-edible cherries.",["Serviceberry","Eastern Redbud","Dogwood"]),
  p("Fruiting Cherry","Prunus avium","tree",[4,5],[5,6,7,8],["white"],["full-sun"],"moderate",["loam"],240,480,["edible","pollinator"],"Showy white spring flowers mature into sweet cherries that attract people and wildlife.",["Yoshino Cherry","Apple","Peach"]),
  p("Apple","Malus domestica","tree",[4,5],[3,4,5,6,7,8],["white","pink"],["full-sun"],"moderate",["loam","clay"],144,240,["edible","pollinator"],"Fragrant white to pink flowers in spring precede a fall crop of dessert apples.",["Prairifire Crabapple","Bee Balm","Lavender"]),
  p("Peach","Prunus persica","tree",[3,4],[5,6,7,8,9],["pink"],["full-sun"],"moderate",["loam","sandy"],144,240,["edible","pollinator"],"Early spring pink blossoms smother the branches before juicy peaches develop.",["Apple","Lavender","Daffodil"]),
  p("Callery Pear","Pyrus calleryana","tree",[3,4],[5,6,7,8,9],["white"],["full-sun"],"moderate",["clay","loam"],300,480,["pollinator"],"Masses of white flowers in early spring on a tough, adaptable urban tree.",["Prairifire Crabapple","Serviceberry","Eastern Redbud"]),
  p("Meyer Lemon","Citrus x meyeri","shrub",[1,2,3,4,5,6,7,8,9,10,11,12],[9,10,11],["white"],["full-sun","part-sun"],"moderate",["loam","sandy"],48,96,["edible","fragrant","container","evergreen"],"Sweetly scented white blossoms appear intermittently year-round and set thin-skinned lemons.",["Rosemary","Lavender","Gardenia"]),
  p("Pomegranate","Punica granatum","shrub",[5,6,7],[8,9,10,11],["red","orange"],["full-sun"],"low",["loam","sandy"],72,180,["edible","pollinator","low-maintenance"],"Brilliant orange-red blossoms in late spring and summer are followed by decorative, edible fruits.",["Lavender","Rosemary","Culinary Sage"]),
  v("Wonderful Pomegranate","Punica granatum 'Wonderful'","shrub",[5,6,7],[8,9,10,11],["red"],["full-sun"],"low",["loam","sandy"],72,180,["edible","low-maintenance"],"Reliable cultivar bearing large red fruits and vivid orange flowers.",["Lavender","Rosemary","Culinary Sage"],"Pomegranate","Wonderful"),
  p("Common Fig","Ficus carica","tree",[4,5],[7,8,9,10,11],["green"],["full-sun"],"moderate",["loam","sandy"],72,180,["edible"],"Large lobed leaves and sweet late-summer fruits give a Mediterranean feel to the garden.",["Pomegranate","Rosemary","Lavender"]),
  p("American Elderberry","Sambucus canadensis","shrub",[6,7],[3,4,5,6,7,8,9],["white"],["full-sun","part-sun"],"moderate",["loam","clay"],60,144,["edible","native","pollinator"],"Large flat clusters of creamy flowers in early summer give way to dark berries for jams and wildlife.",["Serviceberry","Red Twig Dogwood","Bee Balm"]),
  p("Highbush Blueberry","Vaccinium corymbosum","shrub",[4,5],[3,4,5,6,7],["white","pink"],["full-sun","part-sun"],"moderate",["loam"],48,96,["edible","native","pollinator"],"Bell-shaped spring flowers are followed by sweet blue berries and excellent fall color.",["Rhododendron","Azalea","Serviceberry"]),

  // =====================
  // WINTER-INTEREST PLANTS (v1.9)
  // =====================
  p("Red Twig Dogwood","Cornus sericea","shrub",[5,6],[3,4,5,6,7,8],["white"],["full-sun","part-sun"],"moderate",["clay","loam"],72,120,["winter-interest","native","pollinator"],"Flat clusters of white flowers and berries give way to vivid red stems that shine in winter.",["Winterberry","Switchgrass","Paperbark Maple"]),
  p("Paperbark Maple","Acer griseum","tree",[4,5],[4,5,6,7,8],["green"],["full-sun","part-sun"],"moderate",["loam"],180,300,["winter-interest"],"Cinnamon-colored peeling bark and good fall color provide strong four-season interest.",["Red Twig Dogwood","Witch Hazel","Hellebore"]),
  p("Chinese Witch Hazel","Hamamelis mollis","shrub",[1,2,3],[5,6,7,8],["yellow"],["full-sun","part-sun"],"moderate",["loam"],96,144,["winter-interest","fragrant"],"Spidery yellow, sweetly scented flowers bloom on bare branches in late winter.",["Paperbark Maple","Hellebore","Snowdrop"]),
  p("Wintersweet","Chimonanthus praecox","shrub",[1,2],[7,8,9],["yellow"],["full-sun","part-sun"],"moderate",["loam"],72,180,["winter-interest","fragrant"],"Highly fragrant waxy yellow flowers open on bare stems in midwinter.",["Camellia","Witch Hazel","Hellebore"]),

  // =====================
  // MORE REGIONAL NATIVES & MISC (v1.9)
  // =====================
  p("Bigtooth Maple","Acer grandidentatum","tree",[4,5],[4,5,6,7,8],["green"],["full-sun","part-sun"],"moderate",["loam","clay"],180,300,["native"],"Mountain West maple with brilliant orange-red fall color and rugged drought tolerance.",["Serviceberry","Rocky Mountain Penstemon","Blue Flax"]),

  // =====================
  // NAMED VARIETIES BATCH (v2.0)
  // =====================

  // Peony varieties
  v("Sarah Bernhardt Peony","Paeonia lactiflora 'Sarah Bernhardt'","perennial",[5,6],[3,4,5,6,7,8],["pink"],["full-sun","part-sun"],"moderate",["clay","loam"],30,36,["deer-resistant","fragrant","cut-flower"],"Fully double, apple-blossom pink blooms so heavy they nod on their stems. The most planted peony in history.",["Iris","Catmint","Allium"],"Peony","Sarah Bernhardt"),
  v("Festiva Maxima Peony","Paeonia lactiflora 'Festiva Maxima'","perennial",[5,6],[3,4,5,6,7,8],["white","red"],["full-sun","part-sun"],"moderate",["clay","loam"],30,36,["deer-resistant","fragrant","cut-flower"],"Pure white double blooms flecked with crimson at the center. Beloved since 1851 and still unmatched.",["Iris","Salvia","Catmint"],"Peony","Festiva Maxima"),
  v("Bowl of Beauty Peony","Paeonia lactiflora 'Bowl of Beauty'","perennial",[5,6],[3,4,5,6,7,8],["pink","white"],["full-sun","part-sun"],"moderate",["clay","loam"],28,34,["deer-resistant","fragrant","cut-flower"],"Hot pink outer petals cup a creamy center of narrow petaloids. Dramatic and unmistakable.",["Allium","Catmint","Iris"],"Peony","Bowl of Beauty"),

  // Lavender varieties
  v("Hidcote Lavender","Lavandula angustifolia 'Hidcote'","perennial",[6,7,8],[5,6,7,8,9],["purple"],["full-sun"],"low",["sandy","poor"],12,18,["pollinator","deer-resistant","fragrant","cut-flower","container","low-maintenance"],"Compact and intensely dark purple. The standard against which all other lavenders are measured.",["Rose","Salvia","Catmint"],"Lavender","Hidcote"),
  v("Munstead Lavender","Lavandula angustifolia 'Munstead'","perennial",[6,7,8],[5,6,7,8,9],["lavender"],["full-sun"],"low",["sandy","poor"],12,18,["pollinator","deer-resistant","fragrant","cut-flower","container","low-maintenance"],"Earlier blooming and slightly softer purple than Hidcote. Gertrude Jekyll's favorite for a reason.",["Rose","Catmint","Salvia"],"Lavender","Munstead"),
  v("Phenomenal Lavender","Lavandula x intermedia 'Phenomenal'","perennial",[6,7,8],[5,6,7,8,9],["lavender","purple"],["full-sun"],"low",["sandy","poor"],24,36,["pollinator","deer-resistant","fragrant","cut-flower","low-maintenance"],"Survives humidity and cold that kills other lavenders. Silver foliage stays tight and full.",["Rose","Salvia","Catmint"],"Lavender","Phenomenal"),

  // Catmint varieties
  v("Walker's Low Catmint","Nepeta x faassenii 'Walker's Low'","perennial",[5,6,7,8,9],[3,4,5,6,7,8,9],["lavender","blue"],["full-sun"],"low",["sandy","poor"],24,30,["deer-resistant","pollinator","low-maintenance","fragrant"],"Perennial Plant of the Year. Billowy lavender-blue spikes that rebloom hard after a shear.",["Rose","Peony","Iris"],"Catmint","Walker's Low"),
  v("Cat's Meow Catmint","Nepeta x faassenii 'Cat's Meow'","perennial",[5,6,7,8,9],[3,4,5,6,7,8,9],["blue","purple"],["full-sun"],"low",["sandy","poor"],15,20,["deer-resistant","pollinator","low-maintenance","fragrant","container"],"Tidy, dome-shaped habit that never flops open. Stays compact without shearing.",["Rose","Salvia","Lavender"],"Catmint","Cat's Meow"),

  // Astilbe varieties
  v("Fanal Astilbe","Astilbe x arendsii 'Fanal'","perennial",[6,7],[3,4,5,6,7,8],["red"],["part-sun","part-shade","full-shade"],"high",["loam"],18,24,["deer-resistant","cut-flower"],"The deepest garnet-red of any astilbe. Dark bronze foliage makes those plumes glow.",["Hosta","Bleeding Heart","Foxglove"],"Astilbe","Fanal"),
  v("Bridal Veil Astilbe","Astilbe x arendsii 'Bridal Veil'","perennial",[6,7],[3,4,5,6,7,8],["white"],["part-sun","part-shade","full-shade"],"high",["loam"],20,28,["deer-resistant","cut-flower"],"Graceful cascading white plumes on dark stems. Luminous in a shady corner.",["Hosta","Japanese Anemone","Coral Bells"],"Astilbe","Bridal Veil"),
  v("Visions in Pink Astilbe","Astilbe chinensis 'Visions in Pink'","perennial",[7,8],[3,4,5,6,7,8],["pink"],["part-sun","part-shade","full-shade"],"high",["loam","clay"],12,18,["deer-resistant","low-maintenance"],"Compact and more drought-tolerant than most astilbes. Dense, rosy-pink plumes.",["Hosta","Bleeding Heart","Hellebore"],"Astilbe","Visions in Pink"),

  // Iris varieties
  v("Immortality Iris","Iris germanica 'Immortality'","perennial",[5,6,9],[3,4,5,6,7,8,9],["white"],["full-sun"],"low",["clay","poor"],24,30,["deer-resistant","cut-flower","fragrant","reblooming"],"Reliable rebloomer with pure white ruffled falls. Blooms spring, then again in fall.",["Peony","Salvia","Catmint"],"Iris","Immortality"),
  v("Beverly Sills Iris","Iris germanica 'Beverly Sills'","perennial",[5,6],[3,4,5,6,7,8,9],["pink"],["full-sun"],"low",["clay","poor"],24,36,["deer-resistant","cut-flower","fragrant"],"Coral-pink blooms with a tangerine beard. Named for the opera star and just as elegant.",["Peony","Catmint","Allium"],"Iris","Beverly Sills"),

  // Salvia varieties
  v("May Night Salvia","Salvia x sylvestris 'May Night'","perennial",[5,6,7,8],[3,4,5,6,7,8,9],["purple"],["full-sun"],"low",["sandy","poor"],18,24,["pollinator","deer-resistant","low-maintenance","cut-flower"],"Perennial Plant of the Year. Dense indigo-violet spikes that rebloom if deadheaded.",["Rose","Coneflower","Catmint"],"Salvia","May Night"),
  v("Caradonna Salvia","Salvia x sylvestris 'Caradonna'","perennial",[5,6,7,8],[3,4,5,6,7,8,9],["purple"],["full-sun"],"low",["sandy","poor"],18,30,["pollinator","deer-resistant","low-maintenance","cut-flower"],"Dark purple stems set this apart from every other salvia. Vertical, architectural, electric.",["Rose","Coneflower","Yarrow"],"Salvia","Caradonna"),

  // Daffodil varieties
  v("King Alfred Daffodil","Narcissus 'King Alfred'","bulb",[3,4],[3,4,5,6,7,8,9],["yellow"],["full-sun","part-sun"],"moderate",["clay","sandy","loam"],14,18,["deer-resistant","pollinator","low-maintenance","cut-flower"],"The classic golden trumpet daffodil. Naturalizes into massive sweeps that return for decades.",["Tulip","Grape Hyacinth","Bleeding Heart"],"Daffodil","King Alfred"),
  v("Ice Follies Daffodil","Narcissus 'Ice Follies'","bulb",[3,4],[3,4,5,6,7,8,9],["white","yellow"],["full-sun","part-sun"],"moderate",["clay","sandy","loam"],14,18,["deer-resistant","pollinator","low-maintenance","cut-flower"],"White petals frame a wide, ruffled cup that opens yellow and fades to cream. Multiplies fast.",["Tulip","Grape Hyacinth","Crocus"],"Daffodil","Ice Follies"),
  v("Thalia Daffodil","Narcissus 'Thalia'","bulb",[4,5],[3,4,5,6,7,8,9],["white"],["full-sun","part-sun"],"moderate",["clay","sandy","loam"],12,16,["deer-resistant","pollinator","fragrant","cut-flower"],"Pure white, swept-back petals with two to three blooms per stem. Orchid-like elegance.",["Tulip","Bleeding Heart","Hosta"],"Daffodil","Thalia"),

  // Tulip varieties
  v("Queen of Night Tulip","Tulipa 'Queen of Night'","bulb",[4,5],[3,4,5,6,7,8],["purple"],["full-sun"],"moderate",["sandy","loam"],22,28,["cut-flower"],"The darkest tulip. Satiny, near-black maroon blooms that look almost unreal in late spring.",["Daffodil","Allium","Grape Hyacinth"],"Tulip","Queen of Night"),
  v("Apeldoorn Tulip","Tulipa 'Apeldoorn'","bulb",[4,5],[3,4,5,6,7,8],["red","yellow"],["full-sun"],"moderate",["sandy","loam"],18,24,["cut-flower"],"Bold, goblet-shaped Darwin hybrid in scarlet with a black base. Strong stems and long-lasting.",["Daffodil","Grape Hyacinth","Crocus"],"Tulip","Apeldoorn"),

  // Black-Eyed Susan varieties
  v("Goldsturm Black-Eyed Susan","Rudbeckia fulgida 'Goldsturm'","perennial",[7,8,9,10],[3,4,5,6,7,8,9],["yellow"],["full-sun"],"low",["clay","sandy","poor"],24,30,["pollinator","deer-resistant","low-maintenance","cut-flower"],"The gold standard rudbeckia. Uniform, floriferous, and utterly reliable in any soil.",["Coneflower","Salvia","Aster"],"Black-Eyed Susan","Goldsturm"),
  v("American Gold Rush Black-Eyed Susan","Rudbeckia 'American Gold Rush'","perennial",[7,8,9,10],[3,4,5,6,7,8,9],["yellow"],["full-sun"],"low",["clay","sandy","poor"],18,24,["pollinator","deer-resistant","low-maintenance","slug-resistant"],"Narrow, fuzzy foliage resists the leaf spot that plagues Goldsturm. A worthy upgrade.",["Coneflower","Catmint","Sedum"],"Black-Eyed Susan","American Gold Rush"),

  // Rose varieties
  v("Graham Thomas Rose","Rosa 'Graham Thomas'","shrub",[5,6,7,8,9,10],[5,6,7,8,9],["yellow"],["full-sun"],"moderate",["loam","clay"],48,60,["fragrant","cut-flower","pollinator","reblooming"],"Rich golden-yellow cups with an intense tea rose fragrance. David Austin's most famous creation.",["Lavender","Catmint","Salvia"],"Rose","Graham Thomas"),
  v("Double Delight Rose","Rosa 'Double Delight'","shrub",[5,6,7,8,9],[5,6,7,8,9],["red","white"],["full-sun"],"moderate",["loam","clay"],36,48,["fragrant","cut-flower","pollinator"],"Creamy white petals blush to strawberry red at the edges. Knockout fragrance matches the looks.",["Lavender","Catmint","Salvia"],"Rose","Double Delight"),
];
