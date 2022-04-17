import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import React from "react";
import step1 from "../public/gifs/step1.gif";
import step2 from "../public/gifs/step2.gif";
import step3 from "../public/gifs/step3.gif";
import Image from "next/Image";

const slideshow = () => {
  return (
    <div className=" bg-stone-300 rounded-xl shadow-xl  max-w-5xl mb-20 mx-auto flex justify-center items-center">
      {" "}
      <Carousel
        infiniteLoop={true}
        autoPlay={true}
        showArrows={false}
        showIndicators={false}
      >
        <div className="mt-10   justify-center items-center">
          <div className="">
            <Image
              className="rounded-xl"
              height={500}
              width={600}
              src={step1}
              alt="step1"
            />
          </div>
          <div className=" text-3xl mb-8 font-barlow">
            <p className="">Enter and submit transaction details</p>
          </div>
        </div>
        <div className="mt-10   justify-center items-center">
          <div className="">
            <Image
              className="rounded-xl"
              height={500}
              width={600}
              src={step2}
              alt="step2"
            />
          </div>
          <div className=" text-3xl mb-8 font-barlow">
            <p className="">Wait for friends to pay back</p>
          </div>
        </div>
        <div className="mt-10   justify-center items-center">
          <div className="">
            <Image
              className="rounded-xl"
              height={500}
              width={600}
              src={step3}
              alt="step3"
            />
          </div>
          <div className=" text-3xl mb-8 font-barlow">
            <p className="">
              We’ll notify you once everyone pays back and mint an NFT of the
              receipt
            </p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default slideshow;
