
// app/api/events/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/app/lib/auth';
import { headers } from 'next/headers';
import { createEvent, getEventsForOrganizer, searchEvents } from '@/lib/services/eventService';
import { getUserById } from '@/lib/services/userService';
import { getDb, connectToDatabase } from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const eventData = await req.json();
    const newEvent = await createEvent(userId, eventData);
    return NextResponse.json(newEvent, { status: 201 });

  } catch (error: any) {
    console.error("API Error creating event:", error);
    return NextResponse.json({ error: error.message || 'Failed to create event' }, { status: error.status || 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || '';
    const organizerId = searchParams.get('organizerId');
    const status = searchParams.get('status'); // e.g., 'Live', 'Past', 'Draft'
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;
    const sortBy = searchParams.get('sortBy') as 'date' | 'relevance' || 'date';

    // If organizerId is provided, fetch events for that organizer
    if (organizerId) {
      // Check authorization if the caller is not the organizer themselves (or an admin)
      const session = await auth.api.getSession({ headers: await headers() });
      const currentUserId = session?.user?.id;
      if (!currentUserId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

      const events = await getEventsForOrganizer(organizerId, { status: status || undefined });
      return NextResponse.json(events);
    } else if (query) {
      // If a search query is provided, perform a general event search
      const events = await searchEvents(query, { limit, sortBy });
      return NextResponse.json(events);
    } else {
      // Default: Fetch upcoming events for general discovery
      await connectToDatabase();
      const db = await getDb();
      const events = await db.collection('events').find({
        startDate: { $gt: new Date() }
      }).sort({ startDate: 1 }).limit(limit).toArray();
      
      const formattedEvents = events.map((event: { _id: { toString: () => string }; [key: string]: unknown }) => ({
        ...event,
        id: event._id.toString(),
      }));
      
      return NextResponse.json(formattedEvents);
    }

  } catch (error: any) {
    console.error("API Error fetching events:", error);
    return NextResponse.json({ error: error.message || 'Failed to fetch events' }, { status: error.status || 500 });
  }
}
