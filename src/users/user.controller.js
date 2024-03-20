import brcyptjs from 'bcryptjs';
import { request,response } from 'express';
import User from './user.model.js';

export const userPost = async(req=request,res=response)=>{
    const {user, name,email,password}=req.body;
    const [totalUser]= await Promise.all([
        User.find({state:true})
    ]);
    const userNew =new User({user,name,email,password});
    if(totalUser.length==0){
        userNew.role='ADMIN_ROLE';
    }
    const salt = brcyptjs.genSaltSync();
    userNew.password = brcyptjs.hashSync(password,salt);
    userNew.save();
    res.status(200).json({
        msg:"SUCCESSFUL REGISTRATION"
    });
}