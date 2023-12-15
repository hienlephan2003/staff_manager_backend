const express = require("express");
const router = express.Router();
const { uploadImage, getImageUrl } = require("../Controllers/imageController");
const multer = require("multer");
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter,
});

router.post("/upload", upload.single("file"), uploadImage);
router.get("/getImage/:id", getImageUrl);
module.exports = router;
