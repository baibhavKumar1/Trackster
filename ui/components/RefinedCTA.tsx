export default function RefinedCTA() {
  return (
    <section className="py-48 px-10 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-primary/10 via-background to-secondary-fixed/5 blur-[120px]"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-6xl md:text-8xl font-headline font-black tracking-tighter uppercase mb-12">
          Ready to host something <span className="text-secondary-fixed">great?</span>
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <button className="px-16 py-8 rounded-full bg-gradient-to-r from-primary to-inverse-primary text-on-primary font-headline font-bold text-xl uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-primary/40">
            Get Started
          </button>
          <button className="px-16 py-8 rounded-full border border-outline-variant/50 text-on-surface font-headline font-bold text-xl uppercase tracking-widest hover:bg-surface-container transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  )
}
