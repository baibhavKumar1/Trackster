export default function RefinedFooter() {
  return (
    <footer className="bg-zinc-950 w-full pt-24 pb-12 flex flex-col items-center justify-center px-8 border-t border-zinc-900/50">
      <div className="max-w-[1440px] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
        <div>
          <span className="text-4xl font-black text-zinc-800 mb-8 block font-headline">Trackster</span>
          <p className="text-zinc-500 font-body leading-relaxed max-w-xs">
            The premium editorial engine for global event discovery and management.
          </p>
        </div>
        <div>
          <h4 className="text-white font-headline font-bold uppercase tracking-widest mb-8">Navigation</h4>
          <ul className="space-y-4">
            <li><a className="text-zinc-500 hover:text-zinc-200 font-manrope text-sm tracking-wide transition-all duration-300 hover:underline decoration-lime-400 underline-offset-4" href="#">Events</a></li>
            <li><a className="text-zinc-500 hover:text-zinc-200 font-manrope text-sm tracking-wide transition-all duration-300 hover:underline decoration-lime-400 underline-offset-4" href="#">Venues</a></li>
            <li><a className="text-zinc-500 hover:text-zinc-200 font-manrope text-sm tracking-wide transition-all duration-300 hover:underline decoration-lime-400 underline-offset-4" href="#">Members</a></li>
            <li><a className="text-zinc-500 hover:text-zinc-200 font-manrope text-sm tracking-wide transition-all duration-300 hover:underline decoration-lime-400 underline-offset-4" href="#">About</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-headline font-bold uppercase tracking-widest mb-8">Company</h4>
          <ul className="space-y-4">
            <li><a className="text-zinc-500 hover:text-zinc-200 font-manrope text-sm tracking-wide transition-all duration-300 hover:underline decoration-lime-400 underline-offset-4" href="#">Privacy</a></li>
            <li><a className="text-zinc-500 hover:text-zinc-200 font-manrope text-sm tracking-wide transition-all duration-300 hover:underline decoration-lime-400 underline-offset-4" href="#">Terms</a></li>
            <li><a className="text-zinc-500 hover:text-zinc-200 font-manrope text-sm tracking-wide transition-all duration-300 hover:underline decoration-lime-400 underline-offset-4" href="#">Contact</a></li>
            <li><a className="text-zinc-500 hover:text-zinc-200 font-manrope text-sm tracking-wide transition-all duration-300 hover:underline decoration-lime-400 underline-offset-4" href="#">Press</a></li>
            <li><a className="text-zinc-500 hover:text-zinc-200 font-manrope text-sm tracking-wide transition-all duration-300 hover:underline decoration-lime-400 underline-offset-4" href="#">Careers</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-headline font-bold uppercase tracking-widest mb-8">Newsletter</h4>
          <div className="relative">
            <input className="w-full bg-zinc-900 border-none rounded-full px-6 py-4 text-white font-body focus:ring-2 focus:ring-secondary-fixed" placeholder="Email Address" type="email" />
            <button className="absolute right-2 top-2 w-10 h-10 bg-secondary-fixed text-on-secondary-fixed rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
      <div className="text-zinc-500 font-manrope text-sm tracking-wide uppercase">
        © 2024 Trackster EDITORIAL. ALL RIGHTS RESERVED.
      </div>
    </footer>
  )
}
