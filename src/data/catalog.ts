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
  /** Total units across all colours (derived from colorStock when present). */
  stock: number;
  /** Units left per colour for products that carry several colours. */
  colorStock?: Record<string, number>;
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


const crimpDescription = `Experience all-season comfort with our *Soft Crinkle Crimp Hijabs,* designed to keep you feeling comfortable, light, and effortlessly elegant throughout the year.

Whether you're heading to work or out for the day, this fabric moves with you effortlessly.

*Fabric Composition:* Cotton Viscose Blend
*Texture:* Crinkled with Soft and Smooth Touch
*Opacity:* Opaque when Layered
*Edges:* Fringed Finish on All Sides
*Comfort:* Breathable & Non-Slippery
*Suitability:* Versatile Enough for Any Occasion or Weather
*Ironing:* Not Required
*Pins:* No Pins Required
*Hijab Cap:* Not Required

*Size:* 68 x 35 Inches (approx.)

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

*Size:* 70 x 28 Inches (approx.)

*Note:* Color may slightly vary due to lighting and screen settings.`;

const leopardDescription = `A little wild, a lot of classy. 🐆🤍

Our *LEOPARD PRINT HIJAB* is here to add a chic touch to your everyday looks.

Style it your way and make every outfit stand out.

*Size:* 70 x 31 Inches (approx.)

*Fabric:* Arabic Lawn (perfect for all seasons)

*Note:* Color may slightly vary due to lighting and screen settings.`;

const hijabNiqabDescription = `Complete your look with our beautifully coordinated *Matching Hijab & Niqab Set.*

Designed for a graceful, elegant look with a comfortable feel, it’s perfect for everyday wear and effortless styling.

A timeless essential for your modest wardrobe. 🤍

*Available in:* Multiple shades

*Niqab:* Tie Back
*Hijab and Niqab Material:* Chiffon Georgette
*Hijab Opacity:* Opaque when layered
*Niqab Opacity:* Already Double Layer (Fully Opaque, Non-See-Through)

*Hijab Size:* 70 x 30 Inches (approx.)
*Niqab Size:* 10 x 14 Inches (approx.)

*Note:* Color may slightly vary due to lighting and screen settings.`;

const iraniChaddarDescription = `Tired of constantly adjusting your scarf and abaya while stepping out?

Our *Irani Chadar* offers full coverage with ease and comfort, so you can move confidently throughout your day without compromising on modesty.

*Coverage:* Full Length
*Opacity:* Opaque
*Fabric:* Shesha
*Comfort:* Breathable and Non-Slippery (comes with head and hand elastic support)

*Size:* 67 Inches (approx.)

*Note:* Color may slightly vary due to lighting and screen settings.`;

const capdesc = `No more struggling to match your hijab & cap 🤍

Our *matching hijab & cap sets* are designed for comfort, coverage & effortless styling because modesty should feel beautiful too 🤍

The perfect everyday combination for every hijabi.

*Tube Cap Material & Size:* Cotton Jersey & Free Size Stretchable

*Hijab Size:* 70 x 30 Inches (approx.)

*Note:* Color may slightly vary due to lighting and screen settings.`;

const tubedesc = `Our *Tube Caps* are designed for a comfortable, secure fit under your hijab, keeping your hair neatly in place.

A perfect everyday essential for effortless hijab styling. 🤍

*Material and Size:* Cotton Jersey & Free Size Stretchable

*Note:* Color may slightly vary due to lighting and screen settings.`;

const magnetdesc = `Keep your hijab secure in place all day long with our *NO-SNAG HIJAB MAGNETS.*

Designed with a strong hold that won’t slip, they’re comfortable, and non-irritating for all-day wear.

Gentle on delicate fabrics with no holes, no snags, and no damage.

*Note:* Color may slightly vary due to lighting and screen settings.`;

const georgetteDescription = `Elevate your look with our easy, breezy *Chiffon Georgette Hijabs.*

Lightweight and breathable with a soft, sheer texture that becomes opaque when doubled.

For better coverage and grip, we recommend wearing a hijab cap and pins with this fabric.

Stay comfortable, stylish, and effortlessly elegant all day.

*Size:* 70 x 30 Inches (approx.)

*Note:* Color may slightly vary due to lighting and screen settings.`;

