import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { _id, name, price, images, category, stock } = product;
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <Link
      to={`/productos/${_id}`}
      className="group flex flex-col gap-3 rounded-xl border border-ink-800 bg-ink-900/80 p-4 backdrop-blur transition-colors hover:border-cognac-500/40"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-ink-800">
        {images?.[0] ? (
          <img
            src={images[0]}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="flex h-full items-center justify-center text-xs uppercase tracking-widest text-cream-200/30">
            Sin imagen
          </span>
        )}
        {stock === 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-ink-950/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-cream-200/80">
            Agotado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1">
        {category && <span className="eyebrow text-[10px]">{category}</span>}
        <h3 className="font-display text-lg font-semibold text-cream-50">{name}</h3>
        <p className="text-sm text-cognac-400">${price}</p>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={stock === 0}
        className="rounded-full border border-cream-100/25 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream-50 transition-colors hover:bg-cream-50/10 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Agregar al carrito
      </button>
    </Link>
  );
}

export default ProductCard;
