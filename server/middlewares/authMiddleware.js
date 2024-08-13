const JWT = require('jsonwebtoken');
const User = require('../models/userModel');


export const requireSignin = async (req, res, next) => {
    try{
        const token = req.headers.authorization ;
        if(!token){
            return res.status(400).json({message: "No token .Authorization Required"});
        }
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        req.user = user;
        next();
        
    }
    catch(error){
        console.error('Error in requireSignin middleware:', error.message); // Debugging line
        return res.status(401).json({ message: "Unauthorized" });
    }
};


export const adminMiddleware = async (req, res, next) => {
    try{
        const user = req.user;
        if(user.role !== 1){
            return res.status(400).json({message: "Admin access denied"});
        }
        next();
    }
    catch(error){
        console.error('Error in adminMiddleware middleware:', error.message); // Debugging line
        return res.status(401).json({ message: "Unauthorized" });
    }
};