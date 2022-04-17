import Head from "next/head";
import Image from "next/image";
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useWalletConnect,
  useCoinbaseWallet,
} from "@thirdweb-dev/react";
import metaMask from "../public/metamask.svg";
import image from "next/image";
import { useRouter } from "next/router";

const Navbar = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const router = useRouter();
  return (
    <nav className="h-20 shadow-lg flex items-center justify-between max-w-full px-2 md:px-24">
      <div className="flex flex-row gap-x-7">
        <h1 className="text-4xl font-barlow font-medium tracking-wide">
          <button
            onClick={() => {
              router.push("/");
            }}
          >
            Split-A-Bill
          </button>
        </h1>
        <button
          className="flex items-center self-end"
          onClick={() => router.push("/history/")}
        >
          History
        </button>
      </div>
      <div className="">
        {address ? (
          <div className="flex flex-col">
            <p>address: {address}</p>

            <button
              onClick={disconnectWallet}
              className="cursor-pointer bg-red-400 px-4 py-2 rounded-3xl hover:scale-95 transition duration-150 ease-in-out"
            >
              Disconnect Wallet
            </button>
          </div>
        ) : (
          <div className="">
            <button
              className="flex flex-row justify-center items-center gap-x-2 cursor-pointer bg-sky-400 px-4 py-2 rounded-3xl hover:scale-95 transition duration-150 ease-in-out"
              type="button"
              onClick={connectWithMetamask}
            >
              <div className="relative h-9 w-9">
                <Image
                  src={metaMask}
                  alt="metamask icon"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="font-barlow text-xl uppercase">
                Connect Metamask
              </div>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
