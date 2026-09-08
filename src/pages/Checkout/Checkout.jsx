import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { createOrder } from "../../services/orderService";
import { btnPrimary, inputClass, labelClass } from "../../styles/classNames";

const FIELDS = [
  { name: "fullName", label: "Nombre completo *", autoComplete: "name" },
  { name: "address", label: "Dirección *", autoComplete: "street-address" },
  { name: "city", label: "Ciudad *", autoComplete: "address-level2" },
  { name: "postalCode", label: "Código postal *", autoComplete: "postal-code" },
  { name: "country", label: "País *", autoComplete: "country-name" },
  { name: "phone", label: "Teléfono", autoComplete: "tel" },
];

function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: user?.name ?? "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await createOrder({
        items: items.map(({ product, quantity, size }) => ({
          product: product._id,
          quantity,
          size,
        })),
        shipping: form,
      });
      clearCart();
      navigate("/pedidos", { state: { justOrdered: true } });
    } catch (err) {
      setError(err.response?.data?.message || "No se pudo completar el pedido");
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <section className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-16">
        <h1 className="font-display text-4xl font-semibold text-cream-50">Finalizar compra</h1>
        <p className="text-sm text-cream-200/60">
          Tu carrito está vacío.{" "}
          <Link to="/productos" className="font-medium text-cognac-400 hover:underline">
            Ver productos
          </Link>
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16">
      <h1 className="font-display text-4xl font-semibold text-cream-50">Finalizar compra</h1>

      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h2 className="font-display text-xl font-semibold text-cream-50">Datos de envío</h2>

          <div className="grid gap-5 sm:grid-cols-2">
            {FIELDS.map(({ name, label, autoComplete }) => (
              <div key={name} className="flex flex-col gap-1.5">
                <label htmlFor={name} className={labelClass}>
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  autoComplete={autoComplete}
                  className={inputClass}
                  value={form[name]}
                  onChange={handleChange}
                  required={label.includes("*")}
                />
              </div>
            ))}
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button type="submit" className={`${btnPrimary} w-full`} disabled={submitting}>
            {submitting ? "Procesando..." : `Confirmar pedido · $${totalPrice.toFixed(2)}`}
          </button>
          <p className="text-xs text-cream-200/45">
            Este es un proyecto de demostración: no se procesa ningún pago real.
          </p>
        </form>

        <aside className="flex h-fit flex-col gap-4 rounded-2xl border border-ink-800 bg-ink-950/80 p-6 backdrop-blur">
          <h2 className="font-display text-lg font-semibold text-cream-50">Tu pedido</h2>
          <ul className="flex flex-col gap-3">
            {items.map(({ product, quantity, size }) => (
              <li key={`${product._id}-${size ?? ""}`} className="flex gap-3">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="h-16 w-16 shrink-0 rounded-lg bg-ink-800 object-cover"
                />
                <div className="flex flex-1 flex-col text-sm">
                  <span className="text-cream-100">{product.name}</span>
                  <span className="text-cream-200/55">
                    {size ? `Talla ${size} · ` : ""}x{quantity}
                  </span>
                </div>
                <span className="text-sm font-semibold text-cream-50">
                  ${(product.price * quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between border-t border-ink-800 pt-4">
            <span className="text-sm uppercase tracking-[0.18em] text-cream-200/55">Total</span>
            <span className="text-lg font-bold text-cream-50">${totalPrice.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Checkout;
