'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function RefinedStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll('.word');
      if (!words || words.length === 0) return;

      // Highlight words as they enter the viewport
      gsap.to(words, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 20%',
          scrub: 1,
        },
        color: '#FFFFFF',
        opacity: 1,
        textShadow: '0 0 20px rgba(124, 58, 237, 0.6)',
        stagger: 0.1,
      });

      // Reveal story text slightly after
      gsap.from(storyRef.current, {
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const textToSplit = "We believe the transition from screen to dancefloor should be a ritual of elegance.";
  const words = textToSplit.split(" ");

  return (
    <section ref={sectionRef} className="relative py-48 bg-surface flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="text-secondary-fixed font-headline font-bold uppercase tracking-[0.3em] text-xs md:text-sm block mb-8 md:mb-12">
          The Narrative
        </span>
        
        <h2 ref={textRef} className="text-3xl md:text-5xl lg:text-6xl font-headline font-bold mb-12 md:mb-16 leading-tight">
          {words.map((word, index) => (
            <span 
              key={index} 
              className="word inline-block mr-[0.25em] text-white/15"
            >
              {word}
            </span>
          ))}
        </h2>

        <div ref={storyRef} className="max-w-2xl mx-auto text-on-surface-variant font-body text-lg md:text-xl leading-relaxed">
          <p>
            Trackster was born from the shadows of the city&apos;s most exclusive venues. We saw a gap between the energy of the event and the friction of the interface. Our mission is to dissolve that barrier by blending high-end editorial aesthetics with technical brutalism, providing a concierge experience that respects the curator&apos;s vision and the guest&apos;s anticipation.
          </p>
        </div>
      </div>
    </section>
  );
}
