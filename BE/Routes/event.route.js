const express = require('express');
const EventModel = require('../Model/event.model');
const AttendeeModel = require('../Model/attendee.model');
const auth = require('../Middleware/auth.middleware');
const UserModel = require('../Model/user.model');
const upload = require('../Middleware/upload.middleware');
const uploadToCloudinary = require('../Middleware/image');

const EventRouter = express.Router();


const addEventToAttendee = async (attendeeId, eventId) => {
  try {
    const attendee = await AttendeeModel.findOne({ userId: attendeeId });
    const event = await EventModel.findById(eventId);
    if (attendee) {
      if (attendeeId === event.host.id) {
        return 'User is the host of the event';
      }

      if (attendee.event.includes(eventId)) {
        return 'Attendee already added to the event';
      }
      else {
        attendee.event.push(eventId);
        await attendee.save();

        event.attendees.push({ "userID": attendeeId, "userName": attendee.name, "userImage": attendee.avatar });
        await event.save();

        return 'Event added to attendee successfully';
      }
    } else {
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
    const { name, email, pass, avatar } = user;
    const newAttendee = new AttendeeModel({
      name, email, pass, avatar, event: [eventId], userId
    });
    await newAttendee.save();
    event.attendees.push({ "userID": userId, "userName": user.name, "userImage": user.avatar });
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
    const { name, email, pass, avatar } = user;
    const host = new AttendeeModel({
      name, email, pass, avatar, hostingEvent: [eventId], userId
    });
    await host.save();
    return (host)
  }
};



EventRouter.use(auth);

EventRouter.get("/", async (req, res) => {
  try {
    const events = await EventModel.find();
    res.status(200).send(events)
  } catch (err) {
    res.status(500).send(err.message)
  }
});

EventRouter.get("/singleEvent/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const events = await EventModel.findById(id);
    if (events) {
      res.status(200).send(events)
    }
    else {
      res.status(400).send('event not found')
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
});

EventRouter.get("/hostingEvent", async (req, res) => {
  try {
    const { userID } = req.body;
    const events = await EventModel.find({ "host.id": userID });
    if (events) {
      res.status(200).send(events)
    }
    else {
      res.status(400).send('event not found')
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
});

EventRouter.get("/attendingEvent", async (req, res) => {
  try {
    const { userID } = req.body;
    const attendee = await AttendeeModel.findOne({ userId: userID })
    if (attendee) {
      const events = await EventModel.find({ _id: { $in: attendee.event } });
      if (events) {
        //console.log(events)
        res.status(200).send(events)
      }
      else {
        res.status(400).send('no attending event found')
      }
    } else {
      res.status(400).send("attendee not found")
    }

  } catch (err) {
    res.status(500).send(err.message)
  }
});

EventRouter.post('/create', [upload.single('image'), auth], async (req, res) => {
  try {
    console.log(req.body.userID);
    const { name, venue, description, date, userID } = req.body;
    const user = await UserModel.findById(userID);
    
    //const image = req.file ? req.file.path : null;
    const exist = await EventModel.findOne({ name, venue });

    if (exist) {
      return res.status(400).send("Event already exists");
    }
    else {
      let image = await uploadToCloudinary(req?.file?.path);
      const newEvent = new EventModel({
        name, venue, description, date, image, host: { id: userID, name: user.name, avatar: user.avatar }
      });

      await newEvent.save();
      const data = await addEventToHost(userID, newEvent._id);
      res.status(200).json({ data, newEvent });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

EventRouter.patch("/edit/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const event = await EventModel.findById(id);
    if (event.host.id === req.body.userID) {
      const newevent = await EventModel.findByIdAndUpdate(
        id,
        { ...req.body }, { new: true }
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


EventRouter.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const event = await EventModel.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.host.id !== req.body.userID) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    const host = await AttendeeModel.findOne({ userId: req.body.userID });

    if (host) {
      host.hostingEvent = host.hostingEvent.filter(item => item !== id);
      await host.save();
    }

    await EventModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Event deleted successfully", host });
  } catch (err) {
    res.status(500).json({ message: err.message, prompt: 'hi' });
  }
});

EventRouter.post('/addAttendee', async (req, res) => {
  try {
    const { userID, id } = req.body;

    const data = await addEventToAttendee(userID, id);
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error");
  }
});

EventRouter.post('/removeAttendee', async (req, res) => {
  try {
    const { userID, user, id } = req.body;
    const eventData = await EventModel.findById(id);
    let attendee;
    if (eventData.host.id == userID) {
      attendee = await AttendeeModel.findOne({ userId: user });
    }
    else {
      attendee = await AttendeeModel.findOne({ userId: userID });
    }
    if (!attendee || !eventData) {
      res.status(400).send("Attendee or event not found");
    }
    attendee.event = attendee.event.filter(event => event !== id);
    eventData.attendees = eventData.attendees.filter(att => att.userID !== attendee.userId);
    await eventData.save();
    await attendee.save();
    res.status(200).send("Attendee removed from event");
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = EventRouter;
