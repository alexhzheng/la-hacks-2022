import type { NextPage } from "next";
import { useEffect, useState, Fragment } from "react";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { getProvider, oxSwap } from "../util/rpc";
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
    if (!address) {
      console.log("wallet not connected");
      return;
    }
    const x = await generateQR(address, "1e16");
    if (x) setUri(x.qr);
  };

  const sendSMS = async () => {
    await axios.post("api/sendSMS", {
      address: address,
      to: "4699316958", //"5105856168", // Brandon: 4699316958
      amount: "1e16",
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
          email: "brandonbigbrother@gmail.com",
        },
      ],
    });
  };

  let [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  const [total, setTotal] = useState(0);
  const [inputList, setInputList] = useState([{ phoneNumber: "", ratio: 0 }]);
  const handleAddClick = () => {
    setInputList([...inputList, { phoneNumber: "", ratio: 0 }]);
  };
  const handleInputChange = (e: any, index: any) => {
    const { name, value } = e.target;
    const list: any = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
  const handleRemoveClick = (index: any) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
  function closeModal() {
    setIsOpen(false);
    setInputList([{ phoneNumber: "", ratio: 0 }]);
    setTotal(0);
  }

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
            We help automate calculate bill splitting for crypto
            enthusiasts!
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
                <Image
                  src={uri}
                  alt="qrcode"
                  layout="fill"
                  objectFit="contain"
                />
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

            <div className="font-barlow inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-stone-200 shadow-xl rounded-2xl ">
              <div
                className="flex justify-end cursor-pointer"
                onClick={closeModal}
              >
                <div className="p-1 rounded-lg bg-red-300">
                  <IoClose className="h-6 w-6 " />
                </div>
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
                  type="number"
                  placeholder="0"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                />
              </div>
              <div className="flex">
                <div className="pr-36">Phone</div>
                <div>Ratio</div>
              </div>
              {inputList.map((x, i) => {
                return (
                  <div className="flex gap-x-2 ml-2 my-2" key={i}>
                    <input
                      className="rounded border-2 border-black p-1"
                      type="text"
                      name="phoneNumber"
                      placeholder="Add a phone number"
                      value={x.phoneNumber}
                      onChange={(e) => handleInputChange(e, i)}
                    />

                    <input
                      className="rounded border-2 border-black p-1"
                      type="number"
                      name="ratio"
                      placeholder="Enter Whole Number Percent"
                      value={x.ratio}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                    {inputList.length - 1 === i && (
                      <button
                        type="submit"
                        className="flex flex-grow justify-center items-center bg-blue-300 rounded-xl"
                        onClick={handleAddClick}
                      >
                        {" "}
                        Add
                      </button>
                    )}
                    {inputList.length !== 1 && (
                      <button
                        type="submit"
                        className="px-4 bg-red-300 rounded-xl flex-grow justify-center items-center "
                        onClick={() => handleRemoveClick(i)}
                      >
                        {" "}
                        Remove
                      </button>
                    )}
                  </div>
                );
              })}
              <button
                onClick={() => {
                  if (total === 0) {
                    alert("Enter total");
                    return;
                  }
                  let totalPercent = 0;
                  inputList.map((input, x) => (totalPercent += input.ratio));
                  console.log(totalPercent);
                  if (totalPercent !== 100) {
                    alert("Percents must add up to 100");
                    return;
                  }
                  const amts = calcPaymentAmts(total, inputList);
                  console.log(amts);
                  alert(amts);
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
