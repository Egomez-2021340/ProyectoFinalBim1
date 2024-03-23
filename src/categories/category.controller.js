import {request, response} from 'express';
import Category from './category.model.js';

export const categoryPost = async(req=request,res=response)=>{
    const {name,description}=req.body;
    const category = new Category({name,description});
    res.status(200).json({
        msg:"Se ha registrado la categoria",
        category
    })
}