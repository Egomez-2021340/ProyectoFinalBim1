import { Router } from 'express';
import { check } from "express-validator";
import { login } from './auth.controller.js';
import { validateFields } from '../middlewares/validate-fields.js';

const router = Router();

router.post('/', [check("email", "Email is required and must be functional").isEmail(),
check('password', "The password is required for account and must be greater than 4 characters").isLength({ min: 4 }),
    validateFields
], login);

export default router;