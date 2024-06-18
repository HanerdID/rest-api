import express from "express";
import fileUpload from "../middleware/fileUpload.js";
import {createHangout, getHangout, getHangoutById, updateHangout, deleteHangout} from "../controllers/HangoutController.js";

const router = express.Router();

router.get("/hangout", getHangout);
router.get("/hangout/:id", getHangoutById);
router.post("/hangout", fileUpload, createHangout);
router.put("/hangout/:id", fileUpload, updateHangout);
router.delete("/hangout/:id", deleteHangout);

export default router;