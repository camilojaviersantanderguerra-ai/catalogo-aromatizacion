/**
 * CONFIGURACIÓN DE MARCA Y SITIO
 * --------------------------------------------------------------
 * Cambia aquí el nombre, el logotipo y los datos SEO.
 * Mientras `logo.src` sea null se muestra el espacio provisional "LOGO".
 */
export const siteConfig = {
  /** Nombre comercial (provisional). */
  brandName: "NOMBRE DE LA MARCA",

  /** Frase corta bajo el nombre en el encabezado y pie. */
  tagline: "Aromatización ambiental",

  logo: {
    /**
     * Ruta del logotipo definitivo dentro de /public, por ejemplo
     * "/images/marca/logo.svg". Usa null para mostrar el espacio provisional.
     */
    src: null as string | null,
    /** Proporción ancho/alto del logo definitivo (1 = cuadrado). */
    aspectRatio: 1,
    alt: "Logotipo",
  },

  /** Dominio público. Vercel lo completa automáticamente si se deja vacío. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "",

  seo: {
    title: "NOMBRE DE LA MARCA · Aromatización ambiental",
    description:
      "Home spray, difusores de varillas, aromatizantes para auto y closet, difusor automático y fragancias. Revisa el catálogo y consulta por WhatsApp.",
    ogImage: "/images/ambiente/difusores-varillas.webp",
    locale: "es_CL",
  },

  /** Precios del catálogo 2026. Ponlo en false para ocultarlos. */
  showPrices: true,
  /** Muestra el valor referencial total en la selección. */
  showEstimatedTotal: true,
  priceNote: "Precios referenciales del catálogo 2026. Se confirman por WhatsApp.",
  currency: "CLP",
  locale: "es-CL",
} as const;
