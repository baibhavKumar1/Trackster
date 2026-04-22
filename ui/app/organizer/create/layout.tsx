'use client';

import OrganizerSidebar from "@/components/organizer/Sidebar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function CreateEventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const steps = [
    { 
      name: "Basic Info", 
      title: "Basic Info",
      subtitle: "Start with the core details that help participants find and understand your event.",
      icon: "info", 
      href: "/organizer/create/basic-info" 
    },
    { 
      name: "Location", 
      title: "Location & Date",
      subtitle: "Set the time and place for your event.",
      icon: "map", 
      href: "/organizer/create/location" 
    },
    { 
      name: "Tickets", 
      title: "Tickets Setup",
      subtitle: "Configure how people can join your event.",
      icon: "confirmation_number", 
      href: "/organizer/create/tickets" 
    },
    { 
      name: "Description", 
      title: "Event Description",
      subtitle: "Provide a detailed breakdown of your event to attract attendees.",
      icon: "description", 
      href: "/organizer/create/description" 
    },
  ];

  const currentStepIndex = steps.findIndex(step => pathname === step.href);
  const activeStep = currentStepIndex !== -1 ? currentStepIndex : 0;
  const currentStep = steps[activeStep];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      router.push(steps[activeStep + 1].href);
    } else {
      router.push('/organizer/dashboard');
    }
  };

  const isLastStep = activeStep === steps.length - 1;

  return (
    <div className="flex h-screen bg-background-dark text-slate-100 overflow-hidden">
      {/* <OrganizerSidebar /> */}

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Shared Header */}
        <header className="sticky top-0 z-20 flex items-center justify-between px-8 pl-6 py-6 bg-white/80 dark:bg-[#171121]/80 backdrop-blur-md border-b border-slate-200 dark:border-[#3a2d4f] shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-slate-100 dark:hover:bg-[#241b31] rounded-full transition-colors text-slate-600 dark:text-slate-400"
            >
              <ArrowLeft size={20}/>
            </button>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">{currentStep.title}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{currentStep.subtitle}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              {steps.map((step, index) => {
                const isActive = index === activeStep;
                const isCompleted = index < activeStep;
                
                return (
                  <Link 
                    key={step.href}
                    href={step.href}
                    className={`flex items-center gap-2 transition-colors ${
                      isActive ? "text-[#7c3bed]" : isCompleted ? "text-emerald-500" : "text-slate-400 dark:text-slate-500 hover:text-slate-200"
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                      isActive ? "border-[#7c3bed]" : isCompleted ? "border-emerald-500 bg-emerald-500/10" : "border-current"
                    }`}>
                      {isCompleted ? <span className="material-symbols-outlined text-xs">check</span> : index + 1}
                    </span>
                    <span className={`text-xs font-bold ${isActive ? "uppercase tracking-wider" : ""}`}>
                      {step.name}
                    </span>
                  </Link>
                );
              })}
            </nav>
            
            <button 
              onClick={handleNext}
              className="bg-[#7c3bed] hover:bg-[#7c3bed]/90 text-white px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-lg shadow-[#7c3bed]/20 active:scale-95"
            >
              {isLastStep ? "Publish Event" : "Next Step"}
            </button>
          </div>
        </header>

        {/* Main Form Area */}
        <main className="flex-1 overflow-y-auto bg-background-dark">
          {children}
        </main>
      </div>
    </div>
  );
}
