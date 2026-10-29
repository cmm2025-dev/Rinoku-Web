import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
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
      <main className="flex-1">
        <Hero />
        <Purpose />
        <Filosofia />
        <Manifiesto />
        <Architecture />
        <UseCases />
        <Solutions />
      </main>
      <Footer />
    </>
  );
}
