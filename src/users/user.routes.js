import { check } from "express-validator";
import {Router} from "express";
import {validateFields} from "../middlewares/validate-fields.js";
import { userPost } from "./user.controller.js";
import { validateUser,validateEmail } from "../helpers/db-validator.js";

const router = Router();

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

