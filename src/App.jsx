import { useState, useEffect } from "react";
import "./App.css";
import ProductTable from "./components/ProductTable";
import SummaryCards from "./components/SummaryCards";
import ProductForm from "./components/ProductForm";
import { saveProducts, loadProducts } from "./lib/storage";
import { getStatus, calcDaysOfCover } from "./lib/inventory";

const sampleProducts = [
  {
    id: "1",
    sku: "IPH15-128-BK-UL-RF",
    name: "iPhone 15 128GB Black Unlocked",
    current_stock: 40,
    avg_daily_sales: 5,
    lead_time_days: 10,
    safety_days: 7,
  },
  {
    id: "2",
    sku: "IPH16-128-BK-UL-RF",
    name: "iPhone 16 128GB Black Unlocked",
    current_stock: 20,
    avg_daily_sales: 3,
    lead_time_days: 10,
    safety_days: 7,
  },
  {
    id: "3",
    sku: "IPAD10-64-BL-UL-RF",
    name: "iPad 10th Generation 64GB Blue Unlocked",
    current_stock: 320,
    avg_daily_sales: 15,
    lead_time_days: 10,
    safety_days: 7,
  },
  {
    id: "4",
    sku: "MBPRO-MVVJ2-GY-RF",
    name: 'Macbook Pro 16" 2019 i7 16GB RAM 512GB SSD Space Gray',
    current_stock: 0,
    avg_daily_sales: 4,
    lead_time_days: 10,
    safety_days: 10,
  },
  {
    id: "5",
    sku: "IPH17PM-256-BK-UL-RF",
    name: "iPhone 17 Pro Max 256GB Black Unlocked",
    current_stock: 200,
    avg_daily_sales: 7,
    lead_time_days: 10,
    safety_days: 7,
  },
];

const STATUS_FILTERS = ["All", "Order Now", "Order Soon", "Healthy"];

function App() {
  const [products, setProducts] = useState(
    () => loadProducts() ?? sampleProducts,
  );
  const [editingProduct, setEditingProduct] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  function handleAddProduct(newProduct) {
    const productWithId = { ...newProduct, id: crypto.randomUUID() };

    setProducts((prevProducts) => [...prevProducts, productWithId]);
  }

  function handleDeleteProduct(productToDelete) {
    const confirmed = window.confirm(
      `Delete SKU: ${productToDelete.sku}? This can't be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productToDelete.id),
    );
  }

  function handleStartEdit(product) {
    setEditingProduct(product);
  }

  function handleUpdateProduct(updatedProduct) {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === editingProduct.id ? updatedProduct : product,
      ),
    );

    setEditingProduct(null);
  }

  function handleCancelEdit() {
    setEditingProduct(null);
  }

  const visibleProducts = products.filter((product) => {
    return statusFilter === "All" ? true : getStatus(product) === statusFilter;
  });

  const query = searchText.toLowerCase();

  const searchedProducts = visibleProducts.filter((product) => {
    return (
      product.sku.toLowerCase().includes(query) ||
      product.name.toLowerCase().includes(query)
    );
  });

  const sortedProducts = [...searchedProducts].sort(
    (a, b) => calcDaysOfCover(a) - calcDaysOfCover(b),
  );

  let emptyMessage = null;

  if (products.length === 0) {
    emptyMessage = "No products available. Add one above.";
  } else if (sortedProducts.length === 0) {
    emptyMessage = "No products match your search or filter.";
  }

  return (
    <div>
      <h1>Reorder Point Calculator</h1>
      <SummaryCards products={products} />
      <ProductForm
        onAddProduct={handleAddProduct}
        editingProduct={editingProduct}
        key={editingProduct ? editingProduct.id : "new"}
        onUpdateProduct={handleUpdateProduct}
        onCancelEdit={handleCancelEdit}
      />
      {STATUS_FILTERS.map((filter) => (
        <button
          key={filter}
          onClick={() => setStatusFilter(filter)}
          disabled={statusFilter === filter}
        >
          {filter}
        </button>
      ))}
      <input
        placeholder="Search SKU or name"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {emptyMessage ? (
        <p>{emptyMessage}</p>
      ) : (
        <ProductTable
          products={sortedProducts}
          onDeleteProduct={handleDeleteProduct}
          onEditProduct={handleStartEdit}
        />
      )}
    </div>
  );
}

export default App;
