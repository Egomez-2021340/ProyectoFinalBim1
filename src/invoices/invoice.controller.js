import {request, response} from 'express';
import ShoppingCart from '../shoppingCart/shoppingCart.model.js';

export const invoicePost = async(req=request,res=response)=>{
    const userLog=req.user;
    const {pay} = req.body;
    const shoppingCart = await ShoppingCart.findOne({idUser:userLog.uid});
    let totalPay;
    for(let producto of shoppingCart.listProducts){
        totalPay+= producto.subtotal;
    }
    res.status(200).json({
        totalPay
    })
}