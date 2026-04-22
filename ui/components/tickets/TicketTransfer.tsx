import React from 'react';

export default function TicketTransfer() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased min-h-screen">
      <main className="max-w-4xl mx-auto w-full px-4 py-8 space-y-8">
        {/* Success Hero Section */}
        <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary via-primary/80 to-indigo-600 p-8 lg:p-12 text-center shadow-xl">
          <div className="absolute top-4 left-4 opacity-20"><span className="material-symbols-outlined text-4xl">celebration</span></div>
          <div className="absolute bottom-4 right-4 opacity-20"><span className="material-symbols-outlined text-4xl">star</span></div>
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm mb-2">
              <span className="material-symbols-outlined text-white text-5xl">check_circle</span>
            </div>
            <h1 className="text-white text-4xl lg:text-5xl font-extrabold tracking-tight">You&apos;re going! 🎉</h1>
            <div className="space-y-1">
              <p className="text-white/90 text-lg">Order #TRK-88291 confirmed.</p>
              <p className="text-white/80 text-sm">A copy has been sent to john.doe@email.com</p>
            </div>
          </div>
        </section>

        {/* Digital Ticket Section */}
        <section className="flex flex-col items-center">
          <div className="w-full max-w-md bg-white dark:bg-primary/5 rounded-2xl shadow-2xl border border-primary/10 overflow-hidden relative">
            <div className="p-6 border-b-2 border-dashed border-primary/20 relative">
              <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-background-light dark:bg-background-dark rounded-full border border-primary/10"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-background-light dark:bg-background-dark rounded-full border border-primary/10"></div>
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary/60">Event</span>
                  <h3 className="text-xl font-bold">Midnight Relay SF</h3>
                </div>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                  Standard Entry
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Date & Time</span>
                  <p className="text-sm font-semibold">Oct 24, 2023</p>
                  <p className="text-sm font-semibold">11:59 PM</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Attendee</span>
                  <p className="text-sm font-semibold">John Doe</p>
                </div>
              </div>
            </div>
            <div className="p-8 flex flex-col items-center bg-slate-50 dark:bg-primary/10">
              <div className="bg-white p-4 rounded-xl shadow-inner mb-4">
                {/* Placeholder for QR Code */}
                <div className="w-40 h-40 bg-slate-200 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-slate-500">QR Placeholder</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Scan at check-in</p>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="flex flex-wrap justify-center gap-3">
          <button className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-6 py-3 rounded-xl font-bold text-sm transition-all border border-primary/20">
            <span className="material-symbols-outlined text-lg">calendar_today</span>
            Add to Calendar
          </button>
          <button className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-6 py-3 rounded-xl font-bold text-sm transition-all border border-primary/20">
            <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
            Download PDF
          </button>
          <button className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-6 py-3 rounded-xl font-bold text-sm transition-all border border-primary/20">
            <span className="material-symbols-outlined text-lg">share</span>
            Share with Friends
          </button>
        </section>
      </main>
    </div>
  );
}
