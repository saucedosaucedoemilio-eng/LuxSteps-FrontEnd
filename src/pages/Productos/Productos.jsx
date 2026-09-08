import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { getProducts } from "../../services/productService";

const SORTS = {
  nuevos: { label: "Novedades", fn: (a, b) => new Date(b.createdAt) - new Date(a.createdAt) },
  precioAsc: { label: "Precio: menor a mayor", fn: (a, b) => a.price - b.price },
  precioDesc: { label: "Precio: mayor a menor", fn: (a, b) => b.price - a.price },
};

function Productos() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const categoria = searchParams.get("categoria") || "";
  const orden = searchParams.get("orden") || "nuevos";

  useEffect(() => {
    getProducts()
      .then(({ data }) => setProducts(data))
      .catch((err) =>
        setError(err.response?.data?.message || "No se pudieron cargar los productos")
      );
  }, []);

  const categories = useMemo(() => {
    if (!products) return [];
    return [...new Set(products.map((p) => p.category).filter(Boolean))].sort();
  }, [products]);

  const visible = useMemo(() => {
    if (!products) return [];
    const sortFn = (SORTS[orden] || SORTS.nuevos).fn;
    return products
      .filter((p) => !categoria || p.category === categoria)
      .sort(sortFn);
  }, [products, categoria, orden]);

  const setParam = (key, value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) next.set(key, value);
      else next.delete(key);
      return next;
    });
  };

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-2">
        <span className="eyebrow">Colección</span>
        <h1 className="font-display text-4xl font-semibold text-cream-50">Productos</h1>
      </header>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {products && (
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-ink-800 py-4">
          {categories.length > 1 ? (
            <div className="flex flex-wrap gap-2">
              <FilterChip active={!categoria} onClick={() => setParam("categoria", "")}>
                Todos
              </FilterChip>
              {categories.map((c) => (
                <FilterChip
                  key={c}
                  active={categoria === c}
                  onClick={() => setParam("categoria", c)}
                >
                  {c}
                </FilterChip>
              ))}
            </div>
          ) : (
            <span className="text-xs uppercase tracking-[0.2em] text-cream-200/50">
              {visible.length} {visible.length === 1 ? "modelo" : "modelos"}
            </span>
          )}

          <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-cream-200/50">
            Ordenar
            <select
              value={orden}
              onChange={(e) => setParam("orden", e.target.value)}
              className="rounded-lg border border-ink-700 bg-ink-900 px-3 py-1.5 text-xs text-cream-50 focus:border-cognac-500 focus:outline-none"
            >
              {Object.entries(SORTS).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {!products && !error && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] animate-pulse rounded-xl bg-ink-900" />
          ))}
        </div>
      )}

      {products && visible.length === 0 && (
        <p className="text-sm text-cream-200/60">No hay productos en esta categoría.</p>
      )}

      {visible.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors ${
        active
          ? "border-cream-50 bg-cream-50 text-ink-950"
          : "border-ink-700 text-cream-200/70 hover:border-cream-100/40 hover:text-cream-50"
      }`}
    >
      {children}
    </button>
  );
}

export default Productos;
