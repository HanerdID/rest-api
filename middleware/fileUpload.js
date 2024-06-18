import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const fileExtension = path.extname(file.originalname).toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) {
    return cb(new Error("Invalid file format"), false);
  }

  cb(null, true);
};

const uploadLimit = {
  fileSize: 1024 * 1024 * 5, // 5 MB file size limit
};

const fileUpload = multer({ storage, fileFilter, limits: uploadLimit }).single(
  "image"
);

export default fileUpload;
