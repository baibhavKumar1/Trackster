import OrganizerSidebar from "@/components/organizer/Sidebar";
import OrganizerHeader from "@/components/organizer/Header";

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background-dark text-slate-100">
      <OrganizerSidebar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
    </div>
  );
}
