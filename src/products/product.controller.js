import { request, response } from "express";
import Product from './product.model.js';

export const productPost =async(req,res)=>{
    const {name,description,stock,price,sales,category}=req.body;
    const product = new Product({name,description,stock,price,sales,category});
    product.save();
    res.status(200).json({
        msg:"El producto ha sido registrado con exito",
        product
    })
}