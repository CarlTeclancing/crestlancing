import express from "express";
import {  registerUser, loginUser } from "../controller/userController.js";

import UserServices from "../services/userServices.js";
import db from "../services/database.js";

const userServices = new UserServices(db); 

const router = express.Router();

console.log(registerUser);

router.use("/register", registerUser);
router.use("/login", loginUser);

export default router;