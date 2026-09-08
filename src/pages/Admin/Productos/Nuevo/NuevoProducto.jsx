import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../../../components/ProductForm";
import AdminPageHeader from "../../../../components/admin/AdminPageHeader";
import { ArrowLeftIcon } from "../../../../components/admin/icons";
import { createProduct } from "../../../../services/productService";
import { btnOutline, cardClass } from "../../../../styles/classNames";

function NuevoProducto() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleCreate = async (payload) => {
    setError(null);
    try {
      const data = new FormData();
      data.append("name", payload.name);
      data.append("description", payload.description);
      data.append("price", payload.price);
      data.append("stock", payload.stock);
      data.append("category", payload.category);
      payload.size.forEach((value) => data.append("size", value));
      payload.images.forEach((file) => data.append("images", file));

      await createProduct(data);
      navigate("/admin/productos");
    } catch (err) {
      setError(err.response?.data?.message || "No se pudo crear el producto");
    }
  };

  return (
    <>
      <AdminPageHeader
        breadcrumbs={[{ label: "Productos", to: "/admin/productos" }, { label: "Nuevo producto" }]}
        title="Nuevo producto"
        subtitle="Completa la información del producto"
        actions={
          <button type="button" className={btnOutline} onClick={() => navigate("/admin/productos")}>
            <ArrowLeftIcon /> Volver a productos
          </button>
        }
      />

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <div className={cardClass}>
        <ProductForm onSubmit={handleCreate} />
      </div>
    </>
  );
}

export default NuevoProducto;
