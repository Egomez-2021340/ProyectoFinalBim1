import { request,response } from "express";
import bcryptjs from 'bcryptjs';
import User from "../users/user.model.js";
import {generateJWT} from "../helpers/generate-JWT.js";


export const login = async(req=request,res=response)=>{
    const {email,password} =req.body;
    try {
        const loggedUser = await User.findOne({email:email});
        if(!loggedUser){
            return res.status(400).json({
                msg:"Wrong Data"
            });
        }
        if(!loggedUser.state){
            return res.status(400).json({
                msg:"Your account is deactivated"
            });
        }
        const validatePassword = bcryptjs.compareSync(password,loggedUser.password);
        if(!validatePassword){
            return res.status(400).json({
                msg:"Incorrect passwords"
            });
        }
        const token = await generateJWT(loggedUser.id);
        res.status(200).json({
            msg:"Logged Succesfully",
            token
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: "Contact the administrator"
        });
    }
}