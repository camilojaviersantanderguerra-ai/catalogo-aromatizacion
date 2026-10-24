# Catálogo de aromatización ambiental

Web de catálogo con selección de productos y consulta por WhatsApp. No procesa pagos ni pide datos personales.

Stack: Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · despliegue en Vercel.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # compilación de producción
npm run lint
```

## Dónde se cambia cada cosa

| Quiero cambiar…                              | Archivo |
|----------------------------------------------|---------|
| Colores, tipografías, radios                 | `app/globals.css` (bloque `@theme`) |
| Carga de fuentes (Poppins / Bodoni Moda)     | `app/layout.tsx` (imports `@fontsource/...`) |
| Nombre de la marca, logo, SEO, mostrar precios | `config/site.ts` |
| Número y mensajes de WhatsApp                | `config/whatsapp.ts` |
| Productos                                    | `data/products.ts` |
| Categorías y su orden                        | `data/categories.ts` |
| Textos de portada, ambientes, contacto, etc. | `content/sections.ts` |
| Orden de las secciones                       | `app/page.tsx` |
| Estilo de botones                            | `components/button-styles.ts` |
| Diseño de las tarjetas                       | `components/ProductCard.tsx` |
| Lógica de la selección                       | `lib/selection.ts` |
| Fotos                                        | `public/images/productos` y `public/images/ambiente` |

## Estructura

```
app/            layout (fuentes, SEO) y página
components/     Header, Hero, Catalog, ProductCard, Ambientes, SelectionPanel, Contact, Footer, Logo, Notice, WhatsAppButton
config/         site.ts (marca/SEO) · whatsapp.ts (número y mensajes)
content/        sections.ts (todos los textos de secciones)
data/           products.ts · categories.ts · types.ts
lib/            selection.ts (selección + localStorage) · whatsapp.ts (enlaces) · ui-store.ts · format.ts
public/images/  fotos de productos y de ambiente (extraídas del catálogo 2026)
```

## Productos

- **Agregar:** copia un bloque en `data/products.ts`, cambia `id` (único, sin espacios), nombre, categoría, precio, tamaño y foto. Para home spray de 500 ml basta una línea: `homeSpray("id", "Nombre", "Nota · Nota · Nota")` con la foto `public/images/productos/id.webp`.
- **Editar:** cambia el texto o precio en su bloque. Si un precio no está confirmado, borra la línea `price`.
- **Eliminar:** borra su bloque. Si alguien lo tenía en su selección, se descarta solo.
- **Aromas:** usa `variants: { label: "Aroma", options: [...] }`. Opcionalmente `images` para una foto por aroma.
- **Datos de prueba:** marca `demo: true` y aparecerá con etiqueta "Demo".
- **Ocultar todos los precios:** `showPrices: false` en `config/site.ts`.

## Logotipo

1. Copia el archivo a `public/images/marca/logo.svg` (o .png/.webp).
2. En `config/site.ts`: `logo.src: "/images/marca/logo.svg"` y ajusta `logo.aspectRatio` (ancho ÷ alto, ej. 3 para un logo horizontal).
3. Cambia `brandName` y `seo.title`.

## WhatsApp

En `config/whatsapp.ts`, `phoneNumber: "+56 9 XXXX XXXX"` — o en Vercel la variable de entorno `NEXT_PUBLIC_WHATSAPP_NUMBER` (requiere redeploy). Mientras esté vacío, los botones muestran "pendiente de configuración" y no abren enlaces.

## Decisiones técnicas

- Sin base de datos ni panel: el catálogo vive en archivos de datos editables.
- La selección se guarda en `localStorage` del navegador (sin datos personales); se sincroniza entre pestañas.
- Fuentes autoalojadas con `@fontsource` (sin depender de Google Fonts en la compilación).
- Las fotos del catálogo PDF venían a ~205 px; se ampliaron 4× con superresolución (EDSR) a ~800 px en WebP. Conviene reemplazarlas por fotos originales en alta resolución con el mismo nombre de archivo.
- El menú móvil y el panel de selección se renderizan fuera del encabezado: el `backdrop-blur` del header encerraría elementos `position: fixed`.
