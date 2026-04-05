
const roleMiddleware = (...allowedRoles) =>{

    return (req,res,next)=>{

    if(!req.user){
        const error = new Error("Access denied. not authenticated")
        error.status = 401;
        return next(error);
    }

    if(!allowedRoles.includes(req.user.role)){
        const error = new Error("Access denied. not authenticated")
        error.status = 403;
        return next(error);
    }

    next();
}
}

module.exports = roleMiddleware;