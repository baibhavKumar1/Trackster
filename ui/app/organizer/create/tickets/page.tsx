'use client';

import OrganizerSidebar from '@/components/organizer/Sidebar';
import React, { useState } from 'react';

interface TicketTier {
  id: number;
  name: string;
  description: string;
  price: number | string;
  quantity: number | string;
  startDate: string;
  endDate: string;
}

export default function DemoTicketSetupPage() {
  const [pricingStrategy, setPricingStrategy] = useState<'paid' | 'free' | 'donation'>('paid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [ticketTiers, setTicketTiers] = useState<TicketTier[]>([
    {
      id: 1,
      name: 'Standard Entry',
      description: 'Regular admission to the main event areas.',
      price: 49.00,
      quantity: 500,
      startDate: '2023-11-01',
      endDate: '2023-12-20'
    }
  ]);

  const defaultForm = {
    name: '',
    description: '',
    price: '',
    quantity: '',
    startDate: '',
    endDate: ''
  };

  const [form, setForm] = useState(defaultForm);

  const handlePricingStrategyChange = (strategy: 'paid' | 'free' | 'donation') => {
    setPricingStrategy(strategy);
    if (strategy === 'free') {
      setForm(prev => ({ ...prev, price: '0' }));
    }
  };

  const openModal = (tier: TicketTier | null = null) => {
    if (tier) {
      setEditingId(tier.id);
      setForm({
        name: tier.name,
        description: tier.description,
        price: tier.price.toString(),
        quantity: tier.quantity.toString(),
        startDate: tier.startDate,
        endDate: tier.endDate
      });
    } else {
      setEditingId(null);
      setForm({ ...defaultForm, startDate: new Date().toISOString().split('T')[0] });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveTier = () => {
    if (!form.name) return alert('Tier name is required');

    if (editingId) {
      setTicketTiers(prev => prev.map(t => t.id === editingId ? { ...t, ...form, id: editingId } : t));
    } else {
      setTicketTiers(prev => [...prev, { ...form, id: Date.now() }]);
    }
    closeModal();
  };

  const deleteTier = (id: number) => {
    if (confirm('Are you sure you want to delete this ticket tier?')) {
      setTicketTiers(prev => prev.filter(t => t.id !== id));
    }
  };

  return (
    <div className="flex overflow-hidden text-slate-900 dark:text-slate-100  antialiased">
      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-hidden">
        <div className="max-w-8xl flex w-full">
          <div className='p-8'>
            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Settings/Info */}
              <div className="lg:col-span-1 space-y-6">
                <div className="p-6 bg-white dark:bg-[#241b31] rounded-xl border border-slate-200 dark:border-[#3a2d4f]">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#bef264]">info</span>
                    Pricing Strategy
                  </h4>
                  <div className="space-y-4">
                    <label className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${pricingStrategy === 'paid' ? 'border-[#7c3bed]/20 bg-[#7c3bed]/5' : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                      <input
                        className="mt-1 text-[#7c3bed] focus:ring-[#7c3bed] bg-transparent"
                        name="pricing"
                        type="radio"
                        value="paid"
                        checked={pricingStrategy === 'paid'}
                        onChange={() => handlePricingStrategyChange('paid')}
                      />
                      <div>
                        <p className="text-sm font-bold">Paid Tickets</p>
                        <p className="text-xs text-slate-500">Standard ticket sales with custom prices.</p>
                      </div>
                    </label>
                    <label className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${pricingStrategy === 'free' ? 'border-[#7c3bed]/20 bg-[#7c3bed]/5' : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                      <input
                        className="mt-1 text-[#7c3bed] focus:ring-[#7c3bed] bg-transparent"
                        name="pricing"
                        type="radio"
                        value="free"
                        checked={pricingStrategy === 'free'}
                        onChange={() => handlePricingStrategyChange('free')}
                      />
                      <div>
                        <p className="text-sm font-bold">Free Event</p>
                        <p className="text-xs text-slate-500">Registration is free for all attendees.</p>
                      </div>
                    </label>
                    <label className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${pricingStrategy === 'donation' ? 'border-[#7c3bed]/20 bg-[#7c3bed]/5' : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                      <input
                        className="mt-1 text-[#7c3bed] focus:ring-[#7c3bed] bg-transparent"
                        name="pricing"
                        type="radio"
                        value="donation"
                        checked={pricingStrategy === 'donation'}
                        onChange={() => handlePricingStrategyChange('donation')}
                      />
                      <div>
                        <p className="text-sm font-bold">Donation Based</p>
                        <p className="text-xs text-slate-500">Attendees pay what they want.</p>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="p-6 bg-[#bef264]/10 rounded-xl border border-[#bef264]/20">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest mb-2">Pro Tip</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">Early bird tickets usually sell 3x faster. Consider adding a limited time tier!</p>
                </div>
              </div>

              {/* Main Column: Ticket Tiers List */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">Ticket Tiers</h3>
                  <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 bg-[#7c3bed] text-white px-4 py-2 rounded-lg font-bold text-sm hover:brightness-110 transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    Add Ticket Tier
                  </button>
                </div>

                {/* Tier Cards */}
                {ticketTiers.map((tier) => (
                  <div key={tier.id} className="group relative overflow-hidden bg-white dark:bg-[#241b31] border border-slate-200 dark:border-[#3a2d4f] rounded-xl shadow-sm hover:shadow-md transition-shadow mb-4">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-48 h-32 md:h-auto bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0">
                        <div className="w-full h-full bg-gradient-to-br from-[#7c3bed]/40 to-[#bef264]/40 flex items-center justify-center">
                          <span className="material-symbols-outlined text-4xl text-white/50">confirmation_number</span>
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2 py-0.5 bg-[#bef264] text-slate-900 text-[10px] font-bold uppercase rounded leading-tight">On Sale</span>
                              <h4 className="text-lg font-bold">{tier.name}</h4>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{tier.description || 'No description provided.'}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-black text-[#7c3bed]">
                              {pricingStrategy === 'free' ? 'FREE' : (tier.price ? '$' + parseFloat(tier.price.toString()).toFixed(2) : '$0.00')}
                            </p>
                            <p className="text-xs text-slate-400">per ticket</p>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-y-3 items-center justify-between">
                          <div className="flex gap-6">
                            <div className="flex flex-col">
                              <span className="text-[10px] uppercase font-bold text-slate-400">Capacity</span>
                              <span className="text-sm font-semibold">{tier.quantity} Tickets</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] uppercase font-bold text-slate-400">Sales End</span>
                              <span className="text-sm font-semibold">{tier.endDate || 'No end date'}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => openModal(tier)}
                              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                              <span className="material-symbols-outlined text-[20px]">edit</span>
                            </button>
                            <button
                              onClick={() => deleteTier(tier.id)}
                              className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            >
                              <span className="material-symbols-outlined text-[20px]">delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Placeholder/Empty State */}
                {ticketTiers.length === 0 && (
                  <div className="border-2 border-dashed border-slate-200 dark:border-[#3a2d4f] rounded-xl p-8 flex flex-col items-center justify-center text-center opacity-60">
                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-[#241b31] flex items-center justify-center mb-3">
                      <span className="material-symbols-outlined text-slate-400">local_activity</span>
                    </div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Add tiers like Early Bird, Regular or VIP to start selling.</p>
                  </div>
                )}

                {ticketTiers.length > 0 && (
                  <div className="border-2 border-dashed border-slate-200 dark:border-[#3a2d4f] rounded-xl p-8 flex flex-col items-center justify-center text-center opacity-60">
                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-[#241b31] flex items-center justify-center mb-3">
                      <span className="material-symbols-outlined text-slate-400">local_activity</span>
                    </div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Add more tiers like VIP or Early Bird</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Right Sidebar: Live Preview */}
          <aside className="h-[89vh] border-l border-primary/10 bg-background-dark/30 p-8 hidden xl:block overflow-y-auto">
            <div className="sticky top-0">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Live Preview</h3>
                <span className="flex items-center gap-1.5 text-[10px] font-black text-accent border border-accent/20 px-2 py-0.5 rounded-full bg-accent/5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"></span> LIVE
                </span>
              </div>
              {/* Preview Card */}
              <div className="overflow-hidden rounded-3xl bg-slate-900 border border-primary/20 shadow-2xl shadow-black/40">
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10"></div>
                  <img
                    className="h-full w-full object-cover transition-transform hover:scale-110 duration-700"
                    src="https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=2074&auto=format&fit=crop"
                    alt="Preview"
                  />
                  <div className="absolute right-4 top-4 z-20 rounded-lg bg-accent px-2 py-1 text-[10px] font-black text-black uppercase tracking-tighter">
                    RUNNING
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">June 14, 2024</span>
                    <span className="h-1 w-1 rounded-full bg-slate-700"></span>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">10:00 PM</span>
                  </div>
                  <h4 className="text-xl font-bold leading-tight text-white mb-2">Midnight Relay SF</h4>
                  <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 font-medium">
                    <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-8 w-8 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                        </div>
                      ))}
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-900 bg-slate-800 text-[10px] font-black text-slate-400">+12</div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-black text-slate-500 tracking-tighter">From</p>
                      <p className="text-xl font-black text-white tracking-tighter">$45.00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 rounded-2xl bg-accent/5 p-5 border border-accent/10 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-accent text-xl">lightbulb</span>
                  <div>
                    <p className="text-sm font-bold text-accent">Pro Tip</p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed font-medium">High-quality cover images increase event views by up to 45%.</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Modal Overlay (Add/Edit Ticket Tier) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm modal-overlay">
          <div className="bg-white dark:bg-[#241b31] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-[#3a2d4f] modal-content animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-[#3a2d4f] flex items-center justify-between bg-slate-50 dark:bg-[#171121]/50">
              <h3 className="text-lg font-bold">{editingId ? 'Edit Ticket Tier' : 'Add Ticket Tier'}</h3>
              <button onClick={closeModal} className="p-2 text-slate-400 hover:bg-slate-200 dark:hover:bg-[#241b31] rounded-full transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Tier Name</label>
                <input
                  className="w-full bg-slate-50 dark:bg-[#171121] border-slate-200 dark:border-[#3a2d4f] rounded-lg focus:ring-[#7c3bed] focus:border-[#7c3bed] text-sm font-medium p-3 outline-none"
                  placeholder="e.g. Early Bird, VIP Experience"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {pricingStrategy !== 'free' && (
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      {pricingStrategy === 'donation' ? 'Suggested Donation ($)' : 'Price ($)'}
                    </label>
                    <input
                      placeholder={pricingStrategy === 'donation' ? 'Optional' : '0.00'}
                      className="w-full bg-slate-50 dark:bg-[#171121] border-slate-200 dark:border-[#3a2d4f] rounded-lg focus:ring-[#7c3bed] focus:border-[#7c3bed] text-sm font-medium p-3 outline-none"
                      step="0.01"
                      type="number"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                    />
                  </div>
                )}
                <div className={`${pricingStrategy === 'free' ? 'col-span-2' : ''} space-y-2`}>
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Quantity / Capacity</label>
                  <input
                    className="w-full bg-slate-50 dark:bg-[#171121] border-slate-200 dark:border-[#3a2d4f] rounded-lg focus:ring-[#7c3bed] focus:border-[#7c3bed] text-sm font-medium p-3 outline-none"
                    placeholder="100"
                    type="number"
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Sales Start Date</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-sm">calendar_month</span>
                    <input
                      className="w-full bg-slate-50 dark:bg-[#171121] border-slate-200 dark:border-[#3a2d4f] rounded-lg focus:ring-[#7c3bed] focus:border-[#7c3bed] text-sm font-medium p-3 pl-10 outline-none"
                      type="date"
                      value={form.startDate}
                      onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Sales End Date</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-sm">event_busy</span>
                    <input
                      className="w-full bg-slate-50 dark:bg-[#171121] border-slate-200 dark:border-[#3a2d4f] rounded-lg focus:ring-[#7c3bed] focus:border-[#7c3bed] text-sm font-medium p-3 pl-10 outline-none"
                      type="date"
                      value={form.endDate}
                      onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Description (Optional)</label>
                <textarea
                  className="w-full bg-slate-50 dark:bg-[#171121] border-slate-200 dark:border-[#3a2d4f] rounded-lg focus:ring-[#7c3bed] focus:border-[#7c3bed] text-sm font-medium p-3 outline-none"
                  placeholder="What's included in this tier?"
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                ></textarea>
              </div>
            </div>
            <div className="px-6 py-5 bg-slate-50 dark:bg-[#171121]/50 border-t border-slate-100 dark:border-[#3a2d4f] flex gap-3">
              <button
                onClick={saveTier}
                className="flex-1 bg-[#7c3bed] hover:bg-[#7c3bed]/90 text-white py-3 rounded-xl font-bold transition-all"
              >
                {editingId ? 'Update Tier' : 'Create Tier'}
              </button>
              <button
                onClick={closeModal}
                className="px-6 py-3 border border-slate-200 dark:border-[#3a2d4f] hover:bg-slate-100 dark:hover:bg-[#241b31] rounded-xl font-bold text-sm transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
