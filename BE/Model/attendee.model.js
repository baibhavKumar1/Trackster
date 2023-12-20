const mongoose= require("mongoose");

const attendeeSchema= mongoose.Schema(
    {
        event:[String],
        name:String,
        hostingEvent:[String],
        email:String,
        password:String
    },{
        versionKey:false
    }
)

const AttendeeModel= mongoose.model("Attendee",attendeeSchema);

module.exports= AttendeeModel