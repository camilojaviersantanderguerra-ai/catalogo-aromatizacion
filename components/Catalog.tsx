"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { siteConfig } from "@/config/site";
import { catalogContent as c } from "@/content/sections";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { ui, useUI } from "@/lib/ui-store";
import { ProductCard } from "./ProductCard";
import { IconClose, IconSearch } from "./icons";

const normalize = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function Catalog() {
  const active = useUI((s) => s.activeCategory);
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);

  const counts = useMemo(
    () => Object.fromEntries(categories.map((cat) => [cat.id, products.filter((p) => p.categoryId === cat.id).length])),
    [],
  );

  const filtered = useMemo(() => {
    const q = normalize(deferred.trim());
    return products.filter((p) => {
      if (active !== "all" && p.categoryId !== active) return false;
      if (!q) return true;
      const hay = normalize([p.name, p.notes, p.description, p.size, ...(p.variants?.options ?? [])].join(" "));
      return q.split(/\s+/).every((w) => hay.includes(w));
    });
  }, [active, deferred]);

  const activeCategory = categories.find((cat) => cat.id === active);
  const grouped = active === "all" && !deferred.trim();

  const chip = (selected: boolean) =>
    `shrink-0 min-h-10 rounded-full border px-4 text-[13px] transition-colors ${
      selected ? "border-brand bg-brand text-white" : "border-line bg-white text-ink/80 hover:border-brand/60"
    }`;

  return (
    <section id="catalogo" className="scroll-mt-16 py-14 sm:py-20" aria-labelledby="catalogo-titulo">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brand-dark">{c.eyebrow}</p>
          <h2 id="catalogo-titulo" className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
            {c.title}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{c.subtitle}</p>
        </header>
      </div>

      {/* Filtros: fijos bajo el encabezado al desplazarse */}
      <div className="sticky top-16 z-30 mt-8 border-y border-line/80 bg-paper/95 backdrop-blur-md sm:top-[72px]">
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          <div className="relative">
            <IconSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={c.searchPlaceholder}
              aria-label="Buscar productos"
              className="min-h-11 w-full rounded-full border border-line bg-white pl-11 pr-11 text-[16px] placeholder:text-muted/80 sm:text-sm"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Borrar búsqueda"
                className="absolute right-1 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full text-muted"
              >
                <IconClose width={18} height={18} />
              </button>
            )}
          </div>
          <div
            className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
            role="group"
            aria-label="Filtrar por categoría"
          >
            <button type="button" className={chip(active === "all")} aria-pressed={active === "all"} onClick={() => ui.setCategory("all")}>
              Todos <span className="opacity-70">({products.length})</span>
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={chip(active === cat.id)}
                aria-pressed={active === cat.id}
                onClick={() => ui.setCategory(cat.id)}
              >
                {cat.name} <span className="opacity-70">({counts[cat.id]})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        {siteConfig.showPrices && <p className="mb-6 text-[12px] text-muted">{siteConfig.priceNote}</p>}

        {filtered.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line p-10 text-center text-muted">{c.emptyState}</p>
        ) : grouped ? (
          categories.map((cat, gi) => {
            const list = filtered.filter((p) => p.categoryId === cat.id);
            if (!list.length) return null;
            return (
              <section key={cat.id} className="mb-14 last:mb-0" aria-labelledby={`cat-${cat.id}`}>
                <div className="mb-5 flex flex-col gap-1 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                  <h3 id={`cat-${cat.id}`} className="font-display text-2xl sm:text-3xl">
                    {cat.name}
                  </h3>
                  <p className="max-w-xl text-[13px] leading-relaxed text-muted sm:text-right">{cat.description}</p>
                </div>
                <Grid>
                  {list.map((p, i) => (
                    <ProductCard key={p.id} product={p} priority={gi === 0 && i < 2} />
                  ))}
                </Grid>
              </section>
            );
          })
        ) : (
          <>
            {activeCategory && <p className="mb-6 max-w-2xl text-[14px] leading-relaxed text-muted">{activeCategory.description}</p>}
            <p className="mb-4 text-[12px] text-muted" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
            </p>
            <Grid>
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </Grid>
          </>
        )}
      </div>
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">{children}</div>;
}
