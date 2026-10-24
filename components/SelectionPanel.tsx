"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import { selectionContent as c } from "@/content/sections";
import { formatPrice } from "@/lib/format";
import { MAX_QUANTITY, countItems, resolveItems, selection, useSelection } from "@/lib/selection";
import { ui, useUI } from "@/lib/ui-store";
import { buildSelectionMessage } from "@/lib/whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";
import { btn } from "./button-styles";
import { IconArrow, IconBag, IconClose, IconMinus, IconPlus, IconTrash } from "./icons";

/** Panel lateral (escritorio) / hoja inferior (móvil) con la selección. */
export function SelectionPanel() {
  const open = useUI((s) => s.selectionOpen);
  const items = resolveItems(useSelection());
  const count = countItems(items);
  const closeRef = useRef<HTMLButtonElement>(null);

  const total = items.reduce((sum, i) => sum + (i.product.price ?? 0) * i.quantity, 0);
  const allPriced = items.every((i) => typeof i.product.price === "number");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && ui.closeSelection();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  const message = () =>
    buildSelectionMessage(
      items.map((i) => ({ name: i.product.name, presentation: i.product.size, variant: i.variant, quantity: i.quantity })),
    );

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="seleccion-titulo">
      <button type="button" aria-label="Cerrar selección" className="absolute inset-0 bg-ink/40" onClick={ui.closeSelection} />
      <div className="absolute inset-x-0 bottom-0 flex max-h-[88dvh] flex-col rounded-t-3xl bg-paper shadow-2xl sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-[420px] sm:rounded-none">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id="seleccion-titulo" className="font-display text-2xl">
            {c.title} {count > 0 && <span className="font-sans text-sm text-muted">({count})</span>}
          </h2>
          <button ref={closeRef} type="button" onClick={ui.closeSelection} aria-label="Cerrar selección" className="flex size-11 items-center justify-center rounded-full hover:bg-brand-soft">
            <IconClose />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 py-14 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-brand-soft text-brand-dark">
              <IconBag />
            </span>
            <p className="text-sm text-muted">{c.empty}</p>
            <a href="#catalogo" onClick={ui.closeSelection} className={btn.primary}>
              Explorar catálogo <IconArrow />
            </a>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto overscroll-contain px-5" data-testid="selection-list">
              {items.map((i) => {
                const image = (i.variant && i.product.variants?.images?.[i.variant]) || i.product.image;
                return (
                  <li key={`${i.productId}-${i.variant ?? ""}`} className="flex gap-3 py-4">
                    <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-photo">
                      <Image src={image.src} alt="" fill sizes="64px" className={image.fit === "contain" ? "object-contain p-1" : "object-cover"} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-[17px] leading-tight">{i.product.name}</p>
                      <p className="mt-0.5 text-[12px] text-muted">{[i.variant, i.product.size].filter(Boolean).join(" · ")}</p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <div className="flex items-center rounded-full border border-line bg-white">
                          <button
                            type="button"
                            className="flex size-10 items-center justify-center"
                            aria-label={`Disminuir cantidad de ${i.product.name}`}
                            onClick={() => selection.setQuantity(i.productId, i.variant, i.quantity - 1)}
                          >
                            <IconMinus />
                          </button>
                          <span className="w-7 text-center text-sm tabular-nums" aria-live="polite" data-testid="item-qty">
                            {i.quantity}
                          </span>
                          <button
                            type="button"
                            className="flex size-10 items-center justify-center disabled:opacity-30"
                            aria-label={`Aumentar cantidad de ${i.product.name}`}
                            disabled={i.quantity >= MAX_QUANTITY}
                            onClick={() => selection.setQuantity(i.productId, i.variant, i.quantity + 1)}
                          >
                            <IconPlus />
                          </button>
                        </div>
                        {siteConfig.showPrices && i.product.price && (
                          <span className="text-sm font-medium text-brand-dark">{formatPrice(i.product.price * i.quantity)}</span>
                        )}
                        <button
                          type="button"
                          className="flex size-10 items-center justify-center rounded-full text-muted hover:bg-red-50 hover:text-red-700"
                          aria-label={`Eliminar ${i.product.name} de la selección`}
                          onClick={() => selection.remove(i.productId, i.variant)}
                        >
                          <IconTrash />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-line bg-white px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
              {siteConfig.showPrices && siteConfig.showEstimatedTotal && total > 0 && (
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="text-sm text-muted">
                    {c.estimatedLabel}
                    {!allPriced && " (parcial)"}
                  </span>
                  <span className="text-lg font-semibold">{formatPrice(total)}</span>
                </div>
              )}
              <p className="mb-3 text-[12px] leading-snug text-muted">{c.helper}</p>
              <WhatsAppButton message={message} className={`${btn.whatsapp} w-full`}>
                {c.sendLabel}
              </WhatsAppButton>
              <button
                type="button"
                onClick={() => window.confirm("¿Quieres vaciar tu selección?") && selection.clear()}
                className="mt-2 min-h-11 w-full text-[13px] text-muted underline-offset-4 hover:underline"
              >
                {c.clearLabel}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/** Barra flotante en móvil cuando hay productos seleccionados. */
export function SelectionBar() {
  const count = countItems(useSelection());
  const open = useUI((s) => s.selectionOpen || s.menuOpen);
  if (count === 0 || open) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:hidden">
      <button
        type="button"
        onClick={ui.openSelection}
        className="pointer-events-auto flex min-h-14 w-full items-center justify-between rounded-full bg-ink px-5 text-white shadow-xl"
        data-testid="selection-bar"
      >
        <span className="flex items-center gap-2 text-sm">
          <IconBag width={20} height={20} />
          Tu selección · {count} {count === 1 ? "producto" : "productos"}
        </span>
        <span className="text-sm font-medium">Ver</span>
      </button>
    </div>
  );
}
