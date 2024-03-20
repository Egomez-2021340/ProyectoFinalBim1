import jwt from 'jsonwebtoken';

export const generateJWT=async (uid="")=>{
    return new Promise((resolve,reject)=>{
        const payload = {uid};
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn:"10h"
            },
            (err,token)=>{
                err?(console.log('err'),reject('token could not be generated')):resolve(token);
            }
        )
    });
}