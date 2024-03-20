import mongoose from 'mongoose';
export const UserSchema = mongoose.Schema({
    user:{
        type:String,
        required:[true,"The user is required"]
    },
    name:{
        type:String,
        required:[true, "The name is required"]
    },
    email:{
        type:String,
        required:[true,"The email is required"]
    },
    password:{
        type:String,
        required:[true, "The email is required"]
    },
    role:{
        type:String,
        required:[true,"The role is required"]
    },
    state:{
        type:Boolean,
        required:[true,"The state is required"]
    }
});

UserSchema.method.JSON= function(){
    const {__v,_id,...users}= this.toObject();
    users.uid=_id;
    return users;
}
