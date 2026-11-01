import "./App.css";
import ProductTable from "./components/ProductTable";
import SummaryCards from "./components/SummaryCards";

const sampleProducts = [
  {
    sku: "IPH15-128-BK-UL-RF",
    name: "iPhone 15 128GB Black Unlocked",
    current_stock: 40,
    avg_daily_sales: 5,
    lead_time_days: 10,
    safety_days: 7,
  },
  {
    sku: "IPH16-128-BK-UL-RF",
    name: "iPhone 16 128GB Black Unlocked",
    current_stock: 20,
    avg_daily_sales: 3,
    lead_time_days: 10,
    safety_days: 7,
  },
  {
    sku: "IPAD10-64-BL-UL-RF",
    name: "iPad 10th Generation 64GB Blue Unlocked",
    current_stock: 320,
    avg_daily_sales: 15,
    lead_time_days: 10,
    safety_days: 7,
  },
  {
    sku: "MBPRO-MVVJ2-GY-RF",
    name: 'Macbook Pro 16" 2019 i7 16GB RAM 512GB SSD Space Gray',
    current_stock: 0,
    avg_daily_sales: 4,
    lead_time_days: 10,
    safety_days: 10,
  },
  {
    sku: "IPH17PM-256-BK-UL-RF",
    name: "iPhone 17 Pro Max 256GB Black Unlocked",
    current_stock: 200,
    avg_daily_sales: 7,
    lead_time_days: 10,
    safety_days: 7,
  },
];

function App() {
  return (
    <div>
      <h1>Reorder Point Calculator</h1>
      <SummaryCards products={sampleProducts} />
      <ProductTable products={sampleProducts} />
    </div>
  );
}

export default App;
