import express from "express";

import {createWisata, getWisata, getWisataById, updateWisata, deleteWisata} from "../controllers/WisataController.js";
import {isAuth, isAdmin} from "../middleware/Auth.js";

const router = express.Router();

router.get("/wisata", isAuth, getWisata);
router.get("/wisata/:id", isAuth, getWisataById);
router.post("/wisata", isAuth, isAdmin, createWisata);
router.put("/wisata/:id", isAuth, isAdmin, updateWisata);
router.delete("/wisata/:id", isAuth, isAdmin, deleteWisata);

export default router;