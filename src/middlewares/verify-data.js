import { request, response } from 'express';
import User from '../users/user.model.js';
import bcrcyptjs from 'bcryptjs';
export const validateUserPut = async (req, res, next) => {
    const userLog = req.user;
    const { user } = req.body;
    const seeUser = await User.findOne({ user: user });
    if (!seeUser) {
        next();
    }
    if (seeUser) {
        if (seeUser.id == userLog.id) {
            next();
        } else {
            return res.status(400).json({
                msg: "The user already exists in the DB"
            });
        }
    }
}

export const validatePasswordDelete = async (req,res,next)=>{
    const userLog = req.user;
    const {password, passwordConfirm}=req.body;
    if(password!=passwordConfirm){
        return res.status(400).json({
            msg:"Incorrect passwords"
        });
    }else{
        const verifyPassword=bcrcyptjs.compareSync(password,userLog.password);
        if(!verifyPassword){
            return res.status(400).json({
                msg:"The password entered does not match the saved one."
            });
        }else{
            next();
        }
    }
}