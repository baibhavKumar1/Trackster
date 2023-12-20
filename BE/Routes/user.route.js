const express= require('express');
const UserRouter= express.Router();
const UserModel= require('../Model/user.model');
const bcrypt = require('bcrypt');
const BlackListModel = require('../Model/blacklist.model');
const jwt= require('jsonwebtoken')

UserRouter.get("/",async(req,res)=>{
    res.send("It's on")
})

UserRouter.post('/register',async(req,res)=>{
    const {name,age,email,pass,city}= req.body;
    try{
        const exist= await UserModel.findOne({email});
        if(exist){
            return res.status(400).send("User already exist");
        }
        bcrypt.hash(pass,3,async(err,hash)=>{
            if(err){
                return res.status(400).send(err.message);
            }
            const user= new UserModel({
                name,email,city,pass:hash,age
            });
            await user.save();
            res.status(200).send(user);
        })
    }catch(err){
        return res.status(400).send(err.message)
    }
})

UserRouter.post("/login",async(req,res)=>{
    const {email,pass} =req.body;
    try{
        const user =await UserModel.findOne({email});
        if (user){
            bcrypt.compare(pass,user.pass,(err, decoded) => {
                if(decoded){
                    const token = jwt.sign({userID:user._id},"token");
                    res.status(200).json({message:"User Logged In",token,name:user.name});
                }else{
                    res.status(400).send("Wrong credentials");
                }
            });
        }else{
            res.status(400).send("User does not exist");
        }
    }catch(err){
        res.status(400).send("User is not found");
    }
});

UserRouter.get("/logout",async(req,res)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(400).send("Unauthorized");
        }
        await BlackListModel.updateMany({$push:{token:[token]}});
        return res.status(200).send("User logged out");
    }catch(err){
        return res.status(400).send(err.message);
    }
});

module.exports= UserRouter