export const products: Product[] = [
  {
    id: "soft-crinkle-crimp-black",
    slug: "soft-crinkle-crimp-black",
    name: "Soft Crinkle Crimp - BLACK",
    category: "Hijabs",
    subcategory: "Soft Crinkle Crimps",
    collection: "Soft Crinkle Crimps",
    collections: ["hijabs"],
    price: 550,
    colors: [{ name: "Black", hex: "#1c1c1c" }],
    images: ["/images/products/soft-crinkle-crimp/soft-crinkle-crimp-black.jpg"],
    description: crimpDescription,
    details: [],
    stock: 20,
    keywords: ["crinkle", "crimp", "cotton viscose", "black", "all season"],
    isNew: true,
  },
  {
    id: "soft-crinkle-crimp-choco-brown",
    slug: "soft-crinkle-crimp-choco-brown",
    name: "Soft Crinkle Crimp - CHOCO BROWN",
    category: "Hijabs",
    subcategory: "Soft Crinkle Crimps",
    collection: "Soft Crinkle Crimps",
    collections: ["hijabs"],
    price: 550,
    colors: [{ name: "Choco Brown", hex: "#4a3328" }],
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
    price: 550,
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
    price: 550,
    colors: [{ name: "Forest Green", hex: "#2f4a3a" }],
    images: ["/images/products/soft-crinkle-crimp/soft-crinkle-crimp-forest-green.jpg"],
    description: crimpDescription,
    details: [],
    stock: 20,
    keywords: ["crinkle", "crimp", "cotton viscose", "forest green", "all season"],
    isNew: true,
  },
  {
    id: "soft-crinkle-crimp-ice-grey",
    slug: "soft-crinkle-crimp-ice-grey",
    name: "Soft Crinkle Crimp - ICE GREY",
    category: "Hijabs",
    subcategory: "Soft Crinkle Crimps",
    collection: "Soft Crinkle Crimps",
    collections: ["hijabs"],
    price: 550,
    colors: [{ name: "Ice Grey", hex: "#b9b9b9" }],
    images: ["/images/products/soft-crinkle-crimp/soft-crinkle-crimp-light-grey.jpg"],
    description: crimpDescription,
    details: [],
    stock: 20,
    keywords: ["crinkle", "crimp", "cotton viscose", "light grey", "all season"],
    isNew: true,
  },
  {
    id: "soft-crinkle-crimp-royal-mahroon",
    slug: "soft-crinkle-crimp-royal-mahroon",
    name: "Soft Crinkle Crimp - ROYAL MAHROON",
    category: "Hijabs",
    subcategory: "Soft Crinkle Crimps",
    collection: "Soft Crinkle Crimps",
    collections: ["hijabs"],
    price: 550,
    colors: [{ name: "Royal Mahroon", hex: "#6b1f2a" }],
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
    price: 550,
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
    price: 550,
    colors: [{ name: "Olive", hex: "#6b6b3a" }],
    images: ["/images/products/soft-crinkle-crimp/soft-crinkle-crimp-olive.jpg"],
    description: crimpDescription,
    details: [],
    stock: 20,
    keywords: ["crinkle", "crimp", "cotton viscose", "olive", "all season"],
    isNew: true,
  },
  {
    id: "soft-crinkle-crimp-purple-plum",
    slug: "soft-crinkle-crimp-purple-plum",
    name: "Soft Crinkle Crimp - PURPLE PLUM",
    category: "Hijabs",
    subcategory: "Soft Crinkle Crimps",
    collection: "Soft Crinkle Crimps",
    collections: ["hijabs"],
    price: 550,
    colors: [{ name: "Purple Plum", hex: "#6a3d8f" }],
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
    name: "Turkish Lawn Hijab - Select Colour",
    category: "Hijabs",
    subcategory: "Turkish Lawn",
    collection: "Turkish Lawn",
    collections: ["hijabs"],
    price: 600,
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
      { name: "Dusty Blue", hex: "#4d6a9c" },
      { name: "Muted Slate Blue", hex: "#5d5f8c" },
    ],
    images: ["/images/products/turkish-lawn/turkish-lawn-1461.jpg", "/images/products/turkish-lawn/turkish-lawn-1465.jpg", "/images/products/turkish-lawn/turkish-lawn-1466.jpg", "/images/products/turkish-lawn/turkish-lawn-1467.jpg", "/images/products/turkish-lawn/turkish-lawn-1468.jpg", "/images/products/turkish-lawn/turkish-lawn-1469.jpg", "/images/products/turkish-lawn/turkish-lawn-1470.jpg", "/images/products/turkish-lawn/turkish-lawn-1471.jpg", "/images/products/turkish-lawn/turkish-lawn-1472.jpg", "/images/products/turkish-lawn/turkish-lawn-dusty-blue.jpg"],
    colorImages: { "Navy Blue": 0, "Baby Blue": 0, "Uniform Blue": 0, "Rose Pink": 1, "Soft Pink": 1, "Peach Pink": 1, "Light Grey": 2, "Black": 2, "Dark Grey": 2, "Leaf Green": 3, "Mehndi Green": 3, "Forest Green": 3, "Mulberry": 4, "Burnt Orange": 4, "Mahroon Red": 4, "Chocolate Brown": 5, "Dusty Nude": 5, "Camel Brown": 5, "Blush Pink": 6, "Salmon Pink": 6, "Lime Beige": 7, "Dusty Teal": 7, "Light Taupe": 7, "Lavender": 8, "Purple": 8, "Dusty Blue": 9, "Muted Slate Blue": 9 },
    description: turkishLawnDescription,
    details: [],
    stock: 30,
    keywords: ["turkish", "lawn", "viscose", "summer", "lightweight"],
    isNew: true,
  },
  {
    id: "leopard-print-arabic-lawn-hijab-mehndi-green",
    slug: "leopard-print-arabic-lawn-hijab-mehndi-green",
    name: "Vintage Leopard - HENNAH",
    category: "Hijabs",
    subcategory: "Vintage Leopard",
    collection: "Leopard Hijabs",
    collections: ["hijabs"],
    price: 650,
    colors: [{ name: "Mehndi Green", hex: "#8a8a3a" }],
    images: ["/images/products/leopard-mehndi-green/model.jpg", "/images/products/leopard-mehndi-green/print.jpg"],
    description: leopardDescription,
    details: [],
    stock: 1,
    keywords: ["leopard", "print", "arabic lawn", "mehndi green", "hennah", "vintage", "animal print"],
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
    price: 750,
    colors: [
      { name: "Mulberry", hex: "#5c1530" },
      { name: "Dark Grey", hex: "#3d4048" },
      { name: "Off White", hex: "#f2f2ee" },
      { name: "Bottle Green", hex: "#0f4a3c" },
      { name: "Purple", hex: "#4f1d52" },
      { name: "Blue Grey", hex: "#8e92af" },
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
    price: 2100,
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
    price: 600,
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
    price: 600,
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
    price: 600,
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
    price: 600,
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
    price: 600,
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
    price: 600,
    colors: [{ name: "Teal", hex: "#1f7a7a" }],
    images: ["/images/products/hijab-cap/matching-hijab-and-cap-teal-2.jpg", "/images/products/hijab-cap/matching-hijab-and-cap-teal-1.jpg"],
    description: capdesc,
    details: [],
    stock: 25,
    keywords: ["matching", "hijab", "cap", "teal"],
    isNew: true,
  },
  {
    id: "matching-hijab-and-cap-purple",
    slug: "matching-hijab-and-cap-purple",
    name: "Matching Hijab and Cap - PURPLE",
    category: "Hijabs",
    subcategory: "Matching Hijab and Cap",
    collection: "Matching Hijab and Cap",
    collections: ["hijabs"],
    price: 600,
    colors: [{ name: "Purple", hex: "#5e2a84" }],
    images: ["/images/products/hijab-cap/matching-hijab-and-cap-purple-1.jpg", "/images/products/hijab-cap/matching-hijab-and-cap-purple-2.jpg"],
    description: capdesc,
    details: [],
    stock: 25,
    keywords: ["matching", "hijab", "cap", "purple"],
    isNew: true,
  },
  {
    id: "matching-hijab-and-cap-navy-blue",
    slug: "matching-hijab-and-cap-navy-blue",
    name: "Matching Hijab and Cap - NAVY BLUE",
    category: "Hijabs",
    subcategory: "Matching Hijab and Cap",
    collection: "Matching Hijab and Cap",
    collections: ["hijabs"],
    price: 600,
    colors: [{ name: "Navy Blue", hex: "#1f2a4d" }],
    images: ["/images/products/hijab-cap/matching-hijab-and-cap-navy-blue-1.jpg", "/images/products/hijab-cap/matching-hijab-and-cap-navy-blue-2.jpg"],
    description: capdesc,
    details: [],
    stock: 25,
    keywords: ["matching", "hijab", "cap", "navy blue"],
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
    price: 150,
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
    price: 150,
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
    price: 150,
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
    price: 150,
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
    price: 150,
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
    price: 150,
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
    price: 150,
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
    price: 150,
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
    price: 150,
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
    price: 150,
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
    price: 150,
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
    price: 300,
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
    price: 300,
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
    price: 300,
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
    price: 300,
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
    price: 300,
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
    price: 300,
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
    price: 300,
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
    price: 300,
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
    price: 300,
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
    price: 300,
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
    price: 300,
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
    price: 500,
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
    price: 500,
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
    price: 500,
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
    price: 500,
    colors: [{ name: "Sea Foam", hex: "#8fb8ad" }],
    images: ["/images/products/georgette/chiffon-georgette-sea-foam.jpg"],
    description: georgetteDescription,
    details: [],
    stock: 25,
    keywords: ["georgette", "chiffon", "hijab", "sea foam"],
    isNew: true,
  },
  {
    id: "chiffon-georgette-lavender",
    slug: "chiffon-georgette-lavender",
    name: "Chiffon Georgette - LAVENDER",
    category: "Hijabs",
    subcategory: "Chiffon Georgette",
    collection: "Chiffon Georgette",
    collections: ["hijabs"],
    price: 500,
    colors: [{ name: "Lavender", hex: "#b9a3d0" }],
    images: ["/images/products/georgette/chiffon-georgette-lavender.jpg"],
    description: georgetteDescription,
    details: [],
    stock: 25,
    keywords: ["georgette", "chiffon", "hijab", "lavender"],
    isNew: true,
  },
  {
    id: "chiffon-georgette-chocolate-brown",
    slug: "chiffon-georgette-chocolate-brown",
    name: "Chiffon Georgette - CHOCOLATE BROWN",
    category: "Hijabs",
    subcategory: "Chiffon Georgette",
    collection: "Chiffon Georgette",
    collections: ["hijabs"],
    price: 500,
    colors: [{ name: "Chocolate Brown", hex: "#4a2c20" }],
    images: ["/images/products/georgette/chiffon-georgette-chocolate-brown.jpg"],
    description: georgetteDescription,
    details: [],
    stock: 25,
    keywords: ["georgette", "chiffon", "hijab", "chocolate brown"],
    isNew: true,
  },
  {
    id: "chiffon-georgette-lilac",
    slug: "chiffon-georgette-lilac",
    name: "Chiffon Georgette - LILAC",
    category: "Hijabs",
    subcategory: "Chiffon Georgette",
    collection: "Chiffon Georgette",
    collections: ["hijabs"],
    price: 500,
    colors: [{ name: "Lilac", hex: "#b79ac7" }],
    images: ["/images/products/georgette/chiffon-georgette-lilac.jpg"],
    description: georgetteDescription,
    details: [],
    stock: 25,
    keywords: ["georgette", "chiffon", "hijab", "lilac"],
    isNew: true,
  },
  {
    id: "chiffon-georgette-black",
    slug: "chiffon-georgette-black",
    name: "Chiffon Georgette - BLACK",
    category: "Hijabs",
    subcategory: "Chiffon Georgette",
    collection: "Chiffon Georgette",
    collections: ["hijabs"],
    price: 500,
    colors: [{ name: "Black", hex: "#1c1c1c" }],
    images: ["/images/products/georgette/chiffon-georgette-black.jpg"],
    description: georgetteDescription,
    details: [],
    stock: 25,
    keywords: ["georgette", "chiffon", "hijab", "black"],
    isNew: true,
  },

  // Leopard hijabs — classic collection
  { id: "classic-leopard-beige", slug: "classic-leopard-beige", name: "Classic Leopard - BEIGE", category: "Hijabs", subcategory: "Classic Leopard", collection: "Leopard Hijabs", collections: ["hijabs"], price: 650, colors: [{ name: "Beige", hex: "#d8c5a7" }], images: ["/images/products/classic-leopard/classic-leopard-beige.jpg"], description: leopardDescription, details: [], stock: 1, keywords: ["leopard", "classic", "printed hijab", "beige"], isNew: true },
  { id: "classic-leopard-black", slug: "classic-leopard-black", name: "Classic Leopard - BLACK", category: "Hijabs", subcategory: "Classic Leopard", collection: "Leopard Hijabs", collections: ["hijabs"], price: 650, colors: [{ name: "Black", hex: "#1c1c1c" }], images: ["/images/products/classic-leopard/classic-leopard-black.jpg"], description: leopardDescription, details: [], stock: 1, keywords: ["leopard", "classic", "printed hijab", "black"], isNew: true },
  { id: "classic-leopard-brown", slug: "classic-leopard-brown", name: "Classic Leopard - BROWN", category: "Hijabs", subcategory: "Classic Leopard", collection: "Leopard Hijabs", collections: ["hijabs"], price: 650, colors: [{ name: "Brown", hex: "#79533d" }], images: ["/images/products/classic-leopard/classic-leopard-brown.jpg"], description: leopardDescription, details: [], stock: 1, keywords: ["leopard", "classic", "printed hijab", "brown"], isNew: true },
  { id: "classic-leopard-dark-grey", slug: "classic-leopard-dark-grey", name: "Classic Leopard - DARK GREY", category: "Hijabs", subcategory: "Classic Leopard", collection: "Leopard Hijabs", collections: ["hijabs"], price: 650, colors: [{ name: "Dark Grey", hex: "#55565a" }], images: ["/images/products/classic-leopard/classic-leopard-dark-grey.jpg"], description: leopardDescription, details: [], stock: 1, keywords: ["leopard", "classic", "printed hijab", "dark-grey"], isNew: true },
  { id: "classic-leopard-green", slug: "classic-leopard-green", name: "Classic Leopard - GREEN", category: "Hijabs", subcategory: "Classic Leopard", collection: "Leopard Hijabs", collections: ["hijabs"], price: 650, colors: [{ name: "Green", hex: "#52634a" }], images: ["/images/products/classic-leopard/classic-leopard-green.jpg"], description: leopardDescription, details: [], stock: 1, keywords: ["leopard", "classic", "printed hijab", "green"], isNew: true },
  { id: "classic-leopard-light-grey", slug: "classic-leopard-light-grey", name: "Classic Leopard - LIGHT GREY", category: "Hijabs", subcategory: "Classic Leopard", collection: "Leopard Hijabs", collections: ["hijabs"], price: 650, colors: [{ name: "Light Grey", hex: "#b9b9b5" }], images: ["/images/products/classic-leopard/classic-leopard-light-grey.jpg"], description: leopardDescription, details: [], stock: 1, keywords: ["leopard", "classic", "printed hijab", "light-grey"], isNew: true },
  { id: "classic-leopard-orange", slug: "classic-leopard-orange", name: "Classic Leopard - ORANGE", category: "Hijabs", subcategory: "Classic Leopard", collection: "Leopard Hijabs", collections: ["hijabs"], price: 650, colors: [{ name: "Orange", hex: "#c87943" }], images: ["/images/products/classic-leopard/classic-leopard-orange.jpg"], description: leopardDescription, details: [], stock: 1, keywords: ["leopard", "classic", "printed hijab", "orange"], isNew: true },
  { id: "classic-leopard-pink", slug: "classic-leopard-pink", name: "Classic Leopard - PINK", category: "Hijabs", subcategory: "Classic Leopard", collection: "Leopard Hijabs", collections: ["hijabs"], price: 650, colors: [{ name: "Pink", hex: "#d69aa6" }], images: ["/images/products/classic-leopard/classic-leopard-pink.jpg"], description: leopardDescription, details: [], stock: 1, keywords: ["leopard", "classic", "printed hijab", "pink"], isNew: true },
  { id: "classic-leopard-sage-grey", slug: "classic-leopard-sage-grey", name: "Classic Leopard - SAGE GREY", category: "Hijabs", subcategory: "Classic Leopard", collection: "Leopard Hijabs", collections: ["hijabs"], price: 650, colors: [{ name: "Sage Grey", hex: "#a4a69a" }], images: ["/images/products/classic-leopard/classic-leopard-sage-grey.jpg"], description: leopardDescription, details: [], stock: 1, keywords: ["leopard", "classic", "printed hijab", "sage-grey"], isNew: true },
  { id: "classic-leopard-sand", slug: "classic-leopard-sand", name: "Classic Leopard - SAND", category: "Hijabs", subcategory: "Classic Leopard", collection: "Leopard Hijabs", collections: ["hijabs"], price: 650, colors: [{ name: "Sand", hex: "#c9b89e" }], images: ["/images/products/classic-leopard/classic-leopard-sand.jpg"], description: leopardDescription, details: [], stock: 1, keywords: ["leopard", "classic", "printed hijab", "sand"], isNew: true },
  { id: "classic-leopard-white", slug: "classic-leopard-white", name: "Classic Leopard - WHITE", category: "Hijabs", subcategory: "Classic Leopard", collection: "Leopard Hijabs", collections: ["hijabs"], price: 650, colors: [{ name: "White", hex: "#f1eee7" }], images: ["/images/products/classic-leopard/classic-leopard-white.jpg"], description: leopardDescription, details: [], stock: 1, keywords: ["leopard", "classic", "printed hijab", "white"], isNew: true },
  { id: "vintage-leopard-blue", slug: "vintage-leopard-blue", name: "Vintage Leopard - BLUE", category: "Hijabs", subcategory: "Vintage Leopard", collection: "Leopard Hijabs", collections: ["hijabs"], price: 650, colors: [{ name: "Blue", hex: "#405c91" }], images: ["/images/products/vintage-leopard/vintage-leopard-blue.jpg", "/images/products/vintage-leopard/vintage-leopard-blue-2.jpg"], description: leopardDescription, details: [], stock: 1, keywords: ["leopard", "vintage", "printed hijab", "blue"], isNew: true },
  { id: "vintage-leopard-butter-yellow", slug: "vintage-leopard-butter-yellow", name: "Vintage Leopard - BUTTER YELLOW", category: "Hijabs", subcategory: "Vintage Leopard", collection: "Leopard Hijabs", collections: ["hijabs"], price: 650, colors: [{ name: "Butter Yellow", hex: "#e6d28b" }], images: ["/images/products/vintage-leopard/vintage-leopard-butter-yellow.jpg"], description: leopardDescription, details: [], stock: 1, keywords: ["leopard", "vintage", "printed hijab", "butter-yellow"], isNew: true },
  { id: "vintage-leopard-mahroon", slug: "vintage-leopard-mahroon", name: "Vintage Leopard - MAHROON", category: "Hijabs", subcategory: "Vintage Leopard", collection: "Leopard Hijabs", collections: ["hijabs"], price: 650, colors: [{ name: "Mahroon", hex: "#6b1f2a" }], images: ["/images/products/vintage-leopard/vintage-leopard-mahroon.jpg", "/images/products/vintage-leopard/vintage-leopard-mahroon-2.jpg"], description: leopardDescription, details: [], stock: 1, keywords: ["leopard", "vintage", "printed hijab", "mahroon"], isNew: true },
  { id: "pin-wheel-multi", slug: "pin-wheel-multi", name: "Pin Wheel - MULTI", category: "Accessories", subcategory: "Hijab Pins", collection: "Accessories", collections: ["accessories"], price: 70, images: ["/images/products/accessories-pins/pin-wheel-multi.jpg"], description: "A must-have accessory for your everyday hijab styling.\n\n*Note:* Color may slightly vary due to lighting and screen settings.", details: [], stock: 50, keywords: ["pin wheel", "hijab pin", "accessory"] },
  { id: "bulb-pins-silver", slug: "snag-free-bulb-pins-silver", name: "Snag Free Pear/Bulb Pins - 30 SILVER", category: "Accessories", subcategory: "Hijab Pins", collection: "Accessories", collections: ["accessories"], price: 50, colors: [{ name: "Silver", hex: "#c0c0c0" }], images: ["/images/products/accessories-pins/bulb-pins-silver.jpg", "/images/products/accessories-pins/bulb-pins-silver-2.jpg"], description: "Keep your hijabs secure without worrying about snags or fabric damage.\n\nOur snag-free *Pear/Bulb Pins* offer a smooth, elegant, and hassle-free way to style your hijabs every day.\n\n*Quantity:* 30 pins per pack\n\n*Note:* Color may slightly vary due to lighting and screen settings.", details: [], stock: 50, keywords: ["snag free", "pear pins", "bulb pins", "hijab pins", "silver"] },
  { id: "bulb-pins-golden", slug: "snag-free-bulb-pins-golden", name: "Snag Free Pear/Bulb Pins - 30 GOLDEN", category: "Accessories", subcategory: "Hijab Pins", collection: "Accessories", collections: ["accessories"], price: 50, colors: [{ name: "Golden", hex: "#c9a45b" }], images: ["/images/products/accessories-pins/bulb-pins-golden.jpg", "/images/products/accessories-pins/bulb-pins-golden-2.jpg"], description: "Keep your hijabs secure without worrying about snags or fabric damage.\n\nOur snag-free *Pear/Bulb Pins* offer a smooth, elegant, and hassle-free way to style your hijabs every day.\n\n*Quantity:* 30 pins per pack\n\n*Note:* Color may slightly vary due to lighting and screen settings.", details: [], stock: 50, keywords: ["snag free", "pear pins", "bulb pins", "hijab pins", "golden"] },
  { id: "large-dubatta-black", slug: "large-dubatta-black", name: "Large Dubatta - BLACK", category: "Large Dubatta", collection: "Large Dubatta", collections: ["large-dubatta"], price: 1050, colors: [{ name: "Black", hex: "#1c1c1c" }], images: ["/images/products/large-dubatta/large-dubatta-black.jpg", "/images/products/large-dubatta/large-dubatta-black-detail.jpg"], description: "Are you tired of hijabs that are too small? 🤍\n\nRAH has solved this problem for you!\n\nWe’ve launched our *Large Dubatta/Hijab* for those who love extra coverage and a comfortable drape.\n\n🖤 *Available in black only*\n✨ *Suitable for all seasons*\n\n*Size:* 80 × 40 inches (approx.)\n*Fabric:* Korean formal\n\nEnjoy the coverage you’ve been looking for with RAH!\n\n*Note:* Color may slightly vary due to lighting and screen settings.", details: [], stock: 20, keywords: ["large dubatta", "large hijab", "black", "extra coverage"] }
];

