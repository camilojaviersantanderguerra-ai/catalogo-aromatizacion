import { whatsappConfig } from "@/config/whatsapp";

/** Normaliza un número chileno a solo dígitos con código país (56...). */
export function normalizeChileanNumber(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return null;
  let n = digits;
  if (n.startsWith("00")) n = n.slice(2);
  if (n.length === 9 && n.startsWith("9")) n = `56${n}`; // celular sin código país
  if (n.length === 8) n = `569${n}`; // formato antiguo sin el 9
  // Chile: 56 + 9 dígitos
  if (!/^56\d{9}$/.test(n)) return null;
  return n;
}

export function getWhatsAppNumber(): string | null {
  return normalizeChileanNumber(whatsappConfig.phoneNumber);
}

export function isWhatsAppConfigured(): boolean {
  return getWhatsAppNumber() !== null;
}

/** Devuelve el enlace wa.me o null si el número no está configurado. */
export function buildWhatsAppLink(message: string): string | null {
  const number = getWhatsAppNumber();
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildProductMessage(input: { name: string; presentation?: string; variant?: string }): string {
  const { intro, outro } = whatsappConfig.productMessage;
  const lines = [intro, "", `Producto: ${input.name}`];
  if (input.variant) lines.push(`Aroma: ${input.variant}`);
  if (input.presentation) lines.push(`Presentación: ${input.presentation}`);
  lines.push("", outro);
  return lines.join("\n");
}

export function buildSelectionMessage(
  items: { name: string; presentation?: string; variant?: string; quantity: number }[],
): string {
  const { intro, outro, closing } = whatsappConfig.selectionMessage;
  const list = items.map((i) => {
    const details = [i.variant, i.presentation].filter(Boolean).join(", ");
    return `- ${i.name}${details ? ` (${details})` : ""} — Cantidad: ${i.quantity}`;
  });
  return [intro, "", ...list, "", outro, "", closing].join("\n");
}
