import multer from "multer";
import path from "path";
import fs from "fs";

const storagePdf = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./public/uploads/pdfs";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploadPdf = multer({
  storage: storagePdf,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".pdf") {
      return cb(new Error("Only PDFs are allowed") as any, false);
    }
    cb(null, true);
  },
});

const storageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./public/uploads/images";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploadImage = multer({
  storage: storageImage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
      return cb(new Error("Only images are allowed") as any, false);
    }
    cb(null, true);
  },
});
