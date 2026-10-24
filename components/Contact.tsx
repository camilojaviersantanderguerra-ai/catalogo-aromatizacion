import { contactContent as c } from "@/content/sections";
import { whatsappConfig } from "@/config/whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";

export function Contact() {
  return (
    <section id="contacto" className="scroll-mt-16 py-14 sm:py-20" aria-labelledby="contacto-titulo">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-[calc(var(--radius-card)*1.4)] bg-brand px-6 py-12 text-brand-contrast sm:px-12 sm:py-16">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/75">{c.eyebrow}</p>
          <h2 id="contacto-titulo" className="mt-2 max-w-xl font-display text-4xl leading-tight sm:text-5xl">
            {c.title}
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/85">{c.text}</p>
          <WhatsAppButton
            message={whatsappConfig.generalMessage}
            className="mt-8 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-white px-7 text-[15px] font-medium text-brand-dark transition-colors hover:bg-brand-soft sm:w-auto"
          >
            {c.cta}
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
