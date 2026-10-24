"use client";

import { useSyncExternalStore } from "react";
import { products } from "@/data/products";
import type { Product } from "@/data/types";

/**
 * SELECCIÓN DE PRODUCTOS (tipo carrito, solo para consultas)
 * Se guarda en localStorage del navegador; no se piden datos personales.
 */

export type SelectionItem = { productId: string; variant?: string; quantity: number };

const STORAGE_KEY = "seleccion-productos-v1";
export const MAX_QUANTITY = 99;

let items: SelectionItem[] = [];
let loaded = false;
const listeners = new Set<() => void>();
const EMPTY: SelectionItem[] = [];

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as SelectionItem[]) : [];
    // Descarta productos que ya no existan en el catálogo
    items = Array.isArray(parsed)
      ? parsed.filter((i) => products.some((p) => p.id === i.productId) && i.quantity > 0)
      : [];
  } catch {
    items = [];
  }
}

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* almacenamiento no disponible: la selección funciona igual en memoria */
  }
}

function emit() {
  persist();
  listeners.forEach((l) => l());
}

const same = (a: SelectionItem, productId: string, variant?: string) =>
  a.productId === productId && (a.variant ?? "") === (variant ?? "");

export const selection = {
  add(productId: string, variant?: string, quantity = 1) {
    load();
    const existing = items.find((i) => same(i, productId, variant));
    items = existing
      ? items.map((i) => (i === existing ? { ...i, quantity: Math.min(MAX_QUANTITY, i.quantity + quantity) } : i))
      : [...items, { productId, variant, quantity }];
    emit();
  },
  setQuantity(productId: string, variant: string | undefined, quantity: number) {
    load();
    if (quantity <= 0) return selection.remove(productId, variant);
    items = items.map((i) => (same(i, productId, variant) ? { ...i, quantity: Math.min(MAX_QUANTITY, quantity) } : i));
    emit();
  },
  remove(productId: string, variant?: string) {
    load();
    items = items.filter((i) => !same(i, productId, variant));
    emit();
  },
  clear() {
    items = [];
    emit();
  },
  subscribe(listener: () => void) {
    load();
    listeners.add(listener);
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        loaded = false;
        load();
        listener();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  },
  getSnapshot() {
    load();
    return items;
  },
};

export function useSelection(): SelectionItem[] {
  return useSyncExternalStore(selection.subscribe, selection.getSnapshot, () => EMPTY);
}

export type ResolvedItem = SelectionItem & { product: Product };

export function resolveItems(list: SelectionItem[]): ResolvedItem[] {
  return list.flatMap((i) => {
    const product = products.find((p) => p.id === i.productId);
    return product ? [{ ...i, product }] : [];
  });
}

export function countItems(list: SelectionItem[]): number {
  return list.reduce((sum, i) => sum + i.quantity, 0);
}
