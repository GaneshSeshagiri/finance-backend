const pool = require('../../config/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const register = async(name,email,password,role)=>{

    const existingUser = await pool.query(
        "select * from users where email = ($1)",
        [email]
    );

    if(existingUser.rows.length > 0){
        const error = new Error("user already registered")
        error.status = 400;
        throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password,salt);

    const result = await pool.query(`insert into users(name,email,password,role) values($1,$2,$3,$4)
        returning id,name,email,role,status,created_at`,
        [name,email,hashedPwd,role || 'viewer']
    );
}

const login = async(email,password)=>{
    
    const result = await pool.query(`select * from users where email = ($1)`,
        [email])

    if(result.rows.length === 0){
        const error = new Error("invalid email or password")
        error.status = 401;
        throw error;
    }

    const user = result.rows[0];

    if(user.status === 'inactive'){
        const error = new Error("your account is deactivated");
        error.status = 403;
        throw error;
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        const error = new Error("inavlid email or password")
        error.status = 401;
        throw error;
    }

    const token = jwt.sign({id : user.id,role :user.role},process.env.JWT_SECRET,
        {expiresIn : process.env.JWT_EXPIRES_IN});
        

    return {
        token,user : {
            id : user.id,
            name : user.name,
            email : user.email,
            role : user.role,
        },
    }

}

module.exports = {register,login}