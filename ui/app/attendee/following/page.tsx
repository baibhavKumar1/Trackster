import Link from "next/link";
import Image from "next/image";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

export default async function FollowingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  return (
    <div className="pt-10 p-8 relative">
      <div className="max-w-8xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Left Column */}
        <div className="lg:w-1/3 space-y-12">
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold font-['Space_Grotesk'] tracking-tight text-[#cdbdff]">Following</h2>
              <span className="text-xs font-bold bg-[#2a2a2c] px-3 py-1 rounded-full text-[#c3f400] uppercase tracking-wider">24 Active</span>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { name: 'Nasscom', events: '3 Upcoming Events', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0QGNtxsYEGcsuNjCAhVbM1anZCaD5-soH3RzFU9t6szACpRVig8VQhQQMD1imwRff0BiQ3Zuea2RM2BlXlmSTA46V0IVV5F9yiU03fZ-_rTrIT3KiSeqzTrhZQJ60fZnTTdFtgmZ9uNZy4v1uE7O2iFw4dkw6jk6UC2ENKRqxBeop8ypU-OkEEUPCHVES_Lz14JIruY40Co8RSJiPJQGxc6J2NI32ZYA1qYgbF4Y1-MiNDcUz2YpTcITobdj1-h_sNcXvSK4ifj8' },
                { name: 'GDG Bengaluru', events: '1 Upcoming Event', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArDoBQAa5vS8jG-ls4UwdrHbciIJcIONSK3v3VHYGNnk8hmfW76iWbMOh_ssbOgzdaN-Xz7_0gdEuy6cuUpLmSOwuv03_kiAZ1pMpO-DZfnQsU4V4DB4Xp2gqaof6_lE0e6yIxMRAFXjxjESE_VrQnaVWTs4562K0Y5U2DHhuLOxLOgdspkkctQpaZdLiCkC966_ot0-5saW0CpJgdoMmfGWi7QUBvT13OEfBXy8uB8968a8OIK0voesVRY9zNAChI8ftvn9sjcBM' }
              ].map((org, i) => (
                <div key={i} className="bg-[#201f21] p-4 rounded-lg flex items-center justify-between group cursor-pointer hover:bg-[#2a2a2c] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#c3f400] transition-all relative">
                      <Image src={org.img} alt={org.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#e5e1e4]">{org.name}</h3>
                      <p className="text-xs text-[#cbc3d9]">{org.events}</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#948da2] group-hover:text-[#c3f400]">chevron_right</span>
                </div>
              ))}
            </div>
          </section>
        </div>
        
        {/* Right Column */}
        <div className="lg:w-2/3 space-y-8">
          <div className="flex items-end justify-between border-b border-[#494456] pb-4">
            <h1 className="text-4xl md:text-5xl font-black font-['Space_Grotesk'] tracking-tighter uppercase">Activity <span className="text-[#cdbdff] italic">Stream</span></h1>
          </div>
          <div className="space-y-8">
            {/* Activity Card */}
            <div className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-[#cdbdff] before:to-transparent">
              <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-[#cdbdff]"></div>
              <div className="bg-[#201f21] rounded-lg overflow-hidden border-l-2 border-[#cdbdff] p-6 space-y-4">
                 <p className="text-sm font-bold text-[#e5e1e4]">Nasscom <span className="font-normal text-[#cbc3d9]">just posted a new event</span></p>
                 <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeIQy2BbBuMdTCgH3GR4woltDOxDG1TBQnK5wUFbT97OjztSZjxus_yCLh9qPrRD7RCJ6DqapLPHQ0nmO5xyXlU-do_zO60AKF9-Emj_10vT7xPfsxVpwDTEK_oQK7sBc7PjursO1eEdWmVDUBPMgMIXn5K2aNYiuZ3u9xQ8nhudOaktESe3PkV_yy9ROP6iaf_DiSRBZL1eXJOMYfQQT0-H5H8Xjjq21MmZrJxKYx_PO5aNzX8-V_BPrQwCZlfg0WHYwP1tNuUM0" alt="Event" fill className="object-cover" />
                 </div>
                 <button className="w-full bg-gradient-to-r from-[#cdbdff] to-[#6833ea] text-[#370096] py-3 rounded-full font-bold text-sm">View Event</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
