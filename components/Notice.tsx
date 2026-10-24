"use client";

import { ui, useUI } from "@/lib/ui-store";
import { IconClose } from "./icons";

/** Aviso breve (producto agregado, WhatsApp pendiente, etc.). */
export function Notice() {
  const notice = useUI((s) => s.notice);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-20 z-[60] flex justify-center px-4" aria-live="polite" role="status">
      {notice && (
        <div
          key={notice.id}
          data-testid="notice"
          className="pointer-events-auto flex max-w-md items-start gap-3 rounded-2xl bg-ink px-4 py-3 text-[13px] leading-snug text-white shadow-2xl"
        >
          <span className="flex-1 py-0.5">{notice.message}</span>
          <button type="button" onClick={ui.dismissNotice} aria-label="Cerrar aviso" className="-mr-1 flex size-7 shrink-0 items-center justify-center rounded-full hover:bg-white/10">
            <IconClose width={16} height={16} />
          </button>
        </div>
      )}
    </div>
  );
}
