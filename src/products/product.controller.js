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

export const productSU=async(req,res)=>{
    const {idProduct}=req.params;
    const {__v,_id,_state,...productUpdate}=req.body;
    await Product.findByIdAndUpdate(idProduct,productUpdate);
    const product= await Product.findById(idProduct)
    res.status(200).json({
        msg:"Your product already update",
        product
    });
}

export const controlProducts = async (req,res)=>{
    const [totalProducts, products, totalProductsNotExist, totalProductsOutStock]=await Promise.all([
        Product.countDocuments({state:true}),
        Product.find({state:true}),
        Product.countDocuments({state:false}),
        Product.find({stock:0})
    ])
    res.status(200).json({
        totalProducts,
        products,
        totalProductsNotExist,
        totalProductsOutStock
    })
}

export const productsOutOfStock = async(req,res)=>{
    const [totalProductsOutStock, productsOutOfStock]= await Promise.all([
        Product.countDocuments({$and:[{stock:0},{state:true}]}),
        Product.find({$and:[{stock:0},{state:true}]})
    ])
    res.status(200).json({
        totalProductsOutStock,
        productsOutOfStock
    })
}