import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RequireAuth({ children, adminOnly = false }) {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return <p className="p-6 text-sm text-cream-200/55">Cargando...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RequireAuth;
