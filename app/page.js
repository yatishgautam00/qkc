import Image from "next/image";
import Banner from "./_components/Banner";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Features from "./_components/Features";
import { ProductShowcase } from "./_components/ProductShowcase";
import OurMission from "./_components/OurMission";
import { Footer } from "./_components/Footer";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
     
      {/* <Banner /> */}
      <Header />
      <Hero />
      <Features />
      <ProductShowcase />
      {/* <OurMission/> */}
      <Footer/>
    </div>
  );
}
