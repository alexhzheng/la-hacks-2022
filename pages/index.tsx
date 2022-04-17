import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { testRPC, oxSwap } from "../util/ankr";
import { generateQR } from "../util/qr";
import { useState } from "react";
const Home: NextPage = () => {
  const [Clicked, setClicked] = useState(true);

  function closeModal() {
    setClicked(false);
  }

  function openModal() {
    setClicked(true);
  }
  return (
    <div className="">
      <div className="z-50 bg-stone-100 fixed w-full">
        <Navbar />
      </div>
      <main className="flex h-full min-h-screen justify-center items-center text-center overflow-hidden relative">
        <div className="">
          <h1 className="text-9xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-tr from-sky-600 to-white mb-2">
            Welcome to
          </h1>
          <h1 className="text-7xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-tr from-sky-600 to-white">
            Split-A-Bill!
          </h1>
          <h3 className="py-4 text-2xl font-barlow ">
            We help automate calculate bill splitting for the crypto
            enthuistatis!
          </h3>
          <div className="flex gap-x-4 justify-center items-center">
            <button
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 rounded-full hover:scale-95 transition duration-150 ease-in-out"
              type="button"
            >
              Get Started Now
            </button>
            <button
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 rounded-full hover:scale-95 transition duration-150 ease-in-out"
              type="button"
              onClick={() => console.log(generateQR("WALLET_ADDRESS", "1e16"))}
            >
              Test Ethers
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
