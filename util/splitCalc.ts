/**
 * Calculates the split of a given amount between a number of people.
 * @param totalCost total cost of the bill
 * @param ratios Array of ratios to split the totalCost between.
 * @returns Array of the split amounts.
 */

import internal from "stream";
import { getEthPriceInUSD } from "./rpc";

type Input = {
  phoneNumber: string;
  ratio: number;
};
const calcPaymentAmts = async (totalCost: number, inputList: Input[]) => {
  let ratioTotal: number = 0;
  inputList.map((input, x) => (ratioTotal += input.ratio));
  // const amts = inputList.map((input) => (totalCost * input.ratio) / 100);
  let owed: any[] = [];
  const eth = await getEthPriceInUSD();
  console.log(eth);

  inputList.map((input, idx) => {
    // console.log(eth);
    const y = {
      phoneNumber: input.phoneNumber,
      usdAmount: (totalCost * input.ratio) / ratioTotal,
      amount: (totalCost * input.ratio) / ratioTotal / eth,
    };

    owed.push({ ...y });
  });
  const x = JSON.stringify(owed);
  return x;
};

export { calcPaymentAmts };
