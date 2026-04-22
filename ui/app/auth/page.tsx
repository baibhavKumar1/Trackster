'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/app/lib/auth-client';

export default function AuthOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: 'sign-in',
      });
      setCurrentStep(2);
    } catch (err: any) {
      setError(err.message || 'Failed to send verification email');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async () => {
    setLoading(true);
    setError('');
    
    try {
      const otpString = otp.join('');
      const { data, error } = await authClient.signIn.emailOtp({
        email,
        otp: otpString,
      });

      if (error) throw error;

      if (data?.user && !data.user.name) {
        setCurrentStep(3);
      } else {
        router.push('/organizer/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid or expired code');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      await authClient.updateUser({
        name: name,
      });
      router.push('/organizer/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-surface font-body selection:bg-secondary-fixed selection:text-on-secondary-fixed min-h-screen flex items-center justify-center bg-animate p-6">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-0">
        <div className="absolute top-[10%] left-[5%] w-[40rem] h-[40rem] bg-primary/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[5%] right-[0%] w-[50rem] h-[50rem] bg-secondary-fixed/5 blur-[120px] rounded-full"></div>
      </div>

      {/* Auth Container */}
      <main className="w-full max-w-[480px] z-10">
        
        {/* Step 1: Email Entry */}
        {currentStep === 1 && (
          <div className="frosted-glass rounded-lg p-10 flex flex-col items-center animate-in fade-in zoom-in duration-300">
            {/* Brand Logo */}
            <div className="mb-12">
              <span className="text-3xl font-headline font-bold tracking-tighter text-slate-100">Trackster</span>
            </div>
            <div className="w-full text-center mb-10">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-on-surface mb-2">Welcome to Trackster.</h1>
              <p className="font-body text-on-surface-variant">Enter your email to get started.</p>
            </div>
            {/* Input Group */}
            <form onSubmit={handleEmailSubmit} className="w-full space-y-4">
              <div className="relative group">
                <input 
                  required
                  className="w-full h-14 px-6 bg-surface-container-highest border-none rounded-lg focus:ring-0 focus:ring-offset-0 placeholder:text-outline text-on-surface transition-all" 
                  placeholder="name@example.com" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-focus-within:w-full bg-secondary-fixed transition-all duration-300"></div>
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-gradient-to-r from-primary to-inverse-primary text-on-primary-fixed font-bold rounded-full text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Continue'}
              </button>
              {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              <p className="text-center text-[10px] uppercase tracking-widest font-semibold text-outline-variant pt-2">No passwords, ever</p>
            </form>
            {/* OAuth Dividers */}
            <div className="w-full flex items-center gap-4 my-8">
              <div className="h-[1px] flex-1 bg-outline-variant/20"></div>
              <span className="text-xs text-outline-variant uppercase tracking-widest">Or continue with</span>
              <div className="h-[1px] flex-1 bg-outline-variant/20"></div>
            </div>
            {/* Social Auth */}
            <div className="grid grid-cols-2 gap-4 w-full">
              <button className="flex items-center justify-center gap-2 h-12 bg-surface-container-high hover:bg-surface-bright rounded-full transition-colors group">
                <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFwt_-43ah3OkMns5zfB24RA5CU7A_uePSznatkwePh9ayrmsIYeM4tNPdP8euNvAkZg13eeHYkv2_NVJ5Ty8ICWDK8-l6jlAFxmkb57BMW3gfNbH0fX-grtZ4KqCMfhS_uxBpkaSdCQSqY1bfB3UyynuL-ft4iSIUcVrME5E8jpjWmdlsJEFDwbuW1u0_ektz5siqdUyLKO_00FQjPgsXD7ZRC_763muuJ_CWClDWqQEwSwEJguUgzitGayjqvEtWvQfz4GlLqxs"/>
                <span className="font-semibold text-sm">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 h-12 bg-surface-container-high hover:bg-surface-bright rounded-full transition-colors group">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>ios</span>
                <span className="font-semibold text-sm">Apple</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: OTP State */}
        {currentStep === 2 && (
          <div className="frosted-glass rounded-lg p-10 flex flex-col items-center animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="w-full text-center mb-10">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-on-surface mb-2">Check your inbox</h2>
              <p className="font-body text-on-surface-variant">We sent a 6-digit code to <span className="text-primary font-medium">{email || 'your email'}</span></p>
            </div>
            {/* OTP Grid */}
            <div className="flex gap-2 mb-8">
              {otp.map((digit, i) => (
                <input 
                  key={i} 
                  className="w-12 h-14 text-center text-xl font-bold bg-surface-container-high rounded-md border-none otp-input focus:ring-secondary-fixed/50" 
                  maxLength={1} 
                  type="text" 
                  value={digit}
                  autoFocus={i === 0}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      const newOtp = [...otp];
                      newOtp[i] = value;
                      setOtp(newOtp);
                      if (value && i < 5) {
                        const next = e.target.nextElementSibling as HTMLInputElement;
                        if (next) next.focus();
                      }
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !otp[i] && i > 0) {
                      const prev = e.currentTarget.previousElementSibling as HTMLInputElement;
                      if (prev) prev.focus();
                    }
                  }}
                />
              ))}
            </div>
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            <div className="flex flex-col items-center gap-4 w-full">
              <button 
                onClick={handleOtpVerify}
                disabled={loading || otp.some(d => !d)}
                className="w-full h-14 bg-primary text-on-primary font-bold rounded-full text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify Code'}
              </button>
              <span className="text-sm font-medium text-secondary-fixed">Resend code in 0:45</span>
              <button 
                onClick={() => setCurrentStep(1)}
                className="text-sm text-outline hover:text-on-surface transition-colors"
              >
                Try another email
              </button>
            </div>
          </div>
        )}


        {/* Step 3: Profile Setup */}
        {currentStep === 3 && (
          <div className="frosted-glass rounded-lg p-10 flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex justify-between items-center mb-8">
              <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Step 01 / 01</span>
              <div className="flex gap-1">
                <div className="h-1 w-8 bg-primary rounded-full"></div>
                <div className="h-1 w-8 bg-surface-container-highest rounded-full opacity-30"></div>
                <div className="h-1 w-8 bg-surface-container-highest rounded-full opacity-30"></div>
              </div>
            </div>
            <h2 className="font-headline text-3xl font-bold tracking-tight mb-8">Personalize your profile</h2>
            <div className="flex flex-col items-center mb-8">
              <div className="relative group cursor-pointer">
                <div className="w-24 h-24 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border-2 border-dashed border-outline-variant hover:border-primary transition-all">
                  <span className="material-symbols-outlined text-3xl text-outline-variant group-hover:text-primary">add_a_photo</span>
                </div>
                <div className="absolute bottom-0 right-0 bg-primary p-1.5 rounded-full shadow-lg">
                  <span className="material-symbols-outlined text-xs text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>edit</span>
                </div>
              </div>
              <p className="text-xs text-outline-variant mt-3 font-semibold uppercase tracking-widest">Upload Avatar</p>
            </div>
            <div className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-outline-variant uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  className="w-full h-14 px-6 bg-surface-container-highest border-none rounded-lg focus:ring-0 text-on-surface" 
                  placeholder="John Doe" 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-outline-variant uppercase tracking-widest ml-1 flex justify-between">
                  Username
                  <span className="text-secondary-fixed lowercase tracking-normal flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span> available
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-outline">@</span>
                  <input 
                    className="w-full h-14 pl-12 pr-6 bg-surface-container-highest border-none rounded-lg focus:ring-0 text-on-surface" 
                    placeholder="johndoe" 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button 
              onClick={handleProfileSubmit}
              disabled={loading || !name}
              className="mt-10 h-14 bg-surface-bright hover:bg-surface-container-highest text-on-surface font-bold rounded-full transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Finish Setup'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
