import { useState } from "react";

const emptyForm = {
  sku: "",
  name: "",
  current_stock: "",
  avg_daily_sales: "",
  lead_time_days: "",
  safety_days: "",
};

function ProductForm({
  onAddProduct,
  editingProduct,
  onUpdateProduct,
  onCancelEdit,
  products,
}) {
  const [formData, setFormData] = useState(editingProduct ?? emptyForm);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const typedSku = formData.sku.toLowerCase().trim();

    if (!typedSku || !formData.name.trim()) {
      setError("SKU and Name are required fields.");
      return;
    }

    const isDuplicate = products.some(
      (product) =>
        product.sku.toLowerCase() === typedSku &&
        product.id !== editingProduct?.id,
    );

    if (isDuplicate) {
      setError("A product with this SKU already exists.");
      return;
    }

    setError("");

    const newProduct = {
      ...formData,
      sku: formData.sku.trim(),
      name: formData.name.trim(),
      current_stock: Number(formData.current_stock),
      avg_daily_sales: Number(formData.avg_daily_sales),
      lead_time_days: Number(formData.lead_time_days),
      safety_days: Number(formData.safety_days),
    };

    if (editingProduct) {
      onUpdateProduct(newProduct);
    } else {
      onAddProduct(newProduct);
    }

    setFormData(emptyForm);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        SKU:
        <input
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Name:
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Current Stock:
        <input
          name="current_stock"
          type="number"
          value={formData.current_stock}
          onChange={handleChange}
          min="0"
          required
        />
      </label>
      <label>
        Average Daily Sales:
        <input
          name="avg_daily_sales"
          type="number"
          value={formData.avg_daily_sales}
          onChange={handleChange}
          min="0"
          required
          step="any"
        />
      </label>
      <label>
        Lead Time (Days):
        <input
          name="lead_time_days"
          type="number"
          value={formData.lead_time_days}
          onChange={handleChange}
          min="0"
          required
        />
      </label>
      <label>
        Safety Stock (Days):
        <input
          name="safety_days"
          type="number"
          value={formData.safety_days}
          onChange={handleChange}
          min="0"
          required
        />
      </label>
      {error && <p className="error">{error}</p>}
      <button type="submit">
        {editingProduct === null ? "Add Product" : "Save Changes"}
      </button>
      {editingProduct && (
        <button type="button" onClick={onCancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default ProductForm;
