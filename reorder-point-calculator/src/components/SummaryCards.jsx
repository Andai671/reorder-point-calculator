import { getStatus } from "../lib/inventory";

function SummaryCards({ products }) {
  const orderNowCount = products.filter(
    (product) => getStatus(product) === "Order Now",
  ).length;
  const orderSoonCount = products.filter(
    (product) => getStatus(product) === "Order Soon",
  ).length;
  const healthyCount = products.filter(
    (product) => getStatus(product) === "Healthy",
  ).length;

  return (
    <div>
      <h2>Summary</h2>
      <p>Order Now: {orderNowCount}</p>
      <p>Order Soon: {orderSoonCount}</p>
      <p>Healthy: {healthyCount}</p>
    </div>
  );
}

export default SummaryCards;
