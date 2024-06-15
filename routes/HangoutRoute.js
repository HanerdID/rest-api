import express from "express";

import {createHangout, getHangout, getHangoutById, updateHangout, deleteHangout} from "../controllers/HangoutController.js";
import {isAuth, isAdmin} from "../middleware/Auth.js";

const router = express.Router();

router.get("/hangout", isAuth, getHangout);
router.get("/hangout/:id", isAuth, getHangoutById);
router.post("/hangout", isAuth, isAdmin, createHangout);
router.put("/hangout/:id", isAuth, isAdmin, updateHangout);
router.delete("/hangout/:id", isAuth, isAdmin, deleteHangout);

export default router;