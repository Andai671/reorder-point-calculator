const ORDER_SOON_BUFFER_DAYS = 5;

export function calcReorderPoint({
  avg_daily_sales,
  lead_time_days,
  safety_days,
}) {
  return avg_daily_sales * (lead_time_days + safety_days);
}

export function getStatus(product) {
  const reorderPoint = calcReorderPoint(product);

  if (product.current_stock <= reorderPoint) {
    return "Order Now";
  }

  if (
    product.current_stock <=
    reorderPoint + product.avg_daily_sales * ORDER_SOON_BUFFER_DAYS
  ) {
    return "Order Soon";
  }

  return "Healthy";
}

export function calcDaysOfCover(product) {
  if (product.avg_daily_sales === 0) {
    return Infinity;
  }

  return product.current_stock / product.avg_daily_sales;
}
