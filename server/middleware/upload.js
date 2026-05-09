const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {

    let resourceType = "auto";

    // PDF files
    if (file.mimetype === "application/pdf") {
      resourceType = "raw";
    }

    return {
      folder: "lms_uploads",

      resource_type: resourceType,

      public_id:
        Date.now() +
        "-" +
        file.originalname
          .split(".")[0]
          .replace(/\s+/g, "-"),
    };
  },
});

const upload = multer({ storage });

module.exports = upload;