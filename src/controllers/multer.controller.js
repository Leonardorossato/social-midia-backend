const multer = require("multer");

class MulterController {
  static storageMulter = async (req, file, cb) => {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(nll, "public/assets");
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });
    const upload = multer({ storage });
  };
}

module.exports = MulterController;
