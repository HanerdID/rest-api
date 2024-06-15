import express from "express";

import {
  Me, Login, Register, Logout
} from "../controllers/AuthController.js";

import { isAuth } from "../middleware/Auth.js";

const router = express.Router();

router.get("/me", isAuth, Me);
router.post("/login", Login);
router.post("/register", Register);
router.delete("/logout", isAuth, Logout);

export default router;