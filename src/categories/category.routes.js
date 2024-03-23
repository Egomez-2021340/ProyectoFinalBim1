import { Router } from 'express';
import { check } from 'express-validator';
import { validateJWT } from '../middlewares/validate-JWT.js';
import { verifyRole } from '../middlewares/validate-ROLE.js';
import { validateFields } from '../middlewares/validate-fields.js';
import {
    categoryPost,
    categoryGet,
    categoryPut,
    categoryDelete
} from './category.controller.js';
import { verifyNameCategory } from '../helpers/db-validator.js';
import { validateCategoryProducts, validateIdCategory } from '../middlewares/verify-data.js';

const router = Router();

router.post('/', [validateJWT,
    verifyRole('ADMIN_ROLE'),
    check('name', 'There must be a category name').not().isEmpty(),
    check('name').custom(verifyNameCategory),
    check('description', "There must be a description for the category").not().isEmpty(),
    validateFields
], categoryPost)

router.get('/', [validateJWT,
    verifyRole('ADMIN_ROLE',
    ), categoryGet])

router.put('/:idCategory', [validateJWT,
    verifyRole('ADMIN_ROLE'),
    validateIdCategory,
    check('name', 'There must be a category name').not().isEmpty(),
    check('name').custom(verifyNameCategory),
    check('description', "There must be a description for the category").not().isEmpty(),
    validateFields
], categoryPut)

router.delete('/:idCategory', [validateJWT,
    verifyRole('ADMIN_ROLE'),
    validateCategoryProducts,
    validateIdCategory
], categoryDelete)

export default router;