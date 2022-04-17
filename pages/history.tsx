import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { calcPaymentAmts } from "../util/splitCalc";
import profpic from "../public/profpic.png";
import { getBalance, getEthPriceInUSD, getProvider } from "../util/rpc";
import { useAddress } from "@thirdweb-dev/react";

const BalanceRow = (props: { number: string, amount: string, hash?: string }) => {
  return (<tr className="text-center">
    <td>{props.number}</td>
    <td>${props.amount}</td>
    <td>{props.hash ? "Yes" : "no"}</td>
    {props.hash ?
      <td className="text-blue-600 underline"
        onClick={() => window.open(`https://rinkeby.etherscan.io/tx/${props.hash}`, "_blank")}>
        link
      </td>
      :
      <td>N/A</td>
    }

  </tr>)
}

const History: NextPage = () => {
  const [amountOwed, setAmountOwed] = useState(125.38);
  const [exchangeRate, setExchangeRate] = useState(1);
  const address = useAddress();
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    getEthPriceInUSD().then((rate) => setExchangeRate(rate));
  });

  useEffect(() => {
    async function load() {
      if (address) {
        const ankrProvider = await getProvider();
        getBalance(ankrProvider, address).then((bal) => {
          setBalance(bal);
        });
      };
    }
    load();
  }, [address]);

  return (
    <div className="">
      <div className="z-50 bg-stone-100 fixed w-full">
        <Navbar />
      </div>
      <main className="flex h-full min-h-screen justify-center items-center text-center overflow-hidden relative">
        <div className="flex flex-col gap-x-4 justify-center items-center">
          <Image
            src={profpic}
            width={200}
            height={200}
            className="object-cover rounded-full h-9 w-9 "
            alt="profile pic"
          />
          <h1 className="text-3xl font-bold text-center mt-4">
            Your Account
          </h1>
          <div className="flex flex-row gap-x-2 my-4 justify-center items-center">
            Current wallet balance (ETH): {balance} <br />
            Total Amount Owed (USD): ${amountOwed} <br />
            Total Amount Owed (SOL): {amountOwed / exchangeRate}
          </div>
          <h2 className="text-2xl font-bold text-center mt-4">
            Outstanding Balances</h2>
          <table className="table-auto border-separate [border-spacing:0.5rem]">
            <thead>
              <tr className="font-bold text-center">
                <th>Phone #</th>
                <th>Amount Owed</th>
                <th>Paid?</th>
                <th>Txn</th>
              </tr>
            </thead>
            {address==="0x86283791B4e9BF64AA71b921A302559b48911c61" && (
              <tbody>
                <BalanceRow
                  number="(469) 931-6958"
                  amount="70.00"
                  hash="0xcb56d9dcbf502ffeb26ecd013b3a402578d96d378a6675a8cc44ee769e1a50c0"
                />
                <BalanceRow
                  number="(531) 402-1895"
                  amount="45.33"
                />
                <BalanceRow
                  number="(917) 829-9087"
                  amount="12.90"
                />
              </tbody>
            )}
          </table>
        </div>
      </main>
    </div>
  );
};

export default History;
