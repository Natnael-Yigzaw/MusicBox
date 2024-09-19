const { body, param, validationResult } = require("express-validator");

const validateFileType = (file, allowedMimeTypes) => {
  if (!file || !file.mimetype) {
    return false;
  }
  return allowedMimeTypes.includes(file.mimetype);
};

const uploadSongValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("artist").trim().notEmpty().withMessage("Artist is required"),
  body("album").trim().notEmpty().withMessage("Album is required"),
  body("genre").trim().notEmpty().withMessage("Genre is required"),
  body("coverImage").custom((value, { req }) => {
    const file = req.files && req.files.coverImage && req.files.coverImage[0];
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!file) {
      throw new Error("Cover image is required");
    }
    if (!validateFileType(file, allowedMimeTypes)) {
      throw new Error("Invalid cover image file type. Allowed: jpeg, jpg, png");
    }
    return true;
  }),
  body("musicFile").custom((value, { req }) => {
    const file = req.files && req.files.musicFile && req.files.musicFile[0];
    const allowedMimeTypes = ["audio/mpeg", "audio/wav"];
    if (!file) {
      throw new Error("Music file is required");
    }
    if (!validateFileType(file, allowedMimeTypes)) {
      throw new Error("Invalid music file type. Allowed: mp3, wav");
    }
    return true;
  }),
];

const updateSongValidation = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty"),
  body("artist")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Artist cannot be empty"),
  body("album")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Album cannot be empty"),
  body("genre")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Genre cannot be empty"),
  body("coverImage")
    .optional()
    .custom((value, { req }) => {
      const file = req.files && req.files.coverImage && req.files.coverImage[0];
      const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (file && !validateFileType(file, allowedMimeTypes)) {
        throw new Error(
          "Invalid cover image file type. Allowed: jpeg, jpg, png"
        );
      }
      return true;
    }),
  body("musicFile")
    .optional()
    .custom((value, { req }) => {
      const file = req.files && req.files.musicFile && req.files.musicFile[0];
      const allowedMimeTypes = ["audio/mpeg", "audio/wav"];
      if (file && !validateFileType(file, allowedMimeTypes)) {
        throw new Error("Invalid music file type. Allowed: mp3, wav");
      }
      return true;
    }),
];

const deleteSongValidation = [
  param("id").isMongoId().withMessage("Invalid song ID"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  next();
};

module.exports = {
  uploadSongValidation,
  updateSongValidation,
  deleteSongValidation,
  validate,
};
