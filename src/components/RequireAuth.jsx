import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RequireAuth({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <p className="p-6 text-sm text-gray-500">Cargando...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
