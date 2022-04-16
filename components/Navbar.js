import Head from "next/head";
import Image from "next/image";

const Navbar = () => {
  return (
    <navbar className=" flex items-center justify-between max-w-full mt-4 px-24 font-barlow font-medium">
      <h1 className="text-4xl">Split-A-Bill</h1>
      <button
        className="bg-sky-400 px-4 py-2 rounded-3xl hover:scale-95 transition duration-150 ease-in-out text-xl"
        type="button"
      >
        Connect Wallet
      </button>
    </navbar>
  );
};

export default Navbar;
