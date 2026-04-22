'use client';

import React from 'react';

export default function EventDescriptionPage() {
  return (
    <div className="flex w-full">
      <div className="w-full space-y-8 p-6 lg:p-8">
        <div className="flex flex-col gap-8">
          {/* Event Description Section */}
          <div className="bg-surface-dark rounded-xl border border-border-dark overflow-hidden">
            {/* WYSIWYG Editor Toolbar */}
            <div className="bg-background-dark/50 p-2 flex items-center gap-1 border-b border-border-dark">
              <button className="p-2 hover:bg-surface-dark rounded-md text-slate-300 transition-colors">
                <span className="material-symbols-outlined">format_bold</span>
              </button>
              <button className="p-2 hover:bg-surface-dark rounded-md text-slate-300 transition-colors">
                <span className="material-symbols-outlined">format_italic</span>
              </button>
              <button className="p-2 hover:bg-surface-dark rounded-md text-slate-300 transition-colors">
                <span className="material-symbols-outlined">format_list_bulleted</span>
              </button>
              <button className="p-2 hover:bg-surface-dark rounded-md text-slate-300 transition-colors">
                <span className="material-symbols-outlined">format_list_numbered</span>
              </button>
              <div className="w-px h-6 bg-border-dark mx-1"></div>
              <button className="p-2 hover:bg-surface-dark rounded-md text-slate-300 transition-colors">
                <span className="material-symbols-outlined">link</span>
              </button>
              <button className="p-2 hover:bg-surface-dark rounded-md text-slate-300 transition-colors">
                <span className="material-symbols-outlined">image</span>
              </button>
              <button className="p-2 hover:bg-surface-dark rounded-md text-slate-300 transition-colors ml-auto">
                <span className="material-symbols-outlined">undo</span>
              </button>
            </div>
            {/* Text Area */}
            <div className="p-6">
              <textarea className="w-full bg-transparent border-none focus:ring-0 text-slate-300 resize-none text-base placeholder:text-slate-600" placeholder="Tell us about the atmosphere, the speakers, what to expect..." rows={10}></textarea>
            </div>
          </div>
          {/* Privacy & URL Section */}
          <div className="bg-surface-dark rounded-xl border border-border-dark p-6">
            <h2 className="text-xl font-bold text-slate-100 mb-6">Privacy &amp; Access</h2>
            <div className="space-y-8">
              {/* Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-100">Public Event</span>
                  <span className="text-sm text-slate-400">Listed on Trackster&apos;s explore page and searchable by anyone.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input checked={false} className="sr-only peer" type="checkbox" value=""/>
                  <div className="w-14 h-7 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              {/* Custom URL */}
              <div className="flex flex-col gap-3">
                <label className="font-semibold text-slate-100">Event URL</label>
                <div className="flex h-12 overflow-hidden rounded-xl border border-border-dark group focus-within:border-primary transition-all">
                  <div className="flex items-center bg-background-dark/50 px-4 border-r border-border-dark text-slate-400 text-sm font-medium">
                    trackster.events/
                  </div>
                  <input className="flex-1 bg-transparent border-none focus:ring-0 text-slate-100 text-sm px-4 placeholder:text-slate-600" placeholder="my-awesome-event-2024" type="text" defaultValue="neon-nights-concert"/>
                  <div className="flex items-center pr-4">
                    <span className="material-symbols-outlined text-accent text-sm">check_circle</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500">Short, catchy URLs are easier to share on social media.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <aside className="border-l border-primary/10 bg-background-dark/30 p-8 hidden xl:block overflow-y-auto">
        <div className="sticky top-0">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Live Preview</h3>
            <span className="flex items-center gap-1.5 text-[10px] font-black text-accent border border-accent/20 px-2 py-0.5 rounded-full bg-accent/5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"></span> LIVE
            </span>
          </div>
          {/* Preview Card */}
          <div className="overflow-hidden rounded-3xl bg-slate-900 border border-primary/20 shadow-2xl shadow-black/40">
            <div className="relative h-48 w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10"></div>
              <img
                className="h-full w-full object-cover transition-transform hover:scale-110 duration-700"
                src="https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=2074&auto=format&fit=crop"
                alt="Preview"
              />
              <div className="absolute right-4 top-4 z-20 rounded-lg bg-accent px-2 py-1 text-[10px] font-black text-black uppercase tracking-tighter">
                RUNNING
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">June 14, 2024</span>
                <span className="h-1 w-1 rounded-full bg-slate-700"></span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">10:00 PM</span>
              </div>
              <h4 className="text-xl font-bold leading-tight text-white mb-2">Midnight Relay SF</h4>
              <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 font-medium">
                <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                    </div>
                  ))}
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-900 bg-slate-800 text-[10px] font-black text-slate-400">+12</div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase font-black text-slate-500 tracking-tighter">From</p>
                  <p className="text-xl font-black text-white tracking-tighter">$45.00</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 rounded-2xl bg-accent/5 p-5 border border-accent/10 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-accent text-xl">lightbulb</span>
              <div>
                <p className="text-sm font-bold text-accent">Pro Tip</p>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed font-medium">High-quality cover images increase event views by up to 45%.</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
