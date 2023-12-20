const mongoose= require('mongoose');

const eventSchema= mongoose.Schema(
    {
        name:String,
        venue:String,
        description:String,
        hostId:String,
        image:String,
        attendees: [String],
        time: String,
        date:String
    },{
        versionKey:false
    }
)

const EventModel= mongoose.model("Event",eventSchema);

module.exports= EventModel;