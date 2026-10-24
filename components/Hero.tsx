import Image from "next/image";
import { heroContent as c } from "@/content/sections";
import { whatsappConfig } from "@/config/whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";
import { btn } from "./button-styles";
import { IconArrow } from "./icons";

export function Hero() {
  return (
    <section id="inicio" className="bg-catalog-pattern">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-14 pt-6 sm:px-6 md:grid-cols-[1.05fr_1fr] md:gap-12 md:pb-20 md:pt-14">
        <div className="relative order-1 md:order-2">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-card)] bg-photo md:aspect-[4/3]">
            <Image
              src={c.images.main.src}
              alt={c.images.main.alt}
              fill
              priority
              sizes="(min-width: 768px) 560px, 100vw"
              quality={90}
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-2 hidden w-40 overflow-hidden rounded-2xl border-4 border-paper shadow-lg sm:block md:-left-10 md:w-48">
            <div className="relative aspect-square">
              <Image src={c.images.secondary.src} alt={c.images.secondary.alt} fill sizes="192px" className="object-cover" />
            </div>
          </div>
        </div>

        <div className="order-2 md:order-1">
          <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-brand-dark">
            <span className="h-px w-8 bg-brand" />
            {c.eyebrow}
          </p>
          <h1 className="font-display text-[2.6rem] leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">{c.title}</h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted sm:text-base">{c.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={c.primaryCta.href} className={btn.primary}>
              {c.primaryCta.label}
              <IconArrow />
            </a>
            <WhatsAppButton message={whatsappConfig.generalMessage} className={btn.outline}>
              {c.secondaryCta.label}
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
