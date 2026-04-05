const jwt = require('jsonwebtoken')
require('dotenv').config()


const tokenAuth = async(req,res,next) => {
    const authHeader = req.headers.authorization;
   

    try {
        if(!authHeader || !authHeader.startsWith('Bearer ')){
        const error = new Error("Access denied. No token provided")
        error.status = 401;
        return next(error);
        }

        const token = authHeader.split(' ')[1];
        

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        

        req.user = decoded;

        next();


    } catch (error) {
        
        const err = new Error('Invalid or expired token');
        err.status = 401;
        next(err);
    }

    
}

module.exports = tokenAuth