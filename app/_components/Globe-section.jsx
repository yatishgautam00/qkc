// "use client";
// import React from "react";
// import { motion } from "motion/react";
// import dynamic from "next/dynamic";

// const World = dynamic(() => import("./globe").then((m) => m.World), {
//   ssr: false,
// });

// export function GlobeDemo() {
//   const globeConfig = {
//     pointSize: 4,
//     globeColor: "#062056",
//     showAtmosphere: true,
//     atmosphereColor: "#FFFFFF",
//     atmosphereAltitude: 0.1,
//     emissive: "#062056",
//     emissiveIntensity: 0.1,
//     shininess: 0.9,
//     polygonColor: "rgba(255,255,255,0.7)",
//     ambientLight: "#38bdf8",
//     directionalLeftLight: "#ffffff",
//     directionalTopLight: "#ffffff",
//     pointLight: "#ffffff",
//     arcTime: 1000,
//     arcLength: 0.9,
//     rings: 1,
//     maxRings: 3,
//     initialPosition: { lat: 22.3193, lng: 114.1694 },
//     autoRotate: true,
//     autoRotateSpeed: 0.5,
//   };
//   const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
//   const sampleArcs = [
//     {
//       order: 1,
//       startLat: -19.885592,
//       startLng: -43.951191,
//       endLat: -22.9068,
//       endLng: -43.1729,
//       arcAlt: 0.1,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 1,
//       startLat: 28.6139,
//       startLng: 77.209,
//       endLat: 3.139,
//       endLng: 101.6869,
//       arcAlt: 0.2,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 1,
//       startLat: -19.885592,
//       startLng: -43.951191,
//       endLat: -1.303396,
//       endLng: 36.852443,
//       arcAlt: 0.5,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 2,
//       startLat: 1.3521,
//       startLng: 103.8198,
//       endLat: 35.6762,
//       endLng: 139.6503,
//       arcAlt: 0.2,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 2,
//       startLat: 51.5072,
//       startLng: -0.1276,
//       endLat: 3.139,
//       endLng: 101.6869,
//       arcAlt: 0.3,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 2,
//       startLat: -15.785493,
//       startLng: -47.909029,
//       endLat: 36.162809,
//       endLng: -115.119411,
//       arcAlt: 0.3,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 3,
//       startLat: -33.8688,
//       startLng: 151.2093,
//       endLat: 22.3193,
//       endLng: 114.1694,
//       arcAlt: 0.3,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 3,
//       startLat: 21.3099,
//       startLng: -157.8581,
//       endLat: 40.7128,
//       endLng: -74.006,
//       arcAlt: 0.3,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 3,
//       startLat: -6.2088,
//       startLng: 106.8456,
//       endLat: 51.5072,
//       endLng: -0.1276,
//       arcAlt: 0.3,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 4,
//       startLat: 11.986597,
//       startLng: 8.571831,
//       endLat: -15.595412,
//       endLng: -56.05918,
//       arcAlt: 0.5,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 4,
//       startLat: -34.6037,
//       startLng: -58.3816,
//       endLat: 22.3193,
//       endLng: 114.1694,
//       arcAlt: 0.7,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 4,
//       startLat: 51.5072,
//       startLng: -0.1276,
//       endLat: 48.8566,
//       endLng: -2.3522,
//       arcAlt: 0.1,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 5,
//       startLat: 14.5995,
//       startLng: 120.9842,
//       endLat: 51.5072,
//       endLng: -0.1276,
//       arcAlt: 0.3,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 5,
//       startLat: 1.3521,
//       startLng: 103.8198,
//       endLat: -33.8688,
//       endLng: 151.2093,
//       arcAlt: 0.2,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 5,
//       startLat: 34.0522,
//       startLng: -118.2437,
//       endLat: 48.8566,
//       endLng: -2.3522,
//       arcAlt: 0.2,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 6,
//       startLat: -15.432563,
//       startLng: 28.315853,
//       endLat: 1.094136,
//       endLng: -63.34546,
//       arcAlt: 0.7,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 6,
//       startLat: 37.5665,
//       startLng: 126.978,
//       endLat: 35.6762,
//       endLng: 139.6503,
//       arcAlt: 0.1,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 6,
//       startLat: 22.3193,
//       startLng: 114.1694,
//       endLat: 51.5072,
//       endLng: -0.1276,
//       arcAlt: 0.3,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 7,
//       startLat: -19.885592,
//       startLng: -43.951191,
//       endLat: -15.595412,
//       endLng: -56.05918,
//       arcAlt: 0.1,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 7,
//       startLat: 48.8566,
//       startLng: -2.3522,
//       endLat: 52.52,
//       endLng: 13.405,
//       arcAlt: 0.1,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 7,
//       startLat: 52.52,
//       startLng: 13.405,
//       endLat: 34.0522,
//       endLng: -118.2437,
//       arcAlt: 0.2,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 8,
//       startLat: -8.833221,
//       startLng: 13.264837,
//       endLat: -33.936138,
//       endLng: 18.436529,
//       arcAlt: 0.2,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 8,
//       startLat: 49.2827,
//       startLng: -123.1207,
//       endLat: 52.3676,
//       endLng: 4.9041,
//       arcAlt: 0.2,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 8,
//       startLat: 1.3521,
//       startLng: 103.8198,
//       endLat: 40.7128,
//       endLng: -74.006,
//       arcAlt: 0.5,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 9,
//       startLat: 51.5072,
//       startLng: -0.1276,
//       endLat: 34.0522,
//       endLng: -118.2437,
//       arcAlt: 0.2,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 9,
//       startLat: 22.3193,
//       startLng: 114.1694,
//       endLat: -22.9068,
//       endLng: -43.1729,
//       arcAlt: 0.7,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 9,
//       startLat: 1.3521,
//       startLng: 103.8198,
//       endLat: -34.6037,
//       endLng: -58.3816,
//       arcAlt: 0.5,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 10,
//       startLat: -22.9068,
//       startLng: -43.1729,
//       endLat: 28.6139,
//       endLng: 77.209,
//       arcAlt: 0.7,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 10,
//       startLat: 34.0522,
//       startLng: -118.2437,
//       endLat: 31.2304,
//       endLng: 121.4737,
//       arcAlt: 0.3,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 10,
//       startLat: -6.2088,
//       startLng: 106.8456,
//       endLat: 52.3676,
//       endLng: 4.9041,
//       arcAlt: 0.3,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 11,
//       startLat: 41.9028,
//       startLng: 12.4964,
//       endLat: 34.0522,
//       endLng: -118.2437,
//       arcAlt: 0.2,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 11,
//       startLat: -6.2088,
//       startLng: 106.8456,
//       endLat: 31.2304,
//       endLng: 121.4737,
//       arcAlt: 0.2,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 11,
//       startLat: 22.3193,
//       startLng: 114.1694,
//       endLat: 1.3521,
//       endLng: 103.8198,
//       arcAlt: 0.2,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 12,
//       startLat: 34.0522,
//       startLng: -118.2437,
//       endLat: 37.7749,
//       endLng: -122.4194,
//       arcAlt: 0.1,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 12,
//       startLat: 35.6762,
//       startLng: 139.6503,
//       endLat: 22.3193,
//       endLng: 114.1694,
//       arcAlt: 0.2,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 12,
//       startLat: 22.3193,
//       startLng: 114.1694,
//       endLat: 34.0522,
//       endLng: -118.2437,
//       arcAlt: 0.3,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 13,
//       startLat: 52.52,
//       startLng: 13.405,
//       endLat: 22.3193,
//       endLng: 114.1694,
//       arcAlt: 0.3,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 13,
//       startLat: 11.986597,
//       startLng: 8.571831,
//       endLat: 35.6762,
//       endLng: 139.6503,
//       arcAlt: 0.3,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 13,
//       startLat: -22.9068,
//       startLng: -43.1729,
//       endLat: -34.6037,
//       endLng: -58.3816,
//       arcAlt: 0.1,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//     {
//       order: 14,
//       startLat: -33.936138,
//       startLng: 18.436529,
//       endLat: 21.395643,
//       endLng: 39.883798,
//       arcAlt: 0.3,
//       color: colors[Math.floor(Math.random() * (colors.length - 1))],
//     },
//   ];

