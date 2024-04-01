import mongoose from "mongoose";

const InvoiceSchema = mongoose.Schema({
    idUser:{
        type:String
    },
    name:{
        type:String,
        required:[true,"The name is necesary"],
    },
    totalProducts:{
        type:Array,
        default:[]
    },
    totalPay:{
        type:Number,
        default:0
    },
    pay:{
        type:Number,
        default:0
    },
    turned:{
        type:Number,
        default:0
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    state:{
        type:Boolean,
        default:true
    }
})


InvoiceSchema.methods.toJSON=function(){
    const {__v,_id,state,...invoice}=this.toObject();
    invoice.uid=_id;
    return invoice;
}

export default mongoose.model('Invoice',InvoiceSchema);