import type { Product, ProductImage } from "./types";

/**
 * CATÁLOGO DE PRODUCTOS
 * --------------------------------------------------------------
 * Fuente: Catálogo Bekoko 2026 (precios y notas tal como aparecen).
 * - El orden del arreglo es el orden en la web.
 * - Para agregar un producto, copia un bloque y cambia sus datos.
 * - Para eliminarlo, borra su bloque.
 * - Fotos en /public/images/productos.
 */

const img = (file: string, alt: string, fit: ProductImage["fit"] = "cover"): ProductImage => ({
  src: `/images/productos/${file}`,
  alt,
  fit,
});

/** Home spray de 500 ml: mismos datos, distinto aroma. */
const homeSpray = (id: string, name: string, notes: string, categoryId = "home-spray"): Product => ({
  id,
  name,
  categoryId,
  notes,
  size: "500 ml",
  price: 16000,
  image: img(`${id}.webp`, `Home spray ${name} de 500 ml en botella ámbar con gatillo`),
});

const aromas250 = [
  "Be Wood",
  "Citrus Valley",
  "Fig",
  "Ipanema",
  "Pink Dragonfruit",
  "Woodland Vanilla",
  "Sunset",
  "White Tea & Fig",
  "Wild",
];

const aromasVidrio = ["Santal", "Bergamote Breeze", "Baies", "Lemon Zest"];

