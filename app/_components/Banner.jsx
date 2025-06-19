import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

function Banner() {
  return (
    <div className="relative top-0 bg-black py-3 text-white md:py-0 border-b border-white/20">
      <div className=" flex flex-col items-center justify-center gap-4 md:h-12 md:flex-row">
        <Link
          href="https://github.com/karthikmudunuri/eldoraui"
          target="_blank"
          className="group inline-flex items-center justify-center text-center text-sm leading-loose"

        >
          ✨
          <span className="font-bold">
            {" "}
            ⭐ Explore Secured Communication With Us
          </span>{" "}
          <ChevronRight className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

export default Banner;
