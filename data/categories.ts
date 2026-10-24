import type { Category } from "./types";

/** El orden de este arreglo es el orden en que aparecen los filtros. */
export const categories: Category[] = [
  {
    id: "home-spray",
    name: "Home Spray",
    description:
      "Aromatiza tus espacios de manera inmediata y controla la intensidad según la cantidad de pulverizaciones.",
  },
  {
    id: "gourmand",
    name: "Gourmand",
    description:
      "Aromas dulces, cálidos y envolventes que transforman tus espacios en ambientes acogedores y llenos de personalidad.",
  },
  {
    id: "difusores",
    name: "Difusores de varillas",
    description:
      "Introduce las varillas en el envase y gíralas una vez por semana para optimizar el uso de la fragancia. Aromatizan de forma permanente por hasta 6 a 8 semanas.",
  },
  {
    id: "auto-closet",
    name: "Auto y closet",
    description:
      "Aromatizante colgante para crear un ambiente acogedor en tu auto. También se puede usar en espacios reducidos, como closets o baños.",
  },
  {
    id: "difusor-automatico",
    name: "Difusor automático",
    description:
      "Difusor de aromas C300 con control Bluetooth®, fragancias puras para el equipo y esencias para humidificador.",
  },
  {
    id: "cuidado",
    name: "Manos y mascotas",
    description: "Alcohol en spray para manos y eliminador de olores de mascotas para telas.",
  },
];
