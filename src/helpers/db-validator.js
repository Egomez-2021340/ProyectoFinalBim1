import User from '../users/user.model.js';

export const validateUser = async(user='')=>{
    const seeUser = await User.findOne({user:user});
    if(seeUser){
        throw new Error("The user already exists in the DB");
    }
}

export const validateEmail = async(email='')=>{
    const seeUser = await User.findOne({email:email});
    if(seeUser){
        throw new Error("The email already exists in another user");
    }
}

export const verifyDataProduct= async (...data)=>{
    for (let valor of data) {
        if (valor === 0) {
            throw new Error('Verifique que stock o precio  no sea 0');
        }
    }
}