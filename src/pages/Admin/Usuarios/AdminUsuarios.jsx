import AdminPageHeader from "../../../components/admin/AdminPageHeader";

function AdminUsuarios() {
  return (
    <>
      <AdminPageHeader breadcrumbs={[{ label: "Usuarios" }]} title="Usuarios" subtitle="Usuarios registrados en la tienda" />

      <div className="admin-card">
        <p>
          Todavía no existe un endpoint de usuarios en la API. Cuando esté
          disponible, esta vista listará y gestionará los usuarios registrados.
        </p>
      </div>
    </>
  );
}

export default AdminUsuarios;
