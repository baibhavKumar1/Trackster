// lib/services/userService.ts
import { getDb, connectToDatabase } from '../mongodb';
import { ObjectId } from 'mongodb';

export interface User {
  id: string;
  _id?: ObjectId;
  name?: string;
  email?: string;
  role?: string;
  organizerProfile?: {
    id: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export async function getUserById(userId: string): Promise<User | null> {
  try {
    await connectToDatabase();
    const db = await getDb();
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (user) {
      const { _id, ...rest } = user;
      return { ...rest, id: _id.toString() } as User;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function getAttendeeDashboardStats(userId: string) {
  // Placeholder for actual database queries for attendee stats
  // In a real application, this would query events attended, tickets bought, etc.
  const stats = {
    attendance: { value: Math.floor(Math.random() * 20) + 5, unit: "Events" },
    travel: { value: Math.floor(Math.random() * 10) + 1, unit: "Cities" },
    network: { value: Math.floor(Math.random() * 50) + 10, unit: "Organizers" },
    totalSpent: { value: Math.floor(Math.random() * 2000) + 500, unit: "Spent" },
  };
  return stats;
}

export async function getAttendeeTickets(userId: string) {
  // Placeholder for fetching tickets for the attendee
  // In a real application, this would query the Ticket model.
  // For now, return dummy data matching the structure.
  await connectToDatabase();
  const db = await getDb();
  const tickets = await db.collection('tickets').find({ userId }).toArray();

  return tickets.map(ticket => ({
    id: ticket._id.toString(),
    name: ticket.event.name,
    date: ticket.event.startDate.toISOString().split('T')[0], // Format date
    location: ticket.event.location || 'Virtual',
    status: ticket.status,
    price: ticket.price,
  }));
}

export async function getOrganizerDashboardStats(userId: string) {
  // Placeholder for actual database queries for organizer stats
  // In a real application, this would query revenue, ticket sales, etc.
  const revenue = Math.floor(Math.random() * 100000) + 10000;
  const ticketsSold = Math.floor(Math.random() * 1500) + 200;
  const activeEvents = Math.floor(Math.random() * 15) + 1;
  const followerGrowth = Math.floor(Math.random() * 2000) + 500;

  return [
    { label: "Total Revenue", value: `$${revenue.toLocaleString()}`, change: `+${(Math.random() * 10).toFixed(1)}%`, color: "text-emerald-500", bgColor: "bg-emerald-500/10", stroke: "#10b981" },
    { label: "Tickets Sold", value: ticketsSold.toLocaleString(), change: `+${(Math.random() * 15).toFixed(1)}%`, color: "text-primary", bgColor: "bg-primary/10", stroke: "#7c3bed" },
    { label: "Active Events", value: activeEvents, change: `${(Math.random() > 0.5 ? '+' : '-')}${(Math.random() * 5).toFixed(0)}%`, progress: Math.min(100, Math.max(0, activeEvents * 10)), color: "text-slate-400", bgColor: "bg-slate-400/10" },
    { label: "Follower Growth", value: `+${followerGrowth.toLocaleString()}`, change: `+${(Math.random() * 20).toFixed(1)}%`, color: "text-sky-500", bgColor: "bg-sky-500/10", stroke: "#0ea5e9" },
  ];
}

export async function getOrganizerActivityFeed(userId: string) {
  // Placeholder for fetching organizer activity
  const dummyActivity = [
    { icon: 'person_add', color: 'text-emerald-500', text: 'New registration for event: ', bold: 'Tech Conference 2024', time: '2 minutes ago' },
    { icon: 'favorite', color: 'text-primary', text: 'New follower: ', bold: 'Jane Doe', time: '15 minutes ago' },
    { icon: 'confirmation_number', color: 'text-sky-500', text: 'Ticket sold for ', bold: 'Music Festival', time: '1 hour ago' },
    { icon: 'event', color: 'text-purple-500', text: 'New event created: ', bold: 'Art Exhibition', time: '3 hours ago' },
    { icon: 'star', color: 'text-amber-500', text: 'Event rating received: ', bold: 'Web Dev Meetup', time: 'yesterday' },
  ];
  return dummyActivity;
}