import StatusBadge from "./StatusBadge";
import { getStatus } from "../lib/inventory";

function ProductTable({ products }) {
  return (
    <table>
      <thead>
        <tr>
          <th>SKU</th>
          <th>Product Name</th>
          <th>Current Stock</th>
          <th>Avg Daily Sales</th>
          <th>Lead Time</th>
          <th>Safety Days</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          return (
            <tr key={product.sku}>
              <td>{product.sku}</td>
              <td>{product.name}</td>
              <td>{product.current_stock}</td>
              <td>{product.avg_daily_sales}</td>
              <td>{product.lead_time_days}</td>
              <td>{product.safety_days}</td>
              <td>
                <StatusBadge status={getStatus(product)} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ProductTable;
