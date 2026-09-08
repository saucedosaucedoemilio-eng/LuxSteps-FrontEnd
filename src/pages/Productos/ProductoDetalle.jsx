import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../services/productService";
import { useCart } from "../../context/CartContext";
import { btnPrimary, btnOutline } from "../../styles/classNames";

function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    getProductById(id)
      .then(({ data }) => {
        setProduct(data);
        setSize(data.size?.[0] ? String(data.size[0]) : "");
      })
      .catch((err) =>
        setError(err.response?.data?.message || "No se pudo cargar el producto")
      );
  }, [id]);

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-sm text-red-400">{error}</p>
        <Link to="/productos" className="mt-4 inline-block text-sm text-cognac-400 hover:underline">
          Volver a la colección
        </Link>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-2xl bg-ink-900" />
        <div className="flex flex-col gap-4">
          <div className="h-4 w-24 animate-pulse rounded bg-ink-900" />
          <div className="h-10 w-2/3 animate-pulse rounded bg-ink-900" />
          <div className="h-24 w-full animate-pulse rounded bg-ink-900" />
        </div>
      </section>
    );
  }

  const images = product.images?.length ? product.images : [null];
  const outOfStock = product.stock === 0;

  const handleAddToCart = () => {
    addToCart(product, quantity, size || null);
    setAdded(true);
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <Link
        to="/productos"
        className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cream-200/50 hover:text-cream-50"
      >
        ← Colección
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Galería */}
        <div className="flex flex-col gap-4">
          <div className="aspect-square overflow-hidden rounded-2xl border border-ink-800 bg-ink-900">
            {images[activeImage] ? (
              <img
                src={images[activeImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="flex h-full items-center justify-center text-xs uppercase tracking-widest text-cream-200/30">
                Sin imagen
              </span>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`h-20 w-20 overflow-hidden rounded-lg border transition-colors ${
                    i === activeImage ? "border-cognac-500" : "border-ink-800 hover:border-ink-600"
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-6 rounded-2xl border border-ink-800 bg-ink-950/80 p-8 backdrop-blur lg:self-start">
          <div className="flex flex-col gap-2">
            {product.category && <span className="eyebrow">{product.category}</span>}
            <h1 className="font-display text-4xl font-semibold text-cream-50">{product.name}</h1>
            <p className="text-xl font-semibold text-cognac-400">${product.price}</p>
          </div>

          <p className="text-sm leading-relaxed text-cream-200/70">{product.description}</p>

          <p className="text-xs uppercase tracking-[0.2em] text-cream-200/50">
            {outOfStock ? "Agotado" : `${product.stock} disponibles`}
          </p>

          {product.size?.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-cream-200">Talla</span>
              <div className="flex flex-wrap gap-2">
                {product.size.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(String(s))}
                    className={`h-11 min-w-11 rounded-lg border px-3 text-sm font-semibold transition-colors ${
                      size === String(s)
                        ? "border-cream-50 bg-cream-50 text-ink-950"
                        : "border-ink-700 text-cream-200/80 hover:border-cream-100/40"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-cream-200">Cantidad</span>
            <div className="flex w-fit items-center rounded-lg border border-ink-700">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-cream-200 hover:text-cream-50"
              >
                −
              </button>
              <span className="min-w-10 text-center text-sm text-cream-50">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(product.stock || 1, q + 1))}
                className="px-3 py-2 text-cream-200 hover:text-cream-50"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={outOfStock}
            className={`${btnPrimary} w-full`}
          >
            {outOfStock ? "Sin stock" : "Agregar al carrito"}
          </button>

          {added && (
            <div className="flex items-center gap-3 border-t border-ink-800 pt-4 text-sm text-cream-200/70">
              Agregado al carrito.
              <button
                type="button"
                onClick={() => navigate("/carrito")}
                className={btnOutline}
              >
                Ver carrito
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductoDetalle;
