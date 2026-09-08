import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { btnOutline, btnPrimary } from "../../styles/classNames";

function Carrito() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate("/checkout");
    } else {
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
    }
  };

  if (items.length === 0) {
    return (
      <section className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-16">
        <h1 className="font-display text-4xl font-semibold text-cream-50">Carrito de compras</h1>
        <p className="text-sm text-cream-200/60">
          Tu carrito está vacío.{" "}
          <Link to="/productos" className="font-medium text-cognac-400 hover:underline">
            Ver productos
          </Link>
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-16">
      <h1 className="font-display text-4xl font-semibold text-cream-50">Carrito de compras</h1>

      <ul className="flex flex-col gap-3">
        {items.map(({ product, quantity, size }) => (
          <li
            key={`${product._id}-${size ?? ""}`}
            className="flex flex-wrap items-center gap-4 rounded-xl border border-ink-800 bg-ink-900 p-3 sm:flex-nowrap"
          >
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="h-20 w-20 shrink-0 rounded-lg bg-ink-800 object-cover"
            />
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-cream-50">{product.name}</h3>
              {size && <p className="text-sm text-cream-200/60">Talla: {size}</p>}
              <p className="text-sm text-cream-200/60">${product.price}</p>
            </div>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => updateQuantity(product._id, size, Number(e.target.value))}
              className="w-16 rounded-lg border border-ink-700 bg-ink-950 px-2 py-1.5 text-sm text-cream-50 focus:border-cognac-500 focus:outline-none focus:ring-2 focus:ring-cognac-500/25"
            />
            <p className="w-24 text-right font-semibold text-cream-50">
              ${(product.price * quantity).toFixed(2)}
            </p>
            <button
              type="button"
              onClick={() => removeFromCart(product._id, size)}
              className="text-sm font-medium text-red-400 hover:text-red-300"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-4 rounded-xl border border-ink-800 bg-ink-900 p-5 sm:max-w-lg">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-cream-50">Total: ${totalPrice.toFixed(2)}</p>
          <button type="button" onClick={clearCart} className={btnOutline}>
            Vaciar carrito
          </button>
        </div>
        <button type="button" onClick={handleCheckout} className={`${btnPrimary} w-full`}>
          Finalizar compra
        </button>
      </div>
    </section>
  );
}

export default Carrito;
