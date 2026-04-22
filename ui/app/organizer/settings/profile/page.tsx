"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/app/lib/auth-client";
import { UploadButton } from "@/lib/uploadthing";

export default function ProfileSettings() {
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
    if (session?.user?.image) {
      setProfileImageUrl(session.user.image);
    }
  }, [session]);

  const handleSaveChanges = async () => {
    setLoading(true);
    setMessage("");
    try {
      await authClient.updateUser({
        name,
        image: profileImageUrl || undefined,
      });
      setMessage("Profile updated successfully!");
    } catch (err: any) {
      setMessage("Failed to update profile: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isPending) return <div className="p-10 text-white font-bold">Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Avatar Upload Section */}
      <section className="flex flex-col md:flex-row gap-8 items-start md:items-center bg-slate-900/40 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-800 shadow-xl bg-slate-800 flex items-center justify-center">
            {profileImageUrl ? (
              <img 
                src={profileImageUrl} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                alt="Profile" 
              />
            ) : (
              <span className="material-symbols-outlined text-4xl text-slate-600">person</span>
            )}
          </div>
          <div className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center border-4 border-slate-900 shadow-lg hover:scale-110 transition-transform overflow-hidden">
            <UploadButton
              endpoint="profileImage"
              onClientUploadComplete={(res) => {
                if (res?.[0]) {
                  setProfileImageUrl(res[0].url);
                }
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
              appearance={{
                button: "bg-transparent text-transparent w-full h-full p-0 border-none m-0 focus-within:ring-0 after:hidden before:hidden",
                allowedContent: "hidden",
                container: "w-full h-full p-0"
              }}
              content={{
                button: <span className="material-symbols-outlined text-lg text-white">photo_camera</span>
              }}
            />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-1 text-white">Profile Picture</h3>
          <p className="text-sm text-slate-500 font-medium mb-4">Upload a high-resolution JPG, PNG or GIF. Max 2MB.</p>
          <div className="flex gap-3 items-center">
            <UploadButton
              endpoint="profileImage"
              onClientUploadComplete={(res) => {
                if (res?.[0]) {
                  setProfileImageUrl(res[0].url);
                }
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
              appearance={{
                button: "bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors px-4 py-2 h-auto border-none",
                allowedContent: "hidden",
                container: "w-auto"
              }}
              content={{
                button: "Change Photo"
              }}
            />
            <button 
              onClick={() => setProfileImageUrl(null)}
              className="px-4 py-2 bg-slate-800 text-slate-300 text-sm font-bold rounded-lg hover:bg-slate-700 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      </section>

      {/* Personal Info */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-400">Display Name</label>
          <input 
            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white" 
            placeholder="Your Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text" 
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-400">Username</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">@</span>
            <input 
              className="w-full bg-slate-900/50 border border-slate-800 rounded-xl pl-8 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white" 
              placeholder="username" 
              defaultValue={session?.user?.name?.toLowerCase().replace(/\s/g, '_') || ""}
              type="text" 
            />
          </div>
        </div>
        <div className="col-span-full flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-400">Bio</label>
          <textarea 
            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none text-white" 
            placeholder="Brief description for your profile." 
            rows={2}
          ></textarea>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">Brief description for your profile. Maximum 160 characters.</p>
        </div>
      </section>

      {/* Social Links */}
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-bold mb-1 text-white">Social Profiles</h3>
          <p className="text-sm text-slate-500 font-medium">Connect your accounts to show your stats to friends.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Twitter */}
          <div className="flex items-center gap-4 bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-white border border-white/10">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
            </div>
            <div className="flex-1">
              <input className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 outline-none text-white" placeholder="Twitter Profile URL" type="text" />
            </div>
          </div>
          {/* Instagram */}
          <div className="flex items-center gap-4 bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white border border-white/10">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.351-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.353-2.612-6.78-6.98-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path></svg>
            </div>
            <div className="flex-1">
              <input className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 outline-none text-white" placeholder="Instagram Username" type="text" />
            </div>
          </div>
        </div>
      </section>

      {message && (
        <p className={`text-sm font-bold ${message.includes('successfully') ? 'text-emerald-500' : 'text-red-400'}`}>
          {message}
        </p>
      )}

      {/* Save Changes */}
      <div className="pt-6 border-t border-slate-800 flex justify-end gap-4">
        <button className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:bg-white/5 transition-colors">Discard Changes</button>       
        <button 
          onClick={handleSaveChanges}
          disabled={loading}
          className="px-8 py-2.5 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all transform active:scale-95 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
