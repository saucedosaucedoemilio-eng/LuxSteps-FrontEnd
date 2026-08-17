import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (credentials) => {
    setError(null);
    try {
      await login(credentials);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "No se pudo iniciar sesión");
    }
  };

  return (
    <section className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-gray-900">Iniciar sesión</h1>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <LoginForm onSubmit={handleLogin} />
    </section>
  );
}

export default Login;
