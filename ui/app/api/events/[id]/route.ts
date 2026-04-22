// app/api/events/[id]/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/app/lib/auth';
import { headers } from 'next/headers';
import { getEventById } from '@/lib/services/eventService';
import { getUserById } from '@/lib/services/userService';
import { getDb, connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: eventId } = await params;
    const event = await getEventById(eventId);

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // For general discovery, return event details.
    return NextResponse.json(event);

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch event details';
    console.error(`API Error fetching event:`, error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: eventId } = await params;
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const eventData = await req.json();

    // Check if the organizer owns this event
    const existingEvent = await getEventById(eventId);
    if (!existingEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    if (existingEvent.organizerId !== userId) {
      return NextResponse.json({ error: 'Forbidden: You do not own this event' }, { status: 403 });
    }

    // Basic validation for update
    if (!eventData.name || !eventData.startDate) {
      throw new Error("Event name and start date are required.");
    }

    await connectToDatabase();
    const db = await getDb();
    const updateData: Record<string, unknown> = {
      startDate: eventData.startDate ? new Date(eventData.startDate) : undefined,
      endDate: eventData.endDate ? new Date(eventData.endDate) : undefined,
    };

    // Only update fields that are provided and valid
    if (eventData.name !== undefined) updateData.name = eventData.name;
    if (eventData.description !== undefined) updateData.description = eventData.description;
    if (eventData.location !== undefined) updateData.location = eventData.location;
    if (eventData.imageUrl !== undefined) updateData.imageUrl = eventData.imageUrl;

    const result = await db.collection('events').updateOne(
      { _id: new ObjectId(eventId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const updatedEvent = await getEventById(eventId);
    return NextResponse.json(updatedEvent);

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update event';
    console.error(`API Error updating event:`, error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: eventId } = await params;
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check ownership before deletion
    const existingEvent = await getEventById(eventId);
    if (!existingEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    if (existingEvent.organizerId !== userId) {
      return NextResponse.json({ error: 'Forbidden: You do not own this event' }, { status: 403 });
    }

    await connectToDatabase();
    const db = await getDb();
    const result = await db.collection('events').deleteOne({ _id: new ObjectId(eventId) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Event deleted successfully' }, { status: 200 });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete event';
    console.error(`API Error deleting event:`, error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}