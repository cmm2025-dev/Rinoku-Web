import Reveal from "../Reveal";

const STORIES = [
  {
    sector: "Municipios",
    story:
      "La presencia reiterada de ciertas señales en la vía pública puede anticipar el inicio de microbasurales antes de que se consoliden.",
  },
  {
    sector: "Industria / Minería",
    story:
      "La acumulación de material en condiciones específicas puede anticipar atascamientos en buzones o correas transportadoras.",
  },
  {
    sector: "Salud / Instituciones",
    story:
      "La verificación biométrica permite certificar presencia de forma confiable, sin depender de teléfonos móviles.",
  },
];

const SECTORS = ["Gobierno", "Puertos", "Seguridad", "Operaciones"];

export default function UseCases() {
  return (
    <section
      id="casos-de-uso"
      className="border-t border-rk-line bg-rk-ivory px-6 py-28"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="rk-eyebrow text-[13px] text-rk-terracotta">
            Casos de uso
          </p>
          <h2 className="mt-5 max-w-2xl text-3xl text-rk-graphite sm:text-4xl">
            Una misma lógica, aplicada a problemas reales.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-rk-muted">
            Escenarios de referencia que ilustran el método. No representan, por sí
            mismos, implementaciones certificadas ni resultados garantizados.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-rk-line bg-rk-line sm:grid-cols-3">
          {STORIES.map((item, i) => (
            <Reveal key={item.sector} delay={i * 0.1}>
              <div className="h-full bg-rk-paper p-7">
                <p className="rk-eyebrow text-[11px] text-rk-green-deep">
                  {item.sector}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-rk-ink">
                  {item.story}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <span className="rk-eyebrow text-[11px] text-rk-muted">
              El mismo método aplica en
            </span>
            {SECTORS.map((s) => (
              <span
                key={s}
                className="rounded-md border border-rk-line bg-rk-paper px-3.5 py-1.5 text-[13px] text-rk-ink"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
