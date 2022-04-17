import { Fragment, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

import { Disclosure, Menu, Transition, Dialog } from "@headlessui/react";

const Modal = ({ isOpen, toggleIsOpen }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => null}
      >
        <div className="min-h-screen px-4 text-center items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          </Transition.Child>
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="text-center text-xl bg-vo2dark-900 text-white font-semibold inline-block w-full max-w-xl p-6 my-8 align-middle transition-all transform shadow-xl rounded-2xl">
              <div className="flex flex-col items-center justify-center">
                <div className="pt-2 pb-8">
                  <p>VO2 token is coming out soon!</p>
                  <p>
                    In the meantime, join the waitlist and check out our other
                    athletes!
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    toggleIsOpen();
                  }}
                  className="flex items-center space-x-2 font-semibold tracking-wide bg-gradient-to-r p-1 from-[#38BDF8] to-[#5648ED] text-white rounded-full px-8 lg:px-12 py-2 mt-2 lg:mt-0"
                >
                  Join Waitlist
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
