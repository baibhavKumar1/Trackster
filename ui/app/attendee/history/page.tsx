import Link from "next/link";
import Image from "next/image";

export default function HistoryPage() {
  return (
    <div className="pt-10 p-8 lg:p-12 min-h-screen">
      {/* Header Section */}
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="font-['Space_Grotesk'] text-5xl font-bold tracking-tight text-[#e5e1e4] mb-2 uppercase">History &amp; Reviews</h1>
          <p className="font-['Manrope'] text-[#cbc3d9] max-w-3xl text-lg">A chronicle of your journey through the electric pulse of Trackster&apos;s exclusive events.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-[#201f21] rounded-full px-6 py-3 flex items-center gap-3 border border-[#494456]/10">
            <span className="material-symbols-outlined text-[#c3f400]">query_stats</span>
            <span className="font-['Space_Grotesk'] font-bold text-xl">11.6</span>
          </div>
        </div>
      </header>

      {/* Asymmetric Content Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-8">
        {/* Left Column */}
        <div className="space-y-12">
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-['Space_Grotesk'] text-2xl font-bold tracking-tight">Event Timeline</h2>
              <span className="bg-[#c3f400]/10 text-[#c3f400] px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">Visual Archive</span>
            </div>
            <div className="relative ml-4 pl-12 border-l-2 border-[#494456]/20 space-y-16">
              <div className="relative group">
                <div className="absolute -left-[3.25rem] top-0 w-6 h-6 rounded-full bg-[#cdbdff] border-4 border-[#131315] group-hover:scale-125 transition-transform duration-300"></div>
                <div className="bg-[rgba(53,52,55,0.4)] backdrop-blur-[24px] border border-[rgba(205,189,255,0.05)] rounded-lg p-6 flex gap-6 hover:bg-[#2a2a2c]/60 transition-colors">
                  <div className="w-32 h-32 rounded-md overflow-hidden flex-shrink-0 relative">
                      <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_eoybR0-0QUn8V_dTrI6-d5jXGhodD_Tm-SKFtKFJuf3ycPriws3Z50XcsHTaDoxmlaiEDZB8bchhhKez0FQgu6s3K0xbyriZW_V5_k4vChQrB4ZexkJ3qRmUkSY5dNjJUPP_ie97jLUmPODKVj6TBgwWFde1yceFZeobiF0Xlptg5VmjCiFZzbw1BtKttEwqwlubX8tLSOinhr_QAmIm_mm4wHrF_bwFi8pEV7tj-tgrmx4Dii7Os558f36LFn76Klkd5qSV7iA" alt="Event" fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-[#c3f400] font-bold tracking-tighter uppercase mb-1">Oct 24, 2023</p>
                        <h3 className="font-['Space_Grotesk'] text-2xl font-bold mb-1">Cyber-Pulse Festival</h3>
                        <p className="text-sm text-[#cbc3d9] flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span> Tokyo, JP</p>
                      </div>
                      <div className="bg-[#353437] px-3 py-1 rounded-full text-[10px] font-bold text-[#e5e1e4] uppercase tracking-widest">Attended</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        
        {/* Right Column */}
        <div className="space-y-12">
          <section className="bg-[rgba(53,52,55,0.4)] backdrop-blur-[24px] border border-[rgba(205,189,255,0.05)] rounded-lg p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-['Space_Grotesk'] text-xl font-bold uppercase tracking-tight">Spending Summary</h2>
              <span className="material-symbols-outlined text-[#cbc3d9]">payments</span>
            </div>
            <div className="h-48 flex items-end justify-between gap-4 px-2">
              {[40, 65, 95, 55, 30].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className={`w-full ${i === 2 ? 'bg-[#c3f400]' : 'bg-[#353437]'} rounded-t-md`} style={{ height: `${h}%` }}></div>
                  <span className="text-[10px] text-[#cbc3d9] uppercase">{['Jun', 'Jul', 'Aug', 'Sep', 'Oct'][i]}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
