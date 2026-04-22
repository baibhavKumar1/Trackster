export default function HowItWorks() {
  const steps = [
    {
      title: "Create",
      desc: "Define your event, set dates, and design your perfect landing page in minutes.",
      icon: "edit_note",
      color: "primary",
      num: 1
    },
    {
      title: "Promote",
      desc: "Share your custom link across social media and use our built-in SEO tools.",
      icon: "campaign",
      color: "accent",
      num: 2
    },
    {
      title: "Manage",
      desc: "Track real-time sales, manage check-ins, and analyze audience data.",
      icon: "query_stats",
      color: "primary",
      num: 3
    }
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center mb-16">Launch in three steps</h2>
      <div className="relative grid md:grid-cols-3 gap-12">
        <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary to-accent -translate-y-16 opacity-30"></div>
        
        {steps.map((step, i) => (
          <div key={i} className="text-center group">
            <div className={`relative size-24 mx-auto mb-8 bg-slate-800 rounded-3xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:shadow-xl 
              ${step.color === 'primary' ? 'group-hover:shadow-primary/20' : 'group-hover:shadow-accent/20'}`}
            >
              <span className={`absolute -top-4 -right-4 size-10 rounded-xl flex items-center justify-center font-black text-xl 
                ${step.color === 'primary' ? 'bg-primary text-white' : 'bg-accent text-slate-900'}`}
              >
                {step.num}
              </span>
              <span className={`material-symbols-outlined text-5xl ${step.color === 'primary' ? 'text-primary' : 'text-accent'}`}>
                {step.icon}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
            <p className="text-slate-500">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
