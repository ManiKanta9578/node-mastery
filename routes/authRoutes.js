import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { Auth, localVariables } from '../middlewares/authMiddleware.js';
import { registerMail } from "../controllers/mailer.js";
const router = Router();

//GET
// router.route('/user/:username').get(authController.getUser);
router.route('/generateOTP').get(authController.verifyUser, localVariables, authController.generateOTP);
router.route('/verifyOTP').get(authController.verifyOTP);
router.route('/createResetSession').get(authController.createResetSession);

//POST
router.route('/register').post(authController.register);
router.route('/login').post(authController.verifyUser, authController.login);
router.route('/authenticate').post(authController.verifyUser, (req, res) => res.end());
router.route('/registerMail').post(registerMail);

//PUT
router.route('/updateUser').put(Auth, authController.updateUser);
router.route('/resetPassword').put(authController.resetPassword);

export default router;