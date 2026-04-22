'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";

export default function AttendeeSidebar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const menuItems = [
    { name: 'Dashboard', icon: 'grid_view', href: '/attendee/dashboard' },
    { name: 'My Tickets', icon: 'confirmation_number', href: '/attendee/tickets' },
    { name: 'My Calendar', icon: 'calendar_today', href: '/attendee/calendar' },
    { name: 'Following', icon: 'group', href: '/attendee/following' },
    { name: 'History & Reviews', icon: 'history', href: '/attendee/history' },
  ];

  return (
    <aside className="h-screen w-72 flex-col fixed left-0 top-0 bg-[#131315] shadow-[20px_0_80px_rgba(0,0,0,0.45)] flex py-8 z-50">
      <div className="px-8 mb-8">
        <Link href="/" className="block">
          <h1 className="text-2xl font-black tracking-tighter text-[#cdbdff] font-headline">Trackster</h1>
        </Link>
      </div>
      
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              className={`flex items-center gap-4 px-6 py-4 transition-all duration-300 ${
                isActive 
                  ? "bg-[#cdbdff] text-[#131315] rounded-r-full font-bold" 
                  : "text-[#cbc3d9] hover:text-[#cdbdff] hover:bg-[#2a2a2c] hover:scale-[1.02]"
              }`}
              href={item.href}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "" }}>
                {item.icon}
              </span>
              <span className="font-headline tracking-tight">{item.name}</span>
            </Link>
          );
        })}
        
        <div className="mx-6 h-px bg-white/5 my-2"></div>
        
        <Link
          className={`flex items-center gap-4 px-6 py-4 transition-colors duration-200 hover:bg-[#2a2a2c] hover:scale-[1.02] ${
            pathname === '/attendee/settings' ? "text-[#cdbdff]" : "text-[#cbc3d9] hover:text-[#cdbdff]"
          }`}
          href="/attendee/settings"
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="font-headline tracking-tight">Settings</span>
        </Link>
      </nav>

      <div className="px-6 mt-auto">
        <Link 
          href="/organizer/dashboard"
          className="w-full flex items-center justify-center gap-2 text-center py-4 bg-gradient-to-r from-primary to-inverse-primary text-on-primary rounded-full font-bold font-headline tracking-tight shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
        >
          <span className="material-symbols-outlined">event_seat</span>
          <span className="font-headline tracking-tight">Organizer View</span>
        </Link>
      </div>
    </aside>
  );
}
