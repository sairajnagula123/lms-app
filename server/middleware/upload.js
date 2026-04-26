const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "lms_uploads",
    resource_type: "auto",
    public_id: Date.now() + "-" + file.originalname,
  }),
});

const upload = multer({ storage });

module.exports = upload;