import { request, response } from 'express';
import bcrcyptjs from 'bcryptjs';
import User from '../users/user.model.js';
import Product from '../products/product.model.js';
import Category from '../categories/category.model.js';
import ShoppingCart from '../shoppingCart/shoppingCart.model.js';
import Invoice from '../invoices/invoice.model.js';

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

export const validatePasswordDelete = async (req, res, next) => {
    const userLog = req.user;
    const { password, passwordConfirm } = req.body;
    if (password != passwordConfirm) {
        return res.status(400).json({
            msg: "Incorrect passwords"
        });
    } else {
        const verifyPassword = bcrcyptjs.compareSync(password, userLog.password);
        if (!verifyPassword) {
            return res.status(400).json({
                msg: "The password entered does not match the saved one."
            });
        } else {
            next();
        }
    }
}


export const validateIdProduct = async (req, res, next) => {
    const { idProduct } = req.params;
    try {
        const product = await Product.findOne({ _id: idProduct });
        if (!product) {
            return res.status(400).json({
                msg: 'The product does not exist in the DB'
            });
        }
        next();
    } catch (e) {
        res.status(500).json({
            msg: "Please verify that the Product Identifier is from Mongo, otherwise contact the administrator"
        });
    }
}

export const validateIdCategory = async (req = request, res = response, next) => {
    const { idCategory } = req.params;
    if (idCategory == '65fe5c822e844982b04f7186') {
        return res.status(400).json({
            msg: "La categoria nose puede actualizar o eliminar."
        })
    }
    try {
        const category = await Category.findById(idCategory);
        if (!category) {
            return res.status(400).json({
                msg: "La categoria no existe"
            })
        }
        if (!category.state) {
            return res.status(400).json({
                msg: "La categoria ya esta eliminada"
            })
        }
        next();
    } catch (e) {
        res.status(500).json({
            msg: "Verifique el que el ID sea valido de Mongo"
        })
    }
}

export const validateCategoryProducts = async (req = request, res = response, next) => {
    const { idCategory } = req.params;
    const [productsWithCategory] = await Promise.all([
        Product.find({ category: idCategory }
        )]);
    for (let category of productsWithCategory) {
        await Product.findByIdAndUpdate(category._id, { category: '65fe5c822e844982b04f7186' });
    }
    next()
}

export const verifyExistsCategory = async (req, res, next) => {
    const { searchPS } = req.params;
    const categoryName = await Category.findOne({ name: searchPS });
    if (!categoryName) {
        try {
            const categoryId = await Category.findById(searchPS);
            if(!categoryId){
                return res.status(400).json({
                    msg:"La categoria no existe"
                })
            }
            next()
        } catch (e) {
            res.status(400).json({
                msg:"Ingrese un ID de categoria valido"
            })
        }
    } else {
        next();
    }
}

export const verifyExistsProduct =async(req,res,next)=>{
    const {idProduct}=req.body;
    try {
        const product = await Product.findById(idProduct);
        if(!product){
            return res.status(400).json({
                msg:'El producto no existe en la base de datos'
            })
        }
        next();
    } catch (e) {
        res.status(500).json({
            msg: "Verifique que el ID del producto sea valido de Mongo"
        })
    }
}

export const verifyQuantityProduct = async(req,res,next)=>{
    const {idProduct,quantity}=req.body;
    const product = await Product.findById(idProduct);
    if(product.stock<quantity){
        return res.status(400).json({
            msg:"La cantidad a comprar sobrepasa al stock del producto"
        });
    }
    next();
}

export const verifyPayCart = async(req,res,next)=>{
    const userLog=req.user;
    const {pay} = req.body;
    const shoppingCart = await ShoppingCart.findOne({idUser:userLog.id});
    let totalPay=0;
    for(let producto of shoppingCart.listProducts){
        totalPay+= producto.subTotal;
    }
    if(pay<totalPay){
        return res.status(400).json({
            msg:`El pago es insuficiente para obtener los productos, debe pagar Q${totalPay}`
        })
    }
    next();
}

export const verifyIdUser= async(req,res,next)=>{
    const {idUser}=req.params;
    try {
        const user = await User.findById(idUser);
        if(!user){
            return res.status(400).json({
                msg:"El usuario no existe"
            })
        }
        if(!user.state){
            return res.status(400).json({
                msg:"El usuario ha sido eliminado"
            })
        }
        next();
    } catch (e) {
        res.status(500).json({
            msg:"Ingrese un ID de usuario valido de Mongo"
        })
    }
}

export const verifyIdInvoice = async(req,res,next)=>{
    const {idInvoice}=req.params;
    try {
        const invoice = await Invoice.findById(idInvoice);
        if(!invoice){
            return res.status(400).json({
                msg:"La factura no existe"
            })
        }
        next()
    } catch (e) {
        res.status(500).json({
            msg:"Verifique que el ID de la factura sea valida de Mongo"
        })
    }
    
}