import Reveal from "../Reveal";

const LAYERS = [
  { name: "Captura", note: "Sensores, video, eventos, identidad y sistemas externos" },
  { name: "Normalización", note: "Datos consistentes, con unidades y contexto" },
  { name: "Correlación", note: "Relación entre señales y fuentes" },
  { name: "Reglas / Analítica", note: "Lógica, umbrales y análisis" },
  { name: "Decisión", note: "Prioridades, alertas, asistencia a decisiones" },
  { name: "Acción", note: "Despacho, automatización y verificación" },
  { name: "Evidencia", note: "Registro trazable y auditable" },
];

export default function Architecture() {
  return (
    <section id="arquitectura" className="border-t border-rk-line px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="rk-eyebrow text-[13px] text-rk-terracotta">
            Arquitectura
          </p>
          <h2 className="mt-5 max-w-2xl text-3xl text-rk-graphite sm:text-4xl">
            Capas reutilizables, con trazabilidad de principio a fin.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-rk-muted">
            Una arquitectura propuesta y modular, compartida entre soluciones.
            Cada capa deja registro de lo que observa, decide y ejecuta.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <ol className="mt-14 overflow-hidden rounded-xl border border-rk-line">
            {LAYERS.map((layer, i) => (
              <li
                key={layer.name}
                className="flex flex-col gap-1.5 border-b border-rk-line bg-rk-paper px-6 py-5 last:border-b-0 even:bg-rk-ivory/40 sm:flex-row sm:items-baseline sm:gap-5"
              >
                <div className="flex items-baseline gap-4 sm:gap-5">
                  <span className="rk-data w-8 shrink-0 text-sm text-rk-green-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg text-rk-graphite sm:w-40 sm:shrink-0">
                    {layer.name}
                  </span>
                </div>
                <span className="pl-12 text-[15px] leading-relaxed text-rk-muted sm:pl-0">
                  {layer.note}
                </span>
              </li>
            ))}
          </ol>
          <p className="rk-eyebrow mt-5 text-[11px] text-rk-muted">
            Arquitectura propuesta · modular · se adapta a cada solución
          </p>
        </Reveal>
      </div>
    </section>
  );
}
