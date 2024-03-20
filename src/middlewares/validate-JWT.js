import jwt from 'jsonwebtoken';
import User from '../users/user.model.js';

export const validateJWT =async (req,res,next)=>{
    const token = req.header("x-token");
    if(!token){
        return res.status(400).json({
            msg:"The token has been sent"
        });
    }
    try {
        const {uid} =jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        const user = await User.findOne(uid);
        if(!user){
            return res.status(400).json({
                msg:"The user is not found or does not exist in the database"
            });
        }
        if(!user.state){
            return res.status(400).json({
                msg:"The user has been disabled"
            });
        }

        req.user =user;
        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg:"Invalid token"
        });
    }
}