export type Category = {
  id: string;
  name: string;
  /** Texto breve que aparece sobre la grilla al filtrar por categoría. */
  description: string;
};

export type ProductImage = {
  src: string;
  alt: string;
  /** "cover" para fotos cuadradas de estudio, "contain" para formatos verticales. */
  fit?: "cover" | "contain";
};

export type Product = {
  /** Identificador único, sin espacios (se usa en la selección guardada). */
  id: string;
  name: string;
  categoryId: string;
  /** Descripción breve. */
  description?: string;
  /** Notas olfativas, tal como aparecen en el catálogo. */
  notes?: string;
  /** Presentación o tamaño, ej. "500 ml". */
  size?: string;
  /** Precio en pesos chilenos. Déjalo vacío si no está confirmado. */
  price?: number;
  image: ProductImage;
  /** Opciones de aroma cuando un mismo producto viene en varias fragancias. */
  variants?: {
    label: string;
    options: string[];
    /** Foto específica para una opción (opcional). */
    images?: Record<string, ProductImage>;
  };
  /** Solo si existe información fiable. */
  availability?: string;
  /** Marca datos de prueba para que se distingan y se puedan eliminar. */
  demo?: boolean;
};
