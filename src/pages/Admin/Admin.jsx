import { Link } from "react-router-dom";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import { BoxIcon, UsersIcon } from "../../components/admin/icons";
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
          className={`${cardClass} flex flex-col gap-2 text-inherit no-underline hover:border-brand-200`}
        >
          <BoxIcon className="text-brand-600" />
          <h2 className="text-lg font-semibold text-gray-900">Productos</h2>
          <p className="text-sm text-gray-500">Crear, editar y eliminar productos del catálogo.</p>
        </Link>
        <Link
          to="/admin/usuarios"
          className={`${cardClass} flex flex-col gap-2 text-inherit no-underline hover:border-brand-200`}
        >
          <UsersIcon className="text-brand-600" />
          <h2 className="text-lg font-semibold text-gray-900">Usuarios</h2>
          <p className="text-sm text-gray-500">Ver los usuarios registrados en la tienda.</p>
        </Link>
      </div>
    </>
  );
}

export default Admin;
