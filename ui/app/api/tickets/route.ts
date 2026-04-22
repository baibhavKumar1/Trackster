
// app/api/tickets/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/app/lib/auth';
import { headers } from 'next/headers';
import { purchaseTicket, cancelTicket, transferTicket } from '@/lib/services/ticketService';
import { getUserById } from '@/lib/services/userService';

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { eventId, quantity = 1, action } = body;

    if (!eventId) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
    }

    switch (action) {
      case 'purchase':
        const purchaseResult = await purchaseTicket(userId, eventId, quantity);
        return NextResponse.json(purchaseResult, { status: 201 });
      case 'cancel':
        const ticketIdToCancel = body.ticketId;
        if (!ticketIdToCancel) {
          return NextResponse.json({ error: 'Ticket ID is required for cancellation' }, { status: 400 });
        }
        const cancelResult = await cancelTicket(userId, ticketIdToCancel);
        return NextResponse.json(cancelResult, { status: 200 });
      case 'transfer':
        const { ticketId, toUserId } = body;
        if (!ticketId || !toUserId) {
          return NextResponse.json({ error: 'Ticket ID and recipient User ID are required for transfer' }, { status: 400 });
        }
        const transferResult = await transferTicket(userId, toUserId, ticketId);
        return NextResponse.json(transferResult, { status: 200 });
      default:
        return NextResponse.json({ error: 'Invalid action specified' }, { status: 400 });
    }

  } catch (error: any) {
    console.error("API Error managing tickets:", error);
    return NextResponse.json({ error: error.message || 'Failed to manage tickets' }, { status: error.status || 500 });
  }
}
