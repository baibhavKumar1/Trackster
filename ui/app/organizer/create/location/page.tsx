'use client';

import React, { useState, useMemo } from 'react';
import { format, differenceInMinutes, parse } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";

export default function LocationAndDatePage() {
  const [date, setDate] = useState<Date | undefined>(new Date(2024, 9, 15)); // Oct 15, 2024 as per initial static UI
  const [startTime, setStartTime] = useState("07:00 PM");
  const [endTime, setEndTime] = useState("11:30 PM");
  const [isOnline, setIsOnline] = useState(false);
  const [address, setAddress] = useState("123 Creator Lane, San Francisco, CA");

  // Helper to calculate duration
  const durationText = useMemo(() => {
    try {
      const start = parse(startTime, 'hh:mm aa', new Date());
      let end = parse(endTime, 'hh:mm aa', new Date());
      
      // If end time is before start time, assume it's next day
      if (end < start) {
        end = new Date(end.getTime() + 24 * 60 * 60 * 1000);
      }
      
      const diffMinutes = differenceInMinutes(end, start);
      const hours = Math.floor(diffMinutes / 60);
      const mins = diffMinutes % 60;
      
      let text = '';
      if (hours > 0) text += `${hours} hour${hours > 1 ? 's' : ''} `;
      if (mins > 0) text += `${mins} min${mins > 1 ? 's' : ''}`;
      return text || '0 mins';
    } catch (e) {
      return '4 hours 30 mins'; // fallback
    }
  }, [startTime, endTime]);

  return (
    <div className="flex w-full">
      <div className="w-full space-y-8 p-6 lg:p-8">
        <div className="space-y-10">
          <section className="space-y-4">
            <div className="flex items-center gap-2 mb-2 text-white">
              <span className="material-symbols-outlined text-primary">calendar_month</span>
              <h3 className="text-lg font-bold">Select Date & Time</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl border border-slate-200 dark:border-primary/10 flex justify-center w-[440px]">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border-0 w-full text-white bg-transparent"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-500">Start Time</label>
                  <Select value={startTime} onValueChange={setStartTime}>
                    <SelectTrigger className="w-full bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-primary/10 rounded-lg px-4 py-6 h-auto focus:ring-2 focus:ring-primary/50 outline-none text-white">
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/10 text-white">
                      <SelectItem value="09:00 AM">09:00 AM</SelectItem>
                      <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                      <SelectItem value="02:00 PM">02:00 PM</SelectItem>
                      <SelectItem value="07:00 PM">07:00 PM</SelectItem>
                      <SelectItem value="08:00 PM">08:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-500">End Time</label>
                  <Select value={endTime} onValueChange={setEndTime}>
                    <SelectTrigger className="w-full bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-primary/10 rounded-lg px-4 py-6 h-auto focus:ring-2 focus:ring-primary/50 outline-none text-white">
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/10 text-white">
                      <SelectItem value="10:00 PM">10:00 PM</SelectItem>
                      <SelectItem value="11:30 PM">11:30 PM</SelectItem>
                      <SelectItem value="12:00 AM">12:00 AM</SelectItem>
                      <SelectItem value="01:00 AM">01:00 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg flex items-center gap-3">
                  <span className="material-symbols-outlined text-accent">info</span>
                  <p className="text-xs font-medium text-accent">Event duration: {durationText}</p>
                </div>
              </div>
            </div>
          </section>
          <section className="space-y-6 pt-6 border-t border-slate-200 dark:border-primary/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <h3 className="text-lg font-bold">Venue Details</h3>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <span className="mr-3 text-sm font-medium text-slate-500">Online Event</span>
                <div className="relative w-11 h-6 bg-slate-200 dark:bg-slate-800 rounded-full peer">
                  <input 
                    className="sr-only peer" 
                    type="checkbox" 
                    checked={isOnline}
                    onChange={(e) => setIsOnline(e.target.checked)}
                  />
                  <div className="absolute top-[2px] left-[2px] bg-white border-slate-300 border rounded-full h-5 w-5 transition-all peer-checked:bg-primary peer-checked:translate-x-full peer-checked:border-primary"></div>
                </div>
              </label>
            </div>
            <div className="relative">
              <label className="block text-sm font-semibold mb-2 text-slate-500">
                {isOnline ? "Meeting Link" : "Search Address"}
              </label>
              <div className="relative group">
                <input 
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-primary/10 rounded-lg pl-10 pr-4 py-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all text-white" 
                  placeholder={isOnline ? "Enter meeting URL..." : "Start typing address..."}
                  type="text" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <span className="material-symbols-outlined absolute left-3 top-4 text-slate-400">
                  {isOnline ? "link" : "search"}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <aside className="border-l border-primary/10 bg-background-dark/30 p-8 hidden xl:block overflow-y-auto">
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
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                  {date ? format(date, 'MMMM d, yyyy') : 'Set Date'}
                </span>
                <span className="h-1 w-1 rounded-full bg-slate-700"></span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{startTime}</span>
              </div>
              <h4 className="text-xl font-bold leading-tight text-white mb-2">Midnight Relay SF</h4>
              <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 font-medium">
                <span className="material-symbols-outlined text-sm text-primary">
                  {isOnline ? "videocam" : "location_on"}
                </span>
                <span>{isOnline ? "Online Event" : (address || "Location TBD")}</span>
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
  );
}
