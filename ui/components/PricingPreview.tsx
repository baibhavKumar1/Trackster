export default function PricingPreview() {
  const plans = [
    {
      name: "Essential",
      price: "$0",
      features: ["100 tickets / month", "Basic Analytics", "Community Support"],
      cta: "Get Started",
      featured: false
    },
    {
      name: "Pro",
      price: "$49",
      features: ["Unlimited Free Tickets", "Advanced Marketing Tools", "Custom Landing Pages", "2.5% per paid ticket"],
      cta: "Go Pro Now",
      featured: true
    },
    {
      name: "Business",
      price: "$199",
      features: ["Unlimited Everything", "API Access & Webhooks", "Dedicated Account Manager"],
      cta: "Contact Sales",
      featured: false
    }
  ];

  return (
    <section className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute -top-40 -left-40 size-96 bg-primary/20 blur-[150px] rounded-full"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl font-extrabold text-center mb-16">Simple, transparent pricing</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`p-8 rounded-2xl border flex flex-col transition-all duration-300
                ${plan.featured 
                  ? 'bg-primary border-primary scale-105 shadow-2xl shadow-primary/30 relative' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-slate-900 text-xs font-black rounded-full">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-4xl font-black mb-6">{plan.price}<span className={`text-sm font-normal ${plan.featured ? 'text-white/70' : 'text-slate-400'}`}>/mo</span></p>
              
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <span className="material-symbols-outlined text-accent">check_circle</span>
                    {f}
                  </li>
                ))}
              </ul>
              
              <button 
                className={`w-full py-3 rounded-xl font-bold transition-all
                  ${plan.featured 
                    ? 'bg-white text-primary hover:scale-105' 
                    : 'border border-white/20 hover:bg-white hover:text-slate-900'}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
