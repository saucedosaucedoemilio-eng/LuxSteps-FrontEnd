import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const linkClass = ({ isActive }) =>
  `text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors ${
    isActive ? "text-cream-50" : "text-cream-200/70 hover:text-cream-50"
  }`;

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-ink-800 bg-ink-950/90 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-4">
        <nav className="hidden items-center gap-7 md:flex">
          <NavLink to="/productos" className={linkClass}>
            Colección
          </NavLink>
        </nav>

        <Link
          to="/"
          className="justify-self-center font-display text-2xl font-semibold uppercase tracking-[0.3em] text-cream-50"
        >
          LuxSteps
        </Link>

        <nav className="flex items-center justify-end gap-5">
          {isAuthenticated ? (
            <>
              <NavLink
                to="/pedidos"
                className={(s) => `hidden md:inline ${linkClass(s)}`}
              >
                Mis pedidos
              </NavLink>
              {user?.role === "admin" && (
                <NavLink to="/admin" className={linkClass}>
                  Admin
                </NavLink>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="hidden text-[11px] font-semibold uppercase tracking-[0.2em] text-cream-200/70 hover:text-cream-50 md:inline"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={(s) => `hidden md:inline ${linkClass(s)}`}
              >
                Ingresar
              </NavLink>
              <NavLink
                to="/registro"
                className={(s) => `hidden md:inline ${linkClass(s)}`}
              >
                Registrarse
              </NavLink>
            </>
          )}

          <Link
            to="/carrito"
            className="rounded-full border border-cream-100/25 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-cream-50 transition-colors hover:bg-cream-50/10"
          >
            Carrito{totalItems > 0 && ` · ${totalItems}`}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
