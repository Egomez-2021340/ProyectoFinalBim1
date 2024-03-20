import brcyptjs from 'bcryptjs';
import { request,response } from 'express';
import User from './user.model.js';

export const userPut =async (req=request,res=response)=>{
    const userLog = req.user;
    const {user,password}=req.body;
    const salt = brcyptjs.genSaltSync();
    const newPassword= brcyptjs.hashSync(password,salt);
    await User.findByIdAndUpdate(userLog._id,{user:user,password:newPassword});
    if(userLog.role =='ADMIN_ROLE'){
        const {role}=req.body;
        await User.findByIdAndUpdate(userLog._id,{role:role});
    }
    const userNew = await User.findById(userLog._id);
    res.status(200).json({
        msg:"Data updated correctly",
        userNew
    })
}

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