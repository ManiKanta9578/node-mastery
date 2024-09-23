import { Router } from "express";
import { register } from "../controllers/appController.js";
const router = Router();

router.route('/register').get(register);

export default router;