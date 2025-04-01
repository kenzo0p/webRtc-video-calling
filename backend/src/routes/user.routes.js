import { Router } from "express";
import { login, register } from "../controller/user.controllers.js";
const router = Router();

router.route("/login").post(login);
router.route("/signup").post(register);
router.route("/add_to_activity");
router.route("/get_all_activity");


export default router;