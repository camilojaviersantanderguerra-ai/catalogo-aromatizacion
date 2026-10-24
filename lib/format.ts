import { siteConfig } from "@/config/site";

const formatter = new Intl.NumberFormat(siteConfig.locale, {
  style: "currency",
  currency: siteConfig.currency,
  maximumFractionDigits: 0,
});

export function formatPrice(value: number): string {
  return formatter.format(value);
}
