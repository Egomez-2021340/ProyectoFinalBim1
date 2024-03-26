import {Router} from 'express';
import { check } from "express-validator";
import { invoiceGetById, invoiceGetIdUser, invoicePost } from './invoice.controller.js';
import { validateJWT } from '../middlewares/validate-JWT.js';
import { verifyRole } from '../middlewares/validate-ROLE.js';
import { verifyIdInvoice, verifyIdUser, verifyPayCart } from '../middlewares/verify-data.js';

const router = Router();

router.post('/',[
    validateJWT,
    verifyRole('CLIENT_ROLE'),
    check("pay","Es necesario pagar por los productos").not().isEmpty(),
    verifyPayCart
],invoicePost);

router.get('/user/:idUser',[validateJWT,
    verifyRole('ADMIN_ROLE'),
    verifyIdUser
],invoiceGetIdUser)

router.get('/:idInvoice',[validateJWT,
    verifyRole('ADMIN_ROLE'),
    verifyIdInvoice
],invoiceGetById)

export default router;