export default function TrustBar() {
  const logos = [
    "TECHCORP", "SOUNDFLOW", "VIBE-MEDIA", "NEXT-GEN", "URBAN-FEST", "PIXEL-CON"
  ];

  return (
    <section className="py-12 border-y border-slate-800 overflow-hidden">
      <div className="marquee">
        <div className="marquee-content grayscale opacity-50 invert">
          {logos.map((logo, i) => (
            <span key={i} className="text-xl font-black px-12 italic">{logo}</span>
          ))}
        </div>
        <div className="marquee-content grayscale opacity-50 invert">
          {logos.map((logo, i) => (
            <span key={i + logos.length} className="text-xl font-black px-12 italic">{logo}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
