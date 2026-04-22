import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-background text-on-surface font-body overflow-x-hidden min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 bg-transparent">
        <div className="text-2xl font-headline font-bold tracking-tighter text-slate-100">Trackster</div>
        <div className="hidden md:flex gap-8 items-center">
          <Link href="#" className="text-slate-400 hover:text-slate-100 transition-colors font-label uppercase tracking-widest text-[10px] font-semibold">Support</Link>
          <Link href="#" className="text-slate-400 hover:text-slate-100 transition-colors font-label uppercase tracking-widest text-[10px] font-semibold">Help</Link>
        </div>
      </header>
      
      <main className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-32 px-6">
        {/* Background Orbs */}
        <div className="absolute top-1/4 -left-20 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-20 w-[35rem] h-[35rem] bg-inverse-primary/15 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative w-full max-w-6xl flex flex-col items-center text-center z-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 mb-8">
            <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center order-2 md:order-1">
              <div className="absolute inset-0 bg-surface-container-highest/30 rounded-full scale-90 blur-xl"></div>
              {/* Illustration Placeholder */}
              <div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center text-slate-500">Illustration</div>
            </div>
            <h1 className="font-headline font-bold text-[8rem] md:text-[16rem] leading-none text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400 -rotate-6 order-1 md:order-2 select-none">
              404
            </h1>
          </div>
          
          <div className="max-w-2xl">
            <h2 className="font-headline font-bold text-4xl md:text-6xl tracking-tight mb-4 text-on-surface">
              This event has left the building.
            </h2>
            <p className="text-on-surface-variant text-lg md:text-xl font-medium mb-10">
              The page you&apos;re looking for doesn&apos;t exist, has been rescheduled, or is currently on a world tour.
            </p>
          </div>

          <div className="w-full max-w-lg space-y-8">
            <div className="relative group">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-secondary-fixed transition-colors">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input className="w-full bg-surface-container-highest border-none rounded-lg py-5 pl-16 pr-6 text-on-surface placeholder:text-on-surface-variant focus:ring-0 focus:outline-none focus:bg-surface-container-high transition-all" placeholder="Search for an event, venue, or city..." type="text"/>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link href="/" className="px-10 py-5 bg-gradient-to-r from-primary to-indigo-600 rounded-full text-white font-bold text-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center">
                Back to Home
              </Link>
              <Link href="/discover" className="px-10 py-5 border border-outline-variant/20 rounded-full text-white font-bold text-lg hover:bg-white/5 hover:border-white/40 transition-all">
                Explore Events
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
