import Link from "next/link";
import Image from "next/image";

export default function CalendarPage() {
  return (
    <div className="pt-10 p-8 space-y-8 relative">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-['Space_Grotesk'] text-5xl font-black tracking-tight text-[#e5e1e4] leading-none">NOVEMBER 2024</h1>
          <p className="font-body text-[#cbc3d9] mt-2 tracking-wide uppercase text-sm">Trackster Dashboard / Personal Schedule</p>
        </div>
        {/* Calendar View Toggle */}
        <div className="flex bg-[#1c1b1d] p-1 rounded-full shadow-inner">
          <button className="px-6 py-2 rounded-full font-bold text-sm text-[#131315] bg-[#cdbdff] transition-all">Month</button>
          <button className="px-6 py-2 rounded-full font-medium text-sm text-[#cbc3d9] hover:text-white transition-all">Week</button>
          <button className="px-6 py-2 rounded-full font-medium text-sm text-[#cbc3d9] hover:text-white transition-all">Agenda</button>
        </div>
      </header>

      {/* Main Content Area: Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Calendar Grid (Left 8 Columns) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[rgba(32,31,33,0.6)] backdrop-blur-[24px] border border-[rgba(205,189,255,0.05)] rounded-xl overflow-hidden shadow-2xl">
            {/* Day Headers */}
            <div className="grid grid-cols-7 border-b border-[#948da2]/20 bg-[#2a2a2c]/40">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="py-4 text-center text-xs font-bold text-[#cbc3d9] uppercase tracking-widest">{day}</div>
              ))}
            </div>
            {/* Calendar Grid Cells */}
            <div className="grid grid-cols-7 grid-rows-5 gap-px bg-[#948da2]/10">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-[#201f21]/30 min-h-[120px] p-3 text-[#cbc3d9]/30 font-['Space_Grotesk']">{27 + i}</div>
              ))}
              {[...Array(14)].map((_, day) => (
                <div key={day} className={`bg-[#201f21] min-h-[120px] p-3 transition-colors hover:bg-[#2a2a2c] relative group cursor-pointer ${day === 4 ? "border-2 border-[#cdbdff] shadow-[inset_0_0_15px_rgba(205,189,255,0.1)]" : ""}`}>
                  <span className={`font-['Space_Grotesk'] text-lg ${day === 4 ? "text-2xl font-black text-[#cdbdff]" : "font-medium"}`}>{day + 1}</span>
                  {day === 4 && (
                    <div className="mt-3 flex flex-col gap-1.5">
                      <div className="px-2 py-0.5 rounded bg-[#cdbdff]/20 text-[10px] font-bold text-[#cdbdff] uppercase">Main Event</div>
                      <div className="px-2 py-0.5 rounded bg-[#c3f400]/20 text-[10px] font-bold text-[#c3f400] uppercase">Workshop</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Sync Options */}
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-3 px-6 py-4 bg-[#201f21] hover:bg-[#2a2a2c] rounded-2xl transition-all group flex-1">
              <span className="material-symbols-outlined text-[#cdbdff]">sync</span>
              <div className="text-left">
                <p className="text-xs text-[#cbc3d9] font-bold uppercase tracking-wider">Cloud Integration</p>
                <p className="text-sm font-bold text-[#e5e1e4]">Sync to Google Calendar</p>
              </div>
            </button>
            <button className="flex items-center gap-3 px-6 py-4 bg-[#201f21] hover:bg-[#2a2a2c] rounded-2xl transition-all group flex-1">
              <span className="material-symbols-outlined text-[#c3f400]">calendar_add_on</span>
              <div className="text-left">
                <p className="text-xs text-[#cbc3d9] font-bold uppercase tracking-wider">Direct Import</p>
                <p className="text-sm font-bold text-[#e5e1e4]">Sync to Apple Calendar</p>
              </div>
            </button>
          </div>
        </div>

        {/* Right Panel: Selected Date Details (Right 4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[rgba(32,31,33,0.6)] backdrop-blur-[24px] border border-[rgba(205,189,255,0.05)] rounded-2xl p-8 space-y-8">
            <div className="space-y-1">
              <h2 className="font-[SpaceGrotesk] text-3xl font-bold tracking-tight">TODAY&apos;S LINEUP</h2>
              <p className="text-[#cbc3d9] font-medium">Tuesday, Nov 5th</p>
            </div>
            <div className="space-y-6">
              <div className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#cdbdff] before:rounded-full">
                <p className="text-xs font-bold text-[#cdbdff] uppercase tracking-widest mb-1">09:00 AM — 11:30 AM</p>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold">Mainstage Keynote</h3>
                <p className="text-[#cbc3d9] text-sm mt-1">Plenary Hall • Hall A</p>
              </div>
              <div className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#c3f400] before:rounded-full">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-[#c3f400] uppercase tracking-widest mb-1">01:00 PM — 02:30 PM</p>
                    <h3 className="font-['Space_Grotesk'] text-xl font-bold">Design Conf 2024</h3>
                    <p className="text-[#cbc3d9] text-sm mt-1">Virtual Room 4</p>
                  </div>
                  <span className="bg-[#ffb4ab] text-[#690005] px-2 py-0.5 rounded text-[10px] font-black uppercase">Conflict</span>
                </div>
              </div>
              <div className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#cdbdff] before:rounded-full bg-[#353437]/20 p-4 rounded-r-xl">
                <p className="text-xs font-bold text-[#cdbdff] uppercase tracking-widest mb-1">01:30 PM — 04:00 PM</p>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold">Networking Lounge VIP</h3>
                <p className="text-[#cbc3d9] text-sm mt-1">Penthouse Terrace</p>
                <button className="mt-4 text-xs font-bold text-[#cdbdff] flex items-center gap-1 group">
                  Manage Reservation
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 rounded-xl overflow-hidden aspect-video relative group">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDafFl3LniNdkLBPVONSdtH21yil9MB3mq6p9tS3mY8vUN7H-X47jKSTE7Z_wR0A4B_i4d_KYpSBeGHt38GDcTLJny5AWOI-YhHDmI5Pp_YKKc-ZZJiBkpCWvwQaPHiMGxwaUJDiyoA8kxN9Et15QIz42P_glEy8_wRgPqXvz3sL4uH7kvwBRaVKYRv8U9CCXPwXrqqzf3QzDsrYiJgufdygOkPn_d8uTrZtJFbxYSFdKLfIua8JkJjhWe0Crfj0eqB9WtQ2b_C4Tc"
              alt="Convention Center"
              fill
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131315] to-transparent opacity-60"></div>
            <div className="absolute bottom-4 left-4">
              <p className="text-[10px] font-bold text-[#cdbdff] uppercase tracking-[0.2em]">Next Venue Location</p>
              <p className="text-sm font-black text-white uppercase tracking-tighter">Nexus Convention Hub</p>
            </div>
          </div>
        </div>
      </div>
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-[#c3f400] text-[#161e00] rounded-full shadow-[0_10px_40px_rgba(195,244,0,0.3)] flex items-center justify-center hover:scale-110 transition-transform z-50 group">
        <span className="material-symbols-outlined text-3xl font-bold group-hover:rotate-90 transition-transform">add</span>
      </button>
    </div>
  );
}
