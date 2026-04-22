
// app/api/organizer/dashboard/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/app/lib/auth';
import { headers } from 'next/headers';
import { getOrganizerDashboardData } from '@/lib/services/eventService'; // Assuming this service fetches organizer dashboard data
import { getUserById } from '@/lib/services/userService'; // To get user role and details

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await getUserById(userId);
    if (!user || user.role !== 'ORGANIZER') {
      return NextResponse.json({ error: 'Forbidden: User is not an organizer' }, { status: 403 });
    }

    const dashboardData = await getOrganizerDashboardData(userId); // Pass userId for fetching organizer-specific data
    return NextResponse.json(dashboardData);

  } catch (error: any) {
    console.error("API Error in organizer dashboard:", error);
    return NextResponse.json({ error: error.message || 'Failed to fetch organizer dashboard data' }, { status: error.status || 500 });
  }
}
