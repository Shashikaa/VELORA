import { celebrationTemplates } from "./celebrations";
export type Motif =
  | "lotus"
  | "elephant"
  | "perahera"
  | "peacock"
  | "mandala"
  | "moon"
  | "palm"
  | "floral"
  | "arch"
  | "lace";
export type Opening =
  | "bloom"
  | "doors"
  | "curtain"
  | "envelope"
  | "veil"
  | "scroll";
export type Category =
  | "Sri Lankan heritage"
  | "Floral & botanical"
  | "Modern romance"
  | "Coastal & destination"
  | "Cultural celebrations";
export type SignatureKind =
  | "lotus"
  | "palace"
  | "procession"
  | "peacock"
  | "flight"
  | "manuscript"
  | "botanical"
  | "lace"
  | "roadtrip"
  | "garden";
export type Tradition = "Buddhist" | "Hindu" | "Muslim" | "Christian" | "Any tradition";
export type Occasion = "Wedding" | "Homecoming" | "Wedding party" | "Anniversary" | "Engagement" | "Mehendi" | "Birthday";
export type CelebrationLayout = "baroque" | "ribbon" | "portrait" | "mandala" | "arch" | "editorial" | "lantern" | "temple" | "botanical" | "disco" | "postcard" | "heirloom" | "album" | "confetti" | "velvet" | "mehendi";
export interface WeddingTemplate {
  id: string;
  name: string;
  subtitle: string;
  category: Category;
  premium: boolean;
  motif: Motif;
  opening: Opening;
  paper: string;
  ink: string;
  gold: string;
  artwork?: string;
  image: string;
  couple: [string, string];
  location: string;
  ceremony: string;
  traditions?: Tradition[];
  occasion?: Occasion;
  celebrationLayout?: CelebrationLayout;
  ornament?: "vines" | "mandala" | "stars" | "lotus" | "arch" | "palm";
  edition?: number;
  couture?: "lotus" | "pearl";
  openingVideo?: string;
  referenceExperience?: "royal" | "garden";
  demoSeats?: {name:string;table:string}[];
  coverImage?: string;
  embeddedTemplate?: string;
  signature?: SignatureKind;
  signatureOpening?: string;
  signatureArt?: string;
}
const heritage = "/images/heritage-tuskers.webp";
const palettes = {
  ivory: ["#f8f2e7", "#693742", "#a2854a"],
  emerald: ["#173f35", "#fff3d7", "#c0a263"],
  blush: ["#f5e9e4", "#84464c", "#ac8259"],
  blue: ["#e9edf0", "#3b526d", "#aa8c55"],
  midnight: ["#172533", "#efe6d4", "#b7a06a"],
  sage: ["#e8eadd", "#455443", "#a28b58"],
  wine: ["#592b39", "#f6ead3", "#c7aa70"],
  sand: ["#efe6d6", "#69513e", "#9d7844"],
  lilac: ["#eee6f0", "#6b4d75", "#a18b66"],
  white: ["#fbf9f2", "#383b34", "#9f8a5a"],
};
type Palette = keyof typeof palettes;
type Recipe = [
  string,
  string,
  Category,
  Motif,
  Opening,
  Palette,
  boolean?,
  string?,
];
const signatureKinds: SignatureKind[] = [
  "lotus",
  "palace",
  "procession",
  "peacock",
  "flight",
  "manuscript",
  "botanical",
  "lace",
  "roadtrip",
  "garden",
];
const signatureOpenings = [
  "Unfold the lotus",
  "Open the palace gates",
  "Light the celebration",
  "Unfurl the peacock fan",
  "Begin the flight",
  "Unroll the love letter",
  "Part the garden veil",
  "Break the pearl seal",
  "Untie the satin ribbon",
  "Enter the secret garden",
];
const recipes: Recipe[] = [
  [
    "Lotus Reverie",
    "A lotus unfolds. Your forever begins.",
    "Sri Lankan heritage",
    "lotus",
    "bloom",
    "ivory",
    true,
    heritage,
  ],
  [
    "Senkadagala Royale",
    "Golden doors to a Kandyan love story.",
    "Sri Lankan heritage",
    "elephant",
    "doors",
    "emerald",
    true,
    heritage,
  ],
  [
    "Perahera Nocturne",
    "A procession of light, love and tradition.",
    "Sri Lankan heritage",
    "perahera",
    "curtain",
    "wine",
    true,
    heritage,
  ],
  [
    "Mayura Majesty",
    "Peacock feathers in an emerald embrace.",
    "Cultural celebrations",
    "peacock",
    "bloom",
    "emerald",
    true,
  ],
  [
    "Celestial Vows",
    "A cinematic flight into your forever.",
    "Modern romance",
    "moon",
    "veil",
    "midnight",
    true,
  ],
  [
    "The Gilded Manuscript",
    "A love letter steeped in island heritage.",
    "Sri Lankan heritage",
    "mandala",
    "scroll",
    "sand",
    true,
  ],
  [
    "Moonlit Araliya",
    "A botanical portrait, framed in moonlit blue.",
    "Floral & botanical",
    "floral",
    "veil",
    "blue",
    true,
  ],
  [
    "Silk & Serendipity",
    "Beeralu lace, a pearl seal and a handwritten promise.",
    "Modern romance",
    "lace",
    "envelope",
    "blush",
    true,
  ],
  [
    "Galle at Golden Hour",
    "Untie a ribbon. Take the scenic road to forever.",
    "Coastal & destination",
    "palm",
    "curtain",
    "sand",
    true,
  ],
  [
    "The Secret Garden",
    "An archway into your own enchanted world.",
    "Floral & botanical",
    "arch",
    "doors",
    "sage",
    true,
  ],
  [
    "Poruwa in Bloom",
    "Lotus petals and auspicious beginnings.",
    "Sri Lankan heritage",
    "lotus",
    "bloom",
    "ivory",
  ],
  [
    "Kandyan Heirloom",
    "A timeless celebration of our roots.",
    "Sri Lankan heritage",
    "elephant",
    "doors",
    "ivory",
  ],
  [
    "Liya Vela",
    "Delicate golden vines, beautifully intertwined.",
    "Sri Lankan heritage",
    "floral",
    "scroll",
    "sand",
  ],
  [
    "Dalada Gold",
    "The warmth of gold and Kandyan detail.",
    "Sri Lankan heritage",
    "mandala",
    "doors",
    "wine",
  ],
  [
    "Nelum Petals",
    "Soft pink blooms on handmade ivory.",
    "Sri Lankan heritage",
    "lotus",
    "bloom",
    "blush",
  ],
  [
    "Dumbara Weave",
    "Woven textures for an enduring love.",
    "Sri Lankan heritage",
    "mandala",
    "scroll",
    "sage",
  ],
  [
    "Ivory Tusker",
    "A graceful procession in ivory and gold.",
    "Sri Lankan heritage",
    "elephant",
    "curtain",
    "sand",
  ],
  [
    "Araliya Morning",
    "Frangipani blossoms in the morning light.",
    "Floral & botanical",
    "floral",
    "veil",
    "white",
  ],
  [
    "Wild Jasmine",
    "A fragrant garden in soft sage.",
    "Floral & botanical",
    "arch",
    "doors",
    "sage",
  ],
  [
    "Blush Botanica",
    "A love letter wrapped in petals.",
    "Floral & botanical",
    "floral",
    "envelope",
    "blush",
  ],
  [
    "Orchid Waltz",
    "An elegant dance of lilac and gold.",
    "Floral & botanical",
    "floral",
    "bloom",
    "lilac",
  ],
  [
    "Blue Hydrangea",
    "Airy blue blooms and a quiet romance.",
    "Floral & botanical",
    "lace",
    "veil",
    "blue",
  ],
  [
    "Emerald Fern",
    "Botanical greens, naturally beautiful.",
    "Floral & botanical",
    "palm",
    "curtain",
    "emerald",
  ],
  [
    "The Ivory Letter",
    "A simple letter, an extraordinary love.",
    "Modern romance",
    "lace",
    "envelope",
    "white",
  ],
  [
    "Champagne Promise",
    "A little shimmer. A lifetime together.",
    "Modern romance",
    "arch",
    "veil",
    "sand",
  ],
  [
    "Midnight Monogram",
    "An editorial celebration in midnight blue.",
    "Modern romance",
    "moon",
    "envelope",
    "midnight",
  ],
  [
    "Rosewater",
    "Soft blush and an intimate promise.",
    "Modern romance",
    "lotus",
    "veil",
    "blush",
  ],
  [
    "Velvet Homecoming",
    "Welcome home in rich burgundy velvet.",
    "Modern romance",
    "lace",
    "curtain",
    "wine",
  ],
  [
    "Pearl Poem",
    "Understated elegance, written just for you.",
    "Modern romance",
    "lace",
    "envelope",
    "ivory",
  ],
  [
    "Golden Hour",
    "Sun-kissed vows on a tropical island.",
    "Coastal & destination",
    "palm",
    "veil",
    "sand",
  ],
  [
    "Galle Fort Letters",
    "Old-world romance beside the ocean.",
    "Coastal & destination",
    "arch",
    "doors",
    "white",
  ],
  [
    "Bentota Breeze",
    "Swaying palms and barefoot promises.",
    "Coastal & destination",
    "palm",
    "curtain",
    "sage",
  ],
  [
    "Tea Country Tales",
    "A hill-country romance in soft blue.",
    "Coastal & destination",
    "floral",
    "veil",
    "blue",
  ],
  [
    "Weligama Waves",
    "A love as endless as the sea.",
    "Coastal & destination",
    "palm",
    "envelope",
    "blue",
  ],
  [
    "Jasmine Mandapam",
    "Jasmine garlands and ceremonial gold.",
    "Cultural celebrations",
    "arch",
    "doors",
    "wine",
  ],
  [
    "Mayil Silk",
    "Peacock details on an emerald canvas.",
    "Cultural celebrations",
    "peacock",
    "bloom",
    "emerald",
  ],
  [
    "Crescent Serenade",
    "A crescent moon and a heartfelt promise.",
    "Cultural celebrations",
    "moon",
    "doors",
    "midnight",
  ],
  [
    "Noor Garden",
    "Golden geometry in a serene garden.",
    "Cultural celebrations",
    "mandala",
    "envelope",
    "sage",
  ],
  [
    "Chapel of Light",
    "An archway filled with warmth and love.",
    "Cultural celebrations",
    "arch",
    "doors",
    "white",
  ],
  [
    "Saffron Mandala",
    "An intricate circle of love and celebration.",
    "Cultural celebrations",
    "mandala",
    "bloom",
    "sand",
  ],
];
export const TEMPLATES: WeddingTemplate[] = recipes.map(
  (
    [
      name,
      subtitle,
      category,
      motif,
      opening,
      palette,
      premium = false,
      artwork,
    ],
    i,
  ) => {
    const [paper, ink, gold] = palettes[palette];
    const image =
      category === "Coastal & destination"
        ? "/images/destination-galle.webp"
        : category === "Cultural celebrations"
          ? "/images/tamil-hindu.webp"
          : category === "Modern romance"
            ? "/images/flatlay-seal.webp"
            : "/images/sinhala-poruwa.webp";
    return {
      id: name
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .trim()
        .replace(/ +/g, "-"),
      name,
      subtitle,
      category,
      motif,
      opening,
      paper: i === 7 ? "#fbf8ef" : i === 8 ? "#f9eae2" : paper,
      ink: i === 7 ? "#71604d" : i === 8 ? "#79424f" : ink,
      gold,
      premium,
      signature: premium ? signatureKinds[i] : undefined,
      signatureOpening: premium ? signatureOpenings[i] : undefined,
      signatureArt:
        i === 4
          ? "/images/signature-colombo-night.webp"
          : i === 7
            ? "/images/signature-beeralu-lace.webp"
            : i === 8
              ? "/images/signature-coastal-road.webp"
              : undefined,
      artwork,
      image,
      couple:
        i % 3 === 0
          ? ["Nethmi", "Sanuja"]
          : i % 3 === 1
            ? ["Amaya", "Ravindu"]
            : ["Senuri", "Dinuka"],
      location:
        category === "Coastal & destination"
          ? "Galle Face Hotel, Colombo"
          : category === "Sri Lankan heritage"
            ? "Earl’s Regency, Kandy"
            : "Shangri-La, Colombo",
      ceremony:
        category === "Cultural celebrations"
          ? motif === "moon" || name === "Noor Garden"
            ? "Nikah ceremony"
            : name === "Chapel of Light"
              ? "Wedding ceremony"
              : "Muhurtham ceremony"
          : category === "Sri Lankan heritage"
            ? "Poruwa ceremony"
            : "Exchange of vows",
    };
  },
);
TEMPLATES.push({
  id: "kandyan-vintage-ride", name: "Kandyan Vintage Ride",
  subtitle: "A sunset ride, velvet curtains and a dancing Perahera procession.",
  category: "Sri Lankan heritage", premium: true, motif: "perahera", opening: "curtain",
  paper: "#fffdf7", ink: "#7a0c1e", gold: "#d4af37",
  image: "/images/kandyan-ride-1.webp", artwork: "/images/kandyan-ride-1.webp",
  couple: ["Kavindi", "Dulan"], location: "Cinnamon Citadel, Kandy", ceremony: "Poruwa ceremony",
  signatureOpening: "Part the Kandyan velvet curtains",
  embeddedTemplate: "/templates/kandyan-vintage-ride/",
});
for (const template of TEMPLATES) {
  template.occasion = "Wedding";
  template.traditions = template.category === "Sri Lankan heritage" ? ["Buddhist"] : template.id === "chapel-of-light" ? ["Christian"] : ["jasmine-mandapam", "mayil-silk", "saffron-mandala"].includes(template.id) ? ["Hindu"] : ["crescent-serenade", "noor-garden"].includes(template.id) ? ["Muslim"] : ["Any tradition"];
}
TEMPLATES.push(...celebrationTemplates);
// One representative per repeated layout; retain historical URLs outside the gallery.
const retained = ["satin-letter","senkadagala-royale","golden-portrait","celestial-vows","midnight-acanthus","silk-serendipity","galle-love-postcard","the-wedding-edit","noor-under-the-stars","lotus-reverie","cathedral-afterglow","kandyan-vintage-ride","ceylon-tea-garden","jaffna-jasmine","sinhala-heirloom-letter","after-the-vows","the-ruby-chapter","pink-confetti","crimson-homecoming","henna-moon","nelum-gold","perahera-nocturne","mayura-majesty","the-gilded-manuscript","moonlit-araliya","galle-at-golden-hour","the-secret-garden"];
export const ARCHIVED_TEMPLATES = TEMPLATES.filter(t => !retained.includes(t.id));
const curated = retained.map(id => TEMPLATES.find(t => t.id === id)!);
TEMPLATES.splice(0,TEMPLATES.length,...curated);
const overrides: Record<string,Partial<WeddingTemplate>> = {
 "satin-letter": {coverImage:"/images/collection-satin.webp",image:"/images/flatlay-seal.webp"},
 "midnight-acanthus":{name:"Royal Blue Seal",referenceExperience:"royal",demoSeats:[{name:"Demo Guest",table:"05"}],coverImage:"/images/reference-royal-cover.webp",paper:"#fbf8ef",ink:"#183c58"},
 "golden-portrait":{name:"Kandyan Garden",referenceExperience:"garden",demoSeats:[{name:"Demo Guest",table:"03"}],image:"/images/reference-garden-cover.webp",coverImage:"/images/reference-garden-cover.webp"},
 "cathedral-afterglow":{image:"/images/beeralu-pearl-lace.webp"},
 "ceylon-tea-garden":{image:"/images/srilanka-nature.webp",occasion:"Engagement",ceremony:"Engagement celebration"},
 "sinhala-heirloom-letter":{image:"/images/flatlay-sinhala.webp"},
 "noor-under-the-stars":{image:"/images/muslim-nikkah.webp"},
 "the-ruby-chapter":{celebrationLayout:"album"},
 "pink-confetti":{celebrationLayout:"confetti"},
 "crimson-homecoming":{celebrationLayout:"velvet",image:"/images/mukhmal-velvet.webp"},
 "henna-moon":{celebrationLayout:"mehendi",image:"/images/flatlay-tamil.webp"},
};
for (const t of TEMPLATES) {
 Object.assign(t,overrides[t.id] || {});
 if(t.celebrationLayout) t.signatureOpening = ({ribbon:"Unwrap the satin letter",baroque:"Open the gilded envelope",portrait:"Enter the garden story",arch:"Open the chapel doors",heirloom:"Unfold the Sinhala letter",mandala:"A lotus in gold",botanical:"Step into the tea garden",temple:"Beneath the jasmine canopy",lantern:"An illuminated Nikah",editorial:"Open the wedding issue",disco:"Let the celebration begin",postcard:"A postcard to forever",album:"Open our memory album",confetti:"A birthday to remember",velvet:"Part the velvet curtains",mehendi:"A little henna & happiness"} as Record<string,string>)[t.celebrationLayout];
}
const signatureSelection=new Set(["midnight-acanthus","golden-portrait","lotus-reverie","silk-serendipity","celestial-vows","kandyan-vintage-ride"]);
for(const t of TEMPLATES) t.premium=signatureSelection.has(t.id);
Object.assign(TEMPLATES.find(t=>t.id==="lotus-reverie")!,{couture:"lotus",name:"Lotus Heirloom",openingVideo:"/videos/lotus-opening.mp4"});
Object.assign(TEMPLATES.find(t=>t.id==="silk-serendipity")!,{couture:"pearl",name:"Pearl & Beeralu",coverImage:"/images/couture-pearl-cover.webp",openingVideo:"/videos/pearl-opening.mp4"});
Object.assign(TEMPLATES.find(t=>t.id==="midnight-acanthus")!,{openingVideo:"/videos/royal-opening.mp4"});
export const TRADITIONS: Tradition[] = ["Buddhist", "Hindu", "Muslim", "Christian", "Any tradition"];
export const OCCASIONS: Occasion[] = ["Wedding", "Homecoming", "Wedding party", "Anniversary", "Engagement", "Mehendi", "Birthday"];
export const CATEGORIES = [
  "All designs",
  "Sri Lankan heritage",
  "Floral & botanical",
  "Modern romance",
  "Coastal & destination",
  "Cultural celebrations",
] as const;
export interface InvitationDetails {
  bride: string;
  groom: string;
  date: string;
  time: string;
  venue: string;
  guest: string;
  message: string;
  story: string;
  language: "en" | "si" | "ta";
  familyFirst?: string;
  familySecond?: string;
  contactFirst?: string;
  contactSecond?: string;
  photo?: string;
  musicUrl?: string;
  soundtrack?: "chimes" | "poruwa" | "romance" | "reception" | "silent";
}
export const defaultDetails = (t: WeddingTemplate): InvitationDetails => ({
  bride: t.couple[0],
  groom: t.couple[1],
  date: t.embeddedTemplate ? "2027-02-20" : "2027-06-12",
  time: t.embeddedTemplate ? "09:38" : "09:30",
  venue: t.location,
  guest: "family & friends",
  message:
    t.occasion && t.occasion !== "Wedding" ? `Join us for our ${t.occasion.toLowerCase()}. Your presence will make this celebration even more special.` : "Together with our families, we joyfully invite you to share in the beginning of our forever.",
  story:
    t.occasion === "Birthday" ? "Another year of memories, laughter and the people who make life beautiful. Let’s celebrate the next chapter together." : t.occasion === "Anniversary" ? "Through every season, every adventure and every ordinary day, we have kept choosing one another. Join us as we celebrate the years and the memories still to come." : t.occasion === "Wedding party" ? "The vows are only the beginning. Join us for an evening of music, good company and a little dancing as we celebrate this new chapter." : "A chance meeting, a thousand little moments, and one beautiful yes. Every chapter has brought us here, and the next one begins with you by our side.",
  language: t.id === "sinhala-heirloom-letter" || t.couture === "lotus" ? "si" : "en",
  soundtrack: "chimes",
});
export function displayDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Colombo",
  }).format(new Date(date + "T12:00:00+05:30"));
}
