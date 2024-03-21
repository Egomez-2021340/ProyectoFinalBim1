import {Router} from 'express';
import { check } from "express-validator";
import { validateFields } from '../middlewares/validate-fields.js';
import {validateJWT} from '../middlewares/validate-JWT.js';
import {verifyRole} from '../middlewares/validate-ROLE.js';
import { productPost } from './product.controller.js';
import { verifyDataProduct } from '../helpers/db-validator.js';

const router = Router();

router.post('/',[validateJWT,
    verifyRole('ADMIN_ROLE'),
    check('name','Es obligatorio tener un nombre para el producto').not().isEmpty(),
    check('description','Agregue una descripcion para el producto').not().isEmpty(),
    check(["stock","price"]).custom(verifyDataProduct),
    check('category').custom(),
    validateFields
],productPost)

export default router;