'use client';

import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";
import { Input } from "@/components/ui/input";

export default function AttendeeHeader() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-18rem)] z-40 bg-[#131315]/80 backdrop-blur-xl flex justify-between items-center px-10 h-20 border-b border-white/5">
      <div className="flex-1 max-w-md">
        <div className="relative flex items-center bg-surface-container-high rounded-full px-4 py-2  transition-all">
          <span className="material-symbols-outlined text-on-surface-variant mr-2 text-sm">search</span>
          <Input
            className="bg-none focus-none ring-none border-none text-sm w-full placeholder:text-on-surface-variant font-body"
            placeholder="Search events, venues, organizers..."
            type="text"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6 ml-auto">
        <Link 
          href="/discover"
          className="bg-primary hover:bg-primary/90 text-on-primary px-6 py-2 rounded-full font-bold text-sm transition-all active:scale-95"
        >
          Explore Events
        </Link>
        
        <button className="text-on-surface-variant hover:text-secondary-fixed transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        
        <Link href="/attendee/settings" className="flex items-center gap-2 group">
          <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-primary/50 transition-colors">
             {user?.image ? (
               <img src={user.image} alt="" className="size-full object-cover" />
             ) : (
               <span className="material-symbols-outlined text-lg">account_circle</span>
             )}
          </div>
        </Link>
      </div>
    </header>
  );
}
