"use client";

import OrganizerHeader from "@/components/organizer/Header";
import { UploadDropzone } from "@/lib/uploadthing";
import { useState } from "react";

export default function MediaPage() {
  const [uploads, setUploads] = useState<Array<{ url: string; name: string; size: number }>>([]);

  return (
    <main className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
      <OrganizerHeader />
      <div className="p-8 space-y-8 max-w-6xl mx-auto w-full">
        <div>
          <h1 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase">Media Storage</h1>
          <p className="text-slate-400 font-medium">Powered by UploadThing. Managed by Trackster.</p>
        </div>

        <div className="bg-slate-900/40 p-10 rounded-3xl border border-slate-800 backdrop-blur-sm">
          <UploadDropzone
            endpoint="eventMedia"
            onClientUploadComplete={(res) => {
              if (res) {
                const newUploads = res.map(file => ({
                  url: file.url,
                  name: file.name,
                  size: file.size
                }));
                setUploads(prev => [...newUploads, ...prev]);
              }
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
            className="ut-label:text-primary ut-button:bg-primary ut-button:ut-readying:bg-primary/50 border-primary/20 bg-primary/5 rounded-3xl h-64 hover:border-primary transition-all ut-allowed-content:text-slate-500"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white uppercase tracking-widest text-[11px] text-slate-500">Recently Uploaded</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {uploads.length > 0 ? (
              uploads.map((file, idx) => (
                <div key={idx} className="group relative aspect-square rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 hover:border-primary/50 transition-all">
                  <img src={file.url} alt={file.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                    <p className="text-[10px] font-bold text-white truncate">{file.name}</p>
                    <p className="text-[8px] font-black text-slate-400 uppercase">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                  <a 
                    href={file.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="absolute top-2 right-2 size-8 bg-black/50 backdrop-blur-md rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-white text-sm">open_in_new</span>
                  </a>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-800 rounded-3xl">
                <span className="material-symbols-outlined text-4xl text-slate-700 mb-2">image_not_supported</span>
                <p className="text-slate-500 text-sm font-medium">No media uploaded yet this session.</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-slate-800/50">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <span className="material-symbols-outlined text-primary mb-3">cloud_done</span>
                <h4 className="text-white font-bold mb-1">Global Delivery</h4>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">Assets are automatically served through a high-performance CDN for ultra-fast load times.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <span className="material-symbols-outlined text-accent mb-3">security</span>
                <h4 className="text-white font-bold mb-1">Secure Storage</h4>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">Your media is private by default and protected with enterprise-grade security protocols.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <span className="material-symbols-outlined text-emerald-400 mb-3">auto_fix_high</span>
                <h4 className="text-white font-bold mb-1">Auto-Optimized</h4>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">Images are processed to ensure the best balance between quality and file size.</p>
            </div>
        </div>
      </div>
    </main>
  );
}
