
const pool = require('../../config/db')



const getUserById = async(id) => {
    
    const result = await pool.query
    ("select id,name,email,role,status,created_at from users where id = ($1)",[id])

    if(result.rowCount === 0){
        const error = new Error("user not found");
        error.status= 404;
        throw error;
    }

    

    return result.rows[0]

}
const getAllUsers = async() => {

    const result = await pool.query("select id,name,email,role,status,created_at from users")

    if(result.rowCount === 0){
        const error = new Error("user not found");
        error.status= 404;
        throw error;
    }

    return result.rows;
    
}

const updateUserRole = async(id,role) => {

    const allowedRoles = ["analyst",'admin','viewer'];

    if(!allowedRoles.includes(role)){
        const error = new Error("Invalid role must be analyst,viewer or admin")
        error.status = 400;
        throw error;
    }

    const updateUser = await pool.query("update users set role = ($1) where id = ($2) returning id,name,email,role,status",[role,id])

    return updateUser.rows[0];

}

const updateUserStatus = async(id,status) =>{

    try {
        
        const allowedStatus = ['active','inactive']
        if(!allowedStatus.includes(status)){
        const error = new Error("Invalid status must be active or inactive")
        error.status = 400;
        throw error;
        }

        const user = await pool.query("select id,name,email,role,status from users where id = ($1)",[id])

        if(user.status === 'inactive'){
            const error = new Error("user account is deactivated")
            error.status = 401;
            throw error;
        }

        const updateStatus = await pool.query("update users set status = ($1) where id = ($2) returning id,name,email,role,status",[status,id])
        return updateStatus.rows[0];

    } catch (error) {
        throw error
    }
}
 

module.exports = {getUserById,getAllUsers,updateUserRole,updateUserStatus}