import {Router} from 'express';
import { check } from "express-validator";
import { invoicePost } from './invoice.controller.js';
import { validateJWT } from '../middlewares/validate-JWT.js';
import { verifyRole } from '../middlewares/validate-ROLE.js';
import { verifyPayCart } from '../middlewares/verify-data.js';

const router = Router();

router.post('/',[
    validateJWT,
    verifyRole('CLIENT_ROLE'),
    check("pay","Es necesario pagar por los productos").not().isEmpty(),
    verifyPayCart
],invoicePost);

export default router;