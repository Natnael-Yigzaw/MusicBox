const express = require("express");
const router = express.Router();
const { upload, removeUpdatedAsset } = require("../middlewares/multer");
const {
  uploadSongValidation,
  updateSongValidation,
  deleteSongValidation,
  validate,
} = require("../middlewares/validation");
const {
  uploadSong,
  getSongs,
  getSongsByGenre,
  searchSongs,
  updateSong,
  deleteSong,
  getAnalytics,
} = require("../controllers/songController");

router.post(
  "/songs",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "musicFile", maxCount: 1 },
  ]),
  uploadSongValidation,
  validate,
  uploadSong
);
router.put(
  "/songs/:id",
  removeUpdatedAsset,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "musicFile", maxCount: 1 },
  ]),
  updateSongValidation,
  validate,
  updateSong
);
router.get("/songs", getSongs);
router.get("/songs/search", searchSongs);
router.get("/songs/analytics", getAnalytics);
router.get("/songs/:genre", getSongsByGenre);
router.delete("/songs/:id", deleteSongValidation, validate, deleteSong);

module.exports = router;
