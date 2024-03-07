const mongoose= require("mongoose");

const attendeeSchema= mongoose.Schema(
    {
        event:[String],
        name:String,
        avatar:String,
        hostingEvent:[String],
        email:String,
        pass:String,
        userId:String,
    },{
        versionKey:false
    }
)

const AttendeeModel= mongoose.model("Attendee",attendeeSchema);

module.exports= AttendeeModel