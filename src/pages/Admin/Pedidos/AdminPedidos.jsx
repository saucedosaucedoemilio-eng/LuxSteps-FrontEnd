import { useEffect, useState } from "react";
import AdminPageHeader from "../../../components/admin/AdminPageHeader";
import { getAllOrders, updateOrderStatus } from "../../../services/orderService";
import { cardClass } from "../../../styles/classNames";

const STATUSES = ["pendiente", "pagado", "enviado", "entregado", "cancelado"];

function formatDate(value) {
  return new Date(value).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function AdminPedidos() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllOrders()
      .then(({ data }) => setOrders(data))
      .catch((err) => setError(err.response?.data?.message || "No se pudieron cargar los pedidos"));
  }, []);

  const handleStatus = async (id, status) => {
    try {
      const { data } = await updateOrderStatus(id, status);
      setOrders((prev) => prev.map((o) => (o._id === id ? data : o)));
    } catch (err) {
      setError(err.response?.data?.message || "No se pudo actualizar el estado");
    }
  };

  return (
    <>
      <AdminPageHeader
        breadcrumbs={[{ label: "Pedidos" }]}
        title="Pedidos"
        subtitle="Todos los pedidos de la tienda"
      />

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <div className={`${cardClass} overflow-x-auto`}>
        {orders.length === 0 && !error ? (
          <p className="text-sm text-cream-200/55">No hay pedidos todavía.</p>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {["Pedido", "Fecha", "Cliente", "Artículos", "Total", "Estado"].map((h) => (
                  <th
                    key={h}
                    className="border-b border-ink-800 px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-cream-200/45"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="align-top transition-colors hover:bg-cream-50/[0.03]">
                  <td className="border-b border-ink-800/70 px-3 py-3 font-mono text-xs text-cream-200/70">
                    {order._id.slice(-6).toUpperCase()}
                  </td>
                  <td className="border-b border-ink-800/70 px-3 py-3 text-cream-200/70">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="border-b border-ink-800/70 px-3 py-3 text-cream-100">
                    {order.user?.name ?? "—"}
                    <span className="block text-xs text-cream-200/45">{order.user?.email}</span>
                  </td>
                  <td className="border-b border-ink-800/70 px-3 py-3 text-cream-200/70">
                    {order.items.map((item, i) => (
                      <span key={i} className="block">
                        {item.name}
                        {item.size ? ` · T${item.size}` : ""} · x{item.quantity}
                      </span>
                    ))}
                  </td>
                  <td className="border-b border-ink-800/70 px-3 py-3 text-cognac-400">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="border-b border-ink-800/70 px-3 py-3">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatus(order._id, e.target.value)}
                      className="rounded-lg border border-ink-700 bg-ink-900 px-2 py-1.5 text-xs text-cream-50 focus:border-cognac-500 focus:outline-none"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default AdminPedidos;
