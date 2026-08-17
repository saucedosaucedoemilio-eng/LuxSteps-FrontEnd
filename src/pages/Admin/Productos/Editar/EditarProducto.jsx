import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../../../components/ProductForm";
import AdminPageHeader from "../../../../components/admin/AdminPageHeader";
import { ArrowLeftIcon, InfoIcon, TrashIcon } from "../../../../components/admin/icons";
import { deleteProduct, getProductById, updateProduct } from "../../../../services/productService";

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

  if (error && !product) return <p className="form-error">{error}</p>;
  if (!product) return <p>Cargando...</p>;

  return (
    <>
      <AdminPageHeader
        breadcrumbs={[{ label: "Productos", to: "/admin/productos" }, { label: "Editar producto" }]}
        title="Editar producto"
        subtitle="Actualiza la información de tu producto"
        actions={
          <button type="button" className="btn btn--outline" onClick={() => navigate("/admin/productos")}>
            <ArrowLeftIcon /> Volver a productos
          </button>
        }
      />

      {error && <p className="form-error">{error}</p>}

      <div className="admin-edit-product">
        <div className="admin-card admin-edit-product__form">
          <ProductForm
            initialData={product}
            allowImages={false}
            formId={FORM_ID}
            showSubmitButton={false}
            onSubmit={handleUpdate}
          />
        </div>

        <div className="admin-card admin-edit-product__images">
          <h2>Imágenes actuales</h2>
          <p>Estas imágenes no son editables desde aquí.</p>

          {product.images?.length > 0 ? (
            <div className="admin-edit-product__images-grid">
              {product.images.map((src) => (
                <img key={src} src={src} alt={product.name} />
              ))}
            </div>
          ) : (
            <p>Este producto no tiene imágenes.</p>
          )}

          <div className="admin-edit-product__images-note">
            <InfoIcon />
            <span>La API todavía no permite actualizar las imágenes de un producto ya creado.</span>
          </div>
        </div>
      </div>

      <div className="admin-edit-product__actions">
        <button
          type="button"
          className="btn btn--danger-outline"
          onClick={handleDelete}
          disabled={deleting}
        >
          <TrashIcon /> Eliminar producto
        </button>
        <button type="button" className="btn btn--outline" onClick={() => navigate("/admin/productos")}>
          Cancelar
        </button>
        <button type="submit" form={FORM_ID} className="btn btn--primary">
          Guardar cambios
        </button>
      </div>
    </>
  );
}

export default EditarProducto;
