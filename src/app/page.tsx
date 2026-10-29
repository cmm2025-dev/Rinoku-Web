import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Purpose from "@/components/sections/Purpose";
import Filosofia from "@/components/sections/Filosofia";
import Manifiesto from "@/components/Manifiesto";
import Architecture from "@/components/sections/Architecture";
import UseCases from "@/components/sections/UseCases";
import Solutions from "@/components/sections/Solutions";

export default function Home() {
  return (
    <>
      <Nav />
      <h1 className="sr-only">
        RINOKU — Información confiable. Decisiones eficientes.
      </h1>
      <main className="flex-1">
        {/* El canvas abre el sitio como hero; luego comienza la lectura */}
        <Manifiesto />
        <Purpose />
        <Filosofia />
        <Architecture />
        <UseCases />
        <Solutions />
      </main>
      <Footer />
    </>
  );
}
