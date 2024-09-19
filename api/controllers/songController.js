const Song = require("../model/Song");
const {
  getTotalSongs,
  getTotalArtists,
  getTotalAlbums,
  getTotalGenres,
  getSongsByGenre,
  getSongsByArtist,
  getSongsByAlbum,
} = require("../utils/analytics");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../config/cloudinary");

// @desc      Create a new song
// @route     POST /api/songs
// @access    Public
exports.uploadSong = asyncHandler(async (req, res) => {
  const { title, artist, album, genre } = req.body;

  const coverImage = req.files.coverImage[0];
  const musicFile = req.files.musicFile[0];

  const song = new Song({
    title,
    artist,
    album,
    genre,
    coverImage: {
      public_id: coverImage.filename,
      secure_url: coverImage.path,
    },
    musicFile: {
      public_id: musicFile.filename,
      secure_url: musicFile.path,
    },
  });

  await song.save();
  res.status(201).json({
    success: true,
    message: "Song uploaded successfully",
    song,
  });
});

// @desc      Get all songs
// @route     GET /api/songs
// @access    Public
exports.getSongs = asyncHandler(async (req, res) => {
  const songs = await Song.find();
  res.status(200).json({
    success: true,
    count: songs.length,
    data: songs,
  });
});

// @desc      Search songs by title, artist, or album
// @route     GET /api/songs/search
// @access    Public
exports.searchSongs = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query || query.trim() === "") {
    return res.status(400).json({ message: "Search query is required" });
  }

  const searchResults = await Song.find({
    $or: [
      { title: { $regex: new RegExp(query, "i") } },
      { artist: { $regex: new RegExp(query, "i") } },
      { album: { $regex: new RegExp(query, "i") } },
      { genre: { $regex: new RegExp(query, "i") } },
    ],
  });

  if (searchResults.length === 0) {
    return res.status(404).json({ message: "No songs found" });
  }

  res.status(200).json({
    success: true,
    count: searchResults.length,
    data: searchResults,
  });
});

// @desc      Update a song
// @route     PUT /api/songs/:id
// @access    Public
exports.updateSong = asyncHandler(async (req, res) => {
  const { title, artist, album, genre } = req.body;
  const { id: songId } = req.params;

  let song = await Song.findById(songId);
  if (!song) {
    return res.status(404).json({ message: "Song not found" });
  }

  if (title) song.title = title;
  if (artist) song.artist = artist;
  if (album) song.album = album;
  if (genre) song.genre = genre;

  if (req.files && req.files.coverImage) {
    const newCoverImage = req.files.coverImage[0];
    song.coverImage = {
      public_id: newCoverImage.filename,
      secure_url: newCoverImage.path,
    };
  }

  if (req.files && req.files.musicFile) {
    const newMusicFile = req.files.musicFile[0];
    song.musicFile = {
      public_id: newMusicFile.filename,
      secure_url: newMusicFile.path,
    };
  }

  await song.save();
  res.status(200).json({ message: "Song updated successfully", song });
});

// @desc      Delete a song
// @route     DELETE /api/songs/:id
// @access    Public
exports.deleteSong = asyncHandler(async (req, res) => {
  const song = await Song.findById(req.params.id);
  if (!song) {
    return res.status(404).json({ message: "Song not found" });
  }

  if (song.coverImage.public_id) {
    await cloudinary.uploader.destroy(song.coverImage.public_id, {
      resource_type: "image",
    });
  }

  if (song.musicFile.public_id) {
    await cloudinary.uploader.destroy(song.musicFile.public_id, {
      resource_type: "raw",
    });
  }

  await song.deleteOne();

  res.status(200).json({ message: "Song deleted successfully" });
});

// @desc      Get overall statistics
// @route     GET /api/analytics
// @access    Public
exports.getAnalytics = asyncHandler(async (req, res) => {
  const totalSongs = await getTotalSongs();
  const totalArtists = await getTotalArtists();
  const totalAlbums = await getTotalAlbums();
  const totalGenres = await getTotalGenres();
  const songsByGenre = await getSongsByGenre();
  const songsByArtist = await getSongsByArtist();
  const songsByAlbum = await getSongsByAlbum();

  res.status(200).json({
    totalSongs,
    totalArtists,
    totalAlbums,
    totalGenres,
    songsByGenre,
    songsByArtist,
    songsByAlbum,
  });
});
