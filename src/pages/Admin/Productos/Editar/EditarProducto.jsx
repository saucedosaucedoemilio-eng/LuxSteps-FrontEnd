import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../../../components/ProductForm";
import AdminPageHeader from "../../../../components/admin/AdminPageHeader";
import { ArrowLeftIcon, InfoIcon, TrashIcon } from "../../../../components/admin/icons";
import { deleteProduct, getProductById, updateProduct } from "../../../../services/productService";
import { btnDangerOutline, btnOutline, btnPrimary, cardClass } from "../../../../styles/classNames";

const FORM_ID = "edit-product-form";

function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getProductById(id)
      .then(({ data }) => setProduct(data))
      .catch((err) => setError(err.response?.data?.message || "No se pudo cargar el producto"));
  }, [id]);

  const handleUpdate = async (payload) => {
    setError(null);
    try {
      // El endpoint PUT no acepta multipart/imágenes, solo JSON.
      const { images: _images, ...data } = payload;
      await updateProduct(id, data);
      navigate("/admin/productos");
    } catch (err) {
      setError(err.response?.data?.message || "No se pudo actualizar el producto");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("¿Eliminar este producto? Esta acción no se puede deshacer.")) return;

    setDeleting(true);
    setError(null);
    try {
      await deleteProduct(id);
      navigate("/admin/productos");
    } catch (err) {
      setError(err.response?.data?.message || "No se pudo eliminar el producto");
      setDeleting(false);
    }
  };

  if (error && !product) return <p className="text-sm text-red-400">{error}</p>;
  if (!product) return <p className="text-sm text-cream-200/55">Cargando...</p>;

  return (
    <>
      <AdminPageHeader
        breadcrumbs={[{ label: "Productos", to: "/admin/productos" }, { label: "Editar producto" }]}
        title="Editar producto"
        subtitle="Actualiza la información de tu producto"
        actions={
          <button type="button" className={btnOutline} onClick={() => navigate("/admin/productos")}>
            <ArrowLeftIcon /> Volver a productos
          </button>
        }
      />

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[2fr_1fr]">
        <div className={cardClass}>
          <ProductForm
            initialData={product}
            allowImages={false}
            formId={FORM_ID}
            showSubmitButton={false}
            onSubmit={handleUpdate}
          />
        </div>

        <div className={cardClass}>
          <h2 className="mb-1 font-display text-base font-semibold text-cream-50">Imágenes actuales</h2>
          <p className="mb-4 text-sm text-cream-200/55">Estas imágenes no son editables desde aquí.</p>

          {product.images?.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {product.images.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt={product.name}
                  className="aspect-square w-full rounded-lg bg-ink-800 object-cover"
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-cream-200/55">Este producto no tiene imágenes.</p>
          )}

          <div className="mt-4 flex gap-2 rounded-lg border border-cognac-500/30 bg-cognac-500/10 p-3 text-sm text-cream-200/80">
            <InfoIcon className="mt-0.5 shrink-0 text-cognac-400" />
            <span>La API todavía no permite actualizar las imágenes de un producto ya creado.</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3 rounded-xl border border-ink-800 bg-ink-900 p-4">
        <button
          type="button"
          className={`${btnDangerOutline} mr-auto`}
          onClick={handleDelete}
          disabled={deleting}
        >
          <TrashIcon /> Eliminar producto
        </button>
        <button type="button" className={btnOutline} onClick={() => navigate("/admin/productos")}>
          Cancelar
        </button>
        <button type="submit" form={FORM_ID} className={btnPrimary}>
          Guardar cambios
        </button>
      </div>
    </>
  );
}

export default EditarProducto;
