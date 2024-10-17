const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    album: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    coverImage: {
      public_id: { type: String, required: true },
      secure_url: { type: String, required: true },
    },
    musicFile: {
      public_id: { type: String, required: true },
      secure_url: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

songSchema.index({ title: 1, artist: 1, album: 1, genre: 1 });

songSchema.pre("save", function (next) {
  const fieldsToCapitalize = ["title", "artist", "album", "genre"];
  fieldsToCapitalize.forEach((field) => {
    if (this[field]) {
      this[field] = this[field].charAt(0).toUpperCase() + this[field].slice(1);
    }
  });
  next();
});

songSchema.statics.getTotalSong = async function () {
  try {
    return await this.countDocuments();
  } catch (error) {
    throw new Error("Error counting songs: " + error.message);
  }
};

songSchema.statics.getTotalArtists = async function () {
  try {
    const distinctGenres = await this.distinct("artist");
    return distinctGenres.length;
  } catch (error) {
    throw new Error("Error counting artists: " + error.message);
  }
};

songSchema.statics.getTotalAlbums = async function () {
  try {
    const distinctAlbums = await this.distinct("album");
    return distinctAlbums.length;
  } catch (error) {
    throw new Error("Error counting albums: " + error.message);
  }
};

songSchema.statics.getTotalGenres = async function () {
  try {
    const distinctGenres = await this.distinct("genre");
    return distinctGenres.length;
  } catch (error) {
    throw new Error("Error counting genres: " + error.message);
  }
};

songSchema.statics.getSongsByGenre = async function () {
  try {
    return await this.aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } },
    ]);
  } catch (error) {
    throw new Error("Error getting songs by genre: " + error.message);
  }
};

songSchema.statics.getSongsByArtist = async function () {
  try {
    return await this.aggregate([
      { $group: { _id: "$artist", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
  } catch (error) {
    throw new Error("Error getting songs by artist: " + error.message);
  }
};

songSchema.statics.getSongsByAlbum = async function () {
  try {
    return await this.aggregate([
      { $group: { _id: "$album", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
  } catch (error) {
    throw new Error("Error getting songs by genre: " + error.message);
  }
};

module.exports = mongoose.model("Song", songSchema);
