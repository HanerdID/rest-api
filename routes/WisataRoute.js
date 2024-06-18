import express from "express";
import fileUpload from "../middleware/fileUpload.js";
import {createWisata, getWisata, getWisataById, updateWisata, deleteWisata} from "../controllers/WisataController.js";

const router = express.Router();

router.get("/wisata", getWisata);
router.get("/wisata/:id", getWisataById);
router.post("/wisata", fileUpload, createWisata);
router.put("/wisata/:id", fileUpload, updateWisata);
router.delete("/wisata/:id", deleteWisata);

export default router;