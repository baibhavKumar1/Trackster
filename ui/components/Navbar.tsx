'use client';
import Link from 'next/link';
import { authClient } from '@/app/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-2xl">event_upcoming</span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white">Trackster</h2>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/discover" className="text-sm font-semibold hover:text-primary transition-colors">Discover</Link>
          <Link href="/organizer/create" className="text-sm font-semibold hover:text-primary transition-colors">Create Event</Link>
          <Link href="/pricing" className="text-sm font-semibold hover:text-primary transition-colors">Pricing</Link>
          <Link href="/about" className="text-sm font-semibold hover:text-primary transition-colors">About</Link>
        </div>
        
        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-6">
              <div className="relative group">
                <button className="flex items-center gap-1.5 text-sm font-semibold text-white/90 hover:text-primary transition-colors">
                  Dashboards
                  <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link href="/attendee/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                    <span className="material-symbols-outlined text-lg">person</span>
                    Attendee View
                  </Link>
                  <Link href="/organizer/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                    <span className="material-symbols-outlined text-lg">event_seat</span>
                    Organizer View
                  </Link>
                </div>
              </div>
              <div className="h-4 w-px bg-white/10"></div>
              <span className="text-sm font-semibold text-white/70">{session.user.name}</span>
              <button onClick={handleSignOut} className="px-5 py-2.5 text-sm font-bold hover:bg-white/5 rounded-xl transition-all">Log Out</button>
            </div>
          ) : (
            <>
              <Link href="/auth" className="px-5 py-2.5 text-sm font-bold hover:bg-white/5 rounded-xl transition-all">Log in</Link>
              <Link href="/auth" className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-xl shadow-primary/25 transition-all">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
