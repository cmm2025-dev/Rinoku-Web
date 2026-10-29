import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-rk-graphite px-6 py-16 text-rk-ivory">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <Logo size="sm" tone="ivory" />
          <p className="max-w-sm text-[15px] leading-relaxed text-rk-ivory/70">
            Información confiable. Decisiones eficientes.
            <span className="block text-rk-ivory/50">
              Tecnología con principios.
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-4 border-t border-rk-ivory/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="rk-eyebrow text-[11px] text-rk-ivory/50">
            © 2026 RINOKU. Identidad en desarrollo.
          </p>
          <a
            href="mailto:info@rinoku.cl"
            className="text-[13px] text-rk-ivory/70 transition-colors hover:text-rk-ivory"
          >
            info@rinoku.cl
          </a>
        </div>
      </div>
    </footer>
  );
}
