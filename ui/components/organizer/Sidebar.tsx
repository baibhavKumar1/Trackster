'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function OrganizerSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: 'dashboard', href: '/organizer/dashboard' },
    { name: 'Events', icon: 'calendar_today', href: '/organizer/events' },
    { name: 'Media', icon: 'perm_media', href: '/organizer/media' },
    { name: 'Analytics', icon: 'analytics', href: '/organizer/analytics' },
    { name: 'Settings', icon: 'settings', href: '/organizer/settings' },
    { name: 'Help', icon: 'help', href: '/organizer/help' },
  ];

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col bg-background-dark border-r border-slate-800 p-6 space-y-8 overflow-y-auto h-screen sticky top-0">
      <div className="flex flex-col">
        <Link href="/" className="text-primary text-xl font-bold leading-normal flex items-center gap-2 group">
          <span className="material-symbols-outlined fill-1">bolt</span>
          <span className="text-white group-hover:text-primary transition-colors">Trackster</span>
        </Link>
        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mt-1">Event Management</p>
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/organizer' && pathname?.startsWith(item.href));
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-slate-400 hover:bg-primary/5 hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>{item.name}</span>
            </Link>
          );
        })}
        
        <div className="h-px bg-slate-800 my-4"></div>
        
        <Link
          href="/attendee/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all border border-transparent hover:border-slate-700"
        >
          <span className="material-symbols-outlined">person</span>
          <span className="text-sm font-medium">Attendee View</span>
        </Link>
      </nav>

    </aside>
  );
}