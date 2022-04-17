/**
 * Calculates the split of a given amount between a number of people.
 * @param totalCost total cost of the bill
 * @param ratios Array of ratios to split the totalCost between.
 * @returns Array of the split amounts.
 */
const calcPaymentAmts = (totalCost: number, ratios: number[]) => {
  const ratioTotal = ratios.reduce((acc, cur) => acc + cur, 0);
  const amts = ratios.map(ratio => totalCost * ratio / ratioTotal);
  return amts;
}

export { calcPaymentAmts };