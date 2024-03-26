import { request, response } from "express";
import ShoppingCart from "./shoppingCart.model.js";
import Product from "../products/product.model.js";

export const shoppingPost = async (req = request, res = response) => {
    const userLog = req.user;
    const { idProduct, quantity } = req.body;
    let shoppingCart = await ShoppingCart.findOne({ idUser: userLog.id });
    if (!shoppingCart) {
        let shoppingCart2 = new ShoppingCart({ idUser: userLog.id });
        shoppingCart2.save();
        shoppingCart = await ShoppingCart.findOne({ idUser: userLog.id });
    }
    shoppingCart = await ShoppingCart.findOne({ idUser: userLog.id });
    const product = await Product.findById(idProduct);
    let list = shoppingCart.listProducts;
    let notExists=0;
    for (let p of list) {
        if (p.idProduct == idProduct) {
            p.quantity = quantity+p.quantity;
            p.subTotal = p.quantity*p.price;
        }else{
            notExists++;
        }
    }
    if(notExists==list.length){
        list.push({
            idProduct: product.id,
            nameProduct: product.name,
            price: product.price,
            quantity,
            subTotal: (product.price * quantity)
        });
    }
    await ShoppingCart.findByIdAndUpdate(shoppingCart.id,{listProducts:list});
    shoppingCart = await ShoppingCart.findById(shoppingCart.id);
    res.status(200).json({
        msg: "Se ha agregado el producto al carrito",
        shoppingCart
    });
}