// ---------------------------------------------------------------------------
// Inventory. Edit the numbers here when stock changes. Stock is never shown to
// customers; a colour (or product) at 0 shows "Out of stock" and cannot be added
// to the bag. Products with several colours list units per colour.
// ---------------------------------------------------------------------------
const inventory: Record<string, number | Record<string, number>> = {
  // Soft Crinkle Crimp
  "soft-crinkle-crimp-dusty-navy-blue": 1,
  "soft-crinkle-crimp-forest-green": 2,
  "soft-crinkle-crimp-navy-blue": 1,
  "soft-crinkle-crimp-black": 1,
  "soft-crinkle-crimp-choco-brown": 1,
  "soft-crinkle-crimp-royal-mahroon": 1,
  "soft-crinkle-crimp-olive": 2,
  "soft-crinkle-crimp-purple-plum": 1,
  "soft-crinkle-crimp-ice-grey": 1,
  // Turkish Lawn (units per colour)
  "turkish-lawn-hijab": {
    "Navy Blue": 2, "Baby Blue": 2, "Uniform Blue": 2, "Rose Pink": 2, "Soft Pink": 2, "Peach Pink": 2,
    "Light Grey": 2, "Black": 2, "Dark Grey": 2, "Leaf Green": 2, "Mehndi Green": 2, "Forest Green": 2,
    "Mulberry": 2, "Burnt Orange": 2, "Mahroon Red": 2, "Chocolate Brown": 2, "Dusty Nude": 2,
    "Camel Brown": 1, "Blush Pink": 2, "Salmon Pink": 2, "Lime Beige": 2, "Dusty Teal": 2,
    "Light Taupe": 2, "Lavender": 2, "Purple": 2, "Dusty Blue": 2, "Muted Slate Blue": 2,
  },
  // Matching Hijab and Niqab (units per colour)
  "matching-hijab-and-niqab-set": { "Mulberry": 2, "Purple": 2, "Bottle Green": 1, "Dark Grey": 1, "Off White": 0, "Blue Grey": 0 },
  // Chiffon Georgette
  "chiffon-georgette-purple": 1,
  "chiffon-georgette-lavender": 0,
  "chiffon-georgette-chocolate-brown": 1,
  "chiffon-georgette-mahroon": 2,
  "chiffon-georgette-navy-blue": 2,
  "chiffon-georgette-lilac": 4,
  "chiffon-georgette-sea-foam": 3,
  "chiffon-georgette-black": 2,
  // Matching Hijab and Cap
  "matching-hijab-and-cap-chocolate-brown": 1,
  "matching-hijab-and-cap-mahroon": 1,
  "matching-hijab-and-cap-lavender": 1,
  "matching-hijab-and-cap-teal": 1,
  "matching-hijab-and-cap-purple": 1,
  "matching-hijab-and-cap-navy-blue": 1,
  "matching-hijab-and-cap-blush-pink": 0,
  "matching-hijab-and-cap-black": 1,
  // Tube Caps
  "tube-cap-black": 1,
  "tube-cap-blush-pink": 2,
  "tube-cap-brown": 3,
  "tube-cap-chocolate-brown": 1,
  "tube-cap-grey": 3,
  "tube-cap-lavender": 0,
  "tube-cap-lilac": 4,
  "tube-cap-navy-blue": 1,
  "tube-cap-purple": 2,
  "tube-cap-red": 2,
  "tube-cap-teal": 1,
  // Leopard hijabs: 1 each (Classic Leopard Brown, Beige and Sand are sold out)
  "classic-leopard-beige": 0, "classic-leopard-black": 1, "classic-leopard-brown": 0, "classic-leopard-dark-grey": 1,
  "classic-leopard-green": 1, "classic-leopard-light-grey": 1, "classic-leopard-orange": 1, "classic-leopard-pink": 1,
  "classic-leopard-sage-grey": 1, "classic-leopard-sand": 0, "classic-leopard-white": 1,
  "vintage-leopard-blue": 1, "vintage-leopard-butter-yellow": 1, "vintage-leopard-mahroon": 1,
  "leopard-print-arabic-lawn-hijab-mehndi-green": 1,
  // Hijab pins (bulb pins: 800 pins in stock, never shown to customers)
  "pin-wheel-multi": 2,
  "bulb-pins-silver": 800,
  "bulb-pins-golden": 800,
  // Large Dubatta
  "large-dubatta-black": 2,
  // Irani Chaddar
  "irani-chaddar-black": 1,
};
// Every hijab magnet: 1 piece per colour.
products.filter((item) => item.subcategory === "Magnets").forEach((item) => { inventory[item.id] = 1; });

