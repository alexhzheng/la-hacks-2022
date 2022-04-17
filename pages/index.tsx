import type { NextPage } from "next";
import { useEffect, useState, Fragment } from "react";
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
import { IoClose } from "react-icons/io5";

import { Dialog, Transition } from "@headlessui/react";
import { calcPaymentAmts } from "../util/splitCalc";

const Home: NextPage = () => {
  const [click, setClick] = useState(false);
  const [uri, setUri] = useState("");
  const address = useAddress();

  const handleClick = async () => {
    setClick(!click);
    const x = await generateQR(address, "1e16");
    setUri(x.qr);
  };

  const sendEmail = async () => {
    const response = await axios.post("api/sendEmail", {
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
      ],
    });
  };

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const [formData, setFormData] = useState({
    total: 0,
    user1Contact: "",
    user2Contact: "",
    user1Ratio: 0,
    user2Ratio: 0,
  });

  return (
    <div className="relative">
      <div className="z-50 bg-stone-100 fixed w-full ">
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
          <div className="flex flex-col gap-x-4 justify-center items-center">
            <div className="flex gap-x-4">
              <button
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 rounded-full hover:scale-95 transition duration-150 ease-in-out"
                type="button"
                onClick={() => openModal()}
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

            {click && uri !== "" && (
              <div className="h-64 w-64 relative">
                <img src={uri} alt="qrcode" />
              </div>
            )}
          </div>
        </div>

        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModal}
          open={isOpen}
        >
          <div className="min-h-screen px-4 text-center">
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className=" font-barlow inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl ">
              <div
                className="flex justify-end cursor-pointer"
                onClick={closeModal}
              >
                <IoClose className="h-6 w-6 " />
              </div>

              <Dialog.Title
                as="h3"
                className="text-4xl font-barlow font-medium leading-6 text-gray-900 text-center"
              >
                Split Your Payments!
              </Dialog.Title>
              <div className="my-4 ">
                <p className="text-2xl font-medium font-barlow text-black text-center pt-2">
                  Total (in USD)
                </p>
                <input
                  className="rounded border-2 border-black p-1  flex mx-auto"
                  type="text"
                  placeholder="0"
                  value={formData.total}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      total: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div className="flex w-full gap-x-4 justify-around">
                <div>Email/phone</div>
                <div>Ratio</div>
              </div>
              <div className="flex gap-x-4 justify-center items-center">
                <input
                  className="rounded border-2 border-black p-1"
                  type="text"
                  placeholder="bob@gmail.com"
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
              <div className=" mt-4 flex gap-x-4 justify-center items-center">
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
                className=" flex text-2xl text-center justify-center items-center mx-auto w-1/2 mt-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 rounded-full hover:scale-95 transition duration-150 ease-in-out"
              >
                <a className="   font-medium tracking-widest uppercase">
                  Split
                </a>
              </button>
            </div>
          </div>
        </Dialog>
      </main>
    </div>
  );
};

export default Home;
