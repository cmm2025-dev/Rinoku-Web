import Logo from "./Logo";

const LINKS = [
  { href: "#filosofia", label: "Filosofía" },
  { href: "#arquitectura", label: "Arquitectura" },
  { href: "#soluciones", label: "Soluciones" },
  { href: "#casos-de-uso", label: "Casos de uso" },
  { href: "#contacto", label: "Contacto" },
];

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-rk-line bg-rk-paper/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" aria-label="RINOKU — Inicio">
          <Logo size="sm" />
        </a>
        <div className="flex items-center gap-8">
          <ul className="hidden gap-8 text-[13px] font-medium text-rk-muted md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-rk-terracotta"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#soluciones"
            className="hidden rounded-md border border-rk-graphite px-4 py-2 text-[13px] font-semibold text-rk-graphite transition-colors hover:border-rk-terracotta hover:text-rk-terracotta sm:inline-block"
          >
            Explorar soluciones
          </a>
        </div>
      </nav>
    </header>
  );
}
