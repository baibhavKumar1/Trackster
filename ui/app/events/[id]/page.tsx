"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useParams, notFound } from "next/navigation";
import eventsData from "@/lib/data.json";
import Link from "next/link";

export default function EventDetail() {
  const params = useParams();
  const id = params?.id;
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [selectedTier, setSelectedTier] = useState("standard");

  const event = eventsData.find((e) => e.id === id);

  if (!event) {
    return notFound();
  }

  return (
    <main className="min-h-screen flex flex-col bg-background-dark text-slate-100">
      <Navbar />

      <div className="pt-20 pb-24">
        {/* Hero Section */}
        <section className="relative h-[614px] min-h-[400px] w-full overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: `linear-gradient(to top, #0f0914 0%, transparent 60%, rgba(0,0,0,0.4) 100%), url('${event.img}')` 
            }}
          ></div>
          <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-4 pb-12">
            <div className="space-y-4">
              <span className="bg-primary/20 backdrop-blur-md text-primary px-4 py-1.5 rounded-full text-sm font-bold border border-primary/30 inline-block">
                {event.tags}
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">{event.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-slate-200">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">calendar_today</span>
                  <span className="font-medium">{event.fullDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  <span className="font-medium">{event.fullLocation}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Meta Bar */}
            <div className="flex flex-wrap items-center justify-between p-6 bg-primary/5 rounded-2xl border border-primary/10 gap-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full overflow-hidden ring-2 ring-primary/20 bg-slate-800">
                  <img src={event.organizerImg} className="h-full w-full object-cover" alt="Organizer" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Organized by</p>
                  <p className="font-bold text-slate-100">{event.organizerName}</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-2xl font-black text-primary">{event.attendeeCount}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Attending</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors">
                    <span className="material-symbols-outlined block">share</span>
                  </button>
                  <button className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors">
                    <span className="material-symbols-outlined block">favorite</span>
                  </button>
                </div>
              </div>
            </div>

            {/* About Section */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                About the Event
              </h2>
              <div className="prose prose-invert max-w-none text-slate-400 leading-relaxed space-y-4">
                <p className="text-lg text-slate-300 font-medium">{event.about}</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0 mt-6">
                  {[
                    { title: "3-Runner Teams", desc: "Split the distance or go solo." },
                    { title: "Illuminated Route", desc: "Safe, well-lit trails with LED markers." },
                    { title: "Premium Swag", desc: "Exclusive tech-tees and finisher medals." },
                    { title: "After-Party", desc: "Live DJ and healthy catering at the finish line." }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                      <span className="material-symbols-outlined text-primary">check_circle</span>
                      <span><strong>{item.title}</strong> — {item.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Schedule Section */}
            <section>
              <h2 className="text-2xl font-bold mb-8">Event Timeline</h2>
              <div className="relative border-l-2 border-primary/20 ml-4 space-y-12">
                {[
                  { time: "07:00 PM", title: "Check-in & Gear Drop", desc: "Collect your race bib, timing chip, and premium swag bag at the welcome center.", active: true },
                  { time: "08:30 PM", title: "Race Start", desc: "The first wave of runners begins. Pace groups will be organized by expected finish time.", active: false },
                  { time: "11:00 PM", title: "Award Ceremony & After-Party", desc: "Celebration at the Music Concourse with live music and podium announcements.", active: false }
                ].map((step, idx) => (
                  <div key={idx} className="relative pl-10">
                    <div className={`absolute -left-[11px] top-0 h-5 w-5 rounded-full ${step.active ? 'bg-primary ring-4 ring-primary/20' : 'bg-slate-700 ring-4 ring-slate-800'}`}></div>
                    <p className="text-primary font-bold">{step.time}</p>
                    <h4 className="text-lg font-bold text-slate-100">{step.title}</h4>
                    <p className="text-slate-400">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  { q: "Where can I park my vehicle?", a: "Free parking is available at the Ocean Beach parking lot with shuttle services running every 15 minutes to the start line." },
                  { q: "What gear is mandatory?", a: "Headlamps are mandatory for all night sections. We also recommend reflective clothing and a hydration pack." },
                  { q: "Can I transfer my registration?", a: "Yes, registration transfers are permitted up to 48 hours before the event through your Trackster dashboard." }
                ].map((faq, idx) => (
                  <details key={idx} className="group bg-slate-800/30 rounded-xl border border-slate-700/50 overflow-hidden" open={idx === 0}>
                    <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-bold text-slate-100">
                      {faq.q}
                      <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                    </summary>
                    <div className="p-5 pt-0 text-slate-400 border-t border-slate-700/30">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Location and Organizer Details (Moved from Sidebar) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {/* Details & Map Card */}
              <div className="bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden backdrop-blur-md">
                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">calendar_month</span>
                    </div>
                    <div>
                      <p className="font-bold">{event.fullDate}</p>
                      <p className="text-sm text-slate-400">Starts 08:30 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">location_on</span>
                    </div>
                    <div>
                      <p className="font-bold">{event.location.split(',')[0]}</p>
                      <p className="text-sm text-slate-400">{event.location.split(',')[1]?.trim() || ''}</p>
                    </div>
                  </div>
                </div>
                <div className="h-48 w-full relative group cursor-pointer overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?q=80&w=2033&auto=format&fit=crop" className="h-full w-full object-cover transition-transform group-hover:scale-110" alt="Map" />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors"></div>
                  <a 
                    className="absolute bottom-4 right-4 z-20 bg-white text-background-dark px-4 py-2 rounded-lg text-sm font-bold shadow-lg hover:bg-slate-100 transition-colors flex items-center gap-2" 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${event.lat},${event.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="material-symbols-outlined text-sm">directions</span>
                    Get Directions
                  </a>                </div>
              </div>

              {/* Organizer Profile Card */}
              <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 text-center backdrop-blur-md flex flex-col justify-center">
                <div className="h-20 w-20 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-primary/10 bg-slate-800">
                  <img src={event.organizerImg} className="w-full h-full object-cover" alt="Organizer" />
                </div>
                <h4 className="text-lg font-bold">{event.organizerName}</h4>
                <p className="text-slate-400 text-sm mb-4">Dedicated to bringing premium athletic experiences to the community since 2015.</p>
                <div className="flex items-center justify-center gap-8 mb-6">
                  <div>
                    <p className="font-black text-primary">15k</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Followers</p>
                  </div>
                  <div>
                    <p className="font-black text-primary">142</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Events</p>
                  </div>
                </div>
                <button className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2.5 rounded-lg font-bold transition-all border border-slate-600">
                  Follow Organizer
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            {/* Ticket Selector Card (Now alone for high focus) */}
            <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 sticky top-24 shadow-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold mb-6">Select Tickets</h3>
              <div className="space-y-4 mb-8">
                <div onClick={() => setSelectedTier("standard")} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedTier === 'standard' ? 'border-primary bg-primary/10' : 'border-slate-700 hover:border-primary/50'}`}>
                  <div>
                    <p className="font-bold">Standard Entry</p>
                    <p className="text-xs text-slate-400">General admission & tee</p>
                  </div>
                  <p className="text-lg font-bold text-primary">$45</p>
                </div>
                <div onClick={() => setSelectedTier("vip")} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedTier === 'vip' ? 'border-primary bg-primary/10' : 'border-slate-700 hover:border-primary/50'}`}>
                  <div>
                    <p className="font-bold">VIP Experience</p>
                    <p className="text-xs text-slate-400">Priority start & lounge access</p>
                  </div>
                  <p className="text-lg font-bold text-primary">$120</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-bold">Quantity</span>
                <div className="flex items-center gap-4 bg-slate-900 rounded-lg px-3 py-1 border border-slate-700">
                  <button onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))} className="text-primary font-bold text-xl hover:text-primary/70">−</button>
                  <span className="font-bold w-6 text-center">{ticketQuantity}</span>
                  <button onClick={() => setTicketQuantity(ticketQuantity + 1)} className="text-primary font-bold text-xl hover:text-primary/70">+</button>
                </div>
              </div>
              <div className="border-t border-slate-700 pt-6 space-y-2 mb-6">
                <div className="flex justify-between text-slate-400 text-sm">
                  <span>Subtotal</span>
                  <span>${(selectedTier === 'standard' ? 45 : 120) * ticketQuantity}.00</span>
                </div>
                <div className="flex justify-between text-slate-400 text-sm">
                  <span>Service Fee</span>
                  <span>$2.50</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-slate-100 pt-2">
                  <span>Total</span>
                  <span>${(selectedTier === 'standard' ? 45 : 120) * ticketQuantity + 2.50}.50</span>
                </div>
              </div>
              <button className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-extrabold text-lg transition-all shadow-xl shadow-primary/30">
                Get Tickets
              </button>
              <p className="text-center text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-4">No refunds after Oct 15</p>
            </div>
          </div>
        </div>

        {/* Related Events */}
        <section className="max-w-7xl mx-auto px-4 mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">More Racing Events</h2>
            <Link href="/discover" className="text-primary font-bold hover:underline flex items-center gap-1">
              View all <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar -mx-4 px-4">
            {eventsData.filter(e => e.id !== event.id).map((event, idx) => (
              <Link key={event.id} href={`/events/${event.id}`} className="min-w-[300px] bg-slate-800/30 border border-slate-700 rounded-2xl overflow-hidden hover:border-primary/40 transition-all group cursor-pointer">
                <div className="h-40 overflow-hidden">
                  <img src={event.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={event.title} />
                </div>
                <div className="p-4">
                  <p className="text-xs text-primary font-bold mb-1">{event.date}</p>
                  <h5 className="font-bold text-lg mb-2 text-white">{event.title}</h5>
                  <p className="text-slate-400 text-sm line-clamp-1">A scenic route through the heart of the city.</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
