"use client";;
import { Box, CrossIcon, Lock, MessageCircle, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "./glowing-effect";

export function GlowingEffectDemoSecond() {
  return (
    <ul
      className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<MessageCircle className="h-4 w-4 text-blue-300" />}
        title="Faster Message Delivery"
        description="Experience lightning-fast delivery of your encrypted messages, with no compromise on security.

" />
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Settings className="h-4 w-4 text-blue-300 " />}
        title="Real-Time Notifications"
        description="Get instant alerts when new messages arrive, without compromising the security of your communication.

" />
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Lock className="h-4 w-4 text-blue-300" />}
        title="Enhanced Encryption"
        description="Our newest encryption protocols provide even more robust protection for your messages, ensuring maximum security." />
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Sparkles className="h-4 w-4 text-blue-300" />}
        title="User Interface Upgrade"
        description="Enjoy a cleaner, more intuitive design for a seamless user experience." />
      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<CrossIcon className="h-4 w-4 text-blue-300" />}
        title="Cross-Platform Support:"
        description="Send and receive messages securely across all devices, including desktop, mobile, and tablet." />
    </ul>
  );
}

const GridItem = ({
  area,
  icon,
  title,
  description
}) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01} />
        <div
          className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3
                className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <h2
                className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