products.forEach((item) => {
  const units = inventory[item.id];
  if (units === undefined) return;
  if (typeof units === "number") {
    item.stock = units;
  } else {
    item.colorStock = units;
    item.stock = Object.values(units).reduce((sum, value) => sum + value, 0);
  }
});

/** Units available for a product, optionally for one colour. */
export const getStock = (product: Product, color?: string) =>
  product.colorStock ? (color ? product.colorStock[color] ?? 0 : product.stock) : product.stock;

/** Key used for this product/colour in the stock database ('' for single-colour products). */
export const stockKey = (product: Product, color: string) => (product.colorStock ? color : "");

/** Replaces the built-in stock numbers with the live numbers from the stock database. */
export const applyRemoteStock = (remote: Record<string, Record<string, number>>) => {
  // The stock database is the single source of truth. If it answered with nothing at all
  // (not set up / blocked) keep the built-in numbers instead of showing everything sold out.
  if (!remote || !Object.keys(remote).length) return;
  const clean = (value: unknown) => (typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0);
  const norm = (name: string) => name.trim().toLowerCase();
  products.forEach((item) => {
    if (item.bundleOf) return;
    const live = remote[item.id] || {}; // no row in the database = out of stock
    if (item.colorStock) {
      const next: Record<string, number> = {};
      Object.keys(item.colorStock).forEach((name) => {
        next[name] = Object.entries(live)
          .filter(([key]) => norm(key) === norm(name))
          .reduce((sum, [, qty]) => sum + clean(qty), 0);
      });
      item.colorStock = next;
      item.stock = Object.values(next).reduce((sum, value) => sum + value, 0);
    } else {
      // Single-colour piece: every row of this product counts, whatever its colour label says.
      item.stock = Object.values(live).reduce((sum, qty) => sum + clean(qty), 0);
    }
  });
  products
    .filter((item) => item.bundleOf)
    .forEach((bundle) => {
      bundle.stock = getBundleOptions(bundle.bundleOf as string).reduce((sum, option) => sum + option.stock, 0);
    });
};

