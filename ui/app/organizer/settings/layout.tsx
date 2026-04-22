import OrganizerSidebar from "@/components/organizer/Sidebar";
import Link from "next/link";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tabs = [
    { name: "Profile", href: "/organizer/settings/profile" },
    { name: "Account", href: "/organizer/settings/account" },
    { name: "Billing", href: "/organizer/settings/billing" },
    { name: "Notifications", href: "/organizer/settings/notifications" },
  ];

  return (
    <>
    <main className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
      <header className="px-8 py-6 border-b border-slate-800 bg-background-dark/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white">Settings</h2>
            <p className="text-slate-500 text-sm font-medium mt-1">Manage your account and app preferences</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-sm font-bold hover:bg-white/5 transition-all text-slate-300">
            <span className="material-symbols-outlined text-lg">visibility</span>
            View Public Profile
          </button>
        </div>

        <div className="flex gap-8 mt-8">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className="p-0 text-sm font-bold text-slate-500 hover:text-white transition-colors hover:border-primary/50"
            >
              {tab.name}
            </Link>
          ))}
        </div>
      </header>

      <div className="p-8 max-w-6xl w-full">
        {children}
      </div>
    </main>
    </>
  );
}
