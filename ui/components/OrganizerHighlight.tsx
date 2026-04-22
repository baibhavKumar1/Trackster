export default function OrganizerHighlight() {
  const features = [
    {
      title: "Smart Ticketing",
      desc: "Dynamic pricing, early bird tiers, and promo code management.",
      icon: "confirmation_number",
      color: "primary"
    },
    {
      title: "Ultra-Fast Check-in",
      desc: "Mobile app with QR scanning that works even without an internet connection.",
      icon: "qr_code_scanner",
      color: "accent"
    },
    {
      title: "Deep Analytics",
      desc: "Gain insights into attendee demographics and conversion sources.",
      icon: "bar_chart",
      color: "primary"
    }
  ];

  return (
    <section className="py-24 px-6 bg-slate-900/30 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full"></div>
          <img 
            className="relative rounded-2xl shadow-2xl border border-slate-800" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKpOpndgBpUrZZypCnZZH7lpg-G-Z-MU9fRp_5wFoKgudOfEQ_InF8GZNFskrteslyx4XYNTAak9gdsV9SMKVxwphJ1dY0zSi__Qqbyd1oOX7AtpAwX_qGPRfoodgkD9vePdaOK5N9WihrcPZmA2wYOPT-S2hWLnwQawEvLsXKeymuQv85AFU_wDWe1FLIJnVOSOIWoA3Ua2_BOEvIc93r85lwHpQNKRV4zLET4kf2e6QGpFHFNNFjLm8STXzRnd2ixUZl56slpS2u" 
            alt="Analytics dashboard"
          />
        </div>
        
        <div className="order-1 lg:order-2">
          <h2 className="text-4xl font-black mb-8 leading-tight">
            Everything you need to <span className="text-primary">scale effortlessly.</span>
          </h2>
          
          <div className="space-y-6">
            {features.map((f, i) => (
              <div key={i} className="flex gap-4">
                <div className={`size-12 rounded-xl flex items-center justify-center shrink-0 
                  ${f.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}`}
                >
                  <span className="material-symbols-outlined">{f.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">{f.title}</h4>
                  <p className="text-slate-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
