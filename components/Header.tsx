"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";
import { whatsappConfig } from "@/config/whatsapp";
import { navLinks } from "@/content/sections";
import { countItems, useSelection } from "@/lib/selection";
import { ui, useUI } from "@/lib/ui-store";
import { Logo } from "./Logo";
import { WhatsAppButton } from "./WhatsAppButton";
import { IconBag, IconClose, IconMenu } from "./icons";

function SelectionBadgeButton() {
  const count = countItems(useSelection());
  return (
    <button
      type="button"
      onClick={ui.openSelection}
      className="relative flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-brand-soft"
      aria-label={`Abrir tu selección, ${count} ${count === 1 ? "producto" : "productos"}`}
    >
      <IconBag />
      {count > 0 && (
        <span
          data-testid="selection-count"
          className="absolute right-0.5 top-0.5 flex min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-semibold leading-5 text-white"
        >
          {count}
        </span>
      )}
    </button>
  );
}

export function Header() {
  const menuOpen = useUI((s) => s.menuOpen);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && ui.closeMenu();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:h-[72px] sm:px-6">
        <a href="#inicio" className="flex min-w-0 items-center gap-3" aria-label={`${siteConfig.brandName}, ir al inicio`}>
          <Logo />
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-[15px] tracking-wide sm:text-lg">{siteConfig.brandName}</span>
            <span className="hidden text-[11px] uppercase tracking-[0.18em] text-muted sm:block">{siteConfig.tagline}</span>
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-1 md:flex" aria-label="Principal">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="rounded-full px-4 py-2 text-sm text-ink/80 transition-colors hover:bg-brand-soft hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 md:ml-2">
          <WhatsAppButton
            message={whatsappConfig.generalMessage}
            ariaLabel="Contactar por WhatsApp"
            className="hidden min-h-11 items-center gap-2 rounded-full bg-whatsapp px-4 text-sm font-medium text-white hover:bg-whatsapp-dark sm:inline-flex"
          >
            <span>WhatsApp</span>
          </WhatsAppButton>
          <SelectionBadgeButton />
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-full hover:bg-brand-soft md:hidden"
            onClick={menuOpen ? ui.closeMenu : ui.openMenu}
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

    </header>

      {/* Menú móvil (fuera del header: su backdrop-blur atraparía el position:fixed) */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden" id="menu-movil">
          <button type="button" aria-label="Cerrar menú" className="absolute inset-0 bg-ink/40" onClick={ui.closeMenu} />
          <nav
            aria-label="Menú"
            className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-paper px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-3 shadow-2xl"
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-line" />
            <ul className="flex flex-col">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={ui.closeMenu} className="flex min-h-14 items-center border-b border-line font-display text-2xl">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <button type="button" onClick={ui.openSelection} className="flex min-h-14 w-full items-center border-b border-line text-left font-display text-2xl">
                  Tu selección
                </button>
              </li>
            </ul>
            <WhatsAppButton
              message={whatsappConfig.generalMessage}
              className="mt-5 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-whatsapp text-base font-medium text-white"
            >
              Escribir por WhatsApp
            </WhatsAppButton>
            <button type="button" onClick={ui.closeMenu} className="mt-2 min-h-12 w-full text-sm text-muted">
              Cerrar
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
