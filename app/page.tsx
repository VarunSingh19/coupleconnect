'use client';
// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Heart, Lock, UserPlus, Calendar, Gift, MessageSquare, Camera, Map, Music, Star, Moon, ChevronDown } from "lucide-react";

// export default function LandingPage() {
//   const [scrollY, setScrollY] = useState(0);
//   const [mounted, setMounted] = useState(false);
//   const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
//   const [isHeroVisible, setIsHeroVisible] = useState(true);
//   const heroRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     setMounted(true);

//     const handleScroll = () => {
//       setScrollY(window.scrollY);

//       // Check if hero section is visible
//       if (heroRef.current) {
//         const rect = heroRef.current.getBoundingClientRect();
//         setIsHeroVisible(rect.top > -rect.height / 2);
//       }
//     };

//     interface CursorPosition {
//       x: number;
//       y: number;
//     }

//     const handleMouseMove = (e: MouseEvent): void => {
//       setCursorPosition({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener("scroll", handleScroll);
//     window.addEventListener("mousemove", handleMouseMove);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   // Particle/heart effects
//   const ParticleEffect = () => {
//     return (
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(25)].map((_, i) => {
//           const size = Math.random() * 2 + 0.5;
//           const speed = Math.random() * 15 + 20;
//           const initialX = Math.random() * 100;
//           const initialY = Math.random() * 100;
//           const delay = Math.random() * 10;
//           const duration = Math.random() * 10 + 15;
//           const opacity = Math.random() * 0.5 + 0.2;

//           return (
//             <div
//               key={i}
//               className="absolute"
//               style={{
//                 left: `${initialX}%`,
//                 top: `${initialY}%`,
//                 animation: `floatParticle ${duration}s infinite ease-in-out ${delay}s`,
//                 opacity: opacity
//               }}
//             >
//               {Math.random() > 0.7 ? (
//                 <Heart
//                   className="text-rose-300"
//                   style={{
//                     fontSize: `${size}rem`,
//                     filter: "drop-shadow(0 0 5px rgba(244, 114, 182, 0.3))"
//                   }}
//                 />
//               ) : (
//                 <div
//                   className="rounded-full bg-gradient-to-br from-rose-300 to-pink-400"
//                   style={{
//                     width: `${size / 2}rem`,
//                     height: `${size / 2}rem`,
//                     filter: "blur(2px) drop-shadow(0 0 5px rgba(244, 114, 182, 0.3))"
//                   }}
//                 />
//               )}
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   // 3D tilt effect for cards
//   const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
//     const cardRef = useRef<HTMLDivElement | null>(null);
//     const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

//     const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//       if (!cardRef.current) return;

//       const rect = cardRef.current.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;

//       const centerX = rect.width / 2;
//       const centerY = rect.height / 2;

//       const tiltX = (y - centerY) / 10;
//       const tiltY = (centerX - x) / 10;

//       setTiltStyle({
//         transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`,
//         boxShadow: `
//           0 5px 15px rgba(0, 0, 0, 0.1),
//           ${(centerX - x) / 25}px ${(centerY - y) / 25}px 10px rgba(0, 0, 0, 0.05)
//         `
//       });
//     };

//     const handleMouseLeave = () => {
//       setTiltStyle({
//         transform: 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
//         boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
//       });
//     };

//     return (
//       <div
//         ref={cardRef}
//         className={`transition-all duration-200 ${className}`}
//         onMouseMove={handleMouseMove}
//         onMouseLeave={handleMouseLeave}
//         style={tiltStyle}
//       >
//         {children}
//         <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//       </div>
//     );
//   };

//   // Interactive heart cursor follower
//   const CursorEffect = () => {
//     return mounted ? (
//       <div
//         className="fixed pointer-events-none z-50 transition-opacity duration-500"
//         style={{
//           left: `${cursorPosition.x}px`,
//           top: `${cursorPosition.y}px`,
//           transform: 'translate(-50%, -50%)',
//           opacity: isHeroVisible ? 1 : 0
//         }}
//       >
//         <div className="relative">
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-pink-400/20 blur-xl rounded-full w-8 h-8" />
//           <Heart className="h-4 w-4 text-pink-500 animate-pulse" />
//         </div>
//       </div>
//     ) : null;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-pink-100 dark:from-gray-900 dark:via-rose-900/20 dark:to-rose-950 flex flex-col relative overflow-hidden">
//       {/* Background effects */}
//       {mounted && <ParticleEffect />}
//       {mounted && <CursorEffect />}

//       {/* Blurred shapes in background */}
//       <div className="absolute top-20 left-20 w-64 h-64 bg-pink-300/30 dark:bg-pink-700/20 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-20 right-20 w-80 h-80 bg-rose-300/20 dark:bg-rose-600/10 rounded-full blur-3xl"></div>
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl max-h-6xl bg-white/5 dark:bg-white/5 rounded-full blur-3xl opacity-70"></div>

//       <header className="w-full py-5 px-8 flex justify-between items-center z-10 sticky top-0 backdrop-blur-md bg-white/10 dark:bg-black/10 border-b border-white/20 dark:border-gray-800/30">
//         <div className="flex items-center space-x-3">
//           <div className="relative">
//             <Heart className="h-7 w-7 text-rose-500 animate-pulse" />
//             <Heart className="h-5 w-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-rose-600 animate-beat" />
//           </div>
//           <span className="text-2xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-600">CouplesConnect</span>
//         </div>

//         <div className="flex items-center space-x-4">
//           <Button
//             asChild
//             variant="ghost"
//             className="text-gray-800 hover:text-rose-600 dark:text-gray-200 dark:hover:text-rose-400 transition-colors"
//           >
//             <Link href="/about" className="flex items-center space-x-2">
//               <span>About</span>
//             </Link>
//           </Button>

//           <Button
//             asChild
//             variant="ghost"
//             className="text-gray-800 hover:text-rose-600 dark:text-gray-200 dark:hover:text-rose-400 transition-colors"
//           >
//             <Link href="/features" className="flex items-center space-x-2">
//               <span>Features</span>
//             </Link>
//           </Button>

//           <Button
//             asChild
//             className="bg-white/20 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-md border border-rose-200/50 dark:border-rose-800/30 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 shadow-sm hover:shadow-md transition-all"
//           >
//             <Link href="/login" className="flex items-center space-x-2">
//               <Lock className="h-4 w-4" />
//               <span>Login</span>
//             </Link>
//           </Button>
//         </div>
//       </header>

//       <main className="flex-1 flex flex-col items-center justify-start relative z-10">
//         {/* Hero section */}
//         <div
//           ref={heroRef}
//           className="w-full min-h-screen flex items-center justify-center px-4 py-20 relative"
//           style={{
//             transform: `translateY(${scrollY * 0.1}px)`,
//             opacity: Math.max(1 - scrollY * 0.002, 0.2)
//           }}
//         >
//           <div className="max-w-6xl mx-auto flex flex-col items-center">
//             <div className="mb-8 relative">
//               <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-pink-300 dark:from-rose-500 dark:to-pink-400 rounded-full blur-2xl opacity-30 animate-pulse scale-150"></div>
//               <Heart className="h-32 w-32 text-rose-400 dark:text-rose-500 animate-float" />
//               <Heart
//                 className="h-24 w-24 text-rose-500 dark:text-rose-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-beatSlow"
//               />
//               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/40 dark:bg-white/20 rounded-full blur-md animate-pulse"></div>
//             </div>

//             <h1 className="text-7xl font-bold mb-8 font-serif leading-tight text-center">
//               <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-rose-400 to-pink-500 animate-shimmer">
//                 Couples Connect
//               </span>
//             </h1>

//             <p className="text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed text-center font-light">
//               A magical space where your relationship grows stronger every day through shared moments, dreams, and memories.
//             </p>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
//               <Button
//                 asChild
//                 className="h-16 text-lg bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 border-none shadow-lg hover:shadow-xl shadow-rose-500/20 hover:shadow-rose-500/30 transition-all transform hover:-translate-y-1 group overflow-hidden relative"
//               >
//                 <Link href="/create" className="flex items-center justify-center space-x-3 z-10">
//                   <UserPlus className="h-5 w-5 group-hover:animate-wiggle" />
//                   <span>Create Connection</span>
//                   <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
//                 </Link>
//               </Button>

//               <Button
//                 asChild
//                 className="h-16 text-lg bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 border-none shadow-lg hover:shadow-xl shadow-rose-400/20 hover:shadow-rose-400/30 transition-all transform hover:-translate-y-1 group overflow-hidden relative"
//               >
//                 <Link href="/login" className="flex items-center justify-center space-x-3 z-10">
//                   <Lock className="h-5 w-5 group-hover:animate-wiggle" />
//                   <span>Login</span>
//                   <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
//                 </Link>
//               </Button>

//               <Button
//                 asChild
//                 className="h-16 text-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50 shadow-lg hover:shadow-xl shadow-rose-200/10 hover:shadow-rose-200/20 transition-all transform hover:-translate-y-1 group overflow-hidden relative"
//               >
//                 <Link href="/join" className="flex items-center justify-center space-x-3 z-10">
//                   <Heart className="h-5 w-5 group-hover:animate-beatFast" />
//                   <span>Join Partner</span>
//                   <div className="absolute inset-0 bg-rose-100/40 dark:bg-rose-900/40 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
//                 </Link>
//               </Button>
//             </div>

//             <div className="flex justify-center mb-12">
//               <Button
//                 variant="ghost"
//                 className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 animate-bounce"
//                 onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
//               >
//                 <span className="mb-2">Discover More</span>
//                 <ChevronDown className="h-6 w-6" />
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Features section */}
//         <div className="w-full py-20 px-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md">
//           <div className="max-w-6xl mx-auto">
//             <div className="text-center mb-16">
//               <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-pink-600">Beautiful Ways to Connect</h2>
//               <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">Discover all the wonderful features designed to bring you and your partner closer together.</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {[
//                 { icon: Calendar, title: "Shared Calendar", description: "Coordinate your schedules and never miss important dates together" },
//                 { icon: MessageSquare, title: "Private Messaging", description: "Share your thoughts, feelings and moments in a secure space" },
//                 { icon: Gift, title: "Special Moments", description: "Capture and celebrate your relationship milestones and memories" },
//                 { icon: Camera, title: "Photo Albums", description: "Create beautiful collections of your favorite moments together" },
//                 { icon: Map, title: "Places & Memories", description: "Map the special locations that tell your love story" },
//                 { icon: Star, title: "Wish Lists", description: "Share gift ideas and dreams to make each occasion special" },
//                 { icon: Music, title: "Shared Playlists", description: "Build the soundtrack of your relationship together" },
//                 { icon: Moon, title: "Mood Tracker", description: "Understand each other's emotions and needs better" },
//                 { icon: Heart, title: "Love Language", description: "Discover and share how you express and receive love" }
//               ].map((feature, index) => (
//                 <TiltCard
//                   key={index}
//                   className="bg-white dark:bg-gray-800 p-8 rounded-xl group shadow-md hover:shadow-xl transition-all relative overflow-hidden"
//                 >
//                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 to-pink-400"></div>
//                   <div className="mb-6 text-rose-500 flex justify-center">
//                     <feature.icon className="h-12 w-12 group-hover:scale-110 transition-transform" />
//                   </div>
//                   <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200">{feature.title}</h3>
//                   <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
//                 </TiltCard>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Testimonials */}
//         <div className="w-full py-20 px-4 bg-gradient-to-b from-rose-50/50 to-pink-100/50 dark:from-gray-900/50 dark:to-rose-950/50 backdrop-blur-md">
//           <div className="max-w-6xl mx-auto">
//             <div className="text-center mb-16">
//               <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-pink-600">Love Stories</h2>
//               <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">Hear from couples who have strengthened their connection with our app.</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {[
//                 { name: "James & Emma", story: "We've been using Couples Connect for 8 months and it's completely transformed how we organize our busy lives together.", stars: 5 },
//                 { name: "Michael & Sofia", story: "The shared playlists and photo albums help us relive our favorite moments even when we're apart due to work travel.", stars: 5 },
//                 { name: "David & Olivia", story: "As a long-distance couple, this app has been our lifeline. The countdown feature helps us stay excited for our next visit.", stars: 5 }
//               ].map((testimonial, index) => (
//                 <TiltCard
//                   key={index}
//                   className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all group"
//                 >
//                   <div className="flex mb-4">
//                     {[...Array(testimonial.stars)].map((_, i) => (
//                       <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
//                     ))}
//                   </div>
//                   <p className="text-gray-600 dark:text-gray-400 mb-6 italic">"{testimonial.story}"</p>
//                   <p className="text-rose-500 font-medium">{testimonial.name}</p>
//                 </TiltCard>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* CTA section */}
//         <div className="w-full py-20 px-4 bg-gradient-to-r from-rose-400 to-pink-500 dark:from-rose-600 dark:to-pink-700 relative overflow-hidden">
//           <div className="absolute inset-0 bg-pattern opacity-10"></div>
//           <div className="max-w-4xl mx-auto text-center relative z-10">
//             <h2 className="text-4xl font-bold mb-6 text-white">Begin Your Journey Together</h2>
//             <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">Start building a stronger connection with the one you love today. It only takes a moment to create your shared space.</p>

//             <div className="flex flex-col sm:flex-row justify-center gap-6">
//               <Button
//                 asChild
//                 className="h-16 px-10 text-lg bg-white text-rose-600 hover:bg-rose-50 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
//               >
//                 <Link href="/create">Create Connection</Link>
//               </Button>

//               <Button
//                 asChild
//                 variant="outline"
//                 className="h-16 px-10 text-lg border-white text-black hover:bg-white/20 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
//               >
//                 <Link href="/learn-more">Learn More</Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </main>

//       <footer className="py-12 px-8 text-center text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border-t border-rose-100 dark:border-gray-800">
//         <div className="max-w-6xl mx-auto">
//           <div className="flex justify-center mb-8">
//             <div className="relative">
//               <Heart className="h-10 w-10 text-rose-400" />
//               <Heart className="h-8 w-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-rose-500" />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left mb-12">
//             <div>
//               <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">CouplesConnect</h3>
//               <p className="text-sm">A beautiful space for couples to grow their connection every day.</p>
//             </div>

//             <div>
//               <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">Features</h3>
//               <ul className="space-y-2">
//                 <li><Link href="/features" className="hover:text-rose-500 transition-colors">Shared Calendar</Link></li>
//                 <li><Link href="/features" className="hover:text-rose-500 transition-colors">Messaging</Link></li>
//                 <li><Link href="/features" className="hover:text-rose-500 transition-colors">Photo Albums</Link></li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">Company</h3>
//               <ul className="space-y-2">
//                 <li><Link href="/about" className="hover:text-rose-500 transition-colors">About Us</Link></li>
//                 <li><Link href="/contact" className="hover:text-rose-500 transition-colors">Contact</Link></li>
//                 <li><Link href="/careers" className="hover:text-rose-500 transition-colors">Careers</Link></li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">Legal</h3>
//               <ul className="space-y-2">
//                 <li><Link href="/privacy" className="hover:text-rose-500 transition-colors">Privacy Policy</Link></li>
//                 <li><Link href="/terms" className="hover:text-rose-500 transition-colors">Terms of Service</Link></li>
//                 <li><Link href="/cookies" className="hover:text-rose-500 transition-colors">Cookie Policy</Link></li>
//               </ul>
//             </div>
//           </div>

//           <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
//             <p>Made with ❤️ for couples everywhere. © {new Date().getFullYear()} CouplesConnect.</p>
//           </div>
//         </div>
//       </footer>

//       {/* Global animations and styles */}
//       <style jsx global>{`
//         @keyframes floatParticle {
//           0% { transform: translate(0, 0) rotate(0deg); }
//           33% { transform: translate(-50px, -100px) rotate(20deg); }
//           66% { transform: translate(50px, -200px) rotate(-20deg); }
//           100% { transform: translate(0, -300px) rotate(0deg); opacity: 0; }
//         }

//         @keyframes beat {
//           0%, 100% { transform: translate(-50%, -50%) scale(1); }
//           50% { transform: translate(-50%, -50%) scale(1.2); }
//         }

//         @keyframes beatSlow {
//           0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
//           50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
//         }

//         @keyframes beatFast {
//           0%, 100% { transform: scale(1); }
//           50% { transform: scale(1.3); }
//         }

//         @keyframes wiggle {
//           0% { transform: rotate(0); }
//           25% { transform: rotate(-12deg); }
//           75% { transform: rotate(12deg); }
//           100% { transform: rotate(0); }
//         }

//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-20px); }
//         }

//         @keyframes shimmer {
//           0% { background-position: -200% center; }
//           100% { background-position: 200% center; }
//         }

//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }

//         .animate-beat {
//           animation: beat 1.5s infinite ease-in-out;
//         }

//         .animate-beatSlow {
//           animation: beatSlow 3s infinite ease-in-out;
//         }

//         .animate-beatFast {
//           animation: beatFast 0.6s infinite ease-in-out;
//         }

//         .animate-wiggle {
//           animation: wiggle 0.5s ease-in-out;
//         }

//         .animate-shimmer {
//           background-size: 200% auto;
//           animation: shimmer 3s linear infinite;
//         }

//         .bg-pattern {
//           background-image: radial-gradient(circle, #fff 10%, transparent 10%),
//                             radial-gradient(circle, #fff 10%, transparent 10%);
//           background-size: 30px 30px;
//           background-position: 0 0, 15px 15px;
//         }
//       `}</style>
//     </div>
//   );
// }


// "use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Heart,
  UserPlus,
  Calendar,
  Gift,
  Map,
  MessageSquare,
  Camera,
  Music,
  Star,
  ChevronDown,
  Sparkles,
  Trophy,
} from "lucide-react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// Define the missing arrays
const stats = [
  { value: "2M+", label: "Active Users" },
  { value: "500K+", label: "Couples" },
  { value: "98%", label: "Satisfaction" },
  { value: "4.9", label: "App Rating" },
]

