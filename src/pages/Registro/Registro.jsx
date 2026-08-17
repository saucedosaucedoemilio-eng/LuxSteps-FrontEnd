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
    <section className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-gray-900">Crear cuenta</h1>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <RegisterForm onSubmit={handleRegister} />
    </section>
  );
}

export default Registro;
