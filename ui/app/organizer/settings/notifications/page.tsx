"use client";

export default function NotificationSettings() {
  const categories = [
    {
      title: "Email Notifications",
      description: "Receive updates via your primary email address.",
      settings: [
        { label: "New Registrations", desc: "Notify me when someone registers for my event.", defaultChecked: true },
        { label: "Event Updates", desc: "Notify me about important changes to my events.", defaultChecked: true },
        { label: "Marketing", desc: "Receive tips and tricks for successful events.", defaultChecked: false },
      ]
    },
    {
      title: "Push Notifications",
      description: "Get real-time updates on your mobile device.",
      settings: [
        { label: "Ticket Sales", desc: "Instant alert for every ticket sold.", defaultChecked: true },
        { label: "Attendee Messages", desc: "When an attendee asks a question.", defaultChecked: true },
        { label: "Daily Summary", desc: "A wrap-up of your event performance.", defaultChecked: false },
      ]
    }
  ];

  return (
    <div className="space-y-6">

      {categories.map((category, idx) => (
        <section key={idx} className="space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white">{category.title}</h3>
            <p className="text-sm text-slate-500 font-medium">{category.description}</p>
          </div>
          <div className="space-y-4">
            {category.settings.map((setting, sIdx) => (
              <div key={sIdx} className="flex items-start justify-between p-4 rounded-xl hover:bg-white/5 transition-all">
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm font-bold text-white">{setting.label}</label>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{setting.desc}</p>
                </div>
                <div className="relative inline-flex items-center cursor-pointer mt-1">
                  <input defaultChecked={setting.defaultChecked} className="sr-only peer" type="checkbox" />
                  <div className="w-11 h-6 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-slate-500 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary peer-checked:after:bg-white"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="pt-6 border-t border-slate-800 flex justify-end gap-4">
        <button className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:bg-white/5 transition-colors">Reset Defaults</button>       
        <button className="px-8 py-2.5 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all transform active:scale-95">Save Preferences</button>
      </div>
    </div>
  );
}
