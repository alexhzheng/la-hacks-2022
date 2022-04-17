/**
 * Calculates the split of a given amount between a number of people.
 * @param totalCost total cost of the bill
 * @param ratios Array of ratios to split the totalCost between.
 * @returns Array of the split amounts.
 */

import internal from "stream";

type Input = {
  phoneNumber: string;
  ratio: number;
};
const calcPaymentAmts = (totalCost: number, inputList: Input[]) => {
  let ratioTotal: number = 0;
  inputList.map((input, x) => (ratioTotal += input.ratio));
  const amts = inputList.map((input) => (totalCost * input.ratio) / 100);
  let owed: any[] = [];
  inputList.map((input, idx) => {
    console.log(idx);
    owed.push({ phoneNumber: input.phoneNumber, amountOwed: amts[idx] });
  });
  const x = JSON.stringify(owed);
  return x;
};

export { calcPaymentAmts };
