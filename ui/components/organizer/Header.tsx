'use client';

import Link from 'next/link';
import { authClient } from "@/app/lib/auth-client";

export default function OrganizerHeader() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <header className="flex items-center justify-between px-8 py-6 sticky top-0 bg-background-dark/80 backdrop-blur-md z-10 border-b border-slate-800 h-20">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold tracking-tight text-white">Organizer Dashboard</h2>
        <p className="text-xs text-slate-500 font-medium">Manage your events and ticket sales</p>
      </div>
      
      <div className="flex items-center gap-4">
        <Link 
          href="/organizer/create"
          className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center gap-2 transition-all active:scale-95"
        >  
          <span className="material-symbols-outlined text-xl">add</span>
          Create New Event
        </Link>

        <button className="p-2 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors text-slate-400 hover:text-white">
          <span className="material-symbols-outlined text-2xl">notifications</span>
        </button>

        <Link href="/organizer/settings/profile" className="flex items-center gap-2 group">
          <div className="size-10 rounded-xl border border-slate-800 bg-slate-900/50 flex items-center justify-center overflow-hidden group-hover:border-primary/50 transition-colors">
             {user?.image ? (
               <img src={user.image} alt="" className="size-full object-cover" />
             ) : (
               <span className="material-symbols-outlined text-slate-400">person</span>
             )}
          </div>
        </Link>
      </div>
    </header>
  );
}

