export default function FinalCTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto rounded-3xl p-12 md:p-20 text-center bg-gradient-to-br from-primary to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/10"></div>
        <div className="relative z-10 text-white">
          <h2 className="text-5xl font-black mb-8">Ready to host something great?</h2>
          <p className="text-xl mb-12 text-white/80 max-w-2xl mx-auto">
            Join over 10,000 organizers who trust Trackster for their most important moments.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button className="px-10 py-5 bg-white text-primary rounded-2xl font-black text-lg hover:shadow-2xl transition-all">
              Create Your Event Now
            </button>
            <button className="px-10 py-5 bg-transparent border-2 border-white/30 rounded-2xl font-black text-lg hover:bg-white/10 transition-all">
              Talk to an Expert
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
