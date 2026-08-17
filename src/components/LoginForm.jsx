import { useState } from "react";
import { btnPrimary, inputClass, labelClass } from "../styles/classNames";

function LoginForm({ onSubmit }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="flex w-full max-w-sm flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className={labelClass}>
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={inputClass}
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className={labelClass}>
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className={inputClass}
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className={btnPrimary}>
        Iniciar sesión
      </button>
    </form>
  );
}

export default LoginForm;
