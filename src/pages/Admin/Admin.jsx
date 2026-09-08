import { Link } from "react-router-dom";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import { BoxIcon, UsersIcon, ReceiptIcon } from "../../components/admin/icons";
import { cardClass } from "../../styles/classNames";

function Admin() {
  return (
    <>
      <AdminPageHeader
        breadcrumbs={[{ label: "Inicio" }]}
        title="Panel de administración"
        subtitle="Gestiona los productos y usuarios de LuxSteps"
      />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
        <Link
          to="/admin/productos"
          className={`${cardClass} flex flex-col gap-2 text-inherit no-underline transition-colors hover:border-cognac-500/40`}
        >
          <BoxIcon className="text-cognac-400" />
          <h2 className="font-display text-lg font-semibold text-cream-50">Productos</h2>
          <p className="text-sm text-cream-200/55">Crear, editar y eliminar productos del catálogo.</p>
        </Link>
        <Link
          to="/admin/pedidos"
          className={`${cardClass} flex flex-col gap-2 text-inherit no-underline transition-colors hover:border-cognac-500/40`}
        >
          <ReceiptIcon className="text-cognac-400" />
          <h2 className="font-display text-lg font-semibold text-cream-50">Pedidos</h2>
          <p className="text-sm text-cream-200/55">Consultar pedidos y cambiar su estado.</p>
        </Link>
        <Link
          to="/admin/usuarios"
          className={`${cardClass} flex flex-col gap-2 text-inherit no-underline transition-colors hover:border-cognac-500/40`}
        >
          <UsersIcon className="text-cognac-400" />
          <h2 className="font-display text-lg font-semibold text-cream-50">Usuarios</h2>
          <p className="text-sm text-cream-200/55">Ver los usuarios registrados en la tienda.</p>
        </Link>
      </div>
    </>
  );
}

export default Admin;
