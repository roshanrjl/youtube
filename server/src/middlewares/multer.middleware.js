import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file.originalname)
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
     console.log("📦 [MULTER] File received:", {
      fieldName: file.fieldname,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
    }); 
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage,
});
