import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { calcPaymentAmts } from "../util/splitCalc";

const Split: NextPage = () => {
  const [formData, setFormData] = useState({
    total: 0,
    user1Contact: "",
    user2Contact: "",
    user1Ratio: 0,
    user2Ratio: 0,
  });

  return (
    <div className="">
      <div className="z-50 bg-stone-100 fixed w-full">
        <Navbar />
      </div>
      <main className="flex h-full min-h-screen justify-center items-center text-center overflow-hidden relative">
        <div className="flex flex-col gap-x-4 justify-center items-center">
          <div className="flex flex-row gap-x-2 my-4 justify-center items-center">
            Total (in USD):
            <input
              className="rounded border-2 border-black p-1"
              type="text"
              placeholder="0"
              value={formData.total}
              onChange={(e) =>
                setFormData({ ...formData, total: parseFloat(e.target.value) })
              }
            />
          </div>
          <div className="flex w-full gap-x-4 justify-around">
            <div>Email/phone</div>
            <div>Ratio</div>
          </div>
          <div className="flex gap-x-4">
            <input
              className="rounded border-2 border-black p-1"
              type="text"
              placeholder="bob@gmail.com"
              value={formData.user1Contact}
              onChange={(e) =>
                setFormData({ ...formData, user1Contact: e.target.value })
              }
            />
            <input
              className="rounded border-2 border-black p-1"
              type="number"
              placeholder="1"
              value={formData.user1Ratio}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  user1Ratio: parseFloat(e.target.value),
                })
              }
            />
          </div>
          <div className="flex gap-x-4 my-3">
            <input
              className="rounded border-2 border-black p-1"
              type="text"
              placeholder="joe@gmail.com"
              value={formData.user2Contact}
              onChange={(e) =>
                setFormData({ ...formData, user2Contact: e.target.value })
              }
            />
            <input
              className="rounded border-2 border-black p-1"
              type="number"
              placeholder="1"
              value={formData.user2Ratio}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  user2Ratio: parseFloat(e.target.value),
                })
              }
            />
          </div>
          <button
            onClick={() => {
              const amts = calcPaymentAmts(formData.total, [
                formData.user1Ratio,
                formData.user2Ratio,
              ]);
              alert(
                `${formData.user1Contact} owes ${amts[0]}, and ${formData.user2Contact} owes ${amts[1]}`
              );
            }}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 rounded-full hover:scale-95 transition duration-150 ease-in-out"
          >
            Split
          </button>
        </div>
      </main>
    </div>
  );
};

export default Split;
