// lib/services/eventService.ts
import { getDb, connectToDatabase } from '../mongodb';
import { ObjectId } from 'mongodb';
import { getUserById, getAttendeeDashboardStats, getOrganizerDashboardStats, getOrganizerActivityFeed } from './userService';

// --- Event Creation & Management ---

interface EventData {
  name: string;
  startDate: string | Date;
  endDate?: string | Date | null;
  description?: string;
  location?: string;
  imageUrl?: string;
  capacity?: number;
  tickets?: Array<{ userId: string; [key: string]: unknown }>;
  [key: string]: unknown;
}

export interface Event {
  id: string;
  _id?: ObjectId;
  name: string;
  startDate: Date;
  endDate?: Date | null;
  description?: string;
  location?: string;
  imageUrl?: string;
  capacity?: number;
  organizerId: string;
  tickets?: Array<{ userId: string; [key: string]: unknown }>;
  [key: string]: unknown;
}

export async function createEvent(organizerId: string, eventData: EventData) {
  try {
    // Basic validation
    if (!eventData.name || !eventData.startDate) {
      throw new Error("Event name and start date are required.");
    }

    await connectToDatabase();
    const db = await getDb();
    const newEvent = await db.collection('events').insertOne({
      ...eventData,
      organizerId: organizerId,
      startDate: new Date(eventData.startDate), // Ensure date is correctly formatted
      endDate: eventData.endDate ? new Date(eventData.endDate) : null, // Handle optional end date
    });
    return { ...eventData, id: newEvent.insertedId.toString() };
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Failed to create event.");
  }
}

