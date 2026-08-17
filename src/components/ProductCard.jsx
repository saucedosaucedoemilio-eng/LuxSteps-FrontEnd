import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { btnOutline } from "../styles/classNames";

function ProductCard({ product }) {
  const { _id, name, price, images } = product;
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4">
      <Link to={`/productos/${_id}`} className="flex flex-col gap-2 text-inherit no-underline">
        <img
          src={images?.[0]}
          alt={name}
          className="h-44 w-full rounded-lg bg-gray-100 object-cover"
        />
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <p className="font-semibold text-brand-600">${price}</p>
      </Link>
      <button type="button" onClick={handleAddToCart} className={btnOutline}>
        Agregar al carrito
      </button>
    </div>
  );
}

export default ProductCard;
