import { Router } from "express";
import * as authController from "../controllers/authController.js";
const router = Router();

router.route('/register').post(authController.register);
router.route('/login').get(authController.login);
router.route('/user/:username').get(authController.getUser);

export default router;