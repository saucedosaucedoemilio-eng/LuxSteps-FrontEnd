import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { HomeIcon, BoxIcon, UsersIcon, ChevronDownIcon, ArrowLeftIcon } from "./icons";

const navItems = [
  { to: "/admin", label: "Inicio", icon: HomeIcon, end: true },
  { to: "/admin/productos", label: "Productos", icon: BoxIcon },
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
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <aside className="flex w-60 shrink-0 flex-col gap-8 border-r border-gray-200 bg-white p-4">
        <div className="flex items-center gap-2.5 px-2 text-lg font-bold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-xs font-bold text-white">
            LS
          </span>
          <span>LuxSteps</span>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                  isActive
                    ? "bg-brand-50 font-semibold text-brand-600"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
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
          className="mt-auto flex items-center gap-2 border-t border-gray-200 pt-4 text-sm text-gray-500 hover:text-gray-900"
        >
          <ArrowLeftIcon />
          Volver a la tienda
        </NavLink>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-end border-b border-gray-200 bg-white px-8 py-4">
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-gray-900 hover:bg-gray-50"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-600">
                {initial}
              </span>
              <span>Hola, {user?.name}</span>
              <ChevronDownIcon />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full z-10 mt-2 min-w-40 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50"
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
