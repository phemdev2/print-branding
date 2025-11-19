export const products: Product[] = [
  {
    id: 1,
    title: "Business Card",
    description: "Premium glossy/matt finish, 300gsm board.",
    image: "/images/business-card.jpg",
    category: "Print Materials",
    variants: [
      { finish: "Gloss", grams: 300, pricePer100: 15000 },
      { finish: "Matt", grams: 350, pricePer100: 16000 },
    ],
  },
  {
    id: 2,
    title: "Banner",
    description: "Full color flex banner, perfect for indoor/outdoor ads.",
    image: "/images/rollup.png",
    category: "Print Materials",
    variants: [
      { finish: "Gloss", grams: 200, pricePer100: 20000 },
      { finish: "Matt", grams: 250, pricePer100: 22000 },
    ],
  },
  {
    id: 3,
    title: "Flyer",
    description: "Vibrant and professional flyer printing.",
    image: "/images/flyer.png",
    category: "Print Materials",
    variants: [
      { finish: "Gloss", grams: 150, pricePer100: 12000 },
      { finish: "Matt", grams: 200, pricePer100: 13000 },
    ],
  },
  {
    id: 4,
    title: "Pen",
    description: "Custom-branded pens with logo print.",
    image: "/images/pen.jpeg",
    category: "Stationery",
    variants: [
      { finish: "Gloss", grams: 0, pricePer100: 10000 },
    ],
  },
];