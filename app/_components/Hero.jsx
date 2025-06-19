"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedGradientTextDemo } from "./animatedtext";
import Link from "next/link";
const Hero = () => {
  return (
    <div className="bg-black px-4 md:px-10 py-10 text-white bg-[linear-gradient(to_bottom,#000,#01254b86,#002e60e9,#004f9b,#3680ce)] py-[150px] sm:py-24 relative overflow-clip">
      <div className="absolute h-[375px] w-[750px] sm:w-[1536px] sm:h-[768px] lg:w-[2400px] llg:h-[800px] rounded-[100%] bg-black left-1/2 -translate-x-1/2 border border-[#01254b86] bg-[radial-gradient(closest-side,#000_82%,#3680ce)] top-[calc(100%-96px)] sm:top-[calc(100%-120px)]"></div>

      <div className=" relative">
        <div className="flex items-center justify-center -mt-15">
          <AnimatedGradientTextDemo />
        </div>

        <div className="flex justify-center mt-8">
          <div className="inline-flex relative">
            <h1 className="text-6xl md:text-9xl font-bold tracking-tightner text-center inline-flex">
              Quantum Key <br /> Cryptography
            </h1>

            {/* <motion.div
              className="absolute right-[840px] top-[108px] hidden sm:inline"
              drag
              dragSnapToOrigin
            >
              <Image
                src="/assets/images/cursor.png"
                alt="cursor"
                height={200}
                width={200}
                className="max-w-none"
                draggable="false"
              />
            </motion.div>

            <motion.div
              className="absolute left-[840px] top-[56px] hidden sm:inline"
              drag
              dragSnapToOrigin
            >
              <Image
                src="/assets/images/message.png"
                alt="message"
                height={200}
                width={200}
                className="max-w-none"
                draggable="false"
              />
            </motion.div> */}
          </div>
        </div>

        <div className="flex justify-center">
          <p className="text-xl text-center mt-8 max-w-md">
            Send sensitive information safely, without compromise. Our advanced
            encryption keeps your communication private and secure.
          </p>
        </div>

        <div className="flex justify-center mt-8">
          <Link href={"/login"}>
            <button className="bg-white text-black py-3 px-5 rounded-lg font-medium">
              Get for free
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Hero;
