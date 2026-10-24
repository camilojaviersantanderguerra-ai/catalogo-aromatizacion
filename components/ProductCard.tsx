"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { siteConfig } from "@/config/site";
import type { Product } from "@/data/types";
import { formatPrice } from "@/lib/format";
import { selection } from "@/lib/selection";
import { ui } from "@/lib/ui-store";
import { buildProductMessage } from "@/lib/whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";
import { IconCheck, IconPlus } from "./icons";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const selectId = useId();
  const [variant, setVariant] = useState<string | undefined>(product.variants?.options[0]);
  const [justAdded, setJustAdded] = useState(false);

  const image = (variant && product.variants?.images?.[variant]) || product.image;
  const showPrice = siteConfig.showPrices && typeof product.price === "number";

  const add = () => {
    selection.add(product.id, variant);
    setJustAdded(true);
    ui.notify(`${product.name}${variant ? ` · ${variant}` : ""} agregado a tu selección`, 2200);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface"
      data-testid="product-card"
      data-product-id={product.id}
    >
      <div className="relative aspect-square bg-photo">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 270px, (min-width: 640px) 33vw, 50vw"
          className={image.fit === "contain" ? "object-contain p-3" : "object-cover"}
        />
        {product.demo && (
          <span className="absolute left-2 top-2 rounded-full bg-amber-200 px-2 py-0.5 text-[10px] font-semibold uppercase">Demo</span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <div>
          <h3 className="font-display text-[17px] leading-tight sm:text-xl">{product.name}</h3>
          {product.notes && <p className="mt-1 text-[12px] leading-snug text-muted sm:text-[13px]">{product.notes}</p>}
          {product.description && (
            <p className="mt-1 line-clamp-3 text-[12px] leading-snug text-muted sm:text-[13px]">{product.description}</p>
          )}
        </div>

        <div className="mt-auto flex flex-wrap items-baseline justify-between gap-x-2 pt-1">
          {product.size && <span className="text-[12px] text-muted sm:text-[13px]">{product.size}</span>}
          {showPrice && (
            <span className="text-[15px] font-semibold text-brand-dark sm:text-base">{formatPrice(product.price!)}</span>
          )}
        </div>
        {product.availability && <p className="text-[12px] text-brand-dark">{product.availability}</p>}

        {product.variants && (
          <div>
            <label htmlFor={selectId} className="sr-only">
              {product.variants.label} de {product.name}
            </label>
            <select
              id={selectId}
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
              className="min-h-11 w-full rounded-xl border border-line bg-paper px-3 text-[13px] text-ink"
            >
              {product.variants.options.map((o) => (
                <option key={o} value={o}>
                  {product.variants!.label}: {o}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex flex-col gap-2 pt-1">
          <button
            type="button"
            onClick={add}
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-brand px-3 text-[13px] font-medium text-white transition-colors hover:bg-brand-dark"
            aria-label={`Agregar ${product.name}${variant ? `, aroma ${variant}` : ""} a la selección`}
          >
            {justAdded ? <IconCheck /> : <IconPlus />}
            {justAdded ? "Agregado" : "Agregar"}
          </button>
          <WhatsAppButton
            message={() => buildProductMessage({ name: product.name, presentation: product.size, variant })}
            ariaLabel={`Consultar producto ${product.name} por WhatsApp`}
            iconClassName="hidden min-[400px]:block sm:hidden lg:block"
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-ink/15 px-2 text-[13px] font-medium leading-tight text-ink transition-colors hover:border-whatsapp hover:text-whatsapp-dark"
          >
            Consultar producto
          </WhatsAppButton>
        </div>
      </div>
    </article>
  );
}
