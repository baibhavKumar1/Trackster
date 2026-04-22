'use client'

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadDropzone } from "@/lib/uploadthing";

export default function BasicInfo() {
  const [tags, setTags] = useState(["Night Run", "San Francisco", "Team Relay"]);
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=2074&auto=format&fit=crop");

  return (
    <div className="flex w-full">
      <div className="w-full space-y-8 p-8">
        <form className="space-y-8">
          {/* Event Title */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400">Event Title</label>
            <input
              className="w-full rounded-2xl border border-primary/20 bg-primary/5 px-4 py-4 text-white placeholder:text-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
              placeholder="e.g. Midnight Relay SF"
              type="text"
              defaultValue="Midnight Relay SF"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400">Category</label>
            <Select defaultValue="running">
              <SelectTrigger className="w-full rounded-2xl border border-primary/20 bg-primary/5 h-auto px-4 py-4 text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10 text-white">
                <SelectItem value="running">Running</SelectItem>
                <SelectItem value="cycling">Cycling</SelectItem>
                <SelectItem value="triathlon">Triathlon</SelectItem>
                <SelectItem value="swimming">Swimming</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tags Input */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400">Tags</label>
            <div className="flex flex-wrap gap-2 p-3 rounded-2xl border border-primary/20 bg-primary/5 min-h-[64px] items-center">
              {tags.map(tag => (
                <span key={tag} className="flex items-center gap-1.5 rounded-full bg-primary text-white px-3 py-1.5 text-xs font-black uppercase tracking-wider">
                  {tag}
                  <span
                    className="material-symbols-outlined text-[14px] cursor-pointer hover:text-red-300 transition-colors"
                    onClick={() => setTags(tags.filter(t => t !== tag))}
                  >close</span>
                </span>
              ))}
              <input
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm p-0 min-w-[80px] text-white font-medium"
                placeholder="Add tag..."
                type="text"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const val = e.currentTarget.value.trim();
                    if (val && !tags.includes(val)) {
                      setTags([...tags, val]);
                      e.currentTarget.value = '';
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Cover Image Uploader */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400">Cover Image</label>
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res?.[0]) {
                  setImageUrl(res[0].url);
                }
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
              className="ut-label:text-primary ut-button:bg-primary ut-button:ut-readying:bg-primary/50 border-primary/20 bg-primary/5 rounded-3xl h-64 hover:border-primary transition-all ut-allowed-content:text-slate-500"
            />
          </div>
        </form>
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
                src={imageUrl}
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
  );
}
