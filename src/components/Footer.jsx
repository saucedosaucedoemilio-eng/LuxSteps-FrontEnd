import { Link } from "react-router-dom";

const sections = [
  {
    title: "Tienda",
    links: [
      ["Inicio", "/"],
      ["Colección", "/productos"],
      ["Carrito", "/carrito"],
    ],
  },
  {
    title: "Cuenta",
    links: [
      ["Ingresar", "/login"],
      ["Crear cuenta", "/registro"],
    ],
  },
];

function FooterLink({ label, to }) {
  return (
    <li>
      <Link
        to={to}
        className="group inline-flex items-center gap-2 text-sm text-cream-200/55 transition-colors hover:text-cream-50"
      >
        <span className="h-px w-3 bg-cognac-500/60 transition-all group-hover:w-5 group-hover:bg-cognac-400" />
        {label}
      </Link>
    </li>
  );
}

function Footer() {
  return (
    <footer className="relative bg-ink-950/85 backdrop-blur">
      {/* filo superior */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cognac-500/40 to-transparent" />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        {/* Marca */}
        <div className="flex flex-col gap-4">
          <span className="font-display text-2xl font-semibold uppercase tracking-[0.32em] text-cream-50">
            LuxSteps
          </span>
          <span className="eyebrow">Men&apos;s Shoes</span>
          <p className="max-w-xs text-sm leading-relaxed text-cream-200/55">
            Encuentra el calzado que se adapta a tu estilo.
          </p>
        </div>

        {/* Secciones */}
        {sections.map((section) => (
          <div key={section.title} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h4 className="font-display text-base font-semibold text-cream-50">
                {section.title}
              </h4>
              <span className="h-px w-8 bg-cognac-500" />
            </div>
            <ul className="flex flex-col gap-2.5">
              {section.links.map(([label, to]) => (
                <FooterLink key={to} label={label} to={to} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* barra inferior */}
      <div className="border-t border-ink-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs uppercase tracking-[0.18em] text-cream-200/40 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} LuxSteps</p>
          <a href="#top" className="transition-colors hover:text-cream-50">
            Volver arriba
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
