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
    <section className="products-page">
      <h1>Productos</h1>
      {error && <p className="form-error">{error}</p>}
      {products.length === 0 && !error && <p>No hay productos disponibles.</p>}
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default Productos;
