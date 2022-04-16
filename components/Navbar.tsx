import Head from "next/head";
import Image from "next/image";
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useWalletConnect,
  useCoinbaseWallet,
} from "@thirdweb-dev/react";

const Navbar = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  return (
    <nav className="flex items-center justify-between max-w-full mt-4 px-24">
      <h1 className="text-2xl">Split-A-Bill</h1>
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
          <div className="flex flex-col gap-y-4">
            <button
              className="cursor-pointer bg-sky-400 px-4 py-2 rounded-3xl hover:scale-95 transition duration-150 ease-in-out"
              type="button"
              onClick={connectWithMetamask}
            >
              Connect Metamask
            </button>
            <button
              className="cursor-pointer bg-sky-400 px-4 py-2 rounded-3xl hover:scale-95 transition duration-150 ease-in-out"
              type="button"
              onClick={connectWithWalletConnect}
            >
              Connect WalletConnect
            </button>
            <button
              className="cursor-pointer bg-sky-400 px-4 py-2 rounded-3xl hover:scale-95 transition duration-150 ease-in-out"
              type="button"
              onClick={connectWithCoinbaseWallet}
            >
              Connect Coinbase Wallet
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
