const { success } = require('zod');
const userService = require('./users.service')

const getUserById = async(req,res,next) =>{
    const id = req.params.id;

    try {
        const user = await userService.getUserById(id);

        res.json({
        success : true,
        data : user
    })
    } catch (error) {
        next(error);
    }
}

const getAllUsers = async(req,res,next) => {
    try {
        const users = await userService.getAllUsers();

        res.json({
            success : true,
            data : users
        })
    } catch (error) {
        next(error)
    }
}

const updateUserRole = async(req,res,next) => {
    try {
        
        const id = req.params.id;
        const role = req.body.role;

        const updatedUser = await userService.updateUserRole(id,role);

        res.json({
            success : true,
            message : "updated user role",
            user : updatedUser
        })
    } catch(error) {
        next(error)
    }
        
    }
const updateUserStatus = async(req,res,next) => {
    const id = req.params.id;
    const status = req.body.status;

    try {
        
        const updatedUser = await userService.updateUserStatus(id,status);

        res.json({
        success : true,
        message : "updated user status",
        data : updatedUser
    })
    } catch (error) {
        next(error);
    }

}


module.exports = {getUserById,getAllUsers,updateUserRole,updateUserStatus}