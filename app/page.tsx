import { Ambientes } from "@/components/Ambientes";
import { Catalog } from "@/components/Catalog";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Notice } from "@/components/Notice";
import { SelectionBar, SelectionPanel } from "@/components/SelectionPanel";

/** Orden de las secciones de la página: muévelas o quítalas aquí. */
export default function Home() {
  return (
    <>
      <a href="#catalogo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
        Ir al catálogo
      </a>
      <Header />
      <main>
        <Hero />
        <Catalog />
        <Ambientes />
        <Contact />
      </main>
      <Footer />
      <SelectionPanel />
      <SelectionBar />
      <Notice />
    </>
  );
}
