import express from "express";

import {
  Me, Login, Register, Logout
} from "../controllers/AuthController.js";

import { isAuth, isAdmin } from "../middleware/Auth.js";

const router = express.Router();

router.get("/me", isAuth, Me);
router.post("/login", Login);
router.post("/register", isAdmin, Register);
router.delete("/logout", isAuth, isAdmin, Logout);

export default router;