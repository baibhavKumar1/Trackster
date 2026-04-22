"use client";

export default function BillingSettings() {
  const invoices = [
    { date: "Sep 12, 2023", id: "TRK-2023-009", amount: "$19.99", status: "Paid" },
    { date: "Aug 12, 2023", id: "TRK-2023-008", amount: "$19.99", status: "Paid" },
    { date: "Jul 12, 2023", id: "TRK-2023-007", amount: "$19.99", status: "Paid" },
  ];

  return (
    <div className="space-y-6">
      {/* Current Plan Section */}
      <section>
        <h3 className="text-lg font-bold mb-4 text-white">Current Plan</h3>
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="size-14 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-3xl">workspace_premium</span>
              </div>
              <div className="flex flex-col">
                <p className="text-xl font-black text-white tracking-tight">Pro Plan</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1">
                  <p className="text-slate-500 text-sm font-medium">$19.99 / month</p>
                  <span className="hidden sm:block text-slate-700">•</span>
                  <p className="text-slate-500 text-sm font-medium">Next renewal: Oct 12, 2023</p>
                </div>
              </div>
            </div>
            <button className="w-full md:w-auto px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-primary/20">
              Change Plan
            </button>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Payment Methods</h3>
          <button className="flex items-center gap-2 text-primary hover:text-primary/80 font-bold text-sm transition-colors">
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Add New
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-lg bg-slate-800 flex items-center justify-center border border-white/5">
                <span className="material-symbols-outlined text-blue-500">credit_card</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Visa ending in 4242</p>
                <p className="text-xs text-slate-500 font-medium">Expires 12/26 • Primary</p>
              </div>
            </div>
            <button className="material-symbols-outlined text-slate-500 hover:text-red-500 transition-colors">delete</button>
          </div>
          <div className="p-5 rounded-2xl border border-dashed border-slate-800 bg-transparent flex items-center justify-center group cursor-pointer hover:border-primary/50 transition-all">
            <div className="flex items-center gap-2 text-slate-500 group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined">add</span>
              <p className="text-sm font-bold uppercase tracking-widest">Add payment method</p>
            </div>
          </div>
        </div>
      </section>

      {/* Invoice History */}
      <section>
        <h3 className="text-lg font-bold mb-4 text-white">Invoice History</h3>
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-slate-800">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Invoice ID</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-300">{invoice.date}</td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-500">{invoice.id}</td>
                  <td className="px-6 py-4 text-sm font-black text-white">{invoice.amount}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-tighter border border-emerald-500/20">{invoice.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center gap-1 text-primary hover:text-primary/80 text-sm font-bold transition-colors">
                      <span className="material-symbols-outlined text-[18px]">download</span>
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="mt-4 p-6 rounded-2xl border border-red-900/20 bg-red-900/5">
        <h3 className="text-lg font-bold text-red-500 mb-2">Cancel Subscription</h3>
        <p className="text-sm text-slate-500 font-medium mb-4">Thinking of leaving? Canceling your subscription will downgrade you to the Free plan at the end of your billing cycle.</p>   
        <button className="text-red-500 border border-red-500/30 hover:bg-red-500/10 px-4 py-2 rounded-lg text-sm font-bold transition-all">
          Cancel Pro Plan
        </button>
      </section>
    </div>
  );
}
