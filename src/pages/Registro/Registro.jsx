import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm";
import { useAuth } from "../../context/AuthContext";

function Registro() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleRegister = async (formData) => {
    setError(null);
    try {
      await register(formData);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "No se pudo completar el registro");
    }
  };

  return (
    <section className="mx-auto w-full max-w-md px-6 py-20">
      <div className="flex flex-col gap-5 rounded-2xl border border-ink-800 bg-ink-950/80 p-8 backdrop-blur">
        <h1 className="font-display text-3xl font-semibold text-cream-50">Crear cuenta</h1>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <RegisterForm onSubmit={handleRegister} />
      </div>
    </section>
  );
}

export default Registro;
