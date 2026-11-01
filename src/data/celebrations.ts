import type { WeddingTemplate, CelebrationLayout, Tradition, Occasion } from "./templates";
const palettes: Record<string, [string,string,string]> = {ivory:["#fffaf0","#6a2939","#a47b39"],wine:["#481c2c","#fff0dc","#d6b46e"],sand:["#f2e5cf","#62432d","#a17a3f"],midnight:["#142c42","#fff4dd","#d1ad63"],blue:["#eef2f4","#294965","#9c8052"],white:["#fffdf7","#4b493c","#9b8558"],blush:["#f9e7e3","#7e3949","#ad8054"],sage:["#e7ecdf","#364b3e","#8b7c49"],emerald:["#133e35","#fff1d5","#c8a464"],lilac:["#ede5f1","#62476e","#9d8057"]};
const rows: [string,CelebrationLayout,Tradition,Occasion,string,NonNullable<WeddingTemplate["ornament"]>][] = [
  [
    "Satin Letter",
    "ribbon",
    "Any tradition",
    "Wedding",
    "ivory",
    "vines"
  ],
  [
    "Cathedral Afterglow",
    "arch",
    "Christian",
    "Wedding",
    "wine",
    "arch"
  ],
  [
    "Sinhala Heirloom Letter",
    "heirloom",
    "Buddhist",
    "Wedding",
    "sand",
    "lotus"
  ],
  [
    "Midnight Acanthus",
    "baroque",
    "Any tradition",
    "Wedding",
    "midnight",
    "vines"
  ],
  [
    "Blue Porcelain Vows",
    "baroque",
    "Any tradition",
    "Wedding",
    "blue",
    "vines"
  ],
  [
    "Champagne Wax Seal",
    "baroque",
    "Any tradition",
    "Wedding",
    "sand",
    "stars"
  ],
  [
    "Ivory Relief",
    "baroque",
    "Christian",
    "Wedding",
    "white",
    "arch"
  ],
  [
    "Rosewood Scrollwork",
    "baroque",
    "Any tradition",
    "Wedding",
    "blush",
    "vines"
  ],
  [
    "The Pearl Ribbon",
    "ribbon",
    "Any tradition",
    "Wedding",
    "white",
    "vines"
  ],
  [
    "Blush Silk Promise",
    "ribbon",
    "Any tradition",
    "Engagement",
    "blush",
    "lotus"
  ],
  [
    "Silver Knot",
    "ribbon",
    "Any tradition",
    "Anniversary",
    "blue",
    "stars"
  ],
  [
    "Crimson Homecoming",
    "ribbon",
    "Buddhist",
    "Homecoming",
    "wine",
    "vines"
  ],
  [
    "Golden Portrait",
    "portrait",
    "Any tradition",
    "Wedding",
    "sand",
    "arch"
  ],
  [
    "Kandyan Sunset Portrait",
    "portrait",
    "Buddhist",
    "Wedding",
    "ivory",
    "lotus"
  ],
  [
    "In the Olive Grove",
    "portrait",
    "Christian",
    "Wedding",
    "sage",
    "vines"
  ],
  [
    "Monsoon Love",
    "portrait",
    "Any tradition",
    "Engagement",
    "blue",
    "stars"
  ],
  [
    "Nelum Gold",
    "mandala",
    "Buddhist",
    "Wedding",
    "ivory",
    "lotus"
  ],
  [
    "Saffron Sunrise",
    "mandala",
    "Hindu",
    "Wedding",
    "sand",
    "mandala"
  ],
  [
    "Lotus & Pahana",
    "mandala",
    "Buddhist",
    "Homecoming",
    "wine",
    "lotus"
  ],
  [
    "Jaffna Jasmine",
    "temple",
    "Hindu",
    "Wedding",
    "white",
    "mandala"
  ],
  [
    "Marigold Courtyard",
    "temple",
    "Hindu",
    "Mehendi",
    "sand",
    "vines"
  ],
  [
    "Emerald Mandap",
    "temple",
    "Hindu",
    "Engagement",
    "emerald",
    "arch"
  ],
  [
    "Temple Bells",
    "temple",
    "Hindu",
    "Wedding",
    "wine",
    "mandala"
  ],
  [
    "Noor Under the Stars",
    "lantern",
    "Muslim",
    "Wedding",
    "midnight",
    "stars"
  ],
  [
    "Emerald Nikah",
    "lantern",
    "Muslim",
    "Wedding",
    "emerald",
    "arch"
  ],
  [
    "Henna Moon",
    "lantern",
    "Muslim",
    "Mehendi",
    "blush",
    "vines"
  ],
  [
    "Ivory Crescent",
    "lantern",
    "Muslim",
    "Engagement",
    "ivory",
    "stars"
  ],
  [
    "Grace in Bloom",
    "arch",
    "Christian",
    "Wedding",
    "white",
    "vines"
  ],
  [
    "Starlit Chapel",
    "arch",
    "Christian",
    "Wedding",
    "midnight",
    "stars"
  ],
  [
    "A Golden Covenant",
    "arch",
    "Christian",
    "Anniversary",
    "sand",
    "arch"
  ],
  [
    "Garden Blessing",
    "botanical",
    "Christian",
    "Engagement",
    "sage",
    "vines"
  ],
  [
    "Ceylon Tea Garden",
    "botanical",
    "Any tradition",
    "Wedding",
    "sage",
    "vines"
  ],
  [
    "Araliya Courtyard",
    "botanical",
    "Buddhist",
    "Homecoming",
    "white",
    "lotus"
  ],
  [
    "Wildflower Promise",
    "botanical",
    "Any tradition",
    "Wedding",
    "lilac",
    "vines"
  ],
  [
    "Tropical Reception",
    "botanical",
    "Any tradition",
    "Wedding party",
    "emerald",
    "palm"
  ],
  [
    "The Wedding Edit",
    "editorial",
    "Any tradition",
    "Wedding",
    "white",
    "arch"
  ],
  [
    "Our Next Chapter",
    "editorial",
    "Any tradition",
    "Anniversary",
    "sand",
    "vines"
  ],
  [
    "Black Tie Romance",
    "editorial",
    "Any tradition",
    "Wedding party",
    "midnight",
    "stars"
  ],
  [
    "Twenty Five Golden Years",
    "heirloom",
    "Any tradition",
    "Anniversary",
    "ivory",
    "mandala"
  ],
  [
    "The Ruby Chapter",
    "heirloom",
    "Any tradition",
    "Anniversary",
    "wine",
    "vines"
  ],
  [
    "Fifty Years of Us",
    "heirloom",
    "Any tradition",
    "Anniversary",
    "sand",
    "lotus"
  ],
  [
    "Galle Love Postcard",
    "postcard",
    "Any tradition",
    "Wedding",
    "sand",
    "palm"
  ],
  [
    "Vintage Sunset Escape",
    "postcard",
    "Buddhist",
    "Homecoming",
    "blush",
    "lotus"
  ],
  [
    "Island Engagement",
    "postcard",
    "Any tradition",
    "Engagement",
    "blue",
    "palm"
  ],
  [
    "Palm House Party",
    "disco",
    "Any tradition",
    "Wedding party",
    "emerald",
    "palm"
  ],
  [
    "After the Vows",
    "disco",
    "Any tradition",
    "Wedding party",
    "wine",
    "stars"
  ],
  [
    "Midnight Twenty One",
    "disco",
    "Any tradition",
    "Birthday",
    "midnight",
    "stars"
  ],
  [
    "Pink Confetti",
    "disco",
    "Any tradition",
    "Birthday",
    "blush",
    "stars"
  ],
  [
    "Golden Birthday Soiree",
    "editorial",
    "Any tradition",
    "Birthday",
    "sand",
    "stars"
  ]
];
export const celebrationTemplates: WeddingTemplate[] = rows.map(([name, celebrationLayout, tradition, occasion, palette, ornament], i) => {
 const [paper,ink,gold] = palettes[palette];
 const image = celebrationLayout === "postcard" ? "/images/kandyan-ride-1.webp" : tradition === "Hindu" ? "/images/tamil-hindu.webp" : tradition === "Buddhist" ? "/images/sinhala-poruwa.webp" : ["/images/destination-galle.webp","/images/mandalaa-couple-art.webp","/images/flatlay-seal.webp"][i%3];
 return {id:name.toLowerCase().replace(/[^a-z0-9 ]/g,"").replace(/ +/g,"-"),name,subtitle:`${occasion} · ${tradition} · ${celebrationLayout === "baroque" ? "Sculpted flourishes and a golden seal" : celebrationLayout === "ribbon" ? "A silk ribbon opens to your story" : celebrationLayout === "portrait" ? "A portrait-led celebration in motion" : celebrationLayout === "lantern" ? "An illuminated arch beneath the stars" : celebrationLayout === "disco" ? "A little sparkle, a night to remember" : "A beautifully personal celebration"}.`,category:tradition === "Buddhist" ? "Sri Lankan heritage" : ["Hindu","Muslim","Christian"].includes(tradition) ? "Cultural celebrations" : celebrationLayout === "botanical" ? "Floral & botanical" : celebrationLayout === "postcard" ? "Coastal & destination" : "Modern romance",premium:false,motif:ornament === "vines" ? "floral" : ornament === "stars" ? "moon" : ornament,opening:celebrationLayout === "ribbon" || celebrationLayout === "baroque" ? "envelope" : celebrationLayout === "heirloom" ? "scroll" : celebrationLayout === "lantern" || celebrationLayout === "arch" ? "doors" : celebrationLayout === "botanical" ? "bloom" : "veil",paper,ink,gold,image,couple:occasion === "Birthday" ? ["Amaya", ""] : tradition === "Muslim" ? ["Amina","Rayyan"] : tradition === "Hindu" ? ["Kavya","Arjun"] : tradition === "Christian" ? ["Natalie","Joel"] : ["Isuri","Duvindu"],location:tradition === "Hindu" ? "Jaffna Wedding Hall" : tradition === "Buddhist" ? "Cinnamon Citadel, Kandy" : "The Grand Ballroom, Colombo",ceremony:occasion !== "Wedding" ? occasion : tradition === "Muslim" ? "Nikah ceremony" : tradition === "Hindu" ? "Muhurtham ceremony" : tradition === "Buddhist" ? "Poruwa ceremony" : tradition === "Christian" ? "Wedding blessing" : "Exchange of vows",traditions:[tradition],occasion,celebrationLayout,ornament,edition:i};
});
