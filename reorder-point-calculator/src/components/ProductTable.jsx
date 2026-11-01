import StatusBadge from "./StatusBadge";
import { getStatus, calcDaysOfCover } from "../lib/inventory";

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
          <th>Days of Cover</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          const daysOfCover = calcDaysOfCover(product);

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
              <td>
                {daysOfCover === Infinity
                  ? "No Sales"
                  : Math.round(daysOfCover)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ProductTable;
