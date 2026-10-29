import Reveal from "../Reveal";

const VALUES = [
  {
    name: "Confianza",
    desc: "La información debe ser fiable y contextualizada: origen, estado y límites explícitos.",
  },
  {
    name: "Integridad",
    desc: "Distinguimos funciones reales, planes y afirmaciones verificables. Sin exageraciones.",
  },
  {
    name: "Eficiencia",
    desc: "Cada interacción tiene propósito: menos pasos, jerarquía clara, mensajes accionables.",
  },
  {
    name: "Precisión",
    desc: "Trabajo metódico: cifras alineadas, unidades, fechas y estado siempre con contexto.",
  },
  {
    name: "Responsabilidad",
    desc: "Privacidad, accesibilidad, control humano y auditoría en el diseño.",
  },
  {
    name: "Permanencia",
    desc: "Soluciones que evolucionan sin perder solidez. Componentes y lenguaje estables.",
  },
];

export default function Purpose() {
  return (
    <section
      id="proposito"
      className="border-t border-rk-line bg-rk-ivory px-6 py-28"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="rk-eyebrow text-[13px] text-rk-terracotta">Propósito</p>
          <h2 className="mt-5 max-w-3xl text-3xl text-rk-graphite sm:text-4xl">
            Convertir información confiable en decisiones y acciones más
            eficientes y responsables.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-rk-muted">
            RINOKU diseña e integra tecnología que observa hechos del mundo
            físico y digital, los registra con rigor, los transforma en
            conocimiento operativo y facilita acciones oportunas, comprensibles y
            trazables.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-rk-line bg-rk-line sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.name} delay={(i % 3) * 0.08}>
              <div className="h-full bg-rk-paper p-7">
                <p className="rk-eyebrow text-[11px] text-rk-green-deep">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-lg text-rk-graphite">{v.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-rk-muted">
                  {v.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
