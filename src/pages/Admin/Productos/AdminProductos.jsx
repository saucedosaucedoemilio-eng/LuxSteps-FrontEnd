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

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <div className={`${cardClass} overflow-x-auto`}>
        {products.length === 0 && !error ? (
          <p className="text-sm text-cream-200/55">No hay productos todavía.</p>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {["Nombre", "Precio", "Stock", "Acciones"].map((h) => (
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
              {products.map((product) => (
                <tr key={product._id} className="transition-colors hover:bg-cream-50/[0.03]">
                  <td className="border-b border-ink-800/70 px-3 py-3 text-cream-100">{product.name}</td>
                  <td className="border-b border-ink-800/70 px-3 py-3 text-cognac-400">${product.price}</td>
                  <td className="border-b border-ink-800/70 px-3 py-3 text-cream-200/70">{product.stock}</td>
                  <td className="border-b border-ink-800/70 px-3 py-3">
                    <div className="flex items-center gap-4">
                      <Link
                        to={`/admin/productos/editar/${product._id}`}
                        className="text-cognac-400 transition-colors hover:text-cognac-300"
                      >
                        Editar
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(product._id)}
                        className="text-red-400 transition-colors hover:text-red-300"
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
