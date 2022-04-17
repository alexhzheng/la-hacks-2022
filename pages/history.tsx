import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { calcPaymentAmts } from "../util/splitCalc";
import profpic from "../public/profpic.png";
import { getBalance, getEthPriceInUSD, getProvider } from "../util/rpc";
import { useAddress } from "@thirdweb-dev/react";

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
            Total Amount Owed (USDC): ${amountOwed} <br />
            Total Amount Owed (SOL): {amountOwed / exchangeRate}
          </div>
          <table className="table-auto border-separate [border-spacing:0.5rem]">
            <thead>
              <tr className="font-bold text-center">
                <th>Phone #</th>
                <th>Amount Owed</th>
                <th>Paid?</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td>(469) 931-6958</td>
                <td>30.1 USDC</td>
                <td>Yes</td>
              </tr>
              <tr className="text-center">
                <td>(531) 482-1895</td>
                <td>44.9 USDC</td>
                <td>No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default History;
