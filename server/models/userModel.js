const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    profilePicture: {
        type: String,
        default: ""
    } ,
    role: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);