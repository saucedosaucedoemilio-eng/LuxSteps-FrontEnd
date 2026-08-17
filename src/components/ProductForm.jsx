import { useState } from "react";
import { btnPrimary, inputClass, labelClass } from "../styles/classNames";

function buildInitialState(initialData) {
  return {
    name: initialData?.name ?? "",
    description: initialData?.description ?? "",
    price: initialData?.price ?? "",
    stock: initialData?.stock ?? "",
    size: Array.isArray(initialData?.size) ? initialData.size.join(", ") : "",
    category: initialData?.category ?? "",
  };
}

function ProductForm({
  initialData,
  allowImages = true,
  formId = "product-form",
  showSubmitButton = true,
  submitLabel = "Guardar producto",
  onSubmit,
}) {
  const [formData, setFormData] = useState(() => buildInitialState(initialData));
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const size = formData.size
      .split(",")
      .map((value) => Number(value.trim()))
      .filter((value) => !Number.isNaN(value));

    onSubmit({
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      stock: Number(formData.stock),
      category: formData.category,
      size,
      images,
    });
  };

  return (
    <form id={formId} className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className={labelClass}>
          Nombre *
        </label>
        <input
          id="name"
          name="name"
          className={inputClass}
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className={labelClass}>
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className={inputClass}
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="price" className={labelClass}>
            Precio *
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              $
            </span>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              className={`${inputClass} pl-6`}
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="stock" className={labelClass}>
            Stock *
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            className={inputClass}
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="size" className={labelClass}>
          Tallas (separadas por coma)
        </label>
        <input
          id="size"
          name="size"
          className={inputClass}
          value={formData.size}
          onChange={handleChange}
          placeholder="Ej: 38, 39, 40, 41, 42"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="category" className={labelClass}>
          Categoría
        </label>
        <input
          id="category"
          name="category"
          className={inputClass}
          value={formData.category}
          onChange={handleChange}
        />
      </div>

      {allowImages && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="images" className={labelClass}>
            Imágenes
          </label>
          <input
            id="images"
            name="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-brand-600 hover:file:bg-brand-100"
          />
        </div>
      )}

      {showSubmitButton && (
        <button type="submit" className={`${btnPrimary} w-fit`}>
          {submitLabel}
        </button>
      )}
    </form>
  );
}

export default ProductForm;
