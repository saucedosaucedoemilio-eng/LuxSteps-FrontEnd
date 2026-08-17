import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { _id, name, price, images } = product;
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <div className="product-card">
      <Link to={`/productos/${_id}`} className="product-card__link">
        <img src={images?.[0]} alt={name} className="product-card__image" />
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__price">${price}</p>
      </Link>
      <button type="button" onClick={handleAddToCart}>
        Agregar al carrito
      </button>
    </div>
  );
}

export default ProductCard;
