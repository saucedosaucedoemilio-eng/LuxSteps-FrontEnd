import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function Carrito() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <section className="cart-page">
        <h1>Carrito de compras</h1>
        <p>
          Tu carrito está vacío. <Link to="/productos">Ver productos</Link>
        </p>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <h1>Carrito de compras</h1>
      <ul className="cart-list">
        {items.map(({ product, quantity, size }) => (
          <li key={`${product._id}-${size ?? ""}`} className="cart-item">
            <img src={product.images?.[0]} alt={product.name} className="cart-item__image" />
            <div className="cart-item__info">
              <h3>{product.name}</h3>
              {size && <p>Talla: {size}</p>}
              <p>${product.price}</p>
            </div>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => updateQuantity(product._id, size, Number(e.target.value))}
            />
            <p className="cart-item__subtotal">${(product.price * quantity).toFixed(2)}</p>
            <button type="button" onClick={() => removeFromCart(product._id, size)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <p className="cart-summary__total">Total: ${totalPrice.toFixed(2)}</p>
        <button type="button" onClick={clearCart}>
          Vaciar carrito
        </button>
      </div>
    </section>
  );
}

export default Carrito;