export const products: Product[] = [
  // ---------- Home Spray ----------
  homeSpray("for-her", "For Her", "Durazno · Maracuyá · Sándalo"),
  homeSpray("juicy-melon", "Juicy Melon", "Melón · Lirios del Valle · Almizcle"),
  homeSpray("black-cherry", "Black Cherry", "Cherry · Flor de Cerezo · Dulces Frutales"),
  homeSpray("ipanema", "Ipanema", "Durazno · Frambuesa · Sándalo"),
  homeSpray("california", "California", "Pera · Orquídea · Sándalo"),
  homeSpray("pink-dragon-fruit", "Pink Dragon Fruit", "Frutos de dragón · Flor de durazno · Ámbar"),
  homeSpray("wild", "Wild", "Bergamota · Jazmín · Cedro"),
  homeSpray("woodland-vanilla", "Woodland Vanilla", "Vainilla · Salvia · Cedro"),
  homeSpray("soft-leather", "Soft Leather", "Melón · Lavanda · Cedro"),
  homeSpray("sunset", "Sunset", "Coco · Muguet · Vainilla"),
  homeSpray("be-wood", "Be Wood", "Durazno · Orquídea · Cedro"),
  homeSpray("fig", "Fig", "Higo · Violeta · Cedro"),
  homeSpray("green-tea", "Green Tea", "Lima · Azahar · Cedro"),
  homeSpray("white-tea-fig", "White Tea & Fig", "Bergamota · Té Blanco · Cedro"),
  homeSpray("true-magic", "True Magic", "Pomelo · Naranja · Almizcle"),
  homeSpray("citrus-valley", "Citrus Valley", "Lima · Rosas · Almizcle"),
  homeSpray("lemon-verbena", "Lemon Verbena", "Limón · Verbena · Almizcle"),
  homeSpray("fresh-linen", "Fresh Linen", "Naranja · Violeta · Dulces Frutales"),
  homeSpray("french-tree", "French Tree", "Bergamota · Vainilla · Ciprés Francés"),
  homeSpray("lemonchello-pomelo", "Lemonchello Pomelo", "Pomelo · Muguet · Dulces Frutales"),
  homeSpray("ginger-tea", "Ginger Tea", "Limón · Té Verde · Almizcle · Palo de Bergamota"),
  {
    id: "home-spray-vidrio",
    name: "Home Spray Vidrio",
    categoryId: "home-spray",
    description: "Home spray en envase de vidrio ámbar.",
    size: "500 ml",
    price: 18000,
    image: img("home-spray-vidrio.webp", "Home spray en botella de vidrio ámbar con etiqueta azul", "contain"),
    variants: { label: "Aroma", options: aromasVidrio },
  },

  // ---------- Gourmand ----------
  homeSpray("cafe-biscoti", "Cafe Biscoti", "Granos de café y caramelo", "gourmand"),
  homeSpray("cotton-candy", "Cotton Candy", "Algodón de azúcar, frutal y goloso", "gourmand"),
  homeSpray("sandia-limon", "Sandía Limón", "Frutal, sandía y limón fresco", "gourmand"),
  homeSpray("cinnamon-buns", "Cinnamon Buns", "Cálido, dulce y especiado", "gourmand"),
  homeSpray("chocolate-dubai", "Chocolate Dubai", "Pistacho tostado · Frutos secos", "gourmand"),
  homeSpray("gingerbread-cookie", "Gingerbread Cookie", "Galletas de jengibre", "gourmand"),

  // ---------- Difusores de varillas ----------
  {
    id: "difusor-vidrio-150",
    name: "Difusor de varillas Vidrio",
    categoryId: "difusores",
    description: "Envase de vidrio con varillas negras. Disponible en 4 aromas.",
    size: "150 ml",
    price: 20000,
    image: img("difusor-vidrio-150ml-1.webp", "Difusor de varillas negras en frasco de vidrio oscuro de 150 ml"),
    variants: { label: "Aroma", options: aromasVidrio },
  },
  {
    id: "difusor-250",
    name: "Difusor de varillas",
    categoryId: "difusores",
    description: "Frasco de vidrio transparente con varillas naturales.",
    size: "250 ml",
    price: 18000,
    image: img("difusor-250ml.webp", "Cuatro difusores de varillas naturales en frascos de vidrio con etiquetas de colores"),
    variants: { label: "Aroma", options: aromas250 },
  },

  // ---------- Auto y closet ----------
  {
    id: "difusor-auto-closet",
    name: "Aromatizante colgante",
    categoryId: "auto-closet",
    description: "Para auto, closets o baños.",
    size: "8 ml",
    price: 7000,
    image: img("difusor-auto-closet.webp", "Aromatizante colgante de vidrio con tapa de madera junto a su caja", "contain"),
    variants: { label: "Aroma", options: aromas250 },
  },

  // ---------- Difusor automático ----------
  {
    id: "difusor-c300",
    name: "Difusor Automático C300 Bluetooth®",
    categoryId: "difusor-automatico",
    description:
      "Ventilador de difusión silencioso y control por Bluetooth® desde una aplicación móvil. Se utiliza con Fragancia Pura.",
    price: 74990,
    image: img("difusor-c300.webp", "Difusor automático C300 blanco sobre una mesa junto a fragancias", "contain"),
  },
  {
    id: "fragancia-pura",
    name: "Fragancia Pura para equipo",
    categoryId: "difusor-automatico",
    description: "Para el Difusor C300. Variedad de aromas disponibles, consulta por la tuya.",
    size: "130 ml",
    price: 28000,
    image: img("fragancia-pura.webp", "Botella de Fragancia Pura Black Cherry de 130 ml", "contain"),
  },
  {
    id: "esencia-humidificador",
    name: "Esencia para humidificador",
    categoryId: "difusor-automatico",
    description: "Frasco gotario. Variedad de aromas disponibles, consulta por la tuya.",
    size: "30 ml",
    price: 12000,
    image: img("esencia-humidificador-2.webp", "Esencia para humidificador en frasco gotario de 30 ml con su caja", "contain"),
  },

  // ---------- Manos y mascotas ----------
  {
    id: "alcohol-spray-manos",
    name: "Alcohol Spray para Manos",
    categoryId: "cuidado",
    description: "Para llevar en el bolso, tener en el auto o dejar en distintos lugares de la casa.",
    size: "250 ml",
    price: 9000,
    image: img("alcohol-spray-1.webp", "Alcohol en spray para manos aroma True Magic de 250 ml"),
    variants: {
      label: "Aroma",
      options: ["Green Tea", "Ipanema", "Lemon Verbena", "Pink Dragonfruit", "True Magic"],
      images: {
        "True Magic": img("alcohol-spray-1.webp", "Alcohol en spray para manos aroma True Magic"),
        "Lemon Verbena": img("alcohol-spray-2.webp", "Alcohol en spray para manos aroma Lemon Verbena"),
        "Green Tea": img("alcohol-spray-3.webp", "Alcohol en spray para manos aroma Green Tea"),
        "Pink Dragonfruit": img("alcohol-spray-4.webp", "Alcohol en spray para manos aroma Pink Dragonfruit"),
      },
    },
  },
  {
    id: "eliminador-olores-mascotas",
    name: "Eliminador Olores Mascotas",
    categoryId: "cuidado",
    description:
      "Tecnología de encapsulamiento que atrapa los olores en las fibras textiles en lugar de solo cubrirlos.",
    size: "250 ml",
    price: 10990,
    image: img("eliminador-olores-mascotas.webp", "Spray eliminador de olores de mascotas en botella negra", "contain"),
    variants: { label: "Aroma", options: ["Citric Apple", "Coco Bloom"] },
  },
];
