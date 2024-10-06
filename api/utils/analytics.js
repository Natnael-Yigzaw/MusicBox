const Song = require("../model/Song");

const getTotalSongs = async () => {
  return await Song.countDocuments();
};

const getTotalArtists = async () => {
  const distinctArtists = await Song.aggregate([
    { $group: { _id: { $toLower: "$artist" } } },
    { $count: "artistCount" },
  ]);
  return distinctArtists.length ? distinctArtists[0].artistCount : 0;
};

const getTotalAlbums = async () => {
  const distinctAlbums = await Song.aggregate([
    { $group: { _id: { $toLower: "$album" } } },
    { $count: "albumCount" },
  ]);
  return distinctAlbums.length ? distinctAlbums[0].albumCount : 0;
};

const getTotalGenres = async () => {
  const distinctGenres = await Song.aggregate([
    { $group: { _id: { $toLower: "$genre" } } },
    { $count: "genreCount" },
  ]);
  return distinctGenres.length ? distinctGenres[0].genreCount : 0;
};

const getSongsByGenre = async () => {
  return await Song.aggregate([
    { $group: { _id: { $toLower: "$genre" }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);
};

const getSongsByArtist = async () => {
  return await Song.aggregate([
    {
      $group: {
        _id: { $toLower: "$artist" },
        songCount: { $sum: 1 },
        albums: { $addToSet: { $toLower: "$album" } },
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
    { $group: { _id: { $toLower: "$album" }, count: { $sum: 1 } } },
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
