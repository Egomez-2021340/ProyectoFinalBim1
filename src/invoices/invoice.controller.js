import {request, response} from 'express';
import ShoppingCart from '../shoppingCart/shoppingCart.model.js';
import Invoice from './invoice.model.js';
import Product from '../products/product.model.js';

export const invoicePost = async(req=request,res=response)=>{
    const userLog = req.user;
    const {pay} =req.body;
    let total=0;
    const shoppingCart = await ShoppingCart.findOne({idUser:userLog.id});
    let list=[];
    for(let product of shoppingCart.listProducts){
        const productSee = await Product.findOne({_id:product.idProduct});
        await Product.findByIdAndUpdate(productSee._id,{stock:productSee.stock-product.quantity
            ,sales:productSee.sales+product.quantity});
        list.push({idProduct:product.idProduct, nameProduct:product.nameProduct, subTotal:product.subTotal});
        total+=product.subTotal;
    }
    const invoice = new Invoice({idUser:userLog.id,name:userLog.name,totalProducts:list,totalPay:total,pay:pay,turned:pay-total});
    await ShoppingCart.findByIdAndUpdate(shoppingCart._id,{listProducts:[]});
    invoice.save();
    res.status(200).json({
        msg:"!!Gracias por su compra, lo esperamos!!",
        invoice
    })
}

export const invoiceGetById= async(req,res)=>{
    const {idInvoice}=req.params;
    const invoice = await Invoice.findById(idInvoice);
    res.status(200).json({
        invoice
    })
}

export const invoiceGetIdUser= async(req,res)=>{
    const {idUser}=req.params;
    const invoices=await Invoice.find({idUser:idUser});
    res.status(200).json({
        invoices
    })
}