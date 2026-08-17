import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { HomeIcon, BoxIcon, UsersIcon, ChevronDownIcon, ArrowLeftIcon } from "./icons";
import "./admin.css";

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
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <span className="admin-sidebar__logo">LS</span>
          <span>LuxSteps</span>
        </div>

        <nav className="admin-sidebar__nav">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                "admin-sidebar__link" + (isActive ? " admin-sidebar__link--active" : "")
              }
            >
              <Icon />
              {label}
            </NavLink>
          ))}
        </nav>

        <NavLink to="/" className="admin-sidebar__back">
          <ArrowLeftIcon />
          Volver a la tienda
        </NavLink>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar__spacer" />
          <div className="admin-topbar__user">
            <button
              type="button"
              className="admin-topbar__avatar-btn"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="admin-topbar__avatar">{initial}</span>
              <span>Hola, {user?.name}</span>
              <ChevronDownIcon />
            </button>

            {menuOpen && (
              <div className="admin-topbar__menu">
                <button type="button" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
