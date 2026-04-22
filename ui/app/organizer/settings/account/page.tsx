"use client";

import { authClient } from "@/app/lib/auth-client";

export default function AccountSettings() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-2xl font-bold tracking-tight">Account Settings</h2>
        <p className="text-slate-500 text-sm mt-1 font-medium">Manage your account details and security preferences.</p>
      </div>

      {/* Email Address Section */}
      <div className="flex flex-col gap-4 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-slate-400">Email Address</label>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              <p className="text-white font-bold">{user?.email || "loading..."}</p>
              {user?.emailVerified && (
                <span className="flex items-center gap-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter border border-emerald-500/20">
                  <span className="material-symbols-outlined text-xs">verified</span>
                  Verified
                </span>
              )}
            </div>
            <button className="text-primary text-sm font-bold hover:underline">Change</button>
          </div>
        </div>
      </div>

      {/* Password Section */}
      <div className="flex flex-col gap-4 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-slate-400">Password</label>
            <p className="text-slate-500 text-xs font-medium">Last changed 3 months ago</p>
          </div>
          <button className="bg-primary hover:bg-primary/90 text-white text-sm font-bold px-4 py-2 rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">lock_reset</span>
            Change Password
          </button>
        </div>
      </div>

      {/* 2FA Section */}
      <div className="flex flex-col gap-4 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1 flex-1">
            <div className="flex items-center gap-2">
              <label className="text-sm font-bold text-slate-400">Two-Factor Authentication (2FA)</label>
              <span className="material-symbols-outlined text-primary text-sm">shield</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed font-medium mt-1">
              Secure your account by requiring an additional verification code when you log in from a new device.
            </p>
          </div>
          <div className="relative inline-flex items-center cursor-pointer mt-1">
            <input defaultChecked className="sr-only peer" type="checkbox" />
            <div className="w-11 h-6 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-slate-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary peer-checked:after:bg-white"></div>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="pt-8 border-t border-slate-800 flex flex-col gap-4">
        <h3 className="text-white text-lg font-bold">Danger Zone</h3>
        <div className="flex items-center justify-between p-6 rounded-2xl border border-red-900/20 bg-red-900/5">
          <div>
            <p className="text-white font-bold">Deactivate Account</p>
            <p className="text-slate-500 text-xs mt-1 font-medium">This will temporarily disable your profile and events.</p>
          </div>
          <button className="text-red-500 border border-red-500/30 hover:bg-red-500/10 px-4 py-2 rounded-lg text-sm font-bold transition-all">
            Deactivate
          </button>
        </div>
      </div>
    </div>
  );
}
