/** @format */

import { Menu } from "@headlessui/react";
import { Fragment } from "react";
import { HiOutlineMenu, HiOutlineMail, HiLightBulb } from "react-icons/hi";
import { BsCodeSlash, BsFillFilePdfFill } from "react-icons/bs";
import Link from "next/link";
import metaMask from "../public/metamask.svg";
import Image from "next/image";

export default function NavbarSmall() {
  return (
    <Menu as="div" className="z-50 relative inline-block text-left pr-2">
      <div>
        <Menu.Button className="sm:hidden inline-flex justify-center w-full py-2 text-sm font-medium text-white rounded-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <HiOutlineMenu size={36} className="text-black" />
        </Menu.Button>
      </div>

      <Menu.Items className="sm:hidden absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="px-1 py-1 ">
          <Menu.Item>
            {({ active }) => (
              <div
                className="hover:text-black text-sky-400 group flex rounded-md items-center w-full px-2 py-2 text-sm"
                onClick={() => {
                  alert("Open On Desktop");
                }}
              >
                {" "}
                <div className="relative h-5 w-5 mr-2">
                  <Image
                    src={metaMask}
                    alt="metamask icon"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                Connect Metamask
              </div>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link href="/history">
                <a className="hover:text-black text-sky-400 group flex rounded-md items-center w-full px-2 py-2 text-sm">
                  {" "}
                  <BsCodeSlash className="w-5 h-5 mr-2" />
                  History
                </a>
              </Link>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
}
