import Reveal from "../Reveal";

const SOLUTIONS = [
  {
    name: "RINOKU VIGÍA",
    focus: "Control y registro",
    description:
      "Seguimiento, verificación y trazabilidad para escenarios de vigilancia y cumplimiento.",
    href: "https://rinoku-vigia.vercel.app",
    status: "Ver solución",
  },
  {
    name: "RINOKU SFI",
    focus: "Identidad y evidencia",
    description:
      "Verificación de identidad y presencia mediante soluciones biométricas, con registro verificable.",
    href: "https://rinoku-sfi.vercel.app",
    status: "Ver solución",
  },
  {
    name: "RINOKU CAD",
    focus: "Operación y respuesta",
    description:
      "Coordinación, despacho y gestión de eventos para operaciones que exigen respuesta oportuna y trazable.",
    href: null,
    status: "En desarrollo",
  },
  {
    name: "RINOKU Alertas",
    focus: "Monitoreo y notificación",
    description:
      "Detección y notificación de eventos en tiempo real, con escalamiento y registro trazable.",
    href: null,
    status: "En desarrollo",
  },
];

export default function Solutions() {
  return (
    <section id="soluciones" className="border-t border-rk-line px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="rk-eyebrow text-[13px] text-rk-terracotta">Soluciones</p>
          <h2 className="mt-5 max-w-2xl text-3xl text-rk-graphite sm:text-4xl">
            Una misma filosofía. Soluciones para realidades distintas.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-rk-muted">
            Identidad, operaciones, verificación y conexión con el entorno,
            concebidas para trabajar con rigor y crecer de forma modular.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {SOLUTIONS.map((s, i) => {
            const Card = s.href ? "a" : "div";
            return (
              <Reveal key={s.name} delay={(i % 2) * 0.1}>
                <Card
                  {...(s.href
                    ? { href: s.href, target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={`group flex h-full flex-col rounded-xl border border-rk-line bg-rk-paper p-7 transition-colors ${
                    s.href ? "hover:border-rk-terracotta" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl text-rk-graphite">
                      {s.name}
                    </span>
                    <span className="rk-eyebrow text-[10px] text-rk-green-deep">
                      {s.focus}
                    </span>
                  </div>
                  <p className="mt-4 flex-1 text-[15px] leading-relaxed text-rk-muted">
                    {s.description}
                  </p>
                  <span
                    className={`rk-eyebrow mt-6 text-[11px] ${
                      s.href
                        ? "text-rk-terracotta group-hover:text-rk-terracotta-deep"
                        : "text-rk-muted"
                    }`}
                  >
                    {s.status}
                    {s.href ? " →" : ""}
                  </span>
                </Card>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-8 max-w-2xl text-[13px] leading-relaxed text-rk-muted">
            Estas definiciones son mensajes de posicionamiento. No implican que
            todas las funcionalidades estén desarrolladas, certificadas o
            disponibles comercialmente.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
