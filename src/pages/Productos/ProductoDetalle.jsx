import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../services/productService";
import { useCart } from "../../context/CartContext";
import { btnOutline, btnPrimary, inputClass, labelClass } from "../../styles/classNames";

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

  if (!product) return <p className="text-sm text-gray-500">Cargando...</p>;

  const handleAddToCart = () => {
    addToCart(product, quantity, size || null);
    setAdded(true);
  };

  return (
    <section className="flex max-w-lg flex-col gap-3">
      <img
        src={product.images?.[0]}
        alt={product.name}
        className="max-h-80 w-full rounded-xl bg-gray-100 object-cover"
      />
      <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-xl font-semibold text-brand-600">${product.price}</p>

      {product.size?.length > 0 && (
        <div className="flex max-w-40 flex-col gap-1.5">
          <label htmlFor="size" className={labelClass}>
            Talla
          </label>
          <select
            id="size"
            className={inputClass}
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            {product.size.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex max-w-40 flex-col gap-1.5">
        <label htmlFor="quantity" className={labelClass}>
          Cantidad
        </label>
        <input
          id="quantity"
          type="number"
          min="1"
          max={product.stock}
          className={inputClass}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={product.stock === 0}
        className={`${btnPrimary} w-fit`}
      >
        {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
      </button>

      {added && (
        <p className="flex items-center gap-2 text-sm text-gray-600">
          Agregado al carrito.
          <button type="button" onClick={() => navigate("/carrito")} className={btnOutline}>
            Ver carrito
          </button>
        </p>
      )}
    </section>
  );
}

export default ProductoDetalle;
