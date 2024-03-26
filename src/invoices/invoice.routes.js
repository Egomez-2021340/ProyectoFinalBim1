import {Router} from 'express';
import { check } from "express-validator";
import { invoiceGetIdUser, invoicePost } from './invoice.controller.js';
import { validateJWT } from '../middlewares/validate-JWT.js';
import { verifyRole } from '../middlewares/validate-ROLE.js';
import { verifyIdUser, verifyPayCart } from '../middlewares/verify-data.js';

const router = Router();

router.post('/',[
    validateJWT,
    verifyRole('CLIENT_ROLE'),
    check("pay","Es necesario pagar por los productos").not().isEmpty(),
    verifyPayCart
],invoicePost);

router.get('/:idUser',[validateJWT,
    verifyRole('ADMIN_ROLE'),
    verifyIdUser
],invoiceGetIdUser)

export default router;