import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers, utils } from "ethers";

const rpcUrl = "https://rpc.ankr.com/eth_rinkeby";
const NFT_COLLECTION = "0x955Fd060539C2d8A7715ca79C7F34715042D9225";
const wallet = new ethers.Wallet(
  process.env.NEXT_PUBLIC_PRIVATE_KEY,
  ethers.getDefaultProvider(rpcUrl)
);
const sdk = new ThirdwebSDK(wallet);
const contract = sdk.getNFTCollection(NFT_COLLECTION);

const mint = async () => {
  const image =
    "https://cloudflare-ipfs.com/ipfs/QmZhndxZ2XANpnBmZ4qbncyVH94ciEz9pkXgoseLB8HiYP";

  const fake_data = [
    {
      address: "0x6d0bFC469Adb18f6C7f2ccE56036b81060d2aa7A",
      phoneNumber: "5105856168",
      usdAmount: "2500000",
      amount: 820.4683889939089,
    },
    {
      phoneNumber: "8584364463",
      usdAmount: "2000000",
      amount: 656.3747111951271,
    },
    {
      phoneNumber: "5103643386",
      usdAmount: "2000000",
      amount: 656.3747111951271,
    },
    {
      phoneNumber: "4699316958",
      usdAmount: "3500000",
      amount: 1148.6557445914723,
    },
  ];
  console.log(fake_data[0].address);
  contract
    .mintTo(fake_data[0].address, {
      name: "Receipt",
      description: "Receipt for Payment",
      image: image,
      attributes: fake_data.slice(1),
    })
    .then((metadata) => {
      console.log(metadata);
    })
    .catch((err) => {
      console.log(err);
    });
};

export { mint };
