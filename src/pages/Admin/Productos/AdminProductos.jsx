import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminPageHeader from "../../../components/admin/AdminPageHeader";
import { getProducts, deleteProduct } from "../../../services/productService";

function AdminProductos() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const loadProducts = () => {
    getProducts()
      .then(({ data }) => setProducts(data))
      .catch((err) => setError(err.response?.data?.message || "No se pudieron cargar los productos"));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return;

    try {
      await deleteProduct(id);
      loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || "No se pudo eliminar el producto");
    }
  };

  return (
    <>
      <AdminPageHeader
        breadcrumbs={[{ label: "Productos" }]}
        title="Productos"
        subtitle="Gestiona el catálogo de la tienda"
        actions={
          <Link to="/admin/productos/nuevo" className="btn btn--primary">
            Nuevo producto
          </Link>
        }
      />

      {error && <p className="form-error">{error}</p>}

      <div className="admin-card">
        {products.length === 0 && !error ? (
          <p>No hay productos todavía.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    <div className="admin-table__actions">
                      <Link to={`/admin/productos/editar/${product._id}`}>Editar</Link>
                      <button type="button" onClick={() => handleDelete(product._id)}>
                        Eliminar
                      </button>
                    </div>
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

export default AdminProductos;
