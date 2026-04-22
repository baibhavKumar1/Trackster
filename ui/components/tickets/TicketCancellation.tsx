import React from 'react';

export default function TicketCancellation() {
  return (
    <div className="bg-background text-on-background font-body min-h-screen selection:bg-secondary-fixed selection:text-on-secondary-fixed flex items-center justify-center p-4">
      {/* Modal Content */}
      <div className="max-w-xl w-full glass-panel border border-outline-variant/10 rounded-lg overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.6)] p-8 md:p-10 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-bold tracking-tight text-white">Cancel Your Ticket</h1>
          <p className="text-on-surface-variant body-lg">We&apos;re sorry to see you go. Review your refund details below.</p>
        </div>

        {/* Event Summary Card */}
        <div className="bg-surface-container-high rounded-lg p-5 flex items-center gap-5 border-l-4 border-primary shadow-sm">
          <div className="w-16 h-16 rounded-md bg-surface-variant overflow-hidden flex-shrink-0">
            <img alt="Event" className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUdFbhlghIJBTFrohuMKoEEsB7MX-i3hTg5X7JDFlxT70Vr2-henQvQg9txPTuTzduRHFwucdYci36aK560wC7-TQmYWEvOhK2xeil8QnM3Ke_hyJHIecMrOX0skYPEys3a4xcdpqvQKi-1zrsNgzHoIgFna3exc61nnA-dVVKBCpQOeqWA7RLxU40G8wCDVc7SziXgmfWNJcdFHQxm77c4qBaOoHq4TSoZhw_1Nlgv3bxAv9Xhzk5YL69JlIhOjJ_pzUE7qBvVdI"/>
          </div>
          <div className="flex-grow">
            <h3 className="font-headline font-bold text-lg text-white">Vortex Music Festival 2024</h3>
            <div className="flex items-center gap-3 text-on-surface-variant text-sm mt-1">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">calendar_today</span>
                <span>Oct 24, 2024</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">location_on</span>
                <span>Berlin Arena</span>
              </div>
            </div>
          </div>
        </div>

        {/* Question: Why are you cancelling? */}
        <div className="space-y-4">
          <label className="font-headline font-semibold text-white tracking-wide">Why are you cancelling?</label>
          <div className="grid gap-3">
            {['Change of plans', 'Personal emergency', 'Financial reasons', 'Other'].map((reason) => (
              <label key={reason} className="group relative flex items-center p-4 rounded-lg bg-surface-container-low border border-transparent hover:border-outline-variant/30 cursor-pointer transition-all">
                <input className="w-5 h-5 text-secondary-fixed bg-surface-container border-outline-variant focus:ring-secondary-fixed transition-colors" name="reason" type="radio"/>
                <span className="ml-4 text-on-surface group-hover:text-white transition-colors">{reason}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Dynamic Refund Eligibility Card */}
        <div className="bg-secondary-fixed/5 border border-secondary-fixed/20 rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-on-surface-variant text-sm font-medium">Original Paid</span>
            <span className="text-white font-headline font-bold">$124.00</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-outline-variant/10">
            <span className="text-on-surface-variant text-sm font-medium">Cancellation Fee</span>
            <span className="text-error font-headline font-bold">-$12.00</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="space-y-1">
              <span className="text-secondary-fixed font-headline font-bold text-2xl">Refund: $112.00</span>
              <p className="text-[11px] text-secondary-fixed/70 uppercase tracking-widest font-bold">Refunded within 5-7 days</p>
            </div>
            <div className="bg-secondary-fixed/10 p-2 rounded-full">
              <span className="material-symbols-outlined text-secondary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4 pt-4">
          <button className="w-full h-14 rounded-full bg-red-600 text-white font-headline font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-error/10">
            Confirm Cancellation
          </button>
          <button className="w-full h-14 rounded-full border border-outline-variant/30 text-on-surface font-headline font-semibold hover:bg-white/5 transition-colors">
            Keep My Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
