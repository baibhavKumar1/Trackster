'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function RefinedBento() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // Header animation
      gsap.from(sectionRef.current.querySelector('.bento-header'), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%', // Starts later to prevent overlap in perception
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Cards stagger animation
      gsap.from(sectionRef.current.querySelectorAll('.bento-card'), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-surface-container-low">
      <div className="bento-header px-10 mb-20 flex flex-col md:flex-row justify-between items-start md:items-end max-w-[1440px] mx-auto gap-8 md:gap-0">
        <div>
          <span className="text-primary font-headline font-bold uppercase tracking-[0.3em] text-sm block mb-4">Pulse Check</span>
          <h2 className="text-4xl md:text-5xl font-headline font-black tracking-tighter uppercase">Happening Near You</h2>
        </div>
        <div className="flex gap-4">
          <button className="w-14 h-14 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-all">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button className="w-14 h-14 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-all">
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
      
      <div className="flex overflow-x-auto no-scrollbar justify-end gap-8 px-10 pb-10">
        {/* Large Card */}
        <div className="bento-card flex-shrink-0 w-[450px] md:w-[600px] aspect-[4/5] bg-surface-container rounded-lg overflow-hidden group relative">
          <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Crowded colorful techno nightclub with neon lights" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC952yHVDFRVXpdnJ8wjRCErHifryBPbqlOrOmHlDg3WkGmPwUK5FmYcWOBLzQZF6O6ri7gV40ZvkaITNW-crqAVlTyeHpUZX8mewXbgJUFDK-eot6CyB9YxzNSv3u-XfiIrqvb9ftnZwlNsq6fNj7ktq9dS3Vj3RT9blrenND1aihqDRCNuU2ijTFijQPBrtPLdak42MF2Fan2AEEoDJFMUj3ZXpK6OpIPMaWloqHZNuFuabO1QJ07qtlmloKtC1X-uopk7h4HpWE" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-12 w-full">
            <span className="px-4 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-headline font-bold text-xs uppercase mb-6 inline-block">Featured Music</span>
            <h3 className="text-4xl font-headline font-bold text-white mb-4">Electric Cathedral: Midnight Mass</h3>
            <p className="text-zinc-400 font-body">Warehouse District • 11:00 PM</p>
          </div>
        </div>

        {/* Bento Stack */}
        <div className="flex flex-col gap-8 flex-shrink-0">
          <div className="bento-card w-[400px] h-[350px] bg-primary-container rounded-lg p-10 flex flex-col justify-between">
            <span className="material-symbols-outlined text-4xl text-white" data-icon="rocket_launch">rocket_launch</span>
            <div>
              <h3 className="text-3xl font-headline font-bold text-white leading-none mb-2">Tech Summit 2024</h3>
              <p className="text-primary-fixed/70">The future of generative art and night culture.</p>
            </div>
          </div>
          <div className="bento-card w-[400px] h-[350px] bg-surface-container-high rounded-lg overflow-hidden relative group">
            <img className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" alt="Atmospheric light show at a concert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUahND6PshuT6OXstAddzjWEcee2O5U4Wv1PRh07C0slh2tvXKSmLsUirTPGWxbmTrEA1r7aTmw5YnMHdg0g-Y2qS9XdO4Y7MI7mIfaVgKlMHxW5rYLnDXpjuaxXD3q6j1YFmEdU-xv1TYRkrSEKiVK6d9Ms84LY_E1uXLYIWzDBL0Jc0A1Zeyk85vjQSEtXx2Ced7PUZH5Sbsrxx9PK6ZUQ_84GSInEoMhMwtMO-iOlR3YVvaFdf8oz41c1Hfa1kKWzDAtpna8Q4" />
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <h3 className="text-2xl font-headline font-bold text-white uppercase tracking-tight">Vanguard Gallery Open</h3>
            </div>
          </div>
        </div>

        {/* Another Large Card */}
        <div className="bento-card flex-shrink-0 w-[450px] md:w-[600px] aspect-[4/5] bg-surface-container-highest rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 p-12 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-7xl font-headline font-black text-secondary-fixed/20 italic">03</span>
              <span className="px-4 py-1 rounded-full border border-secondary-fixed text-secondary-fixed font-headline font-bold text-xs uppercase">Secret Event</span>
            </div>
            <div>
              <h3 className="text-5xl font-headline font-black text-white leading-none mb-6">THE UNDERGROUND SESSIONS</h3>
              <p className="text-on-surface-variant max-w-sm mb-8">Access granted only to Tier-3 members. Location revealed 2 hours prior to start.</p>
              <button className="text-secondary-fixed font-headline font-bold uppercase tracking-widest text-sm hover:underline">Request Invite</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
