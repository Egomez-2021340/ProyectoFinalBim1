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
            msg: "The category can't be updated or deleted"
        })
    }
    try {
        const category = await Category.findById(idCategory);
        if (!category) {
            return res.status(400).json({
                msg: "This category does not exists"
            })
        }
        if (!category.state) {
            return res.status(400).json({
                msg: "The category is eliminated"
            })
        }
        next();
    } catch (e) {
        res.status(500).json({
            msg: "Verify that the ID is valid from Mongo"
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
            if (!categoryId) {
                return res.status(400).json({
                    msg: "The category does not exist"
                })
            }
            next()
        } catch (e) {
            res.status(400).json({
                msg: "Enter a valid category ID"
            })
        }
    } else {
        next();
    }
}

export const verifyExistsProduct = async (req, res, next) => {
    const { idProduct } = req.body;
    try {
        const product = await Product.findById(idProduct);
        if (!product) {
            return res.status(400).json({
                msg: 'The product does not exist in the database'
            })
        }
        next();
    } catch (e) {
        res.status(500).json({
            msg: "Verify that the product ID is valid from Mongo"
        })
    }
}

export const verifyQuantityProduct = async (req, res, next) => {
    const { idProduct, quantity } = req.body;
    const product = await Product.findById(idProduct);
    if (product.stock < quantity) {
        return res.status(400).json({
            msg: "The quantity to be purchased exceeds the stock of the product"
        });
    }
    next();
}

export const verifyPayCart = async (req, res, next) => {
    const userLog = req.user;
    const { pay } = req.body;
    const shoppingCart = await ShoppingCart.findOne({ idUser: userLog.id });
    let totalPay = 0;
    for (let producto of shoppingCart.listProducts) {
        totalPay += producto.subTotal;
    }
    if (pay < totalPay) {
        return res.status(400).json({
            msg: `The payment is insufficient to get the products, you have to pay Q${totalPay}`
        })
    }
    next();
}

export const verifyIdUser = async (req, res, next) => {
    const { idUser } = req.params;
    try {
        const user = await User.findById(idUser);
        if (!user) {
            return res.status(400).json({
                msg: "The user does not exists"
            })
        }
        if (!user.state) {
            return res.status(400).json({
                msg: "The user has been deleted"
            })
        }
        next();
    } catch (e) {
        res.status(500).json({
            msg: "Enter a valid Mongo user ID"
        })
    }
}

export const verifyIdInvoice = async (req, res, next) => {
    const { idInvoice } = req.params;
    try {
        const invoice = await Invoice.findById(idInvoice);
        if (!invoice) {
            return res.status(400).json({
                msg: "The invoice does not exist"
            })
        }
        next()
    } catch (e) {
        res.status(500).json({
            msg: "Verify that the invoice ID is valid from Mongo"
        })
    }

}

export const verifyQuantityStock = async (req, res, next) => {
    const userLog = req.user;
    const { idProduct, quantity } = req.body;
    let shoppingCart = await ShoppingCart.findOne({ idUser: userLog.id });
    const product = await Product.findById(idProduct);
    if (shoppingCart) {
        for (let p of shoppingCart.listProducts) {
            if (p.idProduct == idProduct) {
                let itemTotalProduct = quantity + p.quantity;
                if (itemTotalProduct > product.stock) {
                    return res.status(400).json({
                        msg: "The quantity added and the quantity in the cart is greater than the stock"
                    });
                }
            }
        }
    }
    next();
}

export const verifyQuantityStockInvoice = async (req, res, next) => {
    const { idInvoice } = req.params;
    const { idProduct, quantity } = req.body;
    let invoice = await Invoice.findById(idInvoice);
    const product = await Product.findById(idProduct);
    for (let p of invoice.totalProducts) {
        if (p.idProduct == idProduct) {
            let itemTotalProduct = quantity + p.quantity;
            if (itemTotalProduct > product.stock) {
                return res.status(400).json({
                    msg: "The new quantity is greater than the stock of the product"
                });
            }
        }
    }
    next();
}

export const verifyIdProductInvoice = async (req, res, next) => {
    const { idInvoice } = req.params;
    const { idProduct } = req.body;
    let invoice = await Invoice.findById(idInvoice);
    let notExistId = 0;
    for (let p of invoice.totalProducts) {
        if (p.idProduct != idProduct) {
            notExistId++;
        } else {
            next();
        }
    }
    if (notExistId == invoice.totalProducts.length) {
        return res.status(400).json({
            msg: "The product ID does not exist on the invoice"
        })
    }
}