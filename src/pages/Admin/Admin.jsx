import { Link } from "react-router-dom";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import { BoxIcon, UsersIcon } from "../../components/admin/icons";

function Admin() {
  return (
    <>
      <AdminPageHeader
        breadcrumbs={[{ label: "Inicio" }]}
        title="Panel de administración"
        subtitle="Gestiona los productos y usuarios de LuxSteps"
      />

      <div className="admin-dashboard-cards">
        <Link to="/admin/productos" className="admin-card admin-dashboard-card">
          <BoxIcon />
          <h2>Productos</h2>
          <p>Crear, editar y eliminar productos del catálogo.</p>
        </Link>
        <Link to="/admin/usuarios" className="admin-card admin-dashboard-card">
          <UsersIcon />
          <h2>Usuarios</h2>
          <p>Ver los usuarios registrados en la tienda.</p>
        </Link>
      </div>
    </>
  );
}

export default Admin;
