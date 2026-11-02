export type ProductColor = {
  name: string;
  hex: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  subcategory?: string;
  /** Sub-category this product builds bundles from (build-your-own bundle). */
  bundleOf?: string;
  /** Bundle price for N pieces (2-6). */
  bundlePrices?: Record<number, number>;
  collection: string;
  collections: string[];
  price: number;
  compareAt?: number;
  colors?: ProductColor[];
  images: string[];
  /** Maps a colour name to the index of the image that shows it. */
  colorImages?: Record<string, number>;
  description: string;
  details: string[];
  fabric?: string;
  size?: string;
  sizes?: string[];
  care?: string;
  stock: number;
  keywords: string[];
  isNew?: boolean;
};

const pexels = (id: number, width = 900, height = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${width}&h=${height}`;

export const imageLibrary = {
  hero: "/images/rah-hero.jpg",
  banner: "/images/rah-banner.jpg",
  story: pexels(35324622, 1200, 1300),
  gift: "/images/rah-gift.jpg",
  georgette: "/images/collections/hijabs.jpg",
  abaya: "/images/collections/irani-chaddar.jpg",
  accessories: "/images/collections/accessories.jpg",
  bundles: "/images/collections/bundles.jpg",
  hampers: "/images/collections/hampers.jpg",
  logoHeader: "/images/logo-header.png",
  logoDark: "/images/logo-dark.png",
  logoMark: "/images/logo-mark.png",
};

const CRIMP_PRICE = 585;

const crimpDescription = `Experience all-season comfort with our *Soft Crinkle Crimp Hijabs,* designed to keep you feeling comfortable, light, and effortlessly elegant throughout the year.
Whether you're heading to work or out for the day, this fabric moves with you effortlessly.
Size: 68 x 35 Inches (approx)
*Fabric Composition:* Cotton Viscose Blend
*Texture:* Crinkled with Soft and Smooth Touch
*Opacity:* Opaque when Layered
*Edges:* Fringed Finish on All Sides
*Comfort:* Breathable & Non-Slippery
*Suitability:* Versatile Enough for Any Occasion or Weather
*Ironing:* Not Required
*Pins:* No Pins Required
*Hijab Cap:* Not Required
*Note:* Color may slightly vary due to lighting and screen settings.`;

const turkishLawnDescription = `Crafted for women who value elegance and comfort.
This *Turkish Lawn Hijab* is lightweight, soft, and breathable, making it perfect for all weather conditions, especially warm summer days, for effortless everyday coverage.
*Fabric Composition:* Lawn Viscose Blend
*Texture:* Soft
*Opacity:* Opaque
*Edges:* Fringed Finish on Bottom Edges
*Comfort:* Breathable & Non-Slippery
*Suitability:* Versatile Enough for Any Occasion or Weather
*Ironing:* Mild Ironing Required
*Pins:* No Pins Required
*Hijab Cap:* Not Required
Size: 70 x 28 Inches (approx)
Note: Color may slightly vary due to lighting and screen settings.`;

const leopardMehndiDescription = `*Size:* 70 x 31 (approx.)
Make a statement with our elegant *Leopard Print Hijab.* The perfect blend of style, comfort, and modesty.
Crafted from lightweight, breathable fabric, it’s perfect for all seasons, offering a beautiful drape and effortless styling. 🤍
With its generous size and soft feel, this hijab provides comfortable coverage for everyday wear and special occasions alike. A timeless print that adds a touch of sophistication to any outfit. ✨`;

const hijabNiqabDescription = `Hijab Size : 70 x 30 (approx.)
Niqab Size : 10 x 14 (approx.)
Complete your look with our beautifully coordinated Matching Hijab & Niqab Set.
Designed for a graceful, elegant look with a comfortable feel, it’s perfect for everyday wear and effortless styling.
A timeless essential for your modest wardrobe. 🤍
Available in multiple shades.
Niqab: Tie Back
Hijab and Niqab Material: Chiffon Georgette
Hijab Opacity: Opaque when layered
Niqab Opacity: Already Double Layer ( Fully Opaque Non-See Through)
Note: Color may slightly vary due to lighting and screen settings.`;

const iraniChaddarDescription = `Tired of constantly adjusting your scarf and abaya while stepping out?
Our Irani Chadar offers full coverage with ease and comfort, so you can move confidently throughout your day without compromising on modesty.
Size: 67 Inch ( approx.)
Coverage: Full Length
Opacity: Opaque
Fabric: Shesha
Comfort: Breathable and Non Slippery ( comes with head and hand elastic support )
Note: Color may slightly vary due to lighting and screen settings.`;

const capdesc = `Hijab Size: 70 x 30 Inches (approx.)
*Tube Cap Material & Size:* Cotton Jersey & Free Size Stretchable
No more struggling to match your hijab & cap 🤍
Our matching hijab & cap sets are designed for comfort, coverage & effortless styling because modesty should feel beautiful too 🤍
The perfect everyday combination for every hijabi.
Note: Color may slightly vary due to lighting and screen settings.`;

const tubedesc = `Our *Tube Caps* are designed for a comfortable, secure fit under your hijab, keeping your hair neatly in place.
A perfect everyday essential for effortless hijab styling. 🤍
*Material and Size:* Cotton Jersey & Free Size Stretchable
*Note:* Color may slightly vary due to lighting and screen settings.`;

const magnetdesc = `Keep your hijab secure in place all day long with our NO-SNAG HIJAB MAGNETS.
Designed with a strong hold that won’t slip, they’re comfortable, and non-irritating for all-day wear.
Gentle on delicate fabrics with no holes, no snags, and no damage.`;

const georgetteDescription = `Size: 70 x 30 Inches ( approx.)
Description: Elevate your look with our easy, breezy chiffon georgette hijabs.
Lightweight and breathable with a soft, sheer texture that becomes opaque when doubled.
For better coverage and grip, we recommend wearing a hijab cap and pins with this fabric.
Stay comfortable, stylish, and effortlessly elegant all day.
Note: Color may slightly vary due to lighting and screen settings.`;

export const products: Product[] = [
  {
    id: "hijab-pin-set",
    slug: "minimalist-hijab-pin-set",
    name: "Minimalist Hijab Pin Set",
    category: "Accessories",
    subcategory: "Hijab Pins",
    collection: "Everyday Accessories",
    collections: ["accessories"],
    price: 650,
    colors: [
      { name: "Soft Gold", hex: "#b79a64" },
      { name: "Silver", hex: "#a8a8a6" },
    ],
    images: [pexels(31034511, 900, 900), pexels(31034508, 900, 900), pexels(31034512, 900, 900)],
    description:
      "A considered little essential for everyday styling. Smooth, understated pins designed to hold your favourite scarf in place with ease.",
    details: ["Set of 4 smooth-finish pins", "Presented in a reusable keepsake pouch", "Colour selected at checkout"],
    fabric: "Polished alloy",
    care: "Keep dry and store in the pouch between wears.",
    stock: 42,
    keywords: ["pin", "pins", "magnet", "scarf accessory", "gold"],
  },
  {
    id: "signature-gift-bundle",
    slug: "rah-signature-gift-bundle",
    name: "RAH. Signature Gift Bundle",
    category: "Bundles",
    collection: "Curated Bundles",
    collections: ["bundles", "hampers"],
    price: 4800,
    colors: [{ name: "The Neutral Edit", hex: "#d5c6b4" }, { name: "The Rose Edit", hex: "#b57983" }],
    images: [imageLibrary.gift, pexels(33315959, 900, 900), pexels(31034508, 900, 900)],
    description:
      "A thoughtful collection of RAH. favourites, gathered and ready to gift. Each bundle is wrapped with care in our signature neutral palette.",
    details: ["Includes two curated essentials", "Gift-ready presentation", "Please add your personal note at checkout"],
    care: "Gift wrap is included with this set.",
    stock: 10,
    keywords: ["gift", "set", "present", "scarf", "bundle"],
    isNew: true,
  },
  {
    id: "soft-welcome-hamper",
    slug: "the-soft-welcome-hamper",
    name: "The Soft Welcome Hamper",
    category: "Hampers",
    collection: "Thoughtful Hampers",
    collections: ["hampers"],
    price: 5600,
    colors: [{ name: "Natural Wrap", hex: "#c9b99f" }],
    images: [imageLibrary.hampers, pexels(33315959, 900, 900), pexels(31034512, 900, 900)],
    description:
      "A warm welcome, thoughtfully wrapped. This ready-to-gift hamper brings together a few gentle comforts for someone special.",
    details: ["Curated RAH. gift selection", "Premium wrap and message card included", "Contents may vary by seasonal availability"],
    care: "Please add a gift message in the order notes.",
    stock: 7,
    keywords: ["hamper", "gift", "gift box", "occasion", "present"],
  },
  {
    id: "soft-crinkle-crimp-black",
    slug: "soft-crinkle-crimp-black",
    name: "Soft Crinkle Crimp - BLACK",
    category: "Hijabs",
    subcategory: "Soft Crinkle Crimps",
    collection: "Soft Crinkle Crimps",
    collections: ["hijabs"],
    price: CRIMP_PRICE,
    colors: [{ name: "Black", hex: "#1c1c1c" }],
    images: ["/images/products/soft-crinkle-crimp/soft-crinkle-crimp-black.jpg"],
    description: crimpDescription,
    details: [],
    stock: 20,
    keywords: ["crinkle", "crimp", "cotton viscose", "black", "all season"],
    isNew: true,
  },
  {
    id: "soft-crinkle-crimp-dark-brown",
    slug: "soft-crinkle-crimp-dark-brown",
    name: "Soft Crinkle Crimp - DARK BROWN",
    category: "Hijabs",
    subcategory: "Soft Crinkle Crimps",
    collection: "Soft Crinkle Crimps",
    collections: ["hijabs"],
    price: CRIMP_PRICE,
    colors: [{ name: "Dark Brown", hex: "#4a3328" }],
    images: ["/images/products/soft-crinkle-crimp/soft-crinkle-crimp-dark-brown.jpg"],
    description: crimpDescription,
    details: [],
    stock: 20,
    keywords: ["crinkle", "crimp", "cotton viscose", "dark brown", "all season"],
    isNew: true,
  },
  {
    id: "soft-crinkle-crimp-dusty-navy-blue",
    slug: "soft-crinkle-crimp-dusty-navy-blue",
    name: "Soft Crinkle Crimp - DUSTY NAVY BLUE",
    category: "Hijabs",
    subcategory: "Soft Crinkle Crimps",
    collection: "Soft Crinkle Crimps",
    collections: ["hijabs"],
    price: CRIMP_PRICE,
    colors: [{ name: "Dusty Navy Blue", hex: "#44546a" }],
    images: ["/images/products/soft-crinkle-crimp/soft-crinkle-crimp-dusty-navy-blue.jpg"],
    description: crimpDescription,
    details: [],
    stock: 20,
    keywords: ["crinkle", "crimp", "cotton viscose", "dusty navy blue", "all season"],
    isNew: true,
  },
  {
    id: "soft-crinkle-crimp-forest-green",
    slug: "soft-crinkle-crimp-forest-green",
    name: "Soft Crinkle Crimp - FOREST GREEN",
    category: "Hijabs",
    subcategory: "Soft Crinkle Crimps",
    collection: "Soft Crinkle Crimps",
    collections: ["hijabs"],
    price: CRIMP_PRICE,
    colors: [{ name: "Forest Green", hex: "#2f4a3a" }],
    images: ["/images/products/soft-crinkle-crimp/soft-crinkle-crimp-forest-green.jpg"],
    description: crimpDescription,
    details: [],
    stock: 20,
    keywords: ["crinkle", "crimp", "cotton viscose", "forest green", "all season"],
    isNew: true,
  },
  {
    id: "soft-crinkle-crimp-light-grey",
    slug: "soft-crinkle-crimp-light-grey",
    name: "Soft Crinkle Crimp - LIGHT GREY",
    category: "Hijabs",
    subcategory: "Soft Crinkle Crimps",
    collection: "Soft Crinkle Crimps",
    collections: ["hijabs"],
    price: CRIMP_PRICE,
    colors: [{ name: "Light Grey", hex: "#b9b9b9" }],
    images: ["/images/products/soft-crinkle-crimp/soft-crinkle-crimp-light-grey.jpg"],
    description: crimpDescription,
    details: [],
    stock: 20,
    keywords: ["crinkle", "crimp", "cotton viscose", "light grey", "all season"],
    isNew: true,
  },
  {
    id: "soft-crinkle-crimp-mahroon",
    slug: "soft-crinkle-crimp-mahroon",
    name: "Soft Crinkle Crimp - MAHROON",
    category: "Hijabs",
    subcategory: "Soft Crinkle Crimps",
    collection: "Soft Crinkle Crimps",
    collections: ["hijabs"],
    price: CRIMP_PRICE,
    colors: [{ name: "Mahroon", hex: "#6b1f2a" }],
    images: ["/images/products/soft-crinkle-crimp/soft-crinkle-crimp-mahroon.jpg"],
    description: crimpDescription,
    details: [],
    stock: 20,
    keywords: ["crinkle", "crimp", "cotton viscose", "mahroon", "all season"],
    isNew: true,
  },
  {
    id: "soft-crinkle-crimp-navy-blue",
    slug: "soft-crinkle-crimp-navy-blue",
    name: "Soft Crinkle Crimp - NAVY BLUE",
    category: "Hijabs",
    subcategory: "Soft Crinkle Crimps",
    collection: "Soft Crinkle Crimps",
    collections: ["hijabs"],
    price: CRIMP_PRICE,
    colors: [{ name: "Navy Blue", hex: "#1f2a4d" }],
    images: ["/images/products/soft-crinkle-crimp/soft-crinkle-crimp-navy-blue.jpg"],
    description: crimpDescription,
    details: [],
    stock: 20,
    keywords: ["crinkle", "crimp", "cotton viscose", "navy blue", "all season"],
    isNew: true,
  },
  {
    id: "soft-crinkle-crimp-olive",
    slug: "soft-crinkle-crimp-olive",
    name: "Soft Crinkle Crimp - OLIVE",
    category: "Hijabs",
    subcategory: "Soft Crinkle Crimps",
    collection: "Soft Crinkle Crimps",
    collections: ["hijabs"],
    price: CRIMP_PRICE,
    colors: [{ name: "Olive", hex: "#6b6b3a" }],
    images: ["/images/products/soft-crinkle-crimp/soft-crinkle-crimp-olive.jpg"],
    description: crimpDescription,
    details: [],
    stock: 20,
    keywords: ["crinkle", "crimp", "cotton viscose", "olive", "all season"],
    isNew: true,
  },
  {
    id: "soft-crinkle-crimp-purple",
    slug: "soft-crinkle-crimp-purple",
    name: "Soft Crinkle Crimp - PURPLE",
    category: "Hijabs",
    subcategory: "Soft Crinkle Crimps",
    collection: "Soft Crinkle Crimps",
    collections: ["hijabs"],
    price: CRIMP_PRICE,
    colors: [{ name: "Purple", hex: "#6a3d8f" }],
    images: ["/images/products/soft-crinkle-crimp/soft-crinkle-crimp-purple.jpg"],
    description: crimpDescription,
    details: [],
    stock: 20,
    keywords: ["crinkle", "crimp", "cotton viscose", "purple", "all season"],
    isNew: true,
  },
  {
    id: "turkish-lawn-hijab",
    slug: "turkish-lawn-hijab",
    name: "Turkish Lawn Hijab",
    category: "Hijabs",
    subcategory: "Turkish Lawn",
    collection: "Turkish Lawn",
    collections: ["hijabs"],
    price: 650,
    colors: [
      { name: "Navy Blue", hex: "#1f2a5c" },
      { name: "Baby Blue", hex: "#b5cdf0" },
      { name: "Uniform Blue", hex: "#4a78c0" },
      { name: "Rose Pink", hex: "#cf6fa0" },
      { name: "Soft Pink", hex: "#e8a0b8" },
      { name: "Peach Pink", hex: "#d9667a" },
      { name: "Light Grey", hex: "#bcc6d4" },
      { name: "Black", hex: "#1b1f2e" },
      { name: "Dark Grey", hex: "#8a8a8e" },
      { name: "Leaf Green", hex: "#6b8a3a" },
      { name: "Mehndi Green", hex: "#c9a92e" },
      { name: "Forest Green", hex: "#3c4a2a" },
      { name: "Mulberry", hex: "#5c1530" },
      { name: "Burnt Orange", hex: "#f0582f" },
      { name: "Mahroon Red", hex: "#a0153a" },
      { name: "Chocolate Brown", hex: "#6b3520" },
      { name: "Dusty Nude", hex: "#e0b0a0" },
      { name: "Camel Brown", hex: "#b57a45" },
      { name: "Blush Pink", hex: "#d6246e" },
      { name: "Salmon Pink", hex: "#f4907f" },
      { name: "Lime Beige", hex: "#e8d098" },
      { name: "Dusty Teal", hex: "#5a9a8c" },
      { name: "Light Taupe", hex: "#cbb8a4" },
      { name: "Lavender", hex: "#b08cc0" },
      { name: "Purple", hex: "#5e1580" },
    ],
    images: ["/images/products/turkish-lawn/turkish-lawn-1461.jpg", "/images/products/turkish-lawn/turkish-lawn-1465.jpg", "/images/products/turkish-lawn/turkish-lawn-1466.jpg", "/images/products/turkish-lawn/turkish-lawn-1467.jpg", "/images/products/turkish-lawn/turkish-lawn-1468.jpg", "/images/products/turkish-lawn/turkish-lawn-1469.jpg", "/images/products/turkish-lawn/turkish-lawn-1470.jpg", "/images/products/turkish-lawn/turkish-lawn-1471.jpg", "/images/products/turkish-lawn/turkish-lawn-1472.jpg"],
    colorImages: { "Navy Blue": 0, "Baby Blue": 0, "Uniform Blue": 0, "Rose Pink": 1, "Soft Pink": 1, "Peach Pink": 1, "Light Grey": 2, "Black": 2, "Dark Grey": 2, "Leaf Green": 3, "Mehndi Green": 3, "Forest Green": 3, "Mulberry": 4, "Burnt Orange": 4, "Mahroon Red": 4, "Chocolate Brown": 5, "Dusty Nude": 5, "Camel Brown": 5, "Blush Pink": 6, "Salmon Pink": 6, "Lime Beige": 7, "Dusty Teal": 7, "Light Taupe": 7, "Lavender": 8, "Purple": 8 },
    description: turkishLawnDescription,
    details: [],
    stock: 30,
    keywords: ["turkish", "lawn", "viscose", "summer", "lightweight"],
    isNew: true,
  },
  {
    id: "leopard-print-arabic-lawn-hijab-mehndi-green",
    slug: "leopard-print-arabic-lawn-hijab-mehndi-green",
    name: "Leopard Print Arabic Lawn Hijab — Mehndi Green",
    category: "Hijabs",
    subcategory: "Leopard Print",
    collection: "Printed Hijabs",
    collections: ["hijabs"],
    price: 850,
    colors: [{ name: "Mehndi Green", hex: "#8a8a3a" }],
    images: ["/images/products/leopard-mehndi-green/model.jpg", "/images/products/leopard-mehndi-green/print.jpg"],
    description: leopardMehndiDescription,
    details: [],
    stock: 20,
    keywords: ["leopard", "print", "arabic lawn", "mehndi green", "animal print"],
    isNew: true,
  },
  {
    id: "matching-hijab-and-niqab-set",
    slug: "matching-hijab-and-niqab-set",
    name: "Matching Hijab and Niqab Set",
    category: "Hijabs",
    subcategory: "Matching Hijab and Niqab",
    collection: "Matching Sets",
    collections: ["hijabs"],
    price: 850,
    colors: [
      { name: "Mulberry", hex: "#5c1530" },
      { name: "Dark Grey", hex: "#3d4048" },
      { name: "Off White", hex: "#f2f2ee" },
      { name: "Bottle Green", hex: "#0f4a3c" },
      { name: "Blue Grey", hex: "#8c8fb5" },
      { name: "Purple", hex: "#4f1d52" },
    ],
    images: ["/images/products/hijab-niqab/cover.jpg", "/images/products/hijab-niqab/mulberry.jpg", "/images/products/hijab-niqab/dark-grey.jpg", "/images/products/hijab-niqab/off-white.jpg", "/images/products/hijab-niqab/bottle-green.jpg", "/images/products/hijab-niqab/blue-grey.jpg", "/images/products/hijab-niqab/purple.jpg"],
    colorImages: { "Mulberry": 1, "Dark Grey": 2, "Off White": 3, "Bottle Green": 4, "Blue Grey": 5, "Purple": 6 },
    description: hijabNiqabDescription,
    details: [],
    stock: 20,
    keywords: ["niqab", "set", "chiffon", "georgette", "matching"],
    isNew: true,
  },
  {
    id: "irani-chaddar-black",
    slug: "irani-chaddar-black",
    name: "Irani Chaddar — Black",
    category: "Irani Chaddar",
    collection: "Irani Chaddar",
    collections: ["irani-chaddar"],
    price: 3500,
    colors: [{ name: "Black", hex: "#1c1c1c" }],
    images: ["/images/products/irani-chaddar/irani-chaddar-9613.jpg", "/images/products/irani-chaddar/irani-chaddar-9614.jpg", "/images/products/irani-chaddar/irani-chaddar-9615.jpg"],
    description: iraniChaddarDescription,
    details: [],
    stock: 15,
    keywords: ["chaddar", "chadar", "irani", "full coverage", "black", "abaya"],
    isNew: true,
  },
  {
    id: "matching-hijab-and-cap-black",
    slug: "matching-hijab-and-cap-black",
    name: "Matching Hijab and Cap - BLACK",
    category: "Hijabs",
    subcategory: "Matching Hijab and Cap",
    collection: "Matching Hijab and Cap",
    collections: ["hijabs"],
    price: 650,
    colors: [{ name: "Black", hex: "#1c1c1c" }],
    images: ["/images/products/hijab-cap/matching-hijab-and-cap-black-1.jpg", "/images/products/hijab-cap/matching-hijab-and-cap-black-2.jpg"],
    description: capdesc,
    details: [],
    stock: 25,
    keywords: ["matching", "hijab", "cap", "black"],
    isNew: true,
  },
  {
    id: "matching-hijab-and-cap-blush-pink",
    slug: "matching-hijab-and-cap-blush-pink",
    name: "Matching Hijab and Cap - BLUSH PINK",
    category: "Hijabs",
    subcategory: "Matching Hijab and Cap",
    collection: "Matching Hijab and Cap",
    collections: ["hijabs"],
    price: 650,
    colors: [{ name: "Blush Pink", hex: "#e8a9b4" }],
    images: ["/images/products/hijab-cap/matching-hijab-and-cap-blush-pink-1.jpg", "/images/products/hijab-cap/matching-hijab-and-cap-blush-pink-2.jpg"],
    description: capdesc,
    details: [],
    stock: 25,
    keywords: ["matching", "hijab", "cap", "blush pink"],
    isNew: true,
  },
  {
    id: "matching-hijab-and-cap-chocolate-brown",
    slug: "matching-hijab-and-cap-chocolate-brown",
    name: "Matching Hijab and Cap - CHOCOLATE BROWN",
    category: "Hijabs",
    subcategory: "Matching Hijab and Cap",
    collection: "Matching Hijab and Cap",
    collections: ["hijabs"],
    price: 650,
    colors: [{ name: "Chocolate Brown", hex: "#4a2c20" }],
    images: ["/images/products/hijab-cap/matching-hijab-and-cap-chocolate-brown-2.jpg", "/images/products/hijab-cap/matching-hijab-and-cap-chocolate-brown-1.jpg"],
    description: capdesc,
    details: [],
    stock: 25,
    keywords: ["matching", "hijab", "cap", "chocolate brown"],
    isNew: true,
  },
  {
    id: "matching-hijab-and-cap-lavender",
    slug: "matching-hijab-and-cap-lavender",
    name: "Matching Hijab and Cap - LAVENDER",
    category: "Hijabs",
    subcategory: "Matching Hijab and Cap",
    collection: "Matching Hijab and Cap",
    collections: ["hijabs"],
    price: 650,
    colors: [{ name: "Lavender", hex: "#b9a3d0" }],
    images: ["/images/products/hijab-cap/matching-hijab-and-cap-lavender-2.jpg", "/images/products/hijab-cap/matching-hijab-and-cap-lavender-1.jpg"],
    description: capdesc,
    details: [],
    stock: 25,
    keywords: ["matching", "hijab", "cap", "lavender"],
    isNew: true,
  },
  {
    id: "matching-hijab-and-cap-mahroon",
    slug: "matching-hijab-and-cap-mahroon",
    name: "Matching Hijab and Cap - MAHROON",
    category: "Hijabs",
    subcategory: "Matching Hijab and Cap",
    collection: "Matching Hijab and Cap",
    collections: ["hijabs"],
    price: 650,
    colors: [{ name: "Mahroon", hex: "#6b1f2a" }],
    images: ["/images/products/hijab-cap/matching-hijab-and-cap-mahroon-1.jpg", "/images/products/hijab-cap/matching-hijab-and-cap-mahroon-2.jpg"],
    description: capdesc,
    details: [],
    stock: 25,
    keywords: ["matching", "hijab", "cap", "mahroon"],
    isNew: true,
  },
  {
    id: "matching-hijab-and-cap-teal",
    slug: "matching-hijab-and-cap-teal",
    name: "Matching Hijab and Cap - TEAL",
    category: "Hijabs",
    subcategory: "Matching Hijab and Cap",
    collection: "Matching Hijab and Cap",
    collections: ["hijabs"],
    price: 650,
    colors: [{ name: "Teal", hex: "#1f7a7a" }],
    images: ["/images/products/hijab-cap/matching-hijab-and-cap-teal-2.jpg", "/images/products/hijab-cap/matching-hijab-and-cap-teal-1.jpg"],
    description: capdesc,
    details: [],
    stock: 25,
    keywords: ["matching", "hijab", "cap", "teal"],
    isNew: true,
  },
  {
    id: "tube-cap-black",
    slug: "tube-cap-black",
    name: "Tube Cap - BLACK",
    category: "Accessories",
    subcategory: "Tube Caps",
    collection: "Tube Caps",
    collections: ["accessories"],
    price: 105,
    compareAt: 160,
    colors: [{ name: "Black", hex: "#1c1c1c" }],
    images: ["/images/products/tube-caps/tube-cap-black.jpg"],
    description: tubedesc,
    details: [],
    stock: 25,
    keywords: ["tube cap", "cap", "under scarf", "black"],
    isNew: true,
  },
  {
    id: "tube-cap-blush-pink",
    slug: "tube-cap-blush-pink",
    name: "Tube Cap - BLUSH PINK",
    category: "Accessories",
    subcategory: "Tube Caps",
    collection: "Tube Caps",
    collections: ["accessories"],
    price: 105,
    compareAt: 160,
    colors: [{ name: "Blush Pink", hex: "#e8a9b4" }],
    images: ["/images/products/tube-caps/tube-cap-blush-pink.jpg"],
    description: tubedesc,
    details: [],
    stock: 25,
    keywords: ["tube cap", "cap", "under scarf", "blush pink"],
    isNew: true,
  },
  {
    id: "tube-cap-brown",
    slug: "tube-cap-brown",
    name: "Tube Cap - BROWN",
    category: "Accessories",
    subcategory: "Tube Caps",
    collection: "Tube Caps",
    collections: ["accessories"],
    price: 105,
    compareAt: 160,
    colors: [{ name: "Brown", hex: "#7a5238" }],
    images: ["/images/products/tube-caps/tube-cap-brown.jpg"],
    description: tubedesc,
    details: [],
    stock: 25,
    keywords: ["tube cap", "cap", "under scarf", "brown"],
    isNew: true,
  },
  {
    id: "tube-cap-chocolate-brown",
    slug: "tube-cap-chocolate-brown",
    name: "Tube Cap - CHOCOLATE BROWN",
    category: "Accessories",
    subcategory: "Tube Caps",
    collection: "Tube Caps",
    collections: ["accessories"],
    price: 105,
    compareAt: 160,
    colors: [{ name: "Chocolate Brown", hex: "#4a2c20" }],
    images: ["/images/products/tube-caps/tube-cap-chocolate-brown.jpg"],
    description: tubedesc,
    details: [],
    stock: 25,
    keywords: ["tube cap", "cap", "under scarf", "chocolate brown"],
    isNew: true,
  },
  {
    id: "tube-cap-grey",
    slug: "tube-cap-grey",
    name: "Tube Cap - GREY",
    category: "Accessories",
    subcategory: "Tube Caps",
    collection: "Tube Caps",
    collections: ["accessories"],
    price: 105,
    compareAt: 160,
    colors: [{ name: "Grey", hex: "#8d8d92" }],
    images: ["/images/products/tube-caps/tube-cap-grey.jpg"],
    description: tubedesc,
    details: [],
    stock: 25,
    keywords: ["tube cap", "cap", "under scarf", "grey"],
    isNew: true,
  },
  {
    id: "tube-cap-lavender",
    slug: "tube-cap-lavender",
    name: "Tube Cap - LAVENDER",
    category: "Accessories",
    subcategory: "Tube Caps",
    collection: "Tube Caps",
    collections: ["accessories"],
    price: 105,
    compareAt: 160,
    colors: [{ name: "Lavender", hex: "#b9a3d0" }],
    images: ["/images/products/tube-caps/tube-cap-lavender.jpg"],
    description: tubedesc,
    details: [],
    stock: 25,
    keywords: ["tube cap", "cap", "under scarf", "lavender"],
    isNew: true,
  },
  {
    id: "tube-cap-lilac",
    slug: "tube-cap-lilac",
    name: "Tube Cap - LILAC",
    category: "Accessories",
    subcategory: "Tube Caps",
    collection: "Tube Caps",
    collections: ["accessories"],
    price: 105,
    compareAt: 160,
    colors: [{ name: "Lilac", hex: "#b79ac7" }],
    images: ["/images/products/tube-caps/tube-cap-lilac.jpg"],
    description: tubedesc,
    details: [],
    stock: 25,
    keywords: ["tube cap", "cap", "under scarf", "lilac"],
    isNew: true,
  },
  {
    id: "tube-cap-navy-blue",
    slug: "tube-cap-navy-blue",
    name: "Tube Cap - NAVY BLUE",
    category: "Accessories",
    subcategory: "Tube Caps",
    collection: "Tube Caps",
    collections: ["accessories"],
    price: 105,
    compareAt: 160,
    colors: [{ name: "Navy Blue", hex: "#1f2a4d" }],
    images: ["/images/products/tube-caps/tube-cap-navy-blue.jpg"],
    description: tubedesc,
    details: [],
    stock: 25,
    keywords: ["tube cap", "cap", "under scarf", "navy blue"],
    isNew: true,
  },
  {
    id: "tube-cap-purple",
    slug: "tube-cap-purple",
    name: "Tube Cap - PURPLE",
    category: "Accessories",
    subcategory: "Tube Caps",
    collection: "Tube Caps",
    collections: ["accessories"],
    price: 105,
    compareAt: 160,
    colors: [{ name: "Purple", hex: "#5e2a84" }],
    images: ["/images/products/tube-caps/tube-cap-purple.jpg"],
    description: tubedesc,
    details: [],
    stock: 25,
    keywords: ["tube cap", "cap", "under scarf", "purple"],
    isNew: true,
  },
  {
    id: "tube-cap-red",
    slug: "tube-cap-red",
    name: "Tube Cap - RED",
    category: "Accessories",
    subcategory: "Tube Caps",
    collection: "Tube Caps",
    collections: ["accessories"],
    price: 105,
    compareAt: 160,
    colors: [{ name: "Red", hex: "#c0392b" }],
    images: ["/images/products/tube-caps/tube-cap-red.jpg"],
    description: tubedesc,
    details: [],
    stock: 25,
    keywords: ["tube cap", "cap", "under scarf", "red"],
    isNew: true,
  },
  {
    id: "tube-cap-teal",
    slug: "tube-cap-teal",
    name: "Tube Cap - TEAL",
    category: "Accessories",
    subcategory: "Tube Caps",
    collection: "Tube Caps",
    collections: ["accessories"],
    price: 105,
    compareAt: 160,
    colors: [{ name: "Teal", hex: "#1f7a7a" }],
    images: ["/images/products/tube-caps/tube-cap-teal.jpg"],
    description: tubedesc,
    details: [],
    stock: 25,
    keywords: ["tube cap", "cap", "under scarf", "teal"],
    isNew: true,
  },
  {
    id: "hijab-magnet-dark-brown",
    slug: "hijab-magnet-dark-brown",
    name: "Hijab Magnet - DARK BROWN",
    category: "Accessories",
    subcategory: "Magnets",
    collection: "Magnets",
    collections: ["accessories"],
    price: 350,
    colors: [{ name: "Dark Brown", hex: "#4a3328" }],
    images: ["/images/products/magnets/hijab-magnet-dark-brown.jpg"],
    description: magnetdesc,
    details: [],
    stock: 25,
    keywords: ["magnet", "no-snag", "pin", "dark brown"],
    isNew: true,
  },
  {
    id: "hijab-magnet-deep-green",
    slug: "hijab-magnet-deep-green",
    name: "Hijab Magnet - DEEP GREEN",
    category: "Accessories",
    subcategory: "Magnets",
    collection: "Magnets",
    collections: ["accessories"],
    price: 350,
    colors: [{ name: "Deep Green", hex: "#1f4d3a" }],
    images: ["/images/products/magnets/hijab-magnet-deep-green.jpg"],
    description: magnetdesc,
    details: [],
    stock: 25,
    keywords: ["magnet", "no-snag", "pin", "deep green"],
    isNew: true,
  },
  {
    id: "hijab-magnet-deep-purple",
    slug: "hijab-magnet-deep-purple",
    name: "Hijab Magnet - DEEP PURPLE",
    category: "Accessories",
    subcategory: "Magnets",
    collection: "Magnets",
    collections: ["accessories"],
    price: 350,
    colors: [{ name: "Deep Purple", hex: "#4a2060" }],
    images: ["/images/products/magnets/hijab-magnet-deep-purple.jpg"],
    description: magnetdesc,
    details: [],
    stock: 25,
    keywords: ["magnet", "no-snag", "pin", "deep purple"],
    isNew: true,
  },
  {
    id: "hijab-magnet-dusty-blue",
    slug: "hijab-magnet-dusty-blue",
    name: "Hijab Magnet - DUSTY BLUE",
    category: "Accessories",
    subcategory: "Magnets",
    collection: "Magnets",
    collections: ["accessories"],
    price: 350,
    colors: [{ name: "Dusty Blue", hex: "#7a93b0" }],
    images: ["/images/products/magnets/hijab-magnet-dusty-blue.jpg"],
    description: magnetdesc,
    details: [],
    stock: 25,
    keywords: ["magnet", "no-snag", "pin", "dusty blue"],
    isNew: true,
  },
  {
    id: "hijab-magnet-light-lavender",
    slug: "hijab-magnet-light-lavender",
    name: "Hijab Magnet - LIGHT LAVENDER",
    category: "Accessories",
    subcategory: "Magnets",
    collection: "Magnets",
    collections: ["accessories"],
    price: 350,
    colors: [{ name: "Light Lavender", hex: "#d5c8e6" }],
    images: ["/images/products/magnets/hijab-magnet-light-lavender.jpg"],
    description: magnetdesc,
    details: [],
    stock: 25,
    keywords: ["magnet", "no-snag", "pin", "light lavender"],
    isNew: true,
  },
  {
    id: "hijab-magnet-metallic-grey",
    slug: "hijab-magnet-metallic-grey",
    name: "Hijab Magnet - METALLIC GREY",
    category: "Accessories",
    subcategory: "Magnets",
    collection: "Magnets",
    collections: ["accessories"],
    price: 350,
    colors: [{ name: "Metallic Grey", hex: "#8e9399" }],
    images: ["/images/products/magnets/hijab-magnet-metallic-grey.jpg"],
    description: magnetdesc,
    details: [],
    stock: 25,
    keywords: ["magnet", "no-snag", "pin", "metallic grey"],
    isNew: true,
  },
  {
    id: "hijab-magnet-mulberry-brown",
    slug: "hijab-magnet-mulberry-brown",
    name: "Hijab Magnet - MULBERRY BROWN",
    category: "Accessories",
    subcategory: "Magnets",
    collection: "Magnets",
    collections: ["accessories"],
    price: 350,
    colors: [{ name: "Mulberry Brown", hex: "#6b3a40" }],
    images: ["/images/products/magnets/hijab-magnet-mulberry-brown.jpg"],
    description: magnetdesc,
    details: [],
    stock: 25,
    keywords: ["magnet", "no-snag", "pin", "mulberry brown"],
    isNew: true,
  },
  {
    id: "hijab-magnet-navy-blue",
    slug: "hijab-magnet-navy-blue",
    name: "Hijab Magnet - NAVY BLUE",
    category: "Accessories",
    subcategory: "Magnets",
    collection: "Magnets",
    collections: ["accessories"],
    price: 350,
    colors: [{ name: "Navy Blue", hex: "#1f2a4d" }],
    images: ["/images/products/magnets/hijab-magnet-navy-blue.jpg"],
    description: magnetdesc,
    details: [],
    stock: 25,
    keywords: ["magnet", "no-snag", "pin", "navy blue"],
    isNew: true,
  },
  {
    id: "hijab-magnet-sage",
    slug: "hijab-magnet-sage",
    name: "Hijab Magnet - SAGE",
    category: "Accessories",
    subcategory: "Magnets",
    collection: "Magnets",
    collections: ["accessories"],
    price: 350,
    colors: [{ name: "Sage", hex: "#9caf88" }],
    images: ["/images/products/magnets/hijab-magnet-sage.jpg"],
    description: magnetdesc,
    details: [],
    stock: 25,
    keywords: ["magnet", "no-snag", "pin", "sage"],
    isNew: true,
  },
  {
    id: "hijab-magnet-sand",
    slug: "hijab-magnet-sand",
    name: "Hijab Magnet - SAND",
    category: "Accessories",
    subcategory: "Magnets",
    collection: "Magnets",
    collections: ["accessories"],
    price: 350,
    colors: [{ name: "Sand", hex: "#d8c7a5" }],
    images: ["/images/products/magnets/hijab-magnet-sand.jpg"],
    description: magnetdesc,
    details: [],
    stock: 25,
    keywords: ["magnet", "no-snag", "pin", "sand"],
    isNew: true,
  },
  {
    id: "hijab-magnet-silver",
    slug: "hijab-magnet-silver",
    name: "Hijab Magnet - SILVER",
    category: "Accessories",
    subcategory: "Magnets",
    collection: "Magnets",
    collections: ["accessories"],
    price: 350,
    colors: [{ name: "Silver", hex: "#c8cacd" }],
    images: ["/images/products/magnets/hijab-magnet-silver.jpg"],
    description: magnetdesc,
    details: [],
    stock: 25,
    keywords: ["magnet", "no-snag", "pin", "silver"],
    isNew: true,
  },
  {
    id: "chiffon-georgette-mahroon",
    slug: "chiffon-georgette-mahroon",
    name: "Chiffon Georgette - MAHROON",
    category: "Hijabs",
    subcategory: "Chiffon Georgette",
    collection: "Chiffon Georgette",
    collections: ["hijabs"],
    price: 550,
    colors: [{ name: "Mahroon", hex: "#7a1f2b" }],
    images: ["/images/products/georgette/chiffon-georgette-mahroon.jpg"],
    description: georgetteDescription,
    details: [],
    stock: 25,
    keywords: ["georgette", "chiffon", "hijab", "mahroon"],
    isNew: true,
  },
  {
    id: "chiffon-georgette-navy-blue",
    slug: "chiffon-georgette-navy-blue",
    name: "Chiffon Georgette - NAVY BLUE",
    category: "Hijabs",
    subcategory: "Chiffon Georgette",
    collection: "Chiffon Georgette",
    collections: ["hijabs"],
    price: 550,
    colors: [{ name: "Navy Blue", hex: "#1f2a4d" }],
    images: ["/images/products/georgette/chiffon-georgette-navy-blue.jpg"],
    description: georgetteDescription,
    details: [],
    stock: 25,
    keywords: ["georgette", "chiffon", "hijab", "navy blue"],
    isNew: true,
  },
  {
    id: "chiffon-georgette-purple",
    slug: "chiffon-georgette-purple",
    name: "Chiffon Georgette - PURPLE",
    category: "Hijabs",
    subcategory: "Chiffon Georgette",
    collection: "Chiffon Georgette",
    collections: ["hijabs"],
    price: 550,
    colors: [{ name: "Purple", hex: "#4a2060" }],
    images: ["/images/products/georgette/chiffon-georgette-purple.jpg"],
    description: georgetteDescription,
    details: [],
    stock: 25,
    keywords: ["georgette", "chiffon", "hijab", "purple"],
    isNew: true,
  },
  {
    id: "chiffon-georgette-sea-foam",
    slug: "chiffon-georgette-sea-foam",
    name: "Chiffon Georgette - SEA FOAM",
    category: "Hijabs",
    subcategory: "Chiffon Georgette",
    collection: "Chiffon Georgette",
    collections: ["hijabs"],
    price: 550,
    colors: [{ name: "Sea Foam", hex: "#8fb8ad" }],
    images: ["/images/products/georgette/chiffon-georgette-sea-foam.jpg"],
    description: georgetteDescription,
    details: [],
    stock: 25,
    keywords: ["georgette", "chiffon", "hijab", "sea foam"],
    isNew: true,
  },
];

// ---------------------------------------------------------------------------
// Build-your-own hijab bundles: one bundle product per hijab sub-category that
// has products. Customers pick 2–6 pieces, each in any colour.
// ---------------------------------------------------------------------------
export type BundleOption = { productId: string; color: string; hex: string; price: number; image: string };

export const BUNDLE_MIN = 2;
export const BUNDLE_MAX = 6;

export const getBundleOptions = (sub: string): BundleOption[] =>
  products
    .filter((item) => item.subcategory === sub && !item.bundleOf)
    .flatMap((item) =>
      (item.colors || []).map((color) => ({
        productId: item.id,
        color: color.name,
        hex: color.hex,
        price: item.price,
        image: item.images[item.colorImages?.[color.name] ?? 0],
      })),
    );

export const bundleTiers: Record<string, Record<number, number>> = {
  "Soft Crinkle Crimps": { 2: 1140, 3: 1665, 4: 2160, 5: 2625, 6: 3060 },
  "Turkish Lawn": { 2: 1270, 3: 1860, 4: 2420, 5: 2950, 6: 3450 },
  "Matching Hijab and Cap": { 2: 1270, 3: 1860, 4: 2420, 5: 2950, 6: 3450 },
  "Matching Hijab and Niqab": { 2: 1670, 3: 2460, 4: 3220, 5: 3950, 6: 4650 },
  "Chiffon Georgette": { 2: 1070, 3: 1560, 4: 2020, 5: 2450, 6: 2850 },
};

const bundleIntro = `*Build your own bundle:* choose ${BUNDLE_MIN} to ${BUNDLE_MAX} pieces in any colours and get a special bundle price. You can repeat a colour as many times as you like. Single pieces are available as individual products in this sub-category.`;

[
  { sub: "Soft Crinkle Crimps", name: "Soft Crinkle Crimp Hijab Bundle", covers: ["/images/products/soft-crinkle-crimp/soft-crinkle-crimp-black.jpg", "/images/bundles/soft-crinkle-crimp.jpg"] },
  { sub: "Turkish Lawn", name: "Turkish Lawn Hijab Bundle", covers: ["/images/bundles/turkish-lawn.jpg"] },
  { sub: "Matching Hijab and Cap", name: "Matching Hijab and Cap Bundle", covers: ["/images/products/hijab-cap/matching-hijab-and-cap-blush-pink-1.jpg", "/images/bundles/hijab-cap.jpg"] },
  { sub: "Matching Hijab and Niqab", name: "Matching Hijab and Niqab Bundle", covers: ["/images/products/hijab-niqab/cover.jpg", "/images/bundles/hijab-niqab.jpg"] },
  { sub: "Chiffon Georgette", name: "Chiffon Georgette Hijab Bundle", covers: ["/images/products/georgette/chiffon-georgette-mahroon.jpg", "/images/bundles/georgette.jpg"] },
].forEach(({ sub, name, covers }) => {
  const options = getBundleOptions(sub);
  if (!options.length) return;
  const source = products.find((item) => item.subcategory === sub && !item.bundleOf)!;
  // Bundle galleries use only the cover and collage pictures (no separate colour photos).
  const images = covers;
  const seen = new Set<string>();
  const colors = options
    .filter((option) => !seen.has(option.color) && !!seen.add(option.color))
    .map((option) => ({ name: option.color, hex: option.hex }));
  const slug = sub.toLowerCase().replace(/ /g, "-");
  products.push({
    id: `bundle-${slug}`,
    slug: `${slug}-bundle`,
    name,
    category: "Bundles",
    collection: "Hijab Bundles",
    collections: ["bundles"],
    bundleOf: sub,
    bundlePrices: bundleTiers[sub],
    price: bundleTiers[sub][BUNDLE_MIN],
    colors,
    images,
    description: `${bundleIntro}\n${source.description}`,
    details: [],
    stock: 50,
    keywords: ["bundle", "set", "mix and match", "hijab", sub.toLowerCase()],
    isNew: true,
  });
});

export type Collection = {
  slug: string;
  title: string;
  description: string;
  image: string;
  category?: string;
};

export const collections: Collection[] = [
  {
    slug: "hijabs",
    title: "Hijabs",
    description: "Light, fluid layers for everyday elegance.",
    image: imageLibrary.georgette,
  },
  {
    slug: "irani-chaddar",
    title: "Irani Chaddar",
    description: "Timeless silhouettes, thoughtfully made.",
    image: imageLibrary.abaya,
  },
  {
    slug: "accessories",
    title: "Accessories",
    description: "Quietly useful finishing touches.",
    image: imageLibrary.accessories,
  },
  {
    slug: "bundles",
    title: "Bundles",
    description: "Considered pairings, ready to gift.",
    image: imageLibrary.bundles,
  },
  {
    slug: "hampers",
    title: "Hampers",
    description: "Thoughtful gifts for meaningful moments.",
    image: imageLibrary.hampers,
  },
];

export type SubCategory = { label: string; slug: string };

export const subCategories: Record<string, SubCategory[]> = {
  hijabs: [
    "Chiffon Georgette",
    "Turkish Lawn",
    "Soft Crinkle Crimps",
    "Matching Hijab and Cap",
    "Matching Hijab and Niqab",
    "Soft Lawn",
    "Leopard Print",
  ].map((label) => ({ label, slug: label.toLowerCase().replace(/ /g, "-") })),
  accessories: ["Tube Caps", "Hijab Pins", "Magnets"].map((label) => ({
    label,
    slug: label.toLowerCase().replace(/ /g, "-"),
  })),
};

export const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/shop" },
  { label: "Hijabs", href: "/collections/hijabs" },
  { label: "Irani Chaddar", href: "/collections/irani-chaddar" },
  { label: "Accessories", href: "/collections/accessories" },
  { label: "Bundles", href: "/collections/bundles" },
  { label: "Hampers", href: "/collections/hampers" },
];

export const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/byrah.pk?vrfl=MWFtYW1qOWx6a2N3Yg%3D%3D&utm_source=qr",
  },
  { label: "TikTok", href: "https://www.tiktok.com/@byrah.pk" },
  { label: "Facebook", href: "https://www.facebook.com/share/1J67oaemZ5/?mibextid=wwXIfr" },
];

export const formatPrice = (amount: number) =>
  `PKR ${amount.toLocaleString("en-PK")}`;