const features = [
  {
    title: "Shared Calendar",
    description: "Plan your dates, anniversaries, and daily activities together with our intuitive shared calendar.",
    icon: Calendar,
  },
  {
    title: "Memory Collection",
    description: "Create beautiful photo albums and memory collections to cherish your special moments.",
    icon: Camera,
  },
  {
    title: "Private Messaging",
    description: "Stay connected with secure, private messaging designed exclusively for couples.",
    icon: MessageSquare,
  },
  {
    title: "Date Ideas",
    description: "Discover new and exciting date ideas tailored to your interests and preferences.",
    icon: Gift,
  },
  {
    title: "Location Sharing",
    description: "Share your location with your partner for safety and convenience.",
    icon: Map,
  },
  {
    title: "Milestone Tracking",
    description: "Never miss an important relationship milestone with our tracking feature.",
    icon: Trophy,
  },
]

const testimonials = [
  {
    name: "James & Emma",
    text: "We've been using Couples Connect for 8 months and it's completely transformed how we organize our busy lives together.",
    icon: Heart,
  },
  {
    name: "Michael & Sofia",
    text: "The shared playlists and photo albums help us relive our favorite moments even when we're apart due to work travel.",
    icon: Music,
  },
  {
    name: "David & Olivia",
    text: "As a long-distance couple, this app has been our lifeline. The countdown feature helps us stay excited for our next visit.",
    icon: Calendar,
  },
]

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"],
  })
  const [isHovered, setIsHovered] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Array<React.CSSProperties>>([])
  const [gradientPos, setGradientPos] = useState({ x: 50, y: 50 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeFeature, setActiveFeature] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollDirection, setScrollDirection] = useState("down")
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showParallaxImages, setShowParallaxImages] = useState(true)
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  // Initialize particles client-side only
  useEffect(() => {
    setParticles(
      Array.from({ length: 60 }).map(() => ({
        width: Math.random() * 20 + 5,
        height: Math.random() * 20 + 5,
        left: Math.random() * 100,
        top: Math.random() * 100,
      })),
    )

    setIsVisible(true)
  }, [])

  const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), {
    stiffness: 300,
    damping: 90,
  })

  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const parallaxY3 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  const rotateLeft = useTransform(scrollYProgress, [0, 1], [0, -15])
  const rotateRight = useTransform(scrollYProgress, [0, 1], [0, 15])

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const currentScrollY = containerRef.current.scrollTop
        if (currentScrollY > lastScrollY) {
          setScrollDirection("down")
        } else {
          setScrollDirection("up")
        }
        setLastScrollY(currentScrollY)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [lastScrollY])

  // Magnetic button effect
  const magnetic = {
    whileHover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 300 },
    },
    whileTap: { scale: 0.95 },
  }

  // Enhanced floating animation variants
  const float = {
    initial: { y: 0 },
    animate: {
      y: [-20, 0, -20],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
      },
    },
  }

  // Stagger animation for elements
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  // Cursor effects with enhanced smoothness
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Add slight delay for smoother effect
        const lerp = (start: number, end: number, factor: number) => {
          return start + (end - start) * factor
        }

        const currentX = Number.parseFloat(cursorRef.current.style.left) || e.clientX
        const currentY = Number.parseFloat(cursorRef.current.style.top) || e.clientY

        const newX = lerp(currentX, e.clientX, 0.2)
        const newY = lerp(currentY, e.clientY, 0.2)

        cursorRef.current.style.left = `${newX}px`
        cursorRef.current.style.top = `${newY}px`

        setMousePosition({ x: e.clientX, y: e.clientY })
        setGradientPos({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        })
      }
    }

    // Use requestAnimationFrame for smoother cursor movement
    let animationFrameId: number
    let mouseX = 0,
      mouseY = 0

    const updateCursor = () => {
      if (cursorRef.current) {
        const lerp = (start: number, end: number, factor: number) => {
          return start + (end - start) * factor
        }

        const currentX = Number.parseFloat(cursorRef.current.style.left) || mouseX
        const currentY = Number.parseFloat(cursorRef.current.style.top) || mouseY

        const newX = lerp(currentX, mouseX, 0.15)
        const newY = lerp(currentY, mouseY, 0.15)

        cursorRef.current.style.left = `${newX}px`
        cursorRef.current.style.top = `${newY}px`

        animationFrameId = requestAnimationFrame(updateCursor)
      }
    }

    const trackMouse = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      setMousePosition({ x: e.clientX, y: e.clientY })
      setGradientPos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", trackMouse)
    animationFrameId = requestAnimationFrame(updateCursor)

    return () => {
      window.removeEventListener("mousemove", trackMouse)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  // Dynamic background gradient
  const gradientStyle = {
    background: `radial-gradient(at ${gradientPos.x}% ${gradientPos.y}%, 
      rgba(255, 228, 230, 0.4) 0%, 
      rgba(255, 228, 230, 0) 50%)`,
  }

  // Parallax effect
  const parallaxEffect = (depth = 1) => {
    return {
      x: ((mousePosition.x - window.innerWidth / 2) / 50) * depth,
      y: ((mousePosition.y - window.innerHeight / 2) / 50) * depth,
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          className="min-h-screen overflow-y-auto overflow-x-hidden relative bg-white dark:bg-gray-950 w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Enhanced animated cursor */}
          <motion.div
            ref={cursorRef}
            className="fixed w-14 h-14 border-2 border-rose-400 rounded-full pointer-events-none z-50 mix-blend-difference"
            animate={{
              scale: isHovered ? 1 : 0.6,
              opacity: isHovered ? 1 : 0.7,
              background: isHovered ? "rgba(251, 113, 133, 0.2)" : "transparent",
            }}
            transition={{ type: "spring", mass: 0.1 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-rose-500"
              animate={{
                scale: isHovered ? 0.4 : 0,
                opacity: isHovered ? 0.4 : 0,
              }}
              transition={{ type: "spring", delay: 0.1 }}
            />
            {/* Trail effect */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-rose-300"
                animate={{
                  scale: [1, 1.5, 2],
                  opacity: [0.6, 0.2, 0],
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 0,
                }}
              />
            ))}
          </motion.div>

          {/* Enhanced background elements */}
          <div className="fixed inset-0 overflow-hidden">
            {/* Advanced gradient background with subtle animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-rose-50 to-white dark:from-gray-900 dark:to-gray-950"
              animate={{
                background: [
                  "linear-gradient(to right bottom, rgba(255,228,230,0.2), rgba(255,255,255,1), rgba(252,231,243,0.1))",
                  "linear-gradient(to right bottom, rgba(254,205,211,0.2), rgba(255,255,255,1), rgba(249,168,212,0.1))",
                  "linear-gradient(to right bottom, rgba(253,164,175,0.1), rgba(255,255,255,1), rgba(244,114,182,0.1))",
                ],
              }}
              transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />

            {/* Premium fluid orbs with glow effect */}
            <div className="absolute inset-0">
              {[...Array(7)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-gradient-to-br from-rose-300/20 to-pink-300/20 blur-3xl"
                  style={{
                    width: `${Math.random() * 300 + 200}px`,
                    height: `${Math.random() * 300 + 200}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    filter: "blur(60px)",
                  }}
                  animate={{
                    x: [0, Math.random() * 100 - 50],
                    y: [0, Math.random() * 100 - 50],
                    scale: [1, Math.random() * 0.2 + 1, 1],
                  }}
                  transition={{
                    duration: Math.random() * 20 + 20,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Subtle grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px] dark:bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)]" />
          </div>

          {/* Main content */}
          <div className="relative z-10 w-full">
            {/* Enhanced Hero Section */}
            <section className="h-screen flex items-center justify-center relative w-full overflow-hidden">
              <motion.div style={{ opacity, scale }} className="absolute inset-0">
                <div className="absolute inset-0 transition-opacity duration-1000" style={gradientStyle} />
              </motion.div>

              <div className="text-center space-y-8 relative z-10 w-full max-w-5xl mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, type: "spring" }}
                >
                  <motion.div variants={float} initial="initial" animate="animate" className="flex justify-center mb-8">
                    <div className="relative w-32 h-32">
                      {/* Premium glowing heart effect */}
                      <motion.div
                        className="absolute inset-0 bg-rose-500/20 blur-3xl rounded-full"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />

                      {/* 3D rotating heart with glow */}
                      <motion.div
                        animate={{
                          rotateY: [0, 180, 360],
                        }}
                        transition={{
                          duration: 10,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          perspective: "500px",
                          transformStyle: "preserve-3d",
                        }}
                        className="relative"
                      >
                        <Heart className="w-full h-full text-rose-500 absolute inset-0 drop-shadow-[0_0_15px_rgba(244,63,94,0.7)]" />
                      </motion.div>

                      {/* Enhanced sparkles around heart */}
                      {[...Array(12)].map((_, i) => {
                        const angle = (i / 12) * Math.PI * 2
                        const radius = i % 2 === 0 ? 80 : 65
                        const x = Math.cos(angle) * radius
                        const y = Math.sin(angle) * radius

                        return (
                          <motion.div
                            key={i}
                            className="absolute w-3 h-3"
                            style={{ left: "50%", top: "50%", x, y }}
                            animate={{
                              scale: [0, 1, 0],
                              opacity: [0, 1, 0],
                              filter: "blur(0.5px)",
                            }}
                            transition={{
                              duration: 2,
                              delay: i * 0.15,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatDelay: 1,
                            }}
                          >
                            <Sparkles className="w-full h-full text-rose-400 drop-shadow-[0_0_8px_rgba(251,113,133,0.8)]" />
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>

                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
                    <motion.div className="overflow-hidden">
                      <motion.span
                        className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-500"
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        Couples
                      </motion.span>
                    </motion.div>
                    <motion.div className="overflow-hidden">
                      <motion.span
                        className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-500"
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                      >
                        Connect
                      </motion.span>
                    </motion.div>
                  </h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-6"
                  >
                    Where love stories evolve through shared moments and meaningful connections
                  </motion.p>
                </motion.div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-6 justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.div {...magnetic}>
                    <Button
                      asChild
                      className="h-16 px-12 text-lg bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-xl hover:shadow-2xl relative overflow-hidden group"
                    >
                      <Link href="/create" className="flex items-center gap-2">
                        <span className="relative z-10 flex items-center gap-2">
                          <UserPlus className="h-5 w-5" />
                          Start Your Journey
                        </span>
                        {/* Enhanced button animation with ripple effect */}
                        <motion.div
                          className="absolute inset-0 bg-white dark:bg-black opacity-0 group-hover:opacity-20"
                          initial={{ scale: 0, x: "-50%", y: "-50%" }}
                          whileHover={{ scale: 3 }}
                          transition={{ duration: 0.7 }}
                          style={{ borderRadius: "100%", left: "50%", top: "50%" }}
                        />
                      </Link>
                    </Button>
                  </motion.div>

                  <motion.div {...magnetic}>
                    <Button
                      asChild
                      variant="outline"
                      className="h-16 px-12 text-lg border-rose-200 dark:border-rose-800 hover:bg-rose-50 dark:hover:bg-rose-900/20 shadow-lg hover:shadow-xl"
                    >
                      <Link href="/demo" className="flex items-center gap-2">
                        <span className="relative z-10 flex items-center gap-2">
                          <Star className="h-5 w-5" />
                          Watch Demo
                        </span>
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                >
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ChevronDown className="w-8 h-8 text-rose-500" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Enhanced floating particles with glow effects - client-side only */}
              <div className="absolute inset-0 pointer-events-none">
                {particles.map((style, i) => (
                  <motion.div
                    key={i}
                    className="absolute bg-rose-400/20 rounded-full blur-[1px]"
                    style={style}
                    animate={{
                      y: [0, -100],
                      opacity: [0.8, 0],
                      scale: [1, 0.5],
                      filter: "blur(2px)",
                      boxShadow: "0 0 8px rgba(244, 63, 94, 0.3)",
                    }}
                    transition={{
                      duration: Math.random() * 4 + 6,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                      delay: Math.random() * 5,
                    }}
                  />
                ))}
              </div>

              {/* 3D Parallax image collage */}
              {showParallaxImages && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <motion.div
                    className="absolute w-32 h-48 rounded-xl overflow-hidden shadow-2xl border-4 border-white"
                    style={{
                      top: "30%",
                      left: "10%",
                      rotate: "-15deg",
                      opacity: 0.8,
                      ...parallaxEffect(0.5),
                    }}
                  >
                    <Image
                      src="https://pa1.aminoapps.com/6796/7a45adf0e6a519989a4c2f66abe9cc722843dccb_hq.gif"
                      alt="Couple photo"
                      width={320}
                      height={480}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  <motion.div
                    className="absolute w-40 h-32 rounded-xl overflow-hidden shadow-2xl border-4 border-white"
                    style={{
                      top: "20%",
                      right: "15%",
                      rotate: "10deg",
                      opacity: 0.9,
                      ...parallaxEffect(0.8),
                    }}
                  >
                    <Image
                      src="https://i.pinimg.com/originals/66/c5/a0/66c5a0d8405bea5d9bd99f406d844094.gif"
                      alt="Couple photo"
                      width={640}
                      height={480}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  <motion.div
                    className="absolute w-36 h-36 rounded-xl overflow-hidden shadow-2xl border-4 border-white"
                    style={{
                      bottom: "15%",
                      left: "20%",
                      rotate: "5deg",
                      opacity: 0.85,
                      ...parallaxEffect(0.6),
                    }}
                  >
                    <Image
                      src="https://gifdb.com/images/high/ghibli-the-wind-rises-couple-eexwgfbzwlmmyqur.gif"
                      alt="Couple photo"
                      width={640}
                      height={640}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
              )}
            </section>

            {/* Stats Section */}
            <section className="py-16 relative overflow-hidden">
              <motion.div
                className="max-w-7xl mx-auto px-4"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <motion.div
                        className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-500"
                        initial={{ scale: 0.9 }}
                        whileInView={{ scale: [0.9, 1.1, 1] }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-gray-600 dark:text-gray-300 mt-2">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Enhanced Features Grid with Parallax */}
            <section className="py-32 px-4 relative w-full overflow-hidden">
              <motion.div style={{ y: parallaxY1 }} className="max-w-7xl mx-auto w-full">
                <motion.h2
                  className="text-5xl md:text-6xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-pink-400"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  Experience Love, Elevated
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  {features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                      className={cn(
                        "p-8 rounded-2xl bg-white/80 dark:bg-gray-900/80 shadow-2xl hover:shadow-[0_20px_50px_rgba(251,113,133,0.25)]",
                        "border border-rose-100/20 backdrop-blur-xl transition-all duration-500",
                        "relative overflow-hidden group",
                      )}
                      onMouseEnter={() => setActiveFeature(i)}
                    >
                      {/* Enhanced background effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100" />

                      {/* Animated icon container with 3D effect */}
                      <motion.div
                        className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mb-6 relative overflow-hidden"
                        whileHover={{
                          rotateY: 180,
                          boxShadow: "0 10px 30px -10px rgba(251, 113, 133, 0.5)",
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-rose-200/50 dark:to-rose-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <feature.icon className="w-8 h-8 text-rose-500" />
                      </motion.div>

                      <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>

                      {/* Premium corner decoration */}
                      <motion.div
                        className="absolute bottom-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0, rotate: 45 }}
                        whileHover={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="w-full h-full bg-gradient-to-br from-transparent to-rose-200/30 dark:to-rose-800/30" />
                      </motion.div>

                      {/* Sparkle effect on hover */}
                      <motion.div
                        className="absolute top-4 right-4 text-rose-300 dark:text-rose-700 opacity-0 group-hover:opacity-100"
                        animate={{
                          scale: [0.8, 1.2, 0.8],
                          rotate: [0, 5, -5, 0],
                          filter: "blur(0px)",
                        }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 0.5,
                        }}
                      >
                        <Sparkles className="w-8 h-8" />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Testimonials Section */}
            <section className="py-32 px-4 relative w-full overflow-hidden">
              <motion.div style={{ y: parallaxY2 }} className="max-w-7xl mx-auto w-full">
                <motion.h2
                  className="text-5xl md:text-6xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-pink-400"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  What Couples Are Saying
                </motion.h2>

                <div className="flex flex-col md:flex-row gap-8 w-full">
                  {testimonials.map((testimonial, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                      className={cn(
                        "p-8 rounded-2xl bg-white/80 dark:bg-gray-900/80 shadow-2xl hover:shadow-[0_20px_50px_rgba(251,113,133,0.25)]",
                        "border border-rose-100/20 backdrop-blur-xl transition-all duration-500",
                        "relative overflow-hidden group",
                      )}
                    >
                      {/* Enhanced background effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100" />

                      <motion.div
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center mb-6 relative overflow-hidden"
                        whileHover={{
                          rotateY: 180,
                          boxShadow: "0 10px 30px -10px rgba(251, 113, 133, 0.5)",
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-pink-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <testimonial.icon className="w-8 h-8 text-pink-500" />
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-4">{testimonial.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{testimonial.text}</p>

                      {/* Premium corner decoration */}
                      <motion.div
                        className="absolute bottom-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0, rotate: 45 }}
                        whileHover={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="w-full h-full bg-gradient-to-br from-transparent to-pink-200/30" />
                      </motion.div>
                      {/* Sparkle effect on hover */}
                      <motion.div
                        className="absolute top-4 right-4 text-pink-300 opacity-0 group-hover:opacity-100"
                        animate={{
                          scale: [0.8, 1.2, 0.8],
                          rotate: [0, 5, -5, 0],
                          filter: "blur(0px)",
                        }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 0.5,
                        }}
                      >
                        <Sparkles className="w-8 h-8" />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ChevronDown className="w-8 h-8 text-pink-500" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

