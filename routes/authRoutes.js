import { Router } from "express";
import { register } from "../controllers/authController.js";
const router = Router();

router.route('/register').get(register);

export default router;