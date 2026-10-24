import Image from "next/image";
import { siteConfig } from "@/config/site";

/**
 * Logotipo. Mientras `siteConfig.logo.src` sea null muestra el espacio
 * provisional blanco con el texto "LOGO". Al definir la ruta (SVG/PNG/WebP)
 * se reemplaza automáticamente sin tocar el diseño.
 */
export function Logo({ size = 44 }: { size?: number }) {
  const { src, alt, aspectRatio } = siteConfig.logo;
  const width = Math.round(size * aspectRatio);

  if (src) {
    return (
      <span className="relative block shrink-0" style={{ width, height: size }}>
        <Image src={src} alt={alt} fill sizes={`${width}px`} className="object-contain" priority />
      </span>
    );
  }

  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-md border border-line bg-white text-[10px] font-semibold tracking-[0.2em] text-muted"
      style={{ width, height: size }}
      aria-hidden
    >
      LOGO
    </span>
  );
}
