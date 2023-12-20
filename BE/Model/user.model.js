const mongoose= require("mongoose");

const userSchema= mongoose.Schema(
    {
        name:String,
        age:Number,
        city:String,
        email:String,
        pass:String
    },{
        versionKey:false
    }
)

const UserModel= mongoose.model("User",userSchema);

module.exports= UserModel