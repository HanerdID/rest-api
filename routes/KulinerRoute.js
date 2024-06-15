import express from "express";

import {createKuliner, getKuliner, getKulinerById, updateKuliner, deleteKuliner} from "../controllers/KulinerController.js";
import {isAuth, isAdmin} from "../middleware/Auth.js";

const router = express.Router();

router.get("/kuliner", isAuth, getKuliner);
router.get("/kuliner/:id", isAuth, getKulinerById);
router.post("/kuliner", isAuth, isAdmin, createKuliner);
router.put("/kuliner/:id", isAuth, isAdmin, updateKuliner);
router.delete("/kuliner/:id", isAuth, isAdmin, deleteKuliner);

export default router;