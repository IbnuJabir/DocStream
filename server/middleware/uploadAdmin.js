const multer = require("multer");
const fs = require("fs");
const path = require("path");

const adminUploadsDir = path.join(__dirname, "..", "uploads/admins");

// Ensure the uploads directory exists
if (!fs.existsSync(adminUploadsDir)) {
  fs.mkdirSync(adminUploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, adminUploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      callback(null, true);
    } else {
      console.log("Only jpg, jpeg and png format supported!");
      callback(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
});

module.exports = upload;
