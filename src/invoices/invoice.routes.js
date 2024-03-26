import {Router} from 'express';
import { check } from "express-validator";
import { invoicePost } from './invoice.controller.js';
import { validateJWT } from '../middlewares/validate-JWT.js';
import { verifyRole } from '../middlewares/validate-ROLE.js';

const router = Router();

router.post('/',[
    validateJWT,
    verifyRole('CLIENT_ROLE')
],invoicePost);

export default router;