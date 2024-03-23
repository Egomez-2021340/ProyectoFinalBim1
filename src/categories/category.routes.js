import {Router} from 'express';
import {check} from 'express-validator';
import { validateJWT } from '../middlewares/validate-JWT.js';
import { verifyRole } from '../middlewares/validate-ROLE.js';
import { validateFields } from '../middlewares/validate-fields.js';
import { categoryPost } from './category.controller.js';

const router = Router();

router.post('/',[validateJWT,
    verifyRole('ADMIN_ROLE'),
    check('name','El nombre de la categoria es obligatorio').not().isEmpty(),
    check('description',"La descripcion de la categoria es obligatoria").not().isEmpty(),
    validateFields
],categoryPost)

export default router;