"use client";

import { useSyncExternalStore } from "react";

/** Estado de interfaz compartido: panel de selección, filtro activo y avisos. */
type UIState = {
  selectionOpen: boolean;
  menuOpen: boolean;
  activeCategory: string; // "all" o id de categoría
  notice: { id: number; message: string } | null;
};

let state: UIState = { selectionOpen: false, menuOpen: false, activeCategory: "all", notice: null };
const listeners = new Set<() => void>();
let noticeTimer: ReturnType<typeof setTimeout> | undefined;

function set(partial: Partial<UIState>) {
  state = { ...state, ...partial };
  listeners.forEach((l) => l());
}

export const ui = {
  openSelection: () => set({ selectionOpen: true, menuOpen: false }),
  closeSelection: () => set({ selectionOpen: false }),
  openMenu: () => set({ menuOpen: true }),
  closeMenu: () => set({ menuOpen: false }),
  setCategory: (activeCategory: string) => set({ activeCategory }),
  notify(message: string, duration = 3800) {
    clearTimeout(noticeTimer);
    set({ notice: { id: Date.now(), message } });
    noticeTimer = setTimeout(() => set({ notice: null }), duration);
  },
  dismissNotice: () => set({ notice: null }),
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  get: () => state,
};

const initial = state;
export function useUI<T>(selector: (s: UIState) => T): T {
  return useSyncExternalStore(
    ui.subscribe,
    () => selector(ui.get()),
    () => selector(initial),
  );
}
