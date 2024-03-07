const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const BlackListModel = require('../Model/blacklist.model');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
            
            const expired = await BlackListModel.findOne({token});
            if (!expired) {
                let decoded = jwt.verify(token, "token");
                req.body.userID = decoded.userID;
                req.body.avatar = decoded.userAvatar;
                return next();
            }
            else {
                res.status(400).send('User is logged out')
            }
        } 
        else {
            return res.status(400).send("Unauthorized");
        }
    } catch (err) {
        return res.status(400).json({ "message": err.message });
    }
}

module.exports = auth;