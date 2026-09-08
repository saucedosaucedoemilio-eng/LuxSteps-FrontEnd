import { useEffect, useState } from "react";
import AdminPageHeader from "../../../components/admin/AdminPageHeader";
import { getUsers } from "../../../services/userService";
import { cardClass } from "../../../styles/classNames";

function formatDate(value) {
  return new Date(value).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function AdminUsuarios() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers()
      .then(({ data }) => setUsers(data))
      .catch((err) => setError(err.response?.data?.message || "No se pudieron cargar los usuarios"));
  }, []);

  return (
    <>
      <AdminPageHeader
        breadcrumbs={[{ label: "Usuarios" }]}
        title="Usuarios"
        subtitle="Usuarios registrados en la tienda"
      />

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <div className={`${cardClass} overflow-x-auto`}>
        {users.length === 0 && !error ? (
          <p className="text-sm text-cream-200/55">No hay usuarios registrados.</p>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {["Nombre", "Email", "Rol", "Alta"].map((h) => (
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
              {users.map((user) => (
                <tr key={user._id} className="transition-colors hover:bg-cream-50/[0.03]">
                  <td className="border-b border-ink-800/70 px-3 py-3 text-cream-100">{user.name}</td>
                  <td className="border-b border-ink-800/70 px-3 py-3 text-cream-200/70">{user.email}</td>
                  <td className="border-b border-ink-800/70 px-3 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                        user.role === "admin"
                          ? "bg-cognac-500/15 text-cognac-300"
                          : "bg-cream-50/5 text-cream-200/60"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="border-b border-ink-800/70 px-3 py-3 text-cream-200/55">
                    {formatDate(user.createdAt)}
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

export default AdminUsuarios;
