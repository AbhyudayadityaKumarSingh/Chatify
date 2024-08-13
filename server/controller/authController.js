const User = require('../models/userModel');
//
const { requireSignin, adminMiddleware } = require('../middlewares/authMiddleware');
const {hashPassword, comparePassword} = require('../utils/authUtil');
const JWT = require('jsonwebtoken');
//

export const registerController = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "User already exists"});
        }
        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        return res.status(201).json({message: "User created successfully"});

    }
    catch(error){
        console.error('Error in registerController:', error.message); // Debugging line
        return res.status(400).json({message: "Error in registerController"});
    }
} ;

export const loginController = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        const isMatch = await comparePassword(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Incorrect password"});
        }
        const token = JWT.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        const {_id, name, role} = user;
        return res.status(200).json({
            token,
            user: {_id, name, email, role}
        });

    }
    catch(error) {
        console.error('Error in loginController:', error.message); // Debugging line
        return res.status(400).json({message: "Error in loginController"});
    }
};