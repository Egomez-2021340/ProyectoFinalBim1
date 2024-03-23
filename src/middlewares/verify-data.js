import { request, response } from 'express';
import bcrcyptjs from 'bcryptjs';
import User from '../users/user.model.js';
import Product from '../products/product.model.js';
import Category from '../categories/category.model.js';

export const validateUserPut = async (req, res, next) => {
    const userLog = req.user;
    const { user } = req.body;
    const seeUser = await User.findOne({ user: user });
    if (!seeUser) {
        next();
    }
    if (seeUser) {
        if (seeUser.id == userLog.id) {
            next();
        } else {
            return res.status(400).json({
                msg: "The user already exists in the DB"
            });
        }
    }
}

export const validatePasswordDelete = async (req,res,next)=>{
    const userLog = req.user;
    const {password, passwordConfirm}=req.body;
    if(password!=passwordConfirm){
        return res.status(400).json({
            msg:"Incorrect passwords"
        });
    }else{
        const verifyPassword=bcrcyptjs.compareSync(password,userLog.password);
        if(!verifyPassword){
            return res.status(400).json({
                msg:"The password entered does not match the saved one."
            });
        }else{
            next();
        }
    }
}


export const validateIdProduct = async (req,res,next)=>{
    const {idProduct}=req.params;
    try {
        const product = await Product.findOne({_id:idProduct});
        if(!product){
            return res.status(400).json({
                msg:'The product does not exist in the DB'
            });
        }
        next();
    } catch (e) {
        res.status(500).json({
            msg:"Please verify that the Product Identifier is from Mongo, otherwise contact the administrator"
        });
    }
}

export const validateIdCategory = async (req=request,res=response,next)=>{
    const {idCategory}=req.params;
    if(idCategory=='65fe5c822e844982b04f7186'){
        return res.status(400).json({
            msg:"Category cannot be updated or deleted"
        })
    }
    try {
        const category = await Category.findById(idCategory);
        if(!category){
            return res.status(400).json({
                msg:"The category do not exist"
            })
        }
        if(!category.state){
            return res.status(400).json({
                msg:"The category is already deleted"
            })
        }
        next();
    } catch (e) {
        res.status(500).json({
            msg:"Verify that the ID is valid from Mongo"
        })
    }
}

export const validateCategoryProducts = async(req=request,res=response,next)=>{
    const {idCategory}=req.params;
    const [productsWithCategory]= await Promise.all([
        Product.find({category:idCategory}
    )]);
    for(let category of productsWithCategory){
        await Product.findByIdAndUpdate(category._id,{category:'65fe5c822e844982b04f7186'});
    }
    next()
}