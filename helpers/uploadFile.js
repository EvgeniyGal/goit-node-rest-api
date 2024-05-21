import multer from "multer";
import HttpError from "./HttpError.js";

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, "tmp");
  },
  filename: function (_, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniquePrefix}_${file.originalname}`);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const fileFilter = (_, file, cb) => {
  if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
    return cb(HttpError(400, "File must be jpeg or png"));
  }
  cb(null, true);
};

const upload = multer({ storage: storage, limits, fileFilter });

export default upload;
