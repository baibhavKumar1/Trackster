'use client';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function RefinedHero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"] // Adjust offsets as needed for desired effect
  });

  // Parallax for background image: moves slower than foreground
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]); // Adjust values for speed

  // Parallax for foreground content: moves slightly with scroll
  const foregroundY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-32 px-10 overflow-hidden"
    >
      {/* Background Layer with Parallax */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>


      {/* Foreground Content */}
      <motion.div
        style={{ y: foregroundY }}
        className="relative z-10 max-w-6xl text-center space-y-12"
      >
        <h1 className="text-[clamp(3.5rem,10vw,7.5rem)] font-headline font-black leading-[0.9] tracking-tighter uppercase">
          Your Next Event, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-primary to-on-primary-container">Unforgettable</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl md:text-2xl font-body font-light text-on-surface-variant leading-relaxed">
          Elevating the night through seamless digital editorial and premier ticketing architecture.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
          <Link href="/discover" className="px-12 py-6 rounded-full bg-secondary-fixed text-on-secondary-fixed font-headline font-bold text-lg uppercase tracking-widest hover:scale-105 transition-transform duration-300">
            Explore Events
          </Link>
          <Link href="/about" className="px-12 py-6 rounded-full border border-outline-variant/30 text-on-surface font-headline font-bold text-lg uppercase tracking-widest hover:bg-surface-container-high transition-colors duration-300">
            Our Vision
          </Link>
        </div>
      </motion.div>
    </motion.section>
  )
}
