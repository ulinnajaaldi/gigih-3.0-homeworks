const Playlist = require("../models/playlist.model");

const getPlaylist = (req, res) => {
  let playlist = Playlist.getPlaylist();
  if (req.query.sort === "play") {
    playlist.sort((a, b) => b.play - a.play);
  }
  if (req.query.direction === "asc") {
    playlist.reverse();
  }
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
  }
  if (playlist.length > 0) {
    res.status(200).send({ message: "Playlist retrieved", data: playlist });
  } else {
    res.status(404).send({ message: "Playlist is empty", data: [] });
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
    play: Math.floor(Math.random() * 50),
  };
  if (!song.title || !song.artists || !song.url) {
    res.status(400).send({ message: "Please fill all the fields", data: [] });
    return;
  }
  if (!Array.isArray(song.artists)) {
    song.artists = [song.artists];
  }
  if (
    Playlist.getPlaylist().find(
      (song) => song.title === song.title && song.artists === song.artists
    )
  ) {
    res.status(400).send({
      message: "Song already exist in the playlist",
      data: [],
    });
    return;
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
    const { title } = song;
    res
      .status(200)
      .send({ message: `${title} deleted from playlist`, data: [] });
  } else {
    res
      .status(404)
      .send({ message: "Cannot delete, song not found", data: [] });
  }
};

const playSong = (req, res) => {
  const song = Playlist.getSongById(parseInt(req.params.id));
  if (song) {
    Playlist.playSong(parseInt(req.params.id));
    const { title } = song;
    res.status(200).send({
      message: `${title} is now playing`,
      data: [song],
    });
  } else {
    res.status(404).send({ message: "Song not found", data: [] });
  }
};

module.exports = {
  getPlaylist,
  getSongById,
  addSong,
  updateSong,
  deleteSong,
  playSong,
};
