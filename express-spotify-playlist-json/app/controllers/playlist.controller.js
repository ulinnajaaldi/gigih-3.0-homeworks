const Playlist = require("../models/playlist.model");

const getPlaylist = (req, res) => {
  const playlist = Playlist.getPlaylist();
  if (req.query.title) {
    const title = req.query.title.toLowerCase();
    const song = playlist.filter((song) =>
      song.title.toLowerCase().includes(title)
    );
    if (song.length > 0) {
      res.status(200).send({ message: "Song found", data: song });
    } else {
      res.status(404).send({ message: "Song not found", data: [] });
    }
  } else {
    if (playlist.length > 0) {
      res.status(200).send({ message: "Playlist retrieved", data: playlist });
    } else {
      res.status(404).send({ message: "Playlist is empty", data: [] });
    }
  }
};

const getSongById = (req, res) => {
  const song = Playlist.getSongById(parseInt(req.params.id));
  if (song) {
    res.status(200).send({ message: "Song found", data: [song] });
  } else {
    res.status(404).send({ message: "Song not found", data: [] });
  }
};

const addSong = (req, res) => {
  const song = {
    id: new Date().getTime(),
    title: req.body.title,
    artists: req.body.artists,
    url: req.body.url,
  };
  if (!song.title || !song.artists || !song.url) {
    res.status(400).send({ message: "Please fill all the fields", data: [] });
    return;
  }
  if (!Array.isArray(song.artists)) {
    song.artists = [song.artists];
  }
  Playlist.addSong(song);
  res.status(201).send({ message: "Song added to playlist", data: [song] });
};

const updateSong = (req, res) => {
  const updates = {};
  if (req.body.title) updates.title = req.body.title;
  if (req.body.artists) updates.artists = req.body.artists;
  if (req.body.url) updates.url = req.body.url;

  Playlist.updateSong(parseInt(req.params.id), updates);

  const song = Playlist.getSongById(parseInt(req.params.id));

  if (song) {
    res.status(200).send({ message: "Song updated", data: [song] });
  } else {
    res.status(404).send({ message: "Song not found", data: [] });
  }
};

const deleteSong = (req, res) => {
  const song = Playlist.getSongById(parseInt(req.params.id));
  if (song) {
    Playlist.deleteSong(parseInt(req.params.id));
    res.status(200).send({ message: "Song deleted from playlist", data: [] });
  } else {
    res
      .status(404)
      .send({ message: "Cannot delete, song not found", data: [] });
  }
};

module.exports = {
  getPlaylist,
  getSongById,
  addSong,
  updateSong,
  deleteSong,
};
