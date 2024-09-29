import { Router } from "express";
import * as authController from "../controllers/authController.js";
const router = Router();

router.route('/register').post(authController.register);
router.route('/login').get(authController.login);

export default router;