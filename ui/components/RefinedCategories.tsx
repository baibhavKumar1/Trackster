export default function RefinedCategories() {
  return (
    <section className="py-48 px-10 bg-surface-container-lowest">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl font-headline font-bold uppercase tracking-tighter mb-4">Curated Verticals</h2>
          <p className="text-on-surface-variant font-body">Find your space within the Trackster ecosystem.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-outline-variant/10">
          <div className="bg-surface-container-lowest p-12 flex flex-col items-center group cursor-pointer hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-4xl text-secondary-fixed mb-6" data-icon="music_note">music_note</span>
            <span className="font-headline font-bold uppercase tracking-widest text-sm">After-Hours</span>
          </div>
          <div className="bg-surface-container-lowest p-12 flex flex-col items-center group cursor-pointer hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-4xl text-secondary-fixed mb-6" data-icon="restaurant">restaurant</span>
            <span className="font-headline font-bold uppercase tracking-widest text-sm">Gastronomy</span>
          </div>
          <div className="bg-surface-container-lowest p-12 flex flex-col items-center group cursor-pointer hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-4xl text-secondary-fixed mb-6" data-icon="palette">palette</span>
            <span className="font-headline font-bold uppercase tracking-widest text-sm">Immersive Art</span>
          </div>
          <div className="bg-surface-container-lowest p-12 flex flex-col items-center group cursor-pointer hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-4xl text-secondary-fixed mb-6" data-icon="diversity_3">diversity_3</span>
            <span className="font-headline font-bold uppercase tracking-widest text-sm">Communities</span>
          </div>
          <div className="bg-surface-container-lowest p-12 flex flex-col items-center group cursor-pointer hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-4xl text-secondary-fixed mb-6" data-icon="stadium">stadium</span>
            <span className="font-headline font-bold uppercase tracking-widest text-sm">Stadiums</span>
          </div>
          <div className="bg-surface-container-lowest p-12 flex flex-col items-center group cursor-pointer hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-4xl text-secondary-fixed mb-6" data-icon="festival">festival</span>
            <span className="font-headline font-bold uppercase tracking-widest text-sm">Festivals</span>
          </div>
          <div className="bg-surface-container-lowest p-12 flex flex-col items-center group cursor-pointer hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-4xl text-secondary-fixed mb-6" data-icon="nightlife">nightlife</span>
            <span className="font-headline font-bold uppercase tracking-widest text-sm">Nightclubs</span>
          </div>
          <div className="bg-surface-container-lowest p-12 flex flex-col items-center group cursor-pointer hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-4xl text-secondary-fixed mb-6" data-icon="theater_comedy">theater_comedy</span>
            <span className="font-headline font-bold uppercase tracking-widest text-sm">Performances</span>
          </div>
        </div>
      </div>
    </section>
  )
}
