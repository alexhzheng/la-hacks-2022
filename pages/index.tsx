import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import testRPC from "../api/ankr";

const Home: NextPage = () => {
  return (
    <div className="">
      <div className="z-50 fixed w-full">
        <Navbar />
      </div>
      <main className="flex h-full min-h-screen justify-center items-center text-center overflow-hidden relative">
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <h1 className="text-8xl text-left font-bold text-transparent bg-clip-text bg-gradient-to-tr from-sky-600 to-white mb-2">
              Welcome to
            </h1>
            <h1 className="text-6xl text-left font-bold text-transparent bg-clip-text bg-gradient-to-tr from-sky-600 to-white">
              Split-A-Bill!
            </h1>
            <h3 className="py-4 text-2xl">
              We help automate calculate bill splitting for the crypto
              enthrusiasts!
            </h3>
            <button
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 rounded-full hover:scale-95 transition duration-150 ease-in-out"
              type="button"
            >
              Get Started Now
            </button>
            <button
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 rounded-full hover:scale-95 transition duration-150 ease-in-out"
            type="button"
            onClick={testRPC}
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
