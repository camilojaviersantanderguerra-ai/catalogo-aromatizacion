import { siteConfig } from "@/config/site";
import { footerContent, navLinks } from "@/content/sections";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line pb-28 pt-10 sm:pb-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <Logo size={40} />
          <div className="leading-tight">
            <p className="font-display">{siteConfig.brandName}</p>
            <p className="text-[12px] text-muted">{siteConfig.tagline}</p>
          </div>
        </div>
        <nav aria-label="Pie de página" className="flex gap-1">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="rounded-full px-3 py-2 text-sm text-muted hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      <p className="mx-auto mt-6 max-w-6xl px-4 text-[12px] text-muted sm:px-6">
        © {footerContent.year} {siteConfig.brandName}. {footerContent.note} {siteConfig.showPrices && siteConfig.priceNote}
      </p>
    </footer>
  );
}
