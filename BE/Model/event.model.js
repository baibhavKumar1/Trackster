const mongoose= require('mongoose');

const eventSchema= mongoose.Schema(
    {
        name:String,
        venue:String,  
        description:String,
        host:{
            _id:false,
            id:String,
            name:String,
            avatar:String
        },
        image:String,
        attendees: [
            {
            userImage:String,
            userID:String,
            userName:String
        }
    ],
        announcement:[String],
        discussion:[String],
        date:String
    },{
        versionKey:false
    }
)

const EventModel= mongoose.model("Event",eventSchema);

module.exports= EventModel;