import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { HomeIcon, BoxIcon, UsersIcon, ReceiptIcon, ChevronDownIcon, ArrowLeftIcon } from "./icons";

const navItems = [
  { to: "/admin", label: "Inicio", icon: HomeIcon, end: true },
  { to: "/admin/productos", label: "Productos", icon: BoxIcon },
  { to: "/admin/pedidos", label: "Pedidos", icon: ReceiptIcon },
  { to: "/admin/usuarios", label: "Usuarios", icon: UsersIcon },
];

function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initial = user?.name?.trim()?.[0]?.toUpperCase() || "?";

  return (
    <div className="flex min-h-screen bg-ink-950 text-cream-100">
      <aside className="flex w-60 shrink-0 flex-col gap-8 border-r border-ink-800 bg-ink-900 p-4">
        <div className="flex items-center gap-2.5 px-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cognac-600 text-xs font-bold text-cream-50">
            LS
          </span>
          <span className="font-display text-lg font-semibold uppercase tracking-[0.28em] text-cream-50">
            LuxSteps
          </span>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-cognac-500/12 font-semibold text-cognac-300"
                    : "text-cream-200/60 hover:bg-cream-50/5 hover:text-cream-50"
                }`
              }
            >
              <Icon />
              {label}
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/"
          className="mt-auto flex items-center gap-2 border-t border-ink-800 pt-4 text-sm text-cream-200/55 transition-colors hover:text-cream-50"
        >
          <ArrowLeftIcon />
          Volver a la tienda
        </NavLink>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-end border-b border-ink-800 bg-ink-950/80 px-8 py-4 backdrop-blur">
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-cream-100 transition-colors hover:bg-cream-50/5"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cognac-500/15 text-sm font-bold text-cognac-300">
                {initial}
              </span>
              <span>Hola, {user?.name}</span>
              <ChevronDownIcon />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full z-10 mt-2 min-w-40 overflow-hidden rounded-lg border border-ink-800 bg-ink-900 shadow-lg shadow-black/40">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 text-left text-sm text-cream-200/80 transition-colors hover:bg-cream-50/5 hover:text-cream-50"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </header>

        <div className="max-w-6xl flex-1 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
