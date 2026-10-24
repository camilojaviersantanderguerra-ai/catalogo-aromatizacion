"use client";

import type { ReactNode } from "react";
import { whatsappConfig } from "@/config/whatsapp";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { ui } from "@/lib/ui-store";
import { IconWhatsApp } from "./icons";

type Props = {
  /** Mensaje precompletado; se arma al hacer clic para que siempre esté actualizado. */
  message: string | (() => string);
  children?: ReactNode;
  className?: string;
  ariaLabel?: string;
  showIcon?: boolean;
  disabled?: boolean;
  iconClassName?: string;
};

/**
 * Botón que abre WhatsApp con un mensaje. Si el número aún no está
 * configurado, muestra un aviso y no abre ningún enlace.
 */
export function WhatsAppButton({ message, children, className = "", ariaLabel, showIcon = true, disabled, iconClassName = "" }: Props) {
  const handleClick = () => {
    const link = buildWhatsAppLink(typeof message === "function" ? message() : message);
    if (!link) {
      ui.notify(whatsappConfig.pendingMessage);
      return;
    }
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <button type="button" onClick={handleClick} aria-label={ariaLabel} disabled={disabled} className={className}>
      {showIcon && <IconWhatsApp className={`shrink-0 ${iconClassName}`} />}
      {children}
    </button>
  );
}
