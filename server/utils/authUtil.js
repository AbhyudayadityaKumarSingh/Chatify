const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
    try{
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    }
    catch(error){
        console.log(error);
    }
};