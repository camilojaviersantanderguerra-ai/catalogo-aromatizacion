/**
 * TEXTOS DE LAS SECCIONES — edita aquí titulares, subtítulos y bloques.
 */

export const navLinks = [
  { href: "#catalogo", label: "Catálogo" },
  { href: "#ambientes", label: "Ambientes" },
  { href: "#contacto", label: "Contacto" },
];

export const heroContent = {
  eyebrow: "Catálogo 2026 · Cruelty free",
  title: "Aromatiza tu espacio",
  subtitle:
    "Home spray, difusores de varillas, aromatizantes para auto y fragancias para difusor automático. Elige tus aromas y te asesoramos por WhatsApp.",
  primaryCta: { label: "Explorar catálogo", href: "#catalogo" },
  secondaryCta: { label: "Atención personalizada" },
  images: {
    main: {
      src: "/images/ambiente/spray-dormitorio.webp",
      alt: "Persona aplicando home spray en un dormitorio",
    },
    secondary: {
      src: "/images/ambiente/difusores-varillas.webp",
      alt: "Difusores de varillas naturales sobre una bandeja",
    },
  },
};

export const catalogContent = {
  eyebrow: "Catálogo",
  title: "Encuentra tu aroma",
  subtitle: "Agrega los productos que te interesan a tu selección y envíanos la lista para recibir atención personalizada.",
  searchPlaceholder: "Buscar producto o aroma",
  emptyState: "No encontramos productos con esa búsqueda.",
};

/**
 * Ambientes: cada tarjeta lleva al catálogo filtrado.
 * Solo incluye espacios respaldados por el catálogo; agrega o quita tarjetas libremente.
 */
export const ambientesContent = {
  eyebrow: "Aromatización ambiental",
  title: "Un aroma para cada espacio",
  subtitle: "Elige el formato según el lugar que quieres aromatizar.",
  items: [
    {
      title: "Hogar",
      text: "Home spray para aromatizar al instante y difusores de varillas para un aroma permanente.",
      categoryId: "home-spray",
      image: { src: "/images/ambiente/spray-cojines.webp", alt: "Home spray aplicado sobre cojines" },
    },
    {
      title: "Auto, closet y baño",
      text: "Aromatizante colgante pensado para el auto y espacios reducidos.",
      categoryId: "auto-closet",
      image: { src: "/images/productos/difusor-auto-closet.webp", alt: "Aromatizante colgante para auto" },
    },
    {
      title: "Difusión automática",
      text: "Difusor C300 con control Bluetooth® desde tu celular y Fragancia Pura.",
      categoryId: "difusor-automatico",
      image: { src: "/images/ambiente/difusor-c300-ambiente.webp", alt: "Difusor automático C300 sobre una mesa" },
    },
    {
      title: "Telas y mascotas",
      text: "Eliminador de olores que atrapa los olores en las fibras textiles.",
      categoryId: "cuidado",
      image: { src: "/images/ambiente/mascotas.webp", alt: "Perro junto a dos sprays eliminadores de olores" },
    },
  ],
};

export const selectionContent = {
  title: "Tu selección",
  empty: "Aún no agregas productos. Explora el catálogo y agrega los que te interesen.",
  helper: "Revisa tu lista y envíala por WhatsApp. No se realiza ningún pago en esta página.",
  sendLabel: "Solicitar atención por WhatsApp",
  clearLabel: "Vaciar selección",
  estimatedLabel: "Valor referencial",
};

export const contactContent = {
  eyebrow: "Contacto",
  title: "Te atendemos por WhatsApp",
  text: "Cuéntanos qué espacio quieres aromatizar o envíanos tu selección. Te responderemos con precios, disponibilidad y opciones de compra.",
  cta: "Escribir por WhatsApp",
};

export const footerContent = {
  year: 2026,
  note: "Productos cruelty free.",
};
