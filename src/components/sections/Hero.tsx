"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section
      id="top"
      className="rk-grid relative flex min-h-[92vh] items-center overflow-hidden px-6 pt-24"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 500px at 15% 25%, rgba(167,68,44,0.07), transparent 70%)",
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="rk-eyebrow flex items-center gap-3 text-[13px] text-rk-terracotta"
        >
          <span aria-hidden="true" className="text-rk-terracotta">
            ◆
          </span>
          RINOKU · Tecnología operacional
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease }}
          className="mt-7 max-w-4xl text-[2.6rem] leading-[1.04] text-rk-graphite sm:text-6xl"
        >
          Información confiable.
          <br />
          Decisiones eficientes.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-rk-muted"
        >
          Diseñamos e integramos tecnología para transformar señales, datos y
          experiencias operacionales en conocimiento útil, decisiones
          responsables y acciones verificables.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease }}
          className="mt-11 flex flex-wrap items-center gap-4"
        >
          <a
            href="#soluciones"
            className="inline-flex min-h-[44px] items-center rounded-md bg-rk-terracotta px-7 text-[15px] font-semibold text-white transition-colors hover:bg-rk-terracotta-deep"
          >
            Explorar soluciones
          </a>
          <a
            href="#filosofia"
            className="inline-flex min-h-[44px] items-center rounded-md border border-rk-graphite px-7 text-[15px] font-semibold text-rk-graphite transition-colors hover:border-rk-terracotta hover:text-rk-terracotta"
          >
            Conocer nuestra filosofía
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7, ease }}
          className="rk-eyebrow mt-16 text-[11px] text-rk-muted"
        >
          Del mundo físico al conocimiento útil. Del conocimiento a la acción.
        </motion.p>
      </div>
    </section>
  );
}
