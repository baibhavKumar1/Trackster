
// app/api/attendee/dashboard/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/app/lib/auth';
import { headers } from 'next/headers';
import { getAttendeeDashboardData } from '@/lib/services/eventService'; // Assuming this service fetches attendee dashboard data
import { getUserById } from '@/lib/services/userService'; // To get user role and details

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dashboardData = await getAttendeeDashboardData(userId);
    return NextResponse.json(dashboardData);

  } catch (error: any) {
    console.error("API Error in attendee dashboard:", error);
    return NextResponse.json({ error: error.message || 'Failed to fetch attendee dashboard data' }, { status: error.status || 500 });
  }
}
