import {Router} from 'express';
import { check } from "express-validator";
import { invoiceGetById, invoiceGetIdUser, invoiceGetLoggedUser, invoicePost, invoicePut } from './invoice.controller.js';
import { validateJWT } from '../middlewares/validate-JWT.js';
import { verifyRole } from '../middlewares/validate-ROLE.js';
import { verifyExistsProduct, verifyIdInvoice, verifyIdProductInvoice, verifyIdUser, verifyPayCart, verifyQuantityProduct } from '../middlewares/verify-data.js';
import { validateFields } from '../middlewares/validate-fields.js';

const router = Router();

router.post('/',[
    validateJWT,
    verifyRole('CLIENT_ROLE'),
    check("pay","It is necessary to pay for the products").not().isEmpty(),
    verifyPayCart,
    validateFields
],invoicePost);

router.get('/user/:idUser',[validateJWT,
    verifyRole('ADMIN_ROLE'),
    verifyIdUser
],invoiceGetIdUser)

router.get('/:idInvoice',[validateJWT,
    verifyRole('ADMIN_ROLE'),
    verifyIdInvoice
],invoiceGetById)

router.get('/',[validateJWT,
    verifyRole("CLIENT_ROLE")
],invoiceGetLoggedUser);

router.put('/:idInvoice',[
    validateJWT,
    verifyRole('ADMIN_ROLE'),
    verifyIdInvoice,
    check("idProduct",'Enter a valid Mongo ID').isMongoId(),
    verifyExistsProduct,
    check("idProduct","The ID of the product to be purchased is necesary").not().isEmpty(),
    verifyIdProductInvoice,
    check("quantity","The quantity of product to purchase is necesary").isNumeric(),
    verifyQuantityProduct,
    validateFields
],invoicePut)

export default router;