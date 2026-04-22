export default function FeaturedEvents() {
  const events = [
    {
      title: "Summer Beats Festival 2024",
      date: "July 15",
      price: "$85.00",
      location: "Golden Gate Park, San Francisco",
      attendees: "+1.2k attending",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbyU99F3Wbko9dkul4AEHmCXgt3RPzlH3wS-q0SnC27S2EU8L1EG-Ps-bqd29yO6KI-iki9B6gdGlc6JpTKakq09UYuM_E1QsfMCjBF39qnGTJfljSgCiaC2_PteIRXBvcznu3UzHvySp5_R9iK-ahjew8SyXnodgjX99MvaLFjsrGwxzR-FuvL4Cx3ZEo1Zva-RCcqfYGwaY5ZSfJOkFfD6YicLKDG4ihzAeO2sAEG-goFUBcjMIeUkscTDbYPJOL1YfLwrQRn7Dn"
    },
    {
      title: "Innovate: Tech 2024",
      date: "Aug 10",
      price: "Free",
      location: "Convention Center, Palo Alto",
      attendees: "+450 attending",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8xMD1WZg7GY6cXXE8ai38Hlh_0-RlEVwimFvU-mt6O1L3jh12F4WYDboPnXC5Ou5y-v6K7cU-9JngFJS9y1G4ozcG1cuDK-jtf6C1N_ptw0-HupQdkcilCujDSi771rAhyE0CzwpMeyetNOtvSUtPhh_JXFLCcUg506yRoBwRw_XSaAnoyDgzb6QknrUhIkTJMb8vXANCeqdiwPRNzwBvp2YWxitiV7FG0WAmt81_0hrjRT3mXPlFi34TdI4aAhAou-CpNFeOoCG1"
    },
    {
      title: "Modern Art Collective",
      date: "Sep 05",
      price: "$45.00",
      location: "MoMa District, Seattle",
      attendees: "+80 attending",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPtk0-S5Tyk23kiD15qWb1rp6sJo4puPqjotl7o7MctIIscQ3rw9Et5XA2KnEbwQdTLWEmWcpwlqu3guMAF1tFt8A8zXQM7VRgVbD_snx-3dpU22uHxRasLP82igpTEjnvwIC1B_5Y1Nkb7e9boWW6Hqgp3R8hHmAiRM9zB2V9TE7BirFUAWj-csyy2Q28Yg-FkUb9ubL2gEDutBp7YUVZC7-8A01yOcDM8JfKPAdRosE1npNKbjSoQoh2BWYZvaBI6eOTVph0fynh"
    }
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-extrabold mb-4">Happening Near You</h2>
          <p className="text-slate-500">The hottest events in your city, curated just for you.</p>
        </div>
        <button className="text-primary font-bold flex items-center gap-1 hover:gap-3 transition-all">
          See all <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
      
      <div className="flex overflow-x-auto gap-8 pb-8 snap-x no-scrollbar">
        {events.map((event, i) => (
          <div key={i} className="min-w-[350px] group snap-center cursor-pointer">
            <div className="relative rounded-2xl overflow-hidden mb-5 aspect-[4/3] shadow-lg group-hover:-translate-y-2 transition-transform duration-300">
              <img className="w-full h-full object-cover" src={event.image} alt={event.title} />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 bg-slate-900/90 backdrop-blur rounded-lg text-xs font-bold uppercase tracking-tight">{event.date}</span>
                <span className="px-3 py-1 bg-accent text-slate-900 rounded-lg text-xs font-black tracking-tight">{event.price}</span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
              <span className="material-symbols-outlined text-sm">location_on</span>
              {event.location}
            </div>
            <div className="flex items-center -space-x-2">
              <div className="size-8 rounded-full border-2 border-background-dark bg-slate-800"></div>
              <div className="size-8 rounded-full border-2 border-background-dark bg-slate-700"></div>
              <div className="size-8 rounded-full border-2 border-background-dark bg-slate-600"></div>
              <span className="pl-4 text-xs font-medium text-slate-500">{event.attendees}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
