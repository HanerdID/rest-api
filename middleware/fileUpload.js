import multer from "multer";
import path from "path";

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Middleware untuk menangani file upload
const fileUpload = multer({ storage }).single("image");

export default fileUpload;
