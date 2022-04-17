/** @format */

import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiOutlineMenu, HiOutlineMail, HiLightBulb } from "react-icons/hi";
import { BsCodeSlash, BsFillFilePdfFill } from "react-icons/bs";
import Link from "next/link";

export default function NavbarSmall() {
  return (
    <Menu as="div" className="z-50 relative inline-block text-left">
      <div>
        <Menu.Button className="sm:hidden inline-flex justify-center w-full py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <HiOutlineMenu size={36} />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="sm:hidden absolute right-0 w-56 mt-2 origin-top-right bg-black rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <Link href="/experience">
                  <a className="hover:text-black text-teal-400 group flex rounded-md items-center w-full px-2 py-2 text-sm">
                    {" "}
                    <BsCodeSlash className="w-5 h-5 mr-2" />
                    Experience
                  </a>
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <Link href="/project">
                  <a className="hover:text-black text-teal-400 group flex rounded-md items-center w-full px-2 py-2 text-sm">
                    {" "}
                    <HiLightBulb className="w-5 h-5 mr-2" />
                    Projects
                  </a>
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <Link href="/contact">
                  <a className="hover:text-black text-teal-400 group flex rounded-md items-center w-full px-2 py-2 text-sm">
                    <HiOutlineMail className="w-5 h-5 mr-2" />
                    Contact
                  </a>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://drive.google.com/file/d/1zbzl-BhNt0B-sy9OqmVmdGuTIx59WEsw/view?usp=sharing"
                  className="hover:text-black text-teal-400 group flex rounded-md items-center w-full px-2 py-2 text-sm"
                >
                  <BsFillFilePdfFill className="w-5 h-5 mr-2" />
                  Resume
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
