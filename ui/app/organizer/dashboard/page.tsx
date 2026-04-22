
// app/organizer/dashboard/page.tsx
// Updated to fetch data from API and use it

import OrganizerHeader from "@/components/organizer/Header";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { getUserById } from '@/lib/services/userService';
import { getOrganizerDashboardData } from '@/lib/services/eventService';

async function OrganizerDashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;

  if (!userId) {
    // Handle unauthorized access
    return (
      <div className="p-10 text-center text-red-500">
        You need to be logged in to view this page.
        <Link href="/auth/signin" className="underline ml-2">Sign In</Link>
      </div>
    );
  }

  const user = await getUserById(userId);

  let dashboardData;
  try {
    dashboardData = await getOrganizerDashboardData(userId);
  } catch (error: any) {
    console.error("Failed to fetch organizer dashboard data:", error);
    return (
      <div className="p-10 text-center text-red-500">
        Error loading dashboard data: {error.message}
      </div>
    );
  }

  const { organizerName, stats, recentEvents, pastEventsCount, activityFeed } = dashboardData;

  return (
      <main className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
        <OrganizerHeader />
        <div className="p-4 space-y-4 max-w-8xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 relative">
            {/* Left Column */}
            <div className="lg:col-span-3 space-y-4">
              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat: any, idx: number) => (
                  <div key={idx} className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 shadow-sm backdrop-blur-sm">
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                      <span className={`${stat.color} text-[10px] font-black bg-white/5 px-2 py-0.5 rounded-full border border-white/5 uppercase tracking-tighter`}>{stat.change}</span>
                    </div>
                    <p className="text-2xl font-black text-white">{stat.value}</p>
                    {stat.stroke ? ( // Render chart if stroke is present
                      <div className={`mt-4 h-10 w-full ${stat.bgColor.replace('/10', '/5')} rounded-lg flex items-center justify-center overflow-hidden`}>
                        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                          <path d={stat.path} fill="none" stroke={stat.stroke} strokeWidth="2" vectorEffect="non-scaling-stroke" />
                        </svg>
                      </div>
                    ) : ( // Render progress bar if progress is present
                      <div className="mt-4 flex items-center gap-1">
                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${stat.progress}%` }}></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Chart Section */}
              <div className="bg-slate-900/40 p-8 rounded-2xl border border-slate-800 shadow-sm backdrop-blur-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-lg font-bold text-white">Revenue over the last 30 days</h3>
                    <p className="text-slate-500 text-sm font-medium">Monthly performance snapshot</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 text-xs font-bold rounded-lg bg-primary/10 text-primary border border-primary/20">30 Days</button>
                    <button className="px-4 py-2 text-xs font-bold rounded-lg hover:bg-white/5 text-slate-500 hover:text-slate-300 transition-all">90 Days</button>
                  </div>
                </div>
                <div className="h-[300px] w-full relative">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#7c3bed" stopOpacity="0.3"></stop>
                        <stop offset="100%" stopColor="#7c3bed" stopOpacity="0"></stop>
                      </linearGradient>
                    </defs>
                    {/* This path is a placeholder - actual chart data would come from API */}
                    <path d="M0 250 C 100 240, 150 100, 250 150 C 350 200, 450 50, 550 80 C 650 110, 750 220, 850 180 C 950 140, 1000 120, 1000 120 V 300 H 0 Z" fill="url(#chartGradient)"></path>
                    <path d="M0 250 C 100 240, 150 100, 250 150 C 350 200, 450 50, 550 80 C 650 110, 750 220, 850 180 C 950 140, 1000 120, 1000 120" fill="none" stroke="#7c3bed" strokeWidth="4"></path>
                  </svg>
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-1 text-[10px] text-slate-500 font-bold uppercase tracking-widest border-l border-b border-slate-800">
                    <span>$200k</span>
                    <span>$150k</span>
                    <span>$100k</span>
                    <span>$50k</span>
                    <span>0</span>
                  </div>
                </div>
                <div className="flex justify-between mt-4 px-10">
                  {/* Placeholder labels */}
                  {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map(w => (
                    <span key={w} className="text-xs font-bold text-slate-500 uppercase tracking-widest">{w}</span>
                  ))}
                </div>
              </div>

              {/* Your Events Table */}
              <div className="bg-slate-900/40 rounded-2xl border border-slate-800 shadow-sm overflow-hidden backdrop-blur-sm">
                <div className="px-8 py-6 border-b border-slate-800 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Your Events</h3>
                  <Link href="/organizer/events/create" className="text-primary font-bold text-sm px-4 py-2 rounded-lg hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all">Create New Event</Link>
                  {/* <button className="text-primary text-sm font-bold hover:underline">View All</button> */}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                      <tr>
                        <th className="px-8 py-4">Event</th>
                        <th className="px-8 py-4">Status</th>
                        <th className="px-8 py-4">Progress</th>
                        <th className="px-8 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {recentEvents.length > 0 ? (
                        recentEvents.map((event: any, idx: number) => (
                          <tr key={idx} className="hover:bg-white/5 transition-colors group cursor-pointer">
                            <td className="px-8 py-5">
                              <div className="flex items-center gap-4">
                                <div className="size-12 rounded-lg bg-cover bg-center border border-white/10 group-hover:border-primary/30 transition-colors" style={{ backgroundImage: `url(${event.img || 'https://via.placeholder.com/50x50?text=Event'})` }}></div>
                                <div>
                                  <p className="font-bold text-sm text-white group-hover:text-primary transition-colors">{event.name}</p>
                                  <p className="text-xs text-slate-500 font-medium">{event.date} • {event.location}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-5">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${
                                event.status === 'Live' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                event.status === 'Draft' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                'bg-slate-500/10 text-slate-400 border-slate-500/20'
                              }`}>{event.status}</span>
                            </td>
                            <td className="px-8 py-5">
                              <div className="w-48">
                                <div className="flex justify-between text-[10px] font-bold mb-1.5 uppercase tracking-tighter">
                                  <span className="text-slate-400">{event.sold}/{event.total} sold</span>
                                  <span className="text-primary">{Math.round((event.sold / event.total) * 100)}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                  <div className={`h-full ${event.status === 'Past' ? 'bg-emerald-500' : 'bg-primary'}`} style={{ width: `${(event.sold / event.total) * 100}%` }}></div>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-5 text-right">
                              <Link href={`/organizer/events/${event.id}/edit`} className="text-primary font-bold text-sm px-4 py-2 rounded-lg hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all">Manage</Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-8 py-6 text-center text-slate-500">
                            No live events found. Create one to get started!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4 h-[85vh] sticky top-[18px]">
              {/* Recent Activity */}
              <div className=" bg-slate-900/40 p-6 rounded-2xl border border-slate-800 shadow-sm backdrop-blur-sm overflow-hidden flex flex-col">
                <h3 className="text-lg font-bold mb-6 text-white">Recent Activity</h3>
                <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                  {activityFeed.length > 0 ? (
                    activityFeed.map((activity: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-4 rounded-xl hover:bg-white/5 transition-all">
                        <div className={`size-10 rounded-full ${activity.bgColor || 'bg-primary/10'} flex items-center justify-center shrink-0 border border-white/5`}>
                          <span className={`material-symbols-outlined ${activity.color || 'text-primary'} text-xl`}>{activity.icon}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-300">{activity.text}<span className="font-bold text-white">{activity.bold}</span></p>
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 text-sm">No recent activity to display.</p>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className=" bg-slate-900/40 p-6 rounded-2xl border border-slate-800 shadow-sm flex flex-col justify-between backdrop-blur-sm overflow-hidden">
                <div className="flex-1 overflow-y-auto pr-2">
                  <h3 className="text-lg font-bold mb-6 text-white">Quick Actions</h3>
                  <div className="flex flex-col gap-3">
                    {[
                      { icon: 'file_download', label: 'Export Event Data', link: '#' }, // Placeholder link
                      { icon: 'visibility', label: 'View Public Profile', link: '/profile/public' }, // Link to public profile
                      { icon: 'share', label: 'Share Organizer Link', link: '/organizer/share' }, // Placeholder link
                    ].map((action, idx) => (
                      <Link key={idx} href={action.link} className="w-full flex items-center justify-between px-4 py-4 bg-white/5 rounded-xl hover:bg-primary/5 transition-all border border-white/5 hover:border-primary/20 group">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-slate-500 group-hover:text-primary transition-colors">{action.icon}</span>
                          <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{action.label}</span>
                        </div>
                        <span className="material-symbols-outlined text-slate-500 text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="mt-8 p-6 bg-primary/5 rounded-2xl border border-primary/10 shrink-0">
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Upcoming Milestone</p>
                  <p className="text-sm font-medium text-slate-300 leading-relaxed">You have {pastEventsCount} past events. Host {10 - recentEvents.length} more active events to unlock <span className="font-bold text-white">Featured Organizer Status</span> and reduced service fees.</p> {/* Dynamic text based on data */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}

export default OrganizerDashboardPage; // Export as default
