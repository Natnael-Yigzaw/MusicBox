const Song = require("../model/Song");

const getTotalSongs = async () => {
  return await Song.countDocuments();
};

const getTotalArtists = async () => {
  const distinctArtists = await Song.distinct("artist");
  return distinctArtists.length;
};

const getTotalAlbums = async () => {
  const distinctAlbums = await Song.distinct("album");
  return distinctAlbums.length;
};

const getTotalGenres = async () => {
  const distinctGenres = await Song.distinct("genre");
  return distinctGenres.length;
};

const getSongsByGenre = async () => {
  return await Song.aggregate([
    { $group: { _id: "$genre", count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);
};

const getSongsByArtist = async () => {
  return await Song.aggregate([
    {
      $group: {
        _id: "$artist",
        songCount: { $sum: 1 },
        albums: { $addToSet: "$album" },
      },
    },
    {
      $project: {
        artist: "$_id",
        songCount: 1,
        albumCount: { $size: "$albums" },
        _id: 0,
      },
    },
    { $sort: { artist: 1 } },
  ]);
};

const getSongsByAlbum = async () => {
  return await Song.aggregate([
    { $group: { _id: "$album", count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);
};

module.exports = {
  getTotalSongs,
  getTotalArtists,
  getTotalAlbums,
  getTotalGenres,
  getSongsByGenre,
  getSongsByArtist,
  getSongsByAlbum,
};
