import mongoose from 'mongoose';

const ProductSchema= mongoose.Schema({
    name:{
        type:String,
        required:[true,'The product needs a name to be entered']
    },
    description:{
        type:String,
        required:[true,'the product needs a description to enter']
    },
    stock:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        default:0.0
    },
    sales:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        required:[true,'Please write a category']
    },
    state:{
        type:Boolean,
        default:true
    }
})

ProductSchema.methods.toJSON=function(){
    const {__v, _id,...product}=this.toObject();
    product.uid=_id;
    return product;
}

export default mongoose.model('Product',ProductSchema);