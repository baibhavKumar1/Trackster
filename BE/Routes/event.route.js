const express = require('express');
const EventModel = require('../Model/event.model');
const AttendeeModel = require('../Model/attendee.model');
const auth = require('../Middleware/auth.middleware');
const UserModel = require('../Model/user.model');
const EventRouter = express.Router();

const findUserById = async (userId) => {
  return await UserModel.findById(userId);
};

const findEventById = async (eventId) => {
  return await EventModel.findById(eventId);
};

const addEventToAttendee = async (attendeeId, eventId) => {
  const user = await findUserById(attendeeId);
  const { name, email } = user;
  const attendee = await AttendeeModel.findOne({ name, email });
  const eventdata = await findEventById(eventId);

  if (attendee && !attendee.event.includes(eventId) && attendeeId!==eventdata.hostId) {
    attendee.event.push(eventId);
    await attendee.save();
    eventdata.attendees.push(attendeeId);
    await eventdata.save();
    return ("event added to attendee")
  } else if(attendee && attendee.event.includes(eventId) && eventdata.attendees.includes(attendeeId)) {
    return ('attendee already added')
  }else{
    await createAttendeeFromUser(attendeeId, eventId);
  }
};

const createAttendeeFromUser = async (userId, eventId) => {
  const user = await findUserById(userId);
  const event = await findEventById(eventId);
  if (user) {
    const { name, email, pass } = user;
    const newAttendee = new AttendeeModel({
      name, email, pass, event: [eventId]
    });
    await newAttendee.save();
    event.attendees.push(userId);
    await event.save()
    return ("new attendee created")
  }
};

const addEventToHost = async (hostId, eventId) => {
  try {
    const event = await EventModel.findById( eventId )
    const user = await UserModel.findById(hostId)
    const { name, email } = user;
    const host = await AttendeeModel.findOne({ name, email });
    if (host && (host.hostingEvent.includes(eventId) || event.attendees.includes({ hostId }))) {
      return ('host already registered')
    }
    else if (host && (!host.hostingEvent.includes(eventId) || event.attendees.includes({ hostId }))) {
      host.hostingEvent.push(eventId);
      await host.save();
    } else {
      await createHostFromUser(hostId, eventId);
    }
  } catch (e) {
    return e
  }
};

const createHostFromUser = async (userId, eventId) => {
  const user = await findUserById(userId);

  if (user) {
    const { name, email, pass } = user;
    const newHost = new AttendeeModel({
      name, email, pass, hostingEvent: [eventId]
    });
    await newHost.save();
    return ('host created')
  }
};

EventRouter.use(auth);

EventRouter.get("/", async (req, res) => {
  try{
    const events = await EventModel.find();
    res.status(200).send(events)
  }catch(err){
    res.status(500).send(err.message)
  }
});

EventRouter.post('/create', async (req, res) => {
  try {
    const { name, venue, description,date, time, image, userID } = req.body;
    const exist = await EventModel.findOne({ name, venue });

    if (exist) {
      return res.status(400).send("Event already exists");
    }

    const newEvent = new EventModel({
      name, venue, description,date, time, image, hostId: userID
    });

    await newEvent.save();
    console.log(newEvent._id)
    const data = await addEventToHost(userID, newEvent._id);
    res.send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

EventRouter.post('/addAttendee', async (req, res) => {
  try {
    const { userID, eventId } = req.body;
    const data = await addEventToAttendee(userID, eventId);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = EventRouter;
