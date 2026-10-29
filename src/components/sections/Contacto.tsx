import Reveal from "../Reveal";

const CHANNELS = [
  {
    label: "Contacto comercial",
    description:
      "Conversemos sobre tu operación, un piloto o una integración a medida.",
    email: "gerencia@rinoku.cl",
    cta: "Escribir a comercial",
  },
  {
    label: "Soporte",
    description:
      "Clientes con soluciones en operación: incidencias, consultas técnicas y seguimiento.",
    email: "soporte@rinoku.cl",
    cta: "Escribir a soporte",
  },
];

export default function Contacto() {
  return (
    <section id="contacto" className="border-t border-rk-line px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="rk-eyebrow text-[13px] text-rk-terracotta">Contacto</p>
          <h2 className="mt-5 max-w-2xl text-3xl text-rk-graphite sm:text-4xl">
            Hablemos. Con información confiable se decide mejor.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-rk-muted">
            Escríbenos y te respondemos directamente. Elige el canal según lo
            que necesites.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {CHANNELS.map((c, i) => (
            <Reveal key={c.email} delay={(i % 2) * 0.1}>
              <a
                href={`mailto:${c.email}`}
                className="group flex h-full flex-col rounded-xl border border-rk-line bg-rk-paper p-7 transition-colors hover:border-rk-terracotta"
              >
                <span className="rk-eyebrow text-[10px] text-rk-green-deep">
                  {c.label}
                </span>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-rk-muted">
                  {c.description}
                </p>
                <span className="mt-6 font-display text-lg text-rk-graphite">
                  {c.email}
                </span>
                <span className="rk-eyebrow mt-3 text-[11px] text-rk-terracotta group-hover:text-rk-terracotta-deep">
                  {c.cta} →
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
