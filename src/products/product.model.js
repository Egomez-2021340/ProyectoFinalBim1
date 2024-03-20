import mongoose from 'mongoose';

const ProductSchema= mongoose.Schema({
    name:{
        type:String,
        required:[true,'El nombre del producto es obligatorio']
    },
    description:{
        type:String,
        required:[true,'La descripcion para el producto es obligatoria']
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
        required:[true,'La categoria es obligatoria']
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