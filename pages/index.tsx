import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  return (
    <div className="">
      <div className=" fixed w-full">
        <Navbar />
      </div>
      <main className="flex h-full min-h-screen justify-center items-center text-center overflow-hidden relative">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-sky-600 to-white">
            Welcome to Split-A-Bill!
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
        </div>
      </main>
    </div>
  );
};

export default Home;
