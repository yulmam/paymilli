export const formatCurrency = (amount: number | string): string => {
  if (typeof amount === "string") {
    amount = parseFloat(amount);
  }
  return amount.toLocaleString();
};
