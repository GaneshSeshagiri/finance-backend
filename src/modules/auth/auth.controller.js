const authService = require('./auth.service')


const register = async(req,res,next)=>{

    const {name,email,password,role} = req.body

    try{
        if(!name || !email || !password){
        const error = new Error("name,email and password are required")
        error.status = 400;
        throw error;
    }

    if(password.length < 6){
        const error = new Error("password must be at least 6 characters")
        error.status = 400;
        throw error;
    }

    const user = await authService.register(name,email,password,role);

    res.status(201).json({
        success : true,
        message : 'user registered successfully',
        data : user
    })
    }
    catch(err){
        next(err);
    }
}

const login = async(req,res,next)=>{
    const {email,password} = req.body;

    try{
        if(!email || !password){
        const error = new Error("name,email and password are required")
        error.status = 400;
        throw error;
        }

        const result = await authService.login(email,password);

        res.status(201).json({
            success : true,
            message : 'login successful',
            data : result
        })
    }
    catch(err){
        next(err);
    }

}

module.exports = {register,login}
