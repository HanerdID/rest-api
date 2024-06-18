import express from "express";
import fileUpload from "../middleware/fileUpload.js";
import {createKuliner, getKuliner, getKulinerById, updateKuliner, deleteKuliner} from "../controllers/KulinerController.js";


const router = express.Router();

router.get("/kuliner", getKuliner);
router.get("/kuliner/:id", getKulinerById);
router.post("/kuliner", fileUpload, createKuliner);
router.put("/kuliner/:id", fileUpload, updateKuliner);
router.delete("/kuliner/:id", deleteKuliner);

export default router;