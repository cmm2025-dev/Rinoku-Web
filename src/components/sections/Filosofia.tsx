"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const MOVES = [
  { n: "01", verb: "Observar", sense: "Capturar hechos y señales del mundo físico y digital." },
  { n: "02", verb: "Comprender", sense: "Transformar datos en contexto: reglas, correlación, trazabilidad." },
  { n: "03", verb: "Decidir", sense: "Identificar una respuesta pertinente: prioridades y alertas." },
  { n: "04", verb: "Actuar", sense: "Ejecutar y verificar: despacho, automatización y evidencia." },
];

export default function Filosofia() {
  return (
    <section id="filosofia" className="border-t border-rk-line px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
        >
          <p className="rk-eyebrow text-[13px] text-rk-terracotta">Filosofía</p>
          <h2 className="mt-5 max-w-2xl text-3xl text-rk-graphite sm:text-4xl">
            Comprender antes de automatizar.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-rk-muted">
            Los sistemas útiles comienzan escuchando cómo funciona realmente una
            organización. Observamos, comprendemos, decidimos y actuamos con
            tecnología que respeta el valor de la información.
          </p>
        </motion.div>

        <div className="relative mt-16 grid gap-px overflow-hidden rounded-xl border border-rk-line bg-rk-line sm:grid-cols-4">
          {/* animated connector line across the four movements */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-[64px] hidden h-px origin-left bg-rk-terracotta/50 sm:block"
            style={{ width: "100%" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease, delay: 0.2 }}
          />
          {MOVES.map((m, i) => (
            <motion.div
              key={m.verb}
              className="relative h-full bg-rk-paper p-7"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease, delay: 0.25 + i * 0.12 }}
            >
              <div className="flex items-center gap-3">
                <span className="rk-data text-sm text-rk-green-deep">{m.n}</span>
                <span
                  aria-hidden="true"
                  className="relative z-10 block h-2.5 w-2.5 rotate-45 bg-rk-terracotta"
                />
              </div>
              <h3 className="mt-5 font-display text-xl text-rk-graphite">
                {m.verb}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-rk-muted">
                {m.sense}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease, delay: 0.5 }}
          className="mt-8 max-w-2xl text-[15px] leading-relaxed text-rk-ink"
        >
          La plataforma existe para transformar{" "}
          <span className="text-rk-terracotta-deep">conocimiento operativo</span>{" "}
          en{" "}
          <span className="text-rk-terracotta-deep">decisiones responsables</span>.
        </motion.p>
      </div>
    </section>
  );
}
