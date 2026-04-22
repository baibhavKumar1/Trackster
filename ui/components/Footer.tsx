import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-primary/20 pt-20 pb-10 px-6 overflow-hidden mt-auto">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="size-8 bg-primary rounded flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-lg">event_upcoming</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">Trackster</h2>
          </div>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            The premium standard for event management and ticketing. We empower creators to build unforgettable experiences.
          </p>
          <div className="flex gap-4">
            <a href="#" className="size-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-primary transition-colors text-slate-400 hover:text-white">      
              <span className="material-symbols-outlined text-lg">public</span>
            </a>
            <a href="#" className="size-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-primary transition-colors text-slate-400 hover:text-white">      
              <span className="material-symbols-outlined text-lg">alternate_email</span>
            </a>
            <a href="#" className="size-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-primary transition-colors text-slate-400 hover:text-white">      
              <span className="material-symbols-outlined text-lg">share</span>
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-8">Platform</h4>
          <ul className="space-y-4 text-slate-500 text-sm">
            <li><Link href="#" className="hover:text-primary transition-colors">Ticketing</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Event Promotion</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Check-in App</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Analytics</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-8">Company</h4>
          <ul className="space-y-4 text-slate-500 text-sm">
            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Partners</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Legal</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-8">Stay updated</h4>
          <p className="text-sm text-slate-500 mb-6">Weekly insights for organizers.</p>
          <form className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-slate-900 border-slate-800 rounded-xl px-4 py-2.5 text-sm w-full focus:ring-primary focus:border-primary outline-none"
            />
            <button className="bg-primary text-white p-2.5 rounded-xl hover:bg-primary/80 transition-all">
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-slate-600 text-xs">
        <p>© 2024 Trackster Platform Inc. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-slate-400 transition-colors">Cookie Settings</Link>
        </div>
      </div>
    </footer>
  );
}
