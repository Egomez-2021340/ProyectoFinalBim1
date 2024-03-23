import mongoose, { model } from 'mongoose';

const CategorySchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'There must be a category name']
    },
    description:{
        type:String,
        required:[true, 'There must be a description for the category']
    },
    state:{
        type:Boolean,
        default:true
    }
})

CategorySchema.methods.toJSON=function(){
    const {__v,_id,...category}=this.toObject();
    category.uid=_id;
    return category;
}

export default model('Category',CategorySchema);