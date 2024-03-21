import {Router} from 'express';
import { check } from "express-validator";
import { validateFields } from '../middlewares/validate-fields.js';
import {validateJWT} from '../middlewares/validate-JWT.js';
import {verifyRole} from '../middlewares/validate-ROLE.js';
import { productPost,
    allProductsGet,
 productGetById,
productSU} from './product.controller.js';
import { verifyDataProduct } from '../helpers/db-validator.js';
import { validateIdProduct } from '../middlewares/verify-data.js';

const router = Router();

router.post('/',[validateJWT,
    verifyRole('ADMIN_ROLE'),
    check('name','There must be a name for the product').not().isEmpty(),
    check('description','Pleas write a description for this product').not().isEmpty(),
    check(["stock","price"]).custom(verifyDataProduct),
    validateFields
],productPost)

router.get('/',[
    validateJWT,
    verifyRole('ADMIN_ROLE')
],allProductsGet)

router.get('/:idProduct',[validateJWT,
    verifyRole('ADMIN_ROLE'),
    validateIdProduct
],productGetById)

router.put('/:idProduct',[validateJWT,
    verifyRole('ADMIN_ROLE'),
    /*check('name','There must be a name for the product').not().isEmpty(),
    check('description','Pleas write a description for this product').not().isEmpty(),*/
    check(["stock","price"]).custom(verifyDataProduct),
    validateFields
],productSU)

export default router;