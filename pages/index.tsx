import type { NextPage } from "next";
import { useEffect, useState, Fragment } from "react";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { checkTransaction, getProvider, oxSwap } from "../util/rpc";
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
import Slideshow from "../components/Slideshow";

import { Dialog, Transition } from "@headlessui/react";
import { calcPaymentAmts } from "../util/splitCalc";
import { mint } from "../util/nft/mint";

const Home: NextPage = () => {
  const address = useAddress();

  const sendSMS = async (body) => {
    await axios.post("api/sendSMS", body);
  };

  let [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  const [total, setTotal] = useState(0);
  const [description, setDescription] = useState("");
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
    <div className="relative overflow-hidden">
      <div className="z-10 sticky top-0 bg-stone-100 sm:w-full ">
        <Navbar />
      </div>

      <main className="flex flex-col min-h-screen justify-center items-center text-center relative">
        <div className="my-48">
          <h1 className=" text-6xl pb-6 md:text-9xl  text-center font-bold text-transparent bg-clip-text bg-gradient-to-tr from-sky-600 to-white mb-2">
            Welcome To
          </h1>
          <h1 className="text-4xl pb-8 uppercase md:text-7xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-tr from-sky-600 to-white">
            Splitty
          </h1>
          <h3 className="px-4 py-4  text-3xl md:text-4xl font-barlow ">
            We help automate calculate bill splitting for crypto enthusiasts!
          </h3>
          <div className="flex flex-col gap-x-4 justify-center items-center">
            <div className="flex gap-x-4">
              <button
                className="bg-gradient-to-r from-sky-500 to-purple-300 px-4 py-2 rounded-full hover:scale-95 transition duration-150 ease-in-out"
                type="button"
                onClick={() => openModal()}
              >
                Request Payment Now
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 w-full bg-blue-50 h-full">
          <div className="font-barlow font-medium tracking-wide text-6xl mb-8 pt-8">
            What Do We Do?
          </div>
          <Slideshow />
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
              <div className="my-4">
                <p className="text-2xl font-medium font-barlow text-black text-center pt-2">
                  Total (in USD)
                </p>
                <input
                  className="mt-1 rounded border-2 border-black p-1 flex mx-auto"
                  type="number"
                  placeholder="0"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                />
                <p className="text-2xl font-medium font-barlow text-black text-center pt-2">
                  Description
                </p>
                <textarea
                  className="mt-1 rounded border-2 border-black p-1 flex mx-auto min-w-full"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                onClick={async () => {
                  if (total === 0) {
                    alert("Enter total");
                    return;
                  }
                  let totalPercent = 0;
                  inputList.map(
                    (input, x) => (totalPercent += parseInt(input.ratio))
                  );
                  console.log(totalPercent);
                  if (totalPercent !== 100) {
                    alert("Percents must add up to 100");
                    return;
                  }

                  const amts = await calcPaymentAmts(total, inputList);
                  alert(amts);
                  const x = JSON.parse(amts);
                  x[0].address = address;
                  x[0].description = description;
                  sendSMS(x);
                  closeModal();
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
