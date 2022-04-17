import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { testRPC, oxSwap } from "../util/rpc";
import { generateQR } from "../util/qr";
import axios from "axios";
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useWalletConnect,
  useCoinbaseWallet,
} from "@thirdweb-dev/react";
const Home: NextPage = () => {
  const [click, setClick] = useState(false);
  const [uri, setUri] = useState("");
  const address = useAddress();

  const handleClick = async () => {
    setClick(!click);
    if (!address) {
      console.log("wallet not connected");
      return;
    }
    const x = await generateQR(address, "1e16");
    if (x)
      setUri(x.qr);
  };
  const [Clicked, setClicked] = useState(true);

  function closeModal() {
    setClicked(false);
  }

  function openModal() {
    setClicked(true);
  }

  const sendSMS = async () => {
     await axios.post("api/sendSMS", {
      address: address,
      to: "5105856168", // Brandon: 4699316958
    });
  };
  const sendEmail = async () => {
    await axios.post("api/sendEmail", {
      body: [
        {
          address: address,
        },
        {
          name: "alex",
          email: "adsfadsf@gmail.com",
        },
        {
          name: "a",
          email: "alex@vo2.fans",
        },
        {
          name: "b",
          email: "alexhz@seas.upenn.edu",
        },
        {
          name: "c",
          email: "alex.h.zheng@gmail.com",
        },
        {
          name: "d",
          email: "justinkim707@gmail.com",
        },
        {
          name: "e",
          email: "brandonbigbrother@gmail.com"
        },
      ],
    })
  };

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
            enthusiasts!
          </h3>
          <div className="flex flex-col gap-x-4 justify-center items-center">
            <div className="flex gap-x-4">
              <button
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 rounded-full hover:scale-95 transition duration-150 ease-in-out"
                type="button"
                onClick={() => {
                  sendEmail();
                }}
              >
                Get Started Now
              </button>
              <button
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 rounded-full hover:scale-95 transition duration-150 ease-in-out"
                type="button"
                onClick={() => {
                  handleClick();
                }}
              >
                Test Ethers
              </button>
            </div>
            <button
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 rounded-full hover:scale-95 transition duration-150 ease-in-out"
              type="button"
              onClick={() => {
                sendSMS();
              }}
            >
              Send SMS
            </button>
            {click && uri !== "" && (
              <div className="h-64 w-64 relative">
                <img src={uri} alt="qrcode" />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
