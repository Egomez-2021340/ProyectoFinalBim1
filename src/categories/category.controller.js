import {request, response} from 'express';
import Category from './category.model.js';

export const categoryPost = async(req=request,res=response)=>{
    const {name,description}=req.body;
    const category = new Category({name,description});
    category.save();
    res.status(200).json({
        msg:"Se ha registrado la categoria",
        category
    })
}

export const categoryGet = async(req=request,res=response)=>{
    const categories = await Category.find({state:true});
    res.status(200).json({
        categories
    })
}

export const categoryPut = async(req=request,res=response)=>{
    const {idCategory}=req.params;
    const {__v,_id,state,...otros}=req.body;
    await Category.findByIdAndUpdate(idCategory,otros);
    const category = await Category.findById(idCategory);
    res.status(200).json({
        msg:"La categorya ha sido actualizada",
        category
    });
}

export const categoryDelete = async(req=request,res=response)=>{
    const {idCategory}=req.params;
    await Category.findByIdAndUpdate(idCategory,{state:false});
    const category = await Category.findById(idCategory);
    res.status(200).json({
        msg:"La categorya se ha eliminado",
        category
    });
}