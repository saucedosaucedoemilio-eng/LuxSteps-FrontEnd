import { useState } from "react";

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
    <form id={formId} className="product-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="name">Nombre *</label>
        <input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>

      <div className="form-field">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="product-form__row">
        <div className="form-field form-field--price">
          <label htmlFor="price">Precio *</label>
          <span className="form-field__prefix">$</span>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="stock">Stock *</label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="size">Tallas (separadas por coma)</label>
        <input
          id="size"
          name="size"
          value={formData.size}
          onChange={handleChange}
          placeholder="Ej: 38, 39, 40, 41, 42"
        />
      </div>

      <div className="form-field">
        <label htmlFor="category">Categoría</label>
        <input
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </div>

      {allowImages && (
        <div className="form-field">
          <label htmlFor="images">Imágenes</label>
          <input
            id="images"
            name="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      )}

      {showSubmitButton && (
        <button type="submit" className="btn btn--primary">
          {submitLabel}
        </button>
      )}
    </form>
  );
}

export default ProductForm;
