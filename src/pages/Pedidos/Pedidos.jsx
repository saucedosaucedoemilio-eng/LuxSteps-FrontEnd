import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getMyOrders } from "../../services/orderService";

const STATUS_LABELS = {
  pendiente: "Pendiente",
  pagado: "Pagado",
  enviado: "Enviado",
  entregado: "Entregado",
  cancelado: "Cancelado",
};

function formatDate(value) {
  return new Date(value).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function Pedidos() {
  const location = useLocation();
  const justOrdered = location.state?.justOrdered;

  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMyOrders()
      .then(({ data }) => setOrders(data))
      .catch((err) =>
        setError(err.response?.data?.message || "No se pudieron cargar tus pedidos")
      );
  }, []);

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-16">
      <header className="flex flex-col gap-2">
        <span className="eyebrow">Cuenta</span>
        <h1 className="font-display text-4xl font-semibold text-cream-50">Mis pedidos</h1>
      </header>

      {justOrdered && (
        <p className="rounded-xl border border-cognac-500/30 bg-cognac-500/10 px-4 py-3 text-sm text-cream-100">
          ¡Pedido confirmado! Puedes seguir su estado aquí.
        </p>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}

      {!orders && !error && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl bg-ink-900" />
          ))}
        </div>
      )}

      {orders && orders.length === 0 && (
        <p className="text-sm text-cream-200/60">
          Todavía no tienes pedidos.{" "}
          <Link to="/productos" className="font-medium text-cognac-400 hover:underline">
            Ver productos
          </Link>
        </p>
      )}

      {orders?.map((order) => (
        <article
          key={order._id}
          className="flex flex-col gap-4 rounded-xl border border-ink-800 bg-ink-900 p-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-[0.18em] text-cream-200/45">
                Pedido {order._id.slice(-6).toUpperCase()}
              </span>
              <span className="text-sm text-cream-200/60">{formatDate(order.createdAt)}</span>
            </div>
            <span className="rounded-full border border-cognac-500/30 bg-cognac-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-cognac-300">
              {STATUS_LABELS[order.status] ?? order.status}
            </span>
          </div>

          <ul className="flex flex-col gap-2 border-t border-ink-800 pt-4">
            {order.items.map((item, i) => (
              <li key={i} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-cream-100">
                  {item.name}
                  <span className="text-cream-200/50">
                    {item.size ? ` · Talla ${item.size}` : ""} · x{item.quantity}
                  </span>
                </span>
                <span className="text-cream-200/70">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between border-t border-ink-800 pt-4">
            <span className="text-xs uppercase tracking-[0.18em] text-cream-200/45">Total</span>
            <span className="font-semibold text-cream-50">${order.total.toFixed(2)}</span>
          </div>
        </article>
      ))}
    </section>
  );
}

export default Pedidos;
