import { check } from "express-validator";
import {Router} from 'express';
import { validateJWT } from '../middlewares/validate-JWT.js';
import { verifyRole } from '../middlewares/validate-ROLE.js';
import { validateFields } from '../middlewares/validate-fields.js'; 
import { shoppingPost } from "./shoppingCart.controller.js";
import { verifyExistsProduct, verifyQuantityProduct, verifyQuantityStock } from "../middlewares/verify-data.js";

const router = Router();

router.post('/',[validateJWT,
    verifyRole("CLIENT_ROLE"),
    check("idProduct",'Enter a valid Mongo ID').isMongoId(),
    check("idProduct","The ID of the product to be purchased is necesary").not().isEmpty(),
    verifyExistsProduct,
    check("quantity","The quantity of product to purchase is mandatory").isNumeric(),
    verifyQuantityProduct,
    verifyQuantityStock,
    validateFields
],shoppingPost);

export default router;