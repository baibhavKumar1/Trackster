
// app/attendee/dashboard/page.tsx
// Removed original content and replaced with data fetching logic.

import Link from "next/link";
import Image from "next/image";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { getUserById } from '@/lib/services/userService';
import { getAttendeeDashboardData } from '@/lib/services/eventService';

// Helper function to calculate remaining time (copied from eventService for client-side use if needed, or can be fetched)
// For server components, it's better to have it in the service layer.
// Re-using the service function's output structure is preferred.
// const calculateRemainingTime = (date: Date): string => { ... }

async function AttendeeDashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;

  if (!userId) {
    // Handle unauthorized access, perhaps redirect to login or show an error
    return (
      <div className="p-10 text-center text-red-500">
        You need to be logged in to view this page.
        <Link href="/auth/signin" className="underline ml-2">Sign In</Link>
      </div>
    );
  }

  let dashboardData;
  try {
    dashboardData = await getAttendeeDashboardData(userId);
  } catch (error: any) {
    console.error("Failed to fetch attendee dashboard data:", error);
    return (
      <div className="p-10 text-center text-red-500">
        Error loading dashboard data: {error.message}
      </div>
    );
  }

  const { greetingName, upcomingEvents, recommendedEvents, stats } = dashboardData;

  return (
    <>
      <div className="pb-12 px-10 space-y-10">

        {/* Greeting Hero Strip */}
        <section className="relative overflow-hidden rounded-lg p-10 bg-gradient-to-br from-surface-container via-surface to-surface-container-high">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent blur-3xl -z-10"></div>
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-5xl font-black font-headline tracking-tighter mb-2">Good evening, {greetingName} 🌙</h2>
              <div className="flex items-center gap-3 text-on-surface-variant font-medium">
                <span>San Francisco, CA</span> {/* Static, could be fetched */}
                <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span> {/* Dynamic Date */}
              </div>
            </div>
            <div className="hidden lg:block text-right">
              <p className="text-[10px] uppercase tracking-widest text-secondary-fixed font-bold mb-1">Live Updates</p>
              <p className="text-sm font-headline text-on-surface-variant">Cloudy 14°C — 4 New Invites</p> {/* Static placeholder */}
            </div>
          </div>
        </section>

        {/* Action Alerts Banner */}
        <section className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-secondary-fixed text-on-secondary-fixed rounded-xl font-bold font-headline overflow-hidden relative">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">bolt</span>
              <span>Your waitlist spot for NodeConf India just opened — claim in 14:32</span> {/* Static */}
            </div>
            <button className="px-6 py-2 bg-on-secondary-fixed text-secondary-fixed rounded-full text-xs uppercase tracking-widest hover:bg-black transition-colors">Claim Now</button>
          </div>
          <div className="flex items-center gap-3 p-4 bg-surface-container-high rounded-xl ghost-border text-on-surface-variant">
            <span className="material-symbols-outlined text-primary">verified_user</span>
            <span className="text-sm">Complete your profile to get better recommendations and early access to VIP sales.</span> {/* Static */}
          </div>
        </section>

        {/* Today's Events Quick Strip */}
        <section>
          <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-xl ghost-border">
            <div className="flex items-center gap-2 px-3 py-1 bg-error-container text-on-error-container rounded-full text-[10px] font-black uppercase tracking-tighter">
              <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
              Happening Now
            </div>
            <h3 className="font-headline font-bold text-lg">Tech &amp; Design Mixer</h3> {/* Static */}
            <span className="text-on-surface-variant text-sm">— SOMA District • 18:30 - 22:00</span> {/* Static */}
            <button className="ml-auto text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              View Directions <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* Countdown Cards */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-black font-headline tracking-tight">Your Next Events</h3>
            <Link className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors" href="/attendee/tickets">See all tickets</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div key={event.id} className="group relative aspect-[16/9] rounded-lg overflow-hidden bg-surface-container-high ghost-border flex flex-col justify-end p-8">
                  <Image
                    alt={`Image for ${event.name}`}
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 group-hover:scale-105 transition-transform duration-700"
                    src={event.imageUrl || 'https://via.placeholder.com/600x400?text=Event+Image'}
                    fill
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
                  <div className="relative z-10 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-3xl font-black font-headline tracking-tighter">{event.name}</h4>
                        <p className="text-on-surface-variant flex items-center gap-2 mt-1">
                          <span className="material-symbols-outlined text-sm">location_on</span>
                          {event.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Starts In</p>
                        <p className="text-2xl font-headline font-black text-on-surface">{event.remainingTime}</p>
                      </div>
                    </div>
                    <Link href={`/events/${event.id}`} className="w-full py-4 bg-white text-black font-black font-headline rounded-full flex items-center justify-center hover:scale-[1.02] active:scale-95 transition-all">View Ticket</Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-on-surface-variant">No upcoming events found.</p>
            )}
          </div>
        </section>

        {/* Stats Snapshot Row */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-surface-container-high p-6 rounded-lg ghost-border">
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">Attendance</p>
            <p className="text-3xl font-black font-headline">{stats.attendance.value} <span className="text-sm font-normal text-on-surface-variant">{stats.attendance.unit}</span></p>
          </div>
          <div className="bg-surface-container-high p-6 rounded-lg ghost-border">
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">Travel</p>
            <p className="text-3xl font-black font-headline">{stats.travel.value} <span className="text-sm font-normal text-on-surface-variant">{stats.travel.unit}</span></p>
          </div>
          <div className="bg-surface-container-high p-6 rounded-lg ghost-border">
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">Network</p>
            <p className="text-3xl font-black font-headline">{stats.network.value} <span className="text-sm font-normal text-on-surface-variant">{stats.network.unit}</span></p>
          </div>
          <div className="bg-surface-container-high p-6 rounded-lg ghost-border">
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">Total Impact</p>
            <p className="text-3xl font-black font-headline">${stats.totalSpent.value} <span className="text-sm font-normal text-on-surface-variant">{stats.totalSpent.unit}</span></p>
          </div>
        </section>

        {/* Recommended For You */}
        <section className="pb-20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-black font-headline tracking-tight">Recommended For You</h3>
              <p className="text-xs text-on-surface-variant font-medium mt-1">Based on your interests</p> {/* Generic text */}
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-white transition-colors border border-outline-variant/10">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-white transition-colors border border-outline-variant/10">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
            {recommendedEvents.length > 0 ? (
              recommendedEvents.map((event) => (
                <div key={event.id} className="flex-none w-72 group">
                  <div className="aspect-[4/5] rounded-lg overflow-hidden mb-4 relative bg-surface-container">
                    <Image
                      alt={`Recommended event thumbnail: ${event.name}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      src={event.imageUrl || 'https://via.placeholder.com/300x400?text=Event+Thumb'}
                      fill
                    />
                    {/* Placeholder for tags like 'New' or 'Trending' - could be data-driven */}
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-bold uppercase">New</div>
                    <Link href={`/events/${event.id}`} className="absolute bottom-4 right-4 w-10 h-10 bg-secondary-fixed text-on-secondary-fixed rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined">add</span>
                    </Link>
                  </div>
                  <h4 className="font-headline font-bold text-lg leading-tight group-hover:text-primary transition-colors">{event.name}</h4>
                  <p className="text-sm text-on-surface-variant mt-1">{event.date} • {event.location}</p>
                  <div className="mt-3 flex gap-2">
                    {event.tags?.map(tag => (
                      <span key={tag} className="text-[9px] px-2 py-0.5 bg-primary/10 text-primary rounded-full uppercase tracking-widest font-bold">{tag}</span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-on-surface-variant">No recommendations available at the moment.</p>
            )}
          </div>
        </section>
      </div>

      {/* Contextual FAB - Dashboard Explore */}
      <Link
        href="/discover" // Assuming /discover is the page for finding events
        className="fixed bottom-10 right-10 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-inverse-primary text-on-primary shadow-2xl flex items-center justify-center group hover:scale-110 active:scale-95 transition-all z-50"
      >
        <span className="material-symbols-outlined text-3xl">add_location_alt</span>
        <span className="absolute right-20 bg-surface-container-high px-4 py-2 rounded-lg text-sm font-headline font-bold opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap">Find Nearby Events</span>
      </Link>
    </>
  );
}

export default AttendeeDashboardPage; // Export as default
