import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { Auth } from '../middlewares/authMiddleware.js';
const router = Router();

router.route('/register').post(authController.register);
router.route('/login').get(authController.login);
router.route('/user/:username').get(authController.getUser);
router.route('/updateUser').put(Auth, authController.updateUser);

export default router;