export async function getEventById(eventId: string): Promise<Event | null> {
  try {
    await connectToDatabase();
    const db = await getDb();
    const event = await db.collection('events').findOne({ _id: new ObjectId(eventId) });
    if (event) {
      const { _id, ...rest } = event;
      return { ...rest, id: _id.toString() } as Event;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching event with ID ${eventId}:`, error);
    throw new Error("Failed to fetch event details.");
  }
}

interface EventQuery {
  organizerId: string;
  endDate?: { $lt: Date } | { $gte: Date };
  startDate?: { $lte: Date } | { $gt: Date };
}

export async function getEventsForOrganizer(organizerId: string, filter?: { status?: string }) {
  try {
    await connectToDatabase();
    const db = await getDb();
    const query: EventQuery = { organizerId: organizerId };

    if (filter?.status) {
      const now = new Date();
      if (filter.status === 'Past') {
        query.endDate = { $lt: now };
      } else if (filter.status === 'Live') {
        query.startDate = { $lte: now };
        query.endDate = { $gte: now };
      } else if (filter.status === 'Draft') {
        query.startDate = { $gt: now };
      }
    }

    const events = await db.collection('events').find(query).sort({ startDate: 1 }).toArray();

    // Enhance events with status derived from dates
    const enhancedEvents = events.map(event => {
      let status = 'Draft';
      const now = new Date();
      if (event.startDate && event.startDate <= now && (!event.endDate || event.endDate >= now)) {
        status = 'Live';
      } else if (event.startDate && event.startDate <= now && event.endDate && event.endDate < now) {
        status = 'Past';
      }
      return {
        ...event,
        id: event._id.toString(),
        status: status,
        sold: event.tickets ? event.tickets.length : 0,
        total: event.capacity || 0,
        name: event.name || '',
        startDate: event.startDate || new Date(),
        location: event.location || 'Virtual',
        imageUrl: event.imageUrl || 'https://via.placeholder.com/300x200?text=Event+Image',
      };
    });

    return enhancedEvents;
  } catch (error) {
    console.error("Error fetching events for organizer:", error);
    throw new Error("Failed to fetch organizer's events.");
  }
}

export async function searchEvents(query: string, options?: { limit?: number, sortBy?: 'date' | 'relevance' }) {
  try {
    const limit = options?.limit || 10;
    await connectToDatabase();
    const db = await getDb();
    const events = await db.collection('events').find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } },
        { 'organizer.user.name': { $regex: query, $options: 'i' } }
      ],
      startDate: { $gt: new Date() }
    }).sort({ startDate: 1 }).limit(limit).toArray();

    return events.map(event => ({
      ...event,
      id: event._id.toString(),
    }));
  } catch (error) {
    console.error("Error searching events:", error);
    throw new Error("Failed to search events.");
  }
}

// --- Recommendation Logic ---
interface RecommendedEvent {
  _id: ObjectId;
  id: string;
  name?: string;
  location?: string;
  startDate?: Date;
  imageUrl?: string;
  [key: string]: unknown;
}

export async function getRecommendedEvents(userId: string, limit: number = 5) {
  try {
    await connectToDatabase();
    const db = await getDb();
    const userTickets = await db.collection('tickets').find({ userId }).toArray();
    const userTicketEventIds = userTickets.map(t => t.eventId);

    const recommended = await db.collection('events').find({
      startDate: { $gt: new Date() },
      _id: { $nin: userTicketEventIds }
    }).sort({ tickets: -1 }).limit(limit).toArray();

    return recommended.map((event) => {
      const eventData = event as RecommendedEvent;
      return {
        ...eventData,
        id: eventData._id.toString(),
      };
    });
  } catch (error) {
    console.error("Error getting recommended events:", error);
    throw new Error("Failed to get recommended events.");
  }
}

// --- Event Details for Dashboard ---
export async function getAttendeeDashboardData(userId: string) {
  const user = await getUserById(userId);

  const greetingName = user?.name?.split(' ')[0] || user?.email?.split('@')[0] || 'Attendee';

  await connectToDatabase();
  const db = await getDb();
  const upcomingEvents = await db.collection('events').find({
    startDate: { $gt: new Date() },
    tickets: { $elemMatch: { userId: userId } }
  }).sort({ startDate: 1 }).limit(2).toArray();

  const recommendedEvents = await getRecommendedEvents(userId, 3);
  const stats = await getAttendeeDashboardStats(userId);

  return {
    greetingName,
    upcomingEvents: upcomingEvents.map(event => ({
      id: event._id.toString(),
      name: event.name,
      location: event.location || 'Virtual',
      startDate: event.startDate.toISOString(),
      imageUrl: event.imageUrl || 'https://via.placeholder.com/300x200?text=Event+Image',
      remainingTime: calculateRemainingTime(event.startDate),
    })),
    recommendedEvents: recommendedEvents.map(event => ({
      id: event._id.toString(),
      name: event.name || 'Unnamed Event',
      location: event.location || 'Virtual',
      date: event.startDate ? event.startDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      imageUrl: event.imageUrl || 'https://via.placeholder.com/300x200?text=Event+Image',
      tags: ['Tech', 'Networking']
    })),
    stats,
  };
}

export async function getOrganizerDashboardData(organizerId: string) {
  const user = await getUserById(organizerId);

  const stats = await getOrganizerDashboardStats(organizerId);
  await connectToDatabase();
  const db = await getDb();
  const recentEvents = await getEventsForOrganizer(organizerId, { status: 'Live' });
  const pastEvents = await getEventsForOrganizer(organizerId, { status: 'Past' });
  const activityFeed = await getOrganizerActivityFeed(organizerId);

  return {
    organizerName: user?.name || 'Organizer',
    stats,
    recentEvents: recentEvents.slice(0, 3).map(event => ({
      id: event.id,
      name: event.name,
      date: event.startDate.toISOString().split('T')[0],
      location: event.location || 'Virtual',
      status: event.status,
      sold: event.sold,
      total: event.total,
      img: event.imageUrl || 'https://via.placeholder.com/50x50?text=Event',
    })),
    pastEventsCount: pastEvents.length,
    activityFeed,
  };
}


// --- Helper Functions ---

function calculateRemainingTime(date: Date): string {
  const now = new Date();
  const diffInMs = date.getTime() - now.getTime();

  if (diffInMs <= 0) {
    return "Happening Now";
  }

  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60 * 24));

  if (diffInDays > 0) {
    return `${diffInDays}d : ${diffInHours}h`;
  } else {
    return `${diffInHours}h`;
  }
}

export function getEventImageUrl(eventImageUrl: string | null | undefined): string {
  return eventImageUrl || 'https://via.placeholder.com/600x400?text=Event+Image';
}