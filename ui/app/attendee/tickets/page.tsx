import Link from "next/link";
import Image from "next/image";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

export default async function TicketsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  return (
    <>
      <div className="p-8 max-w-8xl mx-auto">
        <section className="mb-2">
          <h2 className="text-5xl font-black font-headline tracking-tighter mb-8 text-[#e5e1e4] leading-none">
            Ticket <span className="text-[#cdbdff]">Wallet</span>
          </h2>
          <Tabs defaultValue="upcoming">
            <TabsList className="flex gap-4 p-2.5 bg-[#1c1b1d] rounded-full w-fit">
              <TabsTrigger value="upcoming" className="px-8 py-3 rounded-full font-bold text-sm tracking-tight transition-all text-[#cbc3d9] hover:text-[#e5e1e4] data-[state=active]:bg-[#c3f400] data-[state=active]:text-[#161e00]">Upcoming</TabsTrigger>
              <TabsTrigger value="past" className="px-8 py-3 rounded-full font-bold text-sm tracking-tight transition-all text-[#cbc3d9] hover:text-[#e5e1e4] data-[state=active]:bg-[#c3f400] data-[state=active]:text-[#161e00]">Past</TabsTrigger>
              <TabsTrigger value="waitlisted" className="px-8 py-3 rounded-full font-bold text-sm tracking-tight transition-all text-[#cbc3d9] hover:text-[#e5e1e4] data-[state=active]:bg-[#c3f400] data-[state=active]:text-[#161e00]">Waitlisted</TabsTrigger>
              <TabsTrigger value="transferred" className="px-8 py-3 rounded-full font-bold text-sm tracking-tight transition-all text-[#cbc3d9] hover:text-[#e5e1e4] data-[state=active]:bg-[#c3f400] data-[state=active]:text-[#161e00]">Transferred</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              {/* Content for Upcoming tickets will go here */}
            </TabsContent>
            <TabsContent value="past">
              {/* Content for Past tickets will go here */}
            </TabsContent>
            <TabsContent value="waitlisted">
              {/* Content for Waitlisted tickets will go here */}
            </TabsContent>
            <TabsContent value="transferred">
              {/* Content for Transferred tickets will go here */}
            </TabsContent>
          </Tabs>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          {/* Ticket Card 1 */}
          <div className="group relative flex flex-col md:flex-row bg-[#201f21] rounded-lg overflow-hidden border-l-[6px] border-[#c3f400] shadow-2xl transition-all duration-300">
            <div className="flex-1 p-4 pr-6 relative">
              <div className="flex justify-between items-start mb-6">
                <span className="px-3 py-1 bg-[#c3f400]/10 text-[#c3f400] text-[10px] font-black uppercase tracking-[0.2em] rounded-md border border-[#c3f400]/20">VIP Access</span>
                <div className="flex items-center gap-2 bg-[#353437] px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#c3f400]"></span>
                  <span className="text-xs font-bold text-[#e5e1e4]">Live in: 2d 4h</span>
                </div>
              </div>
              <h3 className="text-3xl font-black font-headline tracking-tighter mb-2 text-[#e5e1e4] leading-tight group-hover:text-[#cdbdff] transition-colors">Midnight Relay SF</h3>
              <div className="space-y-4 mt-6">
                <div className="flex items-center gap-3 text-[#cbc3d9]">
                  <span className="material-symbols-outlined text-[#c3f400]">calendar_today</span>
                  <span className="text-sm font-medium">Oct 28, 2024 • 10:00 PM</span>
                </div>
                <div className="flex items-center gap-3 text-[#cbc3d9]">
                  <span className="material-symbols-outlined text-[#c3f400]">location_on</span>
                  <span className="text-sm font-medium">Golden Gate Park, San Francisco</span>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <button className="p-4 bg-[#2a2a2c] rounded-full text-[#e5e1e4] hover:bg-[#cdbdff] hover:text-[#370096] transition-all">
                  <span className="material-symbols-outlined text-sm">calendar_add_on</span>
                </button>
                <button className="p-4 bg-[#2a2a2c] rounded-full text-[#e5e1e4] hover:bg-[#cdbdff] hover:text-[#370096] transition-all">
                  <span className="material-symbols-outlined text-sm">download</span>
                </button>
              </div>
            </div>
            <div className="w-full md:w-52 bg-[#2a2a2c] flex flex-col items-center justify-center border-l-2 border-dashed border-[#fff]/30">
              <div className="cursor-pointer group-hover:scale-110 transition-transform">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwBa4viDzxMcCAeqctos_r46dyB274NhbqgWc6yJEJtRF_TUFJXLQRotibCxmgluE8ItERPTdYlxQHsaszqiovgV-5-kvlqnu-rOHwbDemunWKVqOBv8Y4LcqBhgg_yEC2rgzRDCeMmActn12GqilyPsdzPNiGrU9or5U1UCBD24De4i2-FMeb4gTSYxSYJW0rUpKUgkUMsxR82WW2goLKr-sgs61XAQXprWzugNrYCL0E7hJeMChUcQCFoAmbKTIWMlK4NvxUbic" alt="QR Code" width={152} height={112} />
              </div>
              <p className="mt-4 text-xs font-black uppercase tracking-[0.3em] text-[#948da2]">Scan</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}