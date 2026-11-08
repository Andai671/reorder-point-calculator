import { useState } from "react";

const emptyForm = {
  sku: "",
  name: "",
  current_stock: "",
  avg_daily_sales: "",
  lead_time_days: "",
  safety_days: "",
};

function ProductForm({ onAddProduct, editingProduct, onUpdateProduct }) {
  const [formData, setFormData] = useState(editingProduct ?? emptyForm);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newProduct = {
      ...formData,
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
        <input name="sku" value={formData.sku} onChange={handleChange} />
      </label>
      <label>
        Name:
        <input name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Current Stock:
        <input
          name="current_stock"
          type="number"
          value={formData.current_stock}
          onChange={handleChange}
        />
      </label>
      <label>
        Average Daily Sales:
        <input
          name="avg_daily_sales"
          type="number"
          value={formData.avg_daily_sales}
          onChange={handleChange}
        />
      </label>
      <label>
        Lead Time (Days):
        <input
          name="lead_time_days"
          type="number"
          value={formData.lead_time_days}
          onChange={handleChange}
        />
      </label>
      <label>
        Safety Stock (Days):
        <input
          name="safety_days"
          type="number"
          value={formData.safety_days}
          onChange={handleChange}
        />
      </label>
      <button type="submit">
        {editingProduct === null ? "Add Product" : "Save Changes"}
      </button>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </form>
  );
}

export default ProductForm;
