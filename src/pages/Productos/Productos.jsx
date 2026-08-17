import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { getProducts } from "../../services/productService";

function Productos() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then(({ data }) => setProducts(data))
      .catch((err) => setError(err.response?.data?.message || "No se pudieron cargar los productos"));
  }, []);

  return (
    <section className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-gray-900">Productos</h1>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {products.length === 0 && !error && <p className="text-sm text-gray-500">No hay productos disponibles.</p>}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default Productos;
