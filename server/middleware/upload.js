const multer = require("multer");

const {
  CloudinaryStorage,
} = require("multer-storage-cloudinary");

const cloudinary = require(
  "../config/cloudinary"
);

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {

    return {
      folder: "lms_uploads",

      // IMPORTANT
      resource_type: "auto",

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