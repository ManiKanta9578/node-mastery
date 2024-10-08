import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { Auth, localVariables } from '../middlewares/authMiddleware.js';
const router = Router();

//GET
router.route('/login').get(authController.login);
router.route('/user/:username').get(authController.getUser);
router.route('/generateOTP').get(authController.verifyUser, localVariables, authController.generateOTP);
router.route('/verifyOTP').get(authController.verifyOTP);

//POST
router.route('/register').post(authController.register);

//PUT
router.route('/updateUser').put(Auth, authController.updateUser);

export default router;