export default function CategoriesGrid() {
  const categories = [
    { name: "Music", icon: "music_note", color: "primary" },
    { name: "Tech", icon: "memory", color: "accent" },
    { name: "Food", icon: "restaurant", color: "primary" },
    { name: "Art", icon: "palette", color: "accent" },
    { name: "Sports", icon: "sports_basketball", color: "primary" },
    { name: "Wellness", icon: "self_improvement", color: "accent" },
    { name: "Business", icon: "work", color: "primary" },
    { name: "Online", icon: "videocam", color: "accent" }
  ];

  return (
    <section className="py-24 px-6 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-12 text-center">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat, i) => (
            <div 
              key={i} 
              className={`group relative flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-800 transition-all cursor-pointer border border-slate-700 
                ${cat.color === 'primary' ? 'hover:bg-primary hover:border-primary' : 'hover:bg-accent hover:border-accent'}`}
            >
              <span className={`material-symbols-outlined text-4xl mb-4 transition-colors 
                ${cat.color === 'primary' ? 'text-primary group-hover:text-white' : 'text-accent group-hover:text-slate-900'}`}
              >
                {cat.icon}
              </span>
              <p className={`font-bold text-sm transition-colors 
                ${cat.color === 'primary' ? 'group-hover:text-white' : 'group-hover:text-slate-900'}`}
              >
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
