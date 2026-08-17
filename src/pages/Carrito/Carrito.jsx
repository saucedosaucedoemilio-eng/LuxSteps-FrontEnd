import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { btnOutline } from "../../styles/classNames";

function Carrito() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <section className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold text-gray-900">Carrito de compras</h1>
        <p className="text-sm text-gray-500">
          Tu carrito está vacío.{" "}
          <Link to="/productos" className="font-medium text-brand-600 hover:underline">
            Ver productos
          </Link>
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-900">Carrito de compras</h1>

      <ul className="flex flex-col gap-3">
        {items.map(({ product, quantity, size }) => (
          <li
            key={`${product._id}-${size ?? ""}`}
            className="grid grid-cols-[80px_1fr_auto_auto_auto] items-center gap-4 rounded-xl border border-gray-200 bg-white p-3"
          >
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="h-20 w-20 rounded-lg bg-gray-100 object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{product.name}</h3>
              {size && <p className="text-sm text-gray-500">Talla: {size}</p>}
              <p className="text-sm text-gray-500">${product.price}</p>
            </div>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => updateQuantity(product._id, size, Number(e.target.value))}
              className="w-16 rounded-lg border border-gray-200 px-2 py-1.5 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
            <p className="font-semibold text-gray-900">${(product.price * quantity).toFixed(2)}</p>
            <button
              type="button"
              onClick={() => removeFromCart(product._id, size)}
              className="text-sm font-medium text-red-600 hover:text-red-700"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <div className="flex max-w-lg items-center justify-between rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-lg font-bold text-gray-900">Total: ${totalPrice.toFixed(2)}</p>
        <button type="button" onClick={clearCart} className={btnOutline}>
          Vaciar carrito
        </button>
      </div>
    </section>
  );
}

export default Carrito;
