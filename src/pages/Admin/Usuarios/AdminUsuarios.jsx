import AdminPageHeader from "../../../components/admin/AdminPageHeader";
import { cardClass } from "../../../styles/classNames";

function AdminUsuarios() {
  return (
    <>
      <AdminPageHeader
        breadcrumbs={[{ label: "Usuarios" }]}
        title="Usuarios"
        subtitle="Usuarios registrados en la tienda"
      />

      <div className={cardClass}>
        <p className="text-sm text-gray-600">
          Todavía no existe un endpoint de usuarios en la API. Cuando esté
          disponible, esta vista listará y gestionará los usuarios registrados.
        </p>
      </div>
    </>
  );
}

export default AdminUsuarios;
