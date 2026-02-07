export const formatCurrency = (num) => {
  const n = Number(num) || 0;
  return n.toLocaleString('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    minimumFractionDigits: 0
  });
}