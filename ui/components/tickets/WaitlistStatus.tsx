import React from 'react';

export default function WaitlistStatus() {
  return (
    <div className="bg-background text-on-surface font-body min-h-screen p-6 md:p-24 space-y-24">
      {/* STATE 2: WAITLIST CONFIRMATION */}
      <section className="flex justify-center items-center py-12">
        <div className="bg-surface-container rounded-lg p-10 text-center space-y-8 border border-outline-variant/15 relative overflow-hidden max-w-md w-full">
          <div className="absolute top-0 left-0 w-full h-1 bg-secondary-fixed/30">
            <div className="h-full bg-secondary-fixed w-1/3"></div>
          </div>
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>hourglass_top</span>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-headline font-bold">You&apos;re on the list!</h2>
            <p className="text-on-surface-variant text-sm">We&apos;ll notify you the moment a spot opens up.</p>
          </div>
          <div className="inline-block px-6 py-3 bg-secondary-fixed text-on-secondary-fixed rounded-full font-headline font-extrabold text-xl">
            #312 in line
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-xs font-label uppercase tracking-widest text-on-surface-variant">
              <span>Chance of entry</span>
              <span className="text-secondary-fixed">Moderate chance</span>
            </div>
            <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="w-[45%] h-full bg-gradient-to-r from-secondary-fixed/50 to-secondary-fixed"></div>
            </div>
          </div>
        </div>
      </section>

      {/* STATE 3: WAITLIST SPOT CLAIMED (URGENCY) */}
      <section className="relative rounded-xl overflow-hidden min-h-[500px] flex items-center justify-center p-8 bg-surface-container/50">
        <div className="absolute inset-0 bg-red-900/5 border-4 border-red-500/20 rounded-xl"></div>
        <div className="relative z-10 w-full max-w-2xl space-y-10">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full font-bold text-sm animate-pulse">
              <span className="material-symbols-outlined text-sm">timer</span>
              <span>OFFER EXPIRES IN 14:58</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tight">Your spot is ready! ⚡</h1>
          </div>
          <div className="bg-surface-container-highest/80 backdrop-blur-xl rounded-lg p-1 border-t border-white/10 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-6 p-6">
              <div className="w-32 h-32 rounded-lg overflow-hidden shrink-0 bg-slate-700" />
              <div className="flex-1 space-y-2 text-center md:text-left">
                <div className="text-primary font-bold text-sm">Reservation ID: TRK-9902-X</div>
                <h3 className="text-2xl font-headline font-bold">Neon Nocturne GA Ticket</h3>
                <p className="text-on-surface-variant text-sm">Held until 12:45 PM today. If not claimed, it passes to #313.</p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button className="w-full h-20 bg-gradient-to-r from-secondary-fixed to-lime-500 text-on-secondary-fixed font-headline font-black text-2xl rounded-lg hover:scale-[1.01] active:scale-95 transition-all shadow-xl shadow-secondary-fixed/10">
                Claim My Ticket
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
