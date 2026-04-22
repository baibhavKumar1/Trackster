import AttendeeSidebar from "@/components/attendee/Sidebar";
import AttendeeHeader from "@/components/attendee/Header";

export default function AttendeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface text-on-surface font-body selection:bg-secondary-fixed selection:text-on-secondary-fixed flex w-full min-h-screen">
      <AttendeeSidebar />
      <div className="flex flex-col flex-1">
        <AttendeeHeader />
        <main className="ml-72 min-h-screen w-[calc(100%-18rem)] relative pt-20">
          {children}
        </main>
      </div>
    </div>
  );
}

