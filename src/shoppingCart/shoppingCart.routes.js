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
    check("idProduct",'Ingrese un ID valido de Mongo').isMongoId(),
    check("idProduct","El ID del producto a comprar es obligatorio").not().isEmpty(),
    verifyExistsProduct,
    check("quantity","La cantidad de producto a comprar es obligatoria").isNumeric(),
    verifyQuantityProduct,
    verifyQuantityStock,
    validateFields
],shoppingPost);

export default router;