//   return (
//     <div className="flex flex-row items-center justify-center py-16 h-screen md:h-auto relative w-full">
//       <div className="w-full relative overflow-hidden h-full md:h-[40rem] px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//           className="div"
//         >
//           <h2 className="text-center text-xl md:text-4xl font-bold text-black dark:text-white">
//             Why Choose Us?
//           </h2>
//           <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">
//             When it comes to secure communication, every detail matters. Here’s
//             why our platform stands out.
//           </p>
//         </motion.div>

//         <div className="absolute w-full bottom-0   inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-black to-white z-40" />

//         <div className="absolute w-full -bottom-20 h-72 md:h-full z-10">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             {/* Left Side - Features */}
//             <div className="flex flex-col gap-6 mt-6 col-span-2 pl-40 pt-5 pb-20 justify-center p-6 rounded-2xl ">
//               <div className="flex items-end gap-4 z-0  ">
//                 <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md">
//                   🔒
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-lg text-black dark:text-white">
//                     Unbreakable Security
//                   </h3>
//                   <p className="text-neutral-400 dark:text-neutral-300 text-sm">
//                     Military-grade encryption to protect your communications
//                     over any network.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-4">
//                 <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-md">
//                   ⚡
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-lg text-black dark:text-white">
//                     Lightning Fast
//                   </h3>
//                   <p className="text-neutral-600 dark:text-neutral-300 text-sm">
//                     Real-time, instant communication without sacrificing
//                     security.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-4">
//                 <div className="p-2 bg-gradient-to-br from-green-500 to-teal-500 rounded-md">
//                   🎯
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-lg text-black dark:text-white">
//                     User-Centric Design
//                   </h3>
//                   <p className="text-neutral-600 dark:text-neutral-300 text-sm">
//                     Clean, intuitive, and accessible design for all users.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-4">
//                 <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-md">
//                   🌐
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-lg text-black dark:text-white">
//                     Cross-Platform Access
//                   </h3>
//                   <p className="text-neutral-600 dark:text-neutral-300 text-sm">
//                     Secure messaging anytime, anywhere — mobile, tablet, and
//                     desktop.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-4">
//                 <div className="p-2 bg-gradient-to-br from-pink-500 to-red-500 rounded-md">
//                   🛡️
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-lg text-black dark:text-white">
//                     Verified Identity
//                   </h3>
//                   <p className="text-neutral-600 dark:text-neutral-300 text-sm">
//                     Robust manual and AI identity verification for trusted
//                     communication.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-4">
//                 <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-md">
//                   🧬
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-lg text-black dark:text-white">
//                     Future-Ready Tech
//                   </h3>
//                   <p className="text-neutral-600 dark:text-neutral-300 text-sm">
//                     Quantum-resistant encryption algorithms built for the
//                     future.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Right Side - Globe */}
//             <div className="w-full h-[500px] col-span-2 flex items-center justify-center">
//               <World data={sampleArcs} globeConfig={globeConfig} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
