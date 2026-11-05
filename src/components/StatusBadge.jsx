import "./StatusBadge.css";

function StatusBadge({ status }) {
  let badgeClass = "badge ";

  if (status === "Order Now") {
    badgeClass += "badge-order-now";
  } else if (status === "Order Soon") {
    badgeClass += "badge-order-soon";
  } else if (status === "Healthy") {
    badgeClass += "badge-healthy";
  }

  return <span className={badgeClass}>{status}</span>;
}

export default StatusBadge;
