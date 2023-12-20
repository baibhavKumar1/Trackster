const mongoose= require('mongoose');

const connection = mongoose.connect("mongodb+srv://cocc1274:Vaibhav1@cluster0.mybcsrv.mongodb.net/events?retryWrites=true&w=majority");

module.exports= connection;