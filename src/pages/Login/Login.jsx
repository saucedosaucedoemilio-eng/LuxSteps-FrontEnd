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
    <section className="mx-auto w-full max-w-md px-6 py-20">
      <div className="flex flex-col gap-5 rounded-2xl border border-ink-800 bg-ink-950/80 p-8 backdrop-blur">
        <h1 className="font-display text-3xl font-semibold text-cream-50">Iniciar sesión</h1>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <LoginForm onSubmit={handleLogin} />
      </div>
    </section>
  );
}

export default Login;
