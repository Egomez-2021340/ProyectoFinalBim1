import { request, response } from "express";
import Product from './product.model.js';

export const productPost =async(req,res)=>{
    const {name,description,stock,price,sales,category}=req.body;
    const product = new Product({name,description,stock,price,sales,category});
    product.save();
    res.status(200).json({
        msg:"The product was successfully entered into the database",
        product
    })
}

export const allProductsGet = async(req,res)=>{
    const [totalProducts, allProducts]=await Promise.all([
        Product.countDocuments({state:true}),
        Product.find({state:true})
    ]);
    res.status(200).json({
        totalOfProducts:totalProducts,
        allProducts
    })
}

export const productGetById=async(req,res)=>{
    const {idProduct}=req.params;
    const product = await Product.findById(idProduct);
    res.status(200).json({
        product
    })
}
