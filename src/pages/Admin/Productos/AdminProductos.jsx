import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminPageHeader from "../../../components/admin/AdminPageHeader";
import { getProducts, deleteProduct } from "../../../services/productService";
import { btnPrimary, cardClass } from "../../../styles/classNames";

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
          <Link to="/admin/productos/nuevo" className={btnPrimary}>
            Nuevo producto
          </Link>
        }
      />

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <div className={`${cardClass} overflow-x-auto`}>
        {products.length === 0 && !error ? (
          <p className="text-sm text-gray-500">No hay productos todavía.</p>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border-b border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-500">
                  Nombre
                </th>
                <th className="border-b border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-500">
                  Precio
                </th>
                <th className="border-b border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-500">
                  Stock
                </th>
                <th className="border-b border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-500">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="border-b border-gray-100 px-3 py-3">{product.name}</td>
                  <td className="border-b border-gray-100 px-3 py-3">${product.price}</td>
                  <td className="border-b border-gray-100 px-3 py-3">{product.stock}</td>
                  <td className="border-b border-gray-100 px-3 py-3">
                    <div className="flex items-center gap-4">
                      <Link
                        to={`/admin/productos/editar/${product._id}`}
                        className="text-brand-600 hover:underline"
                      >
                        Editar
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:underline"
                      >
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
