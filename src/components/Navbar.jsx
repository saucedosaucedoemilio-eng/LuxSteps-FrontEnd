import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <Link to="/" className="navbar__logo">
        <img src="/logo.png" alt="LuxSteps" />
      </Link>
      <nav className="navbar__links">
        <Link to="/productos">Productos</Link>
        <Link to="/carrito">Carrito {totalItems > 0 && `(${totalItems})`}</Link>
        {isAuthenticated ? (
          <>
            <Link to="/admin">Admin</Link>
            <span className="navbar__user">Hola, {user?.name}</span>
            <button type="button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar sesión</Link>
            <Link to="/registro">Registrarse</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
