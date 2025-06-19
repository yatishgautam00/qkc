import React from "react";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <div className="bg-black px-4 md:px-10">
      <div className="px-4">
        <div className=" bg-black">
          <div className="py-1 flex items-center justify-between">

            <div className="relative">
              <div className="absolute w-full top-0 bottom-0 "></div>
              {/* Direct path to logo.svg */}
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={180} 
                height={160} 
                className="relative mt-1 bg-black "
                priority
              />
            </div>

            <div className="border border-white border-opacity-30 h-10 w-10 inline-flex justify-center items-center rounded-lg sm:hidden">
              {/* Direct path to menu.svg */}
              <Image 
                src="/assets/icons/menu.svg" 
                alt="Menu Icon" 
                width={24} 
                height={24}
              />
            </div>

            <nav className="text-white gap-6 items-center hidden sm:flex">
              <a href="#" className="text-opacity-60 text-white hover:text-opacity-100 transition">About</a>
              <a href="#" className="text-opacity-60 text-white hover:text-opacity-100 transition">Features</a>
              <a href="#" className="text-opacity-60 text-white hover:text-opacity-100 transition">Updates</a>
              <a href="#" className="text-opacity-60 text-white hover:text-opacity-100 transition">Help</a>
              <a href="#" className="text-opacity-60 text-white hover:text-opacity-100 transition">Customers</a>
              <Link href={"login"}>
              <button className="bg-white py-2 px-4 rounded-lg text-black">Get for free</button>
              
              </Link>
            </nav>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
