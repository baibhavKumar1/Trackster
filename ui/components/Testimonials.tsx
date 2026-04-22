export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Head of UX Seattle",
      quote: "Trackster made our annual conference completely seamless. The analytics tools gave us data we never had before.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhHNWVgJPf29-0veWNWd_vwqUeYhoHiMmH4MKLJoPIJGqUTB-7ih21E0PUSDyXn8MYZALwYk3FXpY5gb126a9JUQYlMHx1btvea5QHqH7T52BlWcFTY55hIBjA28Ro7jYSXJtE__bgw6cPM6DXZDtBvbGu4XzR8H4hC93nLCJhbGH4u9-GjwklxqX3B9NELBPdsXjbQu_o-d8OvsJb3ExbsXqfl7EZJ6XM_MV4XjBTnsbr2xS1ra9b1Df6lRrHbtRDPGiiKeMiMjmJ"
    },
    {
      name: "Marcus Thorne",
      role: "Founder, NightShift Events",
      quote: "The fastest check-in experience I've ever used. We handled 2,000 attendees in under 20 minutes.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvH1kRmwsVgyJ04NKunIElIIkS7XtgAaXi2uW5OaYqUPC_jLUhZkpuku_mrE-xjhRKCssQCGoNSwoIWqo9FP8L-W9g4viNOmNq-j4bOoxowCC50mc4FSxv7UjROscafODbOo8ReWY3InUwVugO6Yv9dS5hcSsekhHnT-aW5eWhqwhviNTunk9eOtibGDOdtPjFze7F-bCns28aGWnwx8ZciWzGdU54XHidoQZMxTQy_scH5cwmVPO2UO2GJiOcXfpuJcxfxYC7q90-",
      offset: true
    },
    {
      name: "Elena Rodriguez",
      role: "Gourmet Night Market",
      quote: "The landing page builder is incredible. Our conversion rate tripled as soon as we switched to Trackster.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLCKhoUDkr8lvZBAl9HHcrs6419Ka7b7KUGG4XHVAQwlZI-QETVQarjf0OApMCWO7cr4mUoKLjqm4SNMsll8HmRmJlfqn7b3-x47BfX4c2-f4e0WAukcR-x0BBcfNNz3FBBSjfDaqLGBnLTfxnaMu77oZJeRH68JDMBxN3iWkmAojb4zykyfm1yyrwmhG-rhaSLEr_Am0BeC2jGSOrcRNSGEfyjRWWIy1HDpWqcxYt_xMZPmY_omHx8TK7IS-xUqa8t_wuhytR8C_J"
    }
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center mb-16">Trusted by the best</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div 
            key={i} 
            className={`p-8 rounded-2xl bg-slate-800 shadow-sm hover:shadow-xl transition-shadow border border-slate-700 
              ${t.offset ? 'md:translate-y-6' : ''}`}
          >
            <div className="flex items-center gap-3 mb-6">
              <img className="rounded-full size-12 object-cover" src={t.image} alt={t.name} />
              <div>
                <p className="font-bold">{t.name}</p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </div>
            </div>
            <p className="text-slate-400 italic">&quot;{t.quote}&quot;</p>
          </div>
        ))}
      </div>
    </section>
  );
}
