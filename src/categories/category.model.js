import mongoose, { model } from 'mongoose';

const CategorySchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Es obligatorio un nombre de categoria']
    },
    description:{
        type:String,
        required:[true, 'Es obligatorio una descripcion de categoria']
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