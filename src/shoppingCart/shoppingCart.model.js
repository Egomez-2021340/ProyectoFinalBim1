import mongoose from "mongoose";

const ShoppingCartSchema= mongoose.Schema({
    idUser:{
        type:String
    },
    listProducts:{
        type:Array,
        default:[]
    },
    state:{
        type:Boolean,
        default:true
    }
})

ShoppingCartSchema.methods.toJSON=function(){
    const {__v,_id,...shoppingCart}=this.toObject();
    shoppingCart.uid=_id;
    return shoppingCart;
}
export default mongoose.model('ShoppingCart',ShoppingCartSchema);