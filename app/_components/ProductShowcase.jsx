"use client";

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from "react";

export const ProductShowcase = () => {
  const appImage = useRef(null);
  const { scrollYProgress } = useScroll({
    target: appImage,
    offset: ["start end", "end end"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <div className="bg-black text-white bg-gradient-to-b bg-gradient-to-b from-[#01254b86] via-[#00112286] to-[#01254b86]
 py-[72px] sm:py-24">
      <div className="px-20 py-10">
        <h2 className="text-center text-5xl font-bold tracking-tighter">User
           Interface</h2>
        <div className='max-w-xl mx-auto'>
          <p className="text-xl text-white/70 text-center mt-5">Navigate with ease. Our platform offers a clean, intuitive interface designed to make secure communication effortless.</p>
        </div>
        <div className="flex justify-center">
          <motion.div
            style={{
              opacity: opacity,
              rotateX: rotateX,
              transformPerspective: "800px",
            }}
          >
            <img src="/assets/images/product.avif" alt="app screen" className="mt-14" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
