import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { btnGhost } from "../styles/classNames";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinkClass = "text-sm font-medium text-gray-600 hover:text-gray-900";

  return (
    <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
      <Link to="/" className="flex items-center">
        <img src="/logo.png" alt="LuxSteps" className="h-10" />
      </Link>

      <nav className="flex items-center gap-5">
        <Link to="/productos" className={navLinkClass}>
          Productos
        </Link>
        <Link to="/carrito" className={navLinkClass}>
          Carrito {totalItems > 0 && `(${totalItems})`}
        </Link>

        {isAuthenticated ? (
          <>
            <Link to="/admin" className={navLinkClass}>
              Admin
            </Link>
            <span className="text-sm text-gray-500">Hola, {user?.name}</span>
            <button type="button" onClick={handleLogout} className={btnGhost}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={navLinkClass}>
              Iniciar sesión
            </Link>
            <Link to="/registro" className={navLinkClass}>
              Registrarse
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
