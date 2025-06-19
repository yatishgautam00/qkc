import Bentodemo from './bentogrid';
import { GlowingEffectDemoSecond } from './FeatureContainer';
import { GlowingEffect } from './glowing-effect';

const Features = () => {
  return (
    <div className="bg-black text-white py-[80px] px-4 md:px-20  bg-[linear-gradient(to_bottom,#000,#01254b86)]  sm:py-24 ">
      <div className="">
        <h2 className="text-center font-bold text-5xl sm:text-6xl tracking-tighter">What's new</h2>
        <div className="max-w-xl mx-auto">
          <p className="text-center mt-5 text-xl text-white/70">
          Stay up to date with the latest advancements and features of our secure communication platform.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center sm:flex-row gap-4 mt-32">
        <GlowingEffectDemoSecond />
        </div>
      </div>
    </div>
  );
};

export default Features;
