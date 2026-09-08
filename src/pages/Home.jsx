import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productService";
import { btnPrimary } from "../styles/classNames";
import ProductCard from "../components/ProductCard";

function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    getProducts()
      .then(({ data }) => setFeatured(data.slice(0, 4)))
      .catch(() => setFeatured([]));
  }, []);

  return (
    <>
      {/* Hero — usa el fondo compartido del layout */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-950/10 to-ink-950" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-3xl flex-col items-center justify-center gap-6 px-6 py-24 text-center">
          <span className="h-px w-12 bg-cognac-400" />
          <span className="eyebrow">LuxSteps</span>
          <h1 className="font-display text-5xl font-semibold uppercase tracking-[0.14em] text-cream-50 sm:text-7xl">
            Men&apos;s Shoes
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-cream-200/70">
            Encuentra el calzado que se adapta a tu estilo.
          </p>
          <Link to="/productos" className={`${btnPrimary} mt-2`}>
            Ver colección
          </Link>
        </div>
      </section>

      {/* Destacados */}
      {featured.length > 0 && (
        <section className="bg-ink-950/70 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex items-end justify-between gap-4">
              <h2 className="font-display text-3xl font-semibold text-cream-50">
                Destacados
              </h2>
              <Link
                to="/productos"
                className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cognac-400 hover:text-cognac-300"
              >
                Ver todo
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Home;
