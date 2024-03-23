export const verifyRole=(...role)=>{
    return (req,res,next)=>{
        if(!req.user){
            return res.status(500).json({
                msg:"There is no validator token to validate role"
            })   
        }
        if(!role.includes(req.user.role)){
            return res.status(401).json({
                msg:`Unauthorized user, has a role ${req.user.role}, authorized roles are ${role}`
            });
        }
        next();
    }
}