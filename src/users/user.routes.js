import { check } from "express-validator";
import {Router} from "express";
import {validateFields} from "../middlewares/validate-fields.js";

const router = Router();

router.post('/',[validateFields],);

export default router;

