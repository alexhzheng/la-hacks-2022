import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import React from "react";
import step1 from "../public/gifs/step1.gif";
import step2 from "../public/gifs/step2.gif";
import step3 from "../public/gifs/step3.gif";
import Image from "next/Image";

const slideshow = () => {
  return (
    <Carousel>
      <div>
        <Image src={step1} alt="step1" />
        <p className="">Enter and submit transaction details</p>
      </div>
      <div>
        <Image src={step2} alt="step2" />
        <p className="">Wait for friends to pay back</p>
      </div>
      <div>
        <Image src={step3} alt="step3" />
        <p className="">
          We’ll notify you once everyone pays back and mint an NFT of the
          receipt
        </p>
      </div>
    </Carousel>
  );
};

export default slideshow;
