const express = require('express');
const EventModel = require('../Model/event.model');
const AttendeeModel = require('../Model/attendee.model');
const auth = require('../Middleware/auth.middleware');
const UserModel = require('../Model/user.model');
const EventRouter = express.Router();


const addEventToAttendee = async (attendeeId, eventId) => {
  try {
    const attendee = await AttendeeModel.findOne({ userId: attendeeId });
    const event = await EventModel.findById(eventId);
    console.log(event) 
    if (attendee) {
      if (attendeeId === event.hostId) {
        return 'User is the host of the event';
      }

      if (attendee.event.includes(eventId)) {
        return 'Attendee already added to the event';
      }
      else {
        attendee.event.push(eventId);
        await attendee.save();

        event.attendees.push(attendeeId);
        await event.save();

        return 'Event added to attendee successfully';
      }
    }else{
      const attendee = await createAttendeeFromUser(attendeeId, eventId);
      return attendee
    }

  } catch (error) {
    console.error(error);
    throw new Error('Internal Server Error');
  }
};

const createAttendeeFromUser = async (userId, eventId) => {
  const user = await UserModel.findById(userId);
  const event = await EventModel.findById(eventId);
  if (user) {
    const { name, email, pass } = user;
    const newAttendee = new AttendeeModel({
      name, email, pass, event: [eventId], userId
    });
    await newAttendee.save();
    event.attendees.push(userId);
    await event.save()
    return ("new attendee created")
  }
};

const addEventToHost = async (hostId, eventId) => {
  try {
    const user = await UserModel.findById(hostId)
    const { name, email } = user;
    const host = await AttendeeModel.findOne({ name, email });
    if (host) {
      host.hostingEvent.push(eventId);
      await host.save();
      return { host }
    }
    else {
      await createHostFromUser(hostId, eventId);
    }
  } catch (e) {
    return e
  }
};

const createHostFromUser = async (userId, eventId) => {
  const user = await UserModel.findById(userId);

  if (user) {
    const { name, email, pass } = user;
    const host = new AttendeeModel({
      name, email, pass, hostingEvent: [eventId], userId
    });
    await host.save();
    return (host)
  }
};

const removeAttendeeFromEvent = async (attendeeId, eventId) => {
  try {
    const attendee = await AttendeeModel.findOne({ userId: attendeeId });
    const eventData = await EventModel.findById(eventId);

    if (!attendee || !eventData) {
      return "Attendee or event not found";
    }
    attendee.event = attendee.event.filter(event => event.toString() !== eventId);
    await attendee.save();

    eventData.attendees = eventData.attendees.filter(id => id.toString() !== attendeeId);
    await eventData.save();

    return "Attendee removed from event";
  } catch (error) {
    console.error(error);
    return "Error removing attendee from event";
  }
};

// EventRouter.use(auth);

EventRouter.get("/", async (req, res) => {
  try {
    const events = await EventModel.find();
    //console.log(req.body.userID)
    res.status(200).send(events)
  } catch (err) {
    res.status(500).send(err.message)
  }
});

EventRouter.get("/singleEvent/:id", async (req, res) => {
  const {id} = req.params;
   console.log(id)
  try {
    const events = await EventModel.findById(id);
    if(events){
    res.status(200).send(events)} 
    else{
      res.status(400).send('event not found')
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
});

EventRouter.get("/hostingEvent", async (req, res) => {
  try {
    const { userID } = req.body;
    console.log(req.body.userID)
    const events = await EventModel.find({ hostId: userID });
    res.status(200).send(events)
  } catch (err) {
    res.status(500).send(err.message)
  }
});

EventRouter.get("/attendingEvent", async (req, res) => {
  try {
    const { userID } = req.body;
    const attendee = await AttendeeModel.findOne({ userId: userID })
    const events = await EventModel.find({ _id: { $in: attendee.event } });
    res.status(200).send(events)
  } catch (err) {
    res.status(500).send(err.message)
  }
});

EventRouter.post('/create', async (req, res) => {
  try {
    const { name, venue, description, date, image, userID } = req.body;
    const exist = await EventModel.findOne({ name, venue });

    if (exist) {
      return res.status(400).send("Event already exists");
    }

    const newEvent = new EventModel({
      name, venue, description, date, image, hostId: userID
    });

    await newEvent.save();
    console.log(newEvent._id)
    const data = await addEventToHost(userID, newEvent._id);
    res.status(200).json({ data, newEvent });
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});
EventRouter.patch("/edit/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const event = await EventModel.findById(id);
    if (event.hostId === req.body.userID) {
      const newevent = await EventModel.findByIdAndUpdate(
        id,
        req.body, { new: true }
      );
      res.status(200).json({ message: "event updated successfully", newevent });
    }
    else {
      res.status(400).send("unauthorized")
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

EventRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const event = await EventModel.findById(id);
    if (event.hostId !== req.body.userID) {
      res.status(401).json({ message: "Not Authorized" });
    } else {
      const newEvent = await EventModel.findByIdAndDelete(id);
      const host = await AttendeeModel.findOne({ userId: req.body.userId });
      if (host) {
        host.hostingEvent = host.hostingEvent.filter(eventId => eventId.toString() !== id);
        await host.save();
      }
      res.status(200).json({ message: "Event deleted successfully", host });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

EventRouter.post('/addAttendee', async (req, res) => {
  try {
    console.log(req.body)
    const { userID, id } = req.body;
    
    const data = await addEventToAttendee(userID, id);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});
EventRouter.post('/removeAttendee', async (req, res) => {
  try {
    const { userID, eventId } = req.body;
    const data = await removeAttendeeFromEvent(userID, eventId);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = EventRouter;
