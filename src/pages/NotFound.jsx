import { Link } from "react-router-dom";
import { btnPrimary } from "../styles/classNames";

function NotFound() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-28 text-center">
      <span className="eyebrow">Error 404</span>
      <h1 className="font-display text-5xl font-semibold text-cream-50">Página no encontrada</h1>
      <p className="max-w-md text-sm leading-relaxed text-cream-200/60">
        La dirección que buscas no existe o se ha movido.
      </p>
      <Link to="/" className={btnPrimary}>
        Volver al inicio
      </Link>
    </section>
  );
}

export default NotFound;
