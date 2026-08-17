import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../services/productService";
import { useCart } from "../../context/CartContext";

function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    getProductById(id)
      .then(({ data }) => {
        setProduct(data);
        setSize(data.size?.[0] ?? "");
      })
      .catch((error) => console.error("Error al obtener el producto", error));
  }, [id]);

  if (!product) return <p>Cargando...</p>;

  const handleAddToCart = () => {
    addToCart(product, quantity, size || null);
    setAdded(true);
  };

  return (
    <section className="product-detail">
      <img src={product.images?.[0]} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p className="product-detail__price">${product.price}</p>

      {product.size?.length > 0 && (
        <label htmlFor="size">
          Talla
          <select id="size" value={size} onChange={(e) => setSize(e.target.value)}>
            {product.size.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      )}

      <label htmlFor="quantity">
        Cantidad
        <input
          id="quantity"
          type="number"
          min="1"
          max={product.stock}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </label>

      <button type="button" onClick={handleAddToCart} disabled={product.stock === 0}>
        {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
      </button>

      {added && (
        <p className="product-detail__added">
          Agregado al carrito.{" "}
          <button type="button" onClick={() => navigate("/carrito")}>
            Ver carrito
          </button>
        </p>
      )}
    </section>
  );
}

export default ProductoDetalle;
