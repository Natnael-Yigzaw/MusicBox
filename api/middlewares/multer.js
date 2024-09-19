const multer = require("multer");
const Song = require("../model/Song");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    let folder = "music_app";
    if (file.fieldname === "coverImage") {
      folder = "music_app/images";
    } else if (file.fieldname === "musicFile") {
      folder = "music_app/music";
    }
    return {
      folder: folder,
      resource_type: file.fieldname === "musicFile" ? "raw" : "image",
      allowed_formats:
        file.fieldname === "musicFile"
          ? ["mp3", "wav"]
          : ["jpeg", "jpg", "png"],
    };
  },
});

const removeUpdatedAsset = async (req, res, next) => {
  const { id: songId } = req.params;
  const song = await Song.findById(songId);
  if (!song) {
    return res.status(404).json({ message: "Song not found" });
  }

  if (req.body.coverImage && song.coverImage.public_id) {
    await cloudinary.uploader.destroy(song.coverImage.public_id, {
      resource_type: "image",
    });
  }

  if (req.body.musicFile && song.musicFile.public_id) {
    await cloudinary.uploader.destroy(song.musicFile.public_id, {
      resource_type: "raw",
    });
  }

  next();
};

const upload = multer({ storage: storage });

module.exports = { upload, removeUpdatedAsset };