// ---------------------------------------------------------------------------
// Build-your-own hijab bundles: one bundle product per hijab sub-category that
// has products. Customers pick 2–6 pieces, each in any colour.
// ---------------------------------------------------------------------------
export type BundleOption = { productId: string; color: string; hex: string; price: number; image: string; stock: number };

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
        stock: getStock(item, color.name),
        image: item.images[item.colorImages?.[color.name] ?? 0],
      })),
    );

export const bundleTiers: Record<string, Record<number, number>> = {
  "Chiffon Georgette": { 3: 1450, 6: 2700 },
  "Soft Crinkle Crimps": { 3: 1400, 6: 2600 },
  "Turkish Lawn": { 2: 1100, 4: 2000, 6: 2700 },
};

const bundleIntro = `*Build your own bundle:* choose one of the available bundle sizes in any colours and get a special bundle price. You can repeat a colour as many times as you like. Single pieces are available as individual products in this sub-category.`;

[
  { sub: "Soft Crinkle Crimps", name: "Soft Crinkle Crimp Hijab Bundle", covers: ["/images/products/soft-crinkle-crimp/soft-crinkle-crimp-black.jpg", "/images/bundles/soft-crinkle-crimp.jpg"] },
  { sub: "Turkish Lawn", name: "Turkish Lawn Hijab Bundle", covers: ["/images/bundles/turkish-lawn.jpg", "/images/products/turkish-lawn/turkish-lawn-dusty-blue.jpg"] },
  { sub: "Chiffon Georgette", name: "Chiffon Georgette Hijab Bundle", covers: ["/images/products/georgette/chiffon-georgette-mahroon.jpg", "/images/bundles/georgette.jpg", "/images/bundles/georgette-2.jpg"] },
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
    price: bundleTiers[sub][Math.min(...Object.keys(bundleTiers[sub]).map(Number))],
    colors,
    images,
    description: `${bundleIntro}\n${source.description}`,
    details: [],
    stock: options.reduce((sum, option) => sum + option.stock, 0),
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
    slug: "chiffon-georgette",
    title: "Chiffon Georgette",
    description: "Lightweight, graceful layers for effortless everyday styling.",
    image: imageLibrary.georgette,
  },
  {
    slug: "accessories",
    title: "Accessories",
    description: "Quietly useful finishing touches for your everyday edit.",
    image: imageLibrary.accessories,
  },
  {
    slug: "irani-chaddar",
    title: "Irani Chadar",
    description: "Timeless full-coverage layers, thoughtfully made.",
    image: imageLibrary.abaya,
  },
  {
    slug: "soft-crinkle-crimps",
    title: "Soft Crinkle Crimp",
    description: "Soft, breathable texture made for all-season comfort.",
    image: "/images/products/soft-crinkle-crimp/soft-crinkle-crimp-black.jpg",
  },
];

export type SubCategory = { label: string; slug: string; children?: SubCategory[] };

export const subCategories: Record<string, SubCategory[]> = {
  hijabs: [
    "Chiffon Georgette",
    "Turkish Lawn",
    "Soft Crinkle Crimps",
    "Matching Hijab and Cap",
    "Matching Hijab and Niqab",
    "Soft Lawn",
  ]
    .map((label): SubCategory => ({ label, slug: label.toLowerCase().replace(/ /g, "-") }))
    .concat([
      {
        label: "Leopard Print Hijabs",
        slug: "leopard-print-hijabs",
        children: ["Classic Leopard", "Vintage Leopard"].map((label) => ({ label, slug: label.toLowerCase().replace(/ /g, "-") })),
      },
    ]),
  accessories: ["Tube Caps", "Hijab Pins", "Magnets"].map((label) => ({
    label,
    slug: label.toLowerCase().replace(/ /g, "-"),
  })),
};

export const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Hijabs", href: "/collections/hijabs" },
  { label: "Irani Chaddar", href: "/collections/irani-chaddar" },
  { label: "Accessories", href: "/collections/accessories" },
  { label: "Large Dubatta", href: "/collections/large-dubatta" },
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