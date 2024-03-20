import { check } from "express-validator";
import {Router} from "express";
import {validateFields} from "../middlewares/validate-fields.js";
import { userDelete
    ,userPut,
    userPost } from "./user.controller.js";
import { validateUser,validateEmail } from "../helpers/db-validator.js";
import { validateUserPut,validatePasswordDelete } from "../middlewares/verify-data.js";
import {validateJWT} from '../middlewares/validate-JWT.js';
import {verifyRole} from '../middlewares/validate-ROLE.js';

const router = Router();

router.delete('/',[validateJWT,
    check('password',"The password is required").not().isEmpty(),
    check('passwordConfirm',"The password is required to confirm").not().isEmpty(),
    validatePasswordDelete,
    validateFields
],userDelete);

router.put('/',[validateJWT,
    verifyRole('ADMIN_ROLE','CLIENT_ROLE'),
    check('user',"The user is required for account").not().isEmpty(),
    validateUserPut,
    check('password',"The password is required for account and must be greater than 4 characters").isLength({min:4}),
    validateFields
],userPut);

router.post('/',[
    check('user',"The user is required for account").not().isEmpty(),
    check('user').custom(validateUser),
    check('name',"The name is required for account").not().isEmpty(),
    check("email","Email is required and must be functional").isEmail(),
    check("email").custom(validateEmail),
    check('password',"The password is required for account and must be greater than 4 characters").isLength({min:4}),
    validateFields
],userPost);

export default router;

