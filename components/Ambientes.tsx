"use client";

import Image from "next/image";
import { ambientesContent as c } from "@/content/sections";
import { ui } from "@/lib/ui-store";
import { IconArrow } from "./icons";

export function Ambientes() {
  const go = (categoryId: string) => {
    ui.setCategory(categoryId);
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="ambientes" className="scroll-mt-16 border-y border-line bg-brand-soft/60 py-14 sm:py-20" aria-labelledby="ambientes-titulo">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brand-dark">{c.eyebrow}</p>
        <h2 id="ambientes-titulo" className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
          {c.title}
        </h2>
        <p className="mt-3 max-w-xl text-[15px] text-muted">{c.subtitle}</p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.items.map((item) => (
            <li key={item.title}>
              <button
                type="button"
                onClick={() => go(item.categoryId)}
                className="group flex h-full w-full flex-row overflow-hidden rounded-[var(--radius-card)] border border-line bg-white text-left transition-shadow hover:shadow-lg sm:flex-col"
              >
                <span className="relative block w-28 shrink-0 bg-photo sm:aspect-[4/3] sm:w-full">
                  <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 1024px) 270px, (min-width: 640px) 50vw, 112px" className="object-cover" />
                </span>
                <span className="flex flex-1 flex-col gap-1.5 p-4 sm:p-5">
                  <span className="font-display text-xl">{item.title}</span>
                  <span className="text-[13px] leading-snug text-muted">{item.text}</span>
                  <span className="mt-auto inline-flex items-center gap-1 pt-2 text-[13px] font-medium text-brand-dark">
                    Ver productos <IconArrow className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
