// lib/services/ticketService.ts
import { getDb, connectToDatabase } from '../mongodb';
import { ObjectId } from 'mongodb';

// Placeholder for ticket purchase logic
export async function purchaseTicket(userId: string, eventId: string, quantity: number = 1) {
  try {
    // Basic validation
    if (!userId || !eventId || quantity <= 0) {
      throw new Error("Invalid input for ticket purchase.");
    }

    await connectToDatabase();
    const db = await getDb();
    const event = await db.collection('events').findOne({ _id: new ObjectId(eventId) });

    if (!event) {
      throw new Error("Event not found.");
    }

    // Check if user already has tickets for this event and status is not CANCELLED
    const existingTicket = await db.collection('tickets').findOne({
      userId: userId,
      eventId: eventId,
      status: { $ne: 'CANCELLED' }
    });

    if (existingTicket) {
      throw new Error("You already have a ticket for this event.");
    }

    // Placeholder for capacity check if event.capacity is defined in schema
    // if (event.capacity && event.tickets.filter(t => t.status !== TicketStatus.CANCELLED).length + quantity > event.capacity) {
    //   throw new Error("Event is sold out.");
    // }

    // Placeholder for price calculation and payment processing
    const pricePerTicket = event.price || 10.0; // Default price if not set
    const totalPrice = pricePerTicket * quantity;

    // In a real app, you'd integrate with a payment gateway here.
    // For this example, we'll simulate a successful purchase.

    const newTickets = [];
    for (let i = 0; i < quantity; i++) {
      newTickets.push({
        userId: userId,
        eventId: eventId,
        status: 'CONFIRMED',
        price: pricePerTicket,
      });
    }

    await db.collection('tickets').insertMany(newTickets);

    return { message: "Tickets purchased successfully!", ticketsCreated: quantity, totalPrice: totalPrice };

  } catch (error) {
    console.error("Error purchasing ticket:", error);
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to purchase ticket.");
    } else {
      throw new Error("Failed to purchase ticket.");
    }
  }
}

// Placeholder for ticket cancellation logic
export async function cancelTicket(userId: string, ticketId: string) {
  try {
    await connectToDatabase();
    const db = await getDb();
    const result = await db.collection('tickets').updateOne({
      _id: new ObjectId(ticketId),
      userId: userId,
      status: 'CONFIRMED'
    }, {
      $set: { status: 'CANCELLED' }
    });

    if (result.matchedCount === 0) {
      throw new Error("Ticket not found or already cancelled.");
    }

    return { message: "Ticket cancelled successfully.", ticketId: ticketId };
  } catch (error) {
    console.error("Error cancelling ticket:", error);
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to cancel ticket.");
    } else {
      throw new Error("Failed to cancel ticket.");
    }
  }
}

// Placeholder for ticket transfer logic
export async function transferTicket(fromUserId: string, toUserId: string, ticketId: string) {
  try {
    await connectToDatabase();
    const db = await getDb();

    // Verify sender owns the ticket and it's confirmed
    const ticket = await db.collection('tickets').findOne({
      _id: new ObjectId(ticketId),
      userId: fromUserId,
      status: 'CONFIRMED'
    });

    if (!ticket) {
      throw new Error("Ticket not found, is not confirmed, or does not belong to you.");
    }

    // Verify recipient doesn't already have a confirmed ticket for this event
    const recipientHasTicket = await db.collection('tickets').findOne({
      userId: toUserId,
      eventId: ticket.eventId,
      status: 'CONFIRMED'
    });

    if (recipientHasTicket) {
      throw new Error("Recipient already has a confirmed ticket for this event.");
    }

    // Update ticket owner
    const result = await db.collection('tickets').updateOne({
      _id: new ObjectId(ticketId)
    }, {
      $set: { userId: toUserId }
    });

    if (result.matchedCount === 0) {
      throw new Error("Failed to transfer ticket.");
    }

    return { message: "Ticket transferred successfully.", ticketId: ticketId, newOwnerId: toUserId };
  } catch (error) {
    console.error("Error transferring ticket:", error);
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to transfer ticket.");
    } else {
      throw new Error("Failed to transfer ticket.");
    }